<template>
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
            <div 
              class="bar"
              :style="{ height: getBarHeight(hour) + '%' }"
              :title="hour + ':00 - ' + formatRupiah(salesByHour[hour] || 0)"
            ></div>
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
    
    <div class="dashboard-grid">
      <div class="card">
        <h3><i class="fas fa-exclamation-triangle"></i> Stok Menipis</h3>
        <div v-if="lowStockProducts.length === 0" class="empty-state">
          <i class="fas fa-check-circle" style="color: #86efac;"></i>
          <p>Semua stok aman</p>
        </div>
        <div v-else class="stock-list">
          <div v-for="product in lowStockProducts" :key="product.id" class="stock-item">
            <div class="stock-icon" :class="product.stock === 0 ? 'danger' : 'warning'">
              <i :class="'fas ' + (product.stock === 0 ? 'fa-times-circle' : 'fa-exclamation')"></i>
            </div>
            <div class="stock-info">
              <p class="stock-name">{{ product.name }}</p>
              <div class="stock-bar">
                <div 
                  class="bar-fill"
                  :style="{ 
                    width: Math.min((product.stock / product.minStock) * 100, 100) + '%',
                    background: (product.stock / product.minStock) <= 0.3 ? '#dc2626' : '#eab308'
                  }"
                ></div>
              </div>
              <span class="stock-count">{{ product.stock }}/{{ product.minStock }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="card">
        <h3><i class="fas fa-clock-rotate-left"></i> Transaksi Terakhir</h3>
        <div v-if="recentTransactions.length === 0" class="empty-state">
          <i class="fas fa-receipt"></i>
          <p>Belum ada transaksi</p>
        </div>
        <div v-else class="transaction-list">
          <div v-for="t in recentTransactions" :key="t.id" class="transaction-item">
            <div class="transaction-icon">
              <i class="fas fa-receipt"></i>
            </div>
            <div class="transaction-info">
              <p class="transaction-invoice">{{ t.invoiceNo }}</p>
              <p class="transaction-time">{{ formatTime(t.date) }}</p>
            </div>
            <div class="transaction-amount">
              <p class="amount">{{ formatRupiah(t.total) }}</p>
              <p class="method">{{ t.paymentMethod }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardPage',
  computed: {
    stats() {
      const today = new Date().toDateString()
      const todaySales = this.$store.state.salesTransactions.filter(t => 
        new Date(t.date).toDateString() === today
      )
      const totalSales = this.$store.state.salesTransactions.reduce((s, t) => s + t.total, 0)
      const todayTotal = todaySales.reduce((s, t) => s + t.total, 0)
      const cogs = this.$store.state.salesTransactions.reduce((s, t) => 
        s + t.items.reduce((is, i) => is + i.product.buyPrice * i.quantity, 0), 0
      )
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
      this.$store.state.salesTransactions
        .filter(t => new Date(t.date).toDateString() === today)
        .forEach(t => {
          const h = new Date(t.date).getHours()
          result[h] = (result[h] || 0) + t.total
        })
      return result
    },
    chartHours() {
      return Array.from({ length: 14 }, (_, i) => i + 7)
    },
    topProducts() {
      const sales = {}
      this.$store.state.salesTransactions.forEach(t => {
        t.items.forEach(item => {
          if (!sales[item.product.id]) {
            sales[item.product.id] = { name: item.product.name, qty: 0, revenue: 0 }
          }
          sales[item.product.id].qty += item.quantity
          sales[item.product.id].revenue += item.subtotal
        })
      })
      return Object.values(sales).sort((a, b) => b.qty - a.qty).slice(0, 5)
    },
    lowStockProducts() {
      return this.$store.state.products
        .filter(p => p.stock <= p.minStock)
        .sort((a, b) => (a.stock / a.minStock) - (b.stock / b.minStock))
        .slice(0, 5)
    },
    recentTransactions() {
      return this.$store.state.salesTransactions.slice(0, 5)
    }
  },
  methods: {
    formatRupiah(n) {
      return 'Rp ' + (n || 0).toLocaleString('id-ID')
    },
    formatTime(date) {
      return new Date(date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    },
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
</script>

<style scoped>
.dashboard {
  padding: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 1.5rem;
}

.page-header h2 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.page-header p {
  font-size: 0.875rem;
  color: #6b7280;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.stat-card {
  background: white;
  border-radius: 0.75rem;
  padding: 1rem;
  border: 1px solid #e5e7eb;
}

.stat-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.75rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
}

.stat-value {
  font-size: 1rem;
  font-weight: 700;
  color: #1f2937;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.card {
  background: white;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
  padding: 1rem;
}

.card h3 {
  font-weight: 700;
  font-size: 0.875rem;
  color: #1f2937;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 10rem;
  color: #9ca3af;
}

.empty-state i {
  font-size: 2rem;
  margin-bottom: 0.75rem;
  opacity: 0.3;
}

.empty-state p {
  font-size: 0.875rem;
}

.chart-container {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 8rem;
}

.chart-bar {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.bar {
  width: 100%;
  background: linear-gradient(to top, #3b82f6, #60a5fa);
  border-radius: 2px 2px 0 0;
  min-height: 2px;
}

.hour-label {
  font-size: 0.55rem;
  color: #9ca3af;
}

.top-products {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.product-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.rank {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  font-weight: 700;
  color: white;
}

.product-info {
  flex: 1;
  min-width: 0;
}

.product-name {
  font-size: 0.75rem;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-qty {
  font-size: 0.65rem;
  color: #6b7280;
}

.product-revenue {
  font-size: 0.65rem;
  font-weight: 700;
  color: #2563eb;
}

.stock-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stock-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem;
  background: #f9fafb;
  border-radius: 0.5rem;
}

.stock-icon {
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stock-icon.warning {
  background: #fef9c3;
  color: #ca8a04;
}

.stock-icon.danger {
  background: #fee2e2;
  color: #dc2626;
}

.stock-info {
  flex: 1;
  min-width: 0;
}

.stock-name {
  font-size: 0.75rem;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0.2rem;
}

.stock-bar {
  flex: 1;
  height: 0.3rem;
  background: #e5e7eb;
  border-radius: 9999px;
  overflow: hidden;
  margin-bottom: 0.2rem;
}

.bar-fill {
  height: 100%;
  border-radius: 9999px;
}

.stock-count {
  font-size: 0.6rem;
  color: #6b7280;
}

.transaction-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.transaction-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem;
  border-radius: 0.5rem;
}

.transaction-icon {
  width: 2rem;
  height: 2rem;
  background: #dbeafe;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.transaction-icon i {
  font-size: 0.6rem;
  color: #2563eb;
}

.transaction-info {
  flex: 1;
  min-width: 0;
}

.transaction-invoice {
  font-size: 0.75rem;
  font-weight: 500;
}

.transaction-time {
  font-size: 0.6rem;
  color: #6b7280;
}

.transaction-amount {
  text-align: right;
}

.amount {
  font-size: 0.75rem;
  font-weight: 700;
  color: #16a34a;
}

.method {
  font-size: 0.6rem;
  color: #9ca3af;
}

@media (max-width: 768px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}
</style>
