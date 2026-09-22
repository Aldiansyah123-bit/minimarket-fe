// ==================== AUTH TYPES ====================
export type UserRole = 'administrator' | 'owner' | 'manager' | 'cashier';

export interface User {
  id: string;
  username: string;
  password: string;
  name: string;
  role: UserRole;
  avatar?: string;
  active: boolean;
  permissions: string[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  shiftOpen: boolean;
  shiftStart: string | null;
  shiftModal: number;
}

// ==================== PRODUCT TYPES ====================
export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Brand {
  id: string;
  name: string;
  description?: string;
}

export interface Unit {
  id: string;
  name: string;
  shortName: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  barcode: string;
  categoryId: string;
  brandId: string;
  unitId: string;
  buyPrice: number;
  sellPrice: number;
  wholesalePrice: number;
  stock: number;
  minStock: number;
  status: 'active' | 'inactive';
  image?: string;
}

// ==================== TRANSACTION TYPES ====================
export interface CartItem {
  product: Product;
  quantity: number;
  discount: number;
  subtotal: number;
}

export interface SaleTransaction {
  id: string;
  invoiceNo: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  paymentMethod: string;
  paymentAmount: number;
  change: number;
  customerId: string;
  customerName: string;
  cashierId: string;
  cashierName: string;
  date: string;
  status: 'completed' | 'returned' | 'partial_return';
  shiftId: string;
}

export interface HeldOrder {
  id: string;
  customerName: string;
  items: CartItem[];
  total: number;
  heldAt: string;
  cashierName: string;
  note: string;
}

// ==================== PURCHASE TYPES ====================
export interface Supplier {
  id: string;
  name: string;
  phone: string;
  address: string;
  email?: string;
  active: boolean;
}

export interface PurchaseItem {
  product: Product;
  quantity: number;
  buyPrice: number;
  subtotal: number;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplierId: string;
  supplierName: string;
  items: PurchaseItem[];
  total: number;
  date: string;
  status: 'draft' | 'received' | 'cancelled';
  createdBy: string;
}

// ==================== INVENTORY TYPES ====================
export interface StockMutation {
  id: string;
  productId: string;
  productName: string;
  type: 'in' | 'out' | 'adjustment' | 'opname';
  quantity: number;
  previousStock: number;
  newStock: number;
  reference: string;
  reason: string;
  date: string;
  createdBy: string;
}

export interface StockAdjustment {
  id: string;
  productId: string;
  productName: string;
  adjustment: number;
  previousStock: number;
  newStock: number;
  reason: string;
  date: string;
  createdBy: string;
}

export interface StockOpname {
  id: string;
  date: string;
  items: { productId: string; productName: string; systemStock: number; physicalStock: number; difference: number }[];
  status: 'draft' | 'completed';
  createdBy: string;
}

// ==================== CUSTOMER TYPES ====================
export interface Customer {
  id: string;
  name: string;
  phone: string;
  memberCode?: string;
  points: number;
  totalSpent: number;
  totalTransactions: number;
  isMember: boolean;
  joinDate: string;
}

// ==================== EXPENSE TYPES ====================
export interface Expense {
  id: string;
  category: string;
  description: string;
  amount: number;
  paymentMethod: string;
  date: string;
  createdBy: string;
}

// ==================== SHIFT TYPES ====================
export interface CashierShift {
  id: string;
  cashierId: string;
  cashierName: string;
  terminal: string;
  openTime: string;
  closeTime: string | null;
  initialModal: number;
  cashSales: number;
  nonCashSales: number;
  expenses: number;
  expectedCash: number;
  actualCash: number | null;
  difference: number | null;
  status: 'open' | 'closed';
}

// ==================== RETURN TYPES ====================
export interface SalesReturn {
  id: string;
  returnNo: string;
  originalInvoiceId: string;
  originalInvoiceNo: string;
  items: { productId: string; productName: string; quantity: number; price: number; subtotal: number; reason: string; restock: boolean }[];
  totalRefund: number;
  date: string;
  processedBy: string;
}

// ==================== REPORT TYPES ====================
export interface SalesReportData {
  totalSales: number;
  totalTransactions: number;
  averageBasket: number;
  byDate: { date: string; total: number; count: number }[];
  byPayment: { method: string; total: number; count: number }[];
  byProduct: { name: string; qty: number; revenue: number }[];
}

// ==================== SETTINGS TYPES ====================
export interface StoreSettings {
  name: string;
  address: string;
  phone: string;
  email: string;
  logo?: string;
  taxRate: number;
  currency: string;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  active: boolean;
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'cash' | 'card' | 'qris' | 'ewallet' | 'transfer';
  icon: string;
  active: boolean;
}

export interface Printer {
  id: string;
  name: string;
  type: string;
  connection: string;
  active: boolean;
}

export interface ReceiptTemplate {
  header: string;
  footer: string;
  showLogo: boolean;
  showTax: boolean;
  showBarcode: boolean;
}

// ==================== NAVIGATION ====================
export type PageId =
  | 'dashboard'
  | 'pos-new' | 'pos-held' | 'pos-history'
  | 'products-all' | 'products-categories' | 'products-brands' | 'products-units' | 'products-pricing'
  | 'purchase-new' | 'purchase-history' | 'purchase-suppliers'
  | 'inventory-stock' | 'inventory-mutation' | 'inventory-adjustment' | 'inventory-opname'
  | 'customer-all' | 'customer-members'
  | 'transaction-sales' | 'transaction-return' | 'transaction-expenses'
  | 'reports-sales' | 'reports-product' | 'reports-purchase' | 'reports-stock' | 'reports-profit' | 'reports-cash'
  | 'settings-store' | 'settings-branch' | 'settings-users' | 'settings-roles' | 'settings-payment' | 'settings-printer' | 'settings-receipt';

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  roles: UserRole[];
  children?: { id: PageId; label: string; icon: string; roles: UserRole[] }[];
}
