import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/cartContext';
import { useNavigate } from 'react-router-dom';
import PagesPagination from './PagesPagination';
import Swal from 'sweetalert2';

// --- ULTIMATE REALISTIC 3D BOOK SKELETON ---
const SkeletonCard = () => (
  <div className="w-full aspect-[2/3] bg-[#1a1a24] rounded-r-2xl rounded-l-md border-l-8 border-[#0f0f15] relative overflow-hidden animate-pulse shadow-[5px_5px_0px_#2a2a35,10px_10px_20px_rgba(0,0,0,0.5)]">
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
    <div className="absolute bottom-6 left-6 right-6 space-y-3">
      <div className="h-4 bg-white/10 rounded w-3/4"></div>
      <div className="h-3 bg-white/10 rounded w-1/2"></div>
    </div>
  </div>
);

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const { addToCart, cart } = useCart();
  const navigate = useNavigate();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/books/read-books`, {
          withCredentials: true
        });
        setProducts(res.data);
        setFilteredProducts(res.data);
        setTimeout(() => setLoading(false), 1000); // Slight delay to show off the cool skeleton
      } catch (err) {
        console.error("Fetch Error:", err);
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const filtered = products.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
      setCurrentPage(1);
    }, 400);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, products]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddToCart = (item) => {
    addToCart(item);
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      icon: 'success',
      title: 'Added to Library',
      text: item.title,
      showConfirmButton: false,
      timer: 2000,
      background: '#0a0a0a',
      color: '#e2e8f0',
      iconColor: '#a855f7',
      customClass: {
        popup: 'border border-gray-800 rounded-2xl shadow-2xl'
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 p-6 font-serif selection:bg-purple-500/30 overflow-hidden relative">

      {/* --- MOODY LIBRARY LIGHTING --- */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-amber-900/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none mix-blend-overlay"></div>

      {/* FLOATING ACTION BUTTON */}
      <button
        onClick={() => navigate('/cart')}
        className="fixed bottom-10 right-10 z-50 bg-gradient-to-tr from-gray-900 to-gray-800 text-amber-500 p-4 rounded-full shadow-[0_0_40px_rgba(245,158,11,0.15)] hover:scale-110 transition-transform active:scale-95 group border border-gray-700 hover:border-amber-500/50"
      >
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-amber-500 text-gray-900 text-xs font-black h-6 w-6 flex items-center justify-center rounded-full border-2 border-gray-900 shadow-lg">
            {totalItems}
          </span>
        )}
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </button>

      {/* HEADER */}
      <header className="max-w-3xl mx-auto mb-20 pt-16 text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-gray-100 to-gray-600 drop-shadow-sm">
          The Grand Archive
        </h1>

        <div className="relative mt-12 group font-sans">
          <input
            type="text"
            placeholder="Search the archives by title or author..."
            className="w-full bg-gray-900/60 backdrop-blur-md p-5 pl-14 rounded-2xl border border-gray-800 focus:border-purple-500/50 outline-none transition-all shadow-[0_10px_40px_rgba(0,0,0,0.5)] text-lg placeholder-gray-600 focus:ring-4 focus:ring-purple-500/10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg className="absolute left-5 top-5 h-6 w-6 text-gray-500 group-focus-within:text-purple-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </header>

      {/* PRODUCT GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-12 gap-y-24 mb-20 relative z-10 px-4 md:px-8">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
        ) : currentItems.map((item) => {
          const isInCart = cart.some((c) => c._id === item._id);

          return (
            <div
              key={item._id}
              onClick={() => navigate(`/product/${item._id}`)}
              className="group cursor-pointer relative flex flex-col items-center"
            >
              {/* --- ULTIMATE 3D BOOK COVER --- */}
              <div
                className="relative w-full aspect-[2/3] rounded-r-xl rounded-l-sm transition-all duration-500 ease-out origin-bottom 
                group-hover:-translate-y-6 group-hover:rotate-2 group-hover:scale-105
                shadow-[2px_2px_0px_#e5e7eb,4px_4px_0px_#d1d5db,6px_6px_0px_#9ca3af,15px_20px_25px_rgba(0,0,0,0.8)]
                group-hover:shadow-[4px_4px_0px_#e5e7eb,8px_8px_0px_#d1d5db,12px_12px_0px_#9ca3af,25px_30px_40px_rgba(0,0,0,0.9)]"
              >
                {/* Book Cover Image */}
                <img
                  src={item.coverImageUrl}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover rounded-r-xl rounded-l-sm border border-black/20"
                />

                {/* The Hinge/Spine Crease (Creates depth on the left edge) */}
                <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-black/60 via-black/10 to-transparent mix-blend-multiply rounded-l-sm z-10"></div>
                <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-white/20 z-10"></div>
                <div className="absolute top-0 bottom-0 left-8 w-[1px] bg-black/20 z-10"></div>

                {/* The Glossy Sheen (Sweeps across on hover) */}
                <div className="absolute inset-0 rounded-r-xl rounded-l-sm overflow-hidden z-20">
                  <div className="absolute top-0 bottom-0 left-[-150%] w-[100%] bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-30deg] group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out"></div>
                </div>

                {/* Lighting Vignette */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 rounded-r-xl rounded-l-sm z-10 opacity-80 group-hover:opacity-60 transition-opacity"></div>

                {/* Add to Library Button (Appears on hover) */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isInCart) handleAddToCart(item);
                  }}
                  className={`absolute bottom-4 right-4 z-30 p-3 rounded-full shadow-2xl transition-all duration-300 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 ${isInCart
                    ? 'bg-purple-600 text-white cursor-default'
                    : 'bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-black border border-white/20'
                    }`}
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isInCart ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                    )}
                  </svg>
                </button>
              </div>

              {/* BOOK INFO & TYPOGRAPHY */}
              <div className="mt-8 text-center w-full px-2">
                <p className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-amber-500 mb-2">
                  {item.category}
                </p>
                <h2 className="text-xl font-bold text-gray-100 line-clamp-1 group-hover:text-purple-400 transition-colors duration-300 mb-1">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-500 italic font-medium">
                  by {item.author}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* PAGINATION */}
      {!loading && filteredProducts.length > itemsPerPage && (
        <div className="flex justify-center pb-20 relative z-10 font-sans">
          <PagesPagination
            itemsPerPage={itemsPerPage}
            totalItems={filteredProducts.length}
            currentPage={currentPage}
            paginate={paginate}
          />
        </div>
      )}
    </div>
  );
};

export default Products;