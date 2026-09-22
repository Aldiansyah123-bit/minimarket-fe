import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Customer, Expense, SalesReturn } from '../../types';

// ==================== ALL CUSTOMERS ====================
export function AllCustomersPage() {
  const { customers, setCustomers, formatRupiah } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<Customer | null>(null);
  const [form, setForm] = useState({ name: '', phone: '', isMember: false });

  const handleSave = () => {
    if (editItem) {
      setCustomers(prev => prev.map(c => c.id === editItem.id ? { ...c, ...form } : c));
    } else {
      setCustomers(prev => [...prev, { ...form, id: 'c' + Date.now(), points: 0, totalSpent: 0, totalTransactions: 0, memberCode: form.isMember ? 'MBR-' + String(Date.now()).slice(-4) : undefined, joinDate: new Date().toISOString().split('T')[0] }]);
    }
    setShowForm(false); setEditItem(null); setForm({ name: '', phone: '', isMember: false });
  };

  return (
    <div className="h-full overflow-y-auto p-4 lg:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <div><h2 className="text-xl font-bold text-gray-800">Semua Customer</h2><p className="text-sm text-gray-500">{customers.length} customer</p></div>
          <button onClick={() => { setEditItem(null); setForm({ name: '', phone: '', isMember: false }); setShowForm(true); }} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"><i className="fas fa-plus mr-1"></i>Tambah</button>
        </div>
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b"><tr>
              <th className="text-left py-2.5 px-4 font-medium text-gray-500">Nama</th>
              <th className="text-left py-2.5 px-4 font-medium text-gray-500">Telepon</th>
              <th className="text-left py-2.5 px-4 font-medium text-gray-500">Member</th>
              <th className="text-right py-2.5 px-4 font-medium text-gray-500">Total Transaksi</th>
              <th className="text-right py-2.5 px-4 font-medium text-gray-500">Total Belanja</th>
              <th className="text-center py-2.5 px-4 font-medium text-gray-500">Aksi</th>
            </tr></thead>
            <tbody className="divide-y">
              {customers.map(c => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-medium text-xs">{c.name}</td>
                  <td className="py-2.5 px-4 text-xs text-gray-500">{c.phone}</td>
                  <td className="py-2.5 px-4">{c.isMember ? <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs">{c.memberCode}</span> : <span className="text-xs text-gray-400">-</span>}</td>
                  <td className="py-2.5 px-4 text-right text-xs">{c.totalTransactions}</td>
                  <td className="py-2.5 px-4 text-right text-xs font-bold">{formatRupiah(c.totalSpent)}</td>
                  <td className="py-2.5 px-4 text-center">
                    <button onClick={() => { setEditItem(c); setForm({ name: c.name, phone: c.phone, isMember: c.isMember }); setShowForm(true); }} className="text-blue-500 hover:text-blue-700 mr-2"><i className="fas fa-edit text-xs"></i></button>
                    <button onClick={() => { if (confirm('Hapus?')) setCustomers(prev => prev.filter(x => x.id !== c.id)); }} className="text-red-500 hover:text-red-700"><i className="fas fa-trash text-xs"></i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
              <div className="bg-blue-600 text-white p-4"><h3 className="font-bold">{editItem ? 'Edit' : 'Tambah'} Customer</h3></div>
              <div className="p-4 space-y-3">
                <div><label className="text-xs font-medium text-gray-700 mb-1 block">Nama</label><input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                <div><label className="text-xs font-medium text-gray-700 mb-1 block">Telepon</label><input type="text" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                <div className="flex items-center gap-2"><input type="checkbox" checked={form.isMember} onChange={e => setForm({ ...form, isMember: e.target.checked })} id="isMember" /><label htmlFor="isMember" className="text-sm">Jadikan Member</label></div>
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

// ==================== MEMBERS ====================
export function MembersPage() {
  const { customers, formatRupiah } = useStore();
  const members = customers.filter(c => c.isMember);

  return (
    <div className="h-full overflow-y-auto p-4 lg:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-5"><h2 className="text-xl font-bold text-gray-800">Member</h2><p className="text-sm text-gray-500">{members.length} member terdaftar</p></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {members.map(m => (
            <div key={m.id} className="bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center"><i className="fas fa-id-card text-purple-600"></i></div>
                <div>
                  <p className="font-medium text-sm">{m.name}</p>
                  <p className="text-xs text-purple-600">{m.memberCode}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-gray-50 rounded-lg p-2"><p className="text-[10px] text-gray-500">Poin</p><p className="text-sm font-bold text-purple-700">{m.points}</p></div>
                <div className="bg-gray-50 rounded-lg p-2"><p className="text-[10px] text-gray-500">Belanja</p><p className="text-sm font-bold">{formatRupiah(m.totalSpent)}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==================== SALES TRANSACTION PAGE ====================
export function SalesTransactionPage() {
  const { salesTransactions, formatRupiah } = useStore();
  return (
    <div className="h-full overflow-y-auto p-4 lg:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-5"><h2 className="text-xl font-bold text-gray-800">Transaksi Penjualan</h2><p className="text-sm text-gray-500">{salesTransactions.length} transaksi</p></div>
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          {salesTransactions.length === 0 ? (
            <div className="p-12 text-center"><i className="fas fa-receipt text-5xl text-gray-300 mb-4"></i><p className="text-gray-500">Belum ada transaksi</p></div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b"><tr>
                <th className="text-left py-2.5 px-4 font-medium text-gray-500">Invoice</th>
                <th className="text-left py-2.5 px-4 font-medium text-gray-500">Tanggal</th>
                <th className="text-left py-2.5 px-4 font-medium text-gray-500">Kasir</th>
                <th className="text-left py-2.5 px-4 font-medium text-gray-500">Customer</th>
                <th className="text-left py-2.5 px-4 font-medium text-gray-500">Pembayaran</th>
                <th className="text-right py-2.5 px-4 font-medium text-gray-500">Total</th>
              </tr></thead>
              <tbody className="divide-y">
                {salesTransactions.map(t => (
                  <tr key={t.id} className="hover:bg-gray-50">
                    <td className="py-2.5 px-4 font-mono text-xs text-blue-600">{t.invoiceNo}</td>
                    <td className="py-2.5 px-4 text-xs">{new Date(t.date).toLocaleString('id-ID')}</td>
                    <td className="py-2.5 px-4 text-xs">{t.cashierName}</td>
                    <td className="py-2.5 px-4 text-xs">{t.customerName}</td>
                    <td className="py-2.5 px-4"><span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">{t.paymentMethod}</span></td>
                    <td className="py-2.5 px-4 text-right font-bold">{formatRupiah(t.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

// ==================== SALES RETURN ====================
export function SalesReturnPage() {
  const { salesTransactions, salesReturns, addSalesReturn, products, setProducts, currentUser, formatRupiah } = useStore();
  const [selectedInvoice, setSelectedInvoice] = useState<string>('');
  const [returnItems, setReturnItems] = useState<{ productId: string; quantity: number; reason: string; restock: boolean }[]>([]);

  const transaction = salesTransactions.find(t => t.id === selectedInvoice);

  const handleReturn = () => {
    if (!transaction || returnItems.length === 0) return;
    const items = returnItems.map(ri => {
      const cartItem = transaction.items.find(i => i.product.id === ri.productId);
      return {
        productId: ri.productId,
        productName: cartItem?.product.name || '',
        quantity: ri.quantity,
        price: cartItem?.product.sellPrice || 0,
        subtotal: (cartItem?.product.sellPrice || 0) * ri.quantity,
        reason: ri.reason,
        restock: ri.restock,
      };
    });
    const totalRefund = items.reduce((s, i) => s + i.subtotal, 0);
    const ret: SalesReturn = {
      id: 'RET-' + Date.now(),
      returnNo: 'RTN-' + String(Date.now()).slice(-6),
      originalInvoiceId: transaction.id,
      originalInvoiceNo: transaction.invoiceNo,
      items,
      totalRefund,
      date: new Date().toISOString(),
      processedBy: currentUser?.name || '',
    };
    addSalesReturn(ret);
    alert('Retur berhasil diproses!');
    setSelectedInvoice('');
    setReturnItems([]);
  };

  return (
    <div className="h-full overflow-y-auto p-4 lg:p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-5"><h2 className="text-xl font-bold text-gray-800">Retur Penjualan</h2><p className="text-sm text-gray-500">Proses pengembalian barang dari customer</p></div>
        <div className="bg-white rounded-xl shadow-sm border p-4 mb-4 space-y-4">
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">Pilih Invoice</label>
            <select value={selectedInvoice} onChange={e => { setSelectedInvoice(e.target.value); setReturnItems([]); }} className="w-full px-3 py-2 border rounded-lg text-sm">
              <option value="">-- Pilih Invoice --</option>
              {salesTransactions.map(t => <option key={t.id} value={t.id}>{t.invoiceNo} - {formatRupiah(t.total)} ({new Date(t.date).toLocaleDateString('id-ID')})</option>)}
            </select>
          </div>
          {transaction && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-700">Pilih produk yang diretur:</p>
              {transaction.items.map(item => (
                <div key={item.product.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                  <input type="checkbox" checked={returnItems.some(r => r.productId === item.product.id)} onChange={e => {
                    if (e.target.checked) {
                      setReturnItems(prev => [...prev, { productId: item.product.id, quantity: 1, reason: 'Barang rusak', restock: false }]);
                    } else {
                      setReturnItems(prev => prev.filter(r => r.productId !== item.product.id));
                    }
                  }} />
                  <div className="flex-1">
                    <p className="text-xs font-medium">{item.product.name}</p>
                    <p className="text-[10px] text-gray-500">{item.quantity} × {formatRupiah(item.product.sellPrice)}</p>
                  </div>
                  {returnItems.some(r => r.productId === item.product.id) && (
                    <div className="flex items-center gap-2">
                      <input type="number" min="1" max={item.quantity} value={returnItems.find(r => r.productId === item.product.id)?.quantity || 1}
                        onChange={e => setReturnItems(prev => prev.map(r => r.productId === item.product.id ? { ...r, quantity: parseInt(e.target.value) || 1 } : r))}
                        className="w-12 text-center px-1 py-1 border rounded text-xs" />
                      <label className="flex items-center gap-1 text-[10px]"><input type="checkbox" checked={returnItems.find(r => r.productId === item.product.id)?.restock || false} onChange={e => setReturnItems(prev => prev.map(r => r.productId === item.product.id ? { ...r, restock: e.target.checked } : r))} />Restok</label>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          {returnItems.length > 0 && (
            <button onClick={handleReturn} className="w-full py-2.5 bg-red-600 text-white rounded-lg font-bold text-sm hover:bg-red-700">
              <i className="fas fa-rotate-left mr-1"></i>Proses Retur ({formatRupiah(returnItems.reduce((s, r) => { const ci = transaction?.items.find(i => i.product.id === r.productId); return s + (ci ? ci.product.sellPrice * r.quantity : 0); }, 0))})
            </button>
          )}
        </div>
        {salesReturns.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="p-3 border-b"><h3 className="font-medium text-sm">Riwayat Retur</h3></div>
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b"><tr>
                <th className="text-left py-2 px-4 font-medium text-gray-500 text-xs">No. Retur</th>
                <th className="text-left py-2 px-4 font-medium text-gray-500 text-xs">Invoice Asal</th>
                <th className="text-left py-2 px-4 font-medium text-gray-500 text-xs">Tanggal</th>
                <th className="text-right py-2 px-4 font-medium text-gray-500 text-xs">Refund</th>
              </tr></thead>
              <tbody className="divide-y">
                {salesReturns.map(r => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 font-mono text-xs">{r.returnNo}</td>
                    <td className="py-2 px-4 text-xs">{r.originalInvoiceNo}</td>
                    <td className="py-2 px-4 text-xs">{new Date(r.date).toLocaleDateString('id-ID')}</td>
                    <td className="py-2 px-4 text-right text-xs font-bold text-red-600">{formatRupiah(r.totalRefund)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ==================== EXPENSES ====================
export function ExpensesPage() {
  const { expenses, addExpense, currentUser, formatRupiah } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ category: '', description: '', amount: 0, paymentMethod: 'Tunai' });

  const handleSave = () => {
    const expense: Expense = {
      id: 'EXP-' + Date.now(),
      ...form,
      date: new Date().toISOString(),
      createdBy: currentUser?.name || '',
    };
    addExpense(expense);
    setShowForm(false);
    setForm({ category: '', description: '', amount: 0, paymentMethod: 'Tunai' });
  };

  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);

  return (
    <div className="h-full overflow-y-auto p-4 lg:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <div><h2 className="text-xl font-bold text-gray-800">Pengeluaran</h2><p className="text-sm text-gray-500">Total: {formatRupiah(totalExpenses)}</p></div>
          <button onClick={() => setShowForm(true)} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700"><i className="fas fa-plus mr-1"></i>Tambah</button>
        </div>
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          {expenses.length === 0 ? (
            <div className="p-12 text-center"><i className="fas fa-money-bill-transfer text-5xl text-gray-300 mb-4"></i><p className="text-gray-500">Belum ada pengeluaran</p></div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b"><tr>
                <th className="text-left py-2.5 px-4 font-medium text-gray-500">Tanggal</th>
                <th className="text-left py-2.5 px-4 font-medium text-gray-500">Kategori</th>
                <th className="text-left py-2.5 px-4 font-medium text-gray-500">Keterangan</th>
                <th className="text-left py-2.5 px-4 font-medium text-gray-500">Pembayaran</th>
                <th className="text-right py-2.5 px-4 font-medium text-gray-500">Jumlah</th>
              </tr></thead>
              <tbody className="divide-y">
                {expenses.map(e => (
                  <tr key={e.id} className="hover:bg-gray-50">
                    <td className="py-2.5 px-4 text-xs">{new Date(e.date).toLocaleDateString('id-ID')}</td>
                    <td className="py-2.5 px-4 text-xs">{e.category}</td>
                    <td className="py-2.5 px-4 text-xs">{e.description}</td>
                    <td className="py-2.5 px-4"><span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs">{e.paymentMethod}</span></td>
                    <td className="py-2.5 px-4 text-right font-bold text-red-600">{formatRupiah(e.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
              <div className="bg-red-600 text-white p-4"><h3 className="font-bold">Tambah Pengeluaran</h3></div>
              <div className="p-4 space-y-3">
                <div><label className="text-xs font-medium text-gray-700 mb-1 block">Kategori</label>
                  <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm">
                    <option value="">-- Pilih --</option>
                    <option value="Operasional">Operasional</option>
                    <option value="Transport">Transport</option>
                    <option value="Listrik & Air">Listrik & Air</option>
                    <option value="Perlengkapan Toko">Perlengkapan Toko</option>
                    <option value="Gaji">Gaji</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
                <div><label className="text-xs font-medium text-gray-700 mb-1 block">Keterangan</label><input type="text" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                <div><label className="text-xs font-medium text-gray-700 mb-1 block">Jumlah</label><input type="number" value={form.amount || ''} onChange={e => setForm({ ...form, amount: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                <div><label className="text-xs font-medium text-gray-700 mb-1 block">Metode Pembayaran</label>
                  <select value={form.paymentMethod} onChange={e => setForm({ ...form, paymentMethod: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm">
                    <option value="Tunai">Tunai</option>
                    <option value="Transfer">Transfer</option>
                  </select>
                </div>
              </div>
              <div className="border-t p-3 flex gap-2">
                <button onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-200 rounded-lg text-sm">Batal</button>
                <button onClick={handleSave} disabled={!form.category || !form.description || form.amount === 0} className="flex-1 py-2 bg-red-600 text-white rounded-lg text-sm font-bold disabled:opacity-50">Simpan</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
