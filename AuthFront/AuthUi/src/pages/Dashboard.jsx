
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
    LayoutDashboard, UserCircle, LogOut, ShieldCheck,
    Activity, Lock, BookPlus, ArrowRight, Database, Settings
} from 'lucide-react';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        if (!user) navigate('/login');
    }, [user, navigate]);

    const handleLogout = () => {
        Swal.fire({
            title: 'Initiate Disconnect?',
            text: "You are about to leave the secure server.",
            icon: 'warning',
            showCancelButton: true,
            background: '#0a0a0f',
            color: '#e2e8f0',
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#374151',
            confirmButtonText: 'Yes, Disconnect',
        }).then((result) => {
            if (result.isConfirmed) {
                logout();
            }
        });
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-[#030305] text-white flex selection:bg-purple-500/30 font-sans">

            {/* Background Cinematic Glows */}
            <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none"></div>

            {/* --- SIDEBAR --- */}
            <aside className="w-72 bg-[#050508]/80 backdrop-blur-xl border-r border-gray-800/60 flex flex-col pt-28 px-6 fixed h-full z-20">
                <div className="mb-10 px-2">
                    <p className="font-bold text-amber-500/80 uppercase tracking-[0.2em] text-xs mb-1">Archive Command</p>
                    <h2 className="text-2xl font-black tracking-tight text-gray-200">Admin Console</h2>
                </div>

                {/* Command Tab */}
                <nav className="space-y-2 flex-1">
                    {user?.role === 'admin' && (
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 ${activeTab === 'overview' ? 'bg-purple-600/10 text-purple-400 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.1)]' : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'}`}
                        >
                            <LayoutDashboard size={22} /> <span className="font-bold tracking-wide">Command Center</span>
                        </button>
                    )}

                    {/* Profile Tab */}
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 ${activeTab === 'profile' ? 'bg-amber-600/10 text-amber-400 border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]' : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'}`}
                    >
                        <UserCircle size={22} /> <span className="font-bold tracking-wide">Curator Profile</span>
                    </button>

                    {/* Settings Tab */}
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 ${activeTab === 'settings' ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]' : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'}`}
                    >
                        <Settings size={22} /> <span className="font-bold tracking-wide">System Settings</span>
                    </button>
                </nav>

                <div className="pb-10 border-t border-gray-800/60 pt-6">
                    <button onClick={handleLogout} className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors group">
                        <LogOut size={22} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-bold tracking-wide">Disconnect</span>
                    </button>
                </div>
            </aside>

            {/* --- MAIN CONTENT AREA --- */}
            <main className="flex-1 ml-72 pt-28 px-10 pb-12 relative z-10">
                <div className="max-w-5xl mx-auto">

                    {/* --- TAB: OVERVIEW --- */}
                    {activeTab === 'overview' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {/* Welcome Banner */}
                            <div className="relative overflow-hidden bg-gradient-to-br from-gray-900/80 to-[#0a0a0f] border border-gray-800 p-12 rounded-[2.5rem] shadow-2xl mb-10 group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] group-hover:bg-purple-500/20 transition-colors duration-700"></div>
                                <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-white relative z-10">
                                    Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-amber-500">{user.name}</span>
                                </h1>
                                <p className="text-gray-400 text-lg relative z-10">The Grand Archive systems are online and awaiting your directives.</p>
                            </div>

                            {/* Action Card */}
                            <div className="mb-10">
                                <h2 className="text-xl font-bold text-gray-200 mb-6 flex items-center gap-2">
                                    <Database className="text-purple-500" size={24} /> Catalog Management
                                </h2>
                                <div className="bg-gradient-to-r from-purple-900/20 to-gray-900/40 border border-purple-500/20 p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-sm hover:border-purple-500/40 transition-colors">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">Inject New Manuscript</h3>
                                        <p className="text-gray-400">Add a new volume to the global database. Ensure metadata is accurate.</p>
                                    </div>
                                    <button
                                        onClick={() => navigate('/add-book-selector')}
                                        className="shrink-0 group flex items-center gap-3 bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] active:scale-95"
                                    >
                                        <BookPlus size={22} />
                                        <span>Add Book</span>
                                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- TAB: PROFILE (View & Set) --- */}
                    {activeTab === 'profile' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-3xl font-black text-white mb-8">Curator Profile</h2>
                            <div className="bg-[#0a0a0f]/80 border border-gray-800 p-10 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-10">
                                <div className="w-32 h-32 bg-gradient-to-tr from-purple-500 to-amber-500 rounded-full p-1 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                                    <div className="w-full h-full bg-gray-900 rounded-full flex items-center justify-center">
                                        <UserCircle size={64} className="text-gray-400" />
                                    </div>
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <h3 className="text-3xl font-bold text-white mb-2">{user.name}</h3>
                                    <p className="text-gray-500 text-lg mb-6">{user.email}</p>
                                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                        <button
                                            onClick={() => navigate('/profile-preview')}
                                            className="px-6 py-3 rounded-xl font-bold text-white bg-gray-800 hover:bg-gray-700 transition-all border border-gray-700"
                                        >
                                            View Your Profile
                                        </button>
                                        <button
                                            onClick={() => navigate('/set-profile')}
                                            className="px-6 py-3 rounded-xl font-bold text-white bg-amber-600/20 hover:bg-amber-600/30 text-amber-400 border border-amber-500/30 transition-all"
                                        >
                                            Set Profile Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- TAB: SETTINGS (Privacy & Security) --- */}
                    {activeTab === 'settings' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-3xl font-black text-white">System Settings</h2>
                                <div className="px-4 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-bold uppercase tracking-widest">
                                    Privacy Protocol Active
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                {/* Privacy / Change Password Card */}
                                <div className="bg-[#0a0a0f]/80 border border-gray-800 p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 hover:border-blue-500/30 transition-colors group">
                                    <div className="flex items-center gap-6">
                                        <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-500 group-hover:scale-110 transition-transform">
                                            <Lock size={32} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-1">Security & Privacy</h3>
                                            <p className="text-gray-400">Update your credentials and manage archive encryption keys.</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => navigate('/change-password')}
                                        className="w-full md:w-auto px-8 py-4 rounded-2xl font-bold text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 transition-all"
                                    >
                                        Change Password
                                    </button>
                                </div>

                                {/* Additional Placeholder Settings */}
                                <div className="bg-[#0a0a0f]/40 border border-gray-800/50 p-8 rounded-3xl flex items-center justify-between opacity-50 grayscale">
                                    <div className="flex items-center gap-6">
                                        <div className="p-4 bg-gray-500/10 rounded-2xl text-gray-500">
                                            <ShieldCheck size={32} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-1">Two-Factor Authentication</h3>
                                            <p className="text-gray-400">Add an extra layer of security to the curator account.</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">Unavailable</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;