import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Rocket, ArrowLeft, Database, Clock } from 'lucide-react';

const AddBookSelector = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#030305] text-white py-24 px-6 font-sans relative overflow-hidden flex flex-col items-center justify-center">

            {/* Cinematic Backgrounds */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-5xl w-full relative z-10">

                {/* Back Button */}
                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center text-gray-500 hover:text-white transition-colors mb-12 group font-bold tracking-widest uppercase text-xs"
                >
                    <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Command Center
                </button>

                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500 tracking-tight mb-4">
                        Select Injection <span className="text-gray-100">Protocol</span>
                    </h1>
                    <p className="text-gray-400 text-sm font-medium uppercase tracking-[0.2em]">
                        Classify the manuscript data before uploading to the Grand Archive
                    </p>
                </div>

                {/* Selection Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* OPTION 1: Standard Book (Purple Theme) */}
                    <button
                        onClick={() => navigate('/add-book')} // Adjust route if needed
                        className="group relative bg-[#0a0a0f]/80 backdrop-blur-xl border border-gray-800 hover:border-purple-500/50 p-10 rounded-[2rem] text-left transition-all duration-500 hover:shadow-[0_0_40px_rgba(168,85,247,0.15)] hover:-translate-y-2 overflow-hidden"
                    >
                        {/* Hover Glow Effect */}
                        <div className="absolute -inset-full bg-gradient-to-r from-transparent via-purple-500/10 to-transparent group-hover:animate-[shimmer_1.5s_infinite] skew-x-[-45deg] transition-all"></div>

                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-purple-900/30 rounded-2xl flex items-center justify-center mb-6 border border-purple-500/30 group-hover:scale-110 group-hover:bg-purple-600 transition-all duration-500">
                                <BookOpen size={32} className="text-purple-400 group-hover:text-white transition-colors" />
                            </div>
                            <h2 className="text-2xl font-black text-white mb-3 tracking-tight">Standard Manuscript</h2>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                Inject a fully decrypted, available book into the main archive. Curators can access and download this file immediately upon acquisition.
                            </p>
                            <div className="flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-purple-400">
                                <Database size={14} className="mr-2" /> Direct Database Entry
                            </div>
                        </div>
                    </button>

                    {/* OPTION 2: Upcoming Book (Blue Theme) */}
                    <button
                        onClick={() => navigate('/add-upcoming-book')} // Adjust route if needed
                        className="group relative bg-[#0a0a0f]/80 backdrop-blur-xl border border-gray-800 hover:border-blue-500/50 p-10 rounded-[2rem] text-left transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] hover:-translate-y-2 overflow-hidden"
                    >
                        {/* Hover Glow Effect */}
                        <div className="absolute -inset-full bg-gradient-to-r from-transparent via-blue-500/10 to-transparent group-hover:animate-[shimmer_1.5s_infinite] skew-x-[-45deg] transition-all"></div>

                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/30 group-hover:scale-110 group-hover:bg-blue-600 transition-all duration-500">
                                <Rocket size={32} className="text-blue-400 group-hover:text-white transition-colors" />
                            </div>
                            <h2 className="text-2xl font-black text-white mb-3 tracking-tight">Pre-Launch Protocol</h2>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                Schedule an encrypted manuscript for a future release date. Builds hype, displays a countdown clock, and allows curators to join a waitlist.
                            </p>
                            <div className="flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">
                                <Clock size={14} className="mr-2" /> Temporal Queue Scheduled
                            </div>
                        </div>
                    </button>

                </div>
            </div>
        </div>
    );
};

export default AddBookSelector;