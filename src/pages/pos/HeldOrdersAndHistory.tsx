import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { HeldOrder, SaleTransaction } from '../../types';

// ==================== HELD ORDERS ====================
export function HeldOrdersPage() {
  const { heldOrders, setHeldOrders, formatRupiah } = useStore();
  const [selectedOrder, setSelectedOrder] = useState<HeldOrder | null>(null);

  const resumeOrder = (order: HeldOrder) => {
    // In real app, this would load the order back into the POS cart
    setHeldOrders(prev => prev.filter(o => o.id !== order.id));
    setSelectedOrder(null);
  };

  const deleteOrder = (id: string) => {
    setHeldOrders(prev => prev.filter(o => o.id !== id));
    setSelectedOrder(null);
  };

  return (
    <div className="h-full overflow-y-auto p-4 lg:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-5">
          <h2 className="text-xl font-bold text-gray-800">Pesanan Ditahan</h2>
          <p className="text-sm text-gray-500">Kelola pesanan yang ditahan sementara</p>
        </div>

        {heldOrders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
            <i className="fas fa-pause-circle text-5xl text-gray-300 mb-4"></i>
            <p className="text-gray-500 font-medium">Tidak ada pesanan ditahan</p>
            <p className="text-sm text-gray-400 mt-1">Pesanan yang ditahan akan muncul di sini</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {heldOrders.map(order => (
              <div key={order.id} className="bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <i className="fas fa-pause text-yellow-600 text-sm"></i>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{order.customerName}</p>
                      <p className="text-xs text-gray-500">{new Date(order.heldAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-1 mb-3">
                  {order.items.slice(0, 3).map(item => (
                    <p key={item.product.id} className="text-xs text-gray-600 truncate">{item.product.name} × {item.quantity}</p>
                  ))}
                  {order.items.length > 3 && <p className="text-xs text-gray-400">+{order.items.length - 3} item lainnya</p>}
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <p className="font-bold text-blue-700">{formatRupiah(order.total)}</p>
                  <div className="flex gap-1">
                    <button onClick={() => resumeOrder(order)} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium hover:bg-blue-200">
                      <i className="fas fa-play mr-1"></i>Lanjut
                    </button>
                    <button onClick={() => deleteOrder(order.id)} className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium hover:bg-red-200">
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ==================== SALES HISTORY ====================
export function SalesHistoryPage() {
  const { salesTransactions, formatRupiah } = useStore();
  const [search, setSearch] = useState('');
  const [selectedTx, setSelectedTx] = useState<SaleTransaction | null>(null);
  const [filterMethod, setFilterMethod] = useState('all');

  const filtered = salesTransactions.filter(t => {
    const matchSearch = t.invoiceNo.toLowerCase().includes(search.toLowerCase()) || t.items.some(i => i.product.name.toLowerCase().includes(search.toLowerCase()));
    const matchMethod = filterMethod === 'all' || t.paymentMethod === filterMethod;
    return matchSearch && matchMethod;
  });

  return (
    <div className="h-full overflow-y-auto p-4 lg:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Riwayat Penjualan</h2>
            <p className="text-sm text-gray-500">Daftar semua transaksi penjualan</p>
          </div>
          <div className="bg-blue-50 px-4 py-2 rounded-xl">
            <p className="text-xs text-blue-600">Total</p>
            <p className="text-lg font-bold text-blue-800">{formatRupiah(filtered.reduce((s, t) => s + t.total, 0))}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border p-3 mb-4 flex gap-3">
          <div className="flex-1 relative">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
            <input type="text" placeholder="Cari invoice / produk..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <select value={filterMethod} onChange={e => setFilterMethod(e.target.value)} className="px-3 py-2 border rounded-lg text-sm">
            <option value="all">Semua Metode</option>
            <option value="Tunai">Tunai</option>
            <option value="QRIS">QRIS</option>
            <option value="Debit">Debit</option>
            <option value="E-Wallet">E-Wallet</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-12 text-center">
              <i className="fas fa-receipt text-5xl text-gray-300 mb-4"></i>
              <p className="text-gray-500">Belum ada transaksi</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-2.5 px-4 font-medium text-gray-500">Invoice</th>
                  <th className="text-left py-2.5 px-4 font-medium text-gray-500">Tanggal</th>
                  <th className="text-left py-2.5 px-4 font-medium text-gray-500">Kasir</th>
                  <th className="text-left py-2.5 px-4 font-medium text-gray-500">Item</th>
                  <th className="text-left py-2.5 px-4 font-medium text-gray-500">Pembayaran</th>
                  <th className="text-right py-2.5 px-4 font-medium text-gray-500">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map(t => (
                  <tr key={t.id} onClick={() => setSelectedTx(t)} className="hover:bg-gray-50 cursor-pointer">
                    <td className="py-2.5 px-4 font-mono text-xs font-medium text-blue-600">{t.invoiceNo}</td>
                    <td className="py-2.5 px-4 text-gray-600 text-xs">{new Date(t.date).toLocaleString('id-ID')}</td>
                    <td className="py-2.5 px-4 text-xs">{t.cashierName}</td>
                    <td className="py-2.5 px-4 text-xs">{t.items.reduce((s, i) => s + i.quantity, 0)} item</td>
                    <td className="py-2.5 px-4"><span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">{t.paymentMethod}</span></td>
                    <td className="py-2.5 px-4 text-right font-bold">{formatRupiah(t.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Detail Modal */}
        {selectedTx && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setSelectedTx(null)}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold">{selectedTx.invoiceNo}</h3>
                    <p className="text-blue-200 text-xs">{new Date(selectedTx.date).toLocaleString('id-ID')}</p>
                  </div>
                  <button onClick={() => setSelectedTx(null)} className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center"><i className="fas fa-times text-sm"></i></button>
                </div>
              </div>
              <div className="p-4 max-h-80 overflow-y-auto">
                <div className="space-y-2 mb-3">
                  {selectedTx.items.map(item => (
                    <div key={item.product.id} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium">{item.product.name}</p>
                        <p className="text-xs text-gray-500">{item.quantity} × {formatRupiah(item.product.sellPrice)}</p>
                      </div>
                      <p className="text-sm font-bold">{formatRupiah(item.product.sellPrice * item.quantity)}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-3 space-y-1">
                  <div className="flex justify-between text-sm"><span>Subtotal:</span><span>{formatRupiah(selectedTx.subtotal)}</span></div>
                  {selectedTx.discount > 0 && <div className="flex justify-between text-sm"><span>Diskon:</span><span>-{formatRupiah(selectedTx.discount)}</span></div>}
                  <div className="flex justify-between text-sm"><span>PPN:</span><span>{formatRupiah(selectedTx.tax)}</span></div>
                  <div className="flex justify-between font-bold text-base border-t pt-1"><span>TOTAL:</span><span className="text-blue-700">{formatRupiah(selectedTx.total)}</span></div>
                  <div className="flex justify-between text-sm pt-2"><span>Bayar ({selectedTx.paymentMethod}):</span><span>{formatRupiah(selectedTx.paymentAmount)}</span></div>
                  {selectedTx.change > 0 && <div className="flex justify-between text-sm"><span>Kembali:</span><span className="text-green-600">{formatRupiah(selectedTx.change)}</span></div>}
                </div>
              </div>
              <div className="border-t p-3">
                <button onClick={() => setSelectedTx(null)} className="w-full py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700">Tutup</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
