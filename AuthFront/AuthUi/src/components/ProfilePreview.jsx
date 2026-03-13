// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { User, MapPin, Phone, AlignLeft, Loader2, Mail } from 'lucide-react';
// import { Navigate, Link } from 'react-router-dom';

// const ProfileView = () => {
//     const [profile, setProfile] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         const fetchProfile = async () => {
//             try {
//                 // withCredentials: true is necessary for cookies
//                 const res = await axios.get("http://localhost:4000/api/profile/get-profile", {
//                     withCredentials: true
//                 });

//                 if (res.data.success) {
//                     setProfile(res.data.data);
//                 }
//             } catch (err) {
//                 console.error("Error fetching profile:", err);

//                 // If backend returns a 404 for "Profile not found", we can clear the error 
//                 // so the !profile condition triggers instead of showing a red error text.
//                 if (err.response?.status === 404) {
//                     setProfile(null); 
//                 } else {
//                     setError(err.response?.data?.message || "Profile loading failed");
//                 }
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProfile();
//     }, []);

//     // 1. Check if loading
//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-64">
//                 <Loader2 className="animate-spin text-blue-500" size={40} />
//             </div>
//         );
//     }

//     // 2. Check if there is an actual server/network error
//     if (error) {
//         return <div className="text-red-500 text-center p-4">{error}</div>;
//     }

//     // 3. NEW: Check if profile does not exist
//     if (!profile) {
//         return (
//             <div className="max-w-md mx-auto my-22 bg-gray-900 text-white rounded-2xl shadow-xl border border-gray-800 flex flex-col items-center justify-center p-8 min-h-[300px]">
//                 <h2 className="text-2xl font-bold mb-4 text-center">Oppps!!! No profile has been set yet</h2>
//                 <Link 
//                     to="/set-profile" 
//                     className="bg-blue-600 hover:bg-blue-700 transition-colors px-6 py-2 rounded-lg font-semibold mt-2"
//                 >
//                     Set Up Profile
//                 </Link>
//             </div>
//         );
//     }

//     // 4. Render normal profile if it exists
//     return (
//         <div className="max-w-md mx-auto my-22 bg-gray-900 text-white rounded-2xl shadow-xl overflow-hidden border border-gray-800">
//             {/* Header Section */}
//             <div className="h-24 bg-gradient-to-r from-blue-600 to-indigo-700"></div>

//             <div className="px-6 pb-6">
//                 {/* Profile Image */}
//                 <div className="relative -mt-12 mb-4 flex justify-center">
//                     <img 
//                         src={`http://localhost:4000/${profile?.profileImage}`} 
//                         alt="Profile" 
//                         className="w-32 h-32 rounded-full border-4 border-gray-900 object-cover object-center shadow-lg"
//                         onError={(e) => { e.target.src = "https://via.placeholder.com/150" }}
//                     />
//                 </div>

//                 {/* Profile Info */}
//                 <div className="text-center mb-6">
//                      <User className="text-green-400 mx-auto" size={40} />
//                     <h2 className="text-1xl font-bold">User Profile</h2>
//                     <p className="text-gray-400 text-sm">Name: {profile?.user?.name}</p>
//                 </div>

//                 <div className="space-y-4">
//                     {/* Bio */}
//                     <div className="flex items-start gap-3 bg-gray-800/50 p-3 rounded-lg">
//                         <AlignLeft className="text-blue-400 mt-1" size={20} />
//                         <div>
//                             <p className="text-xs text-gray-500 uppercase font-bold">Bio</p>
//                             <p className="text-sm">{profile?.bio || "No bio added yet"}</p>
//                         </div>
//                     </div>

//                     {/* Phone */}
//                     <div className="flex items-center gap-3 bg-gray-800/50 p-3 rounded-lg">
//                         <Phone className="text-green-400" size={20} />
//                         <div>
//                             <p className="text-xs text-gray-500 uppercase font-bold">Phone</p>
//                             <p className="text-sm">{profile?.phone || "Not provided"}</p>
//                         </div>
//                     </div>

//                     {/* Email */}
//                     <div className="flex items-center gap-3 bg-gray-800/50 p-3 rounded-lg">
//                         <Mail className="text-green-400" size={20} />
//                         <div>
//                             <p className="text-xs text-gray-500 uppercase font-bold">Email</p>
//                             <p className="text-sm">{profile?.user?.email || "Not provided"}</p>
//                         </div>
//                     </div>

//                     {/* Location */}
//                     <div className="flex items-center gap-3 bg-gray-800/50 p-3 rounded-lg">
//                         <MapPin className="text-red-400" size={20} />
//                         <div>
//                             <p className="text-xs text-gray-500 uppercase font-bold">Location</p>
//                             <p className="text-sm">{profile?.location || "Unknown"}</p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* FIXED: Removed button wrapper and styled the Link directly */}
//                 <Link 
//                     to="/set-profile" 
//                     className="block text-center w-full mt-6 bg-blue-600 hover:bg-blue-700 transition-colors py-2 rounded-lg font-semibold"
//                 >
//                     Edit Profile
//                 </Link>
//             </div>
//         </div>
//     );
// };

