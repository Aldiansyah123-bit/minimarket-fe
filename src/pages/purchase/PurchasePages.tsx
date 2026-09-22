import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { PurchaseOrder, PurchaseItem, Supplier } from '../../types';

// ==================== NEW PURCHASE ====================
export function NewPurchasePage() {
  const { products, suppliers, currentUser, addPurchaseOrder, formatRupiah, getCategoryName } = useStore();
  const [supplierId, setSupplierId] = useState(suppliers[0]?.id || '');
  const [items, setItems] = useState<PurchaseItem[]>([]);
  const [search, setSearch] = useState('');
  const [showProductPicker, setShowProductPicker] = useState(false);

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) && p.status === 'active');
  const total = items.reduce((s, i) => s + i.subtotal, 0);

  const addProduct = (product: typeof products[0]) => {
    const existing = items.find(i => i.product.id === product.id);
    if (existing) {
      setItems(prev => prev.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + 1, subtotal: (i.quantity + 1) * i.buyPrice } : i));
    } else {
      setItems(prev => [...prev, { product, quantity: 1, buyPrice: product.buyPrice, subtotal: product.buyPrice }]);
    }
    setShowProductPicker(false);
    setSearch('');
  };

  const updateQty = (productId: string, qty: number) => {
    if (qty <= 0) { setItems(prev => prev.filter(i => i.product.id !== productId)); return; }
    setItems(prev => prev.map(i => i.product.id === productId ? { ...i, quantity: qty, subtotal: qty * i.buyPrice } : i));
  };

  const updatePrice = (productId: string, price: number) => {
    setItems(prev => prev.map(i => i.product.id === productId ? { ...i, buyPrice: price, subtotal: i.quantity * price } : i));
  };

  const handleSave = () => {
    if (items.length === 0 || !supplierId) return;
    const supplier = suppliers.find(s => s.id === supplierId);
    const po: PurchaseOrder = {
      id: 'PO-' + Date.now(),
      poNumber: 'PUR-' + String(Date.now()).slice(-6),
      supplierId,
      supplierName: supplier?.name || '',
      items: [...items],
      total,
      date: new Date().toISOString(),
      status: 'received',
      createdBy: currentUser?.name || '',
    };
    addPurchaseOrder(po);
    setItems([]);
    alert('Pembelian berhasil disimpan & stok telah diperbarui!');
  };

  return (
    <div className="h-full overflow-y-auto p-4 lg:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-5"><h2 className="text-xl font-bold text-gray-800">Pembelian Baru</h2><p className="text-sm text-gray-500">Buat pesanan pembelian dari supplier</p></div>

        <div className="bg-white rounded-xl shadow-sm border p-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">Supplier</label>
              <select value={supplierId} onChange={e => setSupplierId(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm">
                {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">Tanggal</label>
              <input type="date" defaultValue={new Date().toISOString().split('T')[0]} className="w-full px-3 py-2 border rounded-lg text-sm" readOnly />
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-4">
          <div className="p-3 border-b flex items-center justify-between">
            <h3 className="font-medium text-sm">Item Pembelian</h3>
            <button onClick={() => setShowProductPicker(true)} className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700">
              <i className="fas fa-plus mr-1"></i>Tambah Produk
            </button>
          </div>
          {items.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              <i className="fas fa-cart-plus text-3xl mb-2"></i>
              <p className="text-sm">Belum ada produk ditambahkan</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b"><tr>
                <th className="text-left py-2 px-4 font-medium text-gray-500">Produk</th>
                <th className="text-center py-2 px-4 font-medium text-gray-500">Qty</th>
                <th className="text-right py-2 px-4 font-medium text-gray-500">Harga Beli</th>
                <th className="text-right py-2 px-4 font-medium text-gray-500">Subtotal</th>
                <th className="text-center py-2 px-4 font-medium text-gray-500">Aksi</th>
              </tr></thead>
              <tbody className="divide-y">
                {items.map(item => (
                  <tr key={item.product.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4"><p className="font-medium text-xs">{item.product.name}</p><p className="text-[10px] text-gray-400">{item.product.sku}</p></td>
                    <td className="py-2 px-4 text-center">
                      <input type="number" value={item.quantity} onChange={e => updateQty(item.product.id, parseInt(e.target.value) || 0)} className="w-16 text-center px-2 py-1 border rounded text-sm" min="1" />
                    </td>
                    <td className="py-2 px-4 text-right">
                      <input type="number" value={item.buyPrice} onChange={e => updatePrice(item.product.id, parseInt(e.target.value) || 0)} className="w-24 text-right px-2 py-1 border rounded text-sm" />
                    </td>
                    <td className="py-2 px-4 text-right font-bold text-xs">{formatRupiah(item.subtotal)}</td>
                    <td className="py-2 px-4 text-center"><button onClick={() => setItems(prev => prev.filter(i => i.product.id !== item.product.id))} className="text-red-500 hover:text-red-700"><i className="fas fa-trash text-xs"></i></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Total & Actions */}
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-bold">Total</span>
            <span className="text-2xl font-bold text-blue-700">{formatRupiah(total)}</span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setItems([])} className="px-4 py-2.5 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300">Batal</button>
            <button onClick={handleSave} disabled={items.length === 0} className="flex-1 py-2.5 bg-green-600 text-white rounded-lg font-bold text-sm hover:bg-green-700 disabled:opacity-50">
              <i className="fas fa-save mr-1"></i>Simpan & Terima Stok
            </button>
          </div>
        </div>

        {/* Product Picker Modal */}
        {showProductPicker && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden max-h-[80vh] flex flex-col">
              <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
                <h3 className="font-bold">Pilih Produk</h3>
                <button onClick={() => setShowProductPicker(false)} className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center"><i className="fas fa-times text-sm"></i></button>
              </div>
              <div className="p-3 border-b">
                <input type="text" placeholder="Cari produk..." value={search} onChange={e => setSearch(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" autoFocus />
              </div>
              <div className="flex-1 overflow-y-auto">
                {filteredProducts.map(p => (
                  <button key={p.id} onClick={() => addProduct(p)} className="w-full flex items-center gap-3 p-3 hover:bg-blue-50 border-b text-left">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{p.name}</p>
                      <p className="text-xs text-gray-500">{p.sku} • {getCategoryName(p.categoryId)}</p>
                    </div>
                    <p className="text-sm font-bold text-blue-700">{formatRupiah(p.buyPrice)}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ==================== PURCHASE HISTORY ====================
export function PurchaseHistoryPage() {
  const { purchaseOrders, formatRupiah } = useStore();
  const [selectedPO, setSelectedPO] = useState<PurchaseOrder | null>(null);

  return (
    <div className="h-full overflow-y-auto p-4 lg:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-5"><h2 className="text-xl font-bold text-gray-800">Riwayat Pembelian</h2><p className="text-sm text-gray-500">{purchaseOrders.length} pesanan</p></div>
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          {purchaseOrders.length === 0 ? (
            <div className="p-12 text-center"><i className="fas fa-truck text-5xl text-gray-300 mb-4"></i><p className="text-gray-500">Belum ada pembelian</p></div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b"><tr>
                <th className="text-left py-2.5 px-4 font-medium text-gray-500">No. PO</th>
                <th className="text-left py-2.5 px-4 font-medium text-gray-500">Supplier</th>
                <th className="text-left py-2.5 px-4 font-medium text-gray-500">Tanggal</th>
                <th className="text-center py-2.5 px-4 font-medium text-gray-500">Item</th>
                <th className="text-center py-2.5 px-4 font-medium text-gray-500">Status</th>
                <th className="text-right py-2.5 px-4 font-medium text-gray-500">Total</th>
              </tr></thead>
              <tbody className="divide-y">
                {purchaseOrders.map(po => (
                  <tr key={po.id} onClick={() => setSelectedPO(po)} className="hover:bg-gray-50 cursor-pointer">
                    <td className="py-2.5 px-4 font-mono text-xs font-medium text-blue-600">{po.poNumber}</td>
                    <td className="py-2.5 px-4 text-xs">{po.supplierName}</td>
                    <td className="py-2.5 px-4 text-xs text-gray-600">{new Date(po.date).toLocaleDateString('id-ID')}</td>
                    <td className="py-2.5 px-4 text-center text-xs">{po.items.length} item</td>
                    <td className="py-2.5 px-4 text-center"><span className={`px-2 py-0.5 rounded-full text-xs ${po.status === 'received' ? 'bg-green-100 text-green-700' : po.status === 'draft' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{po.status}</span></td>
                    <td className="py-2.5 px-4 text-right font-bold">{formatRupiah(po.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {selectedPO && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setSelectedPO(null)}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="bg-blue-600 text-white p-4"><h3 className="font-bold">{selectedPO.poNumber}</h3><p className="text-blue-200 text-xs">{selectedPO.supplierName}</p></div>
              <div className="p-4 max-h-80 overflow-y-auto">
                {selectedPO.items.map(item => (
                  <div key={item.product.id} className="flex justify-between p-2 bg-gray-50 rounded-lg mb-2">
                    <div><p className="text-sm font-medium">{item.product.name}</p><p className="text-xs text-gray-500">{item.quantity} × {formatRupiah(item.buyPrice)}</p></div>
                    <p className="text-sm font-bold">{formatRupiah(item.subtotal)}</p>
                  </div>
                ))}
                <div className="border-t pt-2 flex justify-between font-bold"><span>Total:</span><span className="text-blue-700">{formatRupiah(selectedPO.total)}</span></div>
              </div>
              <div className="border-t p-3"><button onClick={() => setSelectedPO(null)} className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium">Tutup</button></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ==================== SUPPLIERS ====================
export function SuppliersPage() {
  const { suppliers, setSuppliers } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<Supplier | null>(null);
  const [form, setForm] = useState({ name: '', phone: '', address: '', email: '', active: true });

  const handleSave = () => {
    if (editItem) {
      setSuppliers(prev => prev.map(s => s.id === editItem.id ? { ...s, ...form } : s));
    } else {
      setSuppliers(prev => [...prev, { ...form, id: 's' + Date.now() }]);
    }
    setShowForm(false); setEditItem(null); setForm({ name: '', phone: '', address: '', email: '', active: true });
  };

  return (
    <div className="h-full overflow-y-auto p-4 lg:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <div><h2 className="text-xl font-bold text-gray-800">Supplier</h2><p className="text-sm text-gray-500">{suppliers.length} supplier</p></div>
          <button onClick={() => { setEditItem(null); setForm({ name: '', phone: '', address: '', email: '', active: true }); setShowForm(true); }} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"><i className="fas fa-plus mr-1"></i>Tambah</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {suppliers.map(s => (
            <div key={s.id} className="bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"><i className="fas fa-handshake text-blue-600"></i></div>
                <div className="flex gap-1">
                  <button onClick={() => { setEditItem(s); setForm({ name: s.name, phone: s.phone, address: s.address, email: s.email || '', active: s.active }); setShowForm(true); }} className="text-blue-500 hover:text-blue-700"><i className="fas fa-edit text-xs"></i></button>
                  <button onClick={() => { if (confirm('Hapus?')) setSuppliers(prev => prev.filter(x => x.id !== s.id)); }} className="text-red-500 hover:text-red-700"><i className="fas fa-trash text-xs"></i></button>
                </div>
              </div>
              <p className="font-medium text-sm">{s.name}</p>
              <p className="text-xs text-gray-500 mt-1"><i className="fas fa-phone mr-1"></i>{s.phone}</p>
              <p className="text-xs text-gray-500"><i className="fas fa-map-marker-alt mr-1"></i>{s.address}</p>
            </div>
          ))}
        </div>
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
              <div className="bg-blue-600 text-white p-4"><h3 className="font-bold">{editItem ? 'Edit' : 'Tambah'} Supplier</h3></div>
              <div className="p-4 space-y-3">
                <div><label className="text-xs font-medium text-gray-700 mb-1 block">Nama</label><input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                <div><label className="text-xs font-medium text-gray-700 mb-1 block">Telepon</label><input type="text" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                <div><label className="text-xs font-medium text-gray-700 mb-1 block">Alamat</label><input type="text" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                <div><label className="text-xs font-medium text-gray-700 mb-1 block">Email</label><input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
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
