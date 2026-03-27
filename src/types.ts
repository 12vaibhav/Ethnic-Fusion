export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  colors: string[];
  fabric: string;
  description: string;
  isNew?: boolean;
}

export interface Order {
  id: string;
  date: string;
  status: 'Shipped' | 'Delivered' | 'Processing';
  total: number;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}
