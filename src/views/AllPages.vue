<template>
  <div>
    <!-- PURCHASE NEW -->
    <div v-if="currentPage === 'purchase-new'" class="page">
      <div class="page-header">
        <h2>Pembelian Baru</h2>
      </div>
      <div class="card">
        <div class="form-row">
          <div class="form-group">
            <label>Supplier</label>
            <select v-model="purchaseSupplierId" class="select">
              <option v-for="s in suppliers" :key="s.id" :value="s.id">{{ s.name }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>Tanggal</label>
            <input type="date" :value="today" class="input" readonly />
          </div>
        </div>
        <div class="section-title">Item Pembelian</div>
        <div v-if="purchaseItems.length === 0" class="empty-state">
          <p>Belum ada produk ditambahkan</p>
        </div>
        <table v-else class="data-table">
          <thead>
            <tr><th>Produk</th><th>Qty</th><th>Harga Beli</th><th>Subtotal</th><th>Aksi</th></tr>
          </thead>
          <tbody>
            <tr v-for="item in purchaseItems" :key="item.product.id">
              <td>{{ item.product.name }}</td>
              <td><input type="number" v-model.number="item.quantity" min="1" class="input-sm" @change="updateSubtotal(item)" /></td>
              <td><input type="number" v-model.number="item.buyPrice" class="input-sm" @change="updateSubtotal(item)" /></td>
              <td>{{ formatRupiah(item.subtotal) }}</td>
              <td><button @click="removePurchaseItem(item.product.id)" class="btn-icon danger"><i class="fas fa-trash"></i></button></td>
            </tr>
          </tbody>
        </table>
        <div class="purchase-footer">
          <div class="total-display">
            <span>Total:</span>
            <strong>{{ formatRupiah(purchaseTotal) }}</strong>
          </div>
          <div class="actions">
            <button @click="addPurchaseProduct" class="btn btn-primary"><i class="fas fa-plus"></i> Tambah Produk</button>
            <button @click="savePurchase" :disabled="purchaseItems.length === 0" class="btn btn-success"><i class="fas fa-save"></i> Simpan</button>
          </div>
        </div>
      </div>
    </div>

    <!-- PURCHASE HISTORY -->
    <div v-else-if="currentPage === 'purchase-history'" class="page">
      <div class="page-header"><h2>Riwayat Pembelian</h2></div>
      <div class="table-container">
        <table class="data-table">
          <thead><tr><th>No. PO</th><th>Supplier</th><th>Tanggal</th><th>Total</th><th>Status</th></tr></thead>
          <tbody>
            <tr v-for="po in purchaseOrders" :key="po.id">
              <td><code>{{ po.poNumber }}</code></td>
              <td>{{ po.supplierName }}</td>
              <td>{{ formatDate(po.date) }}</td>
              <td>{{ formatRupiah(po.total) }}</td>
              <td><span class="status-badge active">{{ po.status }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- SUPPLIERS -->
    <div v-else-if="currentPage === 'purchase-suppliers'" class="page">
      <div class="page-header">
        <h2>Supplier</h2>
        <button @click="showSupplierModal = true" class="btn btn-primary"><i class="fas fa-plus"></i> Tambah</button>
      </div>
      <div class="grid-cards">
        <div v-for="s in suppliers" :key="s.id" class="card-item">
          <div class="card-icon"><i class="fas fa-handshake"></i></div>
          <div class="card-content">
            <h4>{{ s.name }}</h4>
            <p><i class="fas fa-phone"></i> {{ s.phone }}</p>
            <p><i class="fas fa-map-marker-alt"></i> {{ s.address }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- INVENTORY STOCK -->
    <div v-else-if="currentPage === 'inventory-stock'" class="page">
      <div class="page-header"><h2>Stok Produk</h2></div>
      <div class="stats-row">
        <div class="stat-box"><p>Total Produk</p><strong>{{ products.length }}</strong></div>
        <div class="stat-box"><p>Nilai Stok</p><strong>{{ formatRupiah(totalStockValue) }}</strong></div>
        <div class="stat-box warning"><p>Stok Menipis</p><strong>{{ lowStockCount }}</strong></div>
      </div>
      <div class="table-container">
        <table class="data-table">
          <thead><tr><th>Produk</th><th>Kategori</th><th>Stok</th><th>Min</th><th>Nilai</th><th>Status</th></tr></thead>
          <tbody>
            <tr v-for="p in products" :key="p.id">
              <td>{{ p.name }}</td>
              <td>{{ getCategoryName(p.categoryId) }}</td>
              <td><span :class="['stock-value', p.stock <= p.minStock ? 'low' : '']">{{ p.stock }}</span></td>
              <td>{{ p.minStock }}</td>
              <td>{{ formatRupiah(p.buyPrice * p.stock) }}</td>
              <td>
                <span v-if="p.stock === 0" class="status-badge inactive">Habis</span>
                <span v-else-if="p.stock <= p.minStock" class="status-badge warning">Menipis</span>
                <span v-else class="status-badge active">Aman</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- INVENTORY MUTATION -->
    <div v-else-if="currentPage === 'inventory-mutation'" class="page">
      <div class="page-header"><h2>Mutasi Stok</h2></div>
      <div class="table-container">
        <table class="data-table">
          <thead><tr><th>Tanggal</th><th>Produk</th><th>Tipe</th><th>Qty</th><th>Akhir</th><th>Keterangan</th></tr></thead>
          <tbody>
            <tr v-for="m in stockMutations" :key="m.id">
              <td>{{ formatDate(m.date) }}</td>
              <td>{{ m.productName }}</td>
              <td><span :class="['mutation-type', m.type]">{{ m.type }}</span></td>
              <td>{{ m.type === 'in' ? '+' : '-' }}{{ m.quantity }}</td>
              <td>{{ m.newStock }}</td>
              <td>{{ m.reason }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- INVENTORY ADJUSTMENT -->
    <div v-else-if="currentPage === 'inventory-adjustment'" class="page">
      <div class="page-header"><h2>Penyesuaian Stok</h2></div>
      <div class="card" style="max-width: 32rem;">
        <div class="form-group">
          <label>Produk</label>
          <select v-model="adjustProductId" class="select">
            <option value="">-- Pilih Produk --</option>
            <option v-for="p in products" :key="p.id" :value="p.id">{{ p.name }} (Stok: {{ p.stock }})</option>
          </select>
        </div>
        <div class="form-group">
          <label>Jumlah (+/-)</label>
          <input v-model.number="adjustQty" type="number" class="input" />
        </div>
        <div class="form-group">
          <label>Alasan</label>
          <select v-model="adjustReason" class="select">
            <option value="">-- Pilih Alasan --</option>
            <option>Barang rusak</option>
            <option>Barang hilang</option>
            <option>Barang kadaluarsa</option>
            <option>Selisih fisik</option>
          </select>
        </div>
        <button @click="saveAdjustment" :disabled="!adjustProductId || adjustQty === 0 || !adjustReason" class="btn btn-primary" style="width: 100%;">
          <i class="fas fa-save"></i> Simpan
        </button>
      </div>
    </div>

    <!-- STOCK OPNAME -->
    <div v-else-if="currentPage === 'inventory-opname'" class="page">
      <div class="page-header">
        <h2>Stock Opname</h2>
        <button v-if="opnameStarted" @click="saveOpname" class="btn btn-success">
          <i class="fas fa-check"></i> Simpan
        </button>
      </div>
      <div v-if="!opnameStarted" class="card" style="text-align: center; padding: 3rem;">
        <i class="fas fa-clipboard-check" style="font-size: 3rem; color: #93c5fd; margin-bottom: 1rem;"></i>
        <p style="margin-bottom: 1rem;">Mulai Stock Opname</p>
        <button @click="startOpname" class="btn btn-primary"><i class="fas fa-play"></i> Mulai</button>
      </div>
      <div v-else class="table-container">
        <table class="data-table">
          <thead><tr><th>Produk</th><th>Stok Sistem</th><th>Stok Fisik</th><th>Selisih</th></tr></thead>
          <tbody>
            <tr v-for="item in opnameItems" :key="item.productId" :style="item.difference !== 0 ? 'background: #fef9c3;' : ''">
              <td>{{ getProductName(item.productId) }}</td>
              <td>{{ item.systemStock }}</td>
              <td><input type="number" v-model.number="item.physicalStock" @change="updateOpnameDiff(item)" class="input-sm" /></td>
              <td :style="'font-weight: 700; color: ' + (item.difference === 0 ? '#16a34a' : item.difference > 0 ? '#2563eb' : '#dc2626')">
                {{ item.difference > 0 ? '+' : '' }}{{ item.difference }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- CUSTOMERS -->
    <div v-else-if="currentPage === 'customer-all'" class="page">
      <div class="page-header">
        <h2>Semua Customer</h2>
        <button @click="showCustomerModal = true" class="btn btn-primary"><i class="fas fa-plus"></i> Tambah</button>
      </div>
      <div class="table-container">
        <table class="data-table">
          <thead><tr><th>Nama</th><th>Telepon</th><th>Member</th><th>Total Belanja</th></tr></thead>
          <tbody>
            <tr v-for="c in customers" :key="c.id">
              <td>{{ c.name }}</td>
              <td>{{ c.phone }}</td>
              <td><span v-if="c.isMember" class="badge-purple">{{ c.memberCode }}</span><span v-else>-</span></td>
              <td>{{ formatRupiah(c.totalSpent) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- MEMBERS -->
    <div v-else-if="currentPage === 'customer-members'" class="page">
      <div class="page-header"><h2>Member</h2></div>
      <div class="grid-cards">
        <div v-for="m in members" :key="m.id" class="card-item">
          <div class="card-icon" style="background: #f3e8ff; color: #7c3aed;"><i class="fas fa-id-card"></i></div>
          <div class="card-content">
            <h4>{{ m.name }}</h4>
            <p style="color: #7c3aed;">{{ m.memberCode }}</p>
            <div style="display: flex; gap: 1rem; margin-top: 0.5rem;">
              <div><small>Poin</small><strong>{{ m.points }}</strong></div>
              <div><small>Belanja</small><strong>{{ formatRupiah(m.totalSpent) }}</strong></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- TRANSACTION SALES -->
    <div v-else-if="currentPage === 'transaction-sales'" class="page">
      <div class="page-header"><h2>Transaksi Penjualan</h2></div>
      <div class="table-container">
        <table class="data-table">
          <thead><tr><th>Invoice</th><th>Tanggal</th><th>Kasir</th><th>Pembayaran</th><th>Total</th></tr></thead>
          <tbody>
            <tr v-for="t in salesTransactions" :key="t.id">
              <td><code style="color: #2563eb;">{{ t.invoiceNo }}</code></td>
              <td>{{ formatDate(t.date) }}</td>
              <td>{{ t.cashierName }}</td>
              <td><span class="badge-blue">{{ t.paymentMethod }}</span></td>
              <td><strong>{{ formatRupiah(t.total) }}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- EXPENSES -->
    <div v-else-if="currentPage === 'transaction-expenses'" class="page">
      <div class="page-header">
        <h2>Pengeluaran</h2>
        <button @click="showExpenseModal = true" class="btn btn-danger"><i class="fas fa-plus"></i> Tambah</button>
      </div>
      <div class="table-container">
        <table class="data-table">
          <thead><tr><th>Tanggal</th><th>Kategori</th><th>Keterangan</th><th>Jumlah</th></tr></thead>
          <tbody>
            <tr v-for="e in expenses" :key="e.id">
              <td>{{ formatDate(e.date) }}</td>
              <td>{{ e.category }}</td>
              <td>{{ e.description }}</td>
              <td style="color: #dc2626; font-weight: 700;">{{ formatRupiah(e.amount) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- REPORTS -->
    <div v-else-if="currentPage.startsWith('reports-')" class="page">
      <div class="page-header"><h2>{{ currentPageLabel }}</h2></div>
      <div v-if="currentPage === 'reports-sales'" class="stats-row">
        <div class="stat-box"><p>Total Sales</p><strong style="color: #16a34a;">{{ formatRupiah(totalSales) }}</strong></div>
        <div class="stat-box"><p>Transaksi</p><strong style="color: #2563eb;">{{ salesTransactions.length }}</strong></div>
        <div class="stat-box"><p>Rata-rata</p><strong style="color: #7c3aed;">{{ formatRupiah(avgBasket) }}</strong></div>
      </div>
      <div v-else-if="currentPage === 'reports-profit'" class="card" style="max-width: 32rem; margin: 0 auto;">
        <div class="profit-row"><span>Sales</span><strong style="color: #16a34a;">{{ formatRupiah(totalSales) }}</strong></div>
        <div class="profit-row"><span>COGS</span><strong style="color: #dc2626;">- {{ formatRupiah(totalCogs) }}</strong></div>
        <div class="profit-row"><span>Gross Profit</span><strong style="color: #2563eb;">{{ formatRupiah(grossProfit) }}</strong></div>
        <div class="profit-row"><span>Expense</span><strong style="color: #ea580c;">- {{ formatRupiah(totalExpenses) }}</strong></div>
        <div class="profit-row total"><span>NET PROFIT</span><strong>{{ formatRupiah(netProfit) }}</strong></div>
      </div>
      <div v-else class="card"><p style="text-align: center; color: #6b7280;">Laporan {{ currentPageLabel }}</p></div>
    </div>

    <!-- SETTINGS -->
    <div v-else-if="currentPage.startsWith('settings-')" class="page">
      <div class="page-header"><h2>{{ currentPageLabel }}</h2></div>
      <div v-if="currentPage === 'settings-store'" class="card" style="max-width: 32rem;">
        <div class="form-group"><label>Nama Toko</label><input v-model="storeSettings.name" class="input" /></div>
        <div class="form-group"><label>Alamat</label><input v-model="storeSettings.address" class="input" /></div>
        <div class="form-group"><label>Pajak (%)</label><input v-model.number="storeSettings.taxRate" type="number" class="input" /></div>
        <button @click="saveSettings" class="btn btn-primary" style="width: 100%;"><i class="fas fa-save"></i> Simpan</button>
      </div>
      <div v-else-if="currentPage === 'settings-users'" class="table-container">
        <table class="data-table">
          <thead><tr><th>Nama</th><th>Username</th><th>Role</th><th>Status</th></tr></thead>
          <tbody>
            <tr v-for="u in users" :key="u.id">
              <td>{{ u.name }}</td>
              <td><code>{{ u.username }}</code></td>
              <td><span :class="'badge-' + u.role">{{ getRoleLabel(u.role) }}</span></td>
              <td><span :class="u.active ? 'status-badge active' : 'status-badge inactive'">{{ u.active ? 'Aktif' : 'Nonaktif' }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="card"><p style="text-align: center; color: #6b7280;">{{ currentPageLabel }}</p></div>
    </div>

    <!-- PLACEHOLDER -->
    <div v-else class="page" style="text-align: center; padding: 3rem;">
      <h2>{{ currentPageLabel }}</h2>
      <p style="color: #6b7280;">Halaman ini sedang dalam pengembangan</p>
    </div>

    <!-- MODALS -->
    <div v-if="showSupplierModal" class="modal-overlay" @click.self="showSupplierModal = false">
      <div class="modal">
        <div class="modal-header"><h3>Tambah Supplier</h3><button @click="showSupplierModal = false" class="close-btn"><i class="fas fa-times"></i></button></div>
        <div class="modal-body">
          <div class="form-group"><label>Nama</label><input v-model="supplierForm.name" class="input" /></div>
          <div class="form-group"><label>Telepon</label><input v-model="supplierForm.phone" class="input" /></div>
          <div class="form-group"><label>Alamat</label><input v-model="supplierForm.address" class="input" /></div>
        </div>
        <div class="modal-footer">
          <button @click="showSupplierModal = false" class="btn btn-secondary">Batal</button>
          <button @click="saveSupplier" class="btn btn-primary">Simpan</button>
        </div>
      </div>
    </div>

    <div v-if="showCustomerModal" class="modal-overlay" @click.self="showCustomerModal = false">
      <div class="modal">
        <div class="modal-header"><h3>Tambah Customer</h3><button @click="showCustomerModal = false" class="close-btn"><i class="fas fa-times"></i></button></div>
        <div class="modal-body">
          <div class="form-group"><label>Nama</label><input v-model="customerForm.name" class="input" /></div>
          <div class="form-group"><label>Telepon</label><input v-model="customerForm.phone" class="input" /></div>
        </div>
        <div class="modal-footer">
          <button @click="showCustomerModal = false" class="btn btn-secondary">Batal</button>
          <button @click="saveCustomer" class="btn btn-primary">Simpan</button>
        </div>
      </div>
    </div>

    <div v-if="showExpenseModal" class="modal-overlay" @click.self="showExpenseModal = false">
      <div class="modal">
        <div class="modal-header"><h3>Tambah Pengeluaran</h3><button @click="showExpenseModal = false" class="close-btn"><i class="fas fa-times"></i></button></div>
        <div class="modal-body">
          <div class="form-group"><label>Kategori</label>
            <select v-model="expenseForm.category" class="select">
              <option value="">-- Pilih --</option>
              <option>Operasional</option><option>Transport</option><option>Listrik</option><option>Lainnya</option>
            </select>
          </div>
          <div class="form-group"><label>Keterangan</label><input v-model="expenseForm.description" class="input" /></div>
          <div class="form-group"><label>Jumlah</label><input v-model.number="expenseForm.amount" type="number" class="input" /></div>
        </div>
        <div class="modal-footer">
          <button @click="showExpenseModal = false" class="btn btn-secondary">Batal</button>
          <button @click="saveExpense" class="btn btn-danger">Simpan</button>
        </div>
      </div>
    </div>

    <div v-if="showProductPickerModal" class="modal-overlay" @click.self="showProductPickerModal = false">
      <div class="modal">
        <div class="modal-header"><h3>Pilih Produk</h3><button @click="showProductPickerModal = false" class="close-btn"><i class="fas fa-times"></i></button></div>
        <div class="modal-body">
          <input v-model="pickerSearch" type="text" placeholder="Cari produk..." class="input" style="margin-bottom: 1rem;" />
          <div style="max-height: 300px; overflow-y: auto;">
            <div v-for="p in pickerProducts" :key="p.id" @click="addProductToPurchase(p)" style="padding: 0.5rem; border-bottom: 1px solid #f3f4f6; cursor: pointer;">
              <strong>{{ p.name }}</strong> - {{ formatRupiah(p.buyPrice) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AllPages',
  data() {
    return {
      // Purchase
      purchaseSupplierId: 's1',
      purchaseItems: [],
      showProductPickerModal: false,
      pickerSearch: '',
      // Supplier
      showSupplierModal: false,
      supplierForm: { name: '', phone: '', address: '' },
      // Customer
      showCustomerModal: false,
      customerForm: { name: '', phone: '' },
      // Expense
      showExpenseModal: false,
      expenseForm: { category: '', description: '', amount: 0 },
      // Adjustment
      adjustProductId: '',
      adjustQty: 0,
      adjustReason: '',
      // Opname
      opnameStarted: false,
      opnameItems: [],
    }
  },
  computed: {
    currentPage() { return this.$store.state.currentPage },
    suppliers() { return this.$store.state.suppliers },
    customers() { return this.$store.state.customers },
    products() { return this.$store.state.products },
    categories() { return this.$store.state.categories },
    salesTransactions() { return this.$store.state.salesTransactions },
    purchaseOrders() { return this.$store.state.purchaseOrders },
    expenses() { return this.$store.state.expenses },
    stockMutations() { return this.$store.state.stockMutations },
    storeSettings() { return this.$store.state.storeSettings },
    users() { return this.$store.state.users },
    members() { return this.customers.filter(c => c.isMember) },
    today() { return new Date().toISOString().split('T')[0] },
    purchaseTotal() { return this.purchaseItems.reduce((s, i) => s + i.subtotal, 0) },
    totalStockValue() { return this.products.reduce((s, p) => s + p.buyPrice * p.stock, 0) },
    lowStockCount() { return this.products.filter(p => p.stock <= p.minStock).length },
    pickerProducts() {
      return this.products.filter(p => p.name.toLowerCase().includes(this.pickerSearch.toLowerCase()) && p.status === 'active')
    },
    totalSales() { return this.salesTransactions.reduce((s, t) => s + t.total, 0) },
    totalCogs() { return this.salesTransactions.reduce((s, t) => s + t.items.reduce((is, i) => is + i.product.buyPrice * i.quantity, 0), 0) },
    grossProfit() { return this.totalSales - this.totalCogs },
    totalExpenses() { return this.expenses.reduce((s, e) => s + e.amount, 0) },
    netProfit() { return this.grossProfit - this.totalExpenses },
    avgBasket() { return this.salesTransactions.length > 0 ? this.totalSales / this.salesTransactions.length : 0 },
    currentPageLabel() {
      const labels = {
        'purchase-new': 'Pembelian Baru', 'purchase-history': 'Riwayat Pembelian', 'purchase-suppliers': 'Supplier',
        'inventory-stock': 'Stok Produk', 'inventory-mutation': 'Mutasi Stok', 'inventory-adjustment': 'Penyesuaian Stok', 'inventory-opname': 'Stock Opname',
        'customer-all': 'Customer', 'customer-members': 'Member',
        'transaction-sales': 'Transaksi Penjualan', 'transaction-return': 'Retur Penjualan', 'transaction-expenses': 'Pengeluaran',
        'reports-sales': 'Laporan Penjualan', 'reports-product': 'Laporan Produk', 'reports-purchase': 'Laporan Pembelian',
        'reports-stock': 'Laporan Stok', 'reports-profit': 'Laporan Keuntungan', 'reports-cash': 'Laporan Kas',
        'settings-store': 'Pengaturan Toko', 'settings-branch': 'Cabang', 'settings-users': 'User',
        'settings-roles': 'Role & Permission', 'settings-payment': 'Metode Pembayaran', 'settings-printer': 'Printer', 'settings-receipt': 'Struk'
      }
      return labels[this.currentPage] || 'Halaman'
    }
  },
  methods: {
    formatRupiah(n) { return 'Rp ' + (n || 0).toLocaleString('id-ID') },
    formatDate(d) { return new Date(d).toLocaleDateString('id-ID') },
    getCategoryName(id) { const c = this.categories.find(x => x.id === id); return c ? c.name : '-' },
    getProductName(id) { const p = this.products.find(x => x.id === id); return p ? p.name : '-' },
    getRoleLabel(role) {
      const labels = { administrator: 'Admin', owner: 'Owner', manager: 'Manager', cashier: 'Kasir' }
      return labels[role] || role
    },
    // Purchase
    addPurchaseProduct() { this.showProductPickerModal = true },
    addProductToPurchase(product) {
      const existing = this.purchaseItems.find(i => i.product.id === product.id)
      if (existing) { existing.quantity++; existing.subtotal = existing.quantity * existing.buyPrice }
      else this.purchaseItems.push({ product: JSON.parse(JSON.stringify(product)), quantity: 1, buyPrice: product.buyPrice, subtotal: product.buyPrice })
      this.showProductPickerModal = false
      this.pickerSearch = ''
    },
    updateSubtotal(item) { item.subtotal = item.quantity * item.buyPrice },
    removePurchaseItem(productId) { this.purchaseItems = this.purchaseItems.filter(i => i.product.id !== productId) },
    savePurchase() {
      const supplier = this.suppliers.find(s => s.id === this.purchaseSupplierId)
      const po = {
        id: 'PO-' + Date.now(), poNumber: 'PUR-' + String(Date.now()).slice(-6),
        supplierId: this.purchaseSupplierId, supplierName: supplier ? supplier.name : '',
        items: JSON.parse(JSON.stringify(this.purchaseItems)), total: this.purchaseTotal,
        date: new Date().toISOString(), status: 'received', createdBy: this.$store.state.currentUser.name
      }
      this.$store.commit('ADD_PURCHASE_ORDER', po)
      this.purchaseItems = []
      alert('Pembelian berhasil!')
    },
    // Supplier
    saveSupplier() {
      this.$store.commit('ADD_SUPPLIER', { ...this.supplierForm, id: 's' + Date.now(), active: true })
      this.showSupplierModal = false
      this.supplierForm = { name: '', phone: '', address: '' }
    },
    // Customer
    saveCustomer() {
      this.$store.commit('ADD_CUSTOMER', { ...this.customerForm, id: 'c' + Date.now(), points: 0, totalSpent: 0, isMember: false, joinDate: new Date().toISOString() })
      this.showCustomerModal = false
      this.customerForm = { name: '', phone: '' }
    },
    // Expense
    saveExpense() {
      this.$store.commit('ADD_EXPENSE', { ...this.expenseForm, id: 'EXP-' + Date.now(), date: new Date().toISOString(), createdBy: this.$store.state.currentUser.name })
      this.showExpenseModal = false
      this.expenseForm = { category: '', description: '', amount: 0 }
    },
    // Adjustment
    saveAdjustment() {
      const product = this.products.find(p => p.id === this.adjustProductId)
      if (!product) return
      const newStock = product.stock + this.adjustQty
      if (newStock < 0) { alert('Stok tidak boleh negatif!'); return }
      this.$store.commit('ADJUST_STOCK', { productId: this.adjustProductId, adjustment: this.adjustQty, reason: this.adjustReason })
      alert('Stok disesuaikan!')
      this.adjustProductId = ''
      this.adjustQty = 0
      this.adjustReason = ''
    },
    // Opname
    startOpname() {
      this.opnameItems = this.products.map(p => ({ productId: p.id, systemStock: p.stock, physicalStock: p.stock, difference: 0 }))
      this.opnameStarted = true
    },
    updateOpnameDiff(item) { item.difference = item.physicalStock - item.systemStock },
    saveOpname() {
      this.$store.commit('SAVE_OPNAME', this.opnameItems.filter(i => i.difference !== 0))
      alert('Opname selesai!')
      this.opnameStarted = false
      this.opnameItems = []
    },
    // Settings
    saveSettings() {
      this.$store.commit('UPDATE_STORE_SETTINGS', this.storeSettings)
      alert('Tersimpan!')
    }
  }
}
</script>

<style scoped>
.page { padding: 1.5rem; }
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
.page-header h2 { font-size: 1.5rem; font-weight: 700; }
.card { background: white; border-radius: 0.75rem; border: 1px solid #e5e7eb; padding: 1.5rem; margin-bottom: 1rem; }
.table-container { background: white; border-radius: 0.75rem; border: 1px solid #e5e7eb; overflow: hidden; }
.data-table { width: 100%; border-collapse: collapse; }
.data-table th { background: #f9fafb; padding: 0.75rem; text-align: left; font-weight: 600; font-size: 0.75rem; color: #6b7280; }
.data-table td { padding: 0.75rem; border-top: 1px solid #f3f4f6; font-size: 0.875rem; }
.data-table tr:hover { background: #f9fafb; }
.form-group { margin-bottom: 1rem; }
.form-group label { display: block; font-size: 0.75rem; font-weight: 500; margin-bottom: 0.25rem; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.input-sm { padding: 0.25rem 0.5rem; border: 1px solid #d1d5db; border-radius: 0.25rem; font-size: 0.75rem; width: 80px; }
.section-title { font-weight: 600; margin: 1rem 0 0.5rem; }
.empty-state { text-align: center; padding: 2rem; color: #9ca3af; }
.purchase-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #e5e7eb; }
.total-display { font-size: 1.25rem; }
.total-display strong { color: #1d4ed8; }
.actions { display: flex; gap: 0.5rem; }
.stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1rem; }
.stat-box { background: white; border-radius: 0.75rem; padding: 1rem; border: 1px solid #e5e7eb; }
.stat-box p { font-size: 0.75rem; color: #6b7280; margin-bottom: 0.25rem; }
.stat-box strong { font-size: 1.25rem; }
.stat-box.warning strong { color: #dc2626; }
.stock-value { font-weight: 700; }
.stock-value.low { color: #dc2626; }
.mutation-type { padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.75rem; font-weight: 600; }
.mutation-type.in { background: #dcfce7; color: #166534; }
.mutation-type.out { background: #fee2e2; color: #991b1b; }
.mutation-type.adjustment { background: #fef9c3; color: #854d0e; }
.mutation-type.opname { background: #f3e8ff; color: #6b21a8; }
.grid-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1rem; }
.card-item { background: white; border-radius: 0.75rem; border: 1px solid #e5e7eb; padding: 1rem; display: flex; gap: 1rem; }
.card-icon { width: 2.5rem; height: 2.5rem; background: #dbeafe; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; color: #2563eb; }
.card-content h4 { font-weight: 600; margin-bottom: 0.25rem; }
.card-content p { font-size: 0.75rem; color: #6b7280; }
.badge-purple { background: #f3e8ff; color: #6b21a8; padding: 0.15rem 0.5rem; border-radius: 9999px; font-size: 0.65rem; font-weight: 600; }
.badge-blue { background: #dbeafe; color: #1e40af; padding: 0.15rem 0.5rem; border-radius: 9999px; font-size: 0.65rem; font-weight: 600; }
.badge-administrator { background: #fee2e2; color: #991b1b; padding: 0.15rem 0.5rem; border-radius: 9999px; font-size: 0.65rem; font-weight: 600; }
.badge-owner { background: #f3e8ff; color: #6b21a8; padding: 0.15rem 0.5rem; border-radius: 9999px; font-size: 0.65rem; font-weight: 600; }
.badge-manager { background: #dbeafe; color: #1e40af; padding: 0.15rem 0.5rem; border-radius: 9999px; font-size: 0.65rem; font-weight: 600; }
.badge-cashier { background: #dcfce7; color: #166534; padding: 0.15rem 0.5rem; border-radius: 9999px; font-size: 0.65rem; font-weight: 600; }
.status-badge { padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.75rem; font-weight: 600; }
.status-badge.active { background: #dcfce7; color: #166534; }
.status-badge.inactive { background: #f3f4f6; color: #6b7280; }
.status-badge.warning { background: #fef9c3; color: #854d0e; }
.btn-icon { background: none; border: none; cursor: pointer; padding: 0.25rem; color: #6b7280; }
.btn-icon:hover { color: #2563eb; }
.btn-icon.danger:hover { color: #dc2626; }
.profit-row { display: flex; justify-content: space-between; padding: 0.75rem; background: #f9fafb; border-radius: 0.5rem; margin-bottom: 0.5rem; }
.profit-row.total { background: linear-gradient(to right, #16a34a, #059669); color: white; margin-top: 1rem; font-size: 1.125rem; }
</style>
