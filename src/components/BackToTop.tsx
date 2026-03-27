import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { pathname } = useLocation();

  // Only show on specific long pages as requested, but usually it's good for all
  const longPages = ['/collections', '/lookbook', '/product'];
  const isLongPage = longPages.some(page => pathname.startsWith(page));

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isLongPage) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-6 md:right-12 z-[40] bg-white text-primary border border-outline-variant/30 p-4 rounded-full shadow-2xl hover:bg-primary hover:text-white transition-all duration-300 group"
          aria-label="Back to top"
        >
          <ChevronUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
