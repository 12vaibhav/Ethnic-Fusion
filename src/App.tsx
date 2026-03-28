/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Home from './pages/Home';
import Collections from './pages/Collections';
import Lookbook from './pages/Lookbook';
import About from './pages/About';
import StoreLocator from './pages/StoreLocator';
import Couture from './pages/Couture';
import ProductDetail from './pages/ProductDetail';
import Account from './pages/Account';
import Checkout from './pages/Checkout';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import { ShopProvider } from './context/ShopContext';
import { Toaster } from 'sonner';

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  return (
    <ShopProvider>
      <Toaster position="bottom-center" expand={false} richColors />
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col font-body selection:bg-tertiary selection:text-white">
          <Navbar 
            isCartOpen={isCartOpen} 
            setIsCartOpen={setIsCartOpen} 
            isWishlistOpen={isWishlistOpen} 
            setIsWishlistOpen={setIsWishlistOpen} 
          />
          <BackToTop />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/lookbook" element={<Lookbook />} />
              <Route path="/about" element={<About />} />
              <Route path="/stores" element={<StoreLocator />} />
              <Route path="/couture" element={<Couture />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/account" element={<Account />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
          <Footer />
          <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
          <WishlistDrawer isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
        </div>
      </Router>
    </ShopProvider>
  );
}

