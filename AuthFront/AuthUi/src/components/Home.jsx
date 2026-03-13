import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import Cookies from "js-cookie";

// --- DUMMY DATA FOR SECTIONS ---
const advantages = [
  { title: "Infinite Catalog", desc: "Access thousands of volumes ranging from ancient philosophy to advanced astrophysics.", icon: "🌌" },
  { title: "Temporal Vault", desc: "Your personal library is synced and secured across the space-time continuum.", icon: "⏳" },
  { title: "Immersive Reading", desc: "Experience distraction-free, high-fidelity manuscript rendering.", icon: "📖" }
];

const famousAuthors = [
  { name: "A. Parthasarathy", role: "Philosopher", img: "https://picsum.photos/seed/vedanta/150/150" },
  { name: "Carl Sagan", role: "Astrophysicist", img: "https://picsum.photos/seed/cosmos/150/150" },
  { name: "Isaac Asimov", role: "Sci-Fi Visionary", img: "https://picsum.photos/seed/foundation/150/150" },
  { name: "Alan Turing", role: "Computer Scientist", img: "https://picsum.photos/seed/enigma/150/150" },
  { name: "Arthur C. Clarke", role: "Futurist", img: "https://picsum.photos/seed/odyssey/150/150" }
];

const featuredBooks = [
  { id: 1, title: "The Fall of the Human Intellect", author: "A. Parthasarathy", cover: "https://picsum.photos/seed/intellect/300/450" },
  { id: 2, title: "The Fabric of the Cosmos", author: "Brian Greene", cover: "https://picsum.photos/seed/fabric/300/450" },
  { id: 3, title: "Clean Architecture", author: "Robert C. Martin", cover: "https://picsum.photos/seed/clean/300/450" },
  { id: 4, title: "Dune", author: "Frank Herbert", cover: "https://picsum.photos/seed/dune/300/450" }
];

const Home = () => {

  const { user, logout, login } = useContext(AuthContext);
  const token = Cookies.get("token");
  console.log(token);
  return (
    <div className="min-h-screen bg-[#030305] text-white font-sans overflow-x-hidden selection:bg-purple-500/30">

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20 overflow-hidden">
        {/* Deep Space / Event Horizon Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-amber-600/10 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none mix-blend-overlay"></div>

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
          <span className="text-amber-500 font-bold tracking-[0.3em] uppercase text-xs mb-6 border border-amber-500/30 px-4 py-2 rounded-full bg-amber-900/10 backdrop-blur-sm">
            The Digital Tesseract
          </span>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter leading-tight drop-shadow-2xl text-gray-100">
            Knowledge is <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-amber-500 relative inline-block">
              Beyond the Event Horizon
            </span>
          </h1>

          <p className="text-lg md:text-2xl text-gray-400 max-w-3xl mb-12 leading-relaxed font-light">
            Navigate the data-streams of human intellect. Secure your uplink to the most advanced source codes, systemic architectures, and algorithmic wisdom in the digital frontier.
          </p>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 w-full sm:w-auto">
            <Link
              to="/products"
              className="flex items-center justify-center px-10 py-4 text-lg font-bold bg-gray-100 text-gray-900 rounded-full transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] w-full sm:w-auto"
            >
              Enter the Archive
            </Link>
            <Link
              to="/signup"
              className="px-10 py-4 text-lg font-medium border border-gray-700 bg-gray-900/50 backdrop-blur-md rounded-full text-gray-300 hover:bg-gray-800 hover:text-white hover:border-purple-500 transition-all duration-300 w-full sm:w-auto flex items-center justify-center"
            >
              Establish Uplink
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* ================= ADVANTAGES SECTION ================= */}
      <section className="py-24 px-6 relative z-10 bg-[#050508] border-t border-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">The Archive Advantage</h2>
            <p className="text-gray-500 text-lg">Engineered for seamless knowledge acquisition.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advantages.map((adv, idx) => (
              <div key={idx} className="bg-gray-900/40 border border-gray-800 p-8 rounded-3xl hover:border-purple-500/50 transition-colors duration-500 group backdrop-blur-sm">
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform origin-left">{adv.icon}</div>
                <h3 className="text-xl font-bold text-gray-200 mb-3">{adv.title}</h3>
                <p className="text-gray-500 leading-relaxed">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAMOUS BOOKS (HORIZONTAL SCROLL) ================= */}
      <section className="py-24 relative z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-2">Legendary Volumes</h2>
            <p className="text-gray-500">The most requested manuscripts in the quadrant.</p>
          </div>
          <Link to="/products" className="hidden md:block text-purple-400 hover:text-purple-300 font-bold tracking-widest uppercase text-sm border-b border-purple-500/30 pb-1 hover:border-purple-400 transition-colors">
            View All
          </Link>
        </div>

        {/* Scrollable Container */}
        <div className="w-full overflow-x-auto pb-10 hide-scrollbar cursor-grab active:cursor-grabbing px-6">
          <div className="flex space-x-8 w-max mx-auto md:mx-0 md:pl-6 max-w-7xl">
            {featuredBooks.map((book) => (
              <div key={book.id} className="w-[260px] group relative perspective">
                <div className="relative w-full aspect-[2/3] rounded-r-xl rounded-l-sm shadow-2xl transition-transform duration-500 group-hover:-translate-y-4 group-hover:rotate-y-[-5deg]">
                  <img src={book.cover} alt={book.title} className="w-full h-full object-cover rounded-r-xl rounded-l-sm border border-gray-700" />
                  <div className="absolute top-0 bottom-0 left-0 w-6 bg-gradient-to-r from-black/60 to-transparent rounded-l-sm z-10"></div>
                </div>
                <div className="mt-5 text-center">
                  <h3 className="font-bold text-gray-200 truncate group-hover:text-purple-400 transition-colors">{book.title}</h3>
                  <p className="text-sm text-gray-500 italic mt-1">{book.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAMOUS AUTHORS SECTION ================= */}
      <section className="py-24 px-6 relative z-10 bg-[#020203] border-t border-b border-gray-900/80">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">Architects of Thought</h2>
            <p className="text-gray-500 text-lg">Minds that shaped our understanding of reality and logic.</p>
          </div>

          <div className="flex overflow-x-auto pb-8 hide-scrollbar justify-start md:justify-center space-x-6 md:space-x-12 px-4">
            {famousAuthors.map((author, idx) => (
              <div key={idx} className="flex flex-col items-center group min-w-[140px]">
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-full p-1 bg-gradient-to-tr from-purple-500 to-amber-500 mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(168,85,247,0.4)]">
                  <img src={author.img} alt={author.name} className="w-full h-full object-cover rounded-full border-4 border-[#030305]" />
                </div>
                <h3 className="font-bold text-gray-200 text-center">{author.name}</h3>
                <p className="text-xs text-amber-500/80 uppercase tracking-widest mt-1 text-center font-bold">{author.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BOTTOM CTA ================= */}
      <section className="py-32 px-6 relative flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent pointer-events-none"></div>
        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 relative z-10">Ready to Expand Your Mind?</h2>
        <p className="text-gray-400 max-w-2xl mb-10 relative z-10 text-lg">
          The archive is waiting. Create your clearance level account today and begin cataloging your personal library.
        </p>
        <Link
          to="/signup"
          className="relative z-10 px-12 py-5 text-lg font-bold bg-purple-600 text-white rounded-full transition-all duration-300 hover:bg-purple-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] active:scale-95 flex items-center gap-3"
        >
          <span>Initialize Sequence</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </section>

    </div>
  );
};

export default Home;