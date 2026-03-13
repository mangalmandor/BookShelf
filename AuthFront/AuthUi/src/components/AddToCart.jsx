import React from 'react';
import { useCart } from '../context/cartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  // Fallback price logic in case your DB schema doesn't have prices yet
  const getPrice = (item) => item.price || 19.99;

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center py-20 selection:bg-purple-500/30 relative overflow-hidden font-sans">

      {/* Background Cinematic Glows */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amber-900/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none mix-blend-overlay"></div>

      {/* FIXED WIDTH & HEIGHT CONTAINER */}
      <div className="w-[600px] h-[550px] mx-auto p-8 bg-[#0a0a0f]/90 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-3xl text-gray-200 flex flex-col border border-gray-800 relative z-10">

        <div className="flex justify-between items-center mb-6 border-b border-gray-800/80 pb-4 shrink-0">
          <h2 className="text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500">
            Your Library
          </h2>
          <span className="bg-purple-900/30 border border-purple-500/30 text-purple-400 py-1 px-4 rounded-full text-sm font-bold tracking-widest uppercase">
            {cart.length} {cart.length === 1 ? 'Volume' : 'Volumes'}
          </span>
        </div>

        {cart.length === 0 ? (
          /* --- EMPTY STATE --- */
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
            <div className="bg-gray-900/80 border border-gray-800 p-6 rounded-full shadow-inner relative group">
              <div className="absolute inset-0 bg-purple-500/10 rounded-full blur-md group-hover:bg-purple-500/20 transition-all duration-500"></div>
              <svg className="w-16 h-16 text-gray-600 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <p className="text-gray-400 text-lg font-medium italic">Your collection is empty...</p>
              <p className="text-gray-600 text-sm mt-1">Discover new knowledge in the archives.</p>
            </div>

            {/* REDIRECT BUTTON */}
            <button
              onClick={() => navigate('/products')}
              className="bg-purple-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-purple-500 transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] active:scale-95 flex items-center gap-3 mt-4"
            >
              <span>Explore Archives</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        ) : (
          <>
            {/* SCROLLABLE LIST */}
            <div className="space-y-3 flex-1 overflow-y-auto pr-3 scroll-smooth custom-scrollbar">
              {cart.map((item) => (
                <div key={item._id} className="flex justify-between items-center bg-gray-900/50 p-4 rounded-2xl hover:bg-gray-800 transition-colors border border-gray-800/80 hover:border-purple-500/30 group">

                  <div className="flex items-center gap-4 max-w-[70%] cursor-pointer" onClick={() => navigate(`/product/${item._id}`)}>
                    {/* Updated to coverImageUrl */}
                    <img
                      src={item.coverImageUrl}
                      alt={item.title}
                      className="w-12 h-16 object-cover rounded shadow-md border border-gray-700 shrink-0 group-hover:shadow-purple-500/20 transition-all"
                    />
                    <div className="min-w-0">
                      <span className="text-base font-bold block truncate text-gray-200 group-hover:text-purple-400 transition-colors">
                        {item.title}
                      </span>
                      <p className="text-xs text-gray-500 font-medium italic truncate w-full">by {item.author}</p>
                      <p className="text-xs font-bold text-amber-500 mt-1 uppercase tracking-widest">Qty: {item.quantity}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 shrink-0">
                    <p className="font-black text-lg text-white tracking-tight">
                      <span className="text-purple-500 text-sm mr-1">$</span>
                      {(getPrice(item) * item.quantity).toFixed(2)}
                    </p>
                    {/* Delete uses _id */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromCart(item._id);
                      }}
                      className="p-2.5 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-full transition-all active:scale-90"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* FIXED FOOTER */}
            <div className="mt-6 pt-5 border-t border-gray-800/80 shrink-0">
              <div className="flex justify-between items-end font-black text-2xl text-white mb-6">
                <span className="text-gray-400 text-lg font-medium tracking-wide">Total Investment</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 drop-shadow-md">
                  ${cart.reduce((acc, curr) => acc + (getPrice(curr) * curr.quantity), 0).toFixed(2)}
                </span>
              </div>

              <button className="w-full bg-purple-600 text-white py-4 rounded-2xl font-bold tracking-wide text-lg hover:bg-purple-500 transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] active:scale-[0.98]">
                Secure Access
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;