import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Phone, 
  Clock, 
  ChevronRight, 
  Navigation, 
  MessageCircle, 
  X, 
  Maximize2,
  Filter,
  ArrowRight,
  Plus
} from 'lucide-react';
import { cn } from '../lib/utils';

interface Store {
  id: string;
  name: string;
  type: 'Flagship' | 'Pop-up' | 'Partner Boutique';
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  whatsapp: string;
  timings: string;
  fullHours: string[];
  coordinates: { lat: number; lng: number };
  images: string[];
  distance?: string;
}

const STORES: Store[] = [
  {
    id: '1',
    name: 'The Heritage Flagship',
    type: 'Flagship',
    address: '12, MG Road, Near Brigade Junction',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560001',
    phone: '+91 80 4567 8901',
    whatsapp: '+91 98765 43210',
    timings: '10:30 AM - 8:30 PM',
    fullHours: [
      'Mon - Sat: 10:30 AM - 8:30 PM',
      'Sun: 11:00 AM - 7:00 PM'
    ],
    coordinates: { lat: 12.9716, lng: 77.5946 },
    images: [
      'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800'
    ],
    distance: '2.4 km'
  },
  {
    id: '2',
    name: 'Ethnic Fusion South Delhi',
    type: 'Flagship',
    address: 'D-15, South Extension Part II',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110049',
    phone: '+91 11 2345 6789',
    whatsapp: '+91 98765 43211',
    timings: '11:00 AM - 9:00 PM',
    fullHours: [
      'Mon - Sun: 11:00 AM - 9:00 PM'
    ],
    coordinates: { lat: 28.5684, lng: 77.2215 },
    images: [
      'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&q=80&w=800'
    ],
    distance: '5.1 km'
  },
  {
    id: '3',
    name: 'Kala Ghoda Pop-up',
    type: 'Pop-up',
    address: 'Ador House, 6, K Dubash Marg',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    phone: '+91 22 3456 7890',
    whatsapp: '+91 98765 43212',
    timings: '10:00 AM - 8:00 PM',
    fullHours: [
      'Mon - Sat: 10:00 AM - 8:00 PM',
      'Sun: Closed'
    ],
    coordinates: { lat: 18.9298, lng: 72.8333 },
    images: [
      'https://images.unsplash.com/photo-1534452203294-49c8913721b2?auto=format&fit=crop&q=80&w=800'
    ],
    distance: '1.2 km'
  },
  {
    id: '4',
    name: 'The Silk Route Boutique',
    type: 'Partner Boutique',
    address: 'Banjara Hills, Road No. 10',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500034',
    phone: '+91 40 5678 9012',
    whatsapp: '+91 98765 43213',
    timings: '10:30 AM - 8:00 PM',
    fullHours: [
      'Mon - Sat: 10:30 AM - 8:00 PM',
      'Sun: 11:00 AM - 6:00 PM'
    ],
    coordinates: { lat: 17.4156, lng: 78.4347 },
    images: [
      'https://images.unsplash.com/photo-1595991209266-5ff5a3a2f008?auto=format&fit=crop&q=80&w=800'
    ],
    distance: '8.7 km'
  }
];

