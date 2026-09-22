import React, { useMemo } from 'react';
import { Transaction, Product } from '../types';

interface Props {
  transactions: Transaction[];
  products: Product[];
}

export default function DashboardPage({ transactions, products }: Props) {
  const stats = useMemo(() => {
    const today = new Date().toDateString();
    const todayTx = transactions.filter(t => new Date(t.date).toDateString() === today);
    const totalRevenue = transactions.reduce((sum, t) => sum + t.total, 0);
    const todayRevenue = todayTx.reduce((sum, t) => sum + t.total, 0);
    const totalItems = transactions.reduce((sum, t) => sum + t.items.reduce((s, i) => s + i.quantity, 0), 0);
    const avgTransaction = transactions.length > 0 ? totalRevenue / transactions.length : 0;

    // Top products
    const productSales: Record<string, { name: string; qty: number; revenue: number }> = {};
    transactions.forEach(t => {
      t.items.forEach(item => {
        if (!productSales[item.product.id]) {
          productSales[item.product.id] = { name: item.product.name, qty: 0, revenue: 0 };
        }
        productSales[item.product.id].qty += item.quantity;
        productSales[item.product.id].revenue += item.subtotal;
      });
    });
    const topProducts = Object.values(productSales)
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 5);

    // Payment method distribution
    const paymentMethods: Record<string, number> = {};
    transactions.forEach(t => {
      paymentMethods[t.paymentMethod] = (paymentMethods[t.paymentMethod] || 0) + 1;
    });

    // Low stock products
    const lowStock = products.filter(p => p.stock <= 10).sort((a, b) => a.stock - b.stock).slice(0, 5);

    return {
      totalRevenue,
      todayRevenue,
      totalTransactions: transactions.length,
      todayTransactions: todayTx.length,
      totalItems,
      avgTransaction,
      topProducts,
      paymentMethods,
      lowStock,
    };
  }, [transactions, products]);

  const formatRupiah = (n: number) => 'Rp ' + n.toLocaleString('id-ID');

  const statCards = [
    { label: 'Pendapatan Hari Ini', value: formatRupiah(stats.todayRevenue), icon: 'fa-coins', color: 'from-green-500 to-green-600', bg: 'bg-green-50' },
    { label: 'Total Pendapatan', value: formatRupiah(stats.totalRevenue), icon: 'fa-wallet', color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50' },
    { label: 'Transaksi Hari Ini', value: stats.todayTransactions.toString(), icon: 'fa-receipt', color: 'from-purple-500 to-purple-600', bg: 'bg-purple-50' },
    { label: 'Total Transaksi', value: stats.totalTransactions.toString(), icon: 'fa-chart-bar', color: 'from-orange-500 to-orange-600', bg: 'bg-orange-50' },
    { label: 'Item Terjual', value: stats.totalItems.toString(), icon: 'fa-boxes-stacked', color: 'from-pink-500 to-pink-600', bg: 'bg-pink-50' },
    { label: 'Rata-rata Transaksi', value: formatRupiah(Math.round(stats.avgTransaction)), icon: 'fa-calculator', color: 'from-teal-500 to-teal-600', bg: 'bg-teal-50' },
  ];

  return (
    <div className="h-full overflow-y-auto p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
            <p className="text-sm text-gray-500">Ringkasan penjualan dan statistik</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-700">{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          {statCards.map((card, i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className={`w-9 h-9 rounded-lg bg-gradient-to-r ${card.color} flex items-center justify-center text-white mb-2`}>
                <i className={`fas ${card.icon} text-sm`}></i>
              </div>
              <p className="text-xs text-gray-500 mb-0.5">{card.label}</p>
              <p className="text-sm font-bold text-gray-800 truncate">{card.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Top Products */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <i className="fas fa-trophy text-yellow-500"></i>
              Produk Terlaris
            </h3>
            {stats.topProducts.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">Belum ada data penjualan</p>
            ) : (
              <div className="space-y-2">
                {stats.topProducts.map((product, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                      i === 0 ? 'bg-yellow-500' : i === 1 ? 'bg-gray-400' : i === 2 ? 'bg-orange-400' : 'bg-gray-300'
                    }`}>
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.qty} terjual</p>
                    </div>
                    <p className="text-xs font-bold text-blue-600">{formatRupiah(product.revenue)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <i className="fas fa-credit-card text-blue-500"></i>
              Metode Pembayaran
            </h3>
            {Object.keys(stats.paymentMethods).length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">Belum ada data</p>
            ) : (
              <div className="space-y-3">
                {Object.entries(stats.paymentMethods).map(([method, count]) => {
                  const percentage = (count / stats.totalTransactions) * 100;
                  const labels: Record<string, string> = { cash: 'Tunai', debit: 'Debit', qris: 'QRIS', ewallet: 'E-Wallet' };
                  const colors: Record<string, string> = { cash: 'bg-green-500', debit: 'bg-blue-500', qris: 'bg-purple-500', ewallet: 'bg-orange-500' };
                  return (
                    <div key={method}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">{labels[method] || method}</span>
                        <span className="text-gray-500">{count} ({Math.round(percentage)}%)</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full ${colors[method] || 'bg-gray-500'} rounded-full transition-all`} style={{ width: `${percentage}%` }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Low Stock */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <i className="fas fa-exclamation-triangle text-red-500"></i>
              Stok Menipis
            </h3>
            {stats.lowStock.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">Semua stok aman</p>
            ) : (
              <div className="space-y-2">
                {stats.lowStock.map(product => (
                  <div key={product.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      product.stock === 0 ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      <i className={`fas ${product.stock === 0 ? 'fa-times-circle' : 'fa-exclamation'}`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.category}</p>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      product.stock === 0 ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {product.stock} pcs
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mt-4">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <i className="fas fa-history text-gray-500"></i>
            Transaksi Terakhir
          </h3>
          {transactions.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">Belum ada transaksi</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-2 text-gray-500 font-medium">ID</th>
                    <th className="text-left py-2 px-2 text-gray-500 font-medium">Tanggal</th>
                    <th className="text-left py-2 px-2 text-gray-500 font-medium">Item</th>
                    <th className="text-left py-2 px-2 text-gray-500 font-medium">Metode</th>
                    <th className="text-right py-2 px-2 text-gray-500 font-medium">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.slice(0, 5).map(t => (
                    <tr key={t.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-2 font-mono text-xs">{t.id}</td>
                      <td className="py-2 px-2 text-gray-600">{new Date(t.date).toLocaleString('id-ID')}</td>
                      <td className="py-2 px-2">{t.items.reduce((s, i) => s + i.quantity, 0)} item</td>
                      <td className="py-2 px-2">
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs capitalize">{t.paymentMethod}</span>
                      </td>
                      <td className="py-2 px-2 text-right font-bold">{formatRupiah(t.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
