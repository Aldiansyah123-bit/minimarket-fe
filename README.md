# POS Minimarket - Vue.js 2

Aplikasi Point of Sale (POS) untuk minimarket yang dibangun menggunakan **Vue.js 2** dan **Vuex 3**.

## 🚀 Teknologi

- **Vue.js 2.7.16** - Framework JavaScript progresif
- **Vuex 3.6.2** - State management pattern
- **Font Awesome 6** - Icon library
- **Vite** - Build tool

## 📁 Struktur Folder

```
src/
├── views/                    # Vue Single File Components (Referensi)
│   ├── LoginPage.vue        # Halaman login
│   ├── DashboardPage.vue    # Dashboard dengan statistik
│   └── POSPage.vue          # Halaman kasir/POS
├── store.js                  # Vuex store configuration
├── main.js                   # Vue app initialization
└── App.tsx                   # Empty (Vue handles UI)

public/
└── app.js                    # Runtime Vue 2 app dengan template inline

index.html                    # Entry point dengan Vue 2 CDN
```

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

1. **File .vue sebagai Referensi**: File `.vue` di `src/views/` berfungsi sebagai referensi struktur komponen Vue SFC. Runtime menggunakan template inline di `app.js` karena keterbatasan build system.

2. **Vue 2 via CDN**: Aplikasi menggunakan Vue 2.7.16 dan Vuex 3.6.2 via CDN untuk kompatibilitas maksimal.

3. **Data Sample**: Semua data (produk, customer, dll) adalah sample untuk demonstrasi.

4. **LocalStorage**: Saat ini data tidak persisten. Refresh halaman akan reset semua data.

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

**Dibangun dengan ❤️ menggunakan Vue.js 2**