// export default ProfileView;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User, MapPin, Phone, AlignLeft, Loader2, Mail, ShieldCheck, Globe, Edit3, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProfileView = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get("http://localhost:4000/api/profile/get-profile", {
                    withCredentials: true
                });
                if (res.data.success) setProfile(res.data.data);
            } catch (err) {
                if (err.response?.status === 404) setProfile(null);
                else setError(err.response?.data?.message || "Uplink Failed");
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen bg-[#030305] text-purple-500">
                <Loader2 className="animate-spin mb-4" size={48} />
                <p className="text-xs font-bold tracking-[0.3em] uppercase animate-pulse">Decrypting Profile...</p>
            </div>
        );
    }

    if (!profile && !error) {
        return (
            <div className="min-h-screen bg-[#030305] flex items-center justify-center p-6">
                <div className="max-w-md w-full bg-[#0a0a0f] border border-dashed border-gray-800 p-10 rounded-[2.5rem] text-center backdrop-blur-xl">
                    <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-800">
                        <User size={40} className="text-gray-600" />
                    </div>
                    <h2 className="text-2xl font-black text-white mb-2">No Profile Found</h2>
                    <p className="text-gray-500 mb-8 text-sm">The archive has no record of this curator. Initialize your identity to continue.</p>
                    <Link to="/set-profile" className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:scale-105 transition-transform">
                        Initialize Profile
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#030305] text-white pt-32 pb-20 px-6 relative overflow-hidden selection:bg-purple-500/30">
            {/* Background Glows */}
            <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto relative z-10">

                {/* Back Navigation */}
                <Link to="/dashboard" className="inline-flex items-center gap-2 text-gray-500 hover:text-purple-400 mb-8 transition-colors group">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-bold uppercase tracking-widest">Back to Command</span>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* --- LEFT COLUMN: IDENTITY CARD --- */}
                    <div className="lg:col-span-4">
                        <div className="bg-[#0a0a0f]/80 backdrop-blur-2xl border border-gray-800 p-8 rounded-[3rem] sticky top-32 text-center shadow-2xl">
                            <div className="relative inline-block mb-6">
                                {/* Animated Rings */}
                                <div className="absolute inset-0 rounded-full border-2 border-purple-500/30 animate-[ping_3s_ease-in-out_infinite]"></div>
                                <div className="absolute inset-[-8px] rounded-full border border-blue-500/20 rotate-45"></div>

                                <img
                                    src={`http://localhost:4000/${profile?.profileImage}`}
                                    alt="Curator"
                                    className="relative w-32 h-32 rounded-full border-4 border-[#0a0a0f] object-cover shadow-[0_0_30px_rgba(0,0,0,0.5)] z-10"
                                    onError={(e) => { e.target.src = "https://via.placeholder.com/150" }}
                                />
                            </div>

                            <h2 className="text-2xl font-black tracking-tight text-white mb-1 uppercase">
                                {profile?.user?.name || "Unknown Curator"}
                            </h2>
                            <div className="flex items-center justify-center gap-2 mb-6">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Authorized Personnel</span>
                            </div>

                            <div className="space-y-3">
                                <Link
                                    to="/set-profile"
                                    className="flex items-center justify-center gap-2 w-full py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl font-bold transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                                >
                                    <Edit3 size={18} /> Update Data
                                </Link>
                                <div className="p-4 bg-gray-900/50 rounded-2xl border border-gray-800/50 text-[10px] text-gray-500 font-mono text-left leading-relaxed">
                                    UUID: {profile?._id?.substring(0, 18).toUpperCase()}...<br />
                                    CLEARANCE: LEVEL_4_CURATOR
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- RIGHT COLUMN: DATA TERMINAL --- */}
                    <div className="lg:col-span-8 space-y-6">

                        {/* Bio Section */}
                        <div className="bg-[#0a0a0f]/60 backdrop-blur-md border border-gray-800 p-8 rounded-[2.5rem]">
                            <h3 className="text-xs font-black text-purple-400 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                                <AlignLeft size={14} /> Curator Narrative
                            </h3>
                            <p className="text-gray-300 text-lg leading-relaxed font-light italic">
                                "{profile?.bio || "No narrative established for this entity."}"
                            </p>
                        </div>

                        {/* Metadata Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                            {/* Email */}
                            <div className="bg-gray-900/40 border border-gray-800/50 p-6 rounded-3xl flex    items-center gap-5 group hover:border-blue-500/30 transition-colors">
                                <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Neural Link</p>
                                    <p className="text-sm font-bold text-gray-200">{profile?.user?.email || "N/A"}</p>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="bg-gray-900/40 border border-gray-800/50 p-6 rounded-3xl flex items-center gap-5 group hover:border-emerald-500/30 transition-colors">
                                <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Comm Channel</p>
                                    <p className="text-sm font-bold text-gray-200">{profile?.phone || "Disconnected"}</p>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="bg-gray-900/40 border border-gray-800/50 p-6 rounded-3xl flex items-center gap-5 group hover:border-red-500/30 transition-colors">
                                <div className="p-3 bg-red-500/10 rounded-xl text-red-400">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Sector Coordinates</p>
                                    <p className="text-sm font-bold text-gray-200">{profile?.location || "Deep Space"}</p>
                                </div>
                            </div>

                            {/* Status */}
                            <div className="bg-gray-900/40 border border-gray-800/50 p-6 rounded-3xl flex items-center gap-5 group hover:border-amber-500/30 transition-colors">
                                <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400">
                                    <ShieldCheck size={24} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Access Protocol</p>
                                    <p className="text-sm font-bold text-gray-200">Authenticated</p>
                                </div>
                            </div>
                        </div>

                        {/* Visual Accent: System Output */}
                        <div className="pt-6">
                            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-800 to-transparent mb-6"></div>
                            <div className="flex justify-between items-center px-4">
                                <div className="flex gap-2">
                                    <div className="w-2 h-2 rounded-full bg-purple-500/40"></div>
                                    <div className="w-2 h-2 rounded-full bg-blue-500/40"></div>
                                    <div className="w-2 h-2 rounded-full bg-gray-800"></div>
                                </div>
                                <span className="text-[10px] font-mono text-gray-600 tracking-tighter">ARCHIVE_UPLINK_STABLE // 2026.03.02</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileView;