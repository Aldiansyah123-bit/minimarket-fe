import React, { useState, useMemo } from 'react';
import { Transaction } from '../types';

interface Props {
  transactions: Transaction[];
}

export default function HistoryPage({ transactions }: Props) {
  const [search, setSearch] = useState('');
  const [filterMethod, setFilterMethod] = useState('all');
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [dateFilter, setDateFilter] = useState('');

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const matchSearch = t.id.toLowerCase().includes(search.toLowerCase()) ||
        t.items.some(i => i.product.name.toLowerCase().includes(search.toLowerCase()));
      const matchMethod = filterMethod === 'all' || t.paymentMethod === filterMethod;
      const matchDate = !dateFilter || new Date(t.date).toISOString().split('T')[0] === dateFilter;
      return matchSearch && matchMethod && matchDate;
    });
  }, [transactions, search, filterMethod, dateFilter]);

  const formatRupiah = (n: number) => 'Rp ' + n.toLocaleString('id-ID');

  const totalFiltered = filteredTransactions.reduce((sum, t) => sum + t.total, 0);

  return (
    <div className="h-full overflow-y-auto p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Riwayat Transaksi</h2>
            <p className="text-sm text-gray-500">Daftar semua transaksi yang telah dilakukan</p>
          </div>
          <div className="bg-blue-50 px-4 py-2 rounded-xl">
            <p className="text-xs text-blue-600">Total Filter</p>
            <p className="text-lg font-bold text-blue-800">{formatRupiah(totalFiltered)}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="relative">
              <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                placeholder="Cari ID transaksi / produk..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              />
            </div>
            <select
              value={filterMethod}
              onChange={e => setFilterMethod(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
            >
              <option value="all">Semua Metode</option>
              <option value="cash">Tunai</option>
              <option value="debit">Debit</option>
              <option value="qris">QRIS</option>
              <option value="ewallet">E-Wallet</option>
            </select>
            <input
              type="date"
              value={dateFilter}
              onChange={e => setDateFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
            />
          </div>
        </div>

        {/* Transaction List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {filteredTransactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <i className="fas fa-receipt text-5xl mb-4 opacity-30"></i>
              <p className="font-medium">Tidak ada transaksi</p>
              <p className="text-sm mt-1">Transaksi yang sudah dilakukan akan muncul di sini</p>
            </div>
          ) : (
            <div className="divide-y">
              {filteredTransactions.map(t => (
                <div
                  key={t.id}
                  className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => setSelectedTx(t)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <i className="fas fa-receipt text-blue-600"></i>
                      </div>
                      <div>
                        <p className="font-medium text-sm text-gray-800">{t.id}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(t.date).toLocaleString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          {' • '}{t.items.reduce((s, i) => s + i.quantity, 0)} item
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-700">{formatRupiah(t.total)}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${
                        t.paymentMethod === 'cash' ? 'bg-green-100 text-green-700' :
                        t.paymentMethod === 'debit' ? 'bg-blue-100 text-blue-700' :
                        t.paymentMethod === 'qris' ? 'bg-purple-100 text-purple-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {t.paymentMethod === 'cash' ? 'Tunai' : t.paymentMethod.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Transaction Detail Modal */}
        {selectedTx && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setSelectedTx(null)}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold">Detail Transaksi</h3>
                    <p className="text-blue-200 text-sm">{selectedTx.id}</p>
                  </div>
                  <button onClick={() => setSelectedTx(null)} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30">
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
              <div className="p-4 max-h-96 overflow-y-auto">
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <p className="text-xs text-gray-500">Tanggal</p>
                      <p className="font-medium">{new Date(selectedTx.date).toLocaleString('id-ID')}</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <p className="text-xs text-gray-500">Kasir</p>
                      <p className="font-medium">{selectedTx.cashierName}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500 mb-2 font-medium">Item Pembelian:</p>
                    <div className="space-y-2">
                      {selectedTx.items.map(item => (
                        <div key={item.product.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                          <div>
                            <p className="text-sm font-medium">{item.product.name}</p>
                            <p className="text-xs text-gray-500">{item.quantity} x {formatRupiah(item.product.price)}</p>
                          </div>
                          <p className="text-sm font-bold">{formatRupiah(item.subtotal)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-3 space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total</span>
                      <span className="font-bold text-lg text-blue-700">{formatRupiah(selectedTx.total)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Bayar ({selectedTx.paymentMethod})</span>
                      <span className="font-medium">{formatRupiah(selectedTx.payment)}</span>
                    </div>
                    {selectedTx.change > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Kembali</span>
                        <span className="font-medium text-green-600">{formatRupiah(selectedTx.change)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="border-t p-4">
                <button
                  onClick={() => setSelectedTx(null)}
                  className="w-full py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
