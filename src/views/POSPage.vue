<template>
  <div class="pos-page">
    <div class="pos-layout">
      <!-- Products Section -->
      <div class="pos-products">
        <div class="pos-header">
          <div class="search-box">
            <i class="fas fa-search"></i>
            <input 
              v-model="search" 
              type="text" 
              placeholder="🔍 Scan barcode / Cari produk..."
            />
          </div>
          <div class="category-bar">
            <button 
              :class="['cat-btn', { active: activeCategory === 'all' }]"
              @click="activeCategory = 'all'"
            >
              <i class="fas fa-border-all"></i> Semua
            </button>
            <button 
              v-for="cat in categories" 
              :key="cat.id"
              :class="['cat-btn', { active: activeCategory === cat.id }]"
              @click="activeCategory = cat.id"
            >
              <i :class="'fas ' + cat.icon"></i> {{ cat.name }}
            </button>
          </div>
        </div>
        
        <div class="product-grid">
          <button 
            v-for="product in filteredProducts" 
            :key="product.id"
            class="product-card"
            :disabled="product.stock <= 0"
            @click="addToCart(product)"
          >
            <div 
              class="product-icon"
              :style="{ background: getCategoryColor(product.categoryId) }"
            >
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

      <!-- Cart Section -->
      <div class="pos-cart">
        <div class="cart-header">
          <div class="cart-title">
            <i class="fas fa-shopping-cart"></i>
            <h2>Keranjang</h2>
          </div>
          <span class="cart-count">{{ cartTotalItems }} item</span>
          <p class="cart-total">{{ formatRupiah(cartGrandTotal) }}</p>
        </div>
        
        <div class="customer-select">
          <select v-model="selectedCustomerId">
            <option v-for="c in customers" :key="c.id" :value="c.id">
              {{ c.name }} {{ c.isMember ? '(' + c.memberCode + ')' : '' }}
            </option>
          </select>
        </div>
        
        <div class="cart-items">
          <div v-if="cart.length === 0" class="empty-cart">
            <i class="fas fa-cart-shopping"></i>
            <p>Keranjang kosong</p>
            <small>Klik produk untuk menambahkan</small>
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
          <div class="summary-row">
            <span>Subtotal</span>
            <span>{{ formatRupiah(cartSubtotal) }}</span>
          </div>
          <div class="summary-row">
            <span>PPN ({{ storeSettings.taxRate }}%)</span>
            <span>{{ formatRupiah(cartTax) }}</span>
          </div>
          <div class="summary-row total">
            <span>TOTAL</span>
            <span>{{ formatRupiah(cartGrandTotal) }}</span>
          </div>
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

    <!-- Payment Modal -->
    <div v-if="showPaymentModal" class="modal-overlay" @click.self="showPaymentModal = false">
      <div class="modal-box">
        <div class="modal-header">
          <h2><i class="fas fa-cash-register"></i> Pembayaran</h2>
          <button @click="showPaymentModal = false" class="close-btn">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="payment-total">
            <p>Total Pembayaran</p>
            <p class="amount">{{ formatRupiah(cartGrandTotal) }}</p>
          </div>
          <div class="payment-methods">
            <button 
              v-for="pm in paymentMethods.filter(p => p.active)" 
              :key="pm.id"
              @click="paymentMethod = pm.name"
              :class="['method-btn', { active: paymentMethod === pm.name }]"
            >
              <i :class="'fas ' + pm.icon"></i>
              {{ pm.name }}
            </button>
          </div>
          <div v-if="paymentMethod === 'Tunai'" class="cash-input">
            <div class="input-wrapper">
              <span>Rp</span>
              <input 
                v-model="cashInput" 
                type="text" 
                placeholder="0"
              />
            </div>
            <div v-if="cashValue > 0" :class="['change-box', cashChange >= 0 ? 'success' : 'danger']">
              <p>Kembalian</p>
              <p class="amount">{{ cashChange >= 0 ? formatRupiah(cashChange) : 'Kurang ' + formatRupiah(Math.abs(cashChange)) }}</p>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="showPaymentModal = false" class="btn-cancel">Batal</button>
          <button @click="processPayment" :disabled="!isPaymentValid" class="btn-process">
            <i class="fas fa-check-circle"></i> Proses Pembayaran
          </button>
        </div>
      </div>
    </div>

    <!-- Receipt Modal -->
    <div v-if="showReceiptModal && lastTransaction" class="modal-overlay" @click.self="showReceiptModal = false">
      <div class="modal-box receipt-modal">
        <div class="receipt-header">
          <div class="success-icon">
            <i class="fas fa-check"></i>
          </div>
          <h2>Transaksi Berhasil!</h2>
        </div>
        <div class="receipt-body">
          <div class="receipt">
            <div class="receipt-store">
              <p class="store-name">{{ storeSettings.name }}</p>
              <p class="store-address">{{ storeSettings.address }}</p>
            </div>
            <div class="receipt-info">
              <div class="info-row">
                <span>No:</span>
                <span>{{ lastTransaction.invoiceNo }}</span>
              </div>
              <div class="info-row">
                <span>Kasir:</span>
                <span>{{ lastTransaction.cashierName }}</span>
              </div>
            </div>
            <div class="receipt-items">
              <div v-for="item in lastTransaction.items" :key="item.product.id" class="receipt-item">
                <p class="item-name">{{ item.product.name }}</p>
                <div class="item-detail">
                  <span>{{ item.quantity }} x {{ formatRupiah(item.product.sellPrice) }}</span>
                  <span>{{ formatRupiah(item.product.sellPrice * item.quantity) }}</span>
                </div>
              </div>
            </div>
            <div class="receipt-total">
              <div class="total-row">
                <span>TOTAL:</span>
                <span>{{ formatRupiah(lastTransaction.total) }}</span>
              </div>
            </div>
            <div class="receipt-payment">
              <div class="payment-row">
                <span>Bayar ({{ lastTransaction.paymentMethod }}):</span>
                <span>{{ formatRupiah(lastTransaction.paymentAmount) }}</span>
              </div>
              <div v-if="lastTransaction.change > 0" class="payment-row">
                <span>Kembali:</span>
                <span>{{ formatRupiah(lastTransaction.change) }}</span>
              </div>
            </div>
            <div class="receipt-footer">
              <p>Terima kasih atas kunjungan Anda</p>
            </div>
          </div>
        </div>
        <div class="receipt-actions">
          <button @click="newTransaction" class="btn-new">
            <i class="fas fa-plus"></i> Transaksi Baru
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'POSPage',
  data() {
    return {
      search: '',
      activeCategory: 'all',
      cart: [],
      selectedCustomerId: 'c0',
      showPaymentModal: false,
      paymentMethod: 'Tunai',
      cashInput: '',
      showReceiptModal: false,
      lastTransaction: null
    }
  },
  computed: {
    categories() {
      return this.$store.state.categories
    },
    customers() {
      return this.$store.state.customers
    },
    paymentMethods() {
      return this.$store.state.paymentMethods
    },
    storeSettings() {
      return this.$store.state.storeSettings
    },
    filteredProducts() {
      return this.$store.state.products.filter(p => {
        if (p.status !== 'active') return false
        const matchCat = this.activeCategory === 'all' || p.categoryId === this.activeCategory
        const matchSearch = p.name.toLowerCase().includes(this.search.toLowerCase()) ||
          p.barcode.includes(this.search) ||
          p.sku.toLowerCase().includes(this.search.toLowerCase())
        return matchCat && matchSearch
      })
    },
    cartTotalItems() {
      return this.cart.reduce((s, i) => s + i.quantity, 0)
    },
    cartSubtotal() {
      return this.cart.reduce((s, i) => s + i.product.sellPrice * i.quantity, 0)
    },
    cartTax() {
      return Math.round(this.cartSubtotal * (this.storeSettings.taxRate / 100))
    },
    cartGrandTotal() {
      return this.cartSubtotal + this.cartTax
    },
    cashValue() {
      return parseInt(String(this.cashInput).replace(/\D/g, '')) || 0
    },
    cashChange() {
      return this.cashValue - this.cartGrandTotal
    },
    isPaymentValid() {
      if (this.paymentMethod === 'Tunai') return this.cashValue >= this.cartGrandTotal
      return true
    }
  },
  methods: {
    formatRupiah(n) {
      return 'Rp ' + (n || 0).toLocaleString('id-ID')
    },
    getCategoryIcon(id) {
      const cat = this.$store.state.categories.find(c => c.id === id)
      return cat ? cat.icon : 'fa-box'
    },
    getCategoryColor(id) {
      const cat = this.$store.state.categories.find(c => c.id === id)
      return cat ? cat.color : '#f3f4f6'
    },
    getUnitName(id) {
      const unit = this.$store.state.units.find(u => u.id === id)
      return unit ? unit.shortName : '-'
    },
    getStockBadge(product) {
      if (product.stock === 0) return 'badge-red'
      if (product.stock <= product.minStock) return 'badge-yellow'
      return 'badge-green'
    },
    addToCart(product) {
      if (product.stock <= 0) return
      const existing = this.cart.find(i => i.product.id === product.id)
      if (existing) {
        if (existing.quantity < product.stock) existing.quantity++
      } else {
        this.cart.push({ product: JSON.parse(JSON.stringify(product)), quantity: 1 })
      }
    },
    updateCartQty(productId, delta) {
      const item = this.cart.find(i => i.product.id === productId)
      if (!item) return
      const newQty = item.quantity + delta
      if (newQty <= 0) {
        this.removeFromCart(productId)
        return
      }
      if (newQty > item.product.stock) return
      item.quantity = newQty
    },
    removeFromCart(productId) {
      this.cart = this.cart.filter(i => i.product.id !== productId)
    },
    clearCart() {
      this.cart = []
    },
    processPayment() {
      if (!this.isPaymentValid) return
      const change = this.paymentMethod === 'Tunai' ? this.cashChange : 0
      const payment = this.paymentMethod === 'Tunai' ? this.cashValue : this.cartGrandTotal
      const transaction = {
        id: 'TX-' + Date.now(),
        invoiceNo: 'INV-' + String(Date.now()).slice(-6),
        items: JSON.parse(JSON.stringify(this.cart)),
        subtotal: this.cartSubtotal,
        discount: 0,
        tax: this.cartTax,
        total: this.cartGrandTotal,
        paymentMethod: this.paymentMethod,
        paymentAmount: payment,
        change: change,
        customerId: this.selectedCustomerId,
        customerName: (this.customers.find(c => c.id === this.selectedCustomerId) || {}).name || 'Walk-in',
        cashierId: this.$store.state.currentUser.id,
        cashierName: this.$store.state.currentUser.name,
        date: new Date().toISOString(),
        status: 'completed',
        shiftId: this.$store.state.currentShift ? this.$store.state.currentShift.id : ''
      }
      this.$store.dispatch('addSaleTransaction', transaction)
      this.lastTransaction = transaction
      this.showPaymentModal = false
      this.showReceiptModal = true
      this.cart = []
      this.cashInput = ''
    },
    newTransaction() {
      this.showReceiptModal = false
      this.lastTransaction = null
    }
  }
}
</script>

