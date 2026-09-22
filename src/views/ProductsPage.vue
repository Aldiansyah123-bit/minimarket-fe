<template>
  <div class="products-page">
    <div class="page-header">
      <h2>Semua Produk</h2>
      <button @click="showAddModal = true" class="btn btn-primary">
        <i class="fas fa-plus"></i> Tambah Produk
      </button>
    </div>

    <div class="filters">
      <input v-model="search" type="text" placeholder="Cari produk..." class="input" />
      <select v-model="filterCategory" class="select">
        <option value="">Semua Kategori</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
      </select>
    </div>

    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th>Nama</th>
            <th>SKU</th>
            <th>Kategori</th>
            <th>Brand</th>
            <th>Harga Jual</th>
            <th>Stok</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in filteredProducts" :key="product.id">
            <td>{{ product.name }}</td>
            <td><code>{{ product.sku }}</code></td>
            <td>{{ getCategoryName(product.categoryId) }}</td>
            <td>{{ getBrandName(product.brandId) }}</td>
            <td>{{ formatRupiah(product.sellPrice) }}</td>
            <td>
              <span :class="['stock-badge', product.stock <= product.minStock ? 'low' : '']">
                {{ product.stock }}
              </span>
            </td>
            <td>
              <span :class="['status-badge', product.status]">
                {{ product.status === 'active' ? 'Aktif' : 'Nonaktif' }}
              </span>
            </td>
            <td>
              <button @click="editProduct(product)" class="btn-icon"><i class="fas fa-edit"></i></button>
              <button @click="deleteProduct(product.id)" class="btn-icon danger"><i class="fas fa-trash"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showAddModal" class="modal-overlay" @click.self="showAddModal = false">
      <div class="modal">
        <div class="modal-header">
          <h3>{{ editingProduct ? 'Edit' : 'Tambah' }} Produk</h3>
          <button @click="showAddModal = false" class="close-btn"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>Nama Produk</label>
            <input v-model="productForm.name" type="text" class="input" />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>SKU</label>
              <input v-model="productForm.sku" type="text" class="input" />
            </div>
            <div class="form-group">
              <label>Barcode</label>
              <input v-model="productForm.barcode" type="text" class="input" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Kategori</label>
              <select v-model="productForm.categoryId" class="select">
                <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
              </select>
            </div>
            <div class="form-group">
              <label>Brand</label>
              <select v-model="productForm.brandId" class="select">
                <option v-for="brand in brands" :key="brand.id" :value="brand.id">{{ brand.name }}</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Harga Beli</label>
              <input v-model.number="productForm.buyPrice" type="number" class="input" />
            </div>
            <div class="form-group">
              <label>Harga Jual</label>
              <input v-model.number="productForm.sellPrice" type="number" class="input" />
            </div>
            <div class="form-group">
              <label>Stok</label>
              <input v-model.number="productForm.stock" type="number" class="input" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Min Stok</label>
              <input v-model.number="productForm.minStock" type="number" class="input" />
            </div>
            <div class="form-group">
              <label>Unit</label>
              <select v-model="productForm.unitId" class="select">
                <option v-for="unit in units" :key="unit.id" :value="unit.id">{{ unit.name }}</option>
              </select>
            </div>
            <div class="form-group">
              <label>Status</label>
              <select v-model="productForm.status" class="select">
                <option value="active">Aktif</option>
                <option value="inactive">Nonaktif</option>
              </select>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="showAddModal = false" class="btn btn-secondary">Batal</button>
          <button @click="saveProduct" class="btn btn-primary">Simpan</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductsPage',
  data() {
    return {
      search: '',
      filterCategory: '',
      showAddModal: false,
      editingProduct: null,
      productForm: {
        name: '', sku: '', barcode: '', categoryId: 'cat1', brandId: 'b1',
        buyPrice: 0, sellPrice: 0, stock: 0, minStock: 10, unitId: 'u1', status: 'active'
      }
    }
  },
  computed: {
    categories() { return this.$store.state.categories },
    brands() { return this.$store.state.brands },
    units() { return this.$store.state.units },
    products() { return this.$store.state.products },
    filteredProducts() {
      return this.products.filter(p => {
        const matchSearch = p.name.toLowerCase().includes(this.search.toLowerCase()) ||
                           p.sku.toLowerCase().includes(this.search.toLowerCase())
        const matchCategory = !this.filterCategory || p.categoryId === this.filterCategory
        return matchSearch && matchCategory
      })
    }
  },
  methods: {
    formatRupiah(n) { return 'Rp ' + (n || 0).toLocaleString('id-ID') },
    getCategoryName(id) {
      const cat = this.categories.find(c => c.id === id)
      return cat ? cat.name : '-'
    },
    getBrandName(id) {
      const brand = this.brands.find(b => b.id === id)
      return brand ? brand.name : '-'
    },
    editProduct(product) {
      this.editingProduct = product
      this.productForm = { ...product }
      this.showAddModal = true
    },
    saveProduct() {
      if (this.editingProduct) {
        this.$store.commit('UPDATE_PRODUCT', { id: this.editingProduct.id, data: this.productForm })
      } else {
        this.$store.commit('ADD_PRODUCT', { ...this.productForm, id: 'p' + Date.now() })
      }
      this.showAddModal = false
      this.editingProduct = null
      this.resetForm()
    },
    deleteProduct(id) {
      if (confirm('Hapus produk ini?')) {
        this.$store.commit('DELETE_PRODUCT', id)
      }
    },
    resetForm() {
      this.productForm = {
        name: '', sku: '', barcode: '', categoryId: 'cat1', brandId: 'b1',
        buyPrice: 0, sellPrice: 0, stock: 0, minStock: 10, unitId: 'u1', status: 'active'
      }
    }
  }
}
</script>

<style scoped>
.products-page { padding: 1.5rem; }
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
.page-header h2 { font-size: 1.5rem; font-weight: 700; }
.filters { display: flex; gap: 1rem; margin-bottom: 1rem; }
.filters .input { flex: 1; }
.table-container { background: white; border-radius: 0.75rem; border: 1px solid #e5e7eb; overflow: hidden; }
.data-table { width: 100%; border-collapse: collapse; }
.data-table th { background: #f9fafb; padding: 0.75rem; text-align: left; font-weight: 600; font-size: 0.75rem; color: #6b7280; }
.data-table td { padding: 0.75rem; border-top: 1px solid #f3f4f6; font-size: 0.875rem; }
.data-table tr:hover { background: #f9fafb; }
.stock-badge { padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.75rem; font-weight: 600; }
.stock-badge.low { background: #fee2e2; color: #991b1b; }
.status-badge { padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.75rem; font-weight: 600; }
.status-badge.active { background: #dcfce7; color: #166534; }
.status-badge.inactive { background: #f3f4f6; color: #6b7280; }
.btn-icon { background: none; border: none; cursor: pointer; padding: 0.25rem; color: #6b7280; }
.btn-icon:hover { color: #2563eb; }
.btn-icon.danger:hover { color: #dc2626; }
.form-row { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; }
</style>
