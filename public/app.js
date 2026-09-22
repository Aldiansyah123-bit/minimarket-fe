// ==================== DATA ====================
const initialUsers = [
  { id: 'u1', username: 'admin', password: 'admin123', name: 'Administrator', role: 'administrator', active: true, permissions: ['*'] },
  { id: 'u2', username: 'owner', password: 'owner123', name: 'Budi Santoso', role: 'owner', active: true, permissions: ['*'] },
  { id: 'u3', username: 'manager', password: 'manager123', name: 'Siti Rahayu', role: 'manager', active: true, permissions: ['dashboard','pos','products','purchase','inventory','customer','transaction','reports'] },
  { id: 'u4', username: 'kasir1', password: 'kasir123', name: 'Aldi Pratama', role: 'cashier', active: true, permissions: ['pos','pos-new','pos-held','pos-history'] },
];
const initialCategories = [
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
const initialBrands = [
  { id: 'b1', name: 'Indomie', description: 'Mi instan' }, { id: 'b2', name: 'Aqua', description: 'Air mineral' },
  { id: 'b3', name: 'Teh Pucuk', description: 'Minuman teh' }, { id: 'b4', name: 'Coca Cola', description: 'Minuman bersoda' },
  { id: 'b5', name: 'Unilever', description: 'Perawatan' }, { id: 'b6', name: 'P&G', description: 'Rumah tangga' },
  { id: 'b7', name: 'Nestle', description: 'Makanan & minuman' }, { id: 'b8', name: 'Sari Roti', description: 'Roti' },
  { id: 'b9', name: 'Kapal Api', description: 'Kopi' }, { id: 'b10', name: 'ABC', description: 'Kecap & saus' },
  { id: 'b11', name: 'So Good', description: 'Frozen food' }, { id: 'b12', name: 'Ultra Milk', description: 'Susu UHT' },
];
const initialUnits = [
  { id: 'u1', name: 'Pieces', shortName: 'PCS' }, { id: 'u2', name: 'Box', shortName: 'BOX' },
  { id: 'u3', name: 'Pack', shortName: 'PACK' }, { id: 'u4', name: 'Kilogram', shortName: 'KG' },
  { id: 'u5', name: 'Gram', shortName: 'GR' }, { id: 'u6', name: 'Liter', shortName: 'L' }, { id: 'u7', name: 'Mililiter', shortName: 'ML' },
];
const initialProducts = [
  { id:'p1',name:'Indomie Goreng',sku:'IND-GOR',barcode:'8991234567001',categoryId:'cat1',brandId:'b1',unitId:'u1',buyPrice:2500,sellPrice:3500,wholesalePrice:3000,stock:150,minStock:20,status:'active' },
  { id:'p2',name:'Indomie Kuah Soto',sku:'IND-SOT',barcode:'8991234567002',categoryId:'cat1',brandId:'b1',unitId:'u1',buyPrice:2500,sellPrice:3500,wholesalePrice:3000,stock:120,minStock:20,status:'active' },
  { id:'p3',name:'Aqua 600ml',sku:'AQU-600',barcode:'8991234567009',categoryId:'cat2',brandId:'b2',unitId:'u1',buyPrice:2000,sellPrice:4000,wholesalePrice:3500,stock:200,minStock:30,status:'active' },
  { id:'p4',name:'Teh Pucuk 350ml',sku:'TEH-350',barcode:'8991234567010',categoryId:'cat2',brandId:'b3',unitId:'u1',buyPrice:3000,sellPrice:5000,wholesalePrice:4500,stock:8,minStock:20,status:'active' },
  { id:'p5',name:'Coca Cola 390ml',sku:'COC-390',barcode:'8991234567011',categoryId:'cat2',brandId:'b4',unitId:'u1',buyPrice:5000,sellPrice:7500,wholesalePrice:6500,stock:80,minStock:15,status:'active' },
  { id:'p6',name:'Sprite 390ml',sku:'SPR-390',barcode:'8991234567012',categoryId:'cat2',brandId:'b4',unitId:'u1',buyPrice:5000,sellPrice:7500,wholesalePrice:6500,stock:75,minStock:15,status:'active' },
  { id:'p7',name:'Ultra Milk 250ml',sku:'ULM-250',barcode:'8991234567014',categoryId:'cat2',brandId:'b12',unitId:'u1',buyPrice:3500,sellPrice:5500,wholesalePrice:5000,stock:100,minStock:20,status:'active' },
  { id:'p8',name:'Chitato Sapi Panggang',sku:'CHT-SPG',barcode:'8991234567017',categoryId:'cat3',brandId:'b7',unitId:'u1',buyPrice:7500,sellPrice:10500,wholesalePrice:9500,stock:70,minStock:10,status:'active' },
  { id:'p9',name:'Oreo Original',sku:'ORE-ORG',barcode:'8991234567019',categoryId:'cat3',brandId:'b7',unitId:'u1',buyPrice:6000,sellPrice:8500,wholesalePrice:7500,stock:65,minStock:10,status:'active' },
  { id:'p10',name:'Silverqueen Cashew',sku:'SLV-CSH',barcode:'8991234567022',categoryId:'cat3',brandId:'b7',unitId:'u1',buyPrice:13000,sellPrice:17000,wholesalePrice:15000,stock:40,minStock:8,status:'active' },
  { id:'p11',name:'Beras Premium 5kg',sku:'BRS-PRM',barcode:'8991234567004',categoryId:'cat4',brandId:'b10',unitId:'u1',buyPrice:60000,sellPrice:75000,wholesalePrice:70000,stock:30,minStock:5,status:'active' },
  { id:'p12',name:'Minyak Goreng 2L',sku:'MYK-2LT',barcode:'8991234567005',categoryId:'cat4',brandId:'b10',unitId:'u1',buyPrice:28000,sellPrice:35000,wholesalePrice:32000,stock:45,minStock:10,status:'active' },
  { id:'p13',name:'Gula Pasir 1kg',sku:'GUL-1KG',barcode:'8991234567006',categoryId:'cat4',brandId:'b10',unitId:'u4',buyPrice:12000,sellPrice:15000,wholesalePrice:14000,stock:5,minStock:10,status:'active' },
  { id:'p14',name:'Kopi Kapal Api',sku:'KPA-SCH',barcode:'8991234567007',categoryId:'cat1',brandId:'b9',unitId:'u1',buyPrice:1500,sellPrice:2500,wholesalePrice:2000,stock:200,minStock:30,status:'active' },
  { id:'p15',name:'Roti Tawar Sari Roti',sku:'RTI-TWR',barcode:'8991234567008',categoryId:'cat1',brandId:'b8',unitId:'u1',buyPrice:13000,sellPrice:18000,wholesalePrice:16000,stock:25,minStock:5,status:'active' },
  { id:'p16',name:'Sabun Lifebuoy',sku:'SBN-LFB',barcode:'8991234567025',categoryId:'cat7',brandId:'b5',unitId:'u1',buyPrice:3000,sellPrice:4500,wholesalePrice:4000,stock:100,minStock:20,status:'active' },
  { id:'p17',name:'Shampoo Pantene',sku:'SHP-PNT',barcode:'8991234567026',categoryId:'cat7',brandId:'b6',unitId:'u1',buyPrice:18000,sellPrice:25000,wholesalePrice:22000,stock:30,minStock:5,status:'active' },
  { id:'p18',name:'Pasta Gigi Pepsodent',sku:'PGI-PPD',barcode:'8991234567027',categoryId:'cat7',brandId:'b5',unitId:'u1',buyPrice:8000,sellPrice:12000,wholesalePrice:10000,stock:50,minStock:10,status:'active' },
  { id:'p19',name:'Detergen Rinso 800g',sku:'DTR-RNS',barcode:'8991234567028',categoryId:'cat5',brandId:'b5',unitId:'u1',buyPrice:16000,sellPrice:22000,wholesalePrice:20000,stock:40,minStock:8,status:'active' },
  { id:'p20',name:'Tisu Paseo 250s',sku:'TSU-PSO',barcode:'8991234567029',categoryId:'cat5',brandId:'b7',unitId:'u1',buyPrice:8000,sellPrice:11000,wholesalePrice:10000,stock:60,minStock:10,status:'active' },
  { id:'p21',name:'Susu Kental Manis',sku:'SKM-ULT',barcode:'8991234567035',categoryId:'cat6',brandId:'b12',unitId:'u1',buyPrice:8000,sellPrice:11000,wholesalePrice:10000,stock:55,minStock:10,status:'active' },
  { id:'p22',name:'Kecap Manis ABC',sku:'KCP-ABC',barcode:'8991234567036',categoryId:'cat1',brandId:'b10',unitId:'u1',buyPrice:15000,sellPrice:22000,wholesalePrice:20000,stock:30,minStock:5,status:'active' },
  { id:'p23',name:'Saus Sambal ABC',sku:'SSS-ABC',barcode:'8991234567037',categoryId:'cat1',brandId:'b10',unitId:'u1',buyPrice:9000,sellPrice:13000,wholesalePrice:12000,stock:45,minStock:10,status:'active' },
  { id:'p24',name:'Nugget So Good',sku:'NGT-SGD',barcode:'8991234567041',categoryId:'cat1',brandId:'b11',unitId:'u1',buyPrice:24000,sellPrice:32000,wholesalePrice:28000,stock:20,minStock:5,status:'active' },
  { id:'p25',name:'Sosis So Nice',sku:'SSS-SNC',barcode:'8991234567042',categoryId:'cat1',brandId:'b11',unitId:'u1',buyPrice:10000,sellPrice:15000,wholesalePrice:13000,stock:30,minStock:8,status:'active' },
  { id:'p26',name:'Pocari Sweat 500ml',sku:'PCT-500',barcode:'8991234567013',categoryId:'cat2',brandId:'b7',unitId:'u1',buyPrice:5500,sellPrice:8000,wholesalePrice:7000,stock:60,minStock:15,status:'active' },
  { id:'p27',name:'Good Day Cappuccino',sku:'GDY-CPC',barcode:'8991234567015',categoryId:'cat2',brandId:'b7',unitId:'u1',buyPrice:3000,sellPrice:5000,wholesalePrice:4500,stock:90,minStock:15,status:'active' },
  { id:'p28',name:'Qtela Coklat',sku:'QTL-COK',barcode:'8991234567018',categoryId:'cat3',brandId:'b7',unitId:'u1',buyPrice:2000,sellPrice:3000,wholesalePrice:2500,stock:120,minStock:20,status:'active' },
  { id:'p29',name:'Royco Kaldu Ayam',sku:'RYC-KLD',barcode:'8991234567040',categoryId:'cat1',brandId:'b5',unitId:'u1',buyPrice:5500,sellPrice:8000,wholesalePrice:7000,stock:70,minStock:15,status:'active' },
  { id:'p30',name:'Margarin Blueband',sku:'MGR-BLB',barcode:'8991234567034',categoryId:'cat4',brandId:'b5',unitId:'u1',buyPrice:11000,sellPrice:15000,wholesalePrice:13000,stock:35,minStock:8,status:'active' },
];
const initialSuppliers = [
  { id:'s1',name:'PT Indofood Sukses Makmur',phone:'021-5795-8822',address:'Jakarta Selatan',active:true },
  { id:'s2',name:'PT Danone Aqua Indonesia',phone:'021-5211-711',address:'Jakarta Pusat',active:true },
  { id:'s3',name:'PT Coca Cola Indonesia',phone:'021-5366-3636',address:'Jakarta Barat',active:true },
  { id:'s4',name:'PT Unilever Indonesia',phone:'021-5262-112',address:'Jakarta Selatan',active:true },
  { id:'s5',name:'PT Nestle Indonesia',phone:'021-5367-888',address:'Jakarta Barat',active:true },
];
const initialCustomers = [
  { id:'c0',name:'Walk-in Customer',phone:'-',points:0,totalSpent:0,totalTransactions:0,isMember:false,joinDate:'' },
  { id:'c1',name:'Ahmad Hidayat',phone:'081234567890',memberCode:'MBR-001',points:150,totalSpent:1500000,totalTransactions:25,isMember:true,joinDate:'2025-01-15' },
  { id:'c2',name:'Rina Wulandari',phone:'082345678901',memberCode:'MBR-002',points:320,totalSpent:3200000,totalTransactions:42,isMember:true,joinDate:'2025-02-20' },
];
const initialPaymentMethods = [
  { id:'pm1',name:'Tunai',type:'cash',icon:'fa-money-bill-wave',active:true },
  { id:'pm2',name:'QRIS',type:'qris',icon:'fa-qrcode',active:true },
  { id:'pm3',name:'Debit',type:'card',icon:'fa-credit-card',active:true },
  { id:'pm4',name:'E-Wallet',type:'ewallet',icon:'fa-wallet',active:true },
  { id:'pm5',name:'Transfer Bank',type:'transfer',icon:'fa-building-columns',active:true },
];

const menuConfig = [
  { id:'dashboard',label:'Dashboard',icon:'fa-chart-line',roles:['administrator','owner','manager','cashier'] },
  { id:'pos',label:'POS',icon:'fa-cash-register',roles:['administrator','owner','manager','cashier'],children:[
    {id:'pos-new',label:'Penjualan Baru',icon:'fa-cart-plus',roles:['administrator','owner','manager','cashier']},
    {id:'pos-held',label:'Pesanan Ditahan',icon:'fa-pause-circle',roles:['administrator','owner','manager','cashier']},
    {id:'pos-history',label:'Riwayat Penjualan',icon:'fa-clock-rotate-left',roles:['administrator','owner','manager','cashier']},
  ]},
  { id:'products',label:'Produk',icon:'fa-boxes-stacked',roles:['administrator','owner','manager'],children:[
    {id:'products-all',label:'Semua Produk',icon:'fa-box',roles:['administrator','owner','manager']},
    {id:'products-categories',label:'Kategori',icon:'fa-tags',roles:['administrator','owner','manager']},
    {id:'products-brands',label:'Brand',icon:'fa-bookmark',roles:['administrator','owner','manager']},
    {id:'products-units',label:'Unit',icon:'fa-ruler',roles:['administrator','owner','manager']},
    {id:'products-pricing',label:'Harga',icon:'fa-tag',roles:['administrator','owner','manager']},
  ]},
  { id:'purchase',label:'Pembelian',icon:'fa-truck',roles:['administrator','owner','manager'],children:[
    {id:'purchase-new',label:'Pembelian Baru',icon:'fa-cart-shopping',roles:['administrator','owner','manager']},
    {id:'purchase-history',label:'Riwayat Pembelian',icon:'fa-file-invoice',roles:['administrator','owner','manager']},
    {id:'purchase-suppliers',label:'Supplier',icon:'fa-handshake',roles:['administrator','owner','manager']},
  ]},
  { id:'inventory',label:'Inventory',icon:'fa-warehouse',roles:['administrator','owner','manager'],children:[
    {id:'inventory-stock',label:'Stok',icon:'fa-cubes',roles:['administrator','owner','manager']},
    {id:'inventory-mutation',label:'Mutasi Stok',icon:'fa-arrows-left-right',roles:['administrator','owner','manager']},
    {id:'inventory-adjustment',label:'Penyesuaian Stok',icon:'fa-sliders',roles:['administrator','owner','manager']},
    {id:'inventory-opname',label:'Stock Opname',icon:'fa-clipboard-check',roles:['administrator','owner','manager']},
  ]},
  { id:'customer',label:'Customer',icon:'fa-users',roles:['administrator','owner','manager'],children:[
    {id:'customer-all',label:'Semua Customer',icon:'fa-user-group',roles:['administrator','owner','manager']},
    {id:'customer-members',label:'Member',icon:'fa-id-card',roles:['administrator','owner','manager']},
  ]},
  { id:'transaction',label:'Transaksi',icon:'fa-money-bill-trend-up',roles:['administrator','owner','manager'],children:[
    {id:'transaction-sales',label:'Penjualan',icon:'fa-receipt',roles:['administrator','owner','manager']},
    {id:'transaction-return',label:'Retur Penjualan',icon:'fa-rotate-left',roles:['administrator','owner','manager']},
    {id:'transaction-expenses',label:'Pengeluaran',icon:'fa-money-bill-transfer',roles:['administrator','owner','manager']},
  ]},
  { id:'reports',label:'Laporan',icon:'fa-chart-pie',roles:['administrator','owner','manager'],children:[
    {id:'reports-sales',label:'Penjualan',icon:'fa-chart-bar',roles:['administrator','owner','manager']},
    {id:'reports-product',label:'Produk',icon:'fa-chart-column',roles:['administrator','owner','manager']},
    {id:'reports-purchase',label:'Pembelian',icon:'fa-chart-area',roles:['administrator','owner','manager']},
    {id:'reports-stock',label:'Stok',icon:'fa-chart-line',roles:['administrator','owner','manager']},
    {id:'reports-profit',label:'Keuntungan',icon:'fa-sack-dollar',roles:['administrator','owner','manager']},
    {id:'reports-cash',label:'Kas',icon:'fa-vault',roles:['administrator','owner','manager']},
  ]},
  { id:'settings',label:'Pengaturan',icon:'fa-gear',roles:['administrator','owner'],children:[
    {id:'settings-store',label:'Toko',icon:'fa-store',roles:['administrator','owner']},
    {id:'settings-branch',label:'Cabang',icon:'fa-code-branch',roles:['administrator','owner']},
    {id:'settings-users',label:'User',icon:'fa-user-gear',roles:['administrator','owner']},
    {id:'settings-roles',label:'Role & Permission',icon:'fa-shield-halved',roles:['administrator']},
    {id:'settings-payment',label:'Metode Pembayaran',icon:'fa-credit-card',roles:['administrator','owner']},
    {id:'settings-printer',label:'Printer',icon:'fa-print',roles:['administrator','owner']},
    {id:'settings-receipt',label:'Struk',icon:'fa-file-lines',roles:['administrator','owner']},
  ]},
];

// ==================== VUE APP ====================
var app = new Vue({
  el: '#app',
  template: '#app-template',
  data: function() {
    return {
      currentUser: null, loginForm: { username: '', password: '' }, loginError: '', showPassword: false,
      demoAccounts: [
        { role: 'Administrator', username: 'admin', password: 'admin123', color: '#dc2626' },
        { role: 'Owner', username: 'owner', password: 'owner123', color: '#7c3aed' },
        { role: 'Manager', username: 'manager', password: 'manager123', color: '#2563eb' },
        { role: 'Kasir', username: 'kasir1', password: 'kasir123', color: '#16a34a' },
      ],
      currentPage: 'dashboard', sidebarCollapsed: false, expandedMenus: ['pos'],
      users: JSON.parse(JSON.stringify(initialUsers)),
      categories: JSON.parse(JSON.stringify(initialCategories)),
      brands: JSON.parse(JSON.stringify(initialBrands)),
      units: JSON.parse(JSON.stringify(initialUnits)),
      products: JSON.parse(JSON.stringify(initialProducts)),
      suppliers: JSON.parse(JSON.stringify(initialSuppliers)),
      customers: JSON.parse(JSON.stringify(initialCustomers)),
      paymentMethods: JSON.parse(JSON.stringify(initialPaymentMethods)),
      branches: [{ id:'br1',name:'Cabang Pusat',address:'Jl. Merdeka No. 123, Jakarta',phone:'021-1234-5678',active:true }],
      printers: [{ id:'pr1',name:'Printer Kasir 1',type:'Thermal 58mm',connection:'USB',active:true }],
      storeSettings: { name:'Minimarket Sejahtera',address:'Jl. Merdeka No. 123, Jakarta',phone:'(021) 1234-5678',email:'info@toko.com',taxRate:11,currency:'IDR' },
      receiptTemplate: { header:'MINIMARKET SEJAHTERA',footer:'Terima kasih!',showLogo:true,showTax:true,showBarcode:true },
      salesTransactions: [], heldOrders: [], purchaseOrders: [], salesReturns: [], expenses: [], stockMutations: [], currentShift: null,
      posSearch: '', posCategory: 'all', cart: [], cartDiscount: 0, selectedCustomerId: 'c0',
      showPaymentModal: false, paymentMethod: 'Tunai', cashInput: '', showReceiptModal: false, lastTransaction: null,
      productSearch: '', productFilterCat: 'all', showProductForm: false, editingProduct: null,
      productForm: { name:'',sku:'',barcode:'',categoryId:'cat1',brandId:'b1',unitId:'u1',buyPrice:0,sellPrice:0,wholesalePrice:0,stock:0,minStock:10,status:'active' },
      pricingSearch: '', purchaseSupplierId: 's1', purchaseItems: [], showProductPicker: false, pickerSearch: '', selectedPO: null,
      adjustProductId: '', adjustQty: 0, adjustReason: '', opnameStarted: false, opnameItems: [],
      salesSearch: '', salesFilterMethod: 'all', selectedTransaction: null,
      returnInvoiceId: '', returnItems: [], showExpenseForm: false, expenseForm: { category:'',description:'',amount:0,paymentMethod:'Tunai' },
      showGenericForm: false, genericFormTitle: '', genericFormFields: [], genericFormData: {}, genericFormSave: null,
      showShiftModal: false, shiftModalAmount: 500000, saved: false,
    };
  },
  computed: {
    roleBadge: function() {
      if (!this.currentUser) return { label:'',color:'' };
      var b = { administrator:{label:'Admin',color:'badge-red'},owner:{label:'Owner',color:'badge-purple'},manager:{label:'Manager',color:'badge-blue'},cashier:{label:'Kasir',color:'badge-green'} };
      return b[this.currentUser.role] || {label:'',color:''};
    },
    filteredMenu: function() {
      var self = this;
      if (!this.currentUser) return [];
      return menuConfig.filter(function(item) { return self.hasRoleAccess(item.roles); });
    },
    currentPageLabel: function() {
      var all = [];
      menuConfig.forEach(function(m) {
        if (m.children) m.children.forEach(function(c) { all.push({id:c.id,label:c.label}); });
        else all.push({id:m.id,label:m.label});
      });
      var found = all.find(function(m) { return m.id === this.currentPage; }.bind(this));
      return found ? found.label : 'Dashboard';
    },
    filteredPosProducts: function() {
      var self = this;
      return this.products.filter(function(p) {
        if (p.status !== 'active') return false;
        var mc = self.posCategory === 'all' || p.categoryId === self.posCategory;
        var ms = p.name.toLowerCase().indexOf(self.posSearch.toLowerCase()) >= 0 || p.barcode.indexOf(self.posSearch) >= 0 || p.sku.toLowerCase().indexOf(self.posSearch.toLowerCase()) >= 0;
        return mc && ms;
      });
    },
    cartTotalItems: function() { return this.cart.reduce(function(s,i){return s+i.quantity;},0); },
    cartSubtotal: function() { return this.cart.reduce(function(s,i){return s+i.product.sellPrice*i.quantity;},0); },
    cartTax: function() { return Math.round((this.cartSubtotal - this.cartDiscount) * (this.storeSettings.taxRate / 100)); },
    cartGrandTotal: function() { return this.cartSubtotal - this.cartDiscount + this.cartTax; },
    cashValue: function() { return parseInt(String(this.cashInput).replace(/\D/g,'')) || 0; },
    cashChange: function() { return this.cashValue - this.cartGrandTotal; },
    isPaymentValid: function() { return this.paymentMethod === 'Tunai' ? this.cashValue >= this.cartGrandTotal : true; },
    filteredProducts: function() {
      var self = this;
      return this.products.filter(function(p) {
        var ms = p.name.toLowerCase().indexOf(self.productSearch.toLowerCase()) >= 0 || p.sku.toLowerCase().indexOf(self.productSearch.toLowerCase()) >= 0;
        var mc = self.productFilterCat === 'all' || p.categoryId === self.productFilterCat;
        return ms && mc;
      });
    },
    filteredPricingProducts: function() {
      var self = this;
      return this.products.filter(function(p) { return p.name.toLowerCase().indexOf(self.pricingSearch.toLowerCase()) >= 0; });
    },
    purchaseTotal: function() { return this.purchaseItems.reduce(function(s,i){return s+i.subtotal;},0); },
    pickerProducts: function() {
      var self = this;
      return this.products.filter(function(p) { return p.name.toLowerCase().indexOf(self.pickerSearch.toLowerCase()) >= 0 && p.status === 'active'; });
    },
    adjustProduct: function() { return this.products.find(function(p){return p.id===this.adjustProductId;}.bind(this)); },
    filteredSalesTransactions: function() {
      var self = this;
      return this.salesTransactions.filter(function(t) {
        var ms = t.invoiceNo.toLowerCase().indexOf(self.salesSearch.toLowerCase()) >= 0;
        var mm = self.salesFilterMethod === 'all' || t.paymentMethod === self.salesFilterMethod;
        return ms && mm;
      });
    },
    returnTransaction: function() { return this.salesTransactions.find(function(t){return t.id===this.returnInvoiceId;}.bind(this)); },
    reportProductSales: function() {
      var sales = {};
      this.salesTransactions.forEach(function(t) { t.items.forEach(function(item) {
        if (!sales[item.product.id]) sales[item.product.id] = {name:item.product.name,qty:0,revenue:0,cogs:0};
        sales[item.product.id].qty += item.quantity;
        sales[item.product.id].revenue += item.subtotal;
        sales[item.product.id].cogs += item.product.buyPrice * item.quantity;
      });});
      return Object.values(sales).sort(function(a,b){return b.revenue-a.revenue;});
    },
  },
  methods: {
    formatRupiah: function(n) { return 'Rp ' + (n||0).toLocaleString('id-ID'); },
    getCategoryName: function(id) { var c = this.categories.find(function(x){return x.id===id;}); return c ? c.name : '-'; },
    getBrandName: function(id) { var b = this.brands.find(function(x){return x.id===id;}); return b ? b.name : '-'; },
    getUnitName: function(id) { var u = this.units.find(function(x){return x.id===id;}); return u ? u.shortName : '-'; },
    getCategoryIcon: function(id) { var c = this.categories.find(function(x){return x.id===id;}); return c ? c.icon : 'fa-box'; },
    getCategoryColor: function(id) { var c = this.categories.find(function(x){return x.id===id;}); return c ? c.color : '#f3f4f6'; },
    hasRoleAccess: function(roles) { return this.currentUser && roles.indexOf(this.currentUser.role) >= 0; },
    login: function() {
      this.loginError = '';
      var user = this.users.find(function(u){return u.username===this.loginForm.username && u.password===this.loginForm.password && u.active;}.bind(this));
      if (user) { this.currentUser = user; this.currentPage = 'dashboard'; if (user.role === 'cashier') this.showShiftModal = true; }
      else this.loginError = 'Username atau password salah';
    },
    fillLogin: function(acc) { this.loginForm.username = acc.username; this.loginForm.password = acc.password; this.loginError = ''; },
    logout: function() { this.currentUser = null; this.currentShift = null; this.loginForm = {username:'',password:''}; },
    navigateTo: function(page) { this.currentPage = page; },
    toggleMenu: function(id) { var idx = this.expandedMenus.indexOf(id); if (idx>=0) this.expandedMenus.splice(idx,1); else this.expandedMenus.push(id); },
    startShift: function() {
      this.currentShift = { id:'SHF-'+Date.now(),cashierId:this.currentUser.id,cashierName:this.currentUser.name,terminal:'Kasir 1',openTime:new Date().toISOString(),closeTime:null,initialModal:this.shiftModalAmount,cashSales:0,nonCashSales:0,expenses:0,expectedCash:this.shiftModalAmount,status:'open' };
      this.showShiftModal = false;
    },
    addToCart: function(product) {
      if (product.stock <= 0) return;
      var existing = this.cart.find(function(i){return i.product.id===product.id;});
      if (existing) { if (existing.quantity < product.stock) existing.quantity++; }
      else this.cart.push({ product: JSON.parse(JSON.stringify(product)), quantity: 1 });
    },
    updateCartQty: function(pid, delta) {
      var item = this.cart.find(function(i){return i.product.id===pid;});
      if (!item) return;
      var nq = item.quantity + delta;
      if (nq <= 0) { this.cart = this.cart.filter(function(i){return i.product.id!==pid;}); return; }
      if (nq > item.product.stock) return;
      item.quantity = nq;
    },
    removeFromCart: function(pid) { this.cart = this.cart.filter(function(i){return i.product.id!==pid;}); },
    clearCart: function() { this.cart = []; this.cartDiscount = 0; },
    processPayment: function() {
      if (!this.isPaymentValid) return;
      var change = this.paymentMethod === 'Tunai' ? this.cashChange : 0;
      var payment = this.paymentMethod === 'Tunai' ? this.cashValue : this.cartGrandTotal;
      var t = { id:'TX-'+Date.now(),invoiceNo:'INV-'+String(Date.now()).slice(-6),items:JSON.parse(JSON.stringify(this.cart)),subtotal:this.cartSubtotal,discount:this.cartDiscount,tax:this.cartTax,total:this.cartGrandTotal,paymentMethod:this.paymentMethod,paymentAmount:payment,change:change,customerId:this.selectedCustomerId,customerName:(this.customers.find(function(c){return c.id===this.selectedCustomerId;}.bind(this))||{}).name||'Walk-in',cashierId:this.currentUser.id,cashierName:this.currentUser.name,date:new Date().toISOString(),status:'completed',shiftId:this.currentShift?this.currentShift.id:'' };
      this.salesTransactions.unshift(t);
      var self = this;
      this.cart.forEach(function(item) {
        var p = self.products.find(function(x){return x.id===item.product.id;});
        if (p) { var prev=p.stock; p.stock-=item.quantity; self.stockMutations.unshift({id:'SM-'+Date.now()+'-'+item.product.id,productId:item.product.id,productName:item.product.name,type:'out',quantity:item.quantity,previousStock:prev,newStock:p.stock,reference:t.invoiceNo,reason:'Penjualan',date:t.date,createdBy:self.currentUser.name}); }
      });
      if (this.currentShift) { if (this.paymentMethod==='Tunai') this.currentShift.cashSales+=this.cartGrandTotal; else this.currentShift.nonCashSales+=this.cartGrandTotal; }
      this.lastTransaction = t; this.showPaymentModal = false; this.showReceiptModal = true; this.cart = []; this.cartDiscount = 0; this.cashInput = '';
    },
    newTransaction: function() { this.showReceiptModal = false; this.lastTransaction = null; },
    openProductForm: function(product) {
      if (product) { this.editingProduct = product; this.productForm = JSON.parse(JSON.stringify(product)); }
      else { this.editingProduct = null; this.productForm = {name:'',sku:'',barcode:'',categoryId:'cat1',brandId:'b1',unitId:'u1',buyPrice:0,sellPrice:0,wholesalePrice:0,stock:0,minStock:10,status:'active'}; }
      this.showProductForm = true;
    },
    saveProduct: function() {
      if (this.editingProduct) Object.assign(this.editingProduct, this.productForm);
      else this.products.push(Object.assign({}, this.productForm, {id:'p'+Date.now()}));
      this.showProductForm = false;
    },
    deleteProduct: function(id) { if(confirm('Hapus produk?')) this.products = this.products.filter(function(p){return p.id!==id;}); },
    addProductToPurchase: function(product) {
      var ex = this.purchaseItems.find(function(i){return i.product.id===product.id;});
      if (ex) { ex.quantity++; ex.subtotal=ex.quantity*ex.buyPrice; }
      else this.purchaseItems.push({product:JSON.parse(JSON.stringify(product)),quantity:1,buyPrice:product.buyPrice,subtotal:product.buyPrice});
      this.showProductPicker = false; this.pickerSearch = '';
    },
    updatePurchaseQty: function(pid, qty) {
      var item = this.purchaseItems.find(function(i){return i.product.id===pid;});
      if (!item) return;
      if (qty<=0) this.purchaseItems = this.purchaseItems.filter(function(i){return i.product.id!==pid;});
      else { item.quantity=qty; item.subtotal=qty*item.buyPrice; }
    },
    updatePurchasePrice: function(pid, price) {
      var item = this.purchaseItems.find(function(i){return i.product.id===pid;});
      if (item) { item.buyPrice=price; item.subtotal=item.quantity*price; }
    },
    savePurchase: function() {
      if (this.purchaseItems.length===0) return;
      var supplier = this.suppliers.find(function(s){return s.id===this.purchaseSupplierId;}.bind(this));
      var po = { id:'PO-'+Date.now(),poNumber:'PUR-'+String(Date.now()).slice(-6),supplierId:this.purchaseSupplierId,supplierName:supplier?supplier.name:'',items:JSON.parse(JSON.stringify(this.purchaseItems)),total:this.purchaseTotal,date:new Date().toISOString(),status:'received',createdBy:this.currentUser.name };
      this.purchaseOrders.unshift(po);
      var self = this;
      this.purchaseItems.forEach(function(item) {
        var p = self.products.find(function(x){return x.id===item.product.id;});
        if (p) { var prev=p.stock; p.stock+=item.quantity; self.stockMutations.unshift({id:'SM-'+Date.now()+'-'+item.product.id,productId:item.product.id,productName:item.product.name,type:'in',quantity:item.quantity,previousStock:prev,newStock:p.stock,reference:po.poNumber,reason:'Pembelian',date:po.date,createdBy:po.createdBy}); }
      });
      this.purchaseItems = [];
      alert('Pembelian berhasil! Stok telah diperbarui.');
    },
    saveAdjustment: function() {
      if (!this.adjustProduct || this.adjustQty===0 || !this.adjustReason) return;
      var ns = this.adjustProduct.stock + this.adjustQty;
      if (ns<0) { alert('Stok tidak boleh negatif!'); return; }
      var prev = this.adjustProduct.stock;
      this.adjustProduct.stock = ns;
      this.stockMutations.unshift({id:'SM-'+Date.now(),productId:this.adjustProduct.id,productName:this.adjustProduct.name,type:'adjustment',quantity:Math.abs(this.adjustQty),previousStock:prev,newStock:ns,reference:'ADJ-'+Date.now(),reason:this.adjustReason,date:new Date().toISOString(),createdBy:this.currentUser.name});
      alert('Stok disesuaikan!'); this.adjustProductId=''; this.adjustQty=0; this.adjustReason='';
    },
    startOpname: function() { this.opnameItems = this.products.map(function(p){return {productId:p.id,systemStock:p.stock,physicalStock:p.stock,difference:0};}); this.opnameStarted = true; },
    updateOpnamePhysical: function(pid, val) { var item = this.opnameItems.find(function(i){return i.productId===pid;}); if(item){item.physicalStock=val;item.difference=val-item.systemStock;} },
    saveOpname: function() {
      var self = this;
      var adj = this.opnameItems.filter(function(i){return i.difference!==0;});
      adj.forEach(function(item) {
        var p = self.products.find(function(x){return x.id===item.productId;});
        if (p) { var prev=p.stock; p.stock=item.physicalStock; self.stockMutations.unshift({id:'SM-'+Date.now()+'-'+item.productId,productId:item.productId,productName:p.name,type:'opname',quantity:Math.abs(item.difference),previousStock:prev,newStock:item.physicalStock,reference:'OPNAME',reason:'Stock Opname',date:new Date().toISOString(),createdBy:self.currentUser.name}); }
      });
      alert('Opname selesai! '+adj.length+' penyesuaian.'); this.opnameStarted=false; this.opnameItems=[];
    },
    saveExpense: function() {
      if (!this.expenseForm.category || !this.expenseForm.description || this.expenseForm.amount===0) return;
      this.expenses.unshift(Object.assign({},this.expenseForm,{id:'EXP-'+Date.now(),date:new Date().toISOString(),createdBy:this.currentUser.name}));
      if (this.currentShift && this.expenseForm.paymentMethod==='Tunai') this.currentShift.expenses+=this.expenseForm.amount;
      this.showExpenseForm=false; this.expenseForm={category:'',description:'',amount:0,paymentMethod:'Tunai'};
    },
    openGenericForm: function(title, fields, data, saveFn) {
      this.genericFormTitle = title; this.genericFormFields = fields; this.genericFormData = data; this.genericFormSave = saveFn; this.showGenericForm = true;
    },
    saveGenericForm: function() { if(this.genericFormSave) this.genericFormSave(); this.showGenericForm=false; },
    processReturn: function() {
      if (!this.returnTransaction || this.returnItems.length===0) return;
      var self = this;
      var items = this.returnItems.map(function(ri) {
        var ci = self.returnTransaction.items.find(function(i){return i.product.id===ri.productId;});
        return {productId:ri.productId,productName:ci?ci.product.name:'',quantity:ri.quantity,price:ci?ci.product.sellPrice:0,subtotal:ci?ci.product.sellPrice*ri.quantity:0,reason:'Retur',restock:false};
      });
      var totalRefund = items.reduce(function(s,i){return s+i.subtotal;},0);
      this.salesReturns.unshift({id:'RET-'+Date.now(),returnNo:'RTN-'+String(Date.now()).slice(-6),originalInvoiceId:this.returnTransaction.id,originalInvoiceNo:this.returnTransaction.invoiceNo,items:items,totalRefund:totalRefund,date:new Date().toISOString(),processedBy:this.currentUser.name});
      alert('Retur berhasil!'); this.returnInvoiceId=''; this.returnItems=[];
    },
    toggleReturnItem: function(item) {
      var idx = this.returnItems.findIndex(function(r){return r.productId===item.product.id;});
      if (idx>=0) this.returnItems.splice(idx,1);
      else this.returnItems.push({productId:item.product.id,quantity:1,reason:'Barang rusak',restock:false});
    },
    resumeOrder: function(order) { this.cart = JSON.parse(JSON.stringify(order.items)); this.heldOrders = this.heldOrders.filter(function(o){return o.id!==order.id;}); this.currentPage='pos-new'; },
    deleteHeldOrder: function(id) { this.heldOrders = this.heldOrders.filter(function(o){return o.id!==id;}); },
    // Render functions for v-html pages
    renderDashboard: function() {
      var today = new Date().toDateString();
      var todaySales = this.salesTransactions.filter(function(t){return new Date(t.date).toDateString()===today;});
      var totalSales = this.salesTransactions.reduce(function(s,t){return s+t.total;},0);
      var todayTotal = todaySales.reduce(function(s,t){return s+t.total;},0);
      var cogs = this.salesTransactions.reduce(function(s,t){return s+t.items.reduce(function(is,i){return is+i.product.buyPrice*i.quantity;},0);},0);
      var netProfit = totalSales - cogs - this.expenses.reduce(function(s,e){return s+e.amount;},0);
      var lowStock = this.products.filter(function(p){return p.stock<=p.minStock;}).length;
      var totalStock = this.products.reduce(function(s,p){return s+p.stock;},0);
      return '<div style="margin-bottom:1.5rem;"><h2 style="font-size:1.2rem;font-weight:700;">Dashboard</h2><p style="font-size:0.8rem;color:#6b7280;">Ringkasan aktivitas toko</p></div>' +
        '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:0.75rem;margin-bottom:1.5rem;">' +
        '<div class="stat-card"><div class="stat-icon" style="background:#dcfce7;color:#16a34a;"><i class="fas fa-coins"></i></div><p style="font-size:0.7rem;color:#6b7280;">Penjualan Hari Ini</p><p style="font-size:0.95rem;font-weight:700;">'+this.formatRupiah(todayTotal)+'</p></div>' +
        '<div class="stat-card"><div class="stat-icon" style="background:#dbeafe;color:#2563eb;"><i class="fas fa-receipt"></i></div><p style="font-size:0.7rem;color:#6b7280;">Total Transaksi</p><p style="font-size:0.95rem;font-weight:700;">'+this.salesTransactions.length+'</p></div>' +
        '<div class="stat-card"><div class="stat-icon" style="background:#d1fae5;color:#059669;"><i class="fas fa-sack-dollar"></i></div><p style="font-size:0.7rem;color:#6b7280;">Keuntungan</p><p style="font-size:0.95rem;font-weight:700;">'+this.formatRupiah(netProfit)+'</p></div>' +
        '<div class="stat-card"><div class="stat-icon" style="background:#ffedd5;color:#ea580c;"><i class="fas fa-truck"></i></div><p style="font-size:0.7rem;color:#6b7280;">Pembelian</p><p style="font-size:0.95rem;font-weight:700;">'+this.formatRupiah(this.purchaseOrders.reduce(function(s,p){return s+p.total;},0))+'</p></div>' +
        '<div class="stat-card"><div class="stat-icon" style="background:#f3e8ff;color:#7c3aed;"><i class="fas fa-cubes"></i></div><p style="font-size:0.7rem;color:#6b7280;">Stok Produk</p><p style="font-size:0.95rem;font-weight:700;">'+totalStock.toLocaleString()+'</p></div>' +
        '<div class="stat-card"><div class="stat-icon" style="background:#fee2e2;color:#dc2626;"><i class="fas fa-exclamation-triangle"></i></div><p style="font-size:0.7rem;color:#6b7280;">Stok Menipis</p><p style="font-size:0.95rem;font-weight:700;">'+lowStock+'</p></div>' +
        '</div>' +
        '<div class="card" style="padding:2rem;text-align:center;"><i class="fas fa-chart-line" style="font-size:2rem;color:#93c5fd;margin-bottom:0.5rem;display:block;"></i><p style="color:#6b7280;">Mulai transaksi untuk melihat grafik penjualan</p></div>';
    },
    renderPOS: function() { return '<div id="pos-container" class="pos-layout"></div>'; },
    renderHeldOrders: function() { return '<div style="margin-bottom:1.5rem;"><h2 style="font-size:1.2rem;font-weight:700;">Pesanan Ditahan</h2></div>' + (this.heldOrders.length===0?'<div class="card" style="padding:3rem;text-align:center;"><i class="fas fa-pause-circle" style="font-size:3rem;color:#d1d5db;margin-bottom:1rem;display:block;"></i><p>Tidak ada pesanan ditahan</p></div>':'<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:0.75rem;">'+this.heldOrders.map(function(o){return '<div class="card" style="padding:1rem;"><p style="font-weight:500;">'+o.customerName+'</p><p style="font-size:0.7rem;color:#6b7280;">'+o.items.length+' item - '+this.formatRupiah(o.total)+'</p></div>';}.bind(this)).join('')+'</div>'); },
    renderSalesHistory: function() { return '<div style="margin-bottom:1.5rem;"><h2 style="font-size:1.2rem;font-weight:700;">Riwayat Penjualan</h2></div><div class="card" style="overflow:hidden;">'+(this.salesTransactions.length===0?'<div style="padding:3rem;text-align:center;"><p style="color:#6b7280;">Belum ada transaksi</p></div>':'<table class="tbl"><thead><tr><th>Invoice</th><th>Tanggal</th><th>Kasir</th><th>Pembayaran</th><th style="text-align:right;">Total</th></tr></thead><tbody>'+this.filteredSalesTransactions.map(function(t){return '<tr><td style="font-family:monospace;color:#2563eb;">'+t.invoiceNo+'</td><td>'+new Date(t.date).toLocaleString('id-ID')+'</td><td>'+t.cashierName+'</td><td><span class="badge badge-blue">'+t.paymentMethod+'</span></td><td style="text-align:right;font-weight:700;">'+this.formatRupiah(t.total)+'</td></tr>';}.bind(this)).join('')+'</tbody></table>')+'</div>'; },
    renderProductsAll: function() { return '<div class="flex items-center justify-between" style="margin-bottom:1rem;"><div><h2 style="font-size:1.2rem;font-weight:700;">Semua Produk</h2><p style="font-size:0.8rem;color:#6b7280;">'+this.products.length+' produk</p></div><button class="btn btn-primary" onclick="app.openProductForm(null)"><i class="fas fa-plus"></i> Tambah</button></div><div class="card" style="overflow:hidden;"><table class="tbl"><thead><tr><th>Nama</th><th>SKU</th><th>Kategori</th><th style="text-align:right;">Harga</th><th style="text-align:right;">Stok</th><th style="text-align:center;">Aksi</th></tr></thead><tbody>'+this.filteredProducts.map(function(p){return '<tr><td style="font-weight:500;">'+p.name+'</td><td style="font-family:monospace;font-size:0.7rem;">'+p.sku+'</td><td>'+this.getCategoryName(p.categoryId)+'</td><td style="text-align:right;">'+this.formatRupiah(p.sellPrice)+'</td><td style="text-align:right;"><span style="color:'+(p.stock<=p.minStock?'#dc2626':'#1f2937')+';font-weight:700;">'+p.stock+'</span></td><td style="text-align:center;"><button onclick="app.openProductForm(app.products.find(function(x){return x.id===\''+p.id+'\'}))" style="background:none;border:none;color:#2563eb;cursor:pointer;margin-right:0.5rem;"><i class="fas fa-edit"></i></button><button onclick="app.deleteProduct(\''+p.id+'\')" style="background:none;border:none;color:#dc2626;cursor:pointer;"><i class="fas fa-trash"></i></button></td></tr>';}.bind(this)).join('')+'</tbody></table></div>'; },
    renderCategories: function() { return '<div class="flex items-center justify-between" style="margin-bottom:1rem;"><h2 style="font-size:1.2rem;font-weight:700;">Kategori</h2><button class="btn btn-primary" onclick="app.openGenericForm(\'Tambah Kategori\',[{key:\'name\',label:\'Nama\',type:\'text\'}],{name:\'\'},function(){app.categories.push({id:\'cat\'+Date.now(),name:app.genericFormData.name,icon:\'fa-box\',color:\'#f3f4f6\'});})"><i class="fas fa-plus"></i> Tambah</button></div><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:0.75rem;">'+this.categories.map(function(c){return '<div class="card" style="padding:1rem;"><div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem;"><div style="width:2.5rem;height:2.5rem;border-radius:0.5rem;display:flex;align-items:center;justify-content:center;background:'+c.color+';"><i class="fas '+c.icon+'"></i></div><p style="font-weight:500;">'+c.name+'</p></div></div>';}).join('')+'</div>'; },
    renderBrands: function() { return '<div class="flex items-center justify-between" style="margin-bottom:1rem;"><h2 style="font-size:1.2rem;font-weight:700;">Brand</h2><button class="btn btn-primary" onclick="app.openGenericForm(\'Tambah Brand\',[{key:\'name\',label:\'Nama\',type:\'text\'},{key:\'description\',label:\'Deskripsi\',type:\'text\'}],{name:\'\',description:\'\'},function(){app.brands.push({id:\'b\'+Date.now(),name:app.genericFormData.name,description:app.genericFormData.description});})"><i class="fas fa-plus"></i> Tambah</button></div><div class="card" style="overflow:hidden;"><table class="tbl"><thead><tr><th>Nama</th><th>Deskripsi</th></tr></thead><tbody>'+this.brands.map(function(b){return '<tr><td style="font-weight:500;">'+b.name+'</td><td style="color:#6b7280;">'+(b.description||'-')+'</td></tr>';}).join('')+'</tbody></table></div>'; },
    renderUnits: function() { return '<div class="flex items-center justify-between" style="margin-bottom:1rem;"><h2 style="font-size:1.2rem;font-weight:700;">Unit</h2><button class="btn btn-primary" onclick="app.openGenericForm(\'Tambah Unit\',[{key:\'name\',label:\'Nama\',type:\'text\'},{key:\'shortName\',label:\'Singkatan\',type:\'text\'}],{name:\'\',shortName:\'\'},function(){app.units.push({id:\'u\'+Date.now(),name:app.genericFormData.name,shortName:app.genericFormData.shortName});})"><i class="fas fa-plus"></i> Tambah</button></div><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:0.75rem;">'+this.units.map(function(u){return '<div class="card" style="padding:1rem;text-align:center;"><p style="font-weight:700;font-size:1.1rem;color:#1d4ed8;">'+u.shortName+'</p><p style="font-size:0.7rem;color:#6b7280;">'+u.name+'</p></div>';}).join('')+'</div>'; },
    renderPricing: function() { return '<div style="margin-bottom:1rem;"><h2 style="font-size:1.2rem;font-weight:700;">Harga Produk</h2></div><div class="card" style="overflow:hidden;"><table class="tbl"><thead><tr><th>Produk</th><th style="text-align:right;">Beli</th><th style="text-align:right;">Jual</th><th style="text-align:right;">Grosir</th><th style="text-align:right;">Margin</th></tr></thead><tbody>'+this.filteredPricingProducts.map(function(p){var m=p.buyPrice>0?((p.sellPrice-p.buyPrice)/p.buyPrice*100).toFixed(1):0;return '<tr><td style="font-weight:500;">'+p.name+'</td><td style="text-align:right;">'+this.formatRupiah(p.buyPrice)+'</td><td style="text-align:right;font-weight:700;color:#1d4ed8;">'+this.formatRupiah(p.sellPrice)+'</td><td style="text-align:right;">'+this.formatRupiah(p.wholesalePrice)+'</td><td style="text-align:right;color:#16a34a;font-weight:500;">'+m+'%</td></tr>';}.bind(this)).join('')+'</tbody></table></div>'; },
    renderNewPurchase: function() { return '<div style="margin-bottom:1rem;"><h2 style="font-size:1.2rem;font-weight:700;">Pembelian Baru</h2></div><div class="card" style="padding:1rem;margin-bottom:1rem;"><div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;"><div><label style="font-size:0.7rem;font-weight:500;display:block;margin-bottom:0.25rem;">Supplier</label><select id="purchase-supplier" class="select" style="width:100%;">'+this.suppliers.map(function(s){return '<option value="'+s.id+'"'+(s.id===this.purchaseSupplierId?' selected':'')+'>'+s.name+'</option>';}.bind(this)).join('')+'</select></div></div></div><div class="card" style="padding:1rem;"><p style="font-weight:500;margin-bottom:0.5rem;">Item ('+this.purchaseItems.length+')</p>'+(this.purchaseItems.length===0?'<p style="color:#9ca3af;text-align:center;padding:1rem;">Belum ada produk</p>':this.purchaseItems.map(function(item){return '<div style="display:flex;align-items:center;gap:0.5rem;padding:0.5rem;border-bottom:1px solid #f3f4f6;"><div style="flex:1;"><p style="font-weight:500;font-size:0.8rem;">'+item.product.name+'</p></div><span>'+item.quantity+' x '+this.formatRupiah(item.buyPrice)+' = <strong>'+this.formatRupiah(item.subtotal)+'</strong></span></div>';}.bind(this)).join(''))+'<div style="display:flex;justify-content:space-between;align-items:center;margin-top:1rem;padding-top:0.5rem;border-top:1px solid #e5e7eb;"><span style="font-weight:700;font-size:1.1rem;">Total: '+this.formatRupiah(this.purchaseTotal)+'</span><button class="btn btn-success" onclick="app.savePurchase()"'+(this.purchaseItems.length===0?' disabled':'')+'><i class="fas fa-save"></i> Simpan</button></div></div>'; },
    renderPurchaseHistory: function() { return '<div style="margin-bottom:1rem;"><h2 style="font-size:1.2rem;font-weight:700;">Riwayat Pembelian</h2></div><div class="card" style="overflow:hidden;">'+(this.purchaseOrders.length===0?'<div style="padding:3rem;text-align:center;"><p style="color:#6b7280;">Belum ada pembelian</p></div>':'<table class="tbl"><thead><tr><th>No. PO</th><th>Supplier</th><th>Tanggal</th><th style="text-align:right;">Total</th></tr></thead><tbody>'+this.purchaseOrders.map(function(po){return '<tr><td style="font-family:monospace;color:#2563eb;">'+po.poNumber+'</td><td>'+po.supplierName+'</td><td>'+new Date(po.date).toLocaleDateString('id-ID')+'</td><td style="text-align:right;font-weight:700;">'+this.formatRupiah(po.total)+'</td></tr>';}.bind(this)).join('')+'</tbody></table>')+'</div>'; },
    renderSuppliers: function() { return '<div class="flex items-center justify-between" style="margin-bottom:1rem;"><h2 style="font-size:1.2rem;font-weight:700;">Supplier</h2><button class="btn btn-primary" onclick="app.openGenericForm(\'Tambah Supplier\',[{key:\'name\',label:\'Nama\',type:\'text\'},{key:\'phone\',label:\'Telepon\',type:\'text\'},{key:\'address\',label:\'Alamat\',type:\'text\'}],{name:\'\',phone:\'\',address:\'\'},function(){app.suppliers.push({id:\'s\'+Date.now(),name:app.genericFormData.name,phone:app.genericFormData.phone,address:app.genericFormData.address,active:true});})"><i class="fas fa-plus"></i> Tambah</button></div><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:0.75rem;">'+this.suppliers.map(function(s){return '<div class="card" style="padding:1rem;"><div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem;"><div style="width:2.5rem;height:2.5rem;background:#dbeafe;border-radius:0.5rem;display:flex;align-items:center;justify-content:center;"><i class="fas fa-handshake" style="color:#2563eb;"></i></div><p style="font-weight:500;">'+s.name+'</p></div><p style="font-size:0.7rem;color:#6b7280;"><i class="fas fa-phone" style="margin-right:0.25rem;"></i>'+s.phone+'</p></div>';}).join('')+'</div>'; },
    renderStock: function() { return '<div style="margin-bottom:1rem;"><h2 style="font-size:1.2rem;font-weight:700;">Stok Produk</h2><p style="font-size:0.8rem;color:#6b7280;">Nilai total: '+this.formatRupiah(this.products.reduce(function(s,p){return s+p.buyPrice*p.stock;},0))+'</p></div><div class="card" style="overflow:hidden;"><table class="tbl"><thead><tr><th>Produk</th><th>Kategori</th><th style="text-align:right;">Stok</th><th style="text-align:right;">Min</th><th style="text-align:center;">Status</th></tr></thead><tbody>'+this.products.map(function(p){return '<tr><td style="font-weight:500;">'+p.name+'</td><td>'+this.getCategoryName(p.categoryId)+'</td><td style="text-align:right;font-weight:700;color:'+(p.stock<=p.minStock?'#dc2626':'#1f2937')+';">'+p.stock+' '+this.getUnitName(p.unitId)+'</td><td style="text-align:right;color:#6b7280;">'+p.minStock+'</td><td style="text-align:center;">'+(p.stock===0?'<span class="badge badge-red">Habis</span>':p.stock<=p.minStock?'<span class="badge badge-yellow">Menipis</span>':'<span class="badge badge-green">Aman</span>')+'</td></tr>';}.bind(this)).join('')+'</tbody></table></div>'; },
    renderMutation: function() { return '<div style="margin-bottom:1rem;"><h2 style="font-size:1.2rem;font-weight:700;">Mutasi Stok</h2></div><div class="card" style="overflow:hidden;">'+(this.stockMutations.length===0?'<div style="padding:3rem;text-align:center;"><p style="color:#6b7280;">Belum ada mutasi</p></div>':'<table class="tbl"><thead><tr><th>Tanggal</th><th>Produk</th><th>Tipe</th><th style="text-align:right;">Qty</th><th style="text-align:right;">Akhir</th><th>Keterangan</th></tr></thead><tbody>'+this.stockMutations.map(function(m){return '<tr><td>'+new Date(m.date).toLocaleDateString('id-ID')+'</td><td style="font-weight:500;">'+m.productName+'</td><td><span class="badge '+(m.type==='in'?'badge-green':m.type==='out'?'badge-red':'badge-yellow')+'">'+(m.type==='in'?'Masuk':m.type==='out'?'Keluar':'Adjust')+'</span></td><td style="text-align:right;font-weight:700;">'+(m.type==='in'?'+':'-')+m.quantity+'</td><td style="text-align:right;">'+m.newStock+'</td><td style="color:#6b7280;">'+m.reason+'</td></tr>';}).join('')+'</tbody></table>')+'</div>'; },
    renderAdjustment: function() { return '<div style="margin-bottom:1rem;"><h2 style="font-size:1.2rem;font-weight:700;">Penyesuaian Stok</h2></div><div class="card" style="padding:1.5rem;max-width:36rem;margin:0 auto;"><div class="space-y-3"><div><label style="font-size:0.75rem;font-weight:500;display:block;margin-bottom:0.25rem;">Produk</label><select id="adjust-product" class="select" style="width:100%;"><option value="">-- Pilih --</option>'+this.products.map(function(p){return '<option value="'+p.id+'">'+p.name+' (Stok: '+p.stock+')</option>';}).join('')+'</select></div><div><label style="font-size:0.75rem;font-weight:500;display:block;margin-bottom:0.25rem;">Jumlah (+/-)</label><input id="adjust-qty" type="number" class="input" placeholder="Masukkan jumlah" /></div><div><label style="font-size:0.75rem;font-weight:500;display:block;margin-bottom:0.25rem;">Alasan</label><select id="adjust-reason" class="select" style="width:100%;"><option value="">-- Pilih --</option><option>Barang rusak</option><option>Barang hilang</option><option>Barang kadaluarsa</option><option>Selisih fisik</option></select></div><button class="btn btn-primary" style="width:100%;padding:0.75rem;" onclick="app.adjustProductId=document.getElementById(\'adjust-product\').value;app.adjustQty=parseInt(document.getElementById(\'adjust-qty\').value)||0;app.adjustReason=document.getElementById(\'adjust-reason\').value;app.saveAdjustment();"><i class="fas fa-save"></i> Simpan</button></div></div>'; },
    renderOpname: function() { if(!this.opnameStarted) return '<div style="margin-bottom:1rem;"><h2 style="font-size:1.2rem;font-weight:700;">Stock Opname</h2></div><div class="card" style="padding:3rem;text-align:center;"><i class="fas fa-clipboard-check" style="font-size:3rem;color:#93c5fd;margin-bottom:1rem;display:block;"></i><p style="font-weight:500;margin-bottom:1rem;">Mulai Stock Opname</p><button class="btn btn-primary" onclick="app.startOpname()"><i class="fas fa-play"></i> Mulai</button></div>'; return '<div class="flex items-center justify-between" style="margin-bottom:1rem;"><h2 style="font-size:1.2rem;font-weight:700;">Stock Opname</h2><button class="btn btn-success" onclick="app.saveOpname()"><i class="fas fa-check"></i> Simpan</button></div><div class="card" style="overflow:hidden;"><table class="tbl"><thead><tr><th>Produk</th><th style="text-align:right;">Sistem</th><th style="text-align:right;">Fisik</th><th style="text-align:right;">Selisih</th></tr></thead><tbody>'+this.opnameItems.map(function(item,idx){return '<tr'+(item.difference!==0?' style="background:#fef9c3;"':'')+'><td style="font-weight:500;">'+this.products.find(function(p){return p.id===item.productId;}).name+'</td><td style="text-align:right;">'+item.systemStock+'</td><td style="text-align:right;"><input type="number" value="'+item.physicalStock+'" onchange="app.updateOpnamePhysical(\''+item.productId+'\',parseInt(this.value)||0)" style="width:4rem;text-align:right;padding:0.2rem;border:1px solid #d1d5db;border-radius:0.25rem;" /></td><td style="text-align:right;font-weight:700;color:'+(item.difference===0?'#16a34a':item.difference>0?'#2563eb':'#dc2626')+';">'+(item.difference>0?'+':'')+item.difference+'</td></tr>';}.bind(this)).join('')+'</tbody></table></div>'; },
    renderCustomers: function() { return '<div class="flex items-center justify-between" style="margin-bottom:1rem;"><h2 style="font-size:1.2rem;font-weight:700;">Customer</h2><button class="btn btn-primary" onclick="app.openGenericForm(\'Tambah Customer\',[{key:\'name\',label:\'Nama\',type:\'text\'},{key:\'phone\',label:\'Telepon\',type:\'text\'}],{name:\'\',phone:\'\'},function(){app.customers.push({id:\'c\'+Date.now(),name:app.genericFormData.name,phone:app.genericFormData.phone,points:0,totalSpent:0,totalTransactions:0,isMember:false,joinDate:new Date().toISOString().split(\'T\')[0]});})"><i class="fas fa-plus"></i> Tambah</button></div><div class="card" style="overflow:hidden;"><table class="tbl"><thead><tr><th>Nama</th><th>Telepon</th><th>Member</th><th style="text-align:right;">Belanja</th></tr></thead><tbody>'+this.customers.map(function(c){return '<tr><td style="font-weight:500;">'+c.name+'</td><td>'+c.phone+'</td><td>'+(c.isMember?'<span class="badge badge-purple">'+c.memberCode+'</span>':'-')+'</td><td style="text-align:right;font-weight:700;">'+this.formatRupiah(c.totalSpent)+'</td></tr>';}.bind(this)).join('')+'</tbody></table></div>'; },
    renderMembers: function() { var members = this.customers.filter(function(c){return c.isMember;}); return '<div style="margin-bottom:1rem;"><h2 style="font-size:1.2rem;font-weight:700;">Member</h2><p style="font-size:0.8rem;color:#6b7280;">'+members.length+' member</p></div><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:0.75rem;">'+members.map(function(m){return '<div class="card" style="padding:1rem;"><div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.75rem;"><div style="width:2.5rem;height:2.5rem;background:#f3e8ff;border-radius:50%;display:flex;align-items:center;justify-content:center;"><i class="fas fa-id-card" style="color:#7c3aed;"></i></div><div><p style="font-weight:500;">'+m.name+'</p><p style="font-size:0.65rem;color:#7c3aed;">'+m.memberCode+'</p></div></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;text-align:center;"><div style="background:#f9fafb;border-radius:0.5rem;padding:0.5rem;"><p style="font-size:0.6rem;color:#6b7280;">Poin</p><p style="font-weight:700;color:#7c3aed;">'+m.points+'</p></div><div style="background:#f9fafb;border-radius:0.5rem;padding:0.5rem;"><p style="font-size:0.6rem;color:#6b7280;">Belanja</p><p style="font-weight:700;">'+this.formatRupiah(m.totalSpent)+'</p></div></div></div>';}.bind(this)).join('')+'</div>'; },
    renderTxSales: function() { return '<div style="margin-bottom:1rem;"><h2 style="font-size:1.2rem;font-weight:700;">Transaksi Penjualan</h2></div><div class="card" style="overflow:hidden;">'+(this.salesTransactions.length===0?'<div style="padding:3rem;text-align:center;"><p style="color:#6b7280;">Belum ada transaksi</p></div>':'<table class="tbl"><thead><tr><th>Invoice</th><th>Tanggal</th><th>Kasir</th><th>Pembayaran</th><th style="text-align:right;">Total</th></tr></thead><tbody>'+this.salesTransactions.map(function(t){return '<tr><td style="font-family:monospace;color:#2563eb;">'+t.invoiceNo+'</td><td>'+new Date(t.date).toLocaleString('id-ID')+'</td><td>'+t.cashierName+'</td><td><span class="badge badge-blue">'+t.paymentMethod+'</span></td><td style="text-align:right;font-weight:700;">'+this.formatRupiah(t.total)+'</td></tr>';}.bind(this)).join('')+'</tbody></table>')+'</div>'; },
    renderReturn: function() { return '<div style="margin-bottom:1rem;"><h2 style="font-size:1.2rem;font-weight:700;">Retur Penjualan</h2></div><div class="card" style="padding:1rem;"><p style="color:#6b7280;font-size:0.8rem;">Pilih invoice untuk proses retur</p></div>'+(this.salesReturns.length>0?'<div class="card" style="overflow:hidden;margin-top:1rem;"><table class="tbl"><thead><tr><th>No. Retur</th><th>Invoice</th><th style="text-align:right;">Refund</th></tr></thead><tbody>'+this.salesReturns.map(function(r){return '<tr><td style="font-family:monospace;">'+r.returnNo+'</td><td>'+r.originalInvoiceNo+'</td><td style="text-align:right;font-weight:700;color:#dc2626;">'+this.formatRupiah(r.totalRefund)+'</td></tr>';}.bind(this)).join('')+'</tbody></table></div>':''); },
    renderExpenses: function() { return '<div class="flex items-center justify-between" style="margin-bottom:1rem;"><div><h2 style="font-size:1.2rem;font-weight:700;">Pengeluaran</h2><p style="font-size:0.8rem;color:#6b7280;">Total: '+this.formatRupiah(this.expenses.reduce(function(s,e){return s+e.amount;},0))+'</p></div><button class="btn btn-danger" onclick="app.showExpenseForm=true"><i class="fas fa-plus"></i> Tambah</button></div><div class="card" style="overflow:hidden;">'+(this.expenses.length===0?'<div style="padding:3rem;text-align:center;"><p style="color:#6b7280;">Belum ada pengeluaran</p></div>':'<table class="tbl"><thead><tr><th>Tanggal</th><th>Kategori</th><th>Keterangan</th><th style="text-align:right;">Jumlah</th></tr></thead><tbody>'+this.expenses.map(function(e){return '<tr><td>'+new Date(e.date).toLocaleDateString('id-ID')+'</td><td>'+e.category+'</td><td>'+e.description+'</td><td style="text-align:right;font-weight:700;color:#dc2626;">'+this.formatRupiah(e.amount)+'</td></tr>';}.bind(this)).join('')+'</tbody></table>')+'</div>'; },
    renderReportSales: function() { var ts=this.salesTransactions.reduce(function(s,t){return s+t.total;},0); return '<div style="margin-bottom:1rem;"><h2 style="font-size:1.2rem;font-weight:700;">Laporan Penjualan</h2></div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:0.75rem;"><div class="card" style="padding:1rem;"><p style="font-size:0.7rem;color:#6b7280;">Total Sales</p><p style="font-size:1.2rem;font-weight:700;color:#16a34a;">'+this.formatRupiah(ts)+'</p></div><div class="card" style="padding:1rem;"><p style="font-size:0.7rem;color:#6b7280;">Transaksi</p><p style="font-size:1.2rem;font-weight:700;color:#2563eb;">'+this.salesTransactions.length+'</p></div><div class="card" style="padding:1rem;"><p style="font-size:0.7rem;color:#6b7280;">Rata-rata</p><p style="font-size:1.2rem;font-weight:700;color:#7c3aed;">'+this.formatRupiah(this.salesTransactions.length>0?ts/this.salesTransactions.length:0)+'</p></div></div>'; },
    renderReportProduct: function() { return '<div style="margin-bottom:1rem;"><h2 style="font-size:1.2rem;font-weight:700;">Laporan Produk</h2></div><div class="card" style="overflow:hidden;">'+(this.reportProductSales.length===0?'<div style="padding:2rem;text-align:center;"><p style="color:#6b7280;">Belum ada data</p></div>':'<table class="tbl"><thead><tr><th>Produk</th><th style="text-align:right;">Terjual</th><th style="text-align:right;">Omzet</th><th style="text-align:right;">Profit</th></tr></thead><tbody>'+this.reportProductSales.map(function(p){return '<tr><td style="font-weight:500;">'+p.name+'</td><td style="text-align:right;">'+p.qty+' pcs</td><td style="text-align:right;font-weight:700;">'+this.formatRupiah(p.revenue)+'</td><td style="text-align:right;font-weight:700;color:#16a34a;">'+this.formatRupiah(p.revenue-p.cogs)+'</td></tr>';}.bind(this)).join('')+'</tbody></table>')+'</div>'; },
    renderReportPurchase: function() { return '<div style="margin-bottom:1rem;"><h2 style="font-size:1.2rem;font-weight:700;">Laporan Pembelian</h2></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;"><div class="card" style="padding:1rem;"><p style="font-size:0.7rem;color:#6b7280;">Total</p><p style="font-size:1.2rem;font-weight:700;color:#ea580c;">'+this.formatRupiah(this.purchaseOrders.reduce(function(s,p){return s+p.total;},0))+'</p></div><div class="card" style="padding:1rem;"><p style="font-size:0.7rem;color:#6b7280;">Jumlah PO</p><p style="font-size:1.2rem;font-weight:700;">'+this.purchaseOrders.length+'</p></div></div>'; },
    renderReportStock: function() { return '<div style="margin-bottom:1rem;"><h2 style="font-size:1.2rem;font-weight:700;">Laporan Stok</h2></div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:0.75rem;"><div class="card" style="padding:1rem;"><p style="font-size:0.7rem;color:#6b7280;">Produk</p><p style="font-size:1.2rem;font-weight:700;">'+this.products.length+'</p></div><div class="card" style="padding:1rem;"><p style="font-size:0.7rem;color:#6b7280;">Nilai Stok</p><p style="font-size:1.2rem;font-weight:700;color:#2563eb;">'+this.formatRupiah(this.products.reduce(function(s,p){return s+p.buyPrice*p.stock;},0))+'</p></div><div class="card" style="padding:1rem;"><p style="font-size:0.7rem;color:#6b7280;">Menipis</p><p style="font-size:1.2rem;font-weight:700;color:#dc2626;">'+this.products.filter(function(p){return p.stock<=p.minStock;}).length+'</p></div></div>'; },
    renderReportProfit: function() { var ts=this.salesTransactions.reduce(function(s,t){return s+t.total;},0); var cogs=this.salesTransactions.reduce(function(s,t){return s+t.items.reduce(function(is,i){return is+i.product.buyPrice*i.quantity;},0);},0); var exp=this.expenses.reduce(function(s,e){return s+e.amount;},0); var gp=ts-cogs; var np=gp-exp; return '<div style="margin-bottom:1rem;"><h2 style="font-size:1.2rem;font-weight:700;">Laporan Keuntungan</h2></div><div class="card" style="padding:1.5rem;max-width:32rem;margin:0 auto;"><div class="space-y-3"><div style="display:flex;justify-content:space-between;padding:0.75rem;background:#f0fdf4;border-radius:0.5rem;"><span>Sales</span><span style="font-weight:700;color:#16a34a;">'+this.formatRupiah(ts)+'</span></div><div style="display:flex;justify-content:space-between;padding:0.75rem;background:#fef2f2;border-radius:0.5rem;"><span>COGS</span><span style="font-weight:700;color:#dc2626;">- '+this.formatRupiah(cogs)+'</span></div><div style="display:flex;justify-content:space-between;padding:0.75rem;background:#eff6ff;border-radius:0.5rem;font-weight:700;"><span>Gross Profit</span><span style="color:#2563eb;">'+this.formatRupiah(gp)+'</span></div><div style="display:flex;justify-content:space-between;padding:0.75rem;background:#fff7ed;border-radius:0.5rem;"><span>Expense</span><span style="font-weight:700;color:#ea580c;">- '+this.formatRupiah(exp)+'</span></div><div style="display:flex;justify-content:space-between;padding:1rem;background:linear-gradient(to right,#16a34a,#059669);border-radius:0.5rem;color:white;margin-top:0.5rem;"><span style="font-weight:700;">NET PROFIT</span><span style="font-size:1.5rem;font-weight:700;">'+this.formatRupiah(np)+'</span></div></div></div>'; },
    renderReportCash: function() { var cs=this.salesTransactions.filter(function(t){return t.paymentMethod==='Tunai';}).reduce(function(s,t){return s+t.total;},0); var nc=this.salesTransactions.filter(function(t){return t.paymentMethod!=='Tunai';}).reduce(function(s,t){return s+t.total;},0); var exp=this.expenses.reduce(function(s,e){return s+e.amount;},0); return '<div style="margin-bottom:1rem;"><h2 style="font-size:1.2rem;font-weight:700;">Laporan Kas</h2></div><div class="card" style="padding:1.5rem;max-width:32rem;margin:0 auto;"><div class="space-y-3"><div style="display:flex;justify-content:space-between;padding:0.75rem;background:#f0fdf4;border-radius:0.5rem;"><span>Cash Sales</span><span style="font-weight:700;color:#16a34a;">'+this.formatRupiah(cs)+'</span></div><div style="display:flex;justify-content:space-between;padding:0.75rem;background:#eff6ff;border-radius:0.5rem;"><span>Non-Cash</span><span style="font-weight:700;color:#2563eb;">'+this.formatRupiah(nc)+'</span></div><div style="display:flex;justify-content:space-between;padding:0.75rem;background:#fef2f2;border-radius:0.5rem;"><span>Pengeluaran</span><span style="font-weight:700;color:#dc2626;">- '+this.formatRupiah(exp)+'</span></div>'+(this.currentShift?'<div style="display:flex;justify-content:space-between;padding:1rem;background:linear-gradient(to right,#2563eb,#1d4ed8);border-radius:0.5rem;color:white;"><span style="font-weight:700;">Expected Cash</span><span style="font-size:1.3rem;font-weight:700;">'+this.formatRupiah(this.currentShift.initialModal+this.currentShift.cashSales-this.currentShift.expenses)+'</span></div>':'')+'</div></div>'; },
    renderSettingsStore: function() { return '<div style="margin-bottom:1rem;"><h2 style="font-size:1.2rem;font-weight:700;">Pengaturan Toko</h2></div><div class="card" style="padding:1.5rem;max-width:32rem;"><div class="space-y-3"><div><label style="font-size:0.75rem;font-weight:500;display:block;margin-bottom:0.25rem;">Nama Toko</label><input id="set-name" class="input" value="'+this.storeSettings.name+'" /></div><div><label style="font-size:0.75rem;font-weight:500;display:block;margin-bottom:0.25rem;">Alamat</label><input id="set-addr" class="input" value="'+this.storeSettings.address+'" /></div><div><label style="font-size:0.75rem;font-weight:500;display:block;margin-bottom:0.25rem;">Pajak (%)</label><input id="set-tax" type="number" class="input" value="'+this.storeSettings.taxRate+'" /></div><button class="btn btn-primary" style="width:100%;padding:0.75rem;" onclick="app.storeSettings.name=document.getElementById(\'set-name\').value;app.storeSettings.address=document.getElementById(\'set-addr\').value;app.storeSettings.taxRate=parseInt(document.getElementById(\'set-tax\').value)||0;alert(\'Tersimpan!\');"><i class="fas fa-save"></i> Simpan</button></div></div>'; },
    renderSettingsBranch: function() { return '<div style="margin-bottom:1rem;"><h2 style="font-size:1.2rem;font-weight:700;">Cabang</h2></div>'+this.branches.map(function(b){return '<div class="card" style="padding:1rem;margin-bottom:0.5rem;"><p style="font-weight:500;">'+b.name+'</p><p style="font-size:0.7rem;color:#6b7280;">'+b.address+'</p></div>';}).join(''); },
    renderSettingsUsers: function() { var self=this; return '<div class="flex items-center justify-between" style="margin-bottom:1rem;"><h2 style="font-size:1.2rem;font-weight:700;">User</h2><button class="btn btn-primary" onclick="app.openGenericForm(\'Tambah User\',[{key:\'name\',label:\'Nama\',type:\'text\'},{key:\'username\',label:\'Username\',type:\'text\'},{key:\'password\',label:\'Password\',type:\'text\'}],{name:\'\',username:\'\',password:\'\',role:\'cashir\'},function(){var perms=app.genericFormData.role===\'administrator\'||app.genericFormData.role===\'owner\'?[\'*\']:[\'pos\',\'pos-new\'];app.users.push({id:\'u\'+Date.now(),name:app.genericFormData.name,username:app.genericFormData.username,password:app.genericFormData.password,role:\'cashier\',active:true,permissions:perms});})"><i class="fas fa-plus"></i> Tambah</button></div><div class="card" style="overflow:hidden;"><table class="tbl"><thead><tr><th>Nama</th><th>Username</th><th>Role</th><th>Status</th></tr></thead><tbody>'+this.users.map(function(u){var badges={administrator:'badge-red',owner:'badge-purple',manager:'badge-blue',cashier:'badge-green'};var labels={administrator:'Admin',owner:'Owner',manager:'Manager',cashier:'Kasir'};return '<tr><td style="font-weight:500;">'+u.name+'</td><td style="font-family:monospace;font-size:0.7rem;">'+u.username+'</td><td><span class="badge '+(badges[u.role]||'')+'">'+(labels[u.role]||u.role)+'</span></td><td><span class="badge '+(u.active?'badge-green':'badge-red')+'">'+(u.active?'Aktif':'Nonaktif')+'</span></td></tr>';}).join('')+'</tbody></table></div>'; },
    renderSettingsRoles: function() { return '<div style="margin-bottom:1rem;"><h2 style="font-size:1.2rem;font-weight:700;">Role & Permission</h2></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;"><div class="card" style="padding:1rem;"><span class="badge badge-red">Administrator</span><p style="font-size:0.8rem;margin-top:0.5rem;">Akses penuh</p><p style="font-size:0.7rem;color:#6b7280;margin-top:0.25rem;">Semua modul</p></div><div class="card" style="padding:1rem;"><span class="badge badge-purple">Owner</span><p style="font-size:0.8rem;margin-top:0.5rem;">Akses penuh</p><p style="font-size:0.7rem;color:#6b7280;margin-top:0.25rem;">Semua modul</p></div><div class="card" style="padding:1rem;"><span class="badge badge-blue">Manager</span><p style="font-size:0.8rem;margin-top:0.5rem;">Operasional</p><p style="font-size:0.7rem;color:#6b7280;margin-top:0.25rem;">Dashboard, POS, Produk, Pembelian, Inventory, Customer, Transaksi, Laporan</p></div><div class="card" style="padding:1rem;"><span class="badge badge-green">Kasir</span><p style="font-size:0.8rem;margin-top:0.5rem;">Hanya kasir</p><p style="font-size:0.7rem;color:#6b7280;margin-top:0.25rem;">POS - Penjualan, Pesanan Ditahan, Riwayat</p></div></div>'; },
    renderSettingsPayment: function() { return '<div style="margin-bottom:1rem;"><h2 style="font-size:1.2rem;font-weight:700;">Metode Pembayaran</h2></div><div class="space-y-2" style="max-width:32rem;">'+this.paymentMethods.map(function(pm){return '<div class="card" style="padding:1rem;display:flex;align-items:center;justify-content:space-between;"><div style="display:flex;align-items:center;gap:0.5rem;"><div style="width:2.5rem;height:2.5rem;background:#dbeafe;border-radius:0.5rem;display:flex;align-items:center;justify-content:center;"><i class="fas '+pm.icon+'" style="color:#2563eb;"></i></div><div><p style="font-weight:500;">'+pm.name+'</p><p style="font-size:0.65rem;color:#6b7280;">'+pm.type+'</p></div></div><span class="badge '+(pm.active?'badge-green':'badge-gray')+'">'+(pm.active?'Aktif':'Nonaktif')+'</span></div>';}).join('')+'</div>'; },
    renderSettingsPrinter: function() { return '<div style="margin-bottom:1rem;"><h2 style="font-size:1.2rem;font-weight:700;">Printer</h2></div>'+this.printers.map(function(p){return '<div class="card" style="padding:1rem;margin-bottom:0.5rem;display:flex;justify-content:space-between;align-items:center;"><div><p style="font-weight:500;">'+p.name+'</p><p style="font-size:0.7rem;color:#6b7280;">'+p.type+' • '+p.connection+'</p></div><span class="badge '+(p.active?'badge-green':'badge-gray')+'">'+(p.active?'Aktif':'Nonaktif')+'</span></div>';}).join(''); },
    renderSettingsReceipt: function() { return '<div style="margin-bottom:1rem;"><h2 style="font-size:1.2rem;font-weight:700;">Pengaturan Struk</h2></div><div class="card" style="padding:1.5rem;max-width:32rem;"><div class="space-y-3"><div><label style="font-size:0.75rem;font-weight:500;display:block;margin-bottom:0.25rem;">Header</label><input id="rcpt-hdr" class="input" value="'+this.receiptTemplate.header+'" /></div><div><label style="font-size:0.75rem;font-weight:500;display:block;margin-bottom:0.25rem;">Footer</label><input id="rcpt-ftr" class="input" value="'+this.receiptTemplate.footer+'" /></div><button class="btn btn-primary" style="width:100%;padding:0.75rem;" onclick="app.receiptTemplate.header=document.getElementById(\'rcpt-hdr\').value;app.receiptTemplate.footer=document.getElementById(\'rcpt-ftr\').value;alert(\'Tersimpan!\');"><i class="fas fa-save"></i> Simpan</button></div></div>'; },
  },
  watch: {
    currentPage: function(val) { if (val === 'pos-new') { var self = this; this.$nextTick(function() { self.renderPOSInteractive(); }); } },
    cart: function() { if (this.currentPage === 'pos-new') { var self = this; this.$nextTick(function() { self.renderPOSInteractive(); }); } },
    posSearch: function() { if (this.currentPage === 'pos-new') { var self = this; this.$nextTick(function() { self.renderPOSInteractive(); }); } },
    posCategory: function() { if (this.currentPage === 'pos-new') { var self = this; this.$nextTick(function() { self.renderPOSInteractive(); }); } },
  },
});

// Add POS interactive rendering
app.renderPOSInteractive = function() {
  var self = this;
  var container = document.getElementById('pos-container');
  if (!container) return;
  
  var products = this.filteredPosProducts;
  var cartHtml = '';
  
  if (this.cart.length === 0) {
    cartHtml = '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:#9ca3af;padding:1.5rem;"><i class="fas fa-cart-shopping" style="font-size:2.5rem;margin-bottom:0.75rem;opacity:0.3;"></i><p style="font-size:0.75rem;font-weight:500;">Keranjang kosong</p></div>';
  } else {
    cartHtml = '<div class="divide-y">' + this.cart.map(function(item) {
      return '<div style="padding:0.6rem;"><div style="display:flex;align-items:start;gap:0.5rem;"><div style="flex:1;min-width:0;"><h4 style="font-size:0.7rem;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + item.product.name + '</h4><p style="font-size:0.6rem;color:#6b7280;">' + self.formatRupiah(item.product.sellPrice) + ' × ' + item.quantity + '</p></div><button onclick="app.removeFromCart(\'' + item.product.id + '\')" style="background:none;border:none;color:#f87171;cursor:pointer;font-size:0.6rem;"><i class="fas fa-trash"></i></button></div><div style="display:flex;align-items:center;justify-content:space-between;margin-top:0.4rem;"><div style="display:flex;align-items:center;gap:0.25rem;"><button onclick="app.updateCartQty(\'' + item.product.id + '\',-1)" style="width:1.4rem;height:1.4rem;border-radius:0.25rem;background:#f3f4f6;border:none;cursor:pointer;font-weight:700;">−</button><span style="width:2rem;text-align:center;font-size:0.7rem;font-weight:700;">' + item.quantity + '</span><button onclick="app.updateCartQty(\'' + item.product.id + '\',1)" style="width:1.4rem;height:1.4rem;border-radius:0.25rem;background:#f3f4f6;border:none;cursor:pointer;font-weight:700;">+</button></div><p style="font-size:0.7rem;font-weight:700;color:#1d4ed8;">' + self.formatRupiah(item.product.sellPrice * item.quantity) + '</p></div></div>';
    }).join('') + '</div>';
  }

  container.innerHTML = '<div class="pos-products"><div style="padding:0.75rem;background:white;border-bottom:1px solid #e5e7eb;"><div style="position:relative;margin-bottom:0.5rem;"><i class="fas fa-search" style="position:absolute;left:0.75rem;top:50%;transform:translateY(-50%);color:#9ca3af;"></i><input id="pos-search-input" type="text" placeholder="🔍 Scan barcode / Cari produk..." class="input" style="padding-left:2.5rem;" value="' + (this.posSearch || '') + '" /></div><div class="category-bar" style="padding:0;margin:0 -0.75rem;padding:0 0.75rem;"><button class="cat-btn ' + (this.posCategory === 'all' ? 'active' : '') + '" onclick="app.posCategory=\'all\'"><i class="fas fa-border-all" style="margin-right:0.2rem;"></i>Semua</button>' + this.categories.map(function(c) { return '<button class="cat-btn ' + (self.posCategory === c.id ? 'active' : '') + '" onclick="app.posCategory=\'' + c.id + '\'"><i class="fas ' + c.icon + '" style="margin-right:0.2rem;"></i>' + c.name + '</button>'; }).join('') + '</div></div><div class="product-grid">' + products.map(function(p) { return '<button class="product-card" ' + (p.stock <= 0 ? 'disabled' : 'onclick="app.addToCart(app.products.find(function(x){return x.id===\'' + p.id + '\'}))"') + '><div class="product-icon" style="background:' + self.getCategoryColor(p.categoryId) + '"><i class="fas ' + self.getCategoryIcon(p.categoryId) + '"></i></div><h3 class="line-clamp-2" style="font-size:0.65rem;font-weight:600;margin-bottom:0.2rem;">' + p.name + '</h3><p style="font-size:0.8rem;font-weight:700;color:#1d4ed8;">' + self.formatRupiah(p.sellPrice) + '</p><div style="display:flex;justify-content:space-between;margin-top:0.2rem;"><span class="badge ' + (p.stock > p.minStock ? 'badge-green' : p.stock > 0 ? 'badge-yellow' : 'badge-red') + '" style="font-size:0.55rem;">' + p.stock + ' ' + self.getUnitName(p.unitId) + '</span><span style="font-size:0.55rem;color:#9ca3af;">' + p.sku + '</span></div></button>'; }).join('') + '</div></div><div class="pos-cart"><div style="background:linear-gradient(to right,#2563eb,#1d4ed8);color:white;padding:0.75rem;"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.25rem;"><div style="display:flex;align-items:center;gap:0.5rem;"><i class="fas fa-shopping-cart"></i><h2 style="font-weight:700;font-size:0.8rem;">Keranjang</h2></div><span style="background:rgba(255,255,255,0.2);padding:0.15rem 0.5rem;border-radius:9999px;font-size:0.65rem;">' + this.cartTotalItems + ' item</span></div><p style="font-size:1.3rem;font-weight:700;">' + this.formatRupiah(this.cartGrandTotal) + '</p></div><div style="padding:0.5rem;border-bottom:1px solid #e5e7eb;background:#f9fafb;"><select id="pos-customer" class="select" style="width:100%;font-size:0.7rem;padding:0.3rem;" onchange="app.selectedCustomerId=this.value">' + this.customers.map(function(c) { return '<option value="' + c.id + '"' + (c.id === self.selectedCustomerId ? ' selected' : '') + '>' + c.name + (c.isMember ? ' (' + c.memberCode + ')' : '') + '</option>'; }).join('') + '</select></div><div style="flex:1;overflow-y:auto;">' + cartHtml + '</div><div style="border-top:1px solid #e5e7eb;background:#f9fafb;padding:0.75rem;"><div style="display:flex;justify-content:space-between;font-size:0.7rem;margin-bottom:0.3rem;"><span style="color:#6b7280;">Subtotal</span><span style="font-weight:500;">' + this.formatRupiah(this.cartSubtotal) + '</span></div><div style="display:flex;justify-content:space-between;font-size:0.7rem;margin-bottom:0.3rem;"><span style="color:#6b7280;">PPN (' + this.storeSettings.taxRate + '%)</span><span style="font-weight:500;">' + this.formatRupiah(this.cartTax) + '</span></div><div style="display:flex;justify-content:space-between;font-size:1rem;font-weight:700;border-top:1px solid #e5e7eb;padding-top:0.4rem;margin-top:0.3rem;"><span>TOTAL</span><span style="color:#1d4ed8;">' + this.formatRupiah(this.cartGrandTotal) + '</span></div><div style="display:flex;gap:0.5rem;margin-top:0.5rem;"><button onclick="app.clearCart()" class="btn btn-secondary" style="font-size:0.7rem;padding:0.5rem 0.75rem;"' + (this.cart.length === 0 ? ' disabled' : '') + '><i class="fas fa-times"></i> Batal</button><button onclick="app.showPaymentModal=true" class="btn btn-success" style="flex:1;font-size:0.7rem;padding:0.5rem;"' + (this.cart.length === 0 ? ' disabled' : '') + '><i class="fas fa-credit-card"></i> BAYAR</button></div></div></div>';

  // Re-bind search input
  var searchInput = document.getElementById('pos-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', function(e) { self.posSearch = e.target.value; });
  }
};
