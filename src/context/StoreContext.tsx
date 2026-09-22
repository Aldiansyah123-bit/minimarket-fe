import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { User, UserRole, Product, Category, Brand, Unit, Supplier, Customer, PaymentMethod, CashierShift, Expense, StockMutation, HeldOrder, SaleTransaction, PurchaseOrder, SalesReturn, Branch, Printer, ReceiptTemplate, StoreSettings, PageId, CartItem } from '../types';
import { initialUsers, initialProducts, initialCategories, initialBrands, initialUnits, initialSuppliers, initialCustomers, initialPaymentMethods, initialShifts, initialExpenses, initialStockMutations, initialHeldOrders, initialSalesTransactions, initialPurchaseOrders, initialSalesReturns, initialBranches, initialPrinters, initialReceiptTemplate, initialStoreSettings } from '../data/store';

interface StoreContextType {
  // Auth
  currentUser: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  hasPermission: (permission: string) => boolean;

  // Navigation
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;

  // Shift
  currentShift: CashierShift | null;
  openShift: (modal: number) => void;
  closeShift: (actualCash: number) => void;

  // Products
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  brands: Brand[];
  setBrands: React.Dispatch<React.SetStateAction<Brand[]>>;
  units: Unit[];
  setUnits: React.Dispatch<React.SetStateAction<Unit[]>>;

  // Suppliers & Customers
  suppliers: Supplier[];
  setSuppliers: React.Dispatch<React.SetStateAction<Supplier[]>>;
  customers: Customer[];
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;

  // Transactions
  salesTransactions: SaleTransaction[];
  addSaleTransaction: (t: SaleTransaction) => void;
  heldOrders: HeldOrder[];
  setHeldOrders: React.Dispatch<React.SetStateAction<HeldOrder[]>>;
  purchaseOrders: PurchaseOrder[];
  addPurchaseOrder: (po: PurchaseOrder) => void;
  salesReturns: SalesReturn[];
  addSalesReturn: (r: SalesReturn) => void;
  expenses: Expense[];
  addExpense: (e: Expense) => void;

  // Inventory
  stockMutations: StockMutation[];
  addStockMutation: (m: StockMutation) => void;

  // Settings
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  paymentMethods: PaymentMethod[];
  setPaymentMethods: React.Dispatch<React.SetStateAction<PaymentMethod[]>>;
  branches: Branch[];
  setBranches: React.Dispatch<React.SetStateAction<Branch[]>>;
  printers: Printer[];
  setPrinters: React.Dispatch<React.SetStateAction<Printer[]>>;
  receiptTemplate: ReceiptTemplate;
  setReceiptTemplate: React.Dispatch<React.SetStateAction<ReceiptTemplate>>;
  storeSettings: StoreSettings;
  setStoreSettings: React.Dispatch<React.SetStateAction<StoreSettings>>;

  // Helpers
  formatRupiah: (n: number) => string;
  getCategoryName: (id: string) => string;
  getBrandName: (id: string) => string;
  getUnitName: (id: string) => string;
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<PageId>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [brands, setBrands] = useState<Brand[]>(initialBrands);
  const [units, setUnits] = useState<Unit[]>(initialUnits);
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [salesTransactions, setSalesTransactions] = useState<SaleTransaction[]>(initialSalesTransactions);
  const [heldOrders, setHeldOrders] = useState<HeldOrder[]>(initialHeldOrders);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>(initialPurchaseOrders);
  const [salesReturns, setSalesReturns] = useState<SalesReturn[]>(initialSalesReturns);
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [stockMutations, setStockMutations] = useState<StockMutation[]>(initialStockMutations);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(initialPaymentMethods);
  const [branches, setBranches] = useState<Branch[]>(initialBranches);
  const [printers, setPrinters] = useState<Printer[]>(initialPrinters);
  const [receiptTemplate, setReceiptTemplate] = useState<ReceiptTemplate>(initialReceiptTemplate);
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(initialStoreSettings);
  const [currentShift, setCurrentShift] = useState<CashierShift | null>(null);

  const login = useCallback((username: string, password: string): boolean => {
    const user = users.find(u => u.username === username && u.password === password && u.active);
    if (user) {
      setCurrentUser(user);
      setCurrentPage('dashboard');
      return true;
    }
    return false;
  }, [users]);

  const logout = useCallback(() => {
    setCurrentUser(null);
    setCurrentShift(null);
    setCurrentPage('dashboard');
  }, []);

  const hasPermission = useCallback((permission: string): boolean => {
    if (!currentUser) return false;
    if (currentUser.permissions.includes('*')) return true;
    return currentUser.permissions.includes(permission);
  }, [currentUser]);

