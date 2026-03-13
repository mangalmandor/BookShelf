import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import Swal from 'sweetalert2';
import { Mail, Lock, LogIn, ShieldCheck, Cpu, Loader2, ArrowRight } from 'lucide-react';

// --- FIREBASE IMPORTS ---
import { auth, googleProvider } from '../firebaseAuth/firebaseConfig';
import { signInWithPopup } from 'firebase/auth';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [formData, setFormData] = useState({
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

    // --- ENHANCED MARS ALERTS ---
    const showSuccessAlert = (title) => {
        Swal.fire({
            icon: 'success',
            title,
            text: 'Biometric Match Confirmed 🚀',
            background: '#0a0a0f',
            color: '#fff',
            showConfirmButton: false,
            timer: 1500,
            customClass: { popup: 'rounded-[2rem] border border-emerald-500/20 shadow-2xl backdrop-blur-xl' }
        });
        setTimeout(() => navigate("/dashboard"), 1500);
    };

    const showErrorAlert = (message) => {
        Swal.fire({
            icon: 'error',
            title: 'Access Denied',
            text: message,
            background: '#0a0a0f',
            color: '#fff',
            confirmButtonColor: '#ef4444',
            customClass: { popup: 'rounded-[2rem] border border-red-500/20' }
        });
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const fbUser = result.user;
            const idToken = await fbUser.getIdToken(true);

            const res = await axios.post(
                "http://localhost:4000/api/google-login",
                { idToken },
                { withCredentials: true }
            );
            console.log(res);

            login(res.data.user, res.data.token);
            showSuccessAlert(`Welcome back, ${res.data.user.name.split(' ')[0]}!`);
        } catch (error) {
            showErrorAlert(error.response?.data?.message || "Google Authentication Failed");
            console.log(error)
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(
                "http://localhost:4000/api/login",
                formData,
                { withCredentials: true }
            );
            login(res.data.user, res.data.token);
            showSuccessAlert("Authorized Access Granted");
        } catch (error) {
            showErrorAlert(error.response?.data?.message || "Invalid Credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#030305] text-white flex items-center justify-center relative overflow-hidden px-4 py-20">
            {/* Ambient Background Energy */}
            <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-md w-full relative">
                {/* Decorative Border Glow */}
                <div className="absolute -inset-0.5 bg-gradient-to-b from-blue-500/20 to-purple-500/20 rounded-[2.5rem] blur-sm"></div>

                <div className="relative bg-[#0a0a0f]/90 backdrop-blur-3xl rounded-[2.5rem] p-10 border border-white/5 shadow-2xl">

                    {/* Header: System Gateway */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-900 rounded-3xl border border-blue-500/20 mb-6 shadow-inner relative group">
                            <div className="absolute inset-0 bg-blue-500/10 rounded-3xl blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <Cpu className="text-blue-500 relative z-10" size={38} />
                        </div>
                        <h2 className="text-3xl font-black tracking-tighter text-white mb-2 uppercase italic">
                            System <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Gateway</span>
                        </h2>
                        <p className="text-gray-500 text-[10px] font-bold tracking-[0.3em] uppercase">
                            Secure Core Authentication Protocol
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Input */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Neural Link (Email)</label>
                            <div className="relative group/input">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within/input:text-blue-400 transition-colors" size={18} />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="curator@mission.io"
                                    required
                                    className="w-full bg-gray-950/50 border border-gray-800 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold text-white outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all placeholder:text-gray-700"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-4">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Access Key</label>
                                <Link to="/forgot-password" size={10} className="text-[10px] font-bold text-blue-500 hover:text-blue-300 uppercase tracking-tighter transition-colors">
                                    Reset Protocol?
                                </Link>
                            </div>
                            <div className="relative group/input">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within/input:text-indigo-400 transition-colors" size={18} />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    required
                                    className="w-full bg-gray-950/50 border border-gray-800 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold text-white outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/5 transition-all placeholder:text-gray-700"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="relative w-full group overflow-hidden py-4 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_40px_rgba(37,99,235,0.5)] transition-all active:scale-[0.98] disabled:opacity-70"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                {loading ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        Verifying...
                                    </>
                                ) : (
                                    <>
                                        Request Access
                                        <LogIn size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </span>
                        </button>

                        {/* Divider */}
                        <div className="relative flex items-center justify-center py-2">
                            <div className="w-full border-t border-gray-800"></div>
                            <span className="absolute px-4 bg-[#0a0a0f] text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                                OAuth Uplink
                            </span>
                        </div>

                        {/* Google Login Button */}
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            disabled={loading}
                            className="w-full bg-transparent border border-gray-800 hover:border-blue-500/50 hover:bg-blue-500/5 text-gray-300 font-bold text-xs uppercase tracking-widest py-4 rounded-2xl flex items-center justify-center gap-3 transition-all"
                        >
                            <img
                                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                                alt="Google"
                                className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all"
                            />
                            Authenticate via Google
                        </button>
                    </form>

                    {/* Footer: Identity Link */}
                    <div className="mt-10 text-center">
                        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                            New Curator?{' '}
                            <Link to="/signup" className="text-blue-400 hover:text-white transition-colors underline underline-offset-8 decoration-blue-500/20">
                                Create Identity
                            </Link>
                        </p>
                    </div>

                    {/* Technical HUD Details */}
                    <div className="absolute top-10 right-10 opacity-10 flex flex-col items-end pointer-events-none">
                        <ShieldCheck size={40} className="text-blue-500 mb-1" />
                        <span className="text-[8px] font-mono tracking-tighter uppercase">SSL_ENCRYPTED</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;