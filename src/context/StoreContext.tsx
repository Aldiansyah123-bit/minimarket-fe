import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types
export interface User {
  id: string;
  username: string;
  password: string;
  name: string;
  role: 'administrator' | 'owner' | 'manager' | 'cashier';
  active: boolean;
  permissions: string[];
}

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
}

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

export interface Supplier {
  id: string;
  name: string;
  phone: string;
  address: string;
  email?: string;
  active: boolean;
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: string;
  icon: string;
  active: boolean;
}

export interface SaleTransaction {
  id: string;
  invoiceNo: string;
  items: Array<{ product: Product; quantity: number; subtotal: number }>;
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
  status: string;
  shiftId: string;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplierId: string;
  supplierName: string;
  items: Array<{ product: Product; quantity: number; buyPrice: number; subtotal: number }>;
  total: number;
  date: string;
  status: string;
  createdBy: string;
}

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

export interface Expense {
  id: string;
  category: string;
  description: string;
  amount: number;
  paymentMethod: string;
  date: string;
  createdBy: string;
}

export interface StoreSettings {
  name: string;
  address: string;
  phone: string;
  email: string;
  taxRate: number;
  currency: string;
}

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  roles: string[];
  children?: MenuItem[];
}

interface StoreContextType {
  currentUser: User | null;
  loginError: string;
  currentPage: string;
  sidebarCollapsed: boolean;
  expandedMenus: string[];
  users: User[];
  categories: Category[];
  brands: Brand[];
  units: Unit[];
  products: Product[];
  customers: Customer[];
  suppliers: Supplier[];
  paymentMethods: PaymentMethod[];
  salesTransactions: SaleTransaction[];
  purchaseOrders: PurchaseOrder[];
  stockMutations: StockMutation[];
  expenses: Expense[];
  storeSettings: StoreSettings;
  menuConfig: MenuItem[];
  login: (username: string, password: string) => void;
  logout: () => void;
  setCurrentPage: (page: string) => void;
  toggleSidebar: () => void;
  toggleMenu: (id: string) => void;
  addSaleTransaction: (transaction: SaleTransaction) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, data: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addPurchaseOrder: (po: PurchaseOrder) => void;
  addSupplier: (supplier: Supplier) => void;
  addCustomer: (customer: Customer) => void;
  addExpense: (expense: Expense) => void;
  adjustStock: (productId: string, adjustment: number, reason: string) => void;
  saveOpname: (items: Array<{ productId: string; physicalStock: number; difference: number }>) => void;
  updateStoreSettings: (settings: Partial<StoreSettings>) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Initial data
const initialUsers: User[] = [
  { id: 'u1', username: 'admin', password: 'admin123', name: 'Administrator', role: 'administrator', active: true, permissions: ['*'] },
  { id: 'u2', username: 'owner', password: 'owner123', name: 'Budi Santoso', role: 'owner', active: true, permissions: ['*'] },
  { id: 'u3', username: 'manager', password: 'manager123', name: 'Siti Rahayu', role: 'manager', active: true, permissions: ['dashboard', 'pos', 'products', 'purchase', 'inventory', 'customer', 'transaction', 'reports'] },
  { id: 'u4', username: 'kasir1', password: 'kasir123', name: 'Aldi Pratama', role: 'cashier', active: true, permissions: ['pos', 'pos-new', 'pos-held', 'pos-history'] },
];

const initialCategories: Category[] = [
  { id: 'cat1', name: 'Makanan', icon: 'fa-bowl-food', color: '#fed7aa' },
  { id: 'cat2', name: 'Minuman', icon: 'fa-mug-hot', color: '#bfdbfe' },
  { id: 'cat3', name: 'Snack', icon: 'fa-cookie-bite', color: '#fef08a' },
  { id: 'cat4', name: 'Sembako', icon: 'fa-wheat-awn', color: '#fde68a' },
  { id: 'cat5', name: 'Kebutuhan Rumah', icon: 'fa-house', color: '#bbf7d0' },
  { id: 'cat6', name: 'Kebutuhan Bayi', icon: 'fa-baby', color: '#fbcfe8' },
  { id: 'cat7', name: 'Perawatan Tubuh', icon: 'fa-soap', color: '#e9d5ff' },
  { id: 'cat8', name: 'Rokok', icon: 'fa-smoking', color: '#d1d5db' },
  { id: 'cat9', name: 'Elektronik', icon: 'fa-plug', color: '#a5f3fc' },
  { id: 'cat10', name: 'Lainnya', icon: 'fa-box', color: '#cbd5e1' },
];

const initialBrands: Brand[] = [
  { id: 'b1', name: 'Indomie' },
  { id: 'b2', name: 'Aqua' },
  { id: 'b3', name: 'Teh Pucuk' },
  { id: 'b4', name: 'Coca Cola' },
  { id: 'b5', name: 'Unilever' },
  { id: 'b6', name: 'P&G' },
  { id: 'b7', name: 'Nestle' },
  { id: 'b8', name: 'Sari Roti' },
  { id: 'b9', name: 'Kapal Api' },
  { id: 'b10', name: 'ABC' },
];

const initialUnits: Unit[] = [
  { id: 'u1', name: 'Pieces', shortName: 'PCS' },
  { id: 'u2', name: 'Box', shortName: 'BOX' },
  { id: 'u3', name: 'Pack', shortName: 'PACK' },
  { id: 'u4', name: 'Kilogram', shortName: 'KG' },
  { id: 'u5', name: 'Liter', shortName: 'L' },
];

const initialProducts: Product[] = [
  { id: 'p1', name: 'Indomie Goreng', sku: 'IND-GOR', barcode: '8991234567001', categoryId: 'cat1', brandId: 'b1', unitId: 'u1', buyPrice: 2500, sellPrice: 3500, wholesalePrice: 3000, stock: 150, minStock: 20, status: 'active' },
  { id: 'p2', name: 'Indomie Kuah Soto', sku: 'IND-SOT', barcode: '8991234567002', categoryId: 'cat1', brandId: 'b1', unitId: 'u1', buyPrice: 2500, sellPrice: 3500, wholesalePrice: 3000, stock: 120, minStock: 20, status: 'active' },
  { id: 'p3', name: 'Aqua 600ml', sku: 'AQU-600', barcode: '8991234567009', categoryId: 'cat2', brandId: 'b2', unitId: 'u1', buyPrice: 2000, sellPrice: 4000, wholesalePrice: 3500, stock: 200, minStock: 30, status: 'active' },
  { id: 'p4', name: 'Teh Pucuk 350ml', sku: 'TEH-350', barcode: '8991234567010', categoryId: 'cat2', brandId: 'b3', unitId: 'u1', buyPrice: 3000, sellPrice: 5000, wholesalePrice: 4500, stock: 8, minStock: 20, status: 'active' },
  { id: 'p5', name: 'Coca Cola 390ml', sku: 'COC-390', barcode: '8991234567011', categoryId: 'cat2', brandId: 'b4', unitId: 'u1', buyPrice: 5000, sellPrice: 7500, wholesalePrice: 6500, stock: 80, minStock: 15, status: 'active' },
  { id: 'p6', name: 'Sprite 390ml', sku: 'SPR-390', barcode: '8991234567012', categoryId: 'cat2', brandId: 'b4', unitId: 'u1', buyPrice: 5000, sellPrice: 7500, wholesalePrice: 6500, stock: 75, minStock: 15, status: 'active' },
  { id: 'p7', name: 'Ultra Milk 250ml', sku: 'ULM-250', barcode: '8991234567014', categoryId: 'cat2', brandId: 'b7', unitId: 'u1', buyPrice: 3500, sellPrice: 5500, wholesalePrice: 5000, stock: 100, minStock: 20, status: 'active' },
  { id: 'p8', name: 'Chitato Sapi Panggang', sku: 'CHT-SPG', barcode: '8991234567017', categoryId: 'cat3', brandId: 'b7', unitId: 'u1', buyPrice: 7500, sellPrice: 10500, wholesalePrice: 9500, stock: 70, minStock: 10, status: 'active' },
  { id: 'p9', name: 'Oreo Original', sku: 'ORE-ORG', barcode: '8991234567019', categoryId: 'cat3', brandId: 'b7', unitId: 'u1', buyPrice: 6000, sellPrice: 8500, wholesalePrice: 7500, stock: 65, minStock: 10, status: 'active' },
  { id: 'p10', name: 'Silverqueen Cashew', sku: 'SLV-CSH', barcode: '8991234567022', categoryId: 'cat3', brandId: 'b7', unitId: 'u1', buyPrice: 13000, sellPrice: 17000, wholesalePrice: 15000, stock: 40, minStock: 8, status: 'active' },
  { id: 'p11', name: 'Beras Premium 5kg', sku: 'BRS-PRM', barcode: '8991234567004', categoryId: 'cat4', brandId: 'b10', unitId: 'u1', buyPrice: 60000, sellPrice: 75000, wholesalePrice: 70000, stock: 30, minStock: 5, status: 'active' },
  { id: 'p12', name: 'Minyak Goreng 2L', sku: 'MYK-2LT', barcode: '8991234567005', categoryId: 'cat4', brandId: 'b10', unitId: 'u1', buyPrice: 28000, sellPrice: 35000, wholesalePrice: 32000, stock: 45, minStock: 10, status: 'active' },
  { id: 'p13', name: 'Gula Pasir 1kg', sku: 'GUL-1KG', barcode: '8991234567006', categoryId: 'cat4', brandId: 'b10', unitId: 'u4', buyPrice: 12000, sellPrice: 15000, wholesalePrice: 14000, stock: 5, minStock: 10, status: 'active' },
  { id: 'p14', name: 'Kopi Kapal Api', sku: 'KPA-SCH', barcode: '8991234567007', categoryId: 'cat1', brandId: 'b9', unitId: 'u1', buyPrice: 1500, sellPrice: 2500, wholesalePrice: 2000, stock: 200, minStock: 30, status: 'active' },
  { id: 'p15', name: 'Roti Tawar Sari Roti', sku: 'RTI-TWR', barcode: '8991234567008', categoryId: 'cat1', brandId: 'b8', unitId: 'u1', buyPrice: 13000, sellPrice: 18000, wholesalePrice: 16000, stock: 25, minStock: 5, status: 'active' },
  { id: 'p16', name: 'Sabun Lifebuoy', sku: 'SBN-LFB', barcode: '8991234567025', categoryId: 'cat7', brandId: 'b5', unitId: 'u1', buyPrice: 3000, sellPrice: 4500, wholesalePrice: 4000, stock: 100, minStock: 20, status: 'active' },
  { id: 'p17', name: 'Shampoo Pantene', sku: 'SHP-PNT', barcode: '8991234567026', categoryId: 'cat7', brandId: 'b6', unitId: 'u1', buyPrice: 18000, sellPrice: 25000, wholesalePrice: 22000, stock: 30, minStock: 5, status: 'active' },
  { id: 'p18', name: 'Pasta Gigi Pepsodent', sku: 'PGI-PPD', barcode: '8991234567027', categoryId: 'cat7', brandId: 'b5', unitId: 'u1', buyPrice: 8000, sellPrice: 12000, wholesalePrice: 10000, stock: 50, minStock: 10, status: 'active' },
  { id: 'p19', name: 'Detergen Rinso 800g', sku: 'DTR-RNS', barcode: '8991234567028', categoryId: 'cat5', brandId: 'b5', unitId: 'u1', buyPrice: 16000, sellPrice: 22000, wholesalePrice: 20000, stock: 40, minStock: 8, status: 'active' },
  { id: 'p20', name: 'Tisu Paseo 250s', sku: 'TSU-PSO', barcode: '8991234567029', categoryId: 'cat5', brandId: 'b7', unitId: 'u1', buyPrice: 8000, sellPrice: 11000, wholesalePrice: 10000, stock: 60, minStock: 10, status: 'active' },
];

const initialCustomers: Customer[] = [
  { id: 'c0', name: 'Walk-in Customer', phone: '-', points: 0, totalSpent: 0, totalTransactions: 0, isMember: false, joinDate: '' },
  { id: 'c1', name: 'Ahmad Hidayat', phone: '081234567890', memberCode: 'MBR-001', points: 150, totalSpent: 1500000, totalTransactions: 25, isMember: true, joinDate: '2025-01-15' },
  { id: 'c2', name: 'Rina Wulandari', phone: '082345678901', memberCode: 'MBR-002', points: 320, totalSpent: 3200000, totalTransactions: 42, isMember: true, joinDate: '2025-02-20' },
];

const initialSuppliers: Supplier[] = [
  { id: 's1', name: 'PT Indofood Sukses Makmur', phone: '021-5795-8822', address: 'Jakarta Selatan', active: true },
  { id: 's2', name: 'PT Danone Aqua Indonesia', phone: '021-5211-711', address: 'Jakarta Pusat', active: true },
  { id: 's3', name: 'PT Coca Cola Indonesia', phone: '021-5366-3636', address: 'Jakarta Barat', active: true },
  { id: 's4', name: 'PT Unilever Indonesia', phone: '021-5262-112', address: 'Jakarta Selatan', active: true },
  { id: 's5', name: 'PT Nestle Indonesia', phone: '021-5367-888', address: 'Jakarta Barat', active: true },
];

const initialPaymentMethods: PaymentMethod[] = [
  { id: 'pm1', name: 'Tunai', type: 'cash', icon: 'fa-money-bill-wave', active: true },
  { id: 'pm2', name: 'QRIS', type: 'qris', icon: 'fa-qrcode', active: true },
  { id: 'pm3', name: 'Debit', type: 'card', icon: 'fa-credit-card', active: true },
  { id: 'pm4', name: 'E-Wallet', type: 'ewallet', icon: 'fa-wallet', active: true },
];

const menuConfig: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'fa-chart-line', roles: ['administrator', 'owner', 'manager', 'cashier'] },
  { id: 'pos', label: 'POS', icon: 'fa-cash-register', roles: ['administrator', 'owner', 'manager', 'cashier'], children: [
    { id: 'pos-new', label: 'Penjualan Baru', icon: 'fa-cart-plus', roles: ['administrator', 'owner', 'manager', 'cashier'] },
    { id: 'pos-held', label: 'Pesanan Ditahan', icon: 'fa-pause-circle', roles: ['administrator', 'owner', 'manager', 'cashier'] },
    { id: 'pos-history', label: 'Riwayat Penjualan', icon: 'fa-clock-rotate-left', roles: ['administrator', 'owner', 'manager', 'cashier'] },
  ]},
  { id: 'products', label: 'Produk', icon: 'fa-boxes-stacked', roles: ['administrator', 'owner', 'manager'], children: [
    { id: 'products-all', label: 'Semua Produk', icon: 'fa-box', roles: ['administrator', 'owner', 'manager'] },
    { id: 'products-categories', label: 'Kategori', icon: 'fa-tags', roles: ['administrator', 'owner', 'manager'] },
    { id: 'products-brands', label: 'Brand', icon: 'fa-bookmark', roles: ['administrator', 'owner', 'manager'] },
    { id: 'products-units', label: 'Unit', icon: 'fa-ruler', roles: ['administrator', 'owner', 'manager'] },
    { id: 'products-pricing', label: 'Harga', icon: 'fa-tag', roles: ['administrator', 'owner', 'manager'] },
  ]},
  { id: 'purchase', label: 'Pembelian', icon: 'fa-truck', roles: ['administrator', 'owner', 'manager'], children: [
    { id: 'purchase-new', label: 'Pembelian Baru', icon: 'fa-cart-shopping', roles: ['administrator', 'owner', 'manager'] },
    { id: 'purchase-history', label: 'Riwayat Pembelian', icon: 'fa-file-invoice', roles: ['administrator', 'owner', 'manager'] },
    { id: 'purchase-suppliers', label: 'Supplier', icon: 'fa-handshake', roles: ['administrator', 'owner', 'manager'] },
  ]},
  { id: 'inventory', label: 'Inventory', icon: 'fa-warehouse', roles: ['administrator', 'owner', 'manager'], children: [
    { id: 'inventory-stock', label: 'Stok', icon: 'fa-cubes', roles: ['administrator', 'owner', 'manager'] },
    { id: 'inventory-mutation', label: 'Mutasi Stok', icon: 'fa-arrows-left-right', roles: ['administrator', 'owner', 'manager'] },
    { id: 'inventory-adjustment', label: 'Penyesuaian Stok', icon: 'fa-sliders', roles: ['administrator', 'owner', 'manager'] },
    { id: 'inventory-opname', label: 'Stock Opname', icon: 'fa-clipboard-check', roles: ['administrator', 'owner', 'manager'] },
  ]},
  { id: 'customer', label: 'Customer', icon: 'fa-users', roles: ['administrator', 'owner', 'manager'], children: [
    { id: 'customer-all', label: 'Semua Customer', icon: 'fa-user-group', roles: ['administrator', 'owner', 'manager'] },
    { id: 'customer-members', label: 'Member', icon: 'fa-id-card', roles: ['administrator', 'owner', 'manager'] },
  ]},
  { id: 'transaction', label: 'Transaksi', icon: 'fa-money-bill-trend-up', roles: ['administrator', 'owner', 'manager'], children: [
    { id: 'transaction-sales', label: 'Penjualan', icon: 'fa-receipt', roles: ['administrator', 'owner', 'manager'] },
    { id: 'transaction-return', label: 'Retur Penjualan', icon: 'fa-rotate-left', roles: ['administrator', 'owner', 'manager'] },
    { id: 'transaction-expenses', label: 'Pengeluaran', icon: 'fa-money-bill-transfer', roles: ['administrator', 'owner', 'manager'] },
  ]},
  { id: 'reports', label: 'Laporan', icon: 'fa-chart-pie', roles: ['administrator', 'owner', 'manager'], children: [
    { id: 'reports-sales', label: 'Penjualan', icon: 'fa-chart-bar', roles: ['administrator', 'owner', 'manager'] },
    { id: 'reports-product', label: 'Produk', icon: 'fa-chart-column', roles: ['administrator', 'owner', 'manager'] },
    { id: 'reports-purchase', label: 'Pembelian', icon: 'fa-chart-area', roles: ['administrator', 'owner', 'manager'] },
    { id: 'reports-stock', label: 'Stok', icon: 'fa-chart-line', roles: ['administrator', 'owner', 'manager'] },
    { id: 'reports-profit', label: 'Keuntungan', icon: 'fa-sack-dollar', roles: ['administrator', 'owner', 'manager'] },
    { id: 'reports-cash', label: 'Kas', icon: 'fa-vault', roles: ['administrator', 'owner', 'manager'] },
  ]},
  { id: 'settings', label: 'Pengaturan', icon: 'fa-gear', roles: ['administrator', 'owner'], children: [
    { id: 'settings-store', label: 'Toko', icon: 'fa-store', roles: ['administrator', 'owner'] },
    { id: 'settings-branch', label: 'Cabang', icon: 'fa-code-branch', roles: ['administrator', 'owner'] },
    { id: 'settings-users', label: 'User', icon: 'fa-user-gear', roles: ['administrator', 'owner'] },
    { id: 'settings-roles', label: 'Role & Permission', icon: 'fa-shield-halved', roles: ['administrator'] },
    { id: 'settings-payment', label: 'Metode Pembayaran', icon: 'fa-credit-card', roles: ['administrator', 'owner'] },
    { id: 'settings-printer', label: 'Printer', icon: 'fa-print', roles: ['administrator', 'owner'] },
    { id: 'settings-receipt', label: 'Struk', icon: 'fa-file-lines', roles: ['administrator', 'owner'] },
  ]},
];

