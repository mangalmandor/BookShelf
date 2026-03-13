// import React from 'react';

// const PagesPagination = ({ itemsPerPage, totalItems, currentPage, paginate }) => {
//   const pageNumber = [];
  
//   for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
//     pageNumber.push(i);
//   }

//   return (
//     <div className="flex justify-center mt-8 mb-12">
//       <ul className="flex space-x-2">
//         {pageNumber.map((number) => {
//           // Check if this button is the active page to apply different colors
//           const isActive = number === currentPage;
          
//           return (
//             <li key={number}>
//               <button
//                 onClick={() => paginate(number)}
//                 className={`px-4 py-2 border rounded-md font-medium transition-colors duration-200 
//                   ${isActive 
//                     ? 'bg-blue-600 text-white border-blue-600' 
//                     : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100 hover:text-blue-600'
//                   }`}
//               >
//                 {number}
//               </button>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// };

// export default PagesPagination;

import React from 'react';

const PagesPagination = ({ itemsPerPage, totalItems, currentPage, paginate }) => {
  const pageNumber = [];
  
  // Calculate the total number of pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumber.push(i);
  }

  return (
    <div className="flex justify-center mt-8 mb-12">
      <ul className="flex space-x-2 items-center">
        
        {/* --- PREVIOUS BUTTON --- */}
        <li>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 border rounded-md font-medium transition-all duration-200 flex items-center 
              ${currentPage === 1 
                ? 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed' 
                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100 hover:text-blue-600 active:scale-95'
              }`}
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Prev
          </button>
        </li>

        {/* --- PAGE NUMBERS --- */}
        {pageNumber.map((number) => {
          const isActive = number === currentPage;
          
          return (
            <li key={number} className="hidden sm:block"> {/* Hides numbers on very small phone screens to save space */}
              <button
                onClick={() => paginate(number)}
                className={`px-4 py-2 border rounded-md font-medium transition-colors duration-200 
                  ${isActive 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100 hover:text-blue-600 active:scale-95'
                  }`}
              >
                {number}
              </button>
            </li>
          );
        })}

        {/* --- NEXT BUTTON --- */}
        <li>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 border rounded-md font-medium transition-all duration-200 flex items-center
              ${currentPage === totalPages 
                ? 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed' 
                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100 hover:text-blue-600 active:scale-95'
              }`}
          >
            Next
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </li>

      </ul>
    </div>
  );
};

export default PagesPagination;