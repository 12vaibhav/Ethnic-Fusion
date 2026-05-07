export interface Product {
  id: string;
  name: string;
  handle?: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  colors: string[];
  fabric: string;
  description: string;
  isNew?: boolean;
  variantId?: string;
  tags?: string[];
  collections?: string[];
  collectionHandles?: string[];
}

export interface Order {
  id: string;
  orderNumber: string;
  processedAt: string;
  totalPrice: {
    amount: string;
    currencyCode: string;
  };
  financialStatus: string;
  fulfillmentStatus: string;
  lineItems: {
    title: string;
    quantity: number;
    image: string;
  }[];
}

export interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  orders: Order[];
}

export interface CartItem extends Product {
  quantity: number;
}
