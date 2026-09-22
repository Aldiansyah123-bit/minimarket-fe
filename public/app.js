// ==================== VUEX STORE ====================
const store = new Vuex.Store({
   {
    currentUser: null,
    loginError: '',
    currentPage: 'dashboard',
    sidebarCollapsed: false,
    expandedMenus: ['pos'],
    users: [
      { id: 'u1', username: 'admin', password: 'admin123', name: 'Administrator', role: 'administrator', active: true },
      { id: 'u2', username: 'owner', password: 'owner123', name: 'Budi Santoso', role: 'owner', active: true },
      { id: 'u3', username: 'manager', password: 'manager123', name: 'Siti Rahayu', role: 'manager', active: true },
      { id: 'u4', username: 'kasir1', password: 'kasir123', name: 'Aldi Pratama', role: 'cashier', active: true },
    ],
    categories: [
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
    ],
    brands: [
      { id: 'b1', name: 'Indomie' }, { id: 'b2', name: 'Aqua' }, { id: 'b3', name: 'Teh Pucuk' },
      { id: 'b4', name: 'Coca Cola' }, { id: 'b5', name: 'Unilever' }, { id: 'b6', name: 'P&G' },
      { id: 'b7', name: 'Nestle' }, { id: 'b8', name: 'Sari Roti' }, { id: 'b9', name: 'Kapal Api' },
      { id: 'b10', name: 'ABC' },
    ],
    units: [
      { id: 'u1', name: 'Pieces', shortName: 'PCS' },
      { id: 'u2', name: 'Box', shortName: 'BOX' },
      { id: 'u3', name: 'Pack', shortName: 'PACK' },
      { id: 'u4', name: 'Kilogram', shortName: 'KG' },
      { id: 'u5', name: 'Liter', shortName: 'L' },
    ],
    products: [
      { id:'p1',name:'Indomie Goreng',sku:'IND-GOR',barcode:'8991234567001',categoryId:'cat1',brandId:'b1',unitId:'u1',buyPrice:2500,sellPrice:3500,stock:150,minStock:20,status:'active' },
      { id:'p2',name:'Indomie Kuah Soto',sku:'IND-SOT',barcode:'8991234567002',categoryId:'cat1',brandId:'b1',unitId:'u1',buyPrice:2500,sellPrice:3500,stock:120,minStock:20,status:'active' },
      { id:'p3',name:'Aqua 600ml',sku:'AQU-600',barcode:'8991234567009',categoryId:'cat2',brandId:'b2',unitId:'u1',buyPrice:2000,sellPrice:4000,stock:200,minStock:30,status:'active' },
      { id:'p4',name:'Teh Pucuk 350ml',sku:'TEH-350',barcode:'8991234567010',categoryId:'cat2',brandId:'b3',unitId:'u1',buyPrice:3000,sellPrice:5000,stock:8,minStock:20,status:'active' },
      { id:'p5',name:'Coca Cola 390ml',sku:'COC-390',barcode:'8991234567011',categoryId:'cat2',brandId:'b4',unitId:'u1',buyPrice:5000,sellPrice:7500,stock:80,minStock:15,status:'active' },
      { id:'p6',name:'Sprite 390ml',sku:'SPR-390',barcode:'8991234567012',categoryId:'cat2',brandId:'b4',unitId:'u1',buyPrice:5000,sellPrice:7500,stock:75,minStock:15,status:'active' },
      { id:'p7',name:'Ultra Milk 250ml',sku:'ULM-250',barcode:'8991234567014',categoryId:'cat2',brandId:'b7',unitId:'u1',buyPrice:3500,sellPrice:5500,stock:100,minStock:20,status:'active' },
      { id:'p8',name:'Chitato Sapi Panggang',sku:'CHT-SPG',barcode:'8991234567017',categoryId:'cat3',brandId:'b7',unitId:'u1',buyPrice:7500,sellPrice:10500,stock:70,minStock:10,status:'active' },
      { id:'p9',name:'Oreo Original',sku:'ORE-ORG',barcode:'8991234567019',categoryId:'cat3',brandId:'b7',unitId:'u1',buyPrice:6000,sellPrice:8500,stock:65,minStock:10,status:'active' },
      { id:'p10',name:'Silverqueen Cashew',sku:'SLV-CSH',barcode:'8991234567022',categoryId:'cat3',brandId:'b7',unitId:'u1',buyPrice:13000,sellPrice:17000,stock:40,minStock:8,status:'active' },
      { id:'p11',name:'Beras Premium 5kg',sku:'BRS-PRM',barcode:'8991234567004',categoryId:'cat4',brandId:'b10',unitId:'u1',buyPrice:60000,sellPrice:75000,stock:30,minStock:5,status:'active' },
      { id:'p12',name:'Minyak Goreng 2L',sku:'MYK-2LT',barcode:'8991234567005',categoryId:'cat4',brandId:'b10',unitId:'u1',buyPrice:28000,sellPrice:35000,stock:45,minStock:10,status:'active' },
      { id:'p13',name:'Gula Pasir 1kg',sku:'GUL-1KG',barcode:'8991234567006',categoryId:'cat4',brandId:'b10',unitId:'u4',buyPrice:12000,sellPrice:15000,stock:5,minStock:10,status:'active' },
      { id:'p14',name:'Kopi Kapal Api',sku:'KPA-SCH',barcode:'8991234567007',categoryId:'cat1',brandId:'b9',unitId:'u1',buyPrice:1500,sellPrice:2500,stock:200,minStock:30,status:'active' },
      { id:'p15',name:'Roti Tawar Sari Roti',sku:'RTI-TWR',barcode:'8991234567008',categoryId:'cat1',brandId:'b8',unitId:'u1',buyPrice:13000,sellPrice:18000,stock:25,minStock:5,status:'active' },
      { id:'p16',name:'Sabun Lifebuoy',sku:'SBN-LFB',barcode:'8991234567025',categoryId:'cat7',brandId:'b5',unitId:'u1',buyPrice:3000,sellPrice:4500,stock:100,minStock:20,status:'active' },
      { id:'p17',name:'Shampoo Pantene',sku:'SHP-PNT',barcode:'8991234567026',categoryId:'cat7',brandId:'b6',unitId:'u1',buyPrice:18000,sellPrice:25000,stock:30,minStock:5,status:'active' },
      { id:'p18',name:'Pasta Gigi Pepsodent',sku:'PGI-PPD',barcode:'8991234567027',categoryId:'cat7',brandId:'b5',unitId:'u1',buyPrice:8000,sellPrice:12000,stock:50,minStock:10,status:'active' },
      { id:'p19',name:'Detergen Rinso 800g',sku:'DTR-RNS',barcode:'8991234567028',categoryId:'cat5',brandId:'b5',unitId:'u1',buyPrice:16000,sellPrice:22000,stock:40,minStock:8,status:'active' },
      { id:'p20',name:'Tisu Paseo 250s',sku:'TSU-PSO',barcode:'8991234567029',categoryId:'cat5',brandId:'b7',unitId:'u1',buyPrice:8000,sellPrice:11000,stock:60,minStock:10,status:'active' },
    ],
    customers: [
      { id:'c0',name:'Walk-in Customer',phone:'-',isMember:false },
      { id:'c1',name:'Ahmad Hidayat',phone:'081234567890',memberCode:'MBR-001',points:150,isMember:true },
      { id:'c2',name:'Rina Wulandari',phone:'082345678901',memberCode:'MBR-002',points:320,isMember:true },
    ],
    paymentMethods: [
      { id:'pm1',name:'Tunai',icon:'fa-money-bill-wave',active:true },
      { id:'pm2',name:'QRIS',icon:'fa-qrcode',active:true },
      { id:'pm3',name:'Debit',icon:'fa-credit-card',active:true },
      { id:'pm4',name:'E-Wallet',icon:'fa-wallet',active:true },
    ],
    salesTransactions: [],
    expenses: [],
    purchaseOrders: [],
    stockMutations: [],
    currentShift: null,
    storeSettings: { name:'Minimarket Sejahtera',address:'Jl. Merdeka No. 123, Jakarta',taxRate:11 },
    menuConfig: [
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
    ],
  },
  mutations: {
    SET_CURRENT_USER(state, user) { state.currentUser = user },
    SET_LOGIN_ERROR(state, error) { state.loginError = error },
    CLEAR_LOGIN_ERROR(state) { state.loginError = '' },
    SET_CURRENT_PAGE(state, page) { state.currentPage = page },
    TOGGLE_MENU(state, id) {
      const idx = state.expandedMenus.indexOf(id)
      if (idx >= 0) state.expandedMenus.splice(idx, 1)
      else state.expandedMenus.push(id)
    },
    ADD_SALE_TRANSACTION(state, transaction) {
      state.salesTransactions.unshift(transaction)
      transaction.items.forEach(item => {
        const product = state.products.find(p => p.id === item.product.id)
        if (product) {
          const prev = product.stock
          product.stock -= item.quantity
          state.stockMutations.unshift({
            id: 'SM-' + Date.now() + '-' + item.product.id,
            productId: item.product.id,
            productName: item.product.name,
            type: 'out',
            quantity: item.quantity,
            previousStock: prev,
            newStock: product.stock,
            reference: transaction.invoiceNo,
            reason: 'Penjualan',
            date: transaction.date,
            createdBy: transaction.cashierName
          })
        }
      })
    },
  },
  actions: {
    login({ commit, state }, credentials) {
      const user = state.users.find(u => 
        u.username === credentials.username && 
        u.password === credentials.password && 
        u.active
      )
      if (user) {
        commit('SET_CURRENT_USER', user)
        commit('SET_CURRENT_PAGE', 'dashboard')
        commit('CLEAR_LOGIN_ERROR')
      } else {
        commit('SET_LOGIN_ERROR', 'Username atau password salah')
      }
    },
    logout({ commit }) {
      commit('SET_CURRENT_USER', null)
      commit('SET_CURRENT_PAGE', 'dashboard')
    },
    addSaleTransaction({ commit }, transaction) {
      commit('ADD_SALE_TRANSACTION', transaction)
    }
  }
})

