# POS Minimarket - Vue.js 2 (Murni)

Aplikasi Point of Sale (POS) untuk minimarket yang dibangun **100% menggunakan Vue.js 2** dan **Vuex 3**. Tidak ada React sama sekali.

## 🚀 Teknologi

- **Vue.js 2.7.16** - Framework JavaScript progresif (bukan React!)
- **Vuex 3.6.2** - State management pattern + library
- **Font Awesome 6** - Icon library
- **Vite** - Build tool dengan plugin Vue 2

## 📁 Struktur Folder (Vue.js 2 Murni)

```
src/
├── views/                    # Vue Single File Components
│   ├── LoginPage.vue        # Halaman login dengan 4 role
│   ├── DashboardPage.vue    # Dashboard dengan statistik & grafik
│   └── POSPage.vue          # Halaman kasir/POS lengkap
├── App.vue                   # Root component Vue 2
├── store.js                  # Vuex store configuration
└── main.js                   # Vue app initialization

index.html                    # Entry point (load main.js)
vite.config.js                # Vite config dengan plugin Vue 2
```

**Catatan:** Tidak ada file React (.tsx, .jsx) sama sekali. Semua komponen menggunakan format Vue Single File Component (.vue).

## 🔐 Login Credentials

| Role | Username | Password | Akses |
|------|----------|----------|-------|
| Administrator | admin | admin123 | Full access |
| Owner | owner | owner123 | Full access |
| Manager | manager | manager123 | Dashboard, POS, Products, Purchase, Inventory, Customer, Transaction, Reports |
| Kasir | kasir1 | kasir123 | POS only |

## ✨ Fitur Utama

### 1. **Autentikasi & Otorisasi**
- Login dengan 4 role berbeda
- Role-based access control
- Session management

### 2. **Dashboard**
- Statistik penjualan hari ini
- Grafik penjualan per jam
- Top 5 produk terlaris
- Peringatan stok menipis
- Transaksi terakhir

### 3. **POS / Kasir**
- Pencarian produk (nama/barcode)
- Filter berdasarkan kategori
- Keranjang belanja
- Kalkulasi PPN otomatis
- Proses pembayaran
- Auto-update stok setelah transaksi

### 4. **Manajemen Produk**
- 20+ produk sample dengan berbagai kategori
- Kategori: Makanan, Minuman, Snack, Sembako, dll
- Brand: Indomie, Aqua, Coca Cola, dll
- Unit: PCS, BOX, KG, L

### 5. **Inventory Management**
- Tracking stok real-time
- Mutasi stok otomatis
- Peringatan stok minimum

### 6. **Customer Management**
- Walk-in customer
- Member dengan poin
- Riwayat transaksi

### 7. **Payment Methods**
- Tunai
- QRIS
- Debit
- E-Wallet

## 🎨 Komponen Vue

### LoginPage.vue
```vue
<template>
  <div class="login-page">
    <!-- Form login dengan demo accounts -->
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      loginForm: { username: '', password: '' },
      demoAccounts: [...]
    }
  },
  methods: {
    handleLogin() { this.$store.dispatch('login', this.loginForm) },
    fillLogin(acc) { ... }
  }
}
</script>
```

### DashboardPage.vue
```vue
<template>
  <div class="dashboard">
    <!-- Stats cards, charts, top products -->
  </div>
</template>

<script>
export default {
  name: 'DashboardPage',
  computed: {
    stats() { ... },
    salesByHour() { ... },
    topProducts() { ... }
  }
}
</script>
```

### POSPage.vue
```vue
<template>
  <div class="pos-page">
    <!-- Product grid, cart, payment -->
  </div>
</template>

<script>
export default {
  name: 'POSPage',
  data() {
    return {
      cart: [],
      search: '',
      activeCategory: 'all'
    }
  },
  methods: {
    addToCart(product) { ... },
    processPayment() { ... }
  }
}
</script>
```

## 📊 Vuex Store Structure

```javascript
{
  // Auth
  currentUser: null,
  loginError: '',
  
  // Navigation
  currentPage: 'dashboard',
  sidebarCollapsed: false,
  expandedMenus: ['pos'],
  
  // Data
  users: [...],
  categories: [...],
  brands: [...],
  units: [...],
  products: [...],
  customers: [...],
  paymentMethods: [...],
  
  // Transactions
  salesTransactions: [],
  stockMutations: [],
  expenses: [],
  purchaseOrders: [],
  
  // Settings
  storeSettings: {
    name: 'Minimarket Sejahtera',
    taxRate: 11
  },
  
  // Menu
  menuConfig: [...]
}
```

## 🔄 Flow Transaksi

1. **Login** → Pilih role
2. **Dashboard** → Lihat statistik
3. **POS** → Scan/cari produk
4. **Add to Cart** → Tambah ke keranjang
5. **Checkout** → Proses pembayaran
6. **Stock Update** → Stok otomatis berkurang
7. **Receipt** → Cetak struk

## 🎯 Cara Menjalankan

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

## 📝 Catatan Penting

1. **Vue.js 2 Murni**: Aplikasi ini 100% menggunakan Vue.js 2 dengan Single File Components (.vue). Tidak ada React sama sekali.

2. **Build System**: Menggunakan Vite dengan plugin `@vitejs/plugin-vue2` untuk compile file `.vue`.

3. **State Management**: Menggunakan Vuex 3.6.2 (versi yang kompatibel dengan Vue 2) untuk state management.

4. **Data Sample**: Semua data (produk, customer, dll) adalah sample untuk demonstrasi.

5. **Data Persisten**: Saat ini data tidak persisten. Refresh halaman akan reset semua data.

## 🚧 Fitur yang Sedang Dikembangkan

- [ ] Halaman Products (CRUD lengkap)
- [ ] Halaman Purchase (Pembelian dari supplier)
- [ ] Halaman Inventory (Stock opname, adjustment)
- [ ] Halaman Customer (Member management)
- [ ] Halaman Transaction (Riwayat, retur)
- [ ] Halaman Reports (Laporan penjualan, stok, profit)
- [ ] Halaman Settings (Store, users, roles)
- [ ] Print receipt functionality
- [ ] Export laporan ke Excel/PDF
- [ ] Dark mode
- [ ] Multi-language support

## 📄 License

MIT

---

**Dibangun dengan ❤️ menggunakan Vue.js 2 (100% Murni - Tanpa React)**
