// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useCart } from '../context/cartContext';
// import Swal from 'sweetalert2';
// import { Calendar, FileText, Globe, Hash, ShieldCheck, CreditCard } from 'lucide-react';

// const ProductDetails = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const { addToCart, cart } = useCart();

//     const [product, setProduct] = useState(null);
//     const [loading, setLoading] = useState(true);

//     const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

//     useEffect(() => {
//         window.scrollTo({ top: 0, behavior: 'smooth' });

//         const fetchProductDetails = async () => {
//             try {
//                 setLoading(true);
//                 const res = await axios.get(`http://localhost:4000/api/books/BookById/${id}`, {
//                     withCredentials: true
//                 });
//                 setProduct(res.data);
//                 setTimeout(() => setLoading(false), 800);
//             } catch (err) {
//                 console.error("Transmission Error:", err);
//                 setLoading(false);
//             }
//         };

//         fetchProductDetails();
//     }, [id]);

//     // console.log(product.currency);

//     const handleAddToCart = () => {
//         addToCart(product);
//         Swal.fire({
//             toast: true,
//             position: 'bottom-end',
//             icon: 'success',
//             title: 'Secured in Library',
//             text: `${product.title} added successfully.`,
//             showConfirmButton: false,
//             timer: 2000,
//             background: '#0a0a0a',
//             color: '#e2e8f0',
//             iconColor: '#a855f7',
//             customClass: { popup: 'border border-gray-800 rounded-2xl shadow-2xl' }
//         });
//     };

//     if (loading) {
//         return (
//             <div className="min-h-screen bg-[#050505] flex justify-center items-center relative overflow-hidden">
//                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-900/20 rounded-full blur-[100px]"></div>
//                 <div className="flex flex-col items-center z-10">
//                     <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mb-6 shadow-[0_0_30px_rgba(168,85,247,0.5)]"></div>
//                     <p className="text-purple-400 font-mono tracking-[0.3em] uppercase text-sm animate-pulse">Retrieving Manuscript...</p>
//                 </div>
//             </div>
//         );
//     }

//     if (!product) {
//         return (
//             <div className="min-h-screen bg-[#050505] flex justify-center items-center text-white">
//                 <div className="text-center">
//                     <h2 className="text-4xl text-gray-500 mb-6 italic">Manuscript not found.</h2>
//                     <button onClick={() => navigate(-1)} className="text-purple-500 underline underline-offset-8 uppercase tracking-widest text-sm">Return to Library</button>
//                 </div>
//             </div>
//         );
//     }

//     const isInCart = cart?.some((item) => item._id === product._id);

//     return (
//         <div className="min-h-screen bg-[#050505] text-gray-200 p-6 md:p-12 relative overflow-hidden font-sans">
//             {/* Background Effects */}
//             <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[150px] pointer-events-none"></div>
//             <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div>

//             <div className="max-w-7xl mx-auto relative z-10 pt-8">
//                 {/* Back Button */}
//                 <button onClick={() => navigate(-1)} className="flex items-center text-gray-500 hover:text-purple-400 transition-colors mb-12 group">
//                     <svg className="w-6 h-6 mr-3 transform group-hover:-translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
//                     <span className="font-bold tracking-[0.2em] uppercase text-xs">Back to Archives</span>
//                 </button>

//                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
//                     {/* 3D Book Display */}
//                     <div className="lg:col-span-5 flex justify-center py-10">
//                         <div className="relative w-full max-w-sm aspect-[2/3] group shadow-[30px_40px_60px_rgba(0,0,0,0.9)]">
//                             <img src={product.coverImageUrl} alt={product.title} className="absolute inset-0 w-full h-full object-cover rounded-r-2xl border border-gray-800" />
//                             <div className="absolute top-0 bottom-0 left-0 w-12 bg-gradient-to-r from-black/80 to-transparent rounded-l-sm"></div>
//                         </div>
//                     </div>

//                     {/* Manuscript Content */}
//                     <div className="lg:col-span-7 space-y-8">
//                         <div>
//                             <div className="flex flex-wrap gap-3 mb-6">
//                                 <span className="text-[10px] font-black text-purple-400 border border-purple-500/30 px-4 py-1.5 rounded-full uppercase tracking-widest bg-purple-500/5">{product.category}</span>
//                                 <span className="text-[10px] font-black text-gray-400 border border-gray-800 px-4 py-1.5 rounded-full uppercase tracking-widest bg-gray-900/50">{product.language}</span>
//                             </div>
//                             <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-tight mb-4">{product.title}</h1>
//                             <p className="text-2xl text-purple-400/80 italic font-serif">by {product.author}</p>
//                         </div>

