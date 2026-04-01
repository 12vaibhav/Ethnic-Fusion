import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import CartDrawer from './CartDrawer';
import WishlistDrawer from './WishlistDrawer';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (isOpen: boolean) => void;
}

export default function Navbar({ isCartOpen, setIsCartOpen, isWishlistOpen, setIsWishlistOpen }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount, wishlist } = useShop();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isCartOpen || isWishlistOpen || isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen, isWishlistOpen, isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Collections', path: '/collections' },
    { name: 'Couture', path: '/couture' },
    { name: 'Lookbook', path: '/lookbook' },
    { name: 'Brand Story', path: '/about' },
    { name: 'Stores', path: '/stores' },
  ];

  return (
    <>
      <nav
        aria-label="Main Navigation"
        className={cn(
          'fixed top-0 left-0 right-0 z-[102] transition-[background-color,padding,box-shadow,border-color] duration-500 px-6 md:px-12 flex justify-between items-center',
          isScrolled || !isHome
            ? 'bg-white/80 backdrop-blur-md shadow-sm py-4'
            : 'bg-transparent py-6'
        )}
      >
        <div className="flex items-center gap-12">
          <Link
            to="/"
            aria-label="Ethnic Fusion Home"
            className={cn(
              'font-headline text-xl lg:text-2xl font-bold tracking-tighter uppercase whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tertiary',
              isScrolled || !isHome ? 'text-primary' : 'text-white'
            )}
          >
            <img src="/Assets/Logo/Logo.png" alt="Ethnic Fusion" className="h-8 md:h-10 w-auto object-contain" />
          </Link>
          <div className="hidden lg:flex gap-8" role="list">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                role="listitem"
                className={cn(
                  'font-body text-xs uppercase tracking-widest font-medium hover:text-tertiary transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tertiary',
                  isScrolled || !isHome ? 'text-on-surface-variant' : 'text-white/90'
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
  
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center relative">
            <label htmlFor="search-atelier" className="sr-only">Search the Atelier</label>
            <Search className={cn('w-4 h-4 absolute left-3', isScrolled || !isHome ? 'text-outline' : 'text-white/60')} aria-hidden="true" />
            <input
              id="search-atelier"
              type="text"
              placeholder="Search the Atelier..."
              className={cn(
                'pl-10 pr-4 py-2 text-xs rounded-sm border-none focus:ring-1 focus:ring-tertiary w-64 transition-all',
                isScrolled || !isHome ? 'bg-surface-container-low' : 'bg-white/10 text-white placeholder:text-white/40'
              )}
            />
          </div>
          <div className={cn('flex gap-5', isScrolled || !isHome ? 'text-primary' : 'text-white')}>
            <button 
              className="relative cursor-pointer group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tertiary" 
              onClick={() => setIsWishlistOpen(true)}
              aria-label={`Open Wishlist, ${wishlist.length} items`}
            >
              <Heart className={cn("w-5 h-5 transition-colors", wishlist.length > 0 ? "fill-tertiary text-tertiary" : "hover:text-tertiary")} aria-hidden="true" />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-tertiary text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  <span className="sr-only">Wishlist count: </span>
                  {wishlist.length}
                </span>
              )}
            </button>
            <button 
              className="relative cursor-pointer group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tertiary" 
              onClick={() => setIsCartOpen(true)}
              aria-label={`Open Shopping Bag, ${cartCount} items`}
            >
              <ShoppingBag className="w-5 h-5 hover:text-tertiary transition-colors" aria-hidden="true" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  <span className="sr-only">Cart count: </span>
                  {cartCount}
                </span>
              )}
            </button>
            <Link 
              to="/account" 
              aria-label="Account Settings"
              className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tertiary"
            >
              <User className="w-5 h-5 cursor-pointer hover:text-tertiary transition-colors" aria-hidden="true" />
            </Link>
            <button 
              onClick={() => setIsMobileMenuOpen(true)} 
              className="lg:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tertiary"
              aria-label="Open Mobile Menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Menu className="w-5 h-5 cursor-pointer" aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[110] flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <img src="/Assets/Logo/Logo.png" alt="Ethnic Fusion" className="h-8 w-auto object-contain" />
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close Mobile Menu"
                className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tertiary"
              >
                <X className="w-6 h-6 text-primary" aria-hidden="true" />
              </button>
            </div>

            <div className="flex flex-col gap-8" role="list">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  role="listitem"
                >
                  <Link
                    to={link.path}
                    className="text-2xl font-headline text-primary uppercase tracking-wider hover:text-tertiary transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tertiary"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto space-y-10">
              <div className="relative group">
                <label htmlFor="mobile-search" className="sr-only">Search</label>
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-tertiary transition-colors" aria-hidden="true" />
                <input
                  id="mobile-search"
                  type="text"
                  placeholder="Search for collections, couture..."
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-full py-4 pl-12 pr-6 text-sm focus:ring-1 focus:ring-tertiary focus:border-tertiary transition-all outline-none placeholder:text-outline/60 uppercase tracking-widest"
                />
              </div>
              <div className="flex gap-8 text-primary justify-center border-t border-outline-variant/20 pt-8">
                <button 
                  className="relative focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tertiary" 
                  onClick={() => { setIsMobileMenuOpen(false); setIsWishlistOpen(true); }}
                  aria-label={`Open Wishlist, ${wishlist.length} items`}
                >
                  <Heart className={cn("w-7 h-7", wishlist.length > 0 ? "fill-tertiary text-tertiary" : "")} aria-hidden="true" />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-tertiary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                      <span className="sr-only">Wishlist count: </span>
                      {wishlist.length}
                    </span>
                  )}
                </button>
                <button 
                  className="relative focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tertiary" 
                  onClick={() => { setIsMobileMenuOpen(false); setIsCartOpen(true); }}
                  aria-label={`Open Shopping Bag, ${cartCount} items`}
                >
                  <ShoppingBag className="w-7 h-7" aria-hidden="true" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                      <span className="sr-only">Cart count: </span>
                      {cartCount}
                    </span>
                  )}
                </button>
                <Link 
                  to="/account" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Account Settings"
                  className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tertiary"
                >
                  <User className="w-7 h-7" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
