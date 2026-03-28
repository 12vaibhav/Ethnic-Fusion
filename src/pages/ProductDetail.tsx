import { useParams, Link } from 'react-router-dom';
import { useState, FormEvent } from 'react';
import { Heart, ShoppingBag, Share2, Ruler, Truck, RotateCcw, Star, ChevronRight, Plus } from 'lucide-react';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import { motion } from 'motion/react';
import { useShop } from '../context/ShopContext';
import { cn } from '../lib/utils';
import { toast } from 'sonner';

const FacebookIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const TwitterIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
);

const PinterestIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.966 1.406-5.966s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
  </svg>
);

export default function ProductDetail() {
  const { id } = useParams();
  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [activeTab, setActiveTab] = useState('description');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const isWishlisted = isInWishlist(product.id);

  const [reviews, setReviews] = useState([
    { id: '1', name: 'Ananya Sharma', rating: 5, comment: 'Absolutely stunning! The embroidery is even more intricate in person. A true heirloom piece.', date: '2024-03-15' },
    { id: '2', name: 'Priya Patel', rating: 4, comment: 'Beautiful fabric and fit. The color is slightly darker than the photos but still gorgeous.', date: '2024-02-28' }
  ]);

  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [announcement, setAnnouncement] = useState('');

  const announce = (message: string) => {
    setAnnouncement(message);
    // Clear announcement after a delay so it can be re-announced if needed
    setTimeout(() => setAnnouncement(''), 3000);
  };

  const handleReviewSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;
    
    const review = {
      id: Date.now().toString(),
      ...newReview,
      date: new Date().toISOString().split('T')[0]
    };
    
    setReviews([review, ...reviews]);
    setNewReview({ name: '', rating: 5, comment: '' });
    setShowReviewForm(false);
    toast.success('Review Submitted', {
      description: 'Thank you for sharing your experience with this piece.'
    });
    announce('Your review has been submitted successfully.');
  };

  const shareOnSocial = (platform: 'facebook' | 'twitter' | 'pinterest') => {
    const url = window.location.href;
    const title = product.name;
    const image = product.image;

    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'pinterest':
        shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(image)}&description=${encodeURIComponent(title)}`;
        break;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const bundleItems = [
    product,
    {
      id: 'bundle-choker',
      name: 'Kundan Choker Set',
      price: 12500,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPrgbgW3g0aRhbQdENgYDUESeEwwH5AFMuX2i2RljzM1wzV47vt9bmiGG0blHdO-i7lblltIvqA-69SM4pksM4jzOnEtUJqhdllJin7WAuPuPhSsGdHf8WaaUhb0wUDRV1ZP3hymbrraH4h7mvUtWJJ87WffnOs2jPHS_A2q2c5yXaM9tQG2X8bwLdymqTS4XXd04CM39j1dg52i3mTDwbhVKJFVZ_ET0MpYSP6B2DuQVkSpS4Igj11rl0t3jL-lq8tGro4RjAJwW5',
      category: 'Accessories',
      colors: ['#e9c349'],
      fabric: 'Metal',
      description: 'Kundan Choker Set'
    },
    {
      id: 'bundle-potli',
      name: 'Zari Woven Potli',
      price: 4200,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSsqVRFlCAwSGI6w179JFo30dM60glkBgcIpp1nxMjLST8GY8TJodGFpCr_oM1q9mUhGK4PG5ep3lQc4RHCu-NBxxDhRb9axIPGcwaLRXJKlJA6uEAVJle0fpeZpo27VWng3QJH667XrmMqw1yhjzJnODxu73J20PaxlO9YKzU7rRiE1M7X9VahS_0U8Cksoz3n-u6LWwyU0rcI4rRFSUg9oA-RbYhPLeJZmVoGxlAZJ5MvDtgYOFHeuBA3Cxe8U1b1NKYhstFnVPC',
      category: 'Accessories',
      colors: ['#e9c349'],
      fabric: 'Silk',
      description: 'Zari Woven Potli'
    }
  ];

  const addBundleToCart = () => {
    bundleItems.forEach(item => addToCart(item));
    toast.success('Bundle Added to Bag', {
      description: 'All items have been added to your bag.'
    });
    announce('Bundle added to cart.');
  };

  return (
    <div className="bg-surface min-h-screen pt-14 md:pt-20 pb-10 md:pb-20 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-20">
          {/* Image Gallery */}
          <section aria-label="Product Images" className="pt-4 lg:pt-0">
            {/* Mobile Carousel */}
            <div className="lg:hidden space-y-4">
              <div className="relative group/gallery">
                <div 
                  className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar -mx-6 px-6 scroll-pl-6"
                  onScroll={(e) => {
                    const scrollLeft = e.currentTarget.scrollLeft;
                    const width = e.currentTarget.offsetWidth;
                    const index = Math.round(scrollLeft / width);
                    if (index !== activeImageIndex) setActiveImageIndex(index);
                  }}
                >
                  {[1, 2, 3, 4].map((i, index) => (
                    <div key={i} className="flex-shrink-0 w-[calc(100vw-48px)] snap-start aspect-[3/4] bg-surface-container-low overflow-hidden mr-4 last:mr-0">
                      <img
                        src={product.image}
                        alt={`${product.name} view ${i}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* Floating Wishlist on Mobile */}
                <button 
                  onClick={() => toggleWishlist(product)}
                  className={cn(
                    "absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-90 z-10",
                    isWishlisted ? "bg-tertiary text-white" : "bg-white/90 backdrop-blur-sm text-primary"
                  )}
                >
                  <Heart className={cn("w-5 h-5", isWishlisted && "fill-white")} />
                </button>

                {/* Pagination Dots */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                  {[0, 1, 2, 3].map((i) => (
                    <div 
                      key={i} 
                      className={cn(
                        "w-1.5 h-1.5 rounded-full transition-all duration-300",
                        activeImageIndex === i ? "bg-primary w-4" : "bg-primary/30"
                      )} 
                    />
                  ))}
                </div>
              </div>

              {/* Mobile Thumbnails */}
              <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
                {[0, 1, 2, 3].map((i) => (
                  <button 
                    key={i}
                    onClick={() => {
                      const carousel = document.querySelector('.flex.lg\\:hidden.overflow-x-auto');
                      if (carousel) {
                        carousel.scrollTo({
                          left: i * (carousel.clientWidth - 48 + 16),
                          behavior: 'smooth'
                        });
                      }
                      setActiveImageIndex(i);
                    }}
                    className={cn(
                      "flex-shrink-0 w-16 h-20 border-2 transition-all",
                      activeImageIndex === i ? "border-primary" : "border-transparent opacity-60"
                    )}
                  >
                    <img src={product.image} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop Gallery */}
            <div className="hidden lg:block space-y-6">
              <div className="aspect-[3/4] overflow-hidden bg-surface-container-low">
                <img
                  src={product.image}
                  alt={`Main view of ${product.name}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <button 
                    key={i} 
                    className="aspect-square overflow-hidden bg-surface-container-low cursor-pointer hover:opacity-80 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tertiary"
                    aria-label={`View product image ${i}`}
                  >
                    <img
                      src={product.image}
                      alt={`${product.name} detail view ${i}`}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Product Info */}
          <section aria-label="Product Details" className="space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-tertiary" aria-label="4.8 out of 5 stars">
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-3 h-3 fill-current" aria-hidden="true" />)}
                </div>
                <span className="text-[10px] uppercase tracking-widest text-outline font-bold">48 Reviews</span>
              </div>
              <h1 className="font-headline text-5xl text-primary mb-4">{product.name}</h1>
              <p className="text-on-surface-variant font-medium tracking-wide uppercase text-sm mb-6">{product.fabric} • Hand-Embroidered</p>
              <div className="flex items-baseline gap-4">
                <span className="font-headline text-4xl text-tertiary">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-outline line-through text-xl">
                    <span className="sr-only">Original price: </span>
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* Color Selection */}
            <fieldset className="space-y-4 border-none p-0 pb-4 m-0">
              <div className="flex justify-between items-center">
                <legend className="text-xs uppercase tracking-widest text-primary font-bold">Select Color</legend>
                <span className="text-[10px] text-outline uppercase tracking-widest font-bold">Midnight Teal</span>
              </div>
              <div className="flex gap-4">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    style={{ backgroundColor: color }}
                    aria-label={`Select color ${color}`}
                    aria-pressed={selectedColor === color}
                    className={`w-10 h-10 rounded-full ring-1 ring-offset-4 transition-all focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tertiary ${selectedColor === color ? 'ring-tertiary' : 'ring-transparent hover:ring-outline'}`}
                  />
                ))}
              </div>
            </fieldset>

            {/* Size Selection */}
            <fieldset className="space-y-4 border-none p-0 m-0">
              <div className="flex justify-between items-center">
                <legend className="text-xs uppercase tracking-widest text-primary font-bold">Select Size</legend>
                <button 
                  type="button"
                  className="flex items-center gap-2 text-[10px] text-tertiary uppercase tracking-widest font-bold hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tertiary"
                >
                  <Ruler className="w-3 h-3" aria-hidden="true" /> Size Guide
                </button>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    aria-pressed={selectedSize === size}
                    className={`h-12 flex items-center justify-center border text-xs font-bold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tertiary ${selectedSize === size ? 'bg-primary text-white border-primary' : 'border-outline-variant text-outline hover:border-primary hover:text-primary'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Actions */}
            <div className="space-y-4 pt-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => {
                    addToCart(product);
                    toast.success('Added to Bag', {
                      description: `${product.name} has been added to your bag.`
                    });
                    announce(`${product.name} added to cart.`);
                  }}
                  className="flex-grow bg-primary text-white py-5 uppercase tracking-widest font-bold flex items-center justify-center gap-3 hover:bg-tertiary transition-all duration-500 shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tertiary"
                >
                  <ShoppingBag className="w-5 h-5" aria-hidden="true" /> Add to Cart
                </button>
                <button 
                  onClick={() => {
                    toggleWishlist(product);
                    if (isWishlisted) {
                      toast.info('Removed from Wishlist', {
                        description: `${product.name} has been removed from your wishlist.`
                      });
                    } else {
                      toast.success('Added to Wishlist', {
                        description: `${product.name} has been saved to your wishlist.`
                      });
                    }
                    announce(isWishlisted ? `${product.name} removed from wishlist.` : `${product.name} added to wishlist.`);
                  }}
                  aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  className={cn(
                    "flex-grow py-5 uppercase tracking-widest font-bold flex items-center justify-center gap-3 transition-all duration-500 border shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tertiary",
                    isWishlisted 
                      ? "bg-tertiary text-white border-tertiary" 
                      : "bg-white text-primary border-outline-variant hover:border-tertiary hover:text-tertiary"
                  )}
                >
                  <Heart className={cn("w-5 h-5", isWishlisted && "fill-white")} aria-hidden="true" />
                  {isWishlisted ? "In Wishlist" : "Add to Wishlist"}
                </button>
              </div>

              {/* Social Sharing */}
              <div className="flex items-center justify-center sm:justify-start gap-4 pt-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-outline font-bold">Share this piece:</span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => shareOnSocial('facebook')}
                    className="p-2 text-outline hover:text-tertiary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tertiary"
                    aria-label="Share on Facebook"
                  >
                    <FacebookIcon className="w-5 h-5" aria-hidden="true" />
                  </button>
                  <button 
                    onClick={() => shareOnSocial('twitter')}
                    className="p-2 text-outline hover:text-tertiary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tertiary"
                    aria-label="Share on Twitter"
                  >
                    <TwitterIcon className="w-5 h-5" aria-hidden="true" />
                  </button>
                  <button 
                    onClick={() => shareOnSocial('pinterest')}
                    className="p-2 text-outline hover:text-tertiary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tertiary"
                    aria-label="Share on Pinterest"
                  >
                    <PinterestIcon className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            {/* Customer Reviews Section */}
            <section aria-labelledby="reviews-heading" className="pt-4 border-t border-outline-variant/30 space-y-6">
              <div className="flex justify-between items-center">
                <h3 id="reviews-heading" className="text-xs uppercase tracking-widest text-primary font-bold">Customer Reviews ({reviews.length})</h3>
                <button 
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  aria-expanded={showReviewForm}
                  aria-controls="review-form"
                  className="text-[10px] text-tertiary uppercase tracking-widest font-bold hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tertiary"
                >
                  {showReviewForm ? 'Cancel' : 'Write a Review'}
                </button>
              </div>

              {showReviewForm && (
                <motion.form 
                  id="review-form"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleReviewSubmit}
                  className="bg-surface-container-low p-6 space-y-4 border border-outline-variant/30"
                >
                  <div className="space-y-2">
                    <label htmlFor="reviewer-name" className="text-[10px] uppercase tracking-widest text-outline font-bold block">Your Name</label>
                    <input 
                      id="reviewer-name"
                      type="text" 
                      required
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      className="w-full bg-white border border-outline-variant/50 px-4 py-3 text-sm focus:outline-none focus:border-tertiary transition-colors"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-widest text-outline font-bold block">Rating</span>
                    <div className="flex gap-2" role="radiogroup" aria-label="Star rating">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          role="radio"
                          aria-checked={newReview.rating === star}
                          aria-label={`${star} star${star > 1 ? 's' : ''}`}
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-tertiary rounded-sm"
                        >
                          <Star className={cn("w-4 h-4 transition-colors", star <= newReview.rating ? "fill-tertiary text-tertiary" : "text-outline-variant")} aria-hidden="true" />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="review-comment" className="text-[10px] uppercase tracking-widest text-outline font-bold block">Your Comment</label>
                    <textarea 
                      id="review-comment"
                      required
                      rows={3}
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      className="w-full bg-white border border-outline-variant/50 px-4 py-3 text-sm focus:outline-none focus:border-tertiary transition-colors resize-none"
                      placeholder="Share your thoughts on this piece..."
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-primary text-white py-4 uppercase tracking-widest text-xs font-bold hover:bg-tertiary transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tertiary"
                  >
                    Submit Review
                  </button>
                </motion.form>
              )}

              <div className="max-h-[400px] overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-outline-variant" role="list" aria-label="Customer reviews list">
                {reviews.length === 0 ? (
                  <p className="text-xs text-outline italic">No reviews yet. Be the first to share your experience.</p>
                ) : (
                  reviews.map((review) => (
                    <div key={review.id} className="space-y-2 border-b border-outline-variant/10 pb-4 last:border-0" role="listitem">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-xs font-bold text-primary uppercase tracking-wide">{review.name}</p>
                          <div className="flex text-tertiary mt-1" aria-label={`${review.rating} out of 5 stars`}>
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star key={s} className={cn("w-2.5 h-2.5", s <= review.rating ? "fill-current" : "text-outline-variant")} aria-hidden="true" />
                            ))}
                          </div>
                        </div>
                        <span className="text-[9px] text-outline uppercase tracking-tighter">{review.date}</span>
                      </div>
                      <p className="text-sm text-on-surface-variant leading-relaxed italic">"{review.comment}"</p>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-outline-variant/30" role="list" aria-label="Product features">
              <div className="flex flex-col items-center text-center gap-2" role="listitem">
                <Truck className="w-5 h-5 text-tertiary" aria-hidden="true" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-outline">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2" role="listitem">
                <RotateCcw className="w-5 h-5 text-tertiary" aria-hidden="true" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-outline">Easy Returns</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2" role="listitem">
                <Share2 className="w-5 h-5 text-tertiary" aria-hidden="true" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-outline">Authentic</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="pt-6">
              <div className="flex border-b border-outline-variant/30 gap-8" role="tablist" aria-label="Product information tabs">
                {['description', 'styling', 'shipping'].map((tab) => (
                  <button
                    key={tab}
                    id={`tab-${tab}`}
                    role="tab"
                    aria-selected={activeTab === tab}
                    aria-controls={`panel-${tab}`}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-xs uppercase tracking-widest font-bold transition-all border-b-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tertiary ${activeTab === tab ? 'text-tertiary border-tertiary' : 'text-outline border-transparent hover:text-primary'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div 
                className="py-8 font-body text-on-surface-variant text-sm leading-relaxed"
                id={`panel-${activeTab}`}
                role="tabpanel"
                aria-labelledby={`tab-${activeTab}`}
                tabIndex={0}
              >
                {activeTab === 'description' && (
                  <p>{product.description} This piece is a testament to the rich heritage of Indian textiles, featuring intricate Zardosi embroidery and hand-woven silk. Each motif is carefully placed to create a balanced, royal aesthetic.</p>
                )}
                {activeTab === 'styling' && (
                  <p>Pair this masterpiece with heavy kundan jewelry and a sleek bun for a classic bridal look. For a more contemporary fusion appeal, try a contrasting sheer dupatta and statement earrings.</p>
                )}
                {activeTab === 'shipping' && (
                  <p>Complimentary express shipping on all orders above ₹50,000. Each piece is made to order and will be delivered within 4-6 weeks of purchase.</p>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* Complete the Look Bundle */}
        <section aria-labelledby="bundle-heading" className="mt-8 px-4 py-8 md:px-10 md:py-10 bg-surface-container-low border border-outline-variant/30">
          <h3 id="bundle-heading" className="font-headline text-2xl md:text-3xl text-primary mb-10 text-center md:text-left">Complete Your Heirloom Look</h3>
          <div className="flex flex-col md:flex-row items-center gap-16 md:gap-12">
            <div className="flex -space-x-12 md:-space-x-16" aria-hidden="true">
              {bundleItems.map((item, index) => (
                <img 
                  key={item.id} 
                  src={item.image} 
                  alt="" 
                  loading="lazy" 
                  className={cn("w-32 h-44 md:w-48 md:h-64 object-cover border-4 border-white shadow-xl", index === 0 ? "z-30" : index === 1 ? "z-20 translate-y-6 md:translate-y-8" : "z-10 translate-y-12 md:translate-y-16")} 
                />
              ))}
            </div>
            <div className="w-full flex-grow space-y-6">
              <div className="space-y-3" role="list" aria-label="Bundle items">
                {bundleItems.map(item => (
                  <div key={item.id} className="flex justify-between text-[11px] md:text-sm" role="listitem">
                    <span className="text-on-surface-variant uppercase tracking-widest font-bold">{item.name}</span>
                    <span className="font-bold">₹{item.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="pt-6 border-t border-outline-variant/30 flex flex-col sm:flex-row justify-between items-center gap-6">
                <div className="text-center sm:text-left">
                  <p className="text-[10px] md:text-xs uppercase tracking-widest text-outline font-bold">Bundle Price</p>
                  <p className="font-headline text-3xl md:text-3xl text-tertiary">₹{bundleItems.reduce((sum, item) => sum + item.price, 0).toLocaleString()}</p>
                </div>
                <button 
                  onClick={addBundleToCart}
                  className="w-full sm:w-auto bg-primary text-white px-10 py-5 uppercase tracking-widest font-bold flex items-center justify-center gap-3 hover:bg-tertiary transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tertiary"
                >
                  <Plus className="w-4 h-4" aria-hidden="true" /> Add All to Bag
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Recommendations */}
        <section aria-labelledby="recommendations-heading" className="mt-12 md:mt-16">
          <div className="flex justify-between items-end mb-8 md:mb-16">
            <h3 id="recommendations-heading" className="font-headline text-2xl md:text-4xl text-primary">You May Also Like</h3>
            <Link to="/collections" className="flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-widest text-tertiary font-bold hover:underline">
              Explore More <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex md:grid md:grid-cols-4 gap-4 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 -mx-6 px-6 md:mx-0 hide-scrollbar scroll-pl-6">
            {PRODUCTS.slice(4, 8).map((p) => (
              <div key={p.id} className="flex-shrink-0 w-[70vw] md:w-auto snap-start">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>
      </div>
      
      {/* Accessibility Announcement Region */}
      <div 
        className="sr-only" 
        role="status" 
        aria-live="polite" 
        aria-atomic="true"
      >
        {announcement}
      </div>
    </div>
  );
}