//                         <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">{product.description}</p>

//                         {/* --- NEW DYNAMIC METADATA GRID --- */}
//                         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-gray-800/50">
//                             <div>
//                                 <p className="flex items-center gap-2 text-gray-600 text-[10px] uppercase font-black tracking-widest mb-2"><Calendar size={14} /> Released</p>
//                                 <p className="text-gray-200 font-mono">{product.publishedDate ? new Date(product.publishedDate).toLocaleDateString() : 'Unknown'}</p>
//                             </div>
//                             <div>
//                                 <p className="flex items-center gap-2 text-gray-600 text-[10px] uppercase font-black tracking-widest mb-2"><FileText size={14} /> Pages</p>
//                                 <p className="text-gray-200 font-mono">{product.pageCount || '---'}</p>
//                             </div>
//                             <div>
//                                 <p className="flex items-center gap-2 text-gray-600 text-[10px] uppercase font-black tracking-widest mb-2"><Hash size={14} /> ISBN</p>
//                                 <p className="text-gray-200 font-mono text-xs truncate">{product.isbn || 'SECURED'}</p>
//                             </div>
//                             <div>
//                                 <p className="flex items-center gap-2 text-gray-600 text-[10px] uppercase font-black tracking-widest mb-2"><ShieldCheck size={14} /> Clearance</p>
//                                 <p className="text-amber-500 font-black text-xs uppercase">Level 4 Admin</p>
//                             </div>
//                         </div>

//                         {/* Pricing Section */}
//                         <div className="flex items-end gap-4">
//                             <div className="flex flex-col">
//                                 <span className="text-gray-500 text-[10px] uppercase font-black tracking-[0.2em] mb-1">Acquisition Cost</span>
//                                 <div className="flex items-baseline gap-2">
//                                     <span className="text-6xl font-black text-white tracking-tighter">
//                                         {product.price || '0.00'}
//                                     </span>
//                                     <span className="text-purple-500 font-bold text-xl uppercase tracking-widest">{product.currency || 'USD'}</span>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Action Buttons */}
//                         <div className="flex flex-col sm:flex-row gap-4 pt-4">
//                             <button
//                                 onClick={isInCart ? undefined : handleAddToCart}
//                                 disabled={isInCart}
//                                 className={`flex-1 py-5 px-8 rounded-2xl font-black uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-3 ${isInCart ? 'bg-gray-900 text-gray-600 border border-gray-800' : 'bg-purple-600 text-white shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:scale-[1.02] active:scale-95'
//                                     }`}
//                             >
//                                 <CreditCard size={18} /> {isInCart ? 'Already in Vault' : 'Add to Collection'}
//                             </button>

