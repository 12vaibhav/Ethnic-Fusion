import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronDown, 
  MapPin, 
  CreditCard, 
  CheckCircle2, 
  ArrowLeft, 
  ShoppingBag,
  ShieldCheck,
  Truck,
  Package,
  Plus,
  Minus
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { cn } from '../lib/utils';

type CheckoutStep = 'shipping' | 'payment' | 'confirmation';

export default function Checkout() {
  const [step, setStep] = useState<CheckoutStep>('shipping');
  const { cart, cartTotal, updateQuantity, removeFromCart } = useShop();
  const [showMobileSummary, setShowMobileSummary] = useState(false);
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    paymentMethod: 'card'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = () => {
    if (step === 'shipping') setStep('payment');
    else if (step === 'payment') {
      // Logic for actual order placement would go here
      window.scrollTo(0, 0);
      setStep('confirmation');
    }
  };

  const handlePrevStep = () => {
    if (step === 'payment') setStep('shipping');
    else navigate(-1);
  };

  if (cart.length === 0 && step !== 'confirmation') {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-surface-container-low rounded-full flex items-center justify-center mb-8">
          <ShoppingBag className="w-10 h-10 text-outline" />
        </div>
        <h1 className="font-headline text-3xl text-primary mb-4 uppercase">Your bag is empty</h1>
        <p className="text-on-surface-variant mb-8 max-w-sm">Add some masterpieces to your bag before proceeding to checkout.</p>
        <Link to="/collections">
          <button className="bg-primary text-white px-10 py-4 uppercase tracking-[0.3em] font-bold hover:bg-tertiary transition-all">
            Explore Collections
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface pt-20 pb-20 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header & Progress */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-10 mb-8 md:mb-32">
          <div className="flex items-center gap-4 md:gap-6">
            <button onClick={handlePrevStep} className="p-2 hover:bg-surface-container-low rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-headline text-3xl md:text-5xl uppercase tracking-tight">Checkout</h1>
          </div>

          <div className="flex items-center justify-between gap-4 w-full md:w-auto bg-surface-container-low/50 px-4 py-3 md:bg-transparent md:p-0">
            <div className="flex items-center gap-2 md:gap-3">
              <div className={cn(
                "w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-500",
                step === 'shipping' ? "bg-primary text-white" : "bg-tertiary text-white shadow-lg"
              )}>
                {step !== 'shipping' ? <CheckCircle2 className="w-4 h-4" /> : '01'}
              </div>
              <span className={cn("text-[10px] uppercase tracking-widest font-bold", step === 'shipping' ? "text-primary" : "text-tertiary")}>Shipping</span>
            </div>
            <div className="flex-grow w-8 h-[1px] bg-outline-variant/30"></div>
            <div className="flex items-center gap-2 md:gap-3">
              <div className={cn(
                "w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-500",
                step === 'payment' ? "bg-primary text-white shadow-lg" : step === 'confirmation' ? "bg-tertiary text-white shadow-lg" : "bg-surface-container-high text-outline"
              )}>
                {step === 'confirmation' ? <CheckCircle2 className="w-4 h-4" /> : '02'}
              </div>
              <span className={cn("text-[10px] uppercase tracking-widest font-bold", step === 'payment' ? "text-primary" : "text-outline")}>Payment</span>
            </div>
          </div>
        </div>

        {/* Mobile Summary Toggle */}
        {step !== 'confirmation' && (
          <div className="md:hidden mb-8 border border-outline-variant/20 bg-surface-container-low rounded-lg overflow-hidden">
            <button 
              onClick={() => setShowMobileSummary(!showMobileSummary)}
              className="w-full flex items-center justify-between p-4 text-[10px] uppercase tracking-widest font-bold text-primary"
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-tertiary" />
                <span>{showMobileSummary ? 'Hide' : 'Show'} Order Summary</span>
                <ChevronDown className={cn("w-4 h-4 transition-transform", showMobileSummary && "rotate-180")} />
              </div>
              <span className="text-sm font-headline">₹{cartTotal.toLocaleString()}</span>
            </button>
            
            <motion.div
              initial={false}
              animate={{ height: showMobileSummary ? 'auto' : 0 }}
              className="overflow-hidden bg-white px-4"
            >
              <div className="py-6 space-y-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-20 bg-surface-container-low flex-shrink-0 overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow flex flex-col justify-between py-1">
                      <div>
                        <h4 className="font-headline text-sm text-primary leading-tight line-clamp-1">{item.name}</h4>
                        <p className="text-[8px] text-outline uppercase tracking-widest">{item.fabric} • Qty: {item.quantity}</p>
                      </div>
                      <p className="font-headline text-sm text-tertiary">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t border-outline-variant/10 space-y-2">
                  <div className="flex justify-between text-[10px] uppercase tracking-widest">
                    <span className="text-outline">Subtotal</span>
                    <span className="font-bold">₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[10px] uppercase tracking-widest">
                    <span className="text-outline">Shipping</span>
                    <span className="text-tertiary">Complimentary</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Main Checkout Form */}
          <div className="lg:col-span-7 space-y-8 order-2 lg:order-1">
            <AnimatePresence mode="wait">
              {step === 'shipping' && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6 md:space-y-8"
                >
                  <section className="bg-white border border-outline-variant/20 p-6 md:p-10 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-tertiary/20" />
                    <div className="flex items-center gap-4 mb-6 md:mb-10">
                      <div className="p-3 bg-surface-container-low rounded-full text-tertiary">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <h2 className="font-headline text-3xl text-primary uppercase">Shipping Information</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 md:gap-y-10">
                      <div className="md:col-span-2 flex flex-col border-b border-outline-variant/30 hover:border-tertiary focus-within:border-tertiary transition-all">
                        <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-outline ml-4 mt-2">Email Address</label>
                        <input 
                          type="email" name="email" value={formData.email} onChange={handleInputChange}
                          className="w-full bg-transparent px-4 py-2.5 outline-none font-body text-base placeholder:text-outline-variant/50"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div className="flex flex-col border-b border-outline-variant/30 hover:border-tertiary focus-within:border-tertiary transition-all">
                        <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-outline ml-4 mt-2">First Name</label>
                        <input 
                          type="text" name="firstName" value={formData.firstName} onChange={handleInputChange}
                          className="w-full bg-transparent px-4 py-2.5 outline-none font-body text-base placeholder:text-outline-variant/50"
                          placeholder="Arjun"
                        />
                      </div>
                      <div className="flex flex-col border-b border-outline-variant/30 hover:border-tertiary focus-within:border-tertiary transition-all">
                        <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-outline ml-4 mt-2">Last Name</label>
                        <input 
                          type="text" name="lastName" value={formData.lastName} onChange={handleInputChange}
                          className="w-full bg-transparent px-4 py-2.5 outline-none font-body text-base placeholder:text-outline-variant/50"
                          placeholder="Kapoor"
                        />
                      </div>
                      <div className="md:col-span-2 flex flex-col border-b border-outline-variant/30 hover:border-tertiary focus-within:border-tertiary transition-all">
                        <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-outline ml-4 mt-2">Delivery Address</label>
                        <input 
                          type="text" name="address" value={formData.address} onChange={handleInputChange}
                          className="w-full bg-transparent px-4 py-2.5 outline-none font-body text-base placeholder:text-outline-variant/50"
                          placeholder="Flat No, Street Name, Locality"
                        />
                      </div>
                      <div className="flex flex-col border-b border-outline-variant/30 hover:border-tertiary focus-within:border-tertiary transition-all">
                        <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-outline ml-4 mt-2">City</label>
                        <input 
                          type="text" name="city" value={formData.city} onChange={handleInputChange}
                          className="w-full bg-transparent px-4 py-2.5 outline-none font-body text-base placeholder:text-outline-variant/50"
                          placeholder="New Delhi"
                        />
                      </div>
                      <div className="flex flex-col border-b border-outline-variant/30 hover:border-tertiary focus-within:border-tertiary transition-all">
                        <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-outline ml-4 mt-2">Postal Code</label>
                        <input 
                          type="text" name="postalCode" value={formData.postalCode} onChange={handleInputChange}
                          className="w-full bg-transparent px-4 py-2.5 outline-none font-body text-base placeholder:text-outline-variant/50"
                          placeholder="110001"
                        />
                      </div>
                    </div>
                  </section>

                  <section className="bg-primary/5 border border-primary/10 p-6 md:p-8 flex items-start gap-5">
                    <div className="bg-white p-3 rounded-full shadow-sm text-primary">
                      <Truck className="w-5 h-5 flex-shrink-0" />
                    </div>
                    <div>
                      <h4 className="font-headline text-xl text-primary uppercase tracking-tight">Standard Heritage Delivery</h4>
                      <p className="text-on-surface-variant text-sm mt-1">Estimated delivery: 5-7 business days across India. Luxury packaging included.</p>
                      <span className="inline-block mt-3 text-[10px] uppercase tracking-widest font-black text-tertiary">FREE SHIPPING APPLIED</span>
                    </div>
                  </section>

                  <button 
                    onClick={handleNextStep}
                    className="w-full bg-primary text-white py-4 md:py-6 px-8 md:px-10 text-[11px] md:text-[12px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold hover:bg-tertiary hover:shadow-2xl transition-all flex items-center justify-center gap-3 md:gap-4 group"
                  >
                    Continue to Payment <ChevronRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform" />
                  </button>
                </motion.div>
              )}

              {step === 'payment' && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6 md:space-y-8"
                >
                  <section className="bg-white border border-outline-variant/20 p-6 md:p-10 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-tertiary/20" />
                    <div className="flex items-center gap-4 mb-6 md:mb-10">
                      <div className="p-3 bg-surface-container-low rounded-full text-tertiary">
                        <CreditCard className="w-5 h-5 font-bold" />
                      </div>
                      <h2 className="font-headline text-3xl text-primary uppercase">Payment Method</h2>
                    </div>

                    <div className="space-y-4">
                      {[
                        { id: 'card', label: 'Credit / Debit Card' },
                        { id: 'upi', label: 'UPI / NetBanking' },
                        { id: 'cod', label: 'Cash on Delivery' }
                      ].map((method) => (
                        <label 
                          key={method.id}
                          className={cn(
                            "flex items-center justify-between p-6 border transition-all duration-300",
                            formData.paymentMethod === method.id ? "border-tertiary bg-tertiary/5" : "border-outline-variant/30 hover:border-outline-variant"
                          )}
                        >
                          <div className="flex items-center gap-5">
                            <div className={cn(
                              "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                              formData.paymentMethod === method.id ? "border-tertiary" : "border-outline-variant/50"
                            )}>
                              {formData.paymentMethod === method.id && <div className="w-2.5 h-2.5 bg-tertiary rounded-full" />}
                            </div>
                            <span className="font-headline text-lg md:text-xl text-primary uppercase font-medium">
                              {method.label}
                            </span>
                          </div>
                          <input 
                            type="radio" name="paymentMethod" value={method.id} className="hidden" 
                            onChange={() => setFormData({...formData, paymentMethod: method.id})} 
                          />
                        </label>
                      ))}
                    </div>

                    {formData.paymentMethod === 'card' && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        className="mt-8 md:mt-12 space-y-6 md:space-y-8 pt-6 md:pt-10 border-t border-outline-variant/20"
                      >
                        <div className="flex flex-col border-b border-outline-variant/30 hover:border-tertiary focus-within:border-tertiary transition-all">
                          <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-outline ml-4 mt-2">Card Member Name</label>
                          <input 
                            type="text" className="w-full bg-transparent px-4 py-2.5 outline-none font-body text-base uppercase tracking-widest placeholder:text-outline-variant/50 placeholder:normal-case"
                            placeholder="Full name as on card"
                          />
                        </div>
                        <div className="flex flex-col border-b border-outline-variant/30 hover:border-tertiary focus-within:border-tertiary transition-all">
                          <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-outline ml-4 mt-2">Card Number</label>
                          <div className="relative">
                            <input 
                              type="text" className="w-full bg-transparent px-4 py-2.5 outline-none font-body text-base placeholder:text-outline-variant/50"
                              placeholder="0000 0000 0000 0000"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                              <div className="w-8 h-5 bg-surface-container-high rounded" />
                              <div className="w-8 h-5 bg-tertiary/20 rounded border border-tertiary/30" />
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-10">
                          <div className="flex flex-col border-b border-outline-variant/30 hover:border-tertiary focus-within:border-tertiary transition-all">
                            <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-outline ml-4 mt-2">Expiry</label>
                            <input 
                              type="text" className="w-full bg-transparent px-4 py-2.5 outline-none font-body text-base placeholder:text-outline-variant/50"
                              placeholder="MM / YY"
                            />
                          </div>
                          <div className="flex flex-col border-b border-outline-variant/30 hover:border-tertiary focus-within:border-tertiary transition-all">
                            <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-outline ml-4 mt-2">CVV</label>
                            <input 
                              type="password" className="w-full bg-transparent px-4 py-2.5 outline-none font-body text-base placeholder:text-outline-variant/50"
                              placeholder="***"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </section>

                  <div className="bg-surface-container-low border border-outline-variant/10 p-6 flex flex-col md:flex-row items-center justify-between text-[10px] text-outline font-bold uppercase tracking-widest gap-4">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-tertiary" /> 
                      <span>State-of-the-Art Encryption Enabled</span>
                    </div>
                    <div className="flex gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
                      <span>VISA</span>
                      <span>MC</span>
                      <span>AMEX</span>
                    </div>
                  </div>

                  <button 
                    onClick={handleNextStep}
                    className="w-full bg-primary text-white py-4 md:py-6 px-8 md:px-10 text-[11px] md:text-[12px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold hover:bg-tertiary hover:shadow-2xl transition-all flex items-center justify-center gap-3 md:gap-4 group"
                  >
                    Place Secure Order <ChevronRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform" />
                  </button>
                </motion.div>
              )}

              {step === 'confirmation' && (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-16 space-y-10 lg:col-span-12 max-w-2xl mx-auto"
                >
                  <div className="relative">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1.1 }}
                      transition={{ type: 'spring', damping: 10 }}
                      className="w-28 h-28 bg-tertiary text-white rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(115,92,0,0.3)]"
                    >
                      <CheckCircle2 className="w-14 h-14" />
                    </motion.div>
                    <div className="absolute -inset-4 border border-tertiary/20 rounded-full animate-ping" />
                  </div>
                  
                  <div className="space-y-4">
                    <h2 className="font-headline text-5xl md:text-6xl text-primary uppercase tracking-tight">Masterpiece Reserved</h2>
                    <p className="text-on-surface-variant max-w-md mx-auto leading-relaxed">Thank you, {formData.firstName}. Your heirloom selection is being meticulously prepared in our atelier. A confirmation has been sent to your email.</p>
                  </div>

                  <div className="bg-surface-container-low p-8 border border-outline-variant/20 w-full space-y-4">
                    <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold border-b border-outline-variant/10 pb-4">
                      <span className="text-outline">Order Identifier</span>
                      <span className="text-primary">EF-{(Math.random() * 100000).toFixed(0)}X{new Date().getFullYear()}</span>
                    </div>
                    <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold">
                      <span className="text-outline">Status</span>
                      <span className="text-tertiary">Preparing for Delivery</span>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 w-full pt-6">
                    <Link to="/account" className="flex-1 p-6 border border-primary text-[10px] uppercase tracking-[0.2em] font-black text-primary hover:bg-surface-container-high transition-all text-center">Track My Order</Link>
                    <Link to="/collections" className="flex-1 p-6 bg-primary text-white text-[10px] uppercase tracking-[0.2em] font-black hover:bg-tertiary transition-all shadow-xl text-center">Back to Boutique</Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar (Desktop) */}
          {step !== 'confirmation' && (
            <div className="hidden lg:block lg:col-span-5 lg:order-2">
              <section className="bg-surface-container-low border border-outline-variant/10 p-6 md:p-10 sticky top-28">
                <div className="flex items-center gap-4 mb-10">
                  <div className="p-3 bg-white rounded-full text-tertiary shadow-sm">
                    <ShoppingBag className="w-5 h-5 font-bold" />
                  </div>
                  <h3 className="font-headline text-3xl text-primary uppercase">Order Selection</h3>
                </div>

                <div className="space-y-8 max-h-[45vh] overflow-y-auto pr-4 hide-scrollbar mb-10">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-6 group">
                      <div className="w-20 h-28 bg-white flex-shrink-0 overflow-hidden shadow-sm">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                      </div>
                      <div className="flex-grow flex flex-col justify-between py-1">
                        <div>
                          <h4 className="font-headline text-lg md:text-xl text-primary leading-tight line-clamp-1">{item.name}</h4>
                          <p className="text-[9px] text-on-surface-variant uppercase tracking-widest mt-1.5">{item.fabric}</p>
                        </div>
                        <div className="flex justify-between items-end">
                          <div className="flex items-center border border-outline-variant/30 scale-90 origin-left">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:bg-surface"><Minus className="w-2.5 h-2.5"/></button>
                            <span className="w-6 text-center text-[10px] font-bold">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:bg-surface"><Plus className="w-2.5 h-2.5"/></button>
                          </div>
                          <p className="font-headline text-xl text-tertiary">₹{(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 pt-8 border-t border-outline-variant/20">
                  <div className="flex justify-between text-[11px] uppercase tracking-widest font-bold text-outline">
                    <span>Subtotal</span>
                    <span className="text-secondary">₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[11px] uppercase tracking-widest font-bold text-outline">
                    <span>Shipping</span>
                    <span className="text-tertiary">COMPLIMENTARY</span>
                  </div>
                  <div className="flex justify-between items-baseline text-primary pt-8 mt-2 border-t border-outline-variant/30">
                    <span className="text-xs uppercase tracking-[0.3em] font-black">Grand Total</span>
                    <span className="font-headline text-3xl md:text-4xl">₹{cartTotal.toLocaleString()}</span>
                  </div>
                </div>

                <p className="mt-10 text-[8px] text-outline text-center uppercase tracking-widest leading-loose">
                  Our artisans are ready to pack your selection.<br/>
                  Expected delivery: {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </section>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
