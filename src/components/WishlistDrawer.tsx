import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { toast } from 'sonner';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WishlistDrawer({ isOpen, onClose }: WishlistDrawerProps) {
  const { wishlist, toggleWishlist, addToCart } = useShop();

  const handleMoveToCart = (product: any) => {
    addToCart(product);
    toggleWishlist(product);
    toast.success('Moved to Bag', {
      description: `${product.name} has been moved to your bag.`
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="wishlist-drawer-title"
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[103] shadow-2xl flex flex-col"
          >
            <div className="p-4 md:p-6 border-b border-outline-variant/30 flex justify-between items-center">
              <div className="flex items-center gap-2 md:gap-3">
                <Heart className="w-4 h-4 md:w-5 md:h-5 text-tertiary fill-tertiary" aria-hidden="true" />
                <h2 id="wishlist-drawer-title" className="font-headline text-xl md:text-2xl text-primary uppercase tracking-tight">Your Wishlist</h2>
                <span className="text-[10px] md:text-xs font-bold text-tertiary bg-surface-container-low px-1.5 md:px-2 py-0.5 rounded-full">
                  <span className="sr-only">Items in wishlist: </span>
                  {wishlist.length}
                </span>
              </div>
              <button 
                onClick={onClose} 
                aria-label="Close Wishlist"
                className="p-1.5 md:p-2 hover:bg-surface rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tertiary"
              >
                <X className="w-4 h-4 md:w-5 md:h-5 text-primary" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-4 md:p-6 hide-scrollbar">
              {wishlist.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-surface-container-low rounded-full flex items-center justify-center mb-4 md:mb-6">
                    <Heart className="w-6 h-6 md:w-8 md:h-8 text-outline" aria-hidden="true" />
                  </div>
                  <h3 className="font-headline text-xl md:text-2xl text-primary mb-2">Your wishlist is empty</h3>
                  <p className="text-on-surface-variant text-xs md:text-sm mb-6 md:mb-8 max-w-[200px] md:max-w-[240px]">
                    Save your favorite pieces here to keep an eye on them.
                  </p>
                  <button 
                    onClick={onClose}
                    className="bg-primary text-white px-6 md:px-8 py-3.5 md:py-4 text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-tertiary transition-all"
                  >
                    Explore Collections
                  </button>
                </div>
              ) : (
                <div className="space-y-6 md:space-y-8" role="list" aria-label="Wishlist items">
                  {wishlist.map((item) => (
                    <div key={item.id} className="flex gap-4 group" role="listitem">
                      <div className="w-20 h-24 md:w-24 md:h-32 bg-surface-container-low flex-shrink-0 overflow-hidden shadow-sm">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover md:group-hover:scale-110 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-grow flex flex-col justify-between py-1">
                        <div className="mb-2">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-headline text-base md:text-lg text-primary leading-tight line-clamp-1">{item.name}</h4>
                            <button 
                              onClick={() => {
                                toggleWishlist(item);
                                toast.info('Removed from Wishlist', {
                                  description: `${item.name} has been removed.`
                                });
                              }}
                              className="text-outline hover:text-destructive transition-colors p-1"
                            >
                              <Trash2 className="w-4 h-4 md:w-4 md:h-4" aria-hidden="true" />
                            </button>
                          </div>
                          <p className="text-[9px] md:text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">{item.fabric}</p>
                          <p className="font-headline text-base md:text-lg text-tertiary">₹{item.price.toLocaleString()}</p>
                        </div>
                        
                        <button 
                          onClick={() => handleMoveToCart(item)}
                          className="w-full py-2 md:py-3 bg-primary text-white text-[8px] md:text-[9px] uppercase tracking-[0.2em] font-bold hover:bg-tertiary transition-all flex items-center justify-center gap-2"
                        >
                          <ShoppingBag className="w-3 h-3" aria-hidden="true" /> Move to Bag
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {wishlist.length > 0 && (
              <div className="p-4 md:p-8 bg-surface-container-low border-t border-outline-variant/30">
                <button 
                  onClick={onClose}
                  className="w-full bg-white text-primary border border-primary py-4 md:py-5 text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2 md:gap-3 shadow-sm"
                >
                  Continue Browsing <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" aria-hidden="true" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