export function StoreProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loginError, setLoginError] = useState('');
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['pos']);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [categories] = useState<Category[]>(initialCategories);
  const [brands] = useState<Brand[]>(initialBrands);
  const [units] = useState<Unit[]>(initialUnits);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);
  const [paymentMethods] = useState<PaymentMethod[]>(initialPaymentMethods);
  const [salesTransactions, setSalesTransactions] = useState<SaleTransaction[]>([]);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [stockMutations, setStockMutations] = useState<StockMutation[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [storeSettings, setStoreSettings] = useState<StoreSettings>({
    name: 'Minimarket Sejahtera',
    address: 'Jl. Merdeka No. 123, Jakarta',
    phone: '(021) 1234-5678',
    email: 'info@toko.com',
    taxRate: 11,
    currency: 'IDR'
  });

  const login = (username: string, password: string) => {
    const user = users.find(u => u.username === username && u.password === password && u.active);
    if (user) {
      setCurrentUser(user);
      setCurrentPage('dashboard');
      setLoginError('');
    } else {
      setLoginError('Username atau password salah');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentPage('dashboard');
  };

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

  const toggleMenu = (id: string) => {
    setExpandedMenus(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const addSaleTransaction = (transaction: SaleTransaction) => {
    setSalesTransactions(prev => [transaction, ...prev]);
    transaction.items.forEach(item => {
      setProducts(prev => prev.map(p => {
        if (p.id === item.product.id) {
          const newStock = p.stock - item.quantity;
          setStockMutations(mutations => [{
            id: 'SM-' + Date.now() + '-' + item.product.id,
            productId: item.product.id,
            productName: item.product.name,
            type: 'out',
            quantity: item.quantity,
            previousStock: p.stock,
            newStock,
            reference: transaction.invoiceNo,
            reason: 'Penjualan',
            date: transaction.date,
            createdBy: transaction.cashierName
          }, ...mutations]);
          return { ...p, stock: newStock };
        }
        return p;
      }));
    });
  };

  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const updateProduct = (id: string, data: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const addPurchaseOrder = (po: PurchaseOrder) => {
    setPurchaseOrders(prev => [po, ...prev]);
    po.items.forEach(item => {
      setProducts(prev => prev.map(p => {
        if (p.id === item.product.id) {
          const newStock = p.stock + item.quantity;
          setStockMutations(mutations => [{
            id: 'SM-' + Date.now() + '-' + item.product.id,
            productId: item.product.id,
            productName: item.product.name,
            type: 'in',
            quantity: item.quantity,
            previousStock: p.stock,
            newStock,
            reference: po.poNumber,
            reason: 'Pembelian dari ' + po.supplierName,
            date: po.date,
            createdBy: po.createdBy
          }, ...mutations]);
          return { ...p, stock: newStock };
        }
        return p;
      }));
    });
  };

  const addSupplier = (supplier: Supplier) => {
    setSuppliers(prev => [...prev, supplier]);
  };

  const addCustomer = (customer: Customer) => {
    setCustomers(prev => [...prev, customer]);
  };

  const addExpense = (expense: Expense) => {
    setExpenses(prev => [expense, ...prev]);
  };

  const adjustStock = (productId: string, adjustment: number, reason: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const newStock = p.stock + adjustment;
        setStockMutations(mutations => [{
          id: 'SM-' + Date.now(),
          productId,
          productName: p.name,
          type: 'adjustment',
          quantity: Math.abs(adjustment),
          previousStock: p.stock,
          newStock,
          reference: 'ADJ-' + Date.now(),
          reason,
          date: new Date().toISOString(),
          createdBy: currentUser?.name || 'System'
        }, ...mutations]);
        return { ...p, stock: newStock };
      }
      return p;
    }));
  };

  const saveOpname = (items: Array<{ productId: string; physicalStock: number; difference: number }>) => {
    items.forEach(item => {
      setProducts(prev => prev.map(p => {
        if (p.id === item.productId) {
          setStockMutations(mutations => [{
            id: 'SM-' + Date.now() + '-' + item.productId,
            productId: item.productId,
            productName: p.name,
            type: 'opname',
            quantity: Math.abs(item.difference),
            previousStock: p.stock,
            newStock: item.physicalStock,
            reference: 'OPNAME-' + Date.now(),
            reason: 'Stock Opname',
            date: new Date().toISOString(),
            createdBy: currentUser?.name || 'System'
          }, ...mutations]);
          return { ...p, stock: item.physicalStock };
        }
        return p;
      }));
    });
  };

  const updateStoreSettings = (settings: Partial<StoreSettings>) => {
    setStoreSettings(prev => ({ ...prev, ...settings }));
  };

  return (
    <StoreContext.Provider value={{
      currentUser, loginError, currentPage, sidebarCollapsed, expandedMenus,
      users, categories, brands, units, products, customers, suppliers, paymentMethods,
      salesTransactions, purchaseOrders, stockMutations, expenses, storeSettings, menuConfig,
      login, logout, setCurrentPage, toggleSidebar, toggleMenu,
      addSaleTransaction, addProduct, updateProduct, deleteProduct,
      addPurchaseOrder, addSupplier, addCustomer, addExpense,
      adjustStock, saveOpname, updateStoreSettings
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return context;
}
