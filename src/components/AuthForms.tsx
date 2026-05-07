import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import { customerLogin, customerRegister } from '../lib/shopify';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

export function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await customerLogin(email, password);
      
      if (result.customerUserErrors && result.customerUserErrors.length > 0) {
        toast.error(result.customerUserErrors[0].message);
      } else if (result.customerAccessToken) {
        login(result.customerAccessToken.accessToken);
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="w-full max-w-md mx-auto space-y-8"
    >
      <div className="text-center">
        <h2 className="font-headline text-3xl text-primary mb-2">Welcome Back</h2>
        <p className="text-on-surface-variant text-sm italic">Enter your details to access your heirloom collection.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline group-focus-within:text-tertiary transition-colors" />
            <input
              type="email"
              required
              placeholder="EMAIL ADDRESS"
              className="w-full bg-surface-container-low border border-outline-variant/30 py-4 pl-12 pr-4 text-[10px] uppercase tracking-widest focus:outline-none focus:border-tertiary transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline group-focus-within:text-tertiary transition-colors" />
            <input
              type="password"
              required
              placeholder="PASSWORD"
              className="w-full bg-surface-container-low border border-outline-variant/30 py-4 pl-12 pr-4 text-[10px] uppercase tracking-widest focus:outline-none focus:border-tertiary transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-tertiary transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sign In'}
          {!loading && <ArrowRight className="w-4 h-4" />}
        </button>
      </form>

      <div className="text-center">
        <button
          onClick={onSwitchToRegister}
          className="text-[10px] uppercase tracking-widest text-outline hover:text-tertiary font-bold transition-colors"
        >
          New to Ethnic Fusion? <span className="underline ml-1">Create Account</span>
        </button>
      </div>
    </motion.div>
  );
}

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await customerRegister(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.password
      );

      if (result.customerUserErrors && result.customerUserErrors.length > 0) {
        toast.error(result.customerUserErrors[0].message);
      } else if (result.customer) {
        toast.success('Account created! Please sign in.');
        onSwitchToLogin();
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full max-w-md mx-auto space-y-8"
    >
      <div className="text-center">
        <h2 className="font-headline text-3xl text-primary mb-2">Join the Family</h2>
        <p className="text-on-surface-variant text-sm italic">Create an account to track orders and save your favorites.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline group-focus-within:text-tertiary transition-colors" />
            <input
              type="text"
              required
              placeholder="FIRST NAME"
              className="w-full bg-surface-container-low border border-outline-variant/30 py-4 pl-12 pr-4 text-[10px] uppercase tracking-widest focus:outline-none focus:border-tertiary transition-all"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
          </div>
          <div className="relative group">
            <input
              type="text"
              required
              placeholder="LAST NAME"
              className="w-full bg-surface-container-low border border-outline-variant/30 py-4 px-4 text-[10px] uppercase tracking-widest focus:outline-none focus:border-tertiary transition-all"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
          </div>
        </div>
        
        <div className="relative group">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline group-focus-within:text-tertiary transition-colors" />
          <input
            type="email"
            required
            placeholder="EMAIL ADDRESS"
            className="w-full bg-surface-container-low border border-outline-variant/30 py-4 pl-12 pr-4 text-[10px] uppercase tracking-widest focus:outline-none focus:border-tertiary transition-all"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        
        <div className="relative group">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline group-focus-within:text-tertiary transition-colors" />
          <input
            type="password"
            required
            placeholder="PASSWORD"
            className="w-full bg-surface-container-low border border-outline-variant/30 py-4 pl-12 pr-4 text-[10px] uppercase tracking-widest focus:outline-none focus:border-tertiary transition-all"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-tertiary transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create Account'}
          {!loading && <ArrowRight className="w-4 h-4" />}
        </button>
      </form>

      <div className="text-center">
        <button
          onClick={onSwitchToLogin}
          className="text-[10px] uppercase tracking-widest text-outline hover:text-tertiary font-bold transition-colors"
        >
          Already have an account? <span className="underline ml-1">Sign In</span>
        </button>
      </div>
    </motion.div>
  );
}
