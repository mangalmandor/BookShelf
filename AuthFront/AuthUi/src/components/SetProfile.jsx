import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { User, Camera, Mail, Phone, MapPin, AlignLeft, Shield, ArrowLeft, Loader2 } from 'lucide-react';

const SetProfile = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [bio, setBio] = useState("");
    const [phone, setPhone] = useState("");
    const [location, setLocation] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!bio && !phone && !location && !image) {
            Swal.fire({
                icon: 'warning',
                title: 'Input Required',
                text: 'The archive requires at least one data point to update.',
                background: '#0a0a0f',
                color: '#fff',
                confirmButtonColor: '#8b5cf6',
            });
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("bio", bio);
        formData.append("phone", phone);
        formData.append("location", location);
        if (image) formData.append("profileImage", image);

        try {
            const res = await axios.post("http://localhost:4000/api/profile/set-profile", formData, {
                withCredentials: true,
            });

            if (res.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Identity Established',
                    text: 'Your profile has been synchronized with the core.',
                    background: '#0a0a0f',
                    color: '#fff',
                    confirmButtonColor: '#8b5cf6',
                }).then(() => navigate('/profile-preview'));
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Uplink Error',
                text: error.response?.data?.message || 'Server communication failed.',
                background: '#0a0a0f',
                color: '#fff',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#030305] text-white pt-28 pb-20 px-4 relative overflow-hidden flex items-center justify-center">
            {/* Background Cinematic Glows */}
            <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-2xl w-full relative z-10">
                {/* Header Section */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-500 hover:text-purple-400 mb-6 transition-all group"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1" />
                    <span className="text-xs font-bold uppercase tracking-[0.2em]">Abort Setup</span>
                </button>

                <div className="bg-[#0a0a0f]/80 backdrop-blur-3xl border border-gray-800 rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    {/* Corner Accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-bl-[100px]"></div>

                    <div className="mb-10">
                        <h2 className="text-3xl font-black tracking-tight mb-2">
                            Curator <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Initialization</span>
                        </h2>
                        <p className="text-gray-500 text-sm font-medium">Define your presence within the Grand Archive metadata.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Avatar Upload */}
                        <div className="flex flex-col items-center group">
                            <div className="relative">
                                <div className="absolute inset-0 rounded-full border-2 border-dashed border-purple-500/30 animate-[spin_10s_linear_infinite]"></div>
                                <div className="w-36 h-36 rounded-full border-4 border-[#12121a] bg-gray-900 flex items-center justify-center overflow-hidden shadow-2xl relative z-10">
                                    {preview ? (
                                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="text-center">
                                            <Camera size={32} className="text-gray-700 mx-auto mb-1" />
                                            <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Awaiting Image</span>
                                        </div>
                                    )}
                                </div>
                                <label className="absolute bottom-2 right-2 z-20 bg-purple-600 p-3 rounded-2xl cursor-pointer hover:bg-purple-500 transition-all shadow-xl hover:scale-110">
                                    <Camera size={18} className="text-white" />
                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                </label>
                            </div>
                        </div>

                        {/* Neural Inputs */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-2">
                                    <Shield size={12} className="text-purple-500" /> System Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                    <input type="text" value={user?.name || ""} disabled className="w-full bg-gray-950/50 border border-gray-800 rounded-2xl pl-12 pr-4 py-4 text-gray-500 cursor-not-allowed text-sm font-bold" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-2">
                                    <Mail size={12} className="text-blue-500" /> Uplink ID
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                    <input type="text" value={user?.email || ""} disabled className="w-full bg-gray-950/50 border border-gray-800 rounded-2xl pl-12 pr-4 py-4 text-gray-500 cursor-not-allowed text-sm font-bold" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">
                                    <Phone size={12} className="text-emerald-500" /> Comm Channel
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="+XX XXXXX XXXXX"
                                        className="w-full bg-gray-900/50 border border-gray-700 rounded-2xl pl-12 pr-4 py-4 text-white focus:border-purple-500 outline-none transition-all text-sm placeholder:text-gray-700 font-bold"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">
                                    <MapPin size={12} className="text-red-500" /> Sector Coord
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        placeholder="Physical Origin..."
                                        className="w-full bg-gray-900/50 border border-gray-700 rounded-2xl pl-12 pr-4 py-4 text-white focus:border-purple-500 outline-none transition-all text-sm placeholder:text-gray-700 font-bold"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">
                                <AlignLeft size={12} className="text-amber-500" /> Curator Narrative
                            </label>
                            <textarea
                                rows="3"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                placeholder="Describe your mission goals..."
                                className="w-full bg-gray-900/50 border border-gray-700 rounded-2xl px-6 py-4 text-white focus:border-purple-500 outline-none transition-all text-sm placeholder:text-gray-700 resize-none font-medium leading-relaxed"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="relative w-full group overflow-hidden py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-[0_0_25px_rgba(139,92,246,0.3)] hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] transition-all active:scale-[0.98]"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                {loading ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        Syncing Neural Core...
                                    </>
                                ) : (
                                    "Establish Identity"
                                )}
                            </span>
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </button>
                    </form>

                    {/* Footer Status */}
                    <div className="mt-8 flex justify-center items-center gap-6 opacity-30">
                        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-gray-700"></div>
                        <span className="text-[10px] font-mono text-gray-500 tracking-tighter uppercase">Protocol: ISO-8821</span>
                        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-gray-700"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SetProfile;







