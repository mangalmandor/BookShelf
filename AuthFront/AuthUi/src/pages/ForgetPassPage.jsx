import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

 const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        // API Call
        const res = await axios.post("http://localhost:4000/api/forgot-password", { email });

        // Agar backend success return karta hai
        if (res.data.success || res.data.successful) {
            
            // --- SUCCESS ALERT ---
            Swal.fire({
                icon: 'success',
                title: 'Check Your Inbox! 📧',
                text: `A password reset code has been sent to ${email}`,
                background: '#111827',
                color: '#fff',
                confirmButtonColor: '#3b82f6',
                confirmButtonText: 'Enter Code',
                customClass: {
                    popup: 'rounded-2xl border border-gray-800'
                }
            }).then((result) => {
                // Alert band hone ke baad hi navigate karega
                if (result.isConfirmed || result.isDismissed) {
                    navigate("/reset-password", { state: { email: email } });
                }
            });
        }
    } catch (error) {
        console.error("Forgot password error:", error);
        const errorMsg = error.response?.data?.message || "Something went wrong.";

        // --- ERROR ALERT ---
        Swal.fire({
            icon: 'error',
            title: 'Request Failed',
            text: errorMsg,
            background: '#111827',
            color: '#fff',
            confirmButtonColor: '#ef4444',
            confirmButtonText: 'Back',
            customClass: {
                popup: 'rounded-2xl border border-gray-800'
            }
        });
    } finally {
        setLoading(false);
    }
};
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#0a0a0b] px-4">
            <div className="max-w-md w-full bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-800 shadow-2xl">
                
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-extrabold text-white mb-2">Forgot <span className="text-blue-500">Password?</span></h2>
                    <p className="text-gray-400 text-sm">
                        Enter your email and we'll send an OTP to reset your password.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@company.com"
                            required
                            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-4 rounded-xl font-bold text-white tracking-wide transition-all ${
                            loading 
                            ? 'bg-blue-800 cursor-not-allowed' 
                            : 'bg-blue-600 hover:bg-blue-700 shadow-[0_0_20px_rgba(37,99,235,0.3)]'
                        }`}
                    >
                        {loading ? "Sending OTP..." : "Get OTP"}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <Link to="/login" className="text-sm text-gray-500 hover:text-white transition-colors">
                        ← Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;