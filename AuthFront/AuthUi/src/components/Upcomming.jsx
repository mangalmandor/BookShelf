// // import React from 'react';

// // // --- DUMMY DATA FOR UPCOMING MANUSCRIPTS ---
// // const upcomingBooks = [
// //     {
// //         _id: "upc_001",
// //         title: "Echoes of the Void",
// //         author: "Dr. Aris Thorne",
// //         category: "Astrophysics",
// //         coverImageUrl: "https://picsum.photos/seed/void/400/600",
// //         releaseDate: "November 2026",
// //         status: "Decrypting..."
// //     },
// //     {
// //         _id: "upc_002",
// //         title: "The Quantum Alchemist",
// //         author: "Elara Vance",
// //         category: "Sci-Fi",
// //         coverImageUrl: "https://picsum.photos/seed/quantum/400/600",
// //         releaseDate: "December 2026",
// //         status: "Awaiting Translation"
// //     },
// //     {
// //         _id: "upc_003",
// //         title: "Neural Protocols v2.0",
// //         author: "System Architect 7",
// //         category: "Cybersecurity",
// //         coverImageUrl: "https://picsum.photos/seed/neural/400/600",
// //         releaseDate: "January 2027",
// //         status: "Sealed Archive"
// //     },
// //     {
// //         _id: "upc_004",
// //         title: "Architects of Time",
// //         author: "Julian K. Cross",
// //         category: "Theoretical Physics",
// //         coverImageUrl: "https://picsum.photos/seed/time/400/600",
// //         releaseDate: "March 2027",
// //         status: "Classified"
// //     }
// // ];

// // const UpcomingBooks = () => {
// //     return (
// //         <section className="bg-[#050505] py-24 relative overflow-hidden font-sans border-t border-gray-900/50">

// //             {/* Background Ambience */}
// //             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-30"></div>
// //             <div className="absolute top-1/4 left-10 w-[300px] h-[300px] bg-indigo-900/10 rounded-full blur-[100px] pointer-events-none"></div>

// //             <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

// //                 {/* Section Header */}
// //                 <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
// //                     <div>
// //                         <div className="flex items-center gap-3 mb-3">
// //                             <span className="w-8 h-[2px] bg-amber-500"></span>
// //                             <span className="text-amber-500 font-bold tracking-[0.3em] uppercase text-xs">Future Acquisitions</span>
// //                         </div>
// //                         <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-600 tracking-tight">
// //                             Sealed Manuscripts
// //                         </h2>
// //                     </div>
// //                     <p className="text-gray-500 max-w-sm text-sm font-medium border-l-2 border-gray-800 pl-4">
// //                         These volumes are currently locked in the temporal vault. Request a notification to be alerted the moment they are translated.
// //                     </p>
// //                 </div>

// //                 {/* Upcoming Books Grid */}
// //                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
// //                     {upcomingBooks.map((book) => (
// //                         <div key={book._id} className="group relative rounded-2xl p-4 bg-gray-900/20 border border-gray-800/60 hover:border-purple-500/30 transition-all duration-500 flex flex-col overflow-hidden">

// //                             {/* Cover Image Container (Grayscale until hover) */}
// //                             <div className="relative aspect-[3/4.5] rounded-xl overflow-hidden mb-5 bg-black/50">
// //                                 <img
// //                                     src={book.coverImageUrl}
// //                                     alt={book.title}
// //                                     className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-80 transform group-hover:scale-110 transition-all duration-700 ease-in-out"
// //                                 />

// //                                 {/* Lock Overlay */}
// //                                 <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 group-hover:bg-black/10 transition-colors duration-500 backdrop-blur-[2px] group-hover:backdrop-blur-0">
// //                                     <div className="bg-gray-900/80 p-4 rounded-full border border-gray-700 mb-2 shadow-[0_0_20px_rgba(0,0,0,0.8)] group-hover:border-purple-500/50 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all">
// //                                         <svg className="w-6 h-6 text-gray-400 group-hover:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
// //                                         </svg>
// //                                     </div>
// //                                     <span className="text-xs font-mono font-bold tracking-widest text-amber-500/80 bg-black/60 px-3 py-1 rounded-full uppercase">
// //                                         {book.status}
// //                                     </span>
// //                                 </div>
// //                             </div>

// //                             {/* Book Info */}
// //                             <div className="flex-1 flex flex-col">
// //                                 <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-500/70 mb-1">
// //                                     {book.category}
// //                                 </p>
// //                                 <h3 className="text-lg font-bold text-gray-200 line-clamp-1 group-hover:text-white transition-colors">
// //                                     {book.title}
// //                                 </h3>
// //                                 <p className="text-sm text-gray-500 italic mb-4">
// //                                     by {book.author}
// //                                 </p>

