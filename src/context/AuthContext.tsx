import React, { createContext, useContext, useState, useEffect } from 'react';
import { Customer } from '../types';
import { getCustomerData } from '../lib/shopify';
import { toast } from 'sonner';

interface AuthContextType {
  customer: Customer | null;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(localStorage.getItem('shopify_customer_token'));

  useEffect(() => {
    const fetchCustomer = async () => {
      if (token) {
        try {
          const data = await getCustomerData(token);
          if (data) {
            // Transform data to match our interface
            const transformedCustomer: Customer = {
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              phone: data.phone,
              orders: data.orders.edges.map(({ node: order }: any) => ({
                id: order.id,
                orderNumber: order.orderNumber,
                processedAt: order.processedAt,
                totalPrice: order.totalPrice,
                financialStatus: order.financialStatus,
                fulfillmentStatus: order.fulfillmentStatus,
                lineItems: order.lineItems.edges.map(({ node: item }: any) => ({
                  title: item.title,
                  quantity: item.quantity,
                  image: item.variant?.image?.url || ''
                }))
              }))
            };
            setCustomer(transformedCustomer);
          } else {
            // Token likely expired
            logout();
          }
        } catch (error) {
          console.error('Error fetching customer data:', error);
          logout();
        }
      }
      setLoading(false);
    };

    fetchCustomer();
  }, [token]);

  const login = (newToken: string) => {
    localStorage.setItem('shopify_customer_token', newToken);
    setToken(newToken);
    toast.success('Welcome back!');
  };

  const logout = () => {
    localStorage.removeItem('shopify_customer_token');
    setToken(null);
    setCustomer(null);
    toast.info('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ 
      customer, 
      loading, 
      login, 
      logout, 
      isAuthenticated: !!token 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
