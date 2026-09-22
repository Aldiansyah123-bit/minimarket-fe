import React, { useMemo, useState } from 'react';
import { useStore } from '../../context/StoreContext';

// ==================== SALES REPORT ====================
export function SalesReportPage() {
  const { salesTransactions, formatRupiah } = useStore();
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const filtered = useMemo(() => {
    return salesTransactions.filter(t => {
      if (dateFrom && new Date(t.date) < new Date(dateFrom)) return false;
      if (dateTo && new Date(t.date) > new Date(dateTo + 'T23:59:59')) return false;
      return true;
    });
  }, [salesTransactions, dateFrom, dateTo]);

  const totalSales = filtered.reduce((s, t) => s + t.total, 0);
  const totalTransactions = filtered.length;
  const avgBasket = totalTransactions > 0 ? totalSales / totalTransactions : 0;

  // By payment method
  const byPayment: Record<string, { total: number; count: number }> = {};
  filtered.forEach(t => {
    if (!byPayment[t.paymentMethod]) byPayment[t.paymentMethod] = { total: 0, count: 0 };
    byPayment[t.paymentMethod].total += t.total;
    byPayment[t.paymentMethod].count += 1;
  });

  return (
    <div className="h-full overflow-y-auto p-4 lg:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-5"><h2 className="text-xl font-bold text-gray-800">Laporan Penjualan</h2></div>
        <div className="bg-white rounded-xl shadow-sm border p-3 mb-4 flex gap-3 flex-wrap">
          <div><label className="text-[10px] text-gray-500 block">Dari</label><input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="px-2 py-1.5 border rounded text-xs" /></div>
          <div><label className="text-[10px] text-gray-500 block">Sampai</label><input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="px-2 py-1.5 border rounded text-xs" /></div>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-white rounded-xl shadow-sm border p-4"><p className="text-xs text-gray-500">Total Sales</p><p className="text-xl font-bold text-green-600">{formatRupiah(totalSales)}</p></div>
          <div className="bg-white rounded-xl shadow-sm border p-4"><p className="text-xs text-gray-500">Total Transaksi</p><p className="text-xl font-bold text-blue-600">{totalTransactions}</p></div>
          <div className="bg-white rounded-xl shadow-sm border p-4"><p className="text-xs text-gray-500">Rata-rata Basket</p><p className="text-xl font-bold text-purple-600">{formatRupiah(Math.round(avgBasket))}</p></div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <h3 className="font-bold text-sm mb-3">Per Metode Pembayaran</h3>
          {Object.keys(byPayment).length === 0 ? <p className="text-sm text-gray-400 text-center py-4">Tidak ada data</p> : (
            <div className="space-y-2">
              {Object.entries(byPayment).map(([method, data]) => (
                <div key={method} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium">{method}</span>
                  <div className="text-right"><p className="text-sm font-bold">{formatRupiah(data.total)}</p><p className="text-xs text-gray-500">{data.count} transaksi</p></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==================== PRODUCT REPORT ====================
export function ProductReportPage() {
  const { salesTransactions, formatRupiah } = useStore();
  const productSales: Record<string, { name: string; qty: number; revenue: number; cogs: number }> = {};
  salesTransactions.forEach(t => {
    t.items.forEach(item => {
      if (!productSales[item.product.id]) productSales[item.product.id] = { name: item.product.name, qty: 0, revenue: 0, cogs: 0 };
      productSales[item.product.id].qty += item.quantity;
      productSales[item.product.id].revenue += item.subtotal;
      productSales[item.product.id].cogs += item.product.buyPrice * item.quantity;
    });
  });
  const sorted = Object.values(productSales).sort((a, b) => b.revenue - a.revenue);

  return (
    <div className="h-full overflow-y-auto p-4 lg:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-5"><h2 className="text-xl font-bold text-gray-800">Laporan Produk</h2></div>
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          {sorted.length === 0 ? (
            <div className="p-12 text-center"><p className="text-gray-500">Belum ada data penjualan</p></div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b"><tr>
                <th className="text-left py-2.5 px-4 font-medium text-gray-500">Produk</th>
                <th className="text-right py-2.5 px-4 font-medium text-gray-500">Terjual</th>
                <th className="text-right py-2.5 px-4 font-medium text-gray-500">Omzet</th>
                <th className="text-right py-2.5 px-4 font-medium text-gray-500">HPP</th>
                <th className="text-right py-2.5 px-4 font-medium text-gray-500">Profit</th>
              </tr></thead>
              <tbody className="divide-y">
                {sorted.map((p, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="py-2.5 px-4 text-xs font-medium">{p.name}</td>
                    <td className="py-2.5 px-4 text-right text-xs">{p.qty} pcs</td>
                    <td className="py-2.5 px-4 text-right text-xs font-bold">{formatRupiah(p.revenue)}</td>
                    <td className="py-2.5 px-4 text-right text-xs text-gray-500">{formatRupiah(p.cogs)}</td>
                    <td className="py-2.5 px-4 text-right text-xs font-bold text-green-600">{formatRupiah(p.revenue - p.cogs)}</td>
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

// ==================== PURCHASE REPORT ====================
export function PurchaseReportPage() {
  const { purchaseOrders, formatRupiah } = useStore();
  const totalPurchases = purchaseOrders.reduce((s, p) => s + p.total, 0);

  return (
    <div className="h-full overflow-y-auto p-4 lg:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-5"><h2 className="text-xl font-bold text-gray-800">Laporan Pembelian</h2></div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white rounded-xl shadow-sm border p-4"><p className="text-xs text-gray-500">Total Pembelian</p><p className="text-xl font-bold text-orange-600">{formatRupiah(totalPurchases)}</p></div>
          <div className="bg-white rounded-xl shadow-sm border p-4"><p className="text-xs text-gray-500">Jumlah PO</p><p className="text-xl font-bold text-blue-600">{purchaseOrders.length}</p></div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          {purchaseOrders.length === 0 ? (
            <div className="p-12 text-center"><p className="text-gray-500">Belum ada pembelian</p></div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b"><tr>
                <th className="text-left py-2.5 px-4 font-medium text-gray-500">No. PO</th>
                <th className="text-left py-2.5 px-4 font-medium text-gray-500">Supplier</th>
                <th className="text-left py-2.5 px-4 font-medium text-gray-500">Tanggal</th>
                <th className="text-right py-2.5 px-4 font-medium text-gray-500">Total</th>
              </tr></thead>
              <tbody className="divide-y">
                {purchaseOrders.map(po => (
                  <tr key={po.id} className="hover:bg-gray-50">
                    <td className="py-2.5 px-4 font-mono text-xs">{po.poNumber}</td>
                    <td className="py-2.5 px-4 text-xs">{po.supplierName}</td>
                    <td className="py-2.5 px-4 text-xs">{new Date(po.date).toLocaleDateString('id-ID')}</td>
                    <td className="py-2.5 px-4 text-right font-bold text-xs">{formatRupiah(po.total)}</td>
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

// ==================== STOCK REPORT ====================
export function StockReportPage() {
  const { products, formatRupiah, getCategoryName } = useStore();
  const totalValue = products.reduce((s, p) => s + (p.buyPrice * p.stock), 0);
  const lowStock = products.filter(p => p.stock <= p.minStock);

  return (
    <div className="h-full overflow-y-auto p-4 lg:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-5"><h2 className="text-xl font-bold text-gray-800">Laporan Stok</h2></div>
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-white rounded-xl shadow-sm border p-4"><p className="text-xs text-gray-500">Total Produk</p><p className="text-xl font-bold">{products.length}</p></div>
          <div className="bg-white rounded-xl shadow-sm border p-4"><p className="text-xs text-gray-500">Nilai Stok</p><p className="text-xl font-bold text-blue-600">{formatRupiah(totalValue)}</p></div>
          <div className="bg-white rounded-xl shadow-sm border p-4"><p className="text-xs text-gray-500">Stok Menipis</p><p className="text-xl font-bold text-red-600">{lowStock.length}</p></div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b"><tr>
              <th className="text-left py-2.5 px-4 font-medium text-gray-500">Produk</th>
              <th className="text-left py-2.5 px-4 font-medium text-gray-500">Kategori</th>
              <th className="text-right py-2.5 px-4 font-medium text-gray-500">Stok</th>
              <th className="text-right py-2.5 px-4 font-medium text-gray-500">Nilai Stok</th>
            </tr></thead>
            <tbody className="divide-y">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 text-xs font-medium">{p.name}</td>
                  <td className="py-2.5 px-4 text-xs">{getCategoryName(p.categoryId)}</td>
                  <td className="py-2.5 px-4 text-right"><span className={`text-xs font-bold ${p.stock <= p.minStock ? 'text-red-600' : ''}`}>{p.stock}</span></td>
                  <td className="py-2.5 px-4 text-right text-xs">{formatRupiah(p.buyPrice * p.stock)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {lowStock.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mt-4">
            <h3 className="font-bold text-sm text-red-700 mb-2"><i className="fas fa-exclamation-triangle mr-1"></i>Stok Menipis</h3>
            <div className="space-y-1">
              {lowStock.map(p => (
                <div key={p.id} className="flex justify-between text-xs">
                  <span>{p.name}</span>
                  <span className="font-bold text-red-600">Stok: {p.stock} / Min: {p.minStock}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ==================== PROFIT REPORT ====================
export function ProfitReportPage() {
  const { salesTransactions, expenses, formatRupiah } = useStore();
  const totalSales = salesTransactions.reduce((s, t) => s + t.total, 0);
  const totalCogs = salesTransactions.reduce((s, t) => s + t.items.reduce((is, i) => is + (i.product.buyPrice * i.quantity), 0), 0);
  const grossProfit = totalSales - totalCogs;
  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  const netProfit = grossProfit - totalExpenses;

  return (
    <div className="h-full overflow-y-auto p-4 lg:p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-5"><h2 className="text-xl font-bold text-gray-800">Laporan Keuntungan</h2></div>
        <div className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
          <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
            <span className="font-medium">Sales (Penjualan)</span>
            <span className="text-xl font-bold text-green-600">{formatRupiah(totalSales)}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
            <span className="font-medium">COGS (Harga Pokok)</span>
            <span className="text-xl font-bold text-red-600">- {formatRupiah(totalCogs)}</span>
          </div>
          <div className="border-t pt-3 flex justify-between items-center p-3 bg-blue-50 rounded-lg">
            <span className="font-bold">Gross Profit</span>
            <span className="text-xl font-bold text-blue-600">{formatRupiah(grossProfit)}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
            <span className="font-medium">Expense (Pengeluaran)</span>
            <span className="text-xl font-bold text-orange-600">- {formatRupiah(totalExpenses)}</span>
          </div>
          <div className="border-t-2 border-gray-300 pt-3 flex justify-between items-center p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg text-white">
            <span className="text-lg font-bold">NET PROFIT</span>
            <span className="text-2xl font-bold">{formatRupiah(netProfit)}</span>
          </div>
          {totalSales > 0 && (
            <div className="text-center pt-2">
              <p className="text-xs text-gray-500">Margin Keuntungan</p>
              <p className="text-lg font-bold text-green-600">{((netProfit / totalSales) * 100).toFixed(1)}%</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==================== CASH REPORT ====================
export function CashReportPage() {
  const { salesTransactions, expenses, currentShift, formatRupiah } = useStore();
  const cashSales = salesTransactions.filter(t => t.paymentMethod === 'Tunai').reduce((s, t) => s + t.total, 0);
  const nonCashSales = salesTransactions.filter(t => t.paymentMethod !== 'Tunai').reduce((s, t) => s + t.total, 0);
  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);

  return (
    <div className="h-full overflow-y-auto p-4 lg:p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-5"><h2 className="text-xl font-bold text-gray-800">Laporan Kas</h2></div>
        {currentShift && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
            <p className="text-xs text-green-600 font-medium">Shift Aktif: {currentShift.cashierName}</p>
            <p className="text-xs text-green-500">Dibuka: {new Date(currentShift.openTime).toLocaleString('id-ID')}</p>
          </div>
        )}
        <div className="bg-white rounded-xl shadow-sm border p-6 space-y-3">
          <div className="flex justify-between p-3 bg-green-50 rounded-lg"><span className="font-medium">Cash Sales</span><span className="font-bold text-green-600">{formatRupiah(cashSales)}</span></div>
          <div className="flex justify-between p-3 bg-blue-50 rounded-lg"><span className="font-medium">Non-Cash Sales</span><span className="font-bold text-blue-600">{formatRupiah(nonCashSales)}</span></div>
          <div className="flex justify-between p-3 bg-red-50 rounded-lg"><span className="font-medium">Pengeluaran</span><span className="font-bold text-red-600">- {formatRupiah(totalExpenses)}</span></div>
          {currentShift && (
            <>
              <div className="border-t pt-3 flex justify-between p-3 bg-gray-50 rounded-lg"><span className="font-medium">Modal Awal</span><span className="font-bold">{formatRupiah(currentShift.initialModal)}</span></div>
              <div className="flex justify-between p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white">
                <span className="font-bold">Expected Cash</span>
                <span className="text-xl font-bold">{formatRupiah(currentShift.initialModal + currentShift.cashSales - currentShift.expenses)}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
