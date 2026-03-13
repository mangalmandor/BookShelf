import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const ResetPassword = () => {
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    
    const inputRefs = useRef([]);
    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email;
    const isOtpComplete = otp.every(digit => digit !== "");

    useEffect(() => {
        if (!email) {
            alert("Session expired. Please enter your email again.");
            navigate("/forgot-password");
        }
    }, [email, navigate]);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;
        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);
        if (element.value !== "" && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    const finalOtp = otp.join("");
    setLoading(true);

    try {
        const res = await axios.post("http://localhost:4000/api/reset-password", {
            email,
            otp: finalOtp,
            newPassword
        });

        if (res.data.success || res.data.successful) {
            // --- SUCCESS ALERT ---
            Swal.fire({
                icon: 'success',
                title: 'Password Reset! 🔐',
                text: 'Your password has been updated successfully. You can now log in with your new password.',
                background: '#111827',
                color: '#fff',
                confirmButtonColor: '#3b82f6',
                confirmButtonText: 'Go to Login',
                customClass: {
                    popup: 'rounded-2xl border border-gray-800'
                }
            }).then((result) => {
                // Jab user button click karega tabhi login page par jayega
                if (result.isConfirmed) {
                    navigate("/login");
                }
            });
        }
    } catch (error) {
        console.error("Reset failed:", error);
        const errorMsg = error.response?.data?.message || "Invalid OTP or Server Error";

        // --- ERROR ALERT ---
        Swal.fire({
            icon: 'error',
            title: 'Reset Failed',
            text: errorMsg,
            background: '#111827',
            color: '#fff',
            confirmButtonColor: '#ef4444',
            confirmButtonText: 'Try Again',
            customClass: {
                popup: 'rounded-2xl border border-gray-800'
            }
        });
    } finally {
        setLoading(false);
    }
};
    return (
        // mt-10 use kiya hai taaki upar se height balance rahe
        <div className="flex items-center justify-center min-h-screen bg-[#0a0a0b] px-4 py-10">
            {/* p-6 kiya hai p-8 ki jagah taaki height kam ho jaye */}
            <div className="max-w-md w-full bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-800 shadow-2xl">
                
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-extrabold text-white mb-1">Reset <span className="text-blue-500">Password</span></h2>
                    <p className="text-gray-400 text-xs">
                        Code sent to: <span className="text-blue-400 font-medium">{email}</span>
                    </p>
                </div>

                {/* space-y-5 kiya hai height compact rakhne ke liye */}
                <form onSubmit={handleResetSubmit} className="space-y-5">
                    <div className="space-y-3">
                        <div className="flex justify-between gap-2">
                            {otp.map((data, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    value={data}
                                    onChange={(e) => handleChange(e.target, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    className={`w-11 h-12 text-center text-xl font-bold bg-gray-800 border ${isOtpComplete ? 'border-green-500/50' : 'border-gray-700'} rounded-xl text-white focus:border-blue-500 outline-none transition-all`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Transition section ko compact rakha hai */}
                    <div className={`space-y-4 transition-all duration-500 transform ${isOtpComplete ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                        {isOtpComplete && <hr className="border-gray-800" />}
                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">
                                New Password
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required={isOtpComplete}
                                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white focus:border-blue-500 outline-none text-sm transition-all"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !isOtpComplete}
                            className={`w-full py-3 rounded-xl font-bold text-white text-sm transition-all ${
                                loading ? 'bg-blue-800' : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/10'
                            }`}
                        >
                            {loading ? "Updating..." : "Update Password"}
                        </button>
                    </div>
                </form>

                <div className="mt-5 text-center">
                    <button onClick={() => navigate("/forgot-password")} className="text-[10px] text-gray-500 hover:text-white transition-colors uppercase tracking-[2px]">
                        ← Back to Email
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;