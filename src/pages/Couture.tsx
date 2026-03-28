import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Sparkles, Heart, Clock } from 'lucide-react';
import { cn } from '../lib/utils';

const OCCASIONS = [
  {
    title: 'The Sangeet Night',
    subtitle: 'Glamour in Motion',
    description: 'Lightweight lehengas and fusion co-ords designed for the dance floor. Intricate mirror work meets modern silhouettes.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800',
    align: 'left'
  },
  {
    title: 'The Grand Wedding',
    subtitle: 'Timeless Opulence',
    description: 'Our signature bridal lehengas. Hand-woven silks, antique zardosi, and heritage motifs for the most important walk of your life.',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800',
    align: 'right'
  },
  {
    title: 'The Reception Gown',
    subtitle: 'Modern Sophistication',
    description: 'Indo-western gowns and structured sarees. A perfect blend of global fashion and Indian soul for your grand finale.',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=800',
    align: 'left'
  }
];

const COUTURE_PIECES = [
  {
    id: 'c1',
    name: 'The Empress Leheriya Lehenga',
    price: '₹2,45,000',
    hours: '420 Hours',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'c2',
    name: 'Zardosi Velvet Masterpiece',
    price: '₹3,10,000',
    hours: '580 Hours',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'c3',
    name: 'Hand-Painted Organza Gown',
    price: '₹1,85,000',
    hours: '210 Hours',
    image: 'https://images.unsplash.com/photo-1549439602-43ebca2327af?auto=format&fit=crop&q=80&w=600'
  }
];