  const openShift = useCallback((modal: number) => {
    if (!currentUser) return;
    const shift: CashierShift = {
      id: 'SHF-' + Date.now(),
      cashierId: currentUser.id,
      cashierName: currentUser.name,
      terminal: 'Kasir 1',
      openTime: new Date().toISOString(),
      closeTime: null,
      initialModal: modal,
      cashSales: 0,
      nonCashSales: 0,
      expenses: 0,
      expectedCash: modal,
      actualCash: null,
      difference: null,
      status: 'open',
    };
    setCurrentShift(shift);
  }, [currentUser]);

  const closeShift = useCallback((actualCash: number) => {
    if (!currentShift) return;
    const expected = currentShift.initialModal + currentShift.cashSales - currentShift.expenses;
    setCurrentShift({
      ...currentShift,
      closeTime: new Date().toISOString(),
      actualCash,
      expectedCash: expected,
      difference: actualCash - expected,
      status: 'closed',
    });
  }, [currentShift]);

  const addSaleTransaction = useCallback((t: SaleTransaction) => {
    setSalesTransactions(prev => [t, ...prev]);
    // Update stock
    setProducts(prev => prev.map(p => {
      const item = t.items.find(i => i.product.id === p.id);
      if (item) {
        return { ...p, stock: p.stock - item.quantity };
      }
      return p;
    }));
    // Update shift
    if (currentShift && t.paymentMethod === 'Tunai') {
      setCurrentShift(prev => prev ? { ...prev, cashSales: prev.cashSales + t.total } : prev);
    } else if (currentShift) {
      setCurrentShift(prev => prev ? { ...prev, nonCashSales: prev.nonCashSales + t.total } : prev);
    }
  }, [currentShift]);

  const addPurchaseOrder = useCallback((po: PurchaseOrder) => {
    setPurchaseOrders(prev => [po, ...prev]);
    // Update stock
    setProducts(prev => prev.map(p => {
      const item = po.items.find(i => i.product.id === p.id);
      if (item) {
        return { ...p, stock: p.stock + item.quantity };
      }
      return p;
    }));
    // Add stock mutations
    po.items.forEach(item => {
      const mutation: StockMutation = {
        id: 'SM-' + Date.now() + '-' + item.product.id,
        productId: item.product.id,
        productName: item.product.name,
        type: 'in',
        quantity: item.quantity,
        previousStock: item.product.stock,
        newStock: item.product.stock + item.quantity,
        reference: po.poNumber,
        reason: 'Pembelian dari ' + po.supplierName,
        date: po.date,
        createdBy: po.createdBy,
      };
      setStockMutations(prev => [mutation, ...prev]);
    });
  }, []);

  const addSalesReturn = useCallback((r: SalesReturn) => {
    setSalesReturns(prev => [r, ...prev]);
    // Update stock for restocked items
    setProducts(prev => prev.map(p => {
      const item = r.items.find(i => i.productId === p.id && i.restock);
      if (item) {
        return { ...p, stock: p.stock + item.quantity };
      }
      return p;
    }));
  }, []);

  const addExpense = useCallback((e: Expense) => {
    setExpenses(prev => [e, ...prev]);
    if (currentShift && e.paymentMethod === 'Tunai') {
      setCurrentShift(prev => prev ? { ...prev, expenses: prev.expenses + e.amount } : prev);
    }
  }, [currentShift]);

  const addStockMutation = useCallback((m: StockMutation) => {
    setStockMutations(prev => [m, ...prev]);
    setProducts(prev => prev.map(p => {
      if (p.id === m.productId) {
        return { ...p, stock: m.newStock };
      }
      return p;
    }));
  }, []);

  const formatRupiah = (n: number) => 'Rp ' + n.toLocaleString('id-ID');

  const getCategoryName = (id: string) => categories.find(c => c.id === id)?.name || '-';
  const getBrandName = (id: string) => brands.find(b => b.id === id)?.name || '-';
  const getUnitName = (id: string) => units.find(u => u.id === id)?.shortName || '-';

  return (
    <StoreContext.Provider value={{
      currentUser, login, logout, hasPermission,
      currentPage, setCurrentPage, sidebarOpen, setSidebarOpen,
      currentShift, openShift, closeShift,
      products, setProducts, categories, setCategories, brands, setBrands, units, setUnits,
      suppliers, setSuppliers, customers, setCustomers,
      salesTransactions, addSaleTransaction, heldOrders, setHeldOrders,
      purchaseOrders, addPurchaseOrder, salesReturns, addSalesReturn,
      expenses, addExpense, stockMutations, addStockMutation,
      users, setUsers, paymentMethods, setPaymentMethods,
      branches, setBranches, printers, setPrinters,
      receiptTemplate, setReceiptTemplate, storeSettings, setStoreSettings,
      formatRupiah, getCategoryName, getBrandName, getUnitName,
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