// //                                 {/* Footer / Action */}
// //                                 <div className="mt-auto pt-4 border-t border-gray-800/50 flex items-center justify-between">
// //                                     <div className="flex flex-col">
// //                                         <span className="text-[10px] text-gray-600 uppercase font-bold tracking-widest">ETA</span>
// //                                         <span className="text-sm font-medium text-gray-300">{book.releaseDate}</span>
// //                                     </div>
// //                                     <button className="text-purple-400 hover:text-white bg-purple-900/20 hover:bg-purple-600 p-2.5 rounded-xl transition-all border border-purple-500/20 hover:border-transparent active:scale-95 shadow-lg relative group/btn">
// //                                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
// //                                         </svg>
// //                                         {/* Tooltip */}
// //                                         <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
// //                                             Alert Me
// //                                         </span>
// //                                     </button>
// //                                 </div>
// //                             </div>
// //                         </div>
// //                     ))}
// //                 </div>
// //             </div>
// //         </section>
// //     );
// // };

// // export default UpcomingBooks;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const UpcomingBooks = () => {
//     const [upcomingBooks, setUpcomingBooks] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [currentTime, setCurrentTime] = useState(new Date().getTime());

//     // 1. Fetch data from backend
//     useEffect(() => {
//         const fetchUpcomingBooks = async () => {
//             try {
//                 const res = await axios.get('http://localhost:4000/api/books/read-upcoming-books');
//                 setUpcomingBooks(res.data.data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Failed to retrieve upcoming manuscripts:", error);
//                 setLoading(false);
//             }
//         };
//         fetchUpcomingBooks();
//     }, []);

//     // 2. Ticking Engine: Updates the current time every 1 second for the countdown
//     useEffect(() => {
//         const timer = setInterval(() => {
//             setCurrentTime(new Date().getTime());
//         }, 1000);
//         return () => clearInterval(timer);
//     }, []);

//     // 3. Countdown Calculation Logic
//     const getCountdown = (targetDateStr) => {
//         const targetDate = new Date(targetDateStr).getTime();
//         const difference = targetDate - currentTime;

//         if (difference <= 0) {
//             return "IMMINENT LAUNCH";
//         }

//         const days = Math.floor(difference / (1000 * 60 * 60 * 24));
//         const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
//         const minutes = Math.floor((difference / 1000 / 60) % 60);
//         const seconds = Math.floor((difference / 1000) % 60);

//         // Pad with zeros for that digital clock look (e.g., "05s")
//         const pad = (num) => num.toString().padStart(2, '0');

//         return `${days}D : ${pad(hours)}H : ${pad(minutes)}M : ${pad(seconds)}S`;
//     };

//     if (loading) {
//         return (
//             <div className="bg-[#050505] py-24 flex justify-center items-center border-t border-gray-900/50 min-h-[400px]">
//                 <div className="flex flex-col items-center">
//                     <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-4"></div>
//                     <span className="text-blue-400 font-mono text-xs uppercase tracking-[0.3em] animate-pulse">Scanning Temporal Vault...</span>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <section className="bg-[#050505] py-24 relative overflow-hidden font-sans border-t border-gray-900/50">
//             {/* Background Ambience */}
//             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-30"></div>
//             <div className="absolute top-1/4 left-10 w-[300px] h-[300px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none"></div>

//             <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

//                 {/* Section Header */}
//                 <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
//                     <div>
//                         <div className="flex items-center gap-3 mb-3">
//                             <span className="w-8 h-[2px] bg-blue-500"></span>
//                             <span className="text-blue-500 font-bold tracking-[0.3em] uppercase text-xs">Future Acquisitions</span>
//                         </div>
//                         <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-600 tracking-tight">
//                             Sealed Manuscripts
//                         </h2>
//                     </div>
//                     <p className="text-gray-500 max-w-sm text-sm font-medium border-l-2 border-gray-800 pl-4">
//                         These volumes are currently locked in the temporal vault. Monitor the countdown until the decryption protocol is complete.
//                     </p>
//                 </div>

//                 {/* Upcoming Books Grid */}
//                 {upcomingBooks.length === 0 ? (
//                     <div className="text-center py-10 text-gray-500 font-mono text-sm border border-gray-800/50 rounded-2xl bg-gray-900/10">
//                         No upcoming launches scheduled in the archive.
//                     </div>
//                 ) : (
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//                         {upcomingBooks.map((book) => (
//                             <div key={book._id} className="group relative rounded-2xl p-4 bg-gray-900/20 border border-gray-800/60 hover:border-blue-500/30 transition-all duration-500 flex flex-col overflow-hidden">