export default function Couture() {
  return (
    <div className="bg-surface min-h-screen pt-20 md:pt-24">
      {/* Page Header */}
      <header className="px-6 md:px-12 pt-1 pb-6 md:pt-2 md:pb-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center"
        >
          <h1 className="font-headline text-4xl md:text-7xl text-primary mb-2 md:mb-3 uppercase tracking-tighter">The Bridal Edit</h1>
          <p className="font-body text-on-surface-variant text-base md:text-lg max-w-2xl italic">
            A curated destination for the modern bride. Where heritage textiles meet contemporary silhouettes for your most cherished moments.
          </p>
        </motion.div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[60vh] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=1920" 
          alt="Bridal Couture" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="max-w-4xl"
          >
            <h2 className="font-headline text-3xl md:text-6xl text-white mb-3 md:mb-4 uppercase tracking-widest leading-tight">
              The Grand Wedding & Beyond
            </h2>
            <p className="text-white/90 text-base md:text-lg font-light tracking-wide mb-6 md:mb-8 max-w-2xl mx-auto">
              Every stitch tells a story of love, every motif a legacy of craft. Discover our bespoke bridal collection.
            </p>
            <button className="bg-white text-primary px-8 md:px-10 py-3 md:py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-tertiary hover:text-white transition-all">
              Book a Consultation
            </button>
          </motion.div>
        </div>
      </section>

      {/* Occasion Sorting */}
      <section className="py-4 md:py-8 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-tertiary mb-2 md:mb-3 block">Curated for You</span>
          <h2 className="font-headline text-3xl md:text-5xl text-primary uppercase">Occasion-Based Edits</h2>
        </div>

        <div className="space-y-8 md:space-y-12">
          {OCCASIONS.map((occasion, index) => (
            <motion.div
              key={occasion.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className={cn(
                "flex flex-col md:flex-row items-center gap-6 md:gap-16",
                occasion.align === 'right' ? 'md:flex-row-reverse' : ''
              )}
            >
              <div className="w-full md:w-1/2 aspect-[4/5] overflow-hidden">
                <img 
                  src={occasion.image} 
                  alt={occasion.title} 
                  className="w-full h-full object-cover md:hover:scale-105 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-2 md:space-y-3">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-outline">{occasion.subtitle}</span>
                <h3 className="font-headline text-3xl md:text-4xl text-primary leading-tight">{occasion.title}</h3>
                <p className="font-body text-on-surface-variant text-base md:text-base leading-relaxed italic">
                  "{occasion.description}"
                </p>
                <Link to="/collections">
                  <button className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-bold text-primary hover:text-tertiary transition-colors pt-1 md:pt-2">
                    Explore Collection <ArrowRight className="w-4 h-4 md:group-hover:translate-x-2 transition-transform" />
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trousseau Planning Service */}
      <section className="bg-primary py-10 md:py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 md:gap-12">
          <div className="w-full lg:w-1/2">
            <h2 className="font-headline text-3xl md:text-5xl text-white mb-4 md:mb-6 uppercase leading-tight">
              The Trousseau <br className="hidden md:block" /> Planning Service
            </h2>
            <p className="text-white/80 text-base md:text-base mb-6 md:mb-8 leading-relaxed font-light">
              Building a bridal wardrobe is an art. Our senior stylists work with you to curate a versatile, timeless trousseau that reflects your personality—from the first dinner as a bride to your best friend's wedding.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-tertiary flex-shrink-0" />
                <div>
                  <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-0.5 md:mb-1">Personalized Curation</h4>
                  <p className="text-white/60 text-[10px]">Handpicked pieces tailored to your style and upcoming events.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Star className="w-5 h-5 text-tertiary flex-shrink-0" />
                <div>
                  <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-0.5 md:mb-1">Exclusive Access</h4>
                  <p className="text-white/60 text-[10px]">Priority access to new couture launches and limited editions.</p>
                </div>
              </div>
            </div>
            <button className="w-full md:w-auto border border-white/30 text-white px-8 py-3 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white hover:text-primary transition-all">
              Schedule an Appointment
            </button>
          </div>
          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-2 md:gap-3">
            <div className="space-y-2 md:space-y-3">
              <img src="https://images.unsplash.com/photo-1595991209266-5ff5a3a2f008?auto=format&fit=crop&q=80&w=400" alt="Trousseau 1" loading="lazy" className="w-full aspect-[3/4] object-cover" />
              <img src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&q=80&w=400" alt="Trousseau 2" loading="lazy" className="w-full aspect-square object-cover" />
            </div>
            <div className="space-y-2 md:space-y-3 pt-6 md:pt-8">
              <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=400" alt="Trousseau 3" loading="lazy" className="w-full aspect-square object-cover" />
              <img src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&q=80&w=400" alt="Trousseau 4" loading="lazy" className="w-full aspect-[3/4] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Heritage Craft Story */}
      <section className="py-12 md:py-16 px-6 md:px-12 max-w-5xl mx-auto text-center">
        <Heart className="w-5 h-5 md:w-6 md:h-6 text-tertiary mx-auto mb-4 md:mb-6" />
        <h2 className="font-headline text-3xl md:text-4xl text-primary mb-4 md:mb-6 uppercase">The Soul of Couture</h2>
        <p className="font-body text-base md:text-xl text-on-surface-variant leading-relaxed italic mb-6 md:mb-8">
          "A couture piece is more than an outfit; it's a labor of love. From the hand-drawn motifs inspired by Mughal architecture to the months of meticulous embroidery by our master artisans, every Bridal Edit piece is a masterpiece of Indian heritage."
        </p>
        <div className="w-12 md:w-16 h-px bg-outline-variant mx-auto mb-6 md:mb-8"></div>
        <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-outline">Handcrafted in our Atelier</p>
      </section>

      {/* Featured Couture Pieces */}
      <section className="py-10 md:py-16 px-6 md:px-12 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-3">
            <div>
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-tertiary mb-2 md:mb-3 block">Limited Edition</span>
              <h2 className="font-headline text-3xl md:text-5xl text-primary uppercase">Couture Masterpieces</h2>
            </div>
            <Link to="/collections" className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary border-b border-primary pb-1">
              View All Couture
            </Link>
          </div>

          <div className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-6 md:pb-0 -mx-6 pl-4 pr-6 scroll-pl-4 md:mx-0 md:px-0 hide-scrollbar">
            {COUTURE_PIECES.map((piece) => (
              <motion.div
                key={piece.id}
                whileHover={{ y: -10 }}
                className="group cursor-pointer flex-shrink-0 w-[80vw] md:w-auto snap-start"
              >
                <div className="relative aspect-[3/4] overflow-hidden mb-3 md:mb-4">
                  <img 
                    src={piece.image} 
                    alt={piece.name} 
                    className="w-full h-full object-cover md:group-hover:scale-110 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-md px-2 py-1 flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-tertiary" />
                    <span className="text-[9px] font-bold uppercase tracking-widest">{piece.hours}</span>
                  </div>
                </div>
                <h3 className="font-headline text-lg md:text-xl text-primary mb-0.5 md:mb-1">{piece.name}</h3>
                <p className="text-tertiary font-bold tracking-widest text-[10px] md:text-xs">{piece.price}</p>
                <button className="mt-3 md:mt-4 w-full py-3 border border-outline-variant text-[10px] uppercase tracking-[0.2em] font-bold md:group-hover:bg-primary md:group-hover:text-white md:group-hover:border-primary transition-all">
                  Inquire to Buy
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 md:py-20 px-6 md:px-12 text-center">
        <h2 className="font-headline text-3xl md:text-6xl text-primary mb-6 md:mb-8 uppercase tracking-tighter">
          Your Dream Ensemble Awaits
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-4">
          <button className="bg-primary text-white px-10 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-tertiary transition-all">
            Book Virtual Fitting
          </button>
          <button className="border border-primary text-primary px-10 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-primary hover:text-white transition-all">
            Visit Our Flagship
          </button>
        </div>
      </section>
    </div>
  );
}
