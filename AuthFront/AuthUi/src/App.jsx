// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// // Import the CartProvider you created


// import Navbar from './components/Navbar';
// import Home from './components/Home';
// import SignupPage from './pages/SignupPage';
// import LoginPage from './pages/LoginPage';
// import VerifySignupOtpPage from './pages/VerifySignupOtpPage';
// import Dashboard from './pages/Dashboard';
// import ForgotPassword from './pages/ForgetPassPage';
// import ResetPassword from './pages/ResetPassPage';
// import SetProfilePage from './pages/SetProfilePage';
// import ProfilePreviewPage from './pages/ProfilePreviewPage';
// import ChangePassword from './components/ChangePassword';
// import Products from './components/Products';
// import Cart from './components/AddToCart';
// import Footer from './components/Footer';
// import NotFound from './components/NotFound';
// import Upcoming from './components/Upcomming';
// import ProductDetailsPage from './pages/ProductDetailsPage';
// import AddBook from './components/AddBook';
// import PurchaseBook from './components/PurchaseBook';
// import AddBookSelector from './components/AddBookSelector';
// import AddUpcomingBook from './components/UpcomingBooksInjection';
// import UpcomingBooks from './components/Upcomming';

// const App = () => {
//   return (
//     // 1. Wrap the entire Router or the contents with CartProvider

//     <Router>
//       <div className="min-h-screen flex flex-col bg-gray-900 text-white font-sans selection:bg-blue-500 selection:text-white">

//         <Navbar />

//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="*" element={<NotFound />} />
//           <Route path="/upcoming" element={<Upcoming />} />

//           {/* Auth Routes */}
//           <Route path="/signup" element={<SignupPage />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/verify-otp" element={<VerifySignupOtpPage />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/reset-password" element={<ResetPassword />} />
//           <Route path="/change-password" element={<ChangePassword />} />

//           {/* Profile Routes */}
//           <Route path="/set-profile" element={<SetProfilePage />} />
//           <Route path="/edit-profile" element={<SetProfilePage />} />
//           <Route path="/profile-preview" element={<ProfilePreviewPage />} />

//           {/* Main Content */}
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/products" element={<Products />} />
//           {/* <Route path="/product-details" element={<ProductDetailsPage />} /> */}
//           <Route path="/product/:id" element={<ProductDetailsPage />} />

//           <Route path="/cart" element={<Cart />} />
//           <Route path="/add-book" element={<AddBook />} />
//           <Route path="/add-upcoming-book" element={<AddUpcomingBook />} />
//           <Route path="/get-upcoming-book" element={<UpcomingBooks />} />
//           <Route path="/add-book-selector" element={<AddBookSelector />} />
//           <Route path="/purchase-book/:id" element={<PurchaseBook />} />
//         </Routes>

//         <Footer />

//       </div>
//     </Router>
//   );
// };

// export default App;

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 1. Eager Loading (Synchronous Imports)
// These load immediately to build the initial "shell" of your app
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import NotFound from './components/NotFound';

// 2. Lazy Loading (Asynchronous Imports)
// These only download when the user navigates to their specific route
const Upcoming = lazy(() => import('./components/Upcomming'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const VerifySignupOtpPage = lazy(() => import('./pages/VerifySignupOtpPage'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const ForgotPassword = lazy(() => import('./pages/ForgetPassPage'));
const ResetPassword = lazy(() => import('./pages/ResetPassPage'));
const SetProfilePage = lazy(() => import('./pages/SetProfilePage'));
const ProfilePreviewPage = lazy(() => import('./pages/ProfilePreviewPage'));
const ChangePassword = lazy(() => import('./components/ChangePassword'));
const Products = lazy(() => import('./components/Products'));
const Cart = lazy(() => import('./components/AddToCart'));
const ProductDetailsPage = lazy(() => import('./pages/ProductDetailsPage'));
const AddBook = lazy(() => import('./components/AddBook'));
const PurchaseBook = lazy(() => import('./components/PurchaseBook'));
const AddBookSelector = lazy(() => import('./components/AddBookSelector'));
const AddUpcomingBook = lazy(() => import('./components/UpcomingBooksInjection'));
const UpcomingBooks = lazy(() => import('./components/Upcomming'));

// A simple loading fallback component (you can replace this with a nice spinner later)
const PageLoader = () => (
  <div className="flex justify-center items-center min-h-[50vh]">
    <div className="text-xl text-blue-500">Loading...</div>
  </div>
);

const App = () => {
  return (
    // 1. Wrap the entire Router or the contents with CartProvider here when ready
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-900 text-white font-sans selection:bg-blue-500 selection:text-white">

        <Navbar />

        {/* 3. Wrap Routes in Suspense to handle the loading state of lazy components */}
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Eagerly Loaded Routes */}
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />

            {/* Lazy Loaded Routes */}
            <Route path="/upcoming" element={<Upcoming />} />

            {/* Auth Routes */}
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/verify-otp" element={<VerifySignupOtpPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/change-password-totaly" element={<ChangePassword />} />

            {/* Profile Routes */}
            <Route path="/set-profile" element={<SetProfilePage />} />
            <Route path="/edit-profile" element={<SetProfilePage />} />
            <Route path="/profile-preview" element={<ProfilePreviewPage />} />

            {/* Main Content */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/cart" element={<Cart />} />

            {/* Book Management */}
            <Route path="/add-book" element={<AddBook />} />
            <Route path="/add-upcoming-book" element={<AddUpcomingBook />} />
            <Route path="/get-upcoming-book" element={<UpcomingBooks />} />
            <Route path="/add-book-selector" element={<AddBookSelector />} />
            <Route path="/purchase-book/:id" element={<PurchaseBook />} />
          </Routes>
        </Suspense>

        <Footer />

      </div>
    </Router>
  );
};

export default App;