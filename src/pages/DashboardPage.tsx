import React, { useMemo } from 'react';
import { useStore } from '../context/StoreContext';

export default function DashboardPage() {
  const { products, salesTransactions, purchaseOrders, expenses } = useStore();

  const stats = useMemo(() => {
    const today = new Date().toDateString();
    const todaySales = salesTransactions.filter(t => new Date(t.date).toDateString() === today);
    const totalSales = salesTransactions.reduce((s, t) => s + t.total, 0);
    const todayTotal = todaySales.reduce((s, t) => s + t.total, 0);
    const cogs = salesTransactions.reduce((s, t) => s + t.items.reduce((is, i) => is + i.product.buyPrice * i.quantity, 0), 0);
    const netProfit = totalSales - cogs - expenses.reduce((s, e) => s + e.amount, 0);
    const lowStock = products.filter(p => p.stock <= p.minStock).length;
    const totalStock = products.reduce((s, p) => s + p.stock, 0);

    return [
      { label: 'Penjualan Hari Ini', value: formatRupiah(todayTotal), icon: 'fa-coins', iconBg: 'bg-green-100', iconColor: 'text-green-600' },
      { label: 'Total Transaksi', value: salesTransactions.length.toString(), icon: 'fa-receipt', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
      { label: 'Keuntungan', value: formatRupiah(netProfit), icon: 'fa-sack-dollar', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600' },
      { label: 'Pembelian', value: formatRupiah(purchaseOrders.reduce((s, p) => s + p.total, 0)), icon: 'fa-truck', iconBg: 'bg-orange-100', iconColor: 'text-orange-600' },
      { label: 'Stok Produk', value: totalStock.toLocaleString(), icon: 'fa-cubes', iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
      { label: 'Stok Menipis', value: lowStock.toString(), icon: 'fa-exclamation-triangle', iconBg: 'bg-red-100', iconColor: 'text-red-600' },
    ];
  }, [products, salesTransactions, purchaseOrders, expenses]);

  const salesByHour = useMemo(() => {
    const today = new Date().toDateString();
    const result: Record<number, number> = {};
    salesTransactions.filter(t => new Date(t.date).toDateString() === today).forEach(t => {
      const h = new Date(t.date).getHours();
      result[h] = (result[h] || 0) + t.total;
    });
    return result;
  }, [salesTransactions]);

  const chartHours = Array.from({ length: 14 }, (_, i) => i + 7);
  const maxHourlySales = Math.max(...Object.values(salesByHour), 1);

  const topProducts = useMemo(() => {
    const sales: Record<string, { name: string; qty: number; revenue: number }> = {};
    salesTransactions.forEach(t => {
      t.items.forEach(item => {
        if (!sales[item.product.id]) sales[item.product.id] = { name: item.product.name, qty: 0, revenue: 0 };
        sales[item.product.id].qty += item.quantity;
        sales[item.product.id].revenue += item.subtotal;
      });
    });
    return Object.values(sales).sort((a, b) => b.qty - a.qty).slice(0, 5);
  }, [salesTransactions]);

  const lowStockProducts = useMemo(() => {
    return products.filter(p => p.stock <= p.minStock).sort((a, b) => (a.stock / a.minStock) - (b.stock / b.minStock)).slice(0, 5);
  }, [products]);

  const recentTransactions = salesTransactions.slice(0, 5);

  function formatRupiah(n: number) {
    return 'Rp ' + (n || 0).toLocaleString('id-ID');
  }

  function getRankColor(i: number) {
    const colors = ['bg-yellow-500', 'bg-gray-400', 'bg-orange-400', 'bg-gray-300'];
    return colors[i] || colors[3];
  }

  return (
    <div className="h-full overflow-y-auto p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-5">
          <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
          <p className="text-sm text-gray-500">Ringkasan aktivitas toko hari ini</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className={`w-10 h-10 rounded-lg ${stat.iconBg} ${stat.iconColor} flex items-center justify-center mb-3`}>
                <i className={`fas ${stat.icon}`}></i>
              </div>
              <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
              <p className="text-base font-bold text-gray-800 truncate">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* Sales by Hour Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <i className="fas fa-chart-bar text-blue-500"></i>
              Penjualan Hari Ini
            </h3>
            {Object.keys(salesByHour).length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-gray-400">
                <i className="fas fa-chart-bar text-4xl mb-3 opacity-30"></i>
                <p className="text-sm">Belum ada penjualan hari ini</p>
              </div>
            ) : (
              <div className="flex items-end gap-1 h-40">
                {chartHours.map(hour => {
                  const value = salesByHour[hour] || 0;
                  const height = (value / maxHourlySales) * 100;
                  return (
                    <div key={hour} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full flex flex-col items-center justify-end h-32">
                        <div
                          className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-sm transition-all hover:from-blue-600 hover:to-blue-500"
                          style={{ height: `${Math.max(height, 2)}%` }}
                          title={`${hour}:00 - ${formatRupiah(value)}`}
                        ></div>
                      </div>
                      <span className="text-[9px] text-gray-400">{hour}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <i className="fas fa-trophy text-yellow-500"></i>
              Produk Terlaris
            </h3>
            {topProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-gray-400">
                <i className="fas fa-box text-4xl mb-3 opacity-30"></i>
                <p className="text-sm">Belum ada data</p>
              </div>
            ) : (
              <div className="space-y-3">
                {topProducts.map((product, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white ${getRankColor(i)}`}>
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Low Stock Alert */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <i className="fas fa-exclamation-triangle text-red-500"></i>
              Stok Menipis
            </h3>
            {lowStockProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-gray-400">
                <i className="fas fa-check-circle text-4xl mb-3 opacity-30 text-green-300"></i>
                <p className="text-sm">Semua stok aman</p>
              </div>
            ) : (
              <div className="space-y-2">
                {lowStockProducts.map(product => {
                  const percentage = (product.stock / product.minStock) * 100;
                  return (
                    <div key={product.id} className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        product.stock === 0 ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'
                      }`}>
                        <i className={`fas ${product.stock === 0 ? 'fa-times-circle' : 'fa-exclamation'}`}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{product.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${percentage <= 30 ? 'bg-red-500' : 'bg-yellow-500'}`} style={{ width: `${Math.min(percentage, 100)}%` }}></div>
                          </div>
                          <span className="text-xs text-gray-500">{product.stock}/{product.minStock}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <i className="fas fa-clock-rotate-left text-gray-500"></i>
              Transaksi Terakhir
            </h3>
            {recentTransactions.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-gray-400">
                <i className="fas fa-receipt text-4xl mb-3 opacity-30"></i>
                <p className="text-sm">Belum ada transaksi</p>
              </div>
            ) : (
              <div className="space-y-2">
                {recentTransactions.map(t => (
                  <div key={t.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <i className="fas fa-receipt text-blue-600 text-xs"></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{t.invoiceNo}</p>
                      <p className="text-xs text-gray-500">{new Date(t.date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-green-600">{formatRupiah(t.total)}</p>
                      <p className="text-xs text-gray-400">{t.paymentMethod}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
