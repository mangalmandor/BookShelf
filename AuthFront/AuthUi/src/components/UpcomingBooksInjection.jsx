import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ArrowLeft, Rocket, CalendarClock, Link as LinkIcon, DollarSign, Activity } from 'lucide-react';

const AddUpcomingBook = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Initialized to match the UpcomingBook Schema
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        category: 'Technology',
        coverImageUrl: '',
        description: '',
        expectedReleaseDate: '',
        preOrderPrice: '',
        currency: 'USD',
        launchStatus: 'TRANSMITTING'
    });

    const categories = ['Technology', 'Software Engineering', 'Sci-Fi', 'Astrophysics', 'Philosophy', 'Cybersecurity', 'Fiction', 'Non-fiction'];
    const statuses = ['TRANSMITTING', 'DECRYPTING', 'IMMINENT'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'preOrderPrice' ? Number(value) : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Note: Make sure to create this specific route in your backend!
            const response = await axios.post(
                'http://localhost:4000/api/books/write-upcoming-books',
                formData,
                { withCredentials: true }
            );

            if (response.data.success || response.status === 201) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Launch Scheduled',
                    text: 'The upcoming manuscript has been queued in the Grand Archive.',
                    background: '#0a0a0f',
                    color: '#e2e8f0',
                    confirmButtonColor: '#a855f7',
                    timer: 2500
                });
                navigate('/dashboard');
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Scheduling Failed',
                text: error.response?.data?.message || "Transmission error occurred.",
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
            {/* Radar/Sonar Background Effect */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] border border-blue-900/20 rounded-full blur-[2px] pointer-events-none opacity-20 animate-pulse"></div>
            <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto relative z-10">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center text-gray-500 hover:text-blue-400 transition-colors mb-10 group font-bold tracking-widest uppercase text-xs"
                >
                    <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Command Center
                </button>

                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500 tracking-tight mb-3">
                        Schedule <span className="text-blue-500">Upcoming</span>
                    </h1>
                    <p className="text-gray-400 text-sm font-medium uppercase tracking-[0.2em]">Pre-Launch Protocol Initiated</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-[#0a0a0f]/80 backdrop-blur-xl border border-gray-800/80 p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">

                    {/* Primary Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div>
                            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">Title *</label>
                            <input type="text" name="title" required value={formData.title} onChange={handleChange}
                                className="w-full bg-gray-950/50 border border-gray-800 rounded-xl px-4 py-3 focus:border-blue-500/50 outline-none transition-all"
                                placeholder="The Singularity" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">Author *</label>
                            <input type="text" name="author" required value={formData.author} onChange={handleChange}
                                className="w-full bg-gray-950/50 border border-gray-800 rounded-xl px-4 py-3 focus:border-blue-500/50 outline-none transition-all"
                                placeholder="Dr. Isaac Asimov" />
                        </div>
                    </div>

                    {/* Pre-Launch Specifics (The Highlighted Section) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-6 bg-blue-500/5 rounded-2xl border border-blue-500/10">
                        <div>
                            <label className="flex items-center gap-2 text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-2"><CalendarClock size={12} /> Target Launch Date *</label>
                            <input type="datetime-local" name="expectedReleaseDate" required value={formData.expectedReleaseDate} onChange={handleChange}
                                className="w-full bg-gray-950/50 border border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-300 outline-none focus:border-blue-500/50" />
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-2"><Activity size={12} /> Readiness Status</label>
                            <select name="launchStatus" value={formData.launchStatus} onChange={handleChange}
                                className="w-full bg-gray-950/50 border border-gray-800 rounded-xl px-4 py-3 outline-none text-xs font-black tracking-widest cursor-pointer">
                                {statuses.map(status => <option key={status} value={status} className="bg-gray-950">{status}</option>)}
                            </select>
                        </div>
                        <div className="flex gap-2">
                            <div className="flex-1">
                                <label className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2"><DollarSign size={12} /> Pre-Order</label>
                                <input type="number" step="0.01" name="preOrderPrice" value={formData.preOrderPrice} onChange={handleChange}
                                    className="w-full bg-gray-950/50 border border-gray-800 rounded-xl px-4 py-3 text-emerald-400 font-bold outline-none focus:border-emerald-500/50" placeholder="0.00" />
                            </div>
                            <div className="w-1/3">
                                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">Curr.</label>
                                <input type="text" name="currency" value={formData.currency} onChange={handleChange}
                                    className="w-full bg-gray-950/50 border border-gray-800 rounded-xl px-4 py-3 text-center outline-none" placeholder="USD" />
                            </div>
                        </div>
                    </div>

                    {/* Category & Cover */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div>
                            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">Category</label>
                            <select name="category" value={formData.category} onChange={handleChange}
                                className="w-full bg-gray-950/50 border border-gray-800 rounded-xl px-4 py-3 cursor-pointer outline-none focus:border-blue-500/50">
                                {categories.map(cat => <option key={cat} value={cat} className="bg-gray-950">{cat}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2"><LinkIcon size={12} /> Cover Image URL</label>
                            <input type="url" name="coverImageUrl" value={formData.coverImageUrl} onChange={handleChange}
                                className="w-full bg-gray-950/50 border border-gray-800 rounded-xl px-4 py-3 font-mono text-xs text-blue-400 outline-none focus:border-blue-500/50" placeholder="https://..." />
                        </div>
                    </div>

                    <div className="mb-10">
                        <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">Teaser Synopsis</label>
                        <textarea name="description" rows="4" value={formData.description} onChange={handleChange}
                            className="w-full bg-gray-950/50 border border-gray-800 rounded-xl px-4 py-3 resize-none outline-none focus:border-blue-500/50" placeholder="Enter a brief teaser to build anticipation..."></textarea>
                    </div>

                    <button type="submit" disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800 text-white font-black text-sm uppercase tracking-[0.3em] py-5 rounded-2xl transition-all shadow-[0_0_20px_rgba(29,78,216,0.3)] flex justify-center items-center gap-3">
                        {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : <><Rocket size={20} /> Initialize Launch Sequence</>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddUpcomingBook;