import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search, Heart, ShoppingBag, Filter, X, ChevronDown } from 'lucide-react';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function Collections() {
  const [priceRange, setPriceRange] = useState(250000);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState('Recommended');
  const sortRef = useRef<HTMLDivElement>(null);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);

  const toggleFilter = (filterType: 'category' | 'color' | 'fabric', value: string) => {
    if (filterType === 'category') {
      setSelectedCategories(prev => prev.includes(value) ? prev.filter(c => c !== value) : [...prev, value]);
    } else if (filterType === 'color') {
      setSelectedColors(prev => prev.includes(value) ? prev.filter(c => c !== value) : [...prev, value]);
    } else if (filterType === 'fabric') {
      setSelectedFabrics(prev => prev.includes(value) ? prev.filter(f => f !== value) : [...prev, value]);
    }
  };

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesColor = selectedColors.length === 0 || product.colors.some(c => selectedColors.includes(c));
    const matchesFabric = selectedFabrics.length === 0 || selectedFabrics.includes(product.fabric);
    const matchesPrice = product.price <= priceRange;
    return matchesCategory && matchesColor && matchesFabric && matchesPrice;
  });

  const sortOptions = [
    'Recommended',
    'Newest First',
    'Price: High to Low',
    'Price: Low to High'
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const categories = [
    { name: 'Lehengas', count: 84 },
    { name: 'Sarees', count: 62 },
    { name: 'Anarkalis', count: 31 },
    { name: 'Indo-Western', count: 29 },
    { name: 'Fusion Dresses', count: 18 },
    { name: 'Kurtis', count: 15 },
  ];

  const colors = [
    '#004d51', '#435b9f', '#735c00', '#ba1a1a', '#ffffff', '#e9c349'
  ];

  const fabrics = ['Raw Silk', 'Chiffon', 'Organza', 'Velvet'];

  return (
    <div className="bg-surface min-h-screen pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-12 max-w-[1920px] mx-auto">
      {/* Header */}
      <header className="mb-8 md:mb-12">
        <nav className="flex text-[10px] md:text-xs uppercase tracking-widest text-on-surface-variant mb-4 gap-2">
          <Link to="/" className="hover:text-tertiary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-tertiary font-bold">All Products</span>
        </nav>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
          <div>
            <h1 className="font-headline text-3xl sm:text-5xl md:text-6xl text-primary tracking-tight -ml-1">Collections</h1>
            <p className="text-on-surface-variant mt-1 md:mt-2 font-medium text-xs md:text-base">
              Curated elegance for every occasion — <span className="text-tertiary">248 products</span>
            </p>
          </div>
          <div className="flex items-center justify-between md:justify-end gap-4">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border border-primary text-[10px] uppercase tracking-widest font-bold text-primary hover:bg-primary hover:text-white transition-all"
            >
              {isFilterOpen ? <X className="w-3 h-3" /> : <Filter className="w-3 h-3" />}
              {isFilterOpen ? 'Close' : 'Filter & Sort'}
            </button>
            <div className="flex items-center gap-2 md:gap-4">
              <label className="hidden sm:block text-[10px] md:text-xs uppercase tracking-widest text-outline font-bold">Sort By</label>
              <div className="relative" ref={sortRef}>
                <button 
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="flex items-center gap-2 md:gap-3 bg-transparent border-b border-outline-variant py-1 md:py-2 pr-2 md:pr-4 focus:outline-none focus:border-tertiary text-[10px] md:text-sm cursor-pointer font-medium transition-all"
                >
                  <span className="text-primary">{sortBy}</span>
                  <ChevronDown className={cn("w-3 h-3 md:w-4 md:h-4 text-outline transition-transform duration-300", isSortOpen && "rotate-180")} />
                </button>
                
                <AnimatePresence>
                  {isSortOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-full mt-2 w-48 md:w-56 bg-white border border-outline-variant shadow-2xl z-50 overflow-hidden"
                    >
                      <div className="py-2">
                        {sortOptions.map((option) => (
                          <button
                            key={option}
                            onClick={() => {
                              setSortBy(option);
                              setIsSortOpen(false);
                            }}
                            className={cn(
                              "w-full text-left px-6 py-3 text-[10px] md:text-xs uppercase tracking-widest transition-colors",
                              sortBy === option 
                                ? "bg-surface-container-low text-tertiary font-bold" 
                                : "text-on-surface-variant hover:bg-surface-container-lowest hover:text-primary"
                            )}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
        {/* Sidebar Filters */}
        <aside className={`${isFilterOpen ? 'block' : 'hidden'} lg:block lg:w-72 flex-shrink-0`}>
          <div className="lg:sticky lg:top-32 space-y-8 md:space-y-10 bg-surface-container-low lg:bg-transparent p-6 lg:p-0 rounded-sm lg:rounded-none shadow-sm lg:shadow-none">
            <div>
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <h2 className="text-base md:text-lg font-headline text-primary">Filters</h2>
                <button 
                  onClick={() => {
                    setSelectedCategories([]);
                    setSelectedColors([]);
                    setSelectedFabrics([]);
                    setPriceRange(250000);
                  }}
                  className="text-[10px] md:text-xs uppercase tracking-widest text-outline hover:text-tertiary transition-colors"
                >
                  Clear All
                </button>
              </div>

              {/* Categories */}
              <div className="space-y-3 md:space-y-4">
                <h3 className="text-[10px] md:text-xs uppercase tracking-widest text-on-surface-variant font-bold">Categories</h3>
                <ul className="grid grid-cols-2 lg:grid-cols-1 gap-y-2 gap-x-4 text-xs md:text-sm">
                  {categories.map((cat) => (
                    <li key={cat.name}>
                      <label className="w-full flex justify-between items-center text-on-surface-variant hover:text-tertiary transition-colors group cursor-pointer">
                        <div className="flex items-center gap-2">
                          <input 
                            type="checkbox" 
                            checked={selectedCategories.includes(cat.name)}
                            onChange={() => toggleFilter('category', cat.name)}
                            className="w-3 h-3 md:w-4 md:h-4 border-outline-variant text-primary focus:ring-tertiary rounded-sm"
                          />
                          <span className={selectedCategories.includes(cat.name) ? 'text-tertiary font-bold' : ''}>{cat.name}</span>
                        </div>
                        <span className="text-[10px] opacity-60">{cat.count}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-4 md:space-y-6">
              <h3 className="text-[10px] md:text-xs uppercase tracking-widest text-on-surface-variant font-bold">Price Range</h3>
              <div className="px-2">
                <input
                  type="range"
                  min="5000"
                  max="250000"
                  step="5000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(parseInt(e.target.value))}
                  className="w-full accent-tertiary h-1 bg-surface-container-high appearance-none rounded-full cursor-pointer"
                />
                <div className="flex justify-between mt-3 text-[10px] md:text-xs font-medium text-outline">
                  <span>₹5,000</span>
                  <span>₹{priceRange.toLocaleString()}+</span>
                </div>
              </div>
            </div>

            {/* Color Swatches */}
            <div className="space-y-3 md:space-y-4">
              <h3 className="text-[10px] md:text-xs uppercase tracking-widest text-on-surface-variant font-bold">Color</h3>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => toggleFilter('color', color)}
                    style={{ backgroundColor: color }}
                    className={cn(
                      "w-5 h-5 md:w-6 md:h-6 rounded-full ring-1 ring-offset-2 transition-all",
                      selectedColors.includes(color) ? "ring-tertiary ring-offset-2" : "ring-transparent hover:ring-tertiary"
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Fabric */}
            <div className="space-y-3 md:space-y-4">
              <h3 className="text-[10px] md:text-xs uppercase tracking-widest text-on-surface-variant font-bold">Fabric</h3>
              <div className="grid grid-cols-2 gap-2 text-[10px] md:text-xs">
                {fabrics.map((fabric) => (
                  <label key={fabric} className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={selectedFabrics.includes(fabric)}
                      onChange={() => toggleFilter('fabric', fabric)}
                      className="w-3 h-3 md:w-4 md:h-4 border-outline-variant text-primary focus:ring-tertiary rounded-sm" 
                    />
                    <span className={selectedFabrics.includes(fabric) ? 'text-tertiary font-bold' : 'group-hover:text-tertiary transition-colors'}>{fabric}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-grow">
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-y-8 md:gap-y-16 gap-x-4 md:gap-x-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 md:mt-24 flex flex-col items-center gap-6 md:gap-8">
            <div className="flex items-center gap-2 md:gap-4">
              <button className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center border border-outline-variant hover:border-tertiary text-outline hover:text-tertiary transition-all">
                <ChevronLeft className="w-3 h-3 md:w-4 md:h-4" />
              </button>
              <button className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center border border-tertiary text-tertiary font-bold text-xs md:text-sm">1</button>
              <button className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center border border-transparent hover:border-outline-variant text-outline transition-all text-xs md:text-sm">2</button>
              <button className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center border border-transparent hover:border-outline-variant text-outline transition-all text-xs md:text-sm">3</button>
              <span className="text-outline text-xs">...</span>
              <button className="hidden sm:flex w-8 h-8 md:w-10 md:h-10 items-center justify-center border border-transparent hover:border-outline-variant text-outline transition-all text-xs md:text-sm">12</button>
              <button className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center border border-outline-variant hover:border-tertiary text-outline hover:text-tertiary transition-all">
                <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
              </button>
            </div>
            <button className="w-full sm:w-auto px-8 md:px-12 py-3 md:py-4 bg-primary text-white text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 shadow-xl hover:bg-tertiary">
              Load More Masterpieces
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
