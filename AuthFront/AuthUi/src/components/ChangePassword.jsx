import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Lock, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // Toggle visibility

    const navigate = useNavigate();

    const handleUpdate = async (e) => {
        e.preventDefault();
        
        // Basic Validation
        if (!oldPassword || !newPassword) {
            return Swal.fire({
                icon: 'error',
                title: 'Opps...',
                text: 'Both fields are required!',
                background: '#111827',
                color: '#fff'
            });
        }

        if (newPassword.length < 6) {
            return Swal.fire({
                icon: 'warning',
                title: 'Weak Password',
                text: 'New password must be at least 6 characters long.',
                background: '#111827',
                color: '#fff'
            });
        }

        setLoading(true);
        try {
            const res = await axios.post('http://localhost:4000/api/change-password', 
                { oldPassword, newPassword }, 
                { withCredentials: true }
            );
            console.log(res);

                if (res.data.successful) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Security Updated! ✨',
                        text: 'Your password has been changed successfully.',
                        background: '#111827',
                        color: '#fff',
                        confirmButtonColor: '#3b82f6',
                    });
                    setOldPassword('');
                    setNewPassword('');

                    navigate('/login');

                }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: error.response?.data?.message || 'Something went wrong!',
                background: '#111827',
                color: '#fff'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md bg-gray-900/40 border border-gray-800 p-8 rounded-3xl backdrop-blur-xl shadow-2xl mx-auto my-30">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                    <ShieldCheck size={24} />
                </div>
                <h2 className="text-2xl font-bold">Update <span className="text-purple-500">Security</span></h2>
            </div>

            <form onSubmit={handleUpdate} className="space-y-5">
                {/* Old Password */}
                <div className="relative">
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-2 ml-1">Current Password</label>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            type={showPassword ? "text" : "password"}
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            placeholder="Enter old password"
                            className="w-full bg-gray-800/50 border border-gray-700 rounded-xl pl-12 pr-4 py-3 focus:border-purple-500 outline-none transition-all text-sm"
                        />
                    </div>
                </div>

                {/* New Password */}
                <div className="relative">
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-2 ml-1">New Security Key</label>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            type={showPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Min. 6 characters"
                            className="w-full bg-gray-800/50 border border-gray-700 rounded-xl pl-12 pr-12 py-3 focus:border-purple-500 outline-none transition-all text-sm"
                        />
                        <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3.5 rounded-xl font-bold transition-all shadow-lg ${
                        loading 
                        ? 'bg-purple-800 cursor-wait opacity-70' 
                        : 'bg-purple-600 hover:bg-purple-700 shadow-purple-600/20'
                    }`}
                >
                    {loading ? "Rewriting Encryption..." : "Update Password"}
                </button>
            </form>
        </div>
    );
};

export default ChangePassword;