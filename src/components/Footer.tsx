import { Link } from 'react-router-dom';
import { ArrowRight, Instagram, Facebook, Twitter, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { FormEvent } from 'react';

export default function Footer() {
  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    toast.success('Subscribed!', {
      description: 'You have been added to our exclusive collection preview list.'
    });
  };

  return (
    <footer className="bg-surface-container-low pt-12 pb-8 border-t border-outline-variant/30" aria-label="Site Footer">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="space-y-4">
          <Link 
            to="/" 
            className="font-headline text-xl font-bold text-tertiary italic focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tertiary"
            aria-label="Ethnic Fusion Home"
          >
            Ethnic Fusion
          </Link>
          <p className="font-body text-sm text-on-surface-variant leading-relaxed">
            Defining the next century of ethnic couture. Crafted with heritage, worn with pride.
          </p>
          <div className="flex gap-4 text-primary">
            <button aria-label="Follow us on Instagram" className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tertiary">
              <Instagram className="w-5 h-5 cursor-pointer hover:text-tertiary transition-colors" aria-hidden="true" />
            </button>
            <button aria-label="Follow us on Facebook" className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tertiary">
              <Facebook className="w-5 h-5 cursor-pointer hover:text-tertiary transition-colors" aria-hidden="true" />
            </button>
            <button aria-label="Follow us on Twitter" className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tertiary">
              <Twitter className="w-5 h-5 cursor-pointer hover:text-tertiary transition-colors" aria-hidden="true" />
            </button>
            <button aria-label="Contact us via Email" className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tertiary">
              <Mail className="w-5 h-5 cursor-pointer hover:text-tertiary transition-colors" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div>
          <h5 className="font-label text-xs font-bold uppercase tracking-widest text-primary mb-4">Discover</h5>
          <ul className="space-y-2">
            {['Our Story', 'Artisans', 'Sustainability', 'Lookbook'].map((item) => (
              <li key={item}>
                <Link 
                  to="#" 
                  className="font-body text-xs uppercase tracking-wider text-outline hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tertiary"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="font-label text-xs font-bold uppercase tracking-widest text-primary mb-4">Concierge</h5>
          <ul className="space-y-2">
            {['Shipping', 'Returns', 'Size Guide', 'Privacy'].map((item) => (
              <li key={item}>
                <Link 
                  to="#" 
                  className="font-body text-xs uppercase tracking-wider text-outline hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tertiary"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="font-label text-xs font-bold uppercase tracking-widest text-primary mb-4">Journal</h5>
          <div className="space-y-3">
            <p className="font-body text-xs text-on-surface-variant italic">Sign up for the latest collection previews.</p>
            <form onSubmit={handleSubscribe} className="relative border-b border-outline-variant pb-2">
              <label htmlFor="footer-email" className="sr-only">Email Address</label>
              <input
                id="footer-email"
                type="email"
                required
                placeholder="YOUR EMAIL"
                className="w-full bg-transparent border-none text-xs focus:ring-0 p-0 placeholder:text-outline/50 focus-visible:outline-none"
              />
              <button 
                type="submit"
                className="absolute right-0 top-1/2 -translate-y-1/2 text-primary hover:text-tertiary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tertiary"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center border-t border-outline-variant/10 pt-8">
        <p className="font-body text-[10px] uppercase tracking-widest text-outline">
          © 2024 Ethnic Fusion. Crafted with Heritage.
        </p>
      </div>
    </footer>
  );
}
