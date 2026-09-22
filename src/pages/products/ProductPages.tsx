import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product, Category, Brand, Unit } from '../../types';

// ==================== ALL PRODUCTS ====================
export function AllProductsPage() {
  const { products, categories, brands, units, formatRupiah, getCategoryName, getBrandName, getUnitName, setProducts } = useStore();
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase()) || p.barcode.includes(search);
    const matchCat = filterCat === 'all' || p.categoryId === filterCat;
    return matchSearch && matchCat;
  });

  const handleSave = (product: Product) => {
    if (editProduct) {
      setProducts(prev => prev.map(p => p.id === product.id ? product : p));
    } else {
      setProducts(prev => [...prev, { ...product, id: 'p' + Date.now() }]);
    }
    setShowForm(false);
    setEditProduct(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus produk ini?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="h-full overflow-y-auto p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Semua Produk</h2>
            <p className="text-sm text-gray-500">{products.length} produk terdaftar</p>
          </div>
          <button onClick={() => { setEditProduct(null); setShowForm(true); }} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm">
            <i className="fas fa-plus mr-1"></i>Tambah Produk
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-3 mb-4 flex gap-3">
          <div className="flex-1 relative">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
            <input type="text" placeholder="Cari nama / SKU / barcode..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <select value={filterCat} onChange={e => setFilterCat(e.target.value)} className="px-3 py-2 border rounded-lg text-sm">
            <option value="all">Semua Kategori</option>
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
              {filtered.map(p => (
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
                    <span className="text-xs text-gray-400 ml-1">{getUnitName(p.unitId)}</span>
                  </td>
                  <td className="py-2.5 px-4 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${p.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{p.status === 'active' ? 'Aktif' : 'Nonaktif'}</span>
                  </td>
                  <td className="py-2.5 px-4 text-center">
                    <button onClick={() => { setEditProduct(p); setShowForm(true); }} className="text-blue-600 hover:text-blue-800 mr-2"><i className="fas fa-edit"></i></button>
                    <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-700"><i className="fas fa-trash"></i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Product Form Modal */}
        {showForm && <ProductFormModal product={editProduct} onSave={handleSave} onClose={() => { setShowForm(false); setEditProduct(null); }} />}
      </div>
    </div>
  );
}

function ProductFormModal({ product, onSave, onClose }: { product: Product | null; onSave: (p: Product) => void; onClose: () => void }) {
  const { categories, brands, units } = useStore();
  const [form, setForm] = useState<Partial<Product>>(product || {
    name: '', sku: '', barcode: '', categoryId: categories[0]?.id || '', brandId: brands[0]?.id || '', unitId: units[0]?.id || '',
    buyPrice: 0, sellPrice: 0, wholesalePrice: 0, stock: 0, minStock: 10, status: 'active'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form as Product);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden max-h-[90vh] flex flex-col">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 flex items-center justify-between">
          <h2 className="font-bold">{product ? 'Edit Produk' : 'Tambah Produk'}</h2>
          <button onClick={onClose} className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center"><i className="fas fa-times text-sm"></i></button>
        </div>
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-xs font-medium text-gray-700 mb-1 block">Nama Produk</label>
              <input type="text" value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })} required className="w-full px-3 py-2 border rounded-lg text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">SKU</label>
              <input type="text" value={form.sku || ''} onChange={e => setForm({ ...form, sku: e.target.value })} required className="w-full px-3 py-2 border rounded-lg text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">Barcode</label>
              <input type="text" value={form.barcode || ''} onChange={e => setForm({ ...form, barcode: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">Kategori</label>
              <select value={form.categoryId || ''} onChange={e => setForm({ ...form, categoryId: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm">
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">Brand</label>
              <select value={form.brandId || ''} onChange={e => setForm({ ...form, brandId: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm">
                {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">Unit</label>
              <select value={form.unitId || ''} onChange={e => setForm({ ...form, unitId: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm">
                {units.map(u => <option key={u.id} value={u.id}>{u.name} ({u.shortName})</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">Stok Minimum</label>
              <input type="number" value={form.minStock || 0} onChange={e => setForm({ ...form, minStock: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 border rounded-lg text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">Harga Beli</label>
              <input type="number" value={form.buyPrice || 0} onChange={e => setForm({ ...form, buyPrice: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 border rounded-lg text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">Harga Jual</label>
              <input type="number" value={form.sellPrice || 0} onChange={e => setForm({ ...form, sellPrice: parseInt(e.target.value) || 0 })} required className="w-full px-3 py-2 border rounded-lg text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">Harga Grosir</label>
              <input type="number" value={form.wholesalePrice || 0} onChange={e => setForm({ ...form, wholesalePrice: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 border rounded-lg text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">Status</label>
              <select value={form.status || 'active'} onChange={e => setForm({ ...form, status: e.target.value as 'active' | 'inactive' })} className="w-full px-3 py-2 border rounded-lg text-sm">
                <option value="active">Aktif</option>
                <option value="inactive">Nonaktif</option>
              </select>
            </div>
          </div>
        </form>
        <div className="border-t p-4 flex gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300">Batal</button>
          <button onClick={handleSubmit} className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700">
            <i className="fas fa-save mr-1"></i>{product ? 'Update' : 'Simpan'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ==================== CATEGORIES ====================
export function CategoriesPage() {
  const { categories, setCategories } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<Category | null>(null);
  const [form, setForm] = useState({ name: '', icon: 'fa-box', color: 'bg-gray-100 text-gray-600' });

  const handleSave = () => {
    if (editItem) {
      setCategories(prev => prev.map(c => c.id === editItem.id ? { ...editItem, ...form } : c));
    } else {
      setCategories(prev => [...prev, { ...form, id: 'cat' + Date.now() }]);
    }
    setShowForm(false);
    setEditItem(null);
    setForm({ name: '', icon: 'fa-box', color: 'bg-gray-100 text-gray-600' });
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus kategori ini?')) setCategories(prev => prev.filter(c => c.id !== id));
  };

  const iconOptions = ['fa-box', 'fa-bowl-food', 'fa-mug-hot', 'fa-cookie-bite', 'fa-wheat-awn', 'fa-house', 'fa-baby', 'fa-soap', 'fa-smoking', 'fa-plug', 'fa-apple-whole', 'fa-fish', 'fa-egg', 'fa-carrot'];

  return (
    <div className="h-full overflow-y-auto p-4 lg:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <div><h2 className="text-xl font-bold text-gray-800">Kategori</h2><p className="text-sm text-gray-500">{categories.length} kategori</p></div>
          <button onClick={() => { setEditItem(null); setForm({ name: '', icon: 'fa-box', color: 'bg-gray-100 text-gray-600' }); setShowForm(true); }} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
            <i className="fas fa-plus mr-1"></i>Tambah
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {categories.map(cat => (
            <div key={cat.id} className="bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${cat.color}`}><i className={`fas ${cat.icon}`}></i></div>
                <div className="flex gap-1">
                  <button onClick={() => { setEditItem(cat); setForm({ name: cat.name, icon: cat.icon, color: cat.color }); setShowForm(true); }} className="text-blue-500 hover:text-blue-700 text-xs"><i className="fas fa-edit"></i></button>
                  <button onClick={() => handleDelete(cat.id)} className="text-red-500 hover:text-red-700 text-xs"><i className="fas fa-trash"></i></button>
                </div>
              </div>
              <p className="font-medium text-sm">{cat.name}</p>
            </div>
          ))}
        </div>
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
              <div className="bg-blue-600 text-white p-4"><h3 className="font-bold">{editItem ? 'Edit' : 'Tambah'} Kategori</h3></div>
              <div className="p-4 space-y-3">
                <div><label className="text-xs font-medium text-gray-700 mb-1 block">Nama</label><input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                <div><label className="text-xs font-medium text-gray-700 mb-1 block">Icon</label>
                  <div className="grid grid-cols-7 gap-1">{iconOptions.map(ic => (
                    <button key={ic} type="button" onClick={() => setForm({ ...form, icon: ic })} className={`w-8 h-8 rounded flex items-center justify-center ${form.icon === ic ? 'bg-blue-100 text-blue-600 border-2 border-blue-500' : 'bg-gray-100 hover:bg-gray-200'}`}><i className={`fas ${ic} text-xs`}></i></button>
                  ))}</div>
                </div>
              </div>
              <div className="border-t p-3 flex gap-2">
                <button onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-200 rounded-lg text-sm">Batal</button>
                <button onClick={handleSave} className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold">Simpan</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ==================== BRANDS ====================
export function BrandsPage() {
  const { brands, setBrands } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<Brand | null>(null);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  const handleSave = () => {
    if (editItem) {
      setBrands(prev => prev.map(b => b.id === editItem.id ? { ...b, name, description: desc } : b));
    } else {
      setBrands(prev => [...prev, { id: 'b' + Date.now(), name, description: desc }]);
    }
    setShowForm(false); setEditItem(null); setName(''); setDesc('');
  };

  return (
    <div className="h-full overflow-y-auto p-4 lg:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <div><h2 className="text-xl font-bold text-gray-800">Brand</h2><p className="text-sm text-gray-500">{brands.length} brand</p></div>
          <button onClick={() => { setEditItem(null); setName(''); setDesc(''); setShowForm(true); }} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"><i className="fas fa-plus mr-1"></i>Tambah</button>
        </div>
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b"><tr><th className="text-left py-2.5 px-4 font-medium text-gray-500">Nama</th><th className="text-left py-2.5 px-4 font-medium text-gray-500">Deskripsi</th><th className="text-center py-2.5 px-4 font-medium text-gray-500">Aksi</th></tr></thead>
            <tbody className="divide-y">
              {brands.map(b => (
                <tr key={b.id} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-medium">{b.name}</td>
                  <td className="py-2.5 px-4 text-gray-500 text-xs">{b.description || '-'}</td>
                  <td className="py-2.5 px-4 text-center">
                    <button onClick={() => { setEditItem(b); setName(b.name); setDesc(b.description || ''); setShowForm(true); }} className="text-blue-500 hover:text-blue-700 mr-2"><i className="fas fa-edit"></i></button>
                    <button onClick={() => { if (confirm('Hapus?')) setBrands(prev => prev.filter(x => x.id !== b.id)); }} className="text-red-500 hover:text-red-700"><i className="fas fa-trash"></i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
              <div className="bg-blue-600 text-white p-4"><h3 className="font-bold">{editItem ? 'Edit' : 'Tambah'} Brand</h3></div>
              <div className="p-4 space-y-3">
                <div><label className="text-xs font-medium text-gray-700 mb-1 block">Nama</label><input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                <div><label className="text-xs font-medium text-gray-700 mb-1 block">Deskripsi</label><input type="text" value={desc} onChange={e => setDesc(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
              </div>
              <div className="border-t p-3 flex gap-2">
                <button onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-200 rounded-lg text-sm">Batal</button>
                <button onClick={handleSave} className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold">Simpan</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ==================== UNITS ====================
export function UnitsPage() {
  const { units, setUnits } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<Unit | null>(null);
  const [name, setName] = useState('');
  const [shortName, setShortName] = useState('');

  const handleSave = () => {
    if (editItem) {
      setUnits(prev => prev.map(u => u.id === editItem.id ? { ...u, name, shortName } : u));
    } else {
      setUnits(prev => [...prev, { id: 'u' + Date.now(), name, shortName }]);
    }
    setShowForm(false); setEditItem(null); setName(''); setShortName('');
  };

  return (
    <div className="h-full overflow-y-auto p-4 lg:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <div><h2 className="text-xl font-bold text-gray-800">Unit</h2><p className="text-sm text-gray-500">{units.length} unit</p></div>
          <button onClick={() => { setEditItem(null); setName(''); setShortName(''); setShowForm(true); }} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"><i className="fas fa-plus mr-1"></i>Tambah</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {units.map(u => (
            <div key={u.id} className="bg-white rounded-xl shadow-sm border p-4 flex items-center justify-between hover:shadow-md transition-shadow">
              <div>
                <p className="font-bold text-lg text-blue-700">{u.shortName}</p>
                <p className="text-xs text-gray-500">{u.name}</p>
              </div>
              <div className="flex gap-1">
                <button onClick={() => { setEditItem(u); setName(u.name); setShortName(u.shortName); setShowForm(true); }} className="text-blue-500 hover:text-blue-700"><i className="fas fa-edit text-xs"></i></button>
                <button onClick={() => { if (confirm('Hapus?')) setUnits(prev => prev.filter(x => x.id !== u.id)); }} className="text-red-500 hover:text-red-700"><i className="fas fa-trash text-xs"></i></button>
              </div>
            </div>
          ))}
        </div>
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
              <div className="bg-blue-600 text-white p-4"><h3 className="font-bold">{editItem ? 'Edit' : 'Tambah'} Unit</h3></div>
              <div className="p-4 space-y-3">
                <div><label className="text-xs font-medium text-gray-700 mb-1 block">Nama</label><input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                <div><label className="text-xs font-medium text-gray-700 mb-1 block">Singkatan</label><input type="text" value={shortName} onChange={e => setShortName(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
              </div>
              <div className="border-t p-3 flex gap-2">
                <button onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-200 rounded-lg text-sm">Batal</button>
                <button onClick={handleSave} className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold">Simpan</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ==================== PRICING ====================
export function PricingPage() {
  const { products, setProducts, formatRupiah, getCategoryName } = useStore();
  const [search, setSearch] = useState('');
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [prices, setPrices] = useState({ buyPrice: 0, sellPrice: 0, wholesalePrice: 0 });

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase()));

  const handleSavePrice = () => {
    if (!editProduct) return;
    setProducts(prev => prev.map(p => p.id === editProduct.id ? { ...p, ...prices } : p));
    setEditProduct(null);
  };

  return (
    <div className="h-full overflow-y-auto p-4 lg:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-5"><h2 className="text-xl font-bold text-gray-800">Harga Produk</h2><p className="text-sm text-gray-500">Kelola harga beli, jual, dan grosir</p></div>
        <div className="bg-white rounded-xl shadow-sm border p-3 mb-4">
          <div className="relative">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
            <input type="text" placeholder="Cari produk..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-2.5 px-4 font-medium text-gray-500">Produk</th>
                <th className="text-left py-2.5 px-4 font-medium text-gray-500">Kategori</th>
                <th className="text-right py-2.5 px-4 font-medium text-gray-500">Harga Beli</th>
                <th className="text-right py-2.5 px-4 font-medium text-gray-500">Harga Jual</th>
                <th className="text-right py-2.5 px-4 font-medium text-gray-500">Harga Grosir</th>
                <th className="text-right py-2.5 px-4 font-medium text-gray-500">Margin</th>
                <th className="text-center py-2.5 px-4 font-medium text-gray-500">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map(p => {
                const margin = p.sellPrice > 0 ? ((p.sellPrice - p.buyPrice) / p.buyPrice * 100).toFixed(1) : '0';
                return (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="py-2.5 px-4"><p className="font-medium text-xs">{p.name}</p><p className="text-[10px] text-gray-400">{p.sku}</p></td>
                    <td className="py-2.5 px-4 text-xs">{getCategoryName(p.categoryId)}</td>
                    <td className="py-2.5 px-4 text-right text-xs">{formatRupiah(p.buyPrice)}</td>
                    <td className="py-2.5 px-4 text-right text-xs font-bold text-blue-700">{formatRupiah(p.sellPrice)}</td>
                    <td className="py-2.5 px-4 text-right text-xs">{formatRupiah(p.wholesalePrice)}</td>
                    <td className="py-2.5 px-4 text-right"><span className="text-xs font-medium text-green-600">{margin}%</span></td>
                    <td className="py-2.5 px-4 text-center">
                      <button onClick={() => { setEditProduct(p); setPrices({ buyPrice: p.buyPrice, sellPrice: p.sellPrice, wholesalePrice: p.wholesalePrice }); }} className="text-blue-500 hover:text-blue-700 text-xs"><i className="fas fa-edit"></i> Edit</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {editProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
              <div className="bg-blue-600 text-white p-4"><h3 className="font-bold">Edit Harga: {editProduct.name}</h3></div>
              <div className="p-4 space-y-3">
                <div><label className="text-xs font-medium text-gray-700 mb-1 block">Harga Beli</label><input type="number" value={prices.buyPrice} onChange={e => setPrices({ ...prices, buyPrice: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                <div><label className="text-xs font-medium text-gray-700 mb-1 block">Harga Jual</label><input type="number" value={prices.sellPrice} onChange={e => setPrices({ ...prices, sellPrice: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                <div><label className="text-xs font-medium text-gray-700 mb-1 block">Harga Grosir</label><input type="number" value={prices.wholesalePrice} onChange={e => setPrices({ ...prices, wholesalePrice: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
              </div>
              <div className="border-t p-3 flex gap-2">
                <button onClick={() => setEditProduct(null)} className="px-4 py-2 bg-gray-200 rounded-lg text-sm">Batal</button>
                <button onClick={handleSavePrice} className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold">Simpan</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
