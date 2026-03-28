import { motion } from 'motion/react';
import { ArrowRight, Play, Share2, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Lookbook() {
  const stories = [
    { 
      title: 'The Royal Wedding', 
      chapter: '01',
      category: 'Bridal',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsW9Ewf0A-IG-mqxRZTC4FUtNCiOYRtFxWUNGDz-jy6vi__olfaIPYKtkGQGf1kNL6tLlJOADCAsmCSQ4mmJXblsRXnA_N41l7ZphjiunAwgzwM08rd1Rf-gyz8apvkgAbvYX8imcjXRRVCYcfstMePe1FYQQIKxB3r-kBesFpnWWI0NRdmVphxW0s0Vc2jCsaScc4qkIWsZr5W7mML8sXmAGRFhDtAadY8qgyuU1uZ21qXSs4trlRhateC66FXGfOX20v2xX-COii',
      size: 'large'
    },
    { 
      title: 'Festive Soiree', 
      chapter: '02',
      category: 'Festive',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBipIWa8MawnwdauQ9wVSxZQ-vQ8KIt3GB_uDqupycYGT7fS_y8XuCzwky2mQn2uTMHkM7jGKoZsFt_qF7lnIXrAd_PyoRWHbRkokrETEheiEuxaTqIkSKVxGEV8T32UNf9DGZIHpmtlD10fhYHRCjSeA4PJWq-uNsZN7J2LyRDTQjZqxKKfvgzBWsrifbqXeziIYYyeA1YBJEqWz4IMensuev6MAT2WfJvGKomf-p0oNHWIODC7zCz8rfb_mJOcaL9uXRnQLVY43ss',
      size: 'small'
    },
    { 
      title: 'Heritage Silk', 
      chapter: '03',
      category: 'Couture',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJnD1vz3ir9EgbMgdmusanhGZYe-wjwFhidDPSXkIInNDcNawpAnkwKH2gX7kQQ9Pf_JHARQIBWM449fTnZWbGYqyLfk1Z8RWC7NSPQmXA6qsD2mDv1jNJcCEAJuEwrvwJ736ab3dTm4wj6OG8xMo6jUhkbsVMGqx2At3cIfEX4-37i4Yz9bqirbt9Ntr_KDXLPhcC6JXUY4rELhz-bsYZlFMr_697oTfVBWzdHj5Ch1guzf9hLsVIeHeZsgf63_b16eqYlNW6aFGo',
      size: 'small'
    },
    { 
      title: 'Modern Fusion', 
      chapter: '04',
      category: 'Contemporary',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDA3Q6iJKgy_dpsq5X2Yguczq0vg7bdGDFD0BQ5OWku2GbKncg5yGvppGxPC76q-tX5JJ8M6izY1m2kPfpzazxv_qZHdNg85OQ-iQyDMIrR1v7KiuWF5wu03Hnjy2cRm0b1xtUh1dCSRnSsjoCdogOBVUEoq80tj7CH6exxAecTtqjxuZL6RSMTfGjghWH6L2IrQNFEzwCioca_fjNVbgQiBcM278YhCjwxT5jKTEYQUhqt5-KpiJuVuIAVIhfau9Rd82fZjs3HPh4-',
      size: 'large'
    },
    { 
      title: 'Timeless Elegance', 
      chapter: '05',
      category: 'Bridal',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsW9Ewf0A-IG-mqxRZTC4FUtNCiOYRtFxWUNGDz-jy6vi__olfaIPYKtkGQGf1kNL6tLlJOADCAsmCSQ4mmJXblsRXnA_N41l7ZphjiunAwgzwM08rd1Rf-gyz8apvkgAbvYX8imcjXRRVCYcfstMePe1FYQQIKxB3r-kBesFpnWWI0NRdmVphxW0s0Vc2jCsaScc4qkIWsZr5W7mML8sXmAGRFhDtAadY8qgyuU1uZ21qXSs4trlRhateC66FXGfOX20v2xX-COii',
      size: 'small'
    },
    { 
      title: 'Golden Hour', 
      chapter: '06',
      category: 'Festive',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBipIWa8MawnwdauQ9wVSxZQ-vQ8KIt3GB_uDqupycYGT7fS_y8XuCzwky2mQn2uTMHkM7jGKoZsFt_qF7lnIXrAd_PyoRWHbRkokrETEheiEuxaTqIkSKVxGEV8T32UNf9DGZIHpmtlD10fhYHRCjSeA4PJWq-uNsZN7J2LyRDTQjZqxKKfvgzBWsrifbqXeziIYYyeA1YBJEqWz4IMensuev6MAT2WfJvGKomf-p0oNHWIODC7zCz8rfb_mJOcaL9uXRnQLVY43ss',
      size: 'small'
    },
    { 
      title: 'Midnight Bloom', 
      chapter: '07',
      category: 'Couture',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJnD1vz3ir9EgbMgdmusanhGZYe-wjwFhidDPSXkIInNDcNawpAnkwKH2gX7kQQ9Pf_JHARQIBWM449fTnZWbGYqyLfk1Z8RWC7NSPQmXA6qsD2mDv1jNJcCEAJuEwrvwJ736ab3dTm4wj6OG8xMo6jUhkbsVMGqx2At3cIfEX4-37i4Yz9bqirbt9Ntr_KDXLPhcC6JXUY4rELhz-bsYZlFMr_697oTfVBWzdHj5Ch1guzf9hLsVIeHeZsgf63_b16eqYlNW6aFGo',
      size: 'small'
    },
    { 
      title: 'Royal Heritage', 
      chapter: '08',
      category: 'Bridal',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiwSM3B1tkc8OqTJrYzK0aMbg0NGpEDokWJNJdSbuOO_uyLHiQvxWUYkjro6TDm__o55ZIUx5wLe8uJbsC4bF88zS7aKnwZi1Gq2ECYTKyqSVhW4ynB_EtKgU-komZ-67NTZVlSjBo8Hml1jqlu72H1NBj2uhLMD03n3L4quqfjPOK0C1xgfsD0-bx90DkMW11Geu16ogIUASStYvUl7FBaleAW_yh4htrrKdqKt-ee9JZlSJgHz3MPAgiDUhoTH0JehLCBVBw66iT',
      size: 'small'
    }
  ];

  return (
    <div className="bg-surface min-h-screen">
      {/* Featured Lookbook Hero */}
      <section className="relative h-[80vh] md:h-screen w-full overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiwSM3B1tkc8OqTJrYzK0aMbg0NGpEDokWJNJdSbuOO_uyLHiQvxWUYkjro6TDm__o55ZIUx5wLe8uJbsC4bF88zS7aKnwZi1Gq2ECYTKyqSVhW4ynB_EtKgU-komZ-67NTZVlSjBo8Hml1jqlu72H1NBj2uhLMD03n3L4quqfjPOK0C1xgfsD0-bx90DkMW11Geu16ogIUASStYvUl7FBaleAW_yh4htrrKdqKt-ee9JZlSJgHz3MPAgiDUhoTH0JehLCBVBw66iT"
            alt="Lookbook Hero"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
        </motion.div>

        <div className="relative z-10 h-full flex flex-col justify-end items-start px-6 md:px-24 pb-16 md:pb-24 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-2xl"
          >
            <span className="font-label text-tertiary uppercase tracking-[0.5em] text-[10px] md:text-xs mb-4 md:mb-6 font-bold block">Spring Summer 2024</span>
            <h1 className="font-headline text-5xl md:text-9xl text-white mb-6 md:mb-8 leading-tight">
              The Regal<br />
              <span className="italic font-light">Atelier</span>
            </h1>
            <div className="flex items-center gap-4 md:gap-8">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center cursor-pointer hover:bg-tertiary hover:border-tertiary transition-all group"
              >
                <Play className="text-white w-5 h-5 md:w-6 md:h-6 fill-white" />
              </motion.div>
              <p className="font-body text-white/70 text-xs md:text-sm max-w-[200px] md:max-w-xs uppercase tracking-widest leading-relaxed">
                A cinematic journey through the heart of Indian craftsmanship.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="bg-surface py-4 border-b border-outline-variant/20 sticky top-[60px] z-40 backdrop-blur-md bg-surface/80">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex flex-row justify-between items-center gap-4">
          <div className="flex gap-8 md:gap-10 overflow-x-auto flex-1 hide-scrollbar">
            {['All Stories', 'Bridal', 'Festive', 'Couture', 'Contemporary'].map((item, idx) => (
              <button
                key={item}
                className={`font-label text-[10px] uppercase tracking-[0.3em] font-bold whitespace-nowrap transition-all ${idx === 0 ? 'text-primary border-b border-primary pb-2' : 'text-outline hover:text-primary'}`}
              >
                {item}
              </button>
            ))}
          </div>
          <button 
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-primary font-bold border border-outline-variant p-2 md:px-6 md:py-2 hover:bg-primary hover:text-white transition-all flex-shrink-0"
            aria-label="Share Archive"
          >
            <Share2 className="w-4 h-4 md:w-3 md:h-3" />
            <span className="hidden md:inline">Share Archive</span>
          </button>
        </div>
      </div>

      {/* Stories Grid - Asymmetrical Layout */}
      <section className="pt-6 pb-12 md:pt-10 md:pb-20 px-6 md:px-12 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-y-8 md:gap-y-24 gap-x-4 md:gap-x-16">
          {stories.map((story, idx) => {
            const getGridClasses = (index: number) => {
              const patterns = [
                'md:col-span-4',
                'md:col-span-3 md:mt-20',
                'md:col-span-5 md:mt-10',
                'md:col-span-4 md:mt-20',
                'md:col-span-3',
                'md:col-span-5 md:mt-10',
                'md:col-span-4 md:mt-20',
                'md:col-span-3 md:mt-10',
              ];
              return patterns[index % patterns.length];
            };

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className={`group cursor-pointer ${getGridClasses(idx)}`}
              >
                <div className={`relative aspect-[3/4] overflow-hidden mb-4 md:mb-12 shadow-2xl transition-transform duration-700 ${idx % 2 === 0 ? '-rotate-2' : 'rotate-2'} md:group-hover:rotate-0 md:group-hover:scale-[1.02]`}>
                  <img
                    src={story.image}
                    alt={story.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-1000 md:group-hover:scale-110"
                  />
                  
                  {/* Visual Overlay */}
                  <div className="absolute inset-0 bg-primary/30 opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-4 md:p-12">
                    <button className="w-full py-3 md:py-6 bg-white text-primary text-[10px] md:text-[12px] uppercase tracking-[0.3em] font-bold hover:bg-tertiary hover:text-white transition-all transform translate-y-4 md:group-hover:translate-y-0 duration-500">
                      Explore
                    </button>
                  </div>

                  <div className="absolute top-4 left-4 md:top-12 md:left-12">
                    <span className="bg-white/90 backdrop-blur-md text-primary px-3 md:px-6 py-1.5 md:py-2 text-[8px] md:text-[11px] uppercase tracking-[0.4em] font-bold">
                      {story.category}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-start px-1 md:px-4">
                  <div className="overflow-hidden">
                    <span className="font-label text-tertiary text-[8px] md:text-[12px] uppercase tracking-[0.4em] font-bold block mb-1 md:mb-4 whitespace-nowrap overflow-hidden text-ellipsis">Chapter {story.chapter}</span>
                    <h3 className="font-headline text-lg md:text-5xl text-primary md:group-hover:text-tertiary transition-colors truncate">{story.title}</h3>
                  </div>
                  <div className="hidden sm:flex w-12 h-12 md:w-16 md:h-16 rounded-full border border-outline-variant items-center justify-center md:group-hover:bg-primary md:group-hover:border-primary transition-all duration-500">
                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-primary md:group-hover:text-white transition-colors" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Digital Atelier Section - Refined Mood Board */}
      <section className="py-16 md:py-24 bg-primary relative overflow-hidden">
        {/* Background Decorative Text */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-[0.03] pointer-events-none select-none overflow-hidden">
          <span className="font-headline text-[60vw] md:text-[40vw] text-white whitespace-nowrap">ATELIER</span>
        </div>

        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center relative z-10">
          <div className="space-y-6 md:space-y-10">
            <div className="space-y-3 md:space-y-4">
              <span className="font-label text-tertiary uppercase tracking-[0.5em] text-[10px] md:text-xs font-bold block">The Digital Atelier</span>
              <h2 className="font-headline text-4xl md:text-8xl text-white leading-[0.9]">
                Curate Your<br />
                <span className="italic font-light">Heritage</span>
              </h2>
            </div>
            <p className="font-body text-white/60 text-base md:text-lg leading-relaxed max-w-lg">
              Step into our virtual sanctuary. Mix and match textiles, silhouettes, and jewelry from our heritage archives to visualize your custom couture piece.
            </p>
            <div className="pt-4 md:pt-6">
              <button className="group flex items-center gap-4 md:gap-6 text-white">
                <span className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 flex items-center justify-center md:group-hover:bg-tertiary md:group-hover:border-tertiary transition-all duration-500">
                  <Plus className="w-5 h-5 md:w-6 md:h-6" />
                </span>
                <span className="font-label uppercase tracking-[0.3em] text-xs md:text-sm font-bold md:group-hover:text-tertiary transition-colors">Start Your Mood Board</span>
              </button>
            </div>
          </div>

          <div className="relative h-[400px] md:h-[800px] mt-8 md:mt-0">
            {/* Floating Mood Board Images */}
            <motion.div 
              initial={{ y: 20 }}
              whileInView={{ y: -20 }}
              transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
              className="absolute top-0 right-0 w-2/3 aspect-[3/4] z-20 shadow-2xl border-4 md:border-8 border-primary"
            >
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPrgbgW3g0aRhbQdENgYDUESeEwwH5AFMuX2i2RljzM1wzV47vt9bmiGG0blHdO-i7lblltIvqA-69SM4pksM4jzOnEtUJqhdllJin7WAuPuPhSsGdHf8WaaUhb0wUDRV1ZP3hymbrraH4h7mvUtWJJ87WffnOs2jPHS_A2q2c5yXaM9tQG2X8bwLdymqTS4XXd04CM39j1dg52i3mTDwbhVKJFVZ_ET0MpYSP6B2DuQVkSpS4Igj11rl0t3jL-lq8tGro4RjAJwW5" alt="Mood 1" referrerPolicy="no-referrer" loading="lazy" className="w-full h-full object-cover" />
            </motion.div>
            
            <motion.div 
              initial={{ x: -20 }}
              whileInView={{ x: 20 }}
              transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
              className="absolute bottom-10 left-0 w-1/2 aspect-square z-30 shadow-2xl border-4 md:border-8 border-primary"
            >
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSsqVRFlCAwSGI6w179JFo30dM60glkBgcIpp1nxMjLST8GY8TJodGFpCr_oM1q9mUhGK4PG5ep3lQc4RHCu-NBxxDhRb9axIPGcwaLRXJKlJA6uEAVJle0fpeZpo27VWng3QJH667XrmMqw1yhjzJnODxu73J20PaxlO9YKzU7rRiE1M7X9VahS_0U8Cksoz3n-u6LWwyU0rcI4rRFSUg9oA-RbYhPLeJZmVoGxlAZJ5MvDtgYOFHeuBA3Cxe8U1b1NKYhstFnVPC" alt="Mood 2" referrerPolicy="no-referrer" loading="lazy" className="w-full h-full object-cover" />
            </motion.div>
 
            <motion.div 
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
              className="absolute top-1/4 left-10 w-1/3 aspect-[4/5] z-10 opacity-50 grayscale"
            >
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9mBsl221JyuX5aphEHLmmPjmR99e-qMcKmEx1MO4bSBEkKzevo5gYvaamh9se_508mkdCUsHyqsPU8gGmWV_DJtfqX9fzXOQ_5v18dsP8MLtSiMWSBlrnHIf-Y7rQVBbQ55v-6WUa2u741yQLRVSKtq7dGY_ODcprz07tWHwHENq0IdYYtOzD5hsMd5wReMxozO1nT4Ffr4W6Fw2FiNU4kLX_0KsznIKIgI1O0vWhukhIxFV1OXuUIrmh6DKTCWm7Fi_VhemxR3bU" alt="Mood 3" referrerPolicy="no-referrer" loading="lazy" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Heritage Footer CTA */}
      <section className="py-12 md:py-20 bg-surface text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-headline text-3xl md:text-5xl text-primary mb-6 md:mb-8 italic">Every thread tells a story.</h2>
          <p className="font-body text-on-surface-variant text-base md:text-lg mb-8 md:mb-12">
            Explore our curated collections and find the piece that resonates with your soul.
          </p>
          <Link to="/collections">
            <button className="w-full md:w-auto bg-primary text-white px-12 py-4 md:py-5 uppercase tracking-widest font-bold hover:bg-tertiary transition-all duration-500 text-xs md:text-base">
              Shop The Collection
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
