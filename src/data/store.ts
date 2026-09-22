import { User, Category, Brand, Unit, Product, Supplier, Customer, PaymentMethod, CashierShift, Expense, StockMutation, HeldOrder, SaleTransaction, PurchaseOrder, SalesReturn, Branch, Printer, ReceiptTemplate, StoreSettings } from '../types';

// ==================== USERS ====================
export const initialUsers: User[] = [
  { id: 'u1', username: 'admin', password: 'admin123', name: 'Administrator', role: 'administrator', active: true, permissions: ['*'] },
  { id: 'u2', username: 'owner', password: 'owner123', name: 'Budi Santoso', role: 'owner', active: true, permissions: ['*'] },
  { id: 'u3', username: 'manager', password: 'manager123', name: 'Siti Rahayu', role: 'manager', active: true, permissions: ['dashboard', 'pos', 'products', 'purchase', 'inventory', 'customer', 'transaction', 'reports'] },
  { id: 'u4', username: 'kasir1', password: 'kasir123', name: 'Aldi Pratama', role: 'cashier', active: true, permissions: ['pos', 'pos-new', 'pos-held', 'pos-history'] },
  { id: 'u5', username: 'kasir2', password: 'kasir123', name: 'Dewi Lestari', role: 'cashier', active: true, permissions: ['pos', 'pos-new', 'pos-held', 'pos-history'] },
];

// ==================== CATEGORIES ====================
export const initialCategories: Category[] = [
  { id: 'cat1', name: 'Makanan', icon: 'fa-bowl-food', color: 'bg-orange-100 text-orange-600' },
  { id: 'cat2', name: 'Minuman', icon: 'fa-mug-hot', color: 'bg-blue-100 text-blue-600' },
  { id: 'cat3', name: 'Snack', icon: 'fa-cookie-bite', color: 'bg-yellow-100 text-yellow-600' },
  { id: 'cat4', name: 'Sembako', icon: 'fa-wheat-awn', color: 'bg-amber-100 text-amber-600' },
  { id: 'cat5', name: 'Kebutuhan Rumah', icon: 'fa-house', color: 'bg-green-100 text-green-600' },
  { id: 'cat6', name: 'Kebutuhan Bayi', icon: 'fa-baby', color: 'bg-pink-100 text-pink-600' },
  { id: 'cat7', name: 'Perawatan Tubuh', icon: 'fa-soap', color: 'bg-purple-100 text-purple-600' },
  { id: 'cat8', name: 'Rokok', icon: 'fa-smoking', color: 'bg-gray-100 text-gray-600' },
  { id: 'cat9', name: 'Elektronik', icon: 'fa-plug', color: 'bg-cyan-100 text-cyan-600' },
  { id: 'cat10', name: 'Lainnya', icon: 'fa-box', color: 'bg-slate-100 text-slate-600' },
];

// ==================== BRANDS ====================
export const initialBrands: Brand[] = [
  { id: 'b1', name: 'Indomie', description: 'Produk mi instan' },
  { id: 'b2', name: 'Aqua', description: 'Air mineral' },
  { id: 'b3', name: 'Teh Pucuk', description: 'Minuman teh' },
  { id: 'b4', name: 'Coca Cola', description: 'Minuman bersoda' },
  { id: 'b5', name: 'Unilever', description: 'Produk perawatan' },
  { id: 'b6', name: 'P&G', description: 'Produk rumah tangga' },
  { id: 'b7', name: 'Nestle', description: 'Produk makanan & minuman' },
  { id: 'b8', name: 'Sari Roti', description: 'Produk roti' },
  { id: 'b9', name: 'Kapal Api', description: 'Produk kopi' },
  { id: 'b10', name: 'ABC', description: 'Kecap & saus' },
  { id: 'b11', name: 'So Good', description: 'Frozen food' },
  { id: 'b12', name: 'Ultra Milk', description: 'Susu UHT' },
];

// ==================== UNITS ====================
export const initialUnits: Unit[] = [
  { id: 'u1', name: 'Pieces', shortName: 'PCS' },
  { id: 'u2', name: 'Box', shortName: 'BOX' },
  { id: 'u3', name: 'Pack', shortName: 'PACK' },
  { id: 'u4', name: 'Kilogram', shortName: 'KG' },
  { id: 'u5', name: 'Gram', shortName: 'GR' },
  { id: 'u6', name: 'Liter', shortName: 'L' },
  { id: 'u7', name: 'Mililiter', shortName: 'ML' },
];

