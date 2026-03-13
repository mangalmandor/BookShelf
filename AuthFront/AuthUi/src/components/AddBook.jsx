import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { BookPlus, ArrowLeft, Upload, Link as LinkIcon, Hash, Globe, Calendar, FileText, DollarSign } from 'lucide-react';

const AddBook = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // ✅ Expanded state to include all requested fields
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        isbn: '',
        description: '',
        category: 'Technology',
        coverImageUrl: '',
        contentUrl: '',
        publishedDate: '',
        pageCount: '',
        price: '',
        currency: 'USD',
        language: 'English'
    });

    const categories = ['Technology', 'Software Engineering', 'Sci-Fi', 'Astrophysics', 'Philosophy', 'Cybersecurity', 'Fiction'];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(
                'http://localhost:4000/api/books/write-books',
                formData,
                { withCredentials: true }
            );

            if (response.data.success || response.status === 201) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Manuscript Injected',
                    text: 'The volume has been secured in the Grand Archive.',
                    background: '#0a0a0f',
                    color: '#e2e8f0',
                    confirmButtonColor: '#a855f7',
                    timer: 2000
                });
                navigate('/dashboard');
            }
        } catch (error) {
            const errorMessage = error.response?.status === 403
                ? "Access Denied: Admin Clearance Required."
                : error.response?.data?.message || "Critical injection failure.";

            Swal.fire({
                icon: 'error',
                title: 'Injection Failed',
                text: errorMessage,
                background: '#0a0a0f',
                color: '#e2e8f0',
                confirmButtonColor: '#ef4444',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#030305] text-white py-24 px-6 font-sans relative overflow-hidden">
            {/* Cinematic Background */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto relative z-10">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center text-gray-500 hover:text-purple-400 transition-colors mb-10 group font-bold tracking-widest uppercase text-xs"
                >
                    <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Command Center
                </button>

                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500 tracking-tight mb-3">
                        Inject <span className="text-purple-500">Manuscript</span>
                    </h1>
                    <p className="text-gray-400 text-sm font-medium uppercase tracking-[0.2em]">Data Entry Protocol v4.0.2</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-[#0a0a0f]/80 backdrop-blur-xl border border-gray-800/80 p-8 md:p-12 rounded-[2.5rem] shadow-2xl">

                    {/* Primary Info Group */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div>
                            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">Title *</label>
                            <input type="text" name="title" required value={formData.title} onChange={handleChange}
                                className="w-full bg-gray-950/50 border border-gray-800 rounded-xl px-4 py-3 focus:border-purple-500/50 outline-none transition-all"
                                placeholder="The Infinite Nexus" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">Primary Author *</label>
                            <input type="text" name="author" required value={formData.author} onChange={handleChange}
                                className="w-full bg-gray-950/50 border border-gray-800 rounded-xl px-4 py-3 focus:border-purple-500/50 outline-none transition-all"
                                placeholder="Aria Sterling" />
                        </div>
                    </div>

                    {/* Metadata Group */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div>
                            <label className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2"><Hash size={12} /> ISBN</label>
                            <input type="text" name="isbn" value={formData.isbn} onChange={handleChange}
                                className="w-full bg-gray-950/50 border border-gray-800 rounded-xl px-4 py-3 font-mono text-sm" placeholder="978-..." />
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2"><Calendar size={12} /> Published Date</label>
                            <input type="date" name="publishedDate" value={formData.publishedDate} onChange={handleChange}
                                className="w-full bg-gray-950/50 border border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-400" />
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2"><FileText size={12} /> Page Count</label>
                            <input type="number" name="pageCount" value={formData.pageCount} onChange={handleChange}
                                className="w-full bg-gray-950/50 border border-gray-800 rounded-xl px-4 py-3" placeholder="450" />
                        </div>
                    </div>

                    {/* Pricing & Language Group */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-6 bg-purple-500/5 rounded-2xl border border-purple-500/10">
                        <div>
                            <label className="flex items-center gap-2 text-[10px] font-black text-purple-400 uppercase tracking-[0.2em] mb-2"><DollarSign size={12} /> Price</label>
                            <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange}
                                className="w-full bg-gray-950/50 border border-gray-800 rounded-xl px-4 py-3 text-emerald-400 font-bold" placeholder="0.00" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">Currency</label>
                            <select name="currency" value={formData.currency} onChange={handleChange}
                                className="w-full bg-gray-950/50 border border-gray-800 rounded-xl px-4 py-3 outline-none appearance-none cursor-pointer">
                                <option value="USD">USD ($)</option>
                                <option value="EUR">EUR (€)</option>
                                <option value="GBP">GBP (£)</option>
                                <option value="INR">INR (₹)</option>
                            </select>
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2"><Globe size={12} /> Language</label>
                            <input type="text" name="language" value={formData.language} onChange={handleChange}
                                className="w-full bg-gray-950/50 border border-gray-800 rounded-xl px-4 py-3" placeholder="English" />
                        </div>
                    </div>

                    {/* Categories & URLs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div>
                            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">Category</label>
                            <select name="category" value={formData.category} onChange={handleChange}
                                className="w-full bg-gray-950/50 border border-gray-800 rounded-xl px-4 py-3 appearance-none cursor-pointer">
                                {categories.map(cat => <option key={cat} value={cat} className="bg-gray-950">{cat}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2"><LinkIcon size={12} /> Cover Image URL</label>
                            <input type="url" name="coverImageUrl" value={formData.coverImageUrl} onChange={handleChange}
                                className="w-full bg-gray-950/50 border border-gray-800 rounded-xl px-4 py-3 font-mono text-xs text-blue-400" placeholder="https://..." />
                        </div>
                    </div>

                    <div className="mb-8">
                        <label className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2"><LinkIcon size={12} /> Content PDF URL *</label>
                        <input type="url" name="contentUrl" required value={formData.contentUrl} onChange={handleChange}
                            className="w-full bg-gray-950/50 border border-gray-800 rounded-xl px-4 py-3 font-mono text-xs text-blue-400" placeholder="https://archive.org/..." />
                    </div>

                    <div className="mb-10">
                        <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">Synopsis</label>
                        <textarea name="description" rows="4" value={formData.description} onChange={handleChange}
                            className="w-full bg-gray-950/50 border border-gray-800 rounded-xl px-4 py-3 resize-none" placeholder="Enter brief summary..."></textarea>
                    </div>

                    <button type="submit" disabled={loading}
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-500 hover:to-indigo-600 text-white font-black text-sm uppercase tracking-[0.3em] py-5 rounded-2xl transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] flex justify-center items-center gap-3">
                        {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : <><Upload size={20} /> Authorize Injection</>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddBook; 