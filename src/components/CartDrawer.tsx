import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { toast } from 'sonner';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useShop();

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
            aria-labelledby="cart-drawer-title"
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[103] shadow-2xl flex flex-col"
          >
            <div className="p-4 md:p-6 border-b border-outline-variant/30 flex justify-between items-center">
              <div className="flex items-center gap-2 md:gap-3">
                <ShoppingBag className="w-4 h-4 md:w-5 md:h-5 text-primary" aria-hidden="true" />
                <h2 id="cart-drawer-title" className="font-headline text-xl md:text-2xl text-primary uppercase tracking-tight">Your Bag</h2>
                <span className="text-[10px] md:text-xs font-bold text-tertiary bg-surface-container-low px-1.5 md:px-2 py-0.5 rounded-full">
                  <span className="sr-only">Items in bag: </span>
                  {cart.length}
                </span>
              </div>
              <button 
                onClick={onClose} 
                aria-label="Close Cart"
                className="p-1.5 md:p-2 hover:bg-surface rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tertiary"
              >
                <X className="w-4 h-4 md:w-5 md:h-5 text-primary" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-4 md:p-6 hide-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-surface-container-low rounded-full flex items-center justify-center mb-4 md:mb-6">
                    <ShoppingBag className="w-6 h-6 md:w-8 md:h-8 text-outline" aria-hidden="true" />
                  </div>
                  <h3 className="font-headline text-xl md:text-2xl text-primary mb-2">Your bag is empty</h3>
                  <p className="text-on-surface-variant text-xs md:text-sm mb-6 md:mb-8 max-w-[200px] md:max-w-[240px]">
                    Looks like you haven't added any masterpieces to your bag yet.
                  </p>
                  <button 
                    onClick={onClose}
                    className="bg-primary text-white px-6 md:px-8 py-3.5 md:py-4 text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-tertiary transition-all"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6 md:space-y-8" role="list" aria-label="Cart items">
                  {cart.map((item) => (
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
                        <div>
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-headline text-base md:text-lg text-primary leading-tight line-clamp-1">{item.name}</h4>
                            <button 
                              onClick={() => {
                                removeFromCart(item.id);
                                toast.info('Removed from Bag', {
                                  description: `${item.name} has been removed.`
                                });
                              }}
                              aria-label={`Remove ${item.name} from bag`}
                              className="text-outline hover:text-destructive transition-colors p-1"
                            >
                              <Trash2 className="w-4 h-4 md:w-4 md:h-4" aria-hidden="true" />
                            </button>
                          </div>
                          <p className="text-[8px] md:text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">{item.fabric}</p>
                          <p className="font-headline text-base md:text-lg text-tertiary">₹{item.price.toLocaleString()}</p>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <div className="flex items-center border border-outline-variant/30 scale-90 origin-left">
                            <button 
                              onClick={() => {
                                updateQuantity(item.id, item.quantity - 1);
                                if (item.quantity === 1) {
                                  toast.info('Removed from Bag', {
                                    description: `${item.name} has been removed.`
                                  });
                                }
                              }}
                              className="p-1 px-2 hover:bg-surface text-primary"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-[10px] font-bold text-primary">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 md:p-1.5 hover:bg-surface transition-colors"
                            >
                              <Plus className="w-2.5 h-2.5 md:w-3 md:h-3 text-primary" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-4 md:p-8 bg-surface-container-low border-t border-outline-variant/30 space-y-4 md:space-y-6">
                <div className="space-y-1.5 md:space-y-2" role="region" aria-label="Order summary">
                  <div className="flex justify-between text-on-surface-variant text-[10px] md:text-sm">
                    <span className="uppercase tracking-widest font-bold">Subtotal</span>
                    <span className="font-bold">₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-on-surface-variant text-[10px] md:text-sm">
                    <span className="uppercase tracking-widest font-bold">Shipping</span>
                    <span className="text-tertiary font-bold tracking-widest">FREE</span>
                  </div>
                  <div className="flex justify-between text-primary font-headline text-lg md:text-2xl pt-3 md:pt-4 border-t border-outline-variant/20">
                    <span>Total</span>
                    <span>₹{cartTotal.toLocaleString()}</span>
                  </div>
                </div>
                <Link to="/checkout" onClick={onClose} className="block w-full">
                  <button className="w-full bg-primary text-white py-4 md:py-5 text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-tertiary transition-all flex items-center justify-center gap-2 md:gap-3 shadow-xl">
                    Proceed to Checkout <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" aria-hidden="true" />
                  </button>
                </Link>
                <p className="text-[7px] md:text-[9px] text-center text-outline uppercase tracking-widest">
                  Secure Checkout • 100% Authentic Heritage Wear
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