// ==================== PRODUCTS ====================
export const initialProducts: Product[] = [
  { id: 'p1', name: 'Indomie Goreng', sku: 'IND-GOR', barcode: '8991234567001', categoryId: 'cat1', brandId: 'b1', unitId: 'u1', buyPrice: 2500, sellPrice: 3500, wholesalePrice: 3000, stock: 150, minStock: 20, status: 'active' },
  { id: 'p2', name: 'Indomie Kuah Soto', sku: 'IND-SOT', barcode: '8991234567002', categoryId: 'cat1', brandId: 'b1', unitId: 'u1', buyPrice: 2500, sellPrice: 3500, wholesalePrice: 3000, stock: 120, minStock: 20, status: 'active' },
  { id: 'p3', name: 'Aqua 600ml', sku: 'AQU-600', barcode: '8991234567009', categoryId: 'cat2', brandId: 'b2', unitId: 'u1', buyPrice: 2000, sellPrice: 4000, wholesalePrice: 3500, stock: 200, minStock: 30, status: 'active' },
  { id: 'p4', name: 'Teh Pucuk 350ml', sku: 'TEH-350', barcode: '8991234567010', categoryId: 'cat2', brandId: 'b3', unitId: 'u1', buyPrice: 3000, sellPrice: 5000, wholesalePrice: 4500, stock: 8, minStock: 20, status: 'active' },
  { id: 'p5', name: 'Coca Cola 390ml', sku: 'COC-390', barcode: '8991234567011', categoryId: 'cat2', brandId: 'b4', unitId: 'u1', buyPrice: 5000, sellPrice: 7500, wholesalePrice: 6500, stock: 80, minStock: 15, status: 'active' },
  { id: 'p6', name: 'Sprite 390ml', sku: 'SPR-390', barcode: '8991234567012', categoryId: 'cat2', brandId: 'b4', unitId: 'u1', buyPrice: 5000, sellPrice: 7500, wholesalePrice: 6500, stock: 75, minStock: 15, status: 'active' },
  { id: 'p7', name: 'Ultra Milk 250ml', sku: 'ULM-250', barcode: '8991234567014', categoryId: 'cat2', brandId: 'b12', unitId: 'u1', buyPrice: 3500, sellPrice: 5500, wholesalePrice: 5000, stock: 100, minStock: 20, status: 'active' },
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
  { id: 'p21', name: 'Susu Kental Manis', sku: 'SKM-ULT', barcode: '8991234567035', categoryId: 'cat6', brandId: 'b12', unitId: 'u1', buyPrice: 8000, sellPrice: 11000, wholesalePrice: 10000, stock: 55, minStock: 10, status: 'active' },
  { id: 'p22', name: 'Kecap Manis ABC 600ml', sku: 'KCP-ABC', barcode: '8991234567036', categoryId: 'cat1', brandId: 'b10', unitId: 'u1', buyPrice: 15000, sellPrice: 22000, wholesalePrice: 20000, stock: 30, minStock: 5, status: 'active' },
  { id: 'p23', name: 'Saus Sambal ABC', sku: 'SSS-ABC', barcode: '8991234567037', categoryId: 'cat1', brandId: 'b10', unitId: 'u1', buyPrice: 9000, sellPrice: 13000, wholesalePrice: 12000, stock: 45, minStock: 10, status: 'active' },
  { id: 'p24', name: 'Nugget So Good', sku: 'NGT-SGD', barcode: '8991234567041', categoryId: 'cat1', brandId: 'b11', unitId: 'u1', buyPrice: 24000, sellPrice: 32000, wholesalePrice: 28000, stock: 20, minStock: 5, status: 'active' },
  { id: 'p25', name: 'Sosis So Nice', sku: 'SSS-SNC', barcode: '8991234567042', categoryId: 'cat1', brandId: 'b11', unitId: 'u1', buyPrice: 10000, sellPrice: 15000, wholesalePrice: 13000, stock: 30, minStock: 8, status: 'active' },
  { id: 'p26', name: 'Pocari Sweat 500ml', sku: 'PCT-500', barcode: '8991234567013', categoryId: 'cat2', brandId: 'b7', unitId: 'u1', buyPrice: 5500, sellPrice: 8000, wholesalePrice: 7000, stock: 60, minStock: 15, status: 'active' },
  { id: 'p27', name: 'Good Day Cappuccino', sku: 'GDY-CPC', barcode: '8991234567015', categoryId: 'cat2', brandId: 'b7', unitId: 'u1', buyPrice: 3000, sellPrice: 5000, wholesalePrice: 4500, stock: 90, minStock: 15, status: 'active' },
  { id: 'p28', name: 'Qtela Coklat', sku: 'QTL-COK', barcode: '8991234567018', categoryId: 'cat3', brandId: 'b7', unitId: 'u1', buyPrice: 2000, sellPrice: 3000, wholesalePrice: 2500, stock: 120, minStock: 20, status: 'active' },
  { id: 'p29', name: 'Royco Kaldu Ayam', sku: 'RYC-KLD', barcode: '8991234567040', categoryId: 'cat1', brandId: 'b5', unitId: 'u1', buyPrice: 5500, sellPrice: 8000, wholesalePrice: 7000, stock: 70, minStock: 15, status: 'active' },
  { id: 'p30', name: 'Margarin Blueband', sku: 'MGR-BLB', barcode: '8991234567034', categoryId: 'cat4', brandId: 'b5', unitId: 'u1', buyPrice: 11000, sellPrice: 15000, wholesalePrice: 13000, stock: 35, minStock: 8, status: 'active' },
];