//                                 {/* Cover Image Container */}
//                                 <div className="relative aspect-[3/4.5] rounded-xl overflow-hidden mb-5 bg-black/50">
//                                     <img
//                                         src={book.coverImageUrl}
//                                         alt={book.title}
//                                         className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-80 transform group-hover:scale-110 transition-all duration-700 ease-in-out"
//                                     />

//                                     {/* Lock & Countdown Overlay */}
//                                     <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors duration-500">

//                                         {/* Lock Icon */}
//                                         <div className="bg-gray-900/80 p-4 rounded-full border border-gray-700 mb-4 shadow-[0_0_20px_rgba(0,0,0,0.8)] group-hover:border-blue-500/50 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all">
//                                             <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                                             </svg>
//                                         </div>

//                                         {/* Status Badge */}
//                                         <span className="text-xs font-black tracking-widest text-blue-400 bg-black/80 border border-blue-900/50 px-3 py-1 rounded-full uppercase mb-auto">
//                                             {book.launchStatus}
//                                         </span>

//                                         {/* LIVE COUNTDOWN CLOCK */}
//                                         <div className="w-full bg-black/80 backdrop-blur-md border-t border-gray-800 py-3 text-center mt-auto">
//                                             <span className="text-[10px] text-gray-500 uppercase font-black tracking-[0.2em] block mb-1">Time to Decryption</span>
//                                             <span className="text-sm font-mono font-bold text-gray-100 tracking-widest drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
//                                                 {getCountdown(book.expectedReleaseDate)}
//                                             </span>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Book Info */}
//                                 <div className="flex-1 flex flex-col">
//                                     <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500/70 mb-1">
//                                         {book.category}
//                                     </p>
//                                     <h3 className="text-lg font-bold text-gray-200 line-clamp-1 group-hover:text-white transition-colors">
//                                         {book.title}
//                                     </h3>
//                                     <p className="text-sm text-gray-500 italic mb-4">
//                                         by {book.author}
//                                     </p>

//                                     {/* Footer / Action */}
//                                     <div className="mt-auto pt-4 border-t border-gray-800/50 flex items-center justify-between">
//                                         <div className="flex flex-col">
//                                             <span className="text-[10px] text-gray-600 uppercase font-bold tracking-widest">Target Date</span>
//                                             <span className="text-sm font-medium text-gray-300">
//                                                 {new Date(book.expectedReleaseDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
//                                             </span>
//                                         </div>
//                                         <button className="text-blue-400 hover:text-white bg-blue-900/20 hover:bg-blue-600 p-2.5 rounded-xl transition-all border border-blue-500/20 hover:border-transparent active:scale-95 shadow-lg relative group/btn">
//                                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
//                                             </svg>
//                                             {/* Tooltip */}
//                                             <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
//                                                 Join Waitlist
//                                             </span>
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </section>
//     );
// };

// export default UpcomingBooks;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PagesPagination from '../components/PagesPagination'; // Make sure this path is correct!

