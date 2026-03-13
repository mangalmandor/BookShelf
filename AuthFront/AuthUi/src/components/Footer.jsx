import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#020203] text-gray-400 py-16 relative overflow-hidden font-sans border-t border-gray-900/80">

      {/* Subtle Top Border Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>

      {/* Background Ambience */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* Brand & Description Section */}
          <div className="md:col-span-2">
            <h2 className="text-3xl font-black text-white mb-6 tracking-tight flex items-center gap-2">
              Mars
              <span className="bg-gradient-to-r from-purple-400 to-amber-500 text-transparent bg-clip-text">
                ARCHIVE
              </span>
            </h2>
            <p className="text-sm leading-relaxed max-w-sm text-gray-500 font-medium">
              Curating the cosmos. Securing the most profound manuscripts, developmental frameworks, and philosophical texts beyond the event horizon.
            </p>
          </div>

          {/* Links Section 1 */}
          <div>
            <h3 className="text-gray-200 font-bold mb-6 uppercase tracking-[0.2em] text-xs">Nexus Control</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <Link to="/" className="text-gray-500 hover:text-amber-400 hover:translate-x-1 inline-block transition-all duration-300">
                  Launchpad
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-500 hover:text-amber-400 hover:translate-x-1 inline-block transition-all duration-300">
                  The Vaults
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-amber-400 hover:translate-x-1 inline-block transition-all duration-300">
                  The Curators
                </a>
              </li>
            </ul>
          </div>

          {/* Links Section 2 */}
          <div>
            <h3 className="text-gray-200 font-bold mb-6 uppercase tracking-[0.2em] text-xs">Data Streams</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <a href="#" className="text-gray-500 hover:text-purple-400 hover:translate-x-1 inline-block transition-all duration-300">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 text-gray-500 hover:text-purple-400 hover:translate-x-1 inline-block transition-all duration-300">
                  <span>API Black Hole</span>
                  <span className="px-2 py-0.5 rounded-full bg-purple-900/30 text-purple-400 text-[9px] border border-purple-500/20 uppercase tracking-widest">v2.0</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-purple-400 hover:translate-x-1 inline-block transition-all duration-300">
                  Support Protocol
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800/60 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 font-mono tracking-widest uppercase">
          <p>© {new Date().getFullYear()} Mars Archive Network. All temporal systems nominal.</p>

          {/* Social Icons */}
          <div className="flex space-x-6 mt-6 md:mt-0">
            <a href="#" className="hover:text-white hover:scale-110 transition-all duration-300">
              <span className="sr-only">GitHub</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="hover:text-blue-400 hover:scale-110 transition-all duration-300">
              <span className="sr-only">Twitter</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;