import { useState } from 'react';
import { User, Package, Heart, CreditCard, Settings, LogOut, ChevronRight, ExternalLink, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import { LoginForm, RegisterForm } from '../components/AuthForms';

export default function Account() {
  const { customer, loading, logout, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [authView, setAuthView] = useState<'login' | 'register'>('login');
  const [trackingNumber, setTrackingNumber] = useState('');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <Loader2 className="w-8 h-8 animate-spin text-tertiary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="bg-surface min-h-screen pt-20 md:pt-32 pb-20 px-6">
        <AnimatePresence mode="wait">
          {authView === 'login' ? (
            <LoginForm key="login" onSwitchToRegister={() => setAuthView('register')} />
          ) : (
            <RegisterForm key="register" onSwitchToLogin={() => setAuthView('login')} />
          )}
        </AnimatePresence>
      </div>
    );
  }

  const sidebarLinks = [
    { name: 'Dashboard', icon: User },
    { name: 'My Profile', icon: User },
    { name: 'My Orders', icon: Package },
    { name: 'Wishlist', icon: Heart },
    { name: 'Payments', icon: CreditCard },
    { name: 'Settings', icon: Settings },
  ];

  const stats = [
    { label: 'Total Orders', value: customer?.orders.length || 0, sub: 'Lifetime history' },
    { label: 'Member Status', value: 'Silver', sub: 'Member since 2024' },
    { label: 'Saved Designs', value: '08', sub: 'In your wishlist' },
  ];

  const handleTrackOrder = () => {
    if (!trackingNumber) {
      toast.error('Please enter a tracking number');
      return;
    }
    toast.loading(`Tracking order ${trackingNumber}...`);
    setTimeout(() => {
      toast.dismiss();
      toast.success(`Order ${trackingNumber} is being processed`);
    }, 2000);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
            <header>
              <h1 className="font-headline text-4xl text-primary mb-2">Namaste, {customer?.firstName}</h1>
              <p className="text-on-surface-variant text-sm italic font-medium">Your curated heritage collection awaits.</p>
            </header>

            <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 -mx-6 px-6 md:mx-0 hide-scrollbar scroll-pl-6">
              {stats.map((stat) => (
                <div key={stat.label} className="flex-shrink-0 w-[80vw] md:w-auto bg-surface-container-low p-6 md:p-8 border border-outline-variant/30 rounded-sm group hover:border-tertiary transition-all snap-start">
                  <p className="text-[10px] uppercase tracking-widest text-outline font-bold mb-2">{stat.label}</p>
                  <p className="font-headline text-3xl md:text-4xl text-primary group-hover:text-tertiary transition-colors">{stat.value}</p>
                  <p className="text-[10px] text-on-surface-variant mt-2 italic">{stat.sub}</p>
                </div>
              ))}
            </div>

            <section className="space-y-8">
              <div className="flex justify-between items-end">
                <h3 className="font-headline text-2xl text-primary">Recent Orders</h3>
                <button onClick={() => setActiveTab('My Orders')} className="text-xs uppercase tracking-widest text-tertiary font-bold hover:underline">View All Orders</button>
              </div>

              <div className="space-y-4">
                {customer?.orders.length === 0 ? (
                  <div className="bg-surface-container-low p-10 text-center border border-dashed border-outline-variant/50">
                    <p className="text-on-surface-variant italic">No orders found yet. Start your collection today.</p>
                  </div>
                ) : (
                  customer?.orders.slice(0, 3).map((order) => (
                    <div key={order.id} className="bg-white p-4 md:p-6 border border-outline-variant/30 flex flex-row items-center gap-4 md:gap-8 group hover:shadow-lg transition-all">
                      <div className="w-16 h-20 md:w-24 md:h-32 bg-surface-container-low flex-shrink-0 overflow-hidden">
                        <img src={order.lineItems[0]?.image} alt={order.orderNumber} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6">
                        <div>
                          <p className="text-[8px] md:text-[10px] uppercase tracking-widest text-outline font-bold mb-0.5 md:mb-1">Order #</p>
                          <p className="text-[10px] md:text-sm font-bold text-primary truncate">{order.orderNumber}</p>
                        </div>
                        <div className="hidden md:block">
                          <p className="text-[10px] uppercase tracking-widest text-outline font-bold mb-1">Date</p>
                          <p className="text-sm font-medium text-on-surface-variant">{new Date(order.processedAt).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-[8px] md:text-[10px] uppercase tracking-widest text-outline font-bold mb-0.5 md:mb-1">Status</p>
                          <span className="text-[8px] md:text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full bg-tertiary/10 text-tertiary">
                            {order.fulfillmentStatus}
                          </span>
                        </div>
                        <div>
                          <p className="text-[8px] md:text-[10px] uppercase tracking-widest text-outline font-bold mb-0.5 md:mb-1">Total</p>
                          <p className="text-[10px] md:text-sm font-bold text-primary">₹{parseFloat(order.totalPrice.amount).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          </motion.div>
        );
      case 'My Profile':
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-surface-container-low p-8 border border-outline-variant/30 rounded-sm">
            <h3 className="font-headline text-2xl text-primary mb-6">Profile Settings</h3>
            <div className="space-y-6 max-w-md">
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-outline font-bold">Full Name</p>
                <p className="text-lg text-primary">{customer?.firstName} {customer?.lastName}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-outline font-bold">Email Address</p>
                <p className="text-lg text-primary">{customer?.email}</p>
              </div>
              <div className="pt-4">
                <button disabled className="bg-surface-container-high text-outline px-6 py-3 text-[10px] uppercase tracking-widest font-bold cursor-not-allowed">Edit Profile (Coming Soon)</button>
              </div>
            </div>
          </motion.div>
        );
      case 'My Orders':
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <h3 className="font-headline text-2xl text-primary">Order History</h3>
            <div className="space-y-4">
              {customer?.orders.map((order) => (
                <div key={order.id} className="bg-white p-4 border border-outline-variant/30 hover:border-tertiary transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-xs font-bold text-primary">Order {order.orderNumber}</p>
                      <p className="text-[10px] text-outline">{new Date(order.processedAt).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-tertiary">₹{parseFloat(order.totalPrice.amount).toLocaleString()}</p>
                      <p className="text-[10px] uppercase font-bold tracking-widest text-outline-variant">{order.fulfillmentStatus}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {order.lineItems.map((item, idx) => (
                      <div key={idx} className="w-12 h-16 flex-shrink-0 bg-surface-container-low">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      default:
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h3 className="font-headline text-2xl text-primary mb-4">{activeTab}</h3>
            <p className="text-on-surface-variant italic">This section will be available soon as part of your premium experience.</p>
          </motion.div>
        );
    }
  };

  return (
    <div className="bg-surface min-h-screen pt-20 md:pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8 md:gap-16">
        <aside className="lg:w-64 flex-shrink-0">
          <div className="bg-surface-container-low p-6 md:p-8 border border-outline-variant/30 rounded-sm sticky top-32">
            <div className="flex flex-row lg:flex-col items-center text-left lg:text-center mb-6 lg:mb-10 gap-4 lg:gap-0 relative">
              <div className="w-16 h-16 lg:w-24 lg:h-24 rounded-full bg-tertiary/10 flex items-center justify-center lg:mb-4 border-2 border-tertiary flex-shrink-0">
                <span className="text-xl lg:text-3xl font-headline text-tertiary">
                  {customer?.firstName?.[0]}{customer?.lastName?.[0]}
                </span>
              </div>
              <div className="overflow-hidden">
                <h2 className="font-headline text-lg lg:text-xl text-primary truncate">{customer?.firstName} {customer?.lastName}</h2>
                <p className="text-[9px] lg:text-[10px] uppercase tracking-widest text-outline font-bold mt-1 truncate">{customer?.email}</p>
              </div>
              <button 
                onClick={logout} 
                className="lg:hidden ml-auto p-2 text-ba1a1a hover:bg-ba1a1a/10 transition-colors rounded-full"
                aria-label="Sign Out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 lg:space-y-2 -mx-6 pl-4 pr-6 lg:mx-0 lg:px-0 hide-scrollbar scroll-pl-4 snap-x snap-mandatory">
              {sidebarLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => setActiveTab(link.name)}
                  className={`flex-shrink-0 snap-start flex items-center gap-3 lg:gap-4 px-4 py-2.5 lg:py-3 text-[10px] lg:text-xs uppercase tracking-widest font-bold transition-all rounded-sm ${activeTab === link.name ? 'bg-primary text-white border-primary' : 'text-outline hover:bg-surface-container-high hover:text-primary border border-transparent'}`}
                >
                  <link.icon className="w-3.5 h-3.5" />
                  {link.name}
                </button>
              ))}
              <button onClick={logout} className="hidden lg:flex items-center gap-3 lg:gap-4 px-4 py-2.5 lg:py-3 text-[10px] lg:text-xs uppercase tracking-widest font-bold text-ba1a1a hover:bg-ba1a1a/10 transition-all rounded-sm lg:mt-8 border border-transparent">
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </nav>
          </div>
        </aside>

        <main className="flex-grow">
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
          
          {activeTab === 'Dashboard' && (
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <div className="bg-primary p-10 text-white space-y-6 rounded-sm relative overflow-hidden group">
                <div className="relative z-10">
                  <h4 className="font-headline text-2xl mb-2">Need Styling Help?</h4>
                  <p className="text-white/70 text-sm mb-6">Book a complimentary video consultation with our master stylists.</p>
                  <button className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-tertiary hover:text-white transition-colors">
                    Schedule Now <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="bg-surface-container-high p-6 md:p-10 text-primary space-y-6 rounded-sm border border-outline-variant/30 relative">
                <h4 className="font-headline text-2xl mb-2">Track Your Shipment</h4>
                <p className="text-on-surface-variant text-sm mb-6">Enter your tracking number to see the real-time status of your heirloom.</p>
                <div className="flex flex-col sm:flex-row gap-2 w-full">
                  <input type="text" value={trackingNumber} onChange={(e) => setTrackingNumber(e.target.value)} placeholder="TRACKING #" className="bg-white border-none text-[10px] md:text-xs uppercase tracking-widest p-4 flex-grow focus:ring-1 focus:ring-tertiary w-full" />
                  <button onClick={handleTrackOrder} className="bg-tertiary text-white px-6 py-4 uppercase tracking-widest font-bold text-[10px] md:text-xs hover:bg-primary transition-all w-full sm:w-auto">Track</button>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