const UpcomingBooks = () => {
    const [upcomingBooks, setUpcomingBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date().getTime());

    // --- NEW: Pagination States ---
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4); // Shows 4 books per page. Change this to 8 if you want two rows!

    // 1. Fetch data from backend
    useEffect(() => {
        const fetchUpcomingBooks = async () => {
            try {
                const res = await axios.get('http://localhost:4000/api/books/read-upcoming-books');
                setUpcomingBooks(res.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to retrieve upcoming manuscripts:", error);
                setLoading(false);
            }
        };
        fetchUpcomingBooks();
    }, []);

    // 2. Ticking Engine: Updates the current time every 1 second for the countdown
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().getTime());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // 3. Countdown Calculation Logic
    const getCountdown = (targetDateStr) => {
        const targetDate = new Date(targetDateStr).getTime();
        const difference = targetDate - currentTime;

        if (difference <= 0) {
            return "IMMINENT LAUNCH";
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        const pad = (num) => num.toString().padStart(2, '0');

        return `${days}D : ${pad(hours)}H : ${pad(minutes)}M : ${pad(seconds)}S`;
    };

    // --- NEW: Pagination Logic ---
    const indexOfLastBook = currentPage * itemsPerPage;
    const indexOfFirstBook = indexOfLastBook - itemsPerPage;
    // We slice the main array to only get the books for the current page
    const currentBooks = upcomingBooks.slice(indexOfFirstBook, indexOfLastBook);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        // Smooth scroll back to the top of this specific section when page changes
        document.getElementById('upcoming-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    if (loading) {
        return (
            <div className="bg-[#050505] py-24 flex justify-center items-center border-t border-gray-900/50 min-h-[400px]">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-4"></div>
                    <span className="text-blue-400 font-mono text-xs uppercase tracking-[0.3em] animate-pulse">Scanning Temporal Vault...</span>
                </div>
            </div>
        );
    }

    return (
        // Added ID here for the scroll effect
        <section id="upcoming-section" className="bg-[#050505] py-24 relative overflow-hidden font-sans border-t border-gray-900/50">
            {/* Background Ambience */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-30"></div>
            <div className="absolute top-1/4 left-10 w-[300px] h-[300px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

                {/* Section Header */}
                <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <span className="w-8 h-[2px] bg-blue-500"></span>
                            <span className="text-blue-500 font-bold tracking-[0.3em] uppercase text-xs">Future Acquisitions</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-600 tracking-tight">
                            Sealed Manuscripts
                        </h2>
                    </div>
                    <p className="text-gray-500 max-w-sm text-sm font-medium border-l-2 border-gray-800 pl-4">
                        These volumes are currently locked in the temporal vault. Monitor the countdown until the decryption protocol is complete.
                    </p>
                </div>

                {/* Upcoming Books Grid */}
                {upcomingBooks.length === 0 ? (
                    <div className="text-center py-10 text-gray-500 font-mono text-sm border border-gray-800/50 rounded-2xl bg-gray-900/10">
                        No upcoming launches scheduled in the archive.
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* NEW: Map over currentBooks instead of upcomingBooks */}
                            {currentBooks.map((book) => (
                                <div key={book._id} className="group relative rounded-2xl p-4 bg-gray-900/20 border border-gray-800/60 hover:border-blue-500/30 transition-all duration-500 flex flex-col overflow-hidden">

                                    {/* Cover Image Container */}
                                    <div className="relative aspect-[3/4.5] rounded-xl overflow-hidden mb-5 bg-black/50">
                                        <img
                                            src={book.coverImageUrl}
                                            alt={book.title}
                                            className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-80 transform group-hover:scale-110 transition-all duration-700 ease-in-out"
                                        />

                                        {/* Lock & Countdown Overlay */}
                                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors duration-500">

                                            <div className="bg-gray-900/80 p-4 rounded-full border border-gray-700 mb-4 shadow-[0_0_20px_rgba(0,0,0,0.8)] group-hover:border-blue-500/50 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all">
                                                <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                </svg>
                                            </div>

                                            <span className="text-xs font-black tracking-widest text-blue-400 bg-black/80 border border-blue-900/50 px-3 py-1 rounded-full uppercase mb-auto">
                                                {book.launchStatus}
                                            </span>

                                            {/* LIVE COUNTDOWN CLOCK */}
                                            <div className="w-full bg-black/80 backdrop-blur-md border-t border-gray-800 py-3 text-center mt-auto">
                                                <span className="text-[10px] text-gray-500 uppercase font-black tracking-[0.2em] block mb-1">Time to Decryption</span>
                                                <span className="text-sm font-mono font-bold text-gray-100 tracking-widest drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                                                    {getCountdown(book.expectedReleaseDate)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Book Info */}
                                    <div className="flex-1 flex flex-col">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500/70 mb-1">
                                            {book.category}
                                        </p>
                                        <h3 className="text-lg font-bold text-gray-200 line-clamp-1 group-hover:text-white transition-colors">
                                            {book.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 italic mb-4">
                                            by {book.author}
                                        </p>

                                        {/* Footer / Action */}
                                        <div className="mt-auto pt-4 border-t border-gray-800/50 flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-gray-600 uppercase font-bold tracking-widest">Target Date</span>
                                                <span className="text-sm font-medium text-gray-300">
                                                    {new Date(book.expectedReleaseDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                                </span>
                                            </div>
                                            <button className="text-blue-400 hover:text-white bg-blue-900/20 hover:bg-blue-600 p-2.5 rounded-xl transition-all border border-blue-500/20 hover:border-transparent active:scale-95 shadow-lg relative group/btn">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                                </svg>
                                                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                                    Join Waitlist
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* NEW: Inject the Pagination Component Here */}
                        <div className="mt-8">
                            <PagesPagination
                                itemsPerPage={itemsPerPage}
                                totalItems={upcomingBooks.length}
                                currentPage={currentPage}
                                paginate={paginate}
                            />
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default UpcomingBooks;