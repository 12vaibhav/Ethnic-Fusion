import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, MessageSquare, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../constants';
import { useShop } from '../context/ShopContext';

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useShop();
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  const desktopHeroImages = [
    '/Assets/hero section/herosection banner.webp',
    '/Assets/hero section/banner_1.webp',
    '/Assets/hero section/banner_2.webp'
  ];

  const mobileHeroImages = [
    '/Assets/hero section/mobile_banner1.jpg',
    '/Assets/hero section/mobile_banner2.jpeg',
    '/Assets/hero section/mobile_banner3.jpeg'
  ];

  const currentHeroImages = isMobile ? mobileHeroImages : desktopHeroImages;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % desktopHeroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [desktopHeroImages.length]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-surface overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-screen w-full overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={`${isMobile ? 'mobile' : 'desktop'}-${currentHeroIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.0 }}
              src={currentHeroImages[currentHeroIndex]}
              alt="Ethnic Fusion Collection Banner"
              referrerPolicy="no-referrer"
              className={cn("w-full h-full object-cover", currentHeroIndex !== 0 ? "object-right md:object-center" : "object-center")}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>
        </div>

        <div className="relative z-10 h-full flex flex-col justify-center items-center md:items-start px-6 md:px-24 max-w-7xl pt-12 md:pt-0 translate-y-6 md:translate-y-0">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden md:block font-label text-tertiary tracking-[0.3em] md:tracking-[0.4em] uppercase mt-8 md:mt-12 mb-4 md:mb-6 text-xs md:text-sm font-bold"
          >
            Exquisite Craftsmanship
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-headline text-5xl sm:text-6xl md:text-9xl text-white leading-[1] md:leading-[0.9] mb-8 md:mb-8 uppercase tracking-tighter text-center md:text-left drop-shadow-2xl"
          >
            Tradition Meets<br />
            <span className="italic font-medium lowercase text-tertiary bg-black/40 backdrop-blur-sm px-2 pb-2 inline-block leading-[0.85] rounded-sm">tomorrow</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="hidden md:block font-body text-white/90 text-base md:text-xl max-w-xl mb-8 md:mb-12 leading-relaxed italic"
          >
            "A symphony of heritage silk and modern precision. Discover the timeless grace of our signature silhouettes, reimagined for the modern archive."
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 md:mt-12 md:mb-0 flex flex-col sm:flex-row gap-4 md:gap-6 items-center sm:items-start"
          >
            <Link to="/collections" className="w-full sm:w-auto flex justify-center sm:justify-start">
              <button className="w-full sm:w-auto bg-tertiary text-white px-6 md:px-10 py-3 md:py-4 rounded-sm font-label uppercase tracking-widest hover:bg-white hover:text-primary transition-all duration-500 text-[10px] md:text-xs font-bold shadow-xl">
                Shop Now
              </button>
            </Link>
            <Link to="/lookbook" className="hidden md:flex w-full sm:w-auto justify-center sm:justify-start">
              <button className="w-full sm:w-auto border border-white/40 text-white px-6 md:px-10 py-3 md:py-4 rounded-sm font-label uppercase tracking-widest hover:bg-white/10 transition-all duration-300 backdrop-blur-sm text-[10px] md:text-xs font-bold">
                Explore Lookbook
              </button>
            </Link>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-20">
          {currentHeroImages.map((_, idx) => (
            <div 
              key={idx}
              onClick={() => setCurrentHeroIndex(idx)}
              className={cn(
                "w-12 h-[2px] cursor-pointer transition-all duration-500",
                idx === currentHeroIndex ? "bg-tertiary" : "bg-white/30 hover:bg-white/60"
              )}
            ></div>
          ))}
        </div>
      </section>

      {/* Signature Collections */}
      <section className="pt-6 pb-2 md:py-10 px-6 md:px-12 max-w-screen-2xl mx-auto">
        <div className="flex flex-col items-center mb-6 md:mb-12 text-center">
          <span className="font-label text-tertiary uppercase tracking-[0.3em] text-[10px] md:text-xs mb-1 font-bold">The Curated Archive</span>
          <h3 className="font-headline text-4xl md:text-6xl text-primary uppercase">Signature Collections</h3>
          <div className="w-16 md:w-24 h-1 bg-tertiary mt-1 md:mt-4"></div>
        </div>

        <div className="grid grid-rows-2 grid-flow-col md:grid-rows-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-4 md:gap-8 overflow-x-auto snap-x snap-mandatory pb-0 md:pb-0 -mx-6 pl-4 pr-6 md:mx-0 md:px-0 scroll-pl-4 h-auto md:h-auto hide-scrollbar">
          {[
            {
              title: 'Festive Fusion',
              image: '/Assets/Signature Collections/Festive Fusion.webp',
              description: 'Vibrant colors for celebration'
            },
            {
              title: 'Everyday Indo-Western',
              image: '/Assets/Signature Collections/Everyday Indo-Western.webp',
              description: 'Modern silhouettes for daily grace'
            },
            {
              title: 'Bridal Edit',
              image: '/Assets/Signature Collections/Bridal Edit.webp',
              description: 'Timeless heirlooms for your big day'
            },
            {
              title: 'Sustainable Luxe',
              image: '/Assets/Signature Collections/Sustainable Luxe.webp',
              description: 'Eco-conscious heritage textiles'
            }
          ].map((col, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer flex flex-col h-auto md:h-full w-[45vw] md:w-auto snap-start"
            >
              <Link to="/collections" className="flex flex-col h-full w-full">
                <div className="relative aspect-[3/4] overflow-hidden mb-2 md:mb-4 bg-surface-container-low flex-shrink-0">
                  <img
                    src={col.image}
                    alt={col.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <button className="bg-white text-primary px-8 py-3 text-[10px] uppercase tracking-widest font-bold hover:bg-tertiary hover:text-white transition-all">
                      Shop Collection
                    </button>
                  </div>
                </div>
                <div className="flex-grow overflow-hidden">
                  <h4 className="font-headline text-xl md:text-2xl text-primary mb-1 truncate">{col.title}</h4>
                  <p className="font-body text-on-surface-variant text-xs md:text-sm leading-relaxed line-clamp-2">{col.description}</p>
                </div>
                <div className="hidden md:block mt-2 pt-3 border-t border-outline-variant/30 flex-shrink-0">
                  <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-tertiary flex items-center gap-2 group-hover:gap-4 transition-all">
                    Explore <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stylist's Picks */}
      <section className="bg-surface-container-low py-6 md:py-10 overflow-hidden relative">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-12 gap-8">
            <div className="text-center md:text-left">
              <span className="font-label text-tertiary uppercase tracking-[0.3em] text-[10px] mb-3 font-bold block">Curated Excellence</span>
              <h3 className="font-headline text-4xl md:text-6xl text-primary uppercase">Stylist's Picks</h3>
              <div className="w-16 md:w-24 h-1 bg-tertiary mt-2 mx-auto md:mx-0"></div>
            </div>
            
            <div className="hidden md:flex gap-4">
              <button 
                onClick={() => scroll('left')}
                className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-outline-variant flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-500"
                aria-label="Scroll Left"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-outline-variant flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-500"
                aria-label="Scroll Right"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          </div>

          <div 
            ref={scrollRef}
            className="grid grid-rows-2 grid-flow-col md:grid-rows-1 md:flex gap-x-4 gap-y-4 md:gap-8 overflow-x-auto pb-0 snap-x snap-mandatory hide-scrollbar -mx-6 pl-4 pr-6 md:mx-0 md:px-0 scroll-pl-4 h-auto md:h-auto"
          >
            {PRODUCTS.slice(0, 6).map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="w-[45vw] md:min-w-[360px] md:w-auto h-auto md:h-auto snap-start group relative"
              >
                <Link to={`/product/${item.id}`} className="block w-full h-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tertiary">
                  <div className="relative aspect-[3/4] overflow-hidden bg-white shadow-sm border border-outline-variant/10 flex-shrink-0 mb-3 md:mb-8">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    
                    {/* Badge */}
                    <div className="absolute top-3 left-3 md:top-8 md:left-8">
                      <span className="bg-white/90 backdrop-blur-md text-primary px-3 py-1 md:px-4 md:py-1.5 text-[8px] md:text-[9px] uppercase tracking-widest font-bold border border-outline-variant/20 shadow-sm transition-opacity group-hover:opacity-0">
                        Best Seller
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-start px-2 overflow-hidden">
                    <div className="space-y-1 overflow-hidden">
                      <h5 className="font-headline text-xl md:text-2xl text-primary group-hover:text-tertiary transition-colors truncate">{item.name}</h5>
                      <p className="font-body text-on-surface-variant text-[10px] uppercase tracking-[0.2em] font-medium truncate">{item.fabric} • Limited Edition</p>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                      <p className="font-headline text-xl md:text-2xl text-tertiary">₹{item.price.toLocaleString()}</p>
                      {item.originalPrice && (
                        <p className="text-outline line-through text-xs mt-1 opacity-60">₹{item.originalPrice.toLocaleString()}</p>
                      )}
                    </div>
                  </div>
                </Link>

                {/* Quick Add Overlay - Styled button to sit on top of Link */}
                <div className="absolute inset-0 top-0 left-0 w-full h-[75%] md:h-[80%] pointer-events-none flex flex-col justify-end p-8">
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addToCart(item);
                    }}
                    className="w-full bg-white text-primary py-5 text-[10px] uppercase tracking-widest font-bold hover:bg-tertiary hover:text-white transition-all transform translate-y-6 opacity-0 md:group-hover:opacity-100 md:group-hover:translate-y-0 duration-500 shadow-2xl flex items-center justify-center gap-3 pointer-events-none md:group-hover:pointer-events-auto"
                  >
                    <ShoppingBag className="w-5 h-5" /> Quick Add to Bag
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className="flex justify-center gap-3 mt-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`h-[2px] transition-all duration-700 ${i === 0 ? 'w-12 bg-tertiary' : 'w-4 bg-outline-variant/40'}`}></div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Occasion */}
      <section className="py-6 md:py-10 px-6 md:px-12 bg-surface">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex flex-col items-center mb-6 md:mb-12 text-center">
            <span className="font-label text-tertiary uppercase tracking-[0.3em] text-[10px] mb-2 font-bold block">Curated for Every Moment</span>
            <h3 className="font-headline text-4xl md:text-6xl text-primary uppercase">Shop by Occasion</h3>
            <div className="w-16 md:w-24 h-1 bg-tertiary mt-2"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-8 md:gap-6">
            {[
              { 
                label: 'Wedding', 
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsW9Ewf0A-IG-mqxRZTC4FUtNCiOYRtFxWUNGDz-jy6vi__olfaIPYKtkGQGf1kNL6tLlJOADCAsmCSQ4mmJXblsRXnA_N41l7ZphjiunAwgzwM08rd1Rf-gyz8apvkgAbvYX8imcjXRRVCYcfstMePe1FYQQIKxB3r-kBesFpnWWI0NRdmVphxW0s0Vc2jCsaScc4qkIWsZr5W7mML8sXmAGRFhDtAadY8qgyuU1uZ21qXSs4trlRhateC66FXGfOX20v2xX-COii' 
              },
              { 
                label: 'Haldi & Mehendi', 
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBipIWa8MawnwdauQ9wVSxZQ-vQ8KIt3GB_uDqupycYGT7fS_y8XuCzwky2mQn2uTMHkM7jGKoZsFt_qF7lnIXrAd_PyoRWHbRkokrETEheiEuxaTqIkSKVxGEV8T32UNf9DGZIHpmtlD10fhYHRCjSeA4PJWq-uNsZN7J2LyRDTQjZqxKKfvgzBWsrifbqXeziIYYyeA1YBJEqWz4IMensuev6MAT2WfJvGKomf-p0oNHWIODC7zCz8rfb_mJOcaL9uXRnQLVY43ss' 
              },
              { 
                label: 'Cocktail Party', 
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFN4vLlNvCIb5qhfwUuzpxaHYYin1tnSOJIw7AeDaGpqvyikpFqSlHFeBW2Ouox925XPUjgu2HaIFcbWMKHGsiRiUOO2RAGUJrp_pgSX-a3VgQRGfDt0mlHfNB3woHUs-7Zzh5KC6fYuU1eK5RrpQ5ozAkbD1vDtpT5XCUPCOc0WWanZEKW8fXA8DjGSvLvG04fsHzDxkJIFu6eVQG_HiGupxJRxjfXwFxQVozXgzcm97442GYbgSLdU187ZnAq3zkeK3J1S-hBcIA' 
              },
              { 
                label: 'Office to Event', 
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJnD1vz3ir9EgbMgdmusanhGZYe-wjwFhidDPSXkIInNDcNawpAnkwKH2gX7kQQ9Pf_JHARQIBWM449fTnZWbGYqyLfk1Z8RWC7NSPQmXA6qsD2mDv1jNJcCEAJuEwrvwJ736ab3dTm4wj6OG8xMo6jUhkbsVMGqx2At3cIfEX4-37i4Yz9bqirbt9Ntr_KDXLPhcC6JXUY4rELhz-bsYZlFMr_697oTfVBWzdHj5Ch1guzf9hLsVIeHeZsgf63_b16eqYlNW6aFGo' 
              },
              { 
                label: 'Festive Casual', 
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDA3Q6iJKgy_dpsq5X2Yguczq0vg7bdGDFD0BQ5OWku2GbKncg5yGvppGxPC76q-tX5JJ8M6izY1m2kPfpzazxv_qZHdNg85OQ-iQyDMIrR1v7KiuWF5wu03Hnjy2cRm0b1xtUh1dCSRnSsjoCdogOBVUEoq80tj7CH6exxAecTtqjxuZL6RSMTfGjghWH6L2IrQNFEzwCioca_fjNVbgQiBcM278YhCjwxT5jKTEYQUhqt5-KpiJuVuIAVIhfau9Rd82fZjs3HPh4-' 
              },
              { 
                label: 'Summer Brunch', 
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDomFbZ6QHBrI9kz3UVyYT2EvgAvSAPz8umWvm0RgrUxjWizxcgG-pSuU07FfrL-nUkXweHnPt6PxFNRHQWvMIWWN_sG8uwf5pnyUcWcm8t5FHaWF7gwXFKSFG36WGNlWlFEDhFXHzfD1w1n0IpKX3MZLhdi0z4tdrB_Mi3cnWW0uOu3OuAHK1Lr9RmAcff9j_OJDHDApHUnSDrDbIWZKwLY_cgcXeShyeXftPUvY7La1XnMZLVa4c9Z5K2zC0KRntB6UChFR-HCraY' 
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center group cursor-pointer"
              >
                <Link to="/collections" className="flex flex-col items-center">
                  <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-3 border-2 border-outline-variant/30 md:group-hover:border-tertiary transition-all duration-500 shadow-lg">
                    <img
                      src={item.image}
                      alt={item.label}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-primary/10 md:group-hover:bg-transparent transition-colors duration-500"></div>
                  </div>
                  <span className="font-label text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-primary text-center md:group-hover:text-tertiary transition-colors">
                    {item.label}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Arrivals */}
      <section className="py-6 md:py-10 px-6 md:px-12 bg-surface-container-high">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex flex-col items-center mb-6 md:mb-12 text-center">
            <span className="font-label text-tertiary uppercase tracking-[0.3em] text-[10px] mb-2 font-bold block">The New Season</span>
            <h3 className="font-headline text-4xl md:text-6xl text-primary uppercase">Featured Arrivals</h3>
            <div className="w-16 md:w-24 h-1 bg-tertiary mt-2"></div>
          </div>

          <div className="grid grid-rows-2 grid-flow-col md:grid-rows-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-12 gap-y-4 md:gap-y-12 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-6 md:pb-0 -mx-6 pl-4 pr-6 md:mx-0 md:px-0 scroll-pl-4 h-auto md:h-auto hide-scrollbar">
            {PRODUCTS.slice(4, 8).map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative cursor-pointer flex-shrink-0 w-[45vw] md:w-auto h-auto md:h-full snap-start"
              >
                <Link to={`/product/${product.id}`} className="block w-full h-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tertiary">
                  <div className="relative aspect-[3/4] overflow-hidden bg-white shadow-lg md:shadow-2xl border border-outline-variant/10 flex-shrink-0 mb-3 md:mb-6">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      referrerPolicy="no-referrer" 
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    />
                    
                    {/* Hover Overlay with Fabric Details */}
                    <div className="absolute inset-0 bg-primary/90 opacity-0 md:group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center items-center text-center p-6 md:p-8 backdrop-blur-md">
                      <span className="text-tertiary font-label text-[10px] uppercase tracking-[0.4em] mb-2 md:mb-3 font-bold">Artisan Fabric</span>
                      <h4 className="text-white font-headline text-2xl md:text-3xl mb-2 md:mb-3 italic">{product.fabric}</h4>
                      <div className="w-10 md:w-12 h-[1px] bg-white/30 mb-3 md:mb-4"></div>
                      <p className="text-white/70 text-[10px] md:text-xs uppercase tracking-[0.2em] leading-relaxed mb-4 md:mb-6 line-clamp-3">Hand-crafted heritage textile with intricate detailing and modern precision.</p>
                      
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        className="w-full bg-white text-primary px-6 md:px-10 py-2.5 md:py-3.5 text-[10px] uppercase tracking-widest font-bold hover:bg-tertiary hover:text-white transition-all duration-300 pointer-events-auto"
                      >
                        Add to Bag
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-center px-4 overflow-hidden">
                    <h5 className="font-headline text-xl md:text-2xl text-primary mb-1 group-hover:text-tertiary transition-colors truncate">{product.name}</h5>
                    <p className="font-headline text-lg md:text-xl text-tertiary">₹{product.price.toLocaleString()}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Masterpiece Gallery */}
      <section className="py-6 md:py-10 px-6 md:px-12 bg-surface">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex flex-col items-center mb-6 text-center">
            <span className="font-label text-tertiary uppercase tracking-widest text-sm mb-4">Hand-Picked For You</span>
            <h3 className="font-headline text-5xl text-primary">Masterpiece Gallery</h3>
          </div>
          <div className="grid grid-rows-2 grid-flow-col md:grid-rows-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-4 md:gap-x-8 md:gap-y-16 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-6 md:pb-0 -mx-6 pl-4 pr-6 md:mx-0 md:px-0 scroll-pl-4 h-auto md:h-auto hide-scrollbar">
            {PRODUCTS.slice(0, 4).map((product, idx) => (
              <div key={product.id} className="w-[45vw] md:w-auto h-auto md:h-full snap-start">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-6 md:py-10 bg-surface-container-low">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-4 md:gap-20 flex-col md:flex-row">
            <div className="w-full md:w-1/2 relative group/testim">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDomFbZ6QHBrI9kz3UVyYT2EvgAvSAPz8umWvm0RgrUxjWizxcgG-pSuU07FfrL-nUkXweHnPt6PxFNRHQWvMIWWN_sG8uwf5pnyUcWcm8t5FHaWF7gwXFKSFG36WGNlWlFEDhFXHzfD1w1n0IpKX3MZLhdi0z4tdrB_Mi3cnWW0uOu3OuAHK1Lr9RmAcff9j_OJDHDApHUnSDrDbIWZKwLY_cgcXeShyeXftPUvY7La1XnMZLVa4c9Z5K2zC0KRntB6UChFR-HCraY"
                alt="Testimonial"
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-[350px] md:h-[500px] object-cover shadow-2xl"
              />
              {/* Mobile Chevrons - Overlaid on image */}
              <div className="md:hidden flex absolute bottom-8 right-8 gap-4">
                 <button className="w-12 h-12 rounded-full flex items-center justify-center text-primary bg-white/80 backdrop-blur-md shadow-xl active:scale-95 border border-white/20">
                    <ChevronLeft className="w-6 h-6" />
                 </button>
                 <button className="w-12 h-12 rounded-full flex items-center justify-center text-primary bg-white/80 backdrop-blur-md shadow-xl active:scale-95 border border-white/20">
                    <ChevronRight className="w-6 h-6" />
                 </button>
              </div>
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left">
              <span className="text-tertiary text-4xl md:text-6xl mb-2 md:mb-6 block">"</span>
              <h3 className="font-headline text-2xl md:text-4xl text-primary mb-2 italic leading-tight">
                "I felt like a queen on my wedding day. The fabric breathes with you, and the gold work is just mesmerizing."
              </h3>
              <p className="font-label text-on-surface font-bold uppercase tracking-widest text-sm">Anjali Sharma</p>
              <p className="text-on-surface-variant text-xs md:text-sm mt-1">London, UK</p>
              
              {/* Desktop Chevrons - Side aligned */}
              <div className="hidden md:flex gap-4 mt-10">
                <button className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