export default function StoreLocator() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All Stores');
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filters = ['All Stores', 'Flagship', 'Pop-up', 'Partner Boutiques'];

  const filteredStores = useMemo(() => {
    return STORES.filter(store => {
      const matchesSearch = 
        store.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.pincode.includes(searchQuery) ||
        store.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilter = 
        activeFilter === 'All Stores' || 
        (activeFilter === 'Partner Boutiques' ? store.type === 'Partner Boutique' : store.type === activeFilter);

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter]);

  const handleStoreClick = (store: Store) => {
    setSelectedStore(store);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-surface min-h-screen pt-16 md:pt-12">
      {/* Page Header */}
      <header className="px-6 md:px-12 pt-8 pb-4 md:py-12 max-w-7xl mx-auto">
        <motion.div
          className="text-center flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-headline text-4xl md:text-7xl text-primary mb-4 uppercase tracking-tighter">Find Our Stores</h1>
          <p className="font-body text-on-surface-variant text-base md:text-xl max-w-2xl italic leading-relaxed">
            Experience Ethnic Fusion in person. Touch the fabrics, feel the craftsmanship, and find your perfect fit.
          </p>
        </motion.div>
      </header>

      {/* Search & Filter Bar */}
      <div className="bg-white border-y border-outline-variant/20 sticky top-[68px] z-40 backdrop-blur-md bg-white/80">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 md:py-6 flex flex-col lg:flex-row justify-between items-center gap-4 md:gap-6">
          <div className="relative w-full lg:w-96 flex items-center">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
            <input
              type="text"
              placeholder="City, Pincode..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 md:pl-12 pr-20 md:pr-24 py-2.5 md:py-3 bg-surface-container-low border-none rounded-sm text-xs md:text-sm focus:ring-1 focus:ring-tertiary transition-all"
            />
            <button className="absolute right-2 text-[8px] md:text-[9px] uppercase tracking-widest font-bold text-tertiary hover:text-primary transition-colors px-2 md:px-3 py-1 bg-white/50 backdrop-blur-sm border border-outline-variant/30">
              Near Me
            </button>
          </div>
          
          <div className="w-full overflow-x-auto hide-scrollbar">
            <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center items-center gap-2 md:gap-4 pb-1">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    "px-4 md:px-6 py-1.5 md:py-2 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold border transition-all flex-shrink-0",
                    activeFilter === filter 
                      ? "bg-primary text-white border-primary" 
                      : "bg-transparent text-outline border-outline-variant hover:border-primary hover:text-primary"
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="relative group hidden lg:block">
            <select 
              className="appearance-none bg-transparent pl-2 pr-8 py-2 text-[10px] uppercase tracking-[0.2em] font-bold text-primary border-none focus:ring-0 cursor-pointer"
              onChange={(e) => setSearchQuery(e.target.value === 'All Cities' ? '' : e.target.value)}
            >
              <option>All Cities</option>
              <option>Bengaluru</option>
              <option>New Delhi</option>
              <option>Mumbai</option>
              <option>Hyderabad</option>
            </select>
            <Filter className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-primary" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row h-auto lg:h-[800px]">
        {/* Interactive Map Placeholder */}
        <div className="w-full lg:w-3/5 h-[300px] md:h-[400px] lg:h-full bg-surface-container-low relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            {/* Abstract Map Grid Pattern */}
            <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          </div>
          
          {/* Map Pins */}
          {filteredStores.map((store) => (
            <motion.div
              key={store.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute cursor-pointer group"
              style={{ 
                left: `${(store.coordinates.lng % 1) * 100}%`, 
                top: `${(store.coordinates.lat % 1) * 100}%` 
              }}
              onClick={() => handleStoreClick(store)}
            >
              <div className="relative">
                <MapPin className="w-8 h-8 text-primary group-hover:text-tertiary transition-colors" />
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white px-3 py-1 shadow-xl rounded-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-outline-variant">
                  <span className="text-[10px] font-bold uppercase tracking-widest">{store.name}</span>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Map Controls Placeholder */}
          <div className="absolute bottom-8 right-8 flex flex-col gap-2">
            <button className="w-10 h-10 bg-white shadow-lg flex items-center justify-center text-primary hover:bg-surface transition-colors border border-outline-variant">
              <Plus className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 bg-white shadow-lg flex items-center justify-center text-primary hover:bg-surface transition-colors border border-outline-variant">
              <X className="w-5 h-5 rotate-45" />
            </button>
            <button className="w-10 h-10 bg-white shadow-lg flex items-center justify-center text-primary hover:bg-surface transition-colors border border-outline-variant">
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          <div className="absolute top-8 left-8 bg-white/80 backdrop-blur-md px-6 py-4 border border-outline-variant/30">
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary">Interactive Map View</p>
          </div>
        </div>

        {/* Stores List */}
        <div className="w-full lg:w-2/5 h-full overflow-y-auto bg-white border-l border-outline-variant/20 hide-scrollbar">
          {filteredStores.length > 0 ? (
            <div className="divide-y divide-outline-variant/10">
              {filteredStores.map((store) => (
                <motion.div
                  key={store.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-6 md:p-8 hover:bg-surface transition-colors cursor-pointer group"
                  onClick={() => handleStoreClick(store)}
                >
                  <div className="flex justify-between items-start mb-3 md:mb-4">
                    <span className="px-2 md:px-3 py-1 bg-surface-container-low text-tertiary text-[8px] md:text-[9px] uppercase tracking-[0.2em] font-bold">
                      {store.type}
                    </span>
                    {store.distance && (
                      <span className="text-[9px] md:text-[10px] font-medium text-outline">{store.distance} away</span>
                    )}
                  </div>
                  
                  <h3 className="font-headline text-xl md:text-2xl text-primary mb-3 md:mb-4 group-hover:text-tertiary transition-colors">
                    {store.name}
                  </h3>
                  
                  <div className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                    <div className="flex items-start gap-2 md:gap-3 text-on-surface-variant">
                      <MapPin className="w-3.5 h-3.5 mt-1 flex-shrink-0 text-tertiary" />
                      <p className="text-xs md:text-sm leading-relaxed">{store.address}, {store.city} - {store.pincode}</p>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3 text-on-surface-variant">
                      <Phone className="w-3.5 h-3.5 flex-shrink-0 text-tertiary" />
                      <p className="text-xs md:text-sm">{store.phone}</p>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3 text-on-surface-variant">
                      <Clock className="w-3.5 h-3.5 flex-shrink-0 text-tertiary" />
                      <p className="text-xs md:text-sm">{store.timings}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 md:gap-4">
                    <button className="flex-1 py-2.5 md:py-3 bg-primary text-white text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-tertiary transition-all flex items-center justify-center gap-2">
                      <Navigation className="w-3 h-3" /> Get Directions
                    </button>
                    <button className="flex-1 py-2.5 md:py-3 border border-outline-variant text-primary text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold hover:border-primary transition-all flex items-center justify-center gap-2">
                      <MessageCircle className="w-3 h-3" /> WhatsApp
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-surface-container-low flex items-center justify-center mb-8">
                <MapPin className="w-8 h-8 text-outline" />
              </div>
              <h3 className="font-headline text-3xl text-primary mb-4">No stores found</h3>
              <p className="font-body text-on-surface-variant mb-10 max-w-xs">
                We couldn't find any stores matching your search. Try a different city or pincode.
              </p>
              <Link to="/collections">
                <button className="bg-primary text-white px-10 py-4 uppercase tracking-widest font-bold hover:bg-tertiary transition-all">
                  Shop Online Instead
                </button>
              </Link>
            </div>
          )}
        </div>
      </main>

      {/* Store Detail Modal */}
      <AnimatePresence>
        {isModalOpen && selectedStore && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto md:overflow-hidden flex flex-col md:flex-row shadow-2xl"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-8 h-8 md:w-10 md:h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-primary hover:bg-white transition-all shadow-lg"
              >
                <X className="w-4 h-4 md:w-5 md:h-5" />
              </button>

              {/* Store Images */}
              <div className="w-full md:w-1/2 h-[250px] md:h-auto overflow-hidden">
                <img 
                  src={selectedStore.images[0]} 
                  alt={selectedStore.name} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Store Info */}
              <div className="w-full md:w-1/2 p-6 md:p-12 overflow-y-auto">
                <span className="px-2 md:px-3 py-1 bg-surface-container-low text-tertiary text-[8px] md:text-[9px] uppercase tracking-[0.2em] font-bold inline-block mb-4 md:mb-6">
                  {selectedStore.type}
                </span>
                <h2 className="font-headline text-3xl md:text-5xl text-primary mb-6 md:mb-8 leading-tight">
                  {selectedStore.name}
                </h2>

                <div className="space-y-6 md:space-y-8 mb-8 md:mb-12">
                  <div className="space-y-1 md:space-y-2">
                    <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold text-outline">Address</p>
                    <p className="font-body text-on-surface-variant text-base md:text-lg leading-relaxed">
                      {selectedStore.address}<br />
                      {selectedStore.city}, {selectedStore.state} - {selectedStore.pincode}
                    </p>
                  </div>

                  <div className="space-y-1 md:space-y-2">
                    <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold text-outline">Store Hours</p>
                    <div className="space-y-0.5 md:space-y-1">
                      {selectedStore.fullHours.map((hour, i) => (
                        <p key={i} className="font-body text-on-surface-variant text-sm md:text-base">{hour}</p>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
                    <div className="space-y-1 md:space-y-2">
                      <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold text-outline">Contact</p>
                      <p className="font-body text-on-surface-variant text-sm md:text-base">{selectedStore.phone}</p>
                    </div>
                    <div className="space-y-1 md:space-y-2">
                      <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold text-outline">WhatsApp</p>
                      <p className="font-body text-on-surface-variant text-sm md:text-base">{selectedStore.whatsapp}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 md:space-y-4">
                  <button className="w-full py-4 md:py-5 bg-primary text-white text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-tertiary transition-all flex items-center justify-center gap-2 md:gap-3">
                    <ArrowRight className="w-4 h-4" /> Plan Your Visit
                  </button>
                  <div className="flex gap-3 md:gap-4">
                    <button className="flex-1 py-3 md:py-4 border border-outline-variant text-primary text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold hover:border-primary transition-all">
                      Directions
                    </button>
                    <button className="flex-1 py-3 md:py-4 border border-outline-variant text-primary text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold hover:border-primary transition-all">
                      Call Store
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
