import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/cartContext';
import Swal from 'sweetalert2';
import { Calendar, FileText, Globe, Hash, ShieldCheck, CreditCard, Lock, Download, Unlock } from 'lucide-react';

const PurchaseBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, cart } = useCart();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    // Simulation: In a real app, this would come from your 'Orders' database
    const [isPurchased, setIsPurchased] = useState(false);

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

    const handleDownload = () => {
        if (!isPurchased) {
            Swal.fire({
                icon: 'lock',
                title: 'Access Denied',
                text: 'You must acquire this manuscript before downloading the digital file.',
                background: '#0a0a0a',
                color: '#fff',
                confirmButtonColor: '#a855f7'
            });
            return;
        }
        window.open(product.contentUrl, '_blank');
    };

    const isInCart = cart?.some((item) => item._id === product?._id);

    if (loading) return <div className="bg-[#050505] min-h-screen flex items-center justify-center text-purple-500">Initializing...</div>;
    if (!product) return <div>Manuscript lost.</div>;

    return (
        <div className="min-h-screen bg-[#050505] text-gray-200 p-6 md:p-12 font-sans relative">
            <div className="max-w-7xl mx-auto z-10 relative py-15">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Left: Book Cover */}
                    <div className="lg:col-span-5 flex justify-center">
                        <div className="relative group">
                            <img src={product.coverImageUrl} className={`w-full max-w-sm rounded-r-2xl shadow-2xl transition-all duration-500 ${!isPurchased ? 'grayscale-[0.8] opacity-50' : 'grayscale-0'}`} alt={product.title} />
                            {!isPurchased && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Lock size={64} className="text-white/20" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: Info */}
                    <div className="lg:col-span-7 space-y-8">
                        <div>
                            <h1 className="text-5xl font-black text-white mb-2">{product.title}</h1>
                            <p className="text-2xl text-purple-400 italic">by {product.author}</p>
                        </div>

                        {/* Metadata Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-gray-800/50">
                            <div className="flex flex-col">
                                <span className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Format</span>
                                <span className="text-white font-mono">Digital PDF</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Status</span>
                                <span className={isPurchased ? "text-emerald-400" : "text-amber-500"}>
                                    {isPurchased ? "Decrypted" : "Encrypted"}
                                </span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-4">
                            {/* Primary Purchase Button */}
                            {!isPurchased && (
                                <button
                                    onClick={() => {
                                        addToCart(product);
                                        // For demo purposes, let's pretend buying it works instantly:
                                        // setIsPurchased(true); 
                                    }}
                                    className="w-full py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold flex items-center justify-center gap-3 transition-all"
                                >
                                    <CreditCard size={20} />
                                    {isInCart ? "Already in Cart" : `Acquire Access for ${product.price} ${product.currency}`}
                                </button>
                            )}

                            {/* DOWNLOAD BUTTON (LOCKED) */}
                            <button
                                onClick={handleDownload}
                                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all border-2 
                                    ${isPurchased
                                        ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white'
                                        : 'border-gray-800 bg-gray-900/50 text-gray-500 cursor-not-allowed opacity-60'
                                    }`}
                            >
                                {isPurchased ? <Download size={20} /> : <Lock size={20} />}
                                {isPurchased ? "Download Manuscript" : "Download Locked"}
                            </button>

                            {/* Admin Shortcut for Testing */}
                            <button
                                onClick={() => setIsPurchased(!isPurchased)}
                                className="text-[10px] text-gray-700 uppercase tracking-tighter hover:text-gray-500"
                            >
                                [ Toggle Admin Override ]
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PurchaseBook;