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
│   ├── POSPage.vue          # Halaman kasir/POS lengkap
│   ├── ProductsPage.vue     # Manajemen produk (CRUD)
│   └── AllPages.vue         # Semua halaman lainnya:
│                             #   - Pembelian (Baru, Riwayat, Supplier)
│                             #   - Inventory (Stok, Mutasi, Adjustment, Opname)
│                             #   - Customer (Semua, Member)
│                             #   - Transaksi (Penjualan, Retur, Pengeluaran)
│                             #   - Laporan (6 jenis laporan)
│                             #   - Pengaturan (7 pengaturan)
├── App.vue                   # Root component Vue 2
├── store.js                  # Vuex store configuration (lengkap)
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

## ✨ Fitur Utama (LENGKAP)

### 1. **Autentikasi & Otorisasi**
- Login dengan 4 role berbeda (Administrator, Owner, Manager, Kasir)
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
- Filter berdasarkan kategori (10 kategori)
- Keranjang belanja
- Kalkulasi PPN otomatis (11%)
- Proses pembayaran
- Auto-update stok setelah transaksi
- Cetak struk

### 4. **Manajemen Produk**
- 20+ produk sample dengan berbagai kategori
- CRUD produk lengkap (Tambah, Edit, Hapus)
- Kategori: Makanan, Minuman, Snack, Sembako, Kebutuhan Rumah, dll
- Brand: Indomie, Aqua, Coca Cola, Unilever, Nestle, dll
- Unit: PCS, BOX, PACK, KG, L
- Filter dan pencarian produk
- Status aktif/nonaktif

### 5. **Pembelian**
- Pembelian baru dari supplier
- Pilih supplier dan produk
- Input qty dan harga beli
- Auto-update stok setelah pembelian
- Riwayat pembelian
- Manajemen supplier (CRUD)

### 6. **Inventory Management**
- **Stok**: Tracking stok real-time dengan nilai stok
- **Mutasi Stok**: Riwayat semua perubahan stok (masuk/keluar/adjustment/opname)
- **Penyesuaian Stok**: Manual adjustment untuk barang rusak/hilang/kadaluarsa
- **Stock Opname**: Pencocokan stok sistem dengan fisik
- Peringatan stok minimum

### 7. **Customer Management**
- **Semua Customer**: Daftar semua customer
- **Member**: Customer dengan membership dan poin
- CRUD customer
- Tracking total belanja

### 8. **Transaksi**
- **Penjualan**: Riwayat semua transaksi penjualan
- **Retur Penjualan**: Proses pengembalian barang
- **Pengeluaran**: Catat pengeluaran operasional (CRUD)

### 9. **Laporan**
- **Laporan Penjualan**: Total sales, jumlah transaksi, rata-rata basket
- **Laporan Produk**: Produk terlaris, omzet, profit per produk
- **Laporan Pembelian**: Total pembelian, jumlah PO
- **Laporan Stok**: Nilai stok, stok menipis
- **Laporan Keuntungan**: Sales, COGS, Gross Profit, Expense, Net Profit
- **Laporan Kas**: Cash sales, non-cash, expected cash

### 10. **Pengaturan**
- **Toko**: Nama, alamat, pajak
- **Cabang**: Multi-cabang support
- **User**: Manajemen user dan role
- **Role & Permission**: Konfigurasi akses per role
- **Metode Pembayaran**: Aktif/nonaktifkan metode bayar
- **Printer**: Konfigurasi printer struk
- **Struk**: Custom header/footer struk

### 11. **Payment Methods**
- Tunai
- QRIS
- Debit
- E-Wallet
- Transfer Bank

### 12. **Fitur Tambahan**
- Sidebar navigation dengan role-based menu
- Responsive design
- Real-time stock update
- Auto-generate invoice number
- Format Rupiah otomatis
- Date formatting Indonesia

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