// ==================== SUPPLIERS ====================
export const initialSuppliers: Supplier[] = [
  { id: 's1', name: 'PT Indofood Sukses Makmur', phone: '021-5795-8822', address: 'Jakarta Selatan', email: 'info@indofood.co.id', active: true },
  { id: 's2', name: 'PT Danone Aqua Indonesia', phone: '021-5211-711', address: 'Jakarta Pusat', email: 'contact@aqua.com', active: true },
  { id: 's3', name: 'PT Coca Cola Indonesia', phone: '021-5366-3636', address: 'Jakarta Barat', email: 'info@cocacola.co.id', active: true },
  { id: 's4', name: 'PT Unilever Indonesia', phone: '021-5262-112', address: 'Jakarta Selatan', email: 'contact@unilever.co.id', active: true },
  { id: 's5', name: 'PT Nestle Indonesia', phone: '021-5367-888', address: 'Jakarta Barat', email: 'info@nestle.co.id', active: true },
  { id: 's6', name: 'PT Mayora Indah', phone: '021-5438-500', address: 'Tangerang', email: 'info@mayora.co.id', active: true },
];

// ==================== CUSTOMERS ====================
export const initialCustomers: Customer[] = [
  { id: 'c0', name: 'Walk-in Customer', phone: '-', points: 0, totalSpent: 0, totalTransactions: 0, isMember: false, joinDate: '' },
  { id: 'c1', name: 'Ahmad Hidayat', phone: '081234567890', memberCode: 'MBR-001', points: 150, totalSpent: 1500000, totalTransactions: 25, isMember: true, joinDate: '2025-01-15' },
  { id: 'c2', name: 'Rina Wulandari', phone: '082345678901', memberCode: 'MBR-002', points: 320, totalSpent: 3200000, totalTransactions: 42, isMember: true, joinDate: '2025-02-20' },
  { id: 'c3', name: 'Joko Susilo', phone: '083456789012', memberCode: 'MBR-003', points: 85, totalSpent: 850000, totalTransactions: 15, isMember: true, joinDate: '2025-03-10' },
  { id: 'c4', name: 'Diana Putri', phone: '084567890123', memberCode: 'MBR-004', points: 210, totalSpent: 2100000, totalTransactions: 30, isMember: true, joinDate: '2025-04-05' },
];

// ==================== PAYMENT METHODS ====================
export const initialPaymentMethods: PaymentMethod[] = [
  { id: 'pm1', name: 'Tunai', type: 'cash', icon: 'fa-money-bill-wave', active: true },
  { id: 'pm2', name: 'QRIS', type: 'qris', icon: 'fa-qrcode', active: true },
  { id: 'pm3', name: 'Debit', type: 'card', icon: 'fa-credit-card', active: true },
  { id: 'pm4', name: 'Credit Card', type: 'card', icon: 'fa-credit-card', active: true },
  { id: 'pm5', name: 'Transfer Bank', type: 'transfer', icon: 'fa-building-columns', active: true },
  { id: 'pm6', name: 'E-Wallet', type: 'ewallet', icon: 'fa-wallet', active: true },
];

// ==================== BRANCHES ====================
export const initialBranches: Branch[] = [
  { id: 'br1', name: 'Cabang Pusat', address: 'Jl. Merdeka No. 123, Jakarta Pusat', phone: '021-1234-5678', active: true },
  { id: 'br2', name: 'Cabang Selatan', address: 'Jl. Sudirman No. 45, Jakarta Selatan', phone: '021-8765-4321', active: true },
];

// ==================== PRINTERS ====================
export const initialPrinters: Printer[] = [
  { id: 'pr1', name: 'Printer Kasir 1', type: 'Thermal 58mm', connection: 'USB', active: true },
  { id: 'pr2', name: 'Printer Kasir 2', type: 'Thermal 80mm', connection: 'Bluetooth', active: true },
];

// ==================== RECEIPT TEMPLATE ====================
export const initialReceiptTemplate: ReceiptTemplate = {
  header: 'MINIMARKET SEJAHTERA',
  footer: 'Terima kasih atas kunjungan Anda!\nBarang yang sudah dibeli tidak dapat dikembalikan.',
  showLogo: true,
  showTax: true,
  showBarcode: true,
};

// ==================== STORE SETTINGS ====================
export const initialStoreSettings: StoreSettings = {
  name: 'Minimarket Sejahtera',
  address: 'Jl. Merdeka No. 123, Jakarta Pusat',
  phone: '(021) 1234-5678',
  email: 'info@minimarketsejahtera.com',
  taxRate: 11,
  currency: 'IDR',
};

// ==================== INITIAL TRANSACTIONS (sample) ====================
export const initialSalesTransactions: SaleTransaction[] = [];
export const initialHeldOrders: HeldOrder[] = [];
export const initialPurchaseOrders: PurchaseOrder[] = [];
export const initialStockMutations: StockMutation[] = [];
export const initialExpenses: Expense[] = [];
export const initialSalesReturns: SalesReturn[] = [];
export const initialShifts: CashierShift[] = [];
