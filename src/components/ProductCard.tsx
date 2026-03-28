import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { motion } from 'motion/react';
import { useShop } from '../context/ShopContext';
import { cn } from '../lib/utils';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  key?: React.Key;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const isWishlisted = isInWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group cursor-pointer relative"
    >
      <Link 
        to={`/product/${product.id}`}
        className="block w-full h-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tertiary"
        aria-label={`View details for ${product.name}`}
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-surface-container-low mb-4">
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-primary/10 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 pointer-events-none">
            {/* Quick Add overlay will be handled by the button below */}
          </div>
          {product.isNew && (
            <div className="absolute top-4 left-4">
              <span className="bg-tertiary text-white px-2 py-1 text-[10px] uppercase tracking-widest font-bold">
                New Season
              </span>
            </div>
          )}
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-on-surface uppercase tracking-wide">{product.name}</h3>
          <p className="text-xs text-on-surface-variant font-medium">{product.category} • {product.fabric}</p>
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-primary font-headline text-lg">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-outline line-through text-xs">
                <span className="sr-only">Original price: </span>
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Buttons outside the main Link but still within the card context */}
      <div className="absolute inset-x-0 bottom-[104px] px-4 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCart(product);
            toast.success('Added to Bag', {
              description: `${product.name} has been added to your bag.`
            });
          }}
          aria-label={`Quick add ${product.name} to cart`}
          className="w-full h-12 bg-white text-primary text-[10px] uppercase tracking-widest font-bold mb-2 translate-y-4 md:group-hover:translate-y-0 transition-transform duration-300 hover:bg-tertiary hover:text-white pointer-events-auto flex items-center justify-center gap-2 shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tertiary"
        >
          <ShoppingBag className="w-4 h-4" aria-hidden="true" /> Quick Add
        </button>
      </div>

      <button 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleWishlist(product);
          if (isWishlisted) {
            toast.info('Removed from Wishlist', {
              description: `${product.name} has been removed.`
            });
          } else {
            toast.success('Added to Wishlist', {
              description: `${product.name} has been saved.`
            });
          }
        }}
        aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        className={cn(
          "absolute top-4 right-4 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center transition-all shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tertiary",
          isWishlisted ? "text-tertiary" : "text-primary hover:text-tertiary"
        )}
      >
        <Heart className={cn("w-5 h-5", isWishlisted && "fill-tertiary")} aria-hidden="true" />
      </button>
    </motion.div>
  );
}
