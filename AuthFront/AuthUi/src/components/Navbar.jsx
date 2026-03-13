import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import {
  User,
  LogOut,
  LayoutDashboard,
  ChevronDown,
  BookOpen,
  Zap,
  Menu,
  X
} from 'lucide-react';
import Swal from 'sweetalert2';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Effect for scroll blur
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: 'Initiate Disconnect?',
      text: "You are about to leave the secure server.",
      icon: 'warning',
      showCancelButton: true,
      background: '#0a0a0f',
      color: '#e2e8f0',
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#374151',
      confirmButtonText: 'Yes, Disconnect',
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate('/login');
      }
    });
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed w-full top-0 z-[100] transition-all duration-500 font-sans 
            ${isScrolled ? 'py-3 bg-[#050508]/80 backdrop-blur-xl border-b border-purple-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]' : 'py-6 bg-transparent border-b border-transparent'}`}>

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">

        {/* --- LOGO: Cinematic Style --- */}
        <Link to="/" className="group flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)] group-hover:rotate-12 transition-transform duration-300">
            <span className="text-white font-black text-xl">M</span>
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">
            MARS<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">UI</span>
          </span>
        </Link>

        {/* --- NAV LINKS: Minimalist Sci-Fi --- */}
        <ul className="hidden md:flex items-center space-x-1">
          {[
            { name: 'Archive', path: '/', icon: <BookOpen size={16} /> },
            { name: 'Books', path: '/products', icon: null },
            { name: 'Timeline', path: '/get-upcoming-book', icon: <Zap size={16} className="text-amber-500" /> },
          ].map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className={`relative px-4 py-2 rounded-lg text-sm font-bold tracking-wide transition-all duration-300 flex items-center gap-2
                                    ${isActive(link.path) ? 'text-purple-400 bg-purple-500/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                {link.icon}
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-purple-500 rounded-full shadow-[0_0_8px_purple]"></span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* --- AUTH SECTION --- */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative group">
              {/* Profile Trigger */}
              <button className="flex items-center gap-3 bg-gray-900/50 border border-gray-800 p-1.5 pr-4 rounded-full hover:border-purple-500/50 transition-all duration-300">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-xs font-bold text-white uppercase shadow-inner">
                  {user.name.charAt(0)}
                </div>
                <span className="text-sm font-bold text-gray-200">{user.name.split(' ')[0]}</span>
                <ChevronDown size={14} className="text-gray-500 group-hover:rotate-180 transition-transform duration-300" />
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-3 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <div className="bg-[#0a0a0f] border border-gray-800 rounded-2xl p-2 shadow-2xl backdrop-blur-2xl">
                  <div className="px-4 py-3 border-b border-gray-800 mb-2">
                    <p className="text-[10px] font-bold text-purple-400 uppercase tracking-[0.2em]">Curator Status</p>
                    <p className="text-sm text-gray-400 truncate">{user.email}</p>
                  </div>

                  <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-gray-300 hover:bg-purple-500/10 hover:text-purple-400 transition-all">
                    <LayoutDashboard size={18} /> Command Center
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-400 hover:bg-red-500/10 transition-all"
                  >
                    <LogOut size={18} /> Disconnect
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="px-5 py-2 text-sm font-bold text-gray-400 hover:text-white transition-colors">
                Login
              </Link>
              <Link to="/signup" className="relative px-6 py-2.5 bg-white text-black text-sm font-black rounded-xl hover:bg-purple-500 hover:text-white transition-all duration-300 overflow-hidden group">
                <span className="relative z-10">JOIN ARCHIVE</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* --- Animated Scanner Line (Visual Accent) --- */}
      {isScrolled && (
        <div className="absolute bottom-0 left-0 w-full h-[1px] overflow-hidden">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-scan"></div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; ``