//                             <button
//                                 onClick={() => product.contentUrl && window.open(product.contentUrl, '_blank')}
//                                 className="flex-1 py-5 px-8 rounded-2xl font-black uppercase tracking-widest text-sm border border-gray-700 hover:border-purple-500/50 transition-all flex items-center justify-center gap-3"
//                             >
//                                 <Globe size={18} /> Initialise Download
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductDetails;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/cartContext';
import Swal from 'sweetalert2';
import { Calendar, FileText, Hash, ShieldCheck, Download } from 'lucide-react';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, cart } = useCart();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });

        const fetchProductDetails = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:4000/api/books/BookById/${id}`, {
                    withCredentials: true
                });
                setProduct(res.data);
                setTimeout(() => setLoading(false), 800);
            } catch (err) {
                console.error("Transmission Error:", err);
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [id]);

    const handleAddToCart = () => {
        addToCart(product);
        Swal.fire({
            toast: true,
            position: 'bottom-end',
            icon: 'success',
            title: 'Secured in Library',
            text: `${product?.title} added successfully.`,
            showConfirmButton: false,
            timer: 2000,
            background: '#0a0a0a',
            color: '#e2e8f0',
            iconColor: '#a855f7',
            customClass: { popup: 'border border-gray-800 rounded-2xl shadow-2xl' }
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] flex justify-center items-center relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-900/20 rounded-full blur-[100px]"></div>
                <div className="flex flex-col items-center z-10">
                    <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mb-6 shadow-[0_0_30px_rgba(168,85,247,0.5)]"></div>
                    <p className="text-purple-400 font-mono tracking-[0.3em] uppercase text-sm animate-pulse">Retrieving Manuscript...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-[#050505] flex justify-center items-center text-white">
                <div className="text-center">
                    <h2 className="text-4xl text-gray-500 mb-6 italic">Manuscript not found.</h2>
                    <button onClick={() => navigate(-1)} className="text-purple-500 underline underline-offset-8 uppercase tracking-widest text-sm">Return to Library</button>
                </div>
            </div>
        );
    }

    const isInCart = cart?.some((item) => item._id === product?._id);

    return (
        <div className="min-h-screen bg-[#050505] text-gray-200 p-6 md:p-12 relative overflow-hidden font-sans">
            {/* Background Effects */}
            <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[150px] pointer-events-none"></div>
            <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10 pt-8">
                {/* Back Button */}
                <button onClick={() => navigate(-1)} className="flex items-center text-gray-500 hover:text-purple-400 transition-colors mb-12 group">
                    <svg className="w-6 h-6 mr-3 transform group-hover:-translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    <span className="font-bold tracking-[0.2em] uppercase text-xs">Back to Archives</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* 3D Book Display */}
                    <div className="lg:col-span-5 flex justify-center py-10">
                        <div className="relative w-full max-w-sm aspect-[2/3] group shadow-[30px_40px_60px_rgba(0,0,0,0.9)]">
                            <img src={product.coverImageUrl} alt={product.title} className="absolute inset-0 w-full h-full object-cover rounded-r-2xl border border-gray-800" />
                            <div className="absolute top-0 bottom-0 left-0 w-12 bg-gradient-to-r from-black/80 to-transparent rounded-l-sm"></div>
                        </div>
                    </div>

                    {/* Manuscript Content */}
                    <div className="lg:col-span-7 space-y-8">
                        <div>
                            <div className="flex flex-wrap gap-3 mb-6">
                                <span className="text-[10px] font-black text-purple-400 border border-purple-500/30 px-4 py-1.5 rounded-full uppercase tracking-widest bg-purple-500/5">{product.category}</span>
                                <span className="text-[10px] font-black text-gray-400 border border-gray-800 px-4 py-1.5 rounded-full uppercase tracking-widest bg-gray-900/50">{product.language}</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-tight mb-4">{product.title}</h1>
                            <p className="text-2xl text-purple-400/80 italic font-serif">by {product.author}</p>
                        </div>

                        <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">{product.description}</p>

                        {/* --- DYNAMIC METADATA GRID --- */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-gray-800/50">
                            <div>
                                <p className="flex items-center gap-2 text-gray-600 text-[10px] uppercase font-black tracking-widest mb-2"><Calendar size={14} /> Released</p>
                                <p className="text-gray-200 font-mono">{product.publishedDate ? new Date(product.publishedDate).toLocaleDateString() : 'Unknown'}</p>
                            </div>
                            <div>
                                <p className="flex items-center gap-2 text-gray-600 text-[10px] uppercase font-black tracking-widest mb-2"><FileText size={14} /> Pages</p>
                                <p className="text-gray-200 font-mono">{product.pageCount || '---'}</p>
                            </div>
                            <div>
                                <p className="flex items-center gap-2 text-gray-600 text-[10px] uppercase font-black tracking-widest mb-2"><Hash size={14} /> ISBN</p>
                                <p className="text-gray-200 font-mono text-xs truncate">{product.isbn || 'SECURED'}</p>
                            </div>
                            <div>
                                <p className="flex items-center gap-2 text-gray-600 text-[10px] uppercase font-black tracking-widest mb-2"><ShieldCheck size={14} /> Clearance</p>
                                <p className="text-amber-500 font-black text-xs uppercase">Level 4 Admin</p>
                            </div>
                        </div>

                        {/* Pricing Section */}
                        <div className="flex items-end gap-4">
                            <div className="flex flex-col">
                                <span className="text-gray-500 text-[10px] uppercase font-black tracking-[0.2em] mb-1">Acquisition Cost</span>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-6xl font-black text-white tracking-tighter">
                                        {product.price || '0.00'}
                                    </span>
                                    <span className="text-purple-500 font-bold text-xl uppercase tracking-widest">{product.currency || 'USD'}</span>
                                </div>
                            </div>
                        </div>

                        {/* SINGLE ACTION BUTTON */}
                        <div className="pt-4">
                            <button
                                onClick={() => navigate(`/purchase-book/${product?._id}`)}
                                className="w-full sm:w-2/3 py-5 px-8 rounded-2xl font-black uppercase tracking-widest text-sm bg-purple-600 text-white shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                            >
                                <Download size={18} /> Download Manuscript
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;



