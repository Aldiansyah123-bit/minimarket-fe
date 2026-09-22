import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { StockMutation } from '../../types';

// ==================== STOCK ====================
export function StockPage() {
  const { products, formatRupiah, getCategoryName, getUnitName } = useStore();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    if (filter === 'low') return matchSearch && p.stock <= p.minStock;
    if (filter === 'empty') return matchSearch && p.stock === 0;
    return matchSearch;
  });

  const totalValue = products.reduce((s, p) => s + (p.buyPrice * p.stock), 0);
  const lowStockCount = products.filter(p => p.stock <= p.minStock).length;

  return (
    <div className="h-full overflow-y-auto p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <div><h2 className="text-xl font-bold text-gray-800">Stok Produk</h2><p className="text-sm text-gray-500">Nilai total stok: {formatRupiah(totalValue)}</p></div>
          <div className="flex gap-2">
            <div className="bg-yellow-50 px-3 py-1.5 rounded-lg"><p className="text-[10px] text-yellow-600">Stok Menipis</p><p className="text-sm font-bold text-yellow-700">{lowStockCount}</p></div>
            <div className="bg-blue-50 px-3 py-1.5 rounded-lg"><p className="text-[10px] text-blue-600">Total Produk</p><p className="text-sm font-bold text-blue-700">{products.length}</p></div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-3 mb-4 flex gap-3">
          <div className="flex-1 relative">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
            <input type="text" placeholder="Cari produk..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <select value={filter} onChange={e => setFilter(e.target.value)} className="px-3 py-2 border rounded-lg text-sm">
            <option value="all">Semua</option>
            <option value="low">Stok Menipis</option>
            <option value="empty">Stok Habis</option>
          </select>
        </div>
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b"><tr>
              <th className="text-left py-2.5 px-4 font-medium text-gray-500">Produk</th>
              <th className="text-left py-2.5 px-4 font-medium text-gray-500">Kategori</th>
              <th className="text-right py-2.5 px-4 font-medium text-gray-500">Stok</th>
              <th className="text-right py-2.5 px-4 font-medium text-gray-500">Min</th>
              <th className="text-right py-2.5 px-4 font-medium text-gray-500">Nilai Stok</th>
              <th className="text-center py-2.5 px-4 font-medium text-gray-500">Status</th>
            </tr></thead>
            <tbody className="divide-y">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4"><p className="font-medium text-xs">{p.name}</p><p className="text-[10px] text-gray-400">{p.sku}</p></td>
                  <td className="py-2.5 px-4 text-xs">{getCategoryName(p.categoryId)}</td>
                  <td className="py-2.5 px-4 text-right"><span className={`font-bold ${p.stock <= p.minStock ? 'text-red-600' : 'text-gray-800'}`}>{p.stock}</span> <span className="text-xs text-gray-400">{getUnitName(p.unitId)}</span></td>
                  <td className="py-2.5 px-4 text-right text-xs text-gray-500">{p.minStock}</td>
                  <td className="py-2.5 px-4 text-right text-xs font-medium">{formatRupiah(p.buyPrice * p.stock)}</td>
                  <td className="py-2.5 px-4 text-center">
                    {p.stock === 0 ? <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs">Habis</span> :
                     p.stock <= p.minStock ? <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs">Menipis</span> :
                     <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">Aman</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ==================== STOCK MUTATION ====================
export function StockMutationPage() {
  const { stockMutations, formatRupiah } = useStore();
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? stockMutations : stockMutations.filter(m => m.type === filter);

  const typeLabels: Record<string, { label: string; color: string; icon: string }> = {
    in: { label: 'Masuk', color: 'bg-green-100 text-green-700', icon: 'fa-arrow-down' },
    out: { label: 'Keluar', color: 'bg-red-100 text-red-700', icon: 'fa-arrow-up' },
    adjustment: { label: 'Penyesuaian', color: 'bg-yellow-100 text-yellow-700', icon: 'fa-sliders' },
    opname: { label: 'Opname', color: 'bg-purple-100 text-purple-700', icon: 'fa-clipboard-check' },
  };

  return (
    <div className="h-full overflow-y-auto p-4 lg:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-5"><h2 className="text-xl font-bold text-gray-800">Mutasi Stok</h2><p className="text-sm text-gray-500">Riwayat perubahan stok</p></div>
        <div className="bg-white rounded-xl shadow-sm border p-3 mb-4">
          <select value={filter} onChange={e => setFilter(e.target.value)} className="px-3 py-2 border rounded-lg text-sm">
            <option value="all">Semua Tipe</option>
            <option value="in">Masuk</option>
            <option value="out">Keluar</option>
            <option value="adjustment">Penyesuaian</option>
            <option value="opname">Opname</option>
          </select>
        </div>
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-12 text-center"><i className="fas fa-arrows-left-right text-5xl text-gray-300 mb-4"></i><p className="text-gray-500">Belum ada mutasi stok</p></div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b"><tr>
                <th className="text-left py-2.5 px-4 font-medium text-gray-500">Tanggal</th>
                <th className="text-left py-2.5 px-4 font-medium text-gray-500">Produk</th>
                <th className="text-center py-2.5 px-4 font-medium text-gray-500">Tipe</th>
                <th className="text-right py-2.5 px-4 font-medium text-gray-500">Qty</th>
                <th className="text-right py-2.5 px-4 font-medium text-gray-500">Sebelum</th>
                <th className="text-right py-2.5 px-4 font-medium text-gray-500">Sesudah</th>
                <th className="text-left py-2.5 px-4 font-medium text-gray-500">Keterangan</th>
              </tr></thead>
              <tbody className="divide-y">
                {filtered.map(m => {
                  const tl = typeLabels[m.type];
                  return (
                    <tr key={m.id} className="hover:bg-gray-50">
                      <td className="py-2.5 px-4 text-xs text-gray-600">{new Date(m.date).toLocaleDateString('id-ID')}</td>
                      <td className="py-2.5 px-4 text-xs font-medium">{m.productName}</td>
                      <td className="py-2.5 px-4 text-center"><span className={`px-2 py-0.5 rounded-full text-xs ${tl.color}`}><i className={`fas ${tl.icon} mr-1`}></i>{tl.label}</span></td>
                      <td className="py-2.5 px-4 text-right font-bold text-xs">{m.type === 'in' ? '+' : '-'}{m.quantity}</td>
                      <td className="py-2.5 px-4 text-right text-xs text-gray-500">{m.previousStock}</td>
                      <td className="py-2.5 px-4 text-right text-xs font-bold">{m.newStock}</td>
                      <td className="py-2.5 px-4 text-xs text-gray-500">{m.reason}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

// ==================== STOCK ADJUSTMENT ====================
export function StockAdjustmentPage() {
  const { products, setProducts, addStockMutation, currentUser } = useStore();
  const [selectedProduct, setSelectedProduct] = useState('');
  const [adjustment, setAdjustment] = useState(0);
  const [reason, setReason] = useState('');
  const [success, setSuccess] = useState(false);

  const product = products.find(p => p.id === selectedProduct);

  const handleSave = () => {
    if (!product || adjustment === 0) return;
    const newStock = product.stock + adjustment;
    if (newStock < 0) { alert('Stok tidak boleh negatif!'); return; }
    
    const mutation: StockMutation = {
      id: 'SM-' + Date.now(),
      productId: product.id,
      productName: product.name,
      type: 'adjustment',
      quantity: Math.abs(adjustment),
      previousStock: product.stock,
      newStock,
      reference: 'ADJ-' + Date.now(),
      reason,
      date: new Date().toISOString(),
      createdBy: currentUser?.name || '',
    };
    addStockMutation(mutation);
    setSuccess(true);
    setTimeout(() => { setSuccess(false); setSelectedProduct(''); setAdjustment(0); setReason(''); }, 2000);
  };

  return (
    <div className="h-full overflow-y-auto p-4 lg:p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-5"><h2 className="text-xl font-bold text-gray-800">Penyesuaian Stok</h2><p className="text-sm text-gray-500">Sesuaikan stok untuk barang rusak, hilang, atau kadaluarsa</p></div>
        
        {success ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
            <i className="fas fa-check-circle text-4xl text-green-500 mb-3"></i>
            <p className="font-bold text-green-700">Stok berhasil disesuaikan!</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Produk</label>
              <select value={selectedProduct} onChange={e => setSelectedProduct(e.target.value)} className="w-full px-3 py-2.5 border rounded-lg text-sm">
                <option value="">-- Pilih Produk --</option>
                {products.map(p => <option key={p.id} value={p.id}>{p.name} (Stok: {p.stock})</option>)}
              </select>
            </div>
            {product && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Stok saat ini</p>
                <p className="text-lg font-bold">{product.stock} {product.unitId}</p>
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Penyesuaian (+/-)</label>
              <input type="number" value={adjustment || ''} onChange={e => setAdjustment(parseInt(e.target.value) || 0)} placeholder="Masukkan jumlah (+ untuk tambah, - untuk kurangi)" className="w-full px-3 py-2.5 border rounded-lg text-sm" />
            </div>
            {product && adjustment !== 0 && (
              <div className={`p-3 rounded-lg ${adjustment > 0 ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <p className="text-xs">Stok baru: <span className="font-bold">{product.stock + adjustment}</span></p>
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Alasan</label>
              <select value={reason} onChange={e => setReason(e.target.value)} className="w-full px-3 py-2.5 border rounded-lg text-sm mb-2">
                <option value="">-- Pilih Alasan --</option>
                <option value="Barang rusak">Barang rusak</option>
                <option value="Barang hilang">Barang hilang</option>
                <option value="Barang kadaluarsa">Barang kadaluarsa</option>
                <option value="Selisih stok fisik">Selisih stok fisik</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
            <button onClick={handleSave} disabled={!selectedProduct || adjustment === 0 || !reason} className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 disabled:opacity-50">
              <i className="fas fa-save mr-1"></i>Simpan Penyesuaian
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ==================== STOCK OPNAME ====================
export function StockOpnamePage() {
  const { products, addStockMutation, currentUser } = useStore();
  const [opnameItems, setOpnameItems] = useState<{ productId: string; systemStock: number; physicalStock: number; difference: number }[]>([]);
  const [started, setStarted] = useState(false);

  const startOpname = () => {
    const items = products.map(p => ({
      productId: p.id,
      systemStock: p.stock,
      physicalStock: p.stock,
      difference: 0,
    }));
    setOpnameItems(items);
    setStarted(true);
  };

  const updatePhysical = (productId: string, physical: number) => {
    setOpnameItems(prev => prev.map(item => {
      if (item.productId === productId) {
        return { ...item, physicalStock: physical, difference: physical - item.systemStock };
      }
      return item;
    }));
  };

  const saveOpname = () => {
    const adjustments = opnameItems.filter(i => i.difference !== 0);
    adjustments.forEach(item => {
      const product = products.find(p => p.id === item.productId);
      if (product) {
        const mutation: StockMutation = {
          id: 'SM-' + Date.now() + '-' + item.productId,
          productId: item.productId,
          productName: product.name,
          type: 'opname',
          quantity: Math.abs(item.difference),
          previousStock: item.systemStock,
          newStock: item.physicalStock,
          reference: 'OPNAME-' + Date.now(),
          reason: 'Stock Opname',
          date: new Date().toISOString(),
          createdBy: currentUser?.name || '',
        };
        addStockMutation(mutation);
      }
    });
    alert(`Stock opname selesai! ${adjustments.length} penyesuaian dilakukan.`);
    setStarted(false);
    setOpnameItems([]);
  };

  const diffCount = opnameItems.filter(i => i.difference !== 0).length;

  return (
    <div className="h-full overflow-y-auto p-4 lg:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <div><h2 className="text-xl font-bold text-gray-800">Stock Opname</h2><p className="text-sm text-gray-500">Cocokkan stok sistem dengan stok fisik</p></div>
          {started && <button onClick={saveOpname} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-bold hover:bg-green-700"><i className="fas fa-check mr-1"></i>Simpan ({diffCount} penyesuaian)</button>}
        </div>
        {!started ? (
          <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
            <i className="fas fa-clipboard-check text-5xl text-blue-300 mb-4"></i>
            <p className="font-medium text-gray-700 mb-2">Mulai Stock Opname</p>
            <p className="text-sm text-gray-500 mb-4">Hitung stok fisik semua produk dan cocokkan dengan sistem</p>
            <button onClick={startOpname} className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700"><i className="fas fa-play mr-2"></i>Mulai Opname</button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b"><tr>
                <th className="text-left py-2.5 px-4 font-medium text-gray-500">Produk</th>
                <th className="text-right py-2.5 px-4 font-medium text-gray-500">Stok Sistem</th>
                <th className="text-right py-2.5 px-4 font-medium text-gray-500">Stok Fisik</th>
                <th className="text-right py-2.5 px-4 font-medium text-gray-500">Selisih</th>
              </tr></thead>
              <tbody className="divide-y">
                {opnameItems.map(item => {
                  const product = products.find(p => p.id === item.productId);
                  return (
                    <tr key={item.productId} className={`${item.difference !== 0 ? 'bg-yellow-50' : ''}`}>
                      <td className="py-2 px-4 text-xs font-medium">{product?.name}</td>
                      <td className="py-2 px-4 text-right text-xs">{item.systemStock}</td>
                      <td className="py-2 px-4 text-right">
                        <input type="number" value={item.physicalStock} onChange={e => updatePhysical(item.productId, parseInt(e.target.value) || 0)} className="w-16 text-right px-2 py-1 border rounded text-xs" />
                      </td>
                      <td className="py-2 px-4 text-right">
                        <span className={`text-xs font-bold ${item.difference === 0 ? 'text-green-600' : item.difference > 0 ? 'text-blue-600' : 'text-red-600'}`}>
                          {item.difference > 0 ? '+' : ''}{item.difference}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
