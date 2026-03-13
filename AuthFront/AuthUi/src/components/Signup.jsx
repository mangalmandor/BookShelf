// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Swal from 'sweetalert2'; 


// const Signup = () => {
//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         password: ""
//     });

//     const [loading, setLoading] = useState(false);

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         try {
//             // Backend API Call to send OTP
//             const res = await axios.post(`http://localhost:4000/api/send-otp`, { 
//                 email: formData.email 
//             });

//             if (res.status === 200 || res.data.successful) {
//                 // --- SUCCESS ALERT ---
//                 Swal.fire({
//                     icon: 'success',
//                     title: 'OTP Sent! 📧',
//                     text: `A 6-digit verification code has been sent to ${formData.email}`,
//                     background: '#111827',
//                     color: '#fff',
//                     confirmButtonColor: '#3b82f6',
//                     confirmButtonText: 'Verify Now',
//                     customClass: {
//                         popup: 'rounded-2xl border border-gray-800'
//                     }
//                 }).then((result) => {
//                     // Alert band hone ke baad navigate karega
//                     navigate("/verify-otp", { state: { tempUserData: formData } });
//                 });
//             }
//         } catch (error) {
//             console.error("Signup failed:", error);
//             const errorMsg = error.response?.data?.message || "Something went wrong. Please try again.";

//             // --- ERROR ALERT ---
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Signup Failed',
//                 text: errorMsg,
//                 background: '#111827',
//                 color: '#fff',
//                 confirmButtonColor: '#ef4444',
//                 confirmButtonText: 'Try Again',
//                 customClass: {
//                     popup: 'rounded-2xl border border-gray-800'
//                 }
//             });
//         } finally {
//             setLoading(false);
//         }
//     };
//     return (
//         <div className="flex items-center justify-center flex-grow px-4 mt-20 mb-10">
//             {/* Signup Card */}
//             <div className="max-w-md w-full bg-gray-800/40 backdrop-blur-xl rounded-2xl p-8 border border-gray-700 shadow-2xl">

//                 {/* Header */}
//                 <div className="text-center mb-8">
//                     <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight">
//                         Join the <span className="text-blue-500">Mission</span>
//                     </h2>
//                     <p className="text-gray-400 text-sm">
//                         Create an account to explore the MERN universe.
//                     </p>
//                 </div>

//                 {/* Form */}
//                 <form onSubmit={handleSubmit} className="space-y-5">

//                     {/* Name Field */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-300 mb-1.5" htmlFor="name">
//                             Full Name
//                         </label>
//                         <input
//                             type="text"
//                             id="name"
//                             name="name"
//                             value={formData.name}
//                             onChange={handleChange}
//                             placeholder="John Doe"
//                             required
//                             className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
//                         />
//                     </div>

//                     {/* Email Field */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-300 mb-1.5" htmlFor="email">
//                             Email Address
//                         </label>
//                         <input
//                             type="email"
//                             id="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             placeholder="john@example.com"
//                             required
//                             className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
//                         />
//                     </div>

//                     {/* Password Field */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-300 mb-1.5" htmlFor="password">
//                             Password
//                         </label>
//                         <input
//                             type="password"
//                             id="password"
//                             name="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             placeholder="••••••••"
//                             required
//                             className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
//                         />
//                     </div>

//                     {/* Submit Button */}
//                     <button
//                         type="submit"
//                         disabled={loading}
//                         className={`w-full ${loading ? 'bg-blue-800' : 'bg-blue-600 hover:bg-blue-700'} text-white font-bold py-3 rounded-lg mt-4 shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all`}
//                     >
//                         {loading ? "Sending OTP..." : "Sign Up"}
//                     </button>

//                 </form>

//                 {/* Footer Text */}
//                 <div className="mt-6 text-center text-sm text-gray-400">
//                     Already have an account?{' '}
//                     <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
//                         Login here
//                     </Link>
//                 </div>

//             </div>
//         </div>
//     );
// };

// export default Signup;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { User, Mail, Lock, ArrowRight, Loader2, ShieldCheck, Zap } from 'lucide-react';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post(`http://localhost:4000/api/send-otp`, {
                email: formData.email
            });

            if (res.status === 200 || res.data.successful) {
                Swal.fire({
                    icon: 'success',
                    title: 'Access Requested',
                    text: `Verification code dispatched to ${formData.email}`,
                    background: '#0a0a0f',
                    color: '#fff',
                    confirmButtonColor: '#8b5cf6',
                    confirmButtonText: 'Enter Protocol',
                    customClass: { popup: 'rounded-[2rem] border border-purple-500/20 shadow-2xl backdrop-blur-xl' }
                }).then(() => {
                    navigate("/verify-otp", { state: { tempUserData: formData } });
                });
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Signal lost. Please try again.";
            Swal.fire({
                icon: 'error',
                title: 'Uplink Failed',
                text: errorMsg,
                background: '#0a0a0f',
                color: '#fff',
                confirmButtonColor: '#ef4444',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#030305] text-white flex items-center justify-center relative overflow-hidden px-4 py-20">
            {/* Background Aesthetic Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>

            {/* Main Terminal Card */}
            <div className="max-w-md w-full relative group">
                {/* Outer Glow Decoration */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

                <div className="relative bg-[#0a0a0f]/80 backdrop-blur-3xl rounded-[2.5rem] p-10 border border-gray-800 shadow-2xl">

                    {/* Header: Sci-Fi Style */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 rounded-2xl border border-gray-800 mb-6 shadow-inner">
                            <ShieldCheck className="text-purple-500" size={32} />
                        </div>
                        <h2 className="text-3xl font-black tracking-tighter text-white mb-2 uppercase">
                            Initialize <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Access</span>
                        </h2>
                        <p className="text-gray-500 text-xs font-bold tracking-[0.2em] uppercase">
                            Secure your bridge to the Grand Archive
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Input */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-4">Full Name</label>
                            <div className="relative group/input">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within/input:text-purple-500 transition-colors" size={18} />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter Curator Name"
                                    required
                                    className="w-full bg-gray-950/50 border border-gray-800 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold text-white outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/5 transition-all placeholder:text-gray-700"
                                />
                            </div>
                        </div>

                        {/* Email Input */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-4">Neural Link (Email)</label>
                            <div className="relative group/input">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within/input:text-blue-500 transition-colors" size={18} />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="curator@marsui.io"
                                    required
                                    className="w-full bg-gray-950/50 border border-gray-800 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold text-white outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all placeholder:text-gray-700"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-4">Access Key</label>
                            <div className="relative group/input">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within/input:text-amber-500 transition-colors" size={18} />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    required
                                    className="w-full bg-gray-950/50 border border-gray-800 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold text-white outline-none focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/5 transition-all placeholder:text-gray-700"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="relative w-full group overflow-hidden py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] transition-all active:scale-[0.98] disabled:opacity-70"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                {loading ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        Requesting OTP...
                                    </>
                                ) : (
                                    <>
                                        Establish Identity
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </span>
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </button>
                    </form>

                    {/* Footer Links */}
                    <div className="mt-10 text-center">
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
                            Authorized personnel only?{' '}
                            <Link to="/login" className="text-purple-400 hover:text-white transition-colors underline underline-offset-4 decoration-purple-500/30">
                                Login Here
                            </Link>
                        </p>
                    </div>

                    {/* System Decorative Metadata */}
                    <div className="absolute bottom-4 left-0 w-full flex justify-between px-10 opacity-10 pointer-events-none">
                        <span className="text-[8px] font-mono tracking-tighter">SEC_LVL: 04</span>
                        <Zap size={10} />
                        <span className="text-[8px] font-mono tracking-tighter">UPLINK_STABLE</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;