// ==================== VUE COMPONENTS ====================

// Login Page Component
const LoginPage = {
  template: `
    <div class="login-page">
      <div class="login-card">
        <div class="login-header">
          <div class="logo-container"><i class="fas fa-store"></i></div>
          <h2>Selamat Datang</h2>
          <p>POS Minimarket - Sistem Kasir Digital</p>
        </div>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label>Username</label>
            <input v-model="loginForm.username" type="text" placeholder="Masukkan username" required />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input v-model="loginForm.password" type="password" placeholder="Masukkan password" required />
          </div>
          <div v-if="loginError" class="error-message">
            <i class="fas fa-exclamation-circle"></i> {{ loginError }}
          </div>
          <button type="submit" class="btn-login">
            <i class="fas fa-sign-in-alt"></i> Masuk
          </button>
        </form>
        <div class="demo-accounts">
          <p>Demo Accounts:</p>
          <div class="demo-grid">
            <button v-for="acc in demoAccounts" :key="acc.username" @click="fillLogin(acc)" class="demo-btn">
              <div class="demo-avatar" :style="{ background: acc.color }"><i class="fas fa-user"></i></div>
              <div class="demo-info">
                <strong>{{ acc.role }}</strong>
                <small>{{ acc.username }}</small>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      loginForm: { username: '', password: '' },
      demoAccounts: [
        { role: 'Administrator', username: 'admin', password: 'admin123', color: '#dc2626' },
        { role: 'Owner', username: 'owner', password: 'owner123', color: '#7c3aed' },
        { role: 'Manager', username: 'manager', password: 'manager123', color: '#2563eb' },
        { role: 'Kasir', username: 'kasir1', password: 'kasir123', color: '#16a34a' }
      ]
    }
  },
  computed: {
    loginError() { return this.$store.state.loginError }
  },
  methods: {
    handleLogin() { this.$store.dispatch('login', this.loginForm) },
    fillLogin(acc) {
      this.loginForm.username = acc.username
      this.loginForm.password = acc.password
      this.$store.commit('CLEAR_LOGIN_ERROR')
    }
  }
}

// Dashboard Page Component
const DashboardPage = {
  template: `
    <div class="dashboard">
      <div class="page-header">
        <h2>Dashboard</h2>
        <p>Ringkasan aktivitas toko hari ini</p>
      </div>
      <div class="stats-grid">
        <div v-for="stat in stats" :key="stat.label" class="stat-card">
          <div class="stat-icon" :style="{ background: stat.iconBg, color: stat.iconColor }">
            <i :class="'fas ' + stat.icon"></i>
          </div>
          <p class="stat-label">{{ stat.label }}</p>
          <p class="stat-value">{{ stat.value }}</p>
        </div>
      </div>
      <div class="dashboard-grid">
        <div class="card">
          <h3><i class="fas fa-chart-bar"></i> Penjualan Hari Ini</h3>
          <div v-if="Object.keys(salesByHour).length === 0" class="empty-state">
            <i class="fas fa-chart-bar"></i>
            <p>Belum ada penjualan hari ini</p>
          </div>
          <div v-else class="chart-container">
            <div v-for="hour in chartHours" :key="hour" class="chart-bar">
              <div class="bar" :style="{ height: getBarHeight(hour) + '%' }"></div>
              <span class="hour-label">{{ hour }}</span>
            </div>
          </div>
        </div>
        <div class="card">
          <h3><i class="fas fa-trophy"></i> Produk Terlaris</h3>
          <div v-if="topProducts.length === 0" class="empty-state">
            <i class="fas fa-box"></i>
            <p>Belum ada data</p>
          </div>
          <div v-else class="top-products">
            <div v-for="(product, i) in topProducts" :key="i" class="product-item">
              <div class="rank" :style="{ background: getRankColor(i) }">{{ i + 1 }}</div>
              <div class="product-info">
                <p class="product-name">{{ product.name }}</p>
                <p class="product-qty">{{ product.qty }} terjual</p>
              </div>
              <p class="product-revenue">{{ formatRupiah(product.revenue) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  computed: {
    stats() {
      const today = new Date().toDateString()
      const todaySales = this.$store.state.salesTransactions.filter(t => new Date(t.date).toDateString() === today)
      const totalSales = this.$store.state.salesTransactions.reduce((s, t) => s + t.total, 0)
      const todayTotal = todaySales.reduce((s, t) => s + t.total, 0)
      const cogs = this.$store.state.salesTransactions.reduce((s, t) => s + t.items.reduce((is, i) => is + i.product.buyPrice * i.quantity, 0), 0)
      const netProfit = totalSales - cogs - this.$store.state.expenses.reduce((s, e) => s + e.amount, 0)
      const lowStock = this.$store.state.products.filter(p => p.stock <= p.minStock).length
      const totalStock = this.$store.state.products.reduce((s, p) => s + p.stock, 0)
      
      return [
        { label: 'Penjualan Hari Ini', value: this.formatRupiah(todayTotal), icon: 'fa-coins', iconBg: '#dcfce7', iconColor: '#16a34a' },
        { label: 'Total Transaksi', value: this.$store.state.salesTransactions.length.toString(), icon: 'fa-receipt', iconBg: '#dbeafe', iconColor: '#2563eb' },
        { label: 'Keuntungan', value: this.formatRupiah(netProfit), icon: 'fa-sack-dollar', iconBg: '#d1fae5', iconColor: '#059669' },
        { label: 'Pembelian', value: this.formatRupiah(this.$store.state.purchaseOrders.reduce((s, p) => s + p.total, 0)), icon: 'fa-truck', iconBg: '#ffedd5', iconColor: '#ea580c' },
        { label: 'Stok Produk', value: totalStock.toLocaleString(), icon: 'fa-cubes', iconBg: '#f3e8ff', iconColor: '#7c3aed' },
        { label: 'Stok Menipis', value: lowStock.toString(), icon: 'fa-exclamation-triangle', iconBg: '#fee2e2', iconColor: '#dc2626' }
      ]
    },
    salesByHour() {
      const today = new Date().toDateString()
      const result = {}
      this.$store.state.salesTransactions.filter(t => new Date(t.date).toDateString() === today).forEach(t => {
        const h = new Date(t.date).getHours()
        result[h] = (result[h] || 0) + t.total
      })
      return result
    },
    chartHours() { return Array.from({ length: 14 }, (_, i) => i + 7) },
    topProducts() {
      const sales = {}
      this.$store.state.salesTransactions.forEach(t => {
        t.items.forEach(item => {
          if (!sales[item.product.id]) sales[item.product.id] = { name: item.product.name, qty: 0, revenue: 0 }
          sales[item.product.id].qty += item.quantity
          sales[item.product.id].revenue += item.subtotal
        })
      })
      return Object.values(sales).sort((a, b) => b.qty - a.qty).slice(0, 5)
    }
  },
  methods: {
    formatRupiah(n) { return 'Rp ' + (n || 0).toLocaleString('id-ID') },
    getBarHeight(hour) {
      const max = Math.max(...Object.values(this.salesByHour), 1)
      return ((this.salesByHour[hour] || 0) / max) * 100
    },
    getRankColor(i) {
      const colors = ['#eab308', '#9ca3af', '#fb923c', '#d1d5db']
      return colors[i] || colors[3]
    }
  }
}

// POS Page Component
const POSPage = {
  template: `
    <div class="pos-page">
      <div class="pos-layout">
        <div class="pos-products">
          <div class="pos-header">
            <div class="search-box">
              <i class="fas fa-search"></i>
              <input v-model="search" type="text" placeholder="🔍 Scan barcode / Cari produk..." />
            </div>
            <div class="category-bar">
              <button :class="['cat-btn', { active: activeCategory === 'all' }]" @click="activeCategory = 'all'">
                <i class="fas fa-border-all"></i> Semua
              </button>
              <button v-for="cat in categories" :key="cat.id" :class="['cat-btn', { active: activeCategory === cat.id }]" @click="activeCategory = cat.id">
                <i :class="'fas ' + cat.icon"></i> {{ cat.name }}
              </button>
            </div>
          </div>
          <div class="product-grid">
            <button v-for="product in filteredProducts" :key="product.id" class="product-card" :disabled="product.stock <= 0" @click="addToCart(product)">
              <div class="product-icon" :style="{ background: getCategoryColor(product.categoryId) }">
                <i :class="'fas ' + getCategoryIcon(product.categoryId)"></i>
              </div>
              <h3 class="product-name">{{ product.name }}</h3>
              <p class="product-price">{{ formatRupiah(product.sellPrice) }}</p>
              <div class="product-footer">
                <span :class="['badge', getStockBadge(product)]">{{ product.stock }} {{ getUnitName(product.unitId) }}</span>
                <span class="sku">{{ product.sku }}</span>
              </div>
            </button>
          </div>
        </div>
        <div class="pos-cart">
          <div class="cart-header">
            <div class="cart-title">
              <i class="fas fa-shopping-cart"></i>
              <h2>Keranjang</h2>
            </div>
            <span class="cart-count">{{ cartTotalItems }} item</span>
            <p class="cart-total">{{ formatRupiah(cartGrandTotal) }}</p>
          </div>
          <div class="cart-items">
            <div v-if="cart.length === 0" class="empty-cart">
              <i class="fas fa-cart-shopping"></i>
              <p>Keranjang kosong</p>
            </div>
            <div v-else class="cart-list">
              <div v-for="item in cart" :key="item.product.id" class="cart-item">
                <div class="item-header">
                  <div class="item-info">
                    <h4>{{ item.product.name }}</h4>
                    <p>{{ formatRupiah(item.product.sellPrice) }} × {{ item.quantity }}</p>
                  </div>
                  <button @click="removeFromCart(item.product.id)" class="remove-btn">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
                <div class="item-footer">
                  <div class="qty-controls">
                    <button @click="updateCartQty(item.product.id, -1)">−</button>
                    <span>{{ item.quantity }}</span>
                    <button @click="updateCartQty(item.product.id, 1)" :disabled="item.quantity >= item.product.stock">+</button>
                  </div>
                  <p class="item-subtotal">{{ formatRupiah(item.product.sellPrice * item.quantity) }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="cart-footer">
            <div class="summary-row"><span>Subtotal</span><span>{{ formatRupiah(cartSubtotal) }}</span></div>
            <div class="summary-row"><span>PPN ({{ storeSettings.taxRate }}%)</span><span>{{ formatRupiah(cartTax) }}</span></div>
            <div class="summary-row total"><span>TOTAL</span><span>{{ formatRupiah(cartGrandTotal) }}</span></div>
            <div class="cart-actions">
              <button @click="clearCart" :disabled="cart.length === 0" class="btn-cancel">
                <i class="fas fa-times"></i> Batal
              </button>
              <button @click="processPayment" :disabled="cart.length === 0" class="btn-pay">
                <i class="fas fa-credit-card"></i> BAYAR
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      search: '',
      activeCategory: 'all',
      cart: []
    }
  },
  computed: {
    categories() { return this.$store.state.categories },
    storeSettings() { return this.$store.state.storeSettings },
    filteredProducts() {
      return this.$store.state.products.filter(p => {
        if (p.status !== 'active') return false
        const matchCat = this.activeCategory === 'all' || p.categoryId === this.activeCategory
        const matchSearch = p.name.toLowerCase().includes(this.search.toLowerCase()) || p.barcode.includes(this.search)
        return matchCat && matchSearch
      })
    },
    cartTotalItems() { return this.cart.reduce((s, i) => s + i.quantity, 0) },
    cartSubtotal() { return this.cart.reduce((s, i) => s + i.product.sellPrice * i.quantity, 0) },
    cartTax() { return Math.round(this.cartSubtotal * (this.storeSettings.taxRate / 100)) },
    cartGrandTotal() { return this.cartSubtotal + this.cartTax }
  },
  methods: {
    formatRupiah(n) { return 'Rp ' + (n || 0).toLocaleString('id-ID') },
    getCategoryIcon(id) { const cat = this.categories.find(c => c.id === id); return cat ? cat.icon : 'fa-box' },
    getCategoryColor(id) { const cat = this.categories.find(c => c.id === id); return cat ? cat.color : '#f3f4f6' },
    getUnitName(id) { const unit = this.$store.state.units.find(u => u.id === id); return unit ? unit.shortName : '-' },
    getStockBadge(product) {
      if (product.stock === 0) return 'badge-red'
      if (product.stock <= product.minStock) return 'badge-yellow'
      return 'badge-green'
    },
    addToCart(product) {
      if (product.stock <= 0) return
      const existing = this.cart.find(i => i.product.id === product.id)
      if (existing) { if (existing.quantity < product.stock) existing.quantity++ }
      else this.cart.push({ product: JSON.parse(JSON.stringify(product)), quantity: 1 })
    },
    updateCartQty(productId, delta) {
      const item = this.cart.find(i => i.product.id === productId)
      if (!item) return
      const newQty = item.quantity + delta
      if (newQty <= 0) { this.removeFromCart(productId); return }
      if (newQty > item.product.stock) return
      item.quantity = newQty
    },
    removeFromCart(productId) { this.cart = this.cart.filter(i => i.product.id !== productId) },
    clearCart() { this.cart = [] },
    processPayment() {
      const transaction = {
        id: 'TX-' + Date.now(),
        invoiceNo: 'INV-' + String(Date.now()).slice(-6),
        items: JSON.parse(JSON.stringify(this.cart)),
        subtotal: this.cartSubtotal,
        discount: 0,
        tax: this.cartTax,
        total: this.cartGrandTotal,
        paymentMethod: 'Tunai',
        paymentAmount: this.cartGrandTotal,
        change: 0,
        customerId: 'c0',
        customerName: 'Walk-in Customer',
        cashierId: this.$store.state.currentUser.id,
        cashierName: this.$store.state.currentUser.name,
        date: new Date().toISOString(),
        status: 'completed',
        shiftId: this.$store.state.currentShift ? this.$store.state.currentShift.id : ''
      }
      this.$store.dispatch('addSaleTransaction', transaction)
      alert('Transaksi berhasil! Invoice: ' + transaction.invoiceNo)
      this.cart = []
    }
  }
}

// App Component
const App = {
  template: `
    <div id="app">
      <login-page v-if="!currentUser"></login-page>
      <div v-else class="app-layout">
        <div :class="['sidebar', { collapsed: sidebarCollapsed }]">
          <div class="sidebar-header">
            <div class="logo"><i class="fas fa-store"></i></div>
            <div v-if="!sidebarCollapsed" class="logo-text">
              <h1>POS Minimarket</h1>
              <p>Sistem Kasir Digital</p>
            </div>
          </div>
          <nav class="sidebar-nav">
            <div v-for="item in filteredMenu" :key="item.id">
              <button 
                :class="['nav-item', { active: currentPage === item.id }]"
                @click="item.children ? toggleMenu(item.id) : navigateTo(item.id)"
              >
                <i :class="'fas ' + item.icon"></i>
                <span v-if="!sidebarCollapsed" class="nav-text">{{ item.label }}</span>
                <i v-if="!sidebarCollapsed && item.children" :class="['fas fa-chevron-down', { 'fa-rotate-180': expandedMenus.includes(item.id) }]"></i>
              </button>
              <div v-if="!sidebarCollapsed && item.children && expandedMenus.includes(item.id)" class="nav-children">
                <button 
                  v-for="child in item.children.filter(c => hasRoleAccess(c.roles))" 
                  :key="child.id"
                  :class="['nav-item nav-child', { active: currentPage === child.id }]"
                  @click="navigateTo(child.id)"
                >
                  <i :class="'fas ' + child.icon"></i>
                  <span>{{ child.label }}</span>
                </button>
              </div>
            </div>
          </nav>
          <div class="sidebar-footer">
            <div v-if="!sidebarCollapsed" class="user-info">
              <div class="user-avatar"><i class="fas fa-user"></i></div>
              <div class="user-details">
                <p>{{ currentUser.name }}</p>
                <span :class="'badge ' + roleBadge.color">{{ roleBadge.label }}</span>
              </div>
              <button @click="logout" class="logout-btn"><i class="fas fa-sign-out-alt"></i></button>
            </div>
            <button v-else @click="logout" class="logout-btn"><i class="fas fa-sign-out-alt"></i></button>
          </div>
        </div>
        <div class="main-content">
          <div class="header-bar">
            <div class="header-left">
              <button @click="toggleSidebar" class="toggle-btn"><i class="fas fa-bars"></i></button>
              <h2>{{ currentPageLabel }}</h2>
            </div>
            <div class="header-right">
              <span :class="'badge ' + roleBadge.color">{{ roleBadge.label }}</span>
              <span class="user-name">{{ currentUser.name }}</span>
            </div>
          </div>
          <div class="page-content">
            <dashboard-page v-if="currentPage === 'dashboard'"></dashboard-page>
            <pos-page v-else-if="currentPage === 'pos-new'"></pos-page>
            <div v-else class="placeholder-page">
              <h2>{{ currentPageLabel }}</h2>
              <p>Halaman ini sedang dalam pengembangan</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  computed: {
    currentUser() { return this.$store.state.currentUser },
    currentPage() { return this.$store.state.currentPage },
    sidebarCollapsed() { return this.$store.state.sidebarCollapsed },
    expandedMenus() { return this.$store.state.expandedMenus },
    roleBadge() {
      if (!this.currentUser) return { label: '', color: '' }
      const badges = {
        administrator: { label: 'Admin', color: 'badge-red' },
        owner: { label: 'Owner', color: 'badge-purple' },
        manager: { label: 'Manager', color: 'badge-blue' },
        cashier: { label: 'Kasir', color: 'badge-green' }
      }
      return badges[this.currentUser.role] || { label: '', color: '' }
    },
    filteredMenu() {
      if (!this.currentUser) return []
      return this.$store.state.menuConfig.filter(item => this.hasRoleAccess(item.roles))
    },
    currentPageLabel() {
      const all = []
      this.$store.state.menuConfig.forEach(m => {
        if (m.children) m.children.forEach(c => all.push({ id: c.id, label: c.label }))
        else all.push({ id: m.id, label: m.label })
      })
      const found = all.find(m => m.id === this.currentPage)
      return found ? found.label : 'Dashboard'
    }
  },
  methods: {
    hasRoleAccess(roles) {
      return this.currentUser && roles.includes(this.currentUser.role)
    },
    navigateTo(page) { this.$store.commit('SET_CURRENT_PAGE', page) },
    toggleMenu(id) { this.$store.commit('TOGGLE_MENU', id) },
    toggleSidebar() { this.$store.state.sidebarCollapsed = !this.$store.state.sidebarCollapsed },
    logout() { this.$store.dispatch('logout') }
  }
}

// Register components
Vue.component('login-page', LoginPage)
Vue.component('dashboard-page', DashboardPage)
Vue.component('pos-page', POSPage)

// Create Vue instance
new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
