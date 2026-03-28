import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, Leaf, Users, ChevronRight, Quote } from 'lucide-react';

import { useEffect, useState } from 'react';

export default function About() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const values = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Heritage',
      description: 'Preserving centuries-old Indian weaving and embroidery techniques while adapting them for the global woman.'
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: 'Sustainability',
      description: 'Committed to slow fashion, using organic textiles and ensuring zero-waste patterns in our atelier.'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Women Empowerment',
      description: 'Our workforce is 80% women, from master artisans to our design team, fostering financial independence.'
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Innovation',
      description: 'Constantly experimenting with silhouettes to create the perfect blend of comfort and couture.'
    }
  ];

  const artisans = [
    {
      name: 'Master Ji',
      role: 'Head Pattern Maker',
      image: 'https://images.unsplash.com/photo-1590736962104-03716634737d?auto=format&fit=crop&q=80&w=800',
      story: 'With 40 years of experience, he brings architectural precision to our fusion silhouettes.'
    },
    {
      name: 'Zoya',
      role: 'Lead Embroiderer',
      image: 'https://images.unsplash.com/photo-1617952222434-86927282b99d?auto=format&fit=crop&q=80&w=800',
      story: 'Specializes in Zardosi work, spending over 200 hours on a single bridal lehenga.'
    },
    {
      name: 'Rahim',
      role: 'Textile Weaver',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800',
      story: 'A third-generation weaver from Banaras, keeping the art of handloom silk alive.'
    },
    {
      name: 'Anjali',
      role: 'Quality Artisan',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
      story: 'Ensures every stitch meets our luxury standards before it leaves the atelier.'
    }
  ];

  return (
    <div className="bg-surface min-h-screen pt-24 md:pt-32">
      {/* Page Header */}
      <header className="px-6 md:px-12 py-8 md:py-12 max-w-7xl mx-auto">
        <motion.div
          className="text-center flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-headline text-4xl md:text-7xl text-primary mb-4 uppercase tracking-tighter">Our Story</h1>
          <p className="font-body text-on-surface-variant text-base md:text-xl max-w-2xl italic leading-relaxed">
            Where heritage meets modern fusion. A journey of threads, traditions, and the contemporary woman.
          </p>
        </motion.div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[30vh] md:h-[60vh] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=2000"
          alt="Designer at work"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <h2 className="font-headline text-2xl md:text-7xl text-white mb-1 md:mb-6 uppercase leading-[1.1]">
              Crafted with Soul.<br />Styled for Today.
            </h2>
            <p className="font-body text-white/90 text-[11px] md:text-xl leading-relaxed line-clamp-3 md:line-clamp-none">
              Ethnic Fusion was born from a singular vision: to liberate Indian ethnic wear from tradition, making it a versatile expression for the modern wardrobe.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Designer's Journey */}
      <section className="py-10 md:py-14 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: isMobile ? -20 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[3/4] overflow-hidden rounded-sm shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&q=80&w=1000"
                alt="The Designer"
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-tertiary p-8 hidden md:block">
              <p className="text-white font-headline text-2xl italic">"Fashion is a dialogue between the past and the future."</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 20 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4 md:space-y-6"
          >
            <span className="font-label text-tertiary uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold">The Visionary</span>
            <h2 className="font-headline text-3xl md:text-5xl text-primary">A Journey of Fusion</h2>
            <div className="space-y-4 md:space-y-6 font-body text-on-surface-variant leading-relaxed text-base md:text-lg">
              <p>
                Growing up in the vibrant streets of Jaipur, our founder was surrounded by the rich tapestry of Indian craftsmanship. However, she noticed a gap: the younger generation found traditional wear beautiful but often restrictive.
              </p>
              <p>
                After studying design in Milan, she returned with a new perspective. She saw the potential to marry the intricate hand-embroidery of her roots with the clean, architectural lines of European tailoring.
              </p>
              <p>
                Thus, Ethnic Fusion was born—not just as a brand, but as a philosophy. We believe that a saree can be as effortless as a wrap dress, and a lehenga can carry the spirit of a modern gown.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Inspiration */}
      <section className="py-10 md:py-14 bg-surface-container-low overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="font-headline text-3xl md:text-6xl text-primary mb-4 uppercase">Our Inspiration</h2>
            <div className="w-16 md:w-24 h-1 bg-tertiary mx-auto"></div>
          </div>
          <div className="flex md:grid md:grid-cols-3 gap-5 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 hide-scrollbar scroll-pl-6">
            {[
              { title: 'Roots in Tradition', img: 'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&q=80&w=800' },
              { title: 'Twist of Modernity', img: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=800' },
              { title: 'Sustainable Craft', img: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative flex-shrink-0 w-[78vw] md:w-auto aspect-[4/5] overflow-hidden rounded-sm snap-start"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-1000 md:group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent md:bg-black/40 flex items-end md:items-center justify-center p-6 md:p-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
                  <h3 className="text-white font-headline text-lg md:text-2xl uppercase tracking-widest text-center">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship & Artisans */}
      <section className="py-10 md:py-14 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-6 md:gap-8">
          <div className="max-w-xl">
            <span className="font-label text-tertiary uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold block mb-3 md:mb-4">Behind the Scenes</span>
            <h2 className="font-headline text-3xl md:text-6xl text-primary leading-tight">The Hands Behind Every Piece</h2>
          </div>
          <button className="font-label text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-primary border-b-2 border-primary pb-2 hover:text-tertiary hover:border-tertiary transition-all">
            Meet Our Artisans
          </button>
        </div>
        <div className="flex md:grid md:grid-cols-4 gap-6 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-6 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 hide-scrollbar scroll-pl-6">
          {artisans.map((artisan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex-shrink-0 w-[75vw] md:w-auto space-y-4 md:space-y-6 snap-start"
            >
              <div className="aspect-square overflow-hidden grayscale-0 md:grayscale md:hover:grayscale-0 transition-all duration-700 rounded-sm">
                <img src={artisan.image} alt={artisan.name} referrerPolicy="no-referrer" loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-headline text-xl md:text-2xl text-primary">{artisan.name}</h4>
                <p className="font-label text-[9px] md:text-[10px] uppercase tracking-widest text-tertiary mb-2 md:mb-3">{artisan.role}</p>
                <p className="font-body text-on-surface-variant text-xs md:text-sm leading-relaxed">{artisan.story}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Our Values */}
      <section className="py-10 md:py-14 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="font-headline text-3xl md:text-6xl mb-4 uppercase">Our Values</h2>
            <p className="font-body text-white/60 text-sm md:text-base max-w-xl mx-auto">The pillars that define our commitment to luxury, ethics, and innovation.</p>
          </div>
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-6 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 hide-scrollbar scroll-pl-6">
            {values.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex-shrink-0 w-[80vw] md:w-auto p-6 md:p-8 border border-white/10 md:hover:bg-white/5 transition-colors group snap-start"
              >
                <div className="text-tertiary mb-4 md:mb-6 md:group-hover:scale-110 transition-transform duration-500">{value.icon}</div>
                <h3 className="font-headline text-xl md:text-2xl mb-3 md:mb-4">{value.title}</h3>
                <p className="font-body text-white/70 text-xs md:text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Quote */}
      <section className="py-10 md:py-14 px-6 text-center max-w-4xl mx-auto overflow-hidden">
        <div className="w-16 md:w-24 h-[1px] bg-tertiary mx-auto mb-8 md:mb-12"></div>
        <Quote className="w-8 h-8 md:w-12 md:h-12 text-tertiary/20 mx-auto mb-6 md:mb-8" />
        <h2 className="font-headline text-2xl md:text-5xl text-primary italic leading-tight mb-8 md:mb-12">
          "We don't just sell clothes; we offer a canvas for the modern woman to paint her heritage in the colors of today."
        </h2>
        <div className="space-y-1 md:space-y-2">
          <p className="font-headline text-lg md:text-xl text-primary">Ananya Sharma</p>
          <p className="font-label text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-outline">Founder & Creative Director</p>
        </div>
        <div className="w-16 md:w-24 h-[1px] bg-tertiary mx-auto mt-8 md:mt-12"></div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-10 md:py-14 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-12">
          <div className="space-y-6 md:space-y-8 text-center md:text-left">
            <h2 className="font-headline text-3xl md:text-6xl text-primary leading-tight">
              Ready to find your<br />
              <span className="italic font-light">Signature Look?</span>
            </h2>
            <Link to="/collections">
              <button className="w-full md:w-auto bg-primary text-white px-8 py-4 md:px-12 md:py-5 uppercase tracking-widest font-bold hover:bg-tertiary transition-all duration-500 text-xs md:text-base">
                Discover Our Collections
              </button>
            </Link>
          </div>
          <div className="w-full md:w-1/3 aspect-[4/5] overflow-hidden rounded-sm shadow-2xl md:rotate-3 md:hover:rotate-0 transition-transform duration-700">
            <img
              src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&q=80&w=800"
              alt="Teaser"
              referrerPolicy="no-referrer"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