<style scoped>
.pos-page {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.pos-layout {
  display: flex;
  height: 100%;
  overflow: hidden;
}

.pos-products {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.pos-header {
  padding: 0.75rem;
  background: white;
  border-bottom: 1px solid #e5e7eb;
}

.search-box {
  position: relative;
  margin-bottom: 0.5rem;
}

.search-box i {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
}

.search-box input {
  width: 100%;
  padding: 0.5rem 0.75rem 0.5rem 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  outline: none;
}

.search-box input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
}

.category-bar {
  display: flex;
  gap: 0.4rem;
  overflow-x: auto;
  padding-bottom: 0.25rem;
}

.category-bar::-webkit-scrollbar {
  display: none;
}

.cat-btn {
  padding: 0.35rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.7rem;
  font-weight: 500;
  white-space: nowrap;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.cat-btn.active {
  background: #2563eb;
  color: white;
}

.cat-btn:not(.active) {
  background: #f3f4f6;
  color: #4b5563;
}

.cat-btn:not(.active):hover {
  background: #e5e7eb;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 0.5rem;
  padding: 0.75rem;
  overflow-y: auto;
  flex: 1;
}

.product-card {
  background: white;
  border: 2px solid #f3f4f6;
  border-radius: 0.75rem;
  padding: 0.6rem;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
}

.product-card:hover:not(:disabled) {
  border-color: #93c5fd;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.product-card:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.product-icon {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.4rem;
  font-size: 1.2rem;
}

.product-name {
  font-size: 0.65rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.2rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.3;
}

.product-price {
  font-size: 0.8rem;
  font-weight: 700;
  color: #1d4ed8;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.2rem;
}

.badge {
  font-size: 0.55rem;
  padding: 0.15rem 0.5rem;
  border-radius: 9999px;
  font-weight: 600;
}

.badge-green {
  background: #dcfce7;
  color: #166534;
}

.badge-yellow {
  background: #fef9c3;
  color: #854d0e;
}

.badge-red {
  background: #fee2e2;
  color: #991b1b;
}

.sku {
  font-size: 0.55rem;
  color: #9ca3af;
}

.pos-cart {
  width: 360px;
  background: white;
  border-left: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  box-shadow: -4px 0 15px rgba(0, 0, 0, 0.05);
}

.cart-header {
  background: linear-gradient(to right, #2563eb, #1d4ed8);
  color: white;
  padding: 0.75rem;
}

.cart-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.cart-title h2 {
  font-weight: 700;
  font-size: 0.8rem;
}

.cart-count {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.15rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.65rem;
  display: inline-block;
  margin-bottom: 0.25rem;
}

.cart-total {
  font-size: 1.3rem;
  font-weight: 700;
}

.customer-select {
  padding: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
}

.customer-select select {
  width: 100%;
  padding: 0.3rem;
  font-size: 0.7rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  outline: none;
}

.cart-items {
  flex: 1;
  overflow-y: auto;
}

.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #9ca3af;
  padding: 1.5rem;
}

.empty-cart i {
  font-size: 2.5rem;
  margin-bottom: 0.75rem;
  opacity: 0.3;
}

.empty-cart p {
  font-size: 0.75rem;
  font-weight: 500;
}

.empty-cart small {
  font-size: 0.6rem;
  margin-top: 0.25rem;
}

.cart-list {
  display: flex;
  flex-direction: column;
}

.cart-item {
  padding: 0.6rem;
  border-bottom: 1px solid #f3f4f6;
}

.item-header {
  display: flex;
  align-items: start;
  gap: 0.5rem;
  margin-bottom: 0.4rem;
}

.item-info {
  flex: 1;
  min-width: 0;
}

.item-info h4 {
  font-size: 0.7rem;
  font-weight: 500;
  color: #1f2937;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-info p {
  font-size: 0.6rem;
  color: #6b7280;
}

.remove-btn {
  background: none;
  border: none;
  color: #f87171;
  cursor: pointer;
  font-size: 0.6rem;
  padding: 0.2rem;
}

.item-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.qty-controls {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.qty-controls button {
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 0.25rem;
  background: #f3f4f6;
  border: none;
  cursor: pointer;
  font-weight: 700;
  font-size: 0.7rem;
}

.qty-controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.qty-controls span {
  width: 2rem;
  text-align: center;
  font-size: 0.7rem;
  font-weight: 700;
}

.item-subtotal {
  font-size: 0.7rem;
  font-weight: 700;
  color: #1d4ed8;
}

.cart-footer {
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
  padding: 0.75rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.7rem;
  margin-bottom: 0.3rem;
}

.summary-row span:first-child {
  color: #6b7280;
}

.summary-row.total {
  font-size: 1rem;
  font-weight: 700;
  border-top: 1px solid #e5e7eb;
  padding-top: 0.4rem;
  margin-top: 0.3rem;
}

.summary-row.total span:last-child {
  color: #1d4ed8;
}

.cart-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.btn-cancel {
  padding: 0.5rem 0.75rem;
  background: #e5e7eb;
  color: #374151;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.7rem;
  font-weight: 600;
  cursor: pointer;
}

.btn-cancel:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-pay {
  flex: 1;
  padding: 0.5rem;
  background: #16a34a;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.7rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
}

.btn-pay:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.modal-box {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  width: 100%;
  max-width: 32rem;
  margin: 1rem;
  overflow: hidden;
}

.modal-header {
  padding: 1rem;
  background: linear-gradient(to right, #2563eb, #1d4ed8);
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-header h2 {
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.close-btn {
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-body {
  padding: 1rem;
  max-height: 60vh;
  overflow-y: auto;
}

.payment-total {
  background: #111827;
  color: white;
  border-radius: 0.75rem;
  padding: 1rem;
  text-align: center;
  margin-bottom: 1rem;
}

.payment-total p:first-child {
  font-size: 0.7rem;
  color: #9ca3af;
}

.payment-total .amount {
  font-size: 1.5rem;
  font-weight: 700;
}

.payment-methods {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.method-btn {
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 2px solid #e5e7eb;
  text-align: center;
  cursor: pointer;
  font-size: 0.7rem;
  font-weight: 500;
  transition: all 0.2s;
}

.method-btn.active {
  border-color: #2563eb;
  background: #eff6ff;
}

.method-btn i {
  color: #2563eb;
  display: block;
  margin-bottom: 0.2rem;
}

.cash-input {
  margin-top: 1rem;
}

.input-wrapper {
  position: relative;
  margin-bottom: 0.75rem;
}

.input-wrapper span {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
  font-weight: 500;
}

.input-wrapper input {
  width: 100%;
  padding: 0.5rem 0.75rem 0.5rem 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1.2rem;
  font-weight: 700;
  outline: none;
}

.input-wrapper input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
}

.change-box {
  padding: 0.75rem;
  border-radius: 0.5rem;
  text-align: center;
}

.change-box.success {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
}

.change-box.danger {
  background: #fef2f2;
  border: 1px solid #fecaca;
}

.change-box p:first-child {
  font-size: 0.7rem;
  color: #4b5563;
}

.change-box .amount {
  font-size: 1.3rem;
  font-weight: 700;
}

.change-box.success .amount {
  color: #16a34a;
}

.change-box.danger .amount {
  color: #dc2626;
}

.modal-footer {
  padding: 1rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  gap: 0.5rem;
}

.btn-process {
  flex: 1;
  padding: 0.5rem;
  background: #16a34a;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
}

.btn-process:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.receipt-modal {
  max-width: 24rem;
}

.receipt-header {
  background: #16a34a;
  color: white;
  padding: 1rem;
  text-align: center;
}

.success-icon {
  width: 3rem;
  height: 3rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 0.5rem;
}

.success-icon i {
  font-size: 1.2rem;
}

.receipt-body {
  padding: 1rem;
}

.receipt {
  border: 2px dashed #d1d5db;
  border-radius: 0.5rem;
  padding: 1rem;
  font-family: 'Courier New', monospace;
  font-size: 0.7rem;
}

.receipt-store {
  text-align: center;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px dashed #d1d5db;
}

.store-name {
  font-weight: 700;
  font-size: 0.8rem;
}

.store-address {
  font-size: 0.6rem;
  color: #6b7280;
}

.receipt-info {
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px dashed #d1d5db;
}

.info-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.6rem;
}

.receipt-items {
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px dashed #d1d5db;
}

.receipt-item {
  margin-bottom: 0.3rem;
}

.item-name {
  font-size: 0.6rem;
}

.item-detail {
  display: flex;
  justify-content: space-between;
  font-size: 0.55rem;
  color: #6b7280;
}

.receipt-total {
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px dashed #d1d5db;
}

.total-row {
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  font-size: 0.75rem;
}

.receipt-payment {
  margin-bottom: 0.5rem;
}

.payment-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.6rem;
}

.receipt-footer {
  text-align: center;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px dashed #d1d5db;
}

.receipt-footer p {
  font-size: 0.55rem;
  color: #6b7280;
}

.receipt-actions {
  padding: 0.75rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  gap: 0.5rem;
}

.btn-new {
  flex: 1;
  padding: 0.5rem;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
}

@media (max-width: 768px) {
  .pos-cart {
    width: 280px;
  }
  
  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  }
}
</style>
