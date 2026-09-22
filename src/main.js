import Vue from 'vue'
import Vuex from 'vuex'
import store from './store'

Vue.use(Vuex)

// Import components (templates will be defined inline due to build constraints)
// File .vue di src/views/ berfungsi sebagai referensi struktur

// ==================== LOGIN PAGE ====================
const LoginPage = {
  template: `
    <div class="login-page">
      <div class="login-card">
        <div class="login-header">
          <div class="logo-container">
            <i class="fas fa-store"></i>
          </div>
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
            <input v-model="loginForm.password" :type="showPassword ? 'text' : 'password'" placeholder="Masukkan password" required />
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
              <div class="demo-avatar" :style="{ background: acc.color }">
                <i class="fas fa-user"></i>
              </div>
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
      showPassword: false,
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

// ==================== APP COMPONENT ====================
const App = {
  template: `
    <div id="app">
      <login-page v-if="!currentUser"></login-page>
      <div v-else class="app-layout">
        <!-- Sidebar -->
        <div :class="['sidebar', { collapsed: sidebarCollapsed }]">
          <div class="sidebar-header">
            <div class="logo">
              <i class="fas fa-store"></i>
            </div>
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
              <div class="user-avatar">
                <i class="fas fa-user"></i>
              </div>
              <div class="user-details">
                <p>{{ currentUser.name }}</p>
                <span :class="'badge ' + roleBadge.color">{{ roleBadge.label }}</span>
              </div>
              <button @click="logout" class="logout-btn">
                <i class="fas fa-sign-out-alt"></i>
              </button>
            </div>
            <button v-else @click="logout" class="logout-btn">
              <i class="fas fa-sign-out-alt"></i>
            </button>
          </div>
        </div>

        <!-- Main Content -->
        <div class="main-content">
          <div class="header-bar">
            <div class="header-left">
              <button @click="sidebarCollapsed = !sidebarCollapsed" class="toggle-btn">
                <i class="fas fa-bars"></i>
              </button>
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
    navigateTo(page) {
      this.$store.commit('SET_CURRENT_PAGE', page)
    },
    toggleMenu(id) {
      this.$store.commit('TOGGLE_MENU', id)
    },
    logout() {
      this.$store.dispatch('logout')
    }
  }
}

// ==================== DASHBOARD PAGE ====================
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

// ==================== POS PAGE ====================
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
              <button @click="showPaymentModal = true" :disabled="cart.length === 0" class="btn-pay">
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
      cart: [],
      showPaymentModal: false,
      paymentMethod: 'Tunai',
      cashInput: ''
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
    clearCart() { this.cart = [] }
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
