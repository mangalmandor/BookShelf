import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const VerifyOtp = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const location = useLocation();
  const navigate = useNavigate();
  const tempUserData = location.state?.tempUserData;

  useEffect(() => {
    if (!tempUserData) {
      // Swall for missing data redirect
      Swal.fire({
        icon: 'warning',
        title: 'Session Expired',
        text: 'No data found. Please fill signup form first.',
        background: '#111827',
        color: '#fff',
        confirmButtonColor: '#3b82f6',
      }).then(() => {
        navigate("/signup");
      });
    }
  }, [tempUserData, navigate]);

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

  const handlePaste = (e) => {
    const data = e.clipboardData.getData("text").slice(0, 6);
    if (isNaN(data)) return;
    const pasteData = data.split("");
    setOtp(pasteData);
    const lastIdx = pasteData.length - 1;
    if (inputRefs.current[lastIdx]) inputRefs.current[lastIdx].focus();
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const finalOtp = otp.join("");

    // --- ALERT 1: AGAR OTP INCOMPLETE HAI ---
    if (finalOtp.length < 6) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete OTP',
        text: 'Please enter all 6 digits of the code.',
        background: '#111827',
        color: '#fff',
        confirmButtonColor: '#f59e0b', // Orange color for warning
        customClass: {
          popup: 'rounded-2xl border border-gray-800'
        }
      });
      return;
    }

    setLoading(true);
    try {
      const finalPayload = {
        ...tempUserData,
        inputOtp: finalOtp
      };

      const res = await axios.post(`http://localhost:4000/api/verify-and-register`, finalPayload);

      if (res.status === 201 || res.data.successful) {
        // --- ALERT 2: SUCCESS REGISTRATION ---
        Swal.fire({
          icon: 'success',
          title: 'Account Created! 🎉',
          text: 'Welcome to the club! You can now login.',
          background: '#111827',
          color: '#fff',
          confirmButtonColor: '#10b981', // Green button
          confirmButtonText: 'Let\'s Go Login',
          customClass: {
            popup: 'rounded-2xl border border-gray-800'
          }
        }).then(() => {
          navigate("/login");
        });
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Invalid OTP or registration failed.";
      
      // --- ALERT 3: ERROR OTP ---
      Swal.fire({
        icon: 'error',
        title: 'Verification Failed',
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
    <div className="flex items-center justify-center min-h-screen bg-[#0a0a0b] px-4">
      <div className="max-w-md w-full bg-gray-900/50 backdrop-blur-xl rounded-3xl p-10 border border-gray-800 shadow-2xl">

        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-white mb-3 tracking-tight">
            Security <span className="text-blue-500">Check</span>
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            We've sent a code to <br />
            <span className="text-blue-400 font-medium">{tempUserData?.email}</span>
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-8">
          {/* 6 OTP Boxes Section */}
          <div className="flex justify-center gap-3" onPaste={handlePaste}>
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                ref={(el) => (inputRefs.current[index] = el)}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-14 md:w-14 md:h-16 text-center text-2xl font-bold bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-inner"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold text-white tracking-wide transition-all ${loading
                ? 'bg-blue-800 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 shadow-[0_0_20px_rgba(37,99,235,0.3)]'
              }`}
          >
            {loading ? "Verifying..." : "Verify Identity"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/signup")}
            className="text-xs uppercase tracking-widest text-gray-500 hover:text-blue-400 transition-colors font-semibold"
          >
            ← Resend or Change Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;