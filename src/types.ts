export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  barcode: string;
  image?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  subtotal: number;
}

export interface Transaction {
  id: string;
  items: CartItem[];
  total: number;
  payment: number;
  change: number;
  paymentMethod: string;
  date: string;
  cashierName: string;
}

export type Page = 'pos' | 'dashboard' | 'history';
