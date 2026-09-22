import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';

export default function ProductsPage() {
  const { products, categories, brands, units, addProduct, updateProduct, deleteProduct } = useStore();
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [productForm, setProductForm] = useState({
    name: '', sku: '', barcode: '', categoryId: 'cat1', brandId: 'b1',
    buyPrice: 0, sellPrice: 0, wholesalePrice: 0, stock: 0, minStock: 10, unitId: 'u1', status: 'active' as 'active' | 'inactive'
  });

  const filteredProducts = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    const matchCategory = !filterCategory || p.categoryId === filterCategory;
    return matchSearch && matchCategory;
  });

  const formatRupiah = (n: number) => 'Rp ' + (n || 0).toLocaleString('id-ID');

  const getCategoryName = (id: string) => {
    const cat = categories.find(c => c.id === id);
    return cat ? cat.name : '-';
  };

  const getBrandName = (id: string) => {
    const brand = brands.find(b => b.id === id);
    return brand ? brand.name : '-';
  };

  const editProduct = (product: any) => {
    setEditingProduct(product);
    setProductForm({ ...product });
    setShowModal(true);
  };

  const saveProduct = () => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productForm);
    } else {
      addProduct({ ...productForm, id: 'p' + Date.now() });
    }
    setShowModal(false);
    setEditingProduct(null);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus produk ini?')) {
      deleteProduct(id);
    }
  };

  const resetForm = () => {
    setProductForm({
      name: '', sku: '', barcode: '', categoryId: 'cat1', brandId: 'b1',
      buyPrice: 0, sellPrice: 0, wholesalePrice: 0, stock: 0, minStock: 10, unitId: 'u1', status: 'active'
    });
  };

  return (
    <div className="h-full overflow-y-auto p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Semua Produk</h2>
            <p className="text-sm text-gray-500">{products.length} produk terdaftar</p>
          </div>
          <button
            onClick={() => { setEditingProduct(null); resetForm(); setShowModal(true); }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm"
          >
            <i className="fas fa-plus mr-1"></i>Tambah Produk
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-3 mb-4 flex gap-3">
          <div className="flex-1 relative">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
            <input
              type="text"
              placeholder="Cari nama / SKU / barcode..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
            />
          </div>
          <select
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
          >
            <option value="">Semua Kategori</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-2.5 px-4 font-medium text-gray-500">Nama</th>
                <th className="text-left py-2.5 px-4 font-medium text-gray-500">SKU</th>
                <th className="text-left py-2.5 px-4 font-medium text-gray-500">Kategori</th>
                <th className="text-left py-2.5 px-4 font-medium text-gray-500">Brand</th>
                <th className="text-right py-2.5 px-4 font-medium text-gray-500">Harga Jual</th>
                <th className="text-right py-2.5 px-4 font-medium text-gray-500">Stok</th>
                <th className="text-center py-2.5 px-4 font-medium text-gray-500">Status</th>
                <th className="text-center py-2.5 px-4 font-medium text-gray-500">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredProducts.map(p => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4">
                    <p className="font-medium">{p.name}</p>
                    <p className="text-xs text-gray-400">{p.barcode}</p>
                  </td>
                  <td className="py-2.5 px-4 font-mono text-xs">{p.sku}</td>
                  <td className="py-2.5 px-4 text-xs">{getCategoryName(p.categoryId)}</td>
                  <td className="py-2.5 px-4 text-xs">{getBrandName(p.brandId)}</td>
                  <td className="py-2.5 px-4 text-right font-medium">{formatRupiah(p.sellPrice)}</td>
                  <td className="py-2.5 px-4 text-right">
                    <span className={`font-medium ${p.stock <= p.minStock ? 'text-red-600' : 'text-gray-800'}`}>{p.stock}</span>
                  </td>
                  <td className="py-2.5 px-4 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${p.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {p.status === 'active' ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-center">
                    <button onClick={() => editProduct(p)} className="text-blue-600 hover:text-blue-800 mr-2">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-700">
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Product Form Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden max-h-[90vh] flex flex-col">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 flex items-center justify-between">
                <h2 className="font-bold">{editingProduct ? 'Edit' : 'Tambah'} Produk</h2>
                <button onClick={() => setShowModal(false)} className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30">
                  <i className="fas fa-times text-sm"></i>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="text-xs font-medium text-gray-700 mb-1 block">Nama Produk</label>
                    <input
                      type="text"
                      value={productForm.name}
                      onChange={e => setProductForm({ ...productForm, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700 mb-1 block">SKU</label>
                    <input
                      type="text"
                      value={productForm.sku}
                      onChange={e => setProductForm({ ...productForm, sku: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700 mb-1 block">Barcode</label>
                    <input
                      type="text"
                      value={productForm.barcode}
                      onChange={e => setProductForm({ ...productForm, barcode: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700 mb-1 block">Kategori</label>
                    <select
                      value={productForm.categoryId}
                      onChange={e => setProductForm({ ...productForm, categoryId: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700 mb-1 block">Brand</label>
                    <select
                      value={productForm.brandId}
                      onChange={e => setProductForm({ ...productForm, brandId: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700 mb-1 block">Unit</label>
                    <select
                      value={productForm.unitId}
                      onChange={e => setProductForm({ ...productForm, unitId: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      {units.map(u => <option key={u.id} value={u.id}>{u.name} ({u.shortName})</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700 mb-1 block">Stok Minimum</label>
                    <input
                      type="number"
                      value={productForm.minStock}
                      onChange={e => setProductForm({ ...productForm, minStock: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700 mb-1 block">Harga Beli</label>
                    <input
                      type="number"
                      value={productForm.buyPrice}
                      onChange={e => setProductForm({ ...productForm, buyPrice: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700 mb-1 block">Harga Jual</label>
                    <input
                      type="number"
                      value={productForm.sellPrice}
                      onChange={e => setProductForm({ ...productForm, sellPrice: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700 mb-1 block">Harga Grosir</label>
                    <input
                      type="number"
                      value={productForm.wholesalePrice}
                      onChange={e => setProductForm({ ...productForm, wholesalePrice: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700 mb-1 block">Status</label>
                    <select
                      value={productForm.status}
                      onChange={e => setProductForm({ ...productForm, status: e.target.value as 'active' | 'inactive' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="active">Aktif</option>
                      <option value="inactive">Nonaktif</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="border-t p-4 flex gap-2">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300">
                  Batal
                </button>
                <button onClick={saveProduct} className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700">
                  <i className="fas fa-save mr-1"></i>{editingProduct ? 'Update' : 'Simpan'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
