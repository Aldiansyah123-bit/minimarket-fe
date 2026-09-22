import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';

export default function AllPages() {
  const store = useStore();
  const {
    currentPage, products, categories, brands, units, customers, suppliers,
    salesTransactions, purchaseOrders, expenses, stockMutations, storeSettings, users,
    addPurchaseOrder, addSupplier, addCustomer, addExpense, adjustStock, saveOpname, updateStoreSettings
  } = store;

  // Purchase state
  const [purchaseSupplierId, setPurchaseSupplierId] = useState('s1');
  const [purchaseItems, setPurchaseItems] = useState<any[]>([]);
  const [showProductPicker, setShowProductPicker] = useState(false);
  const [pickerSearch, setPickerSearch] = useState('');

  // Modals
  const [showSupplierModal, setShowSupplierModal] = useState(false);
  const [supplierForm, setSupplierForm] = useState({ name: '', phone: '', address: '' });
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [customerForm, setCustomerForm] = useState({ name: '', phone: '' });
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [expenseForm, setExpenseForm] = useState({ category: '', description: '', amount: 0, paymentMethod: 'Tunai' });

  // Adjustment state
  const [adjustProductId, setAdjustProductId] = useState('');
  const [adjustQty, setAdjustQty] = useState(0);
  const [adjustReason, setAdjustReason] = useState('');

  // Opname state
  const [opnameStarted, setOpnameStarted] = useState(false);
  const [opnameItems, setOpnameItems] = useState<any[]>([]);

  const formatRupiah = (n: number) => 'Rp ' + (n || 0).toLocaleString('id-ID');
  const formatDate = (d: string) => new Date(d).toLocaleDateString('id-ID');

  const getCategoryName = (id: string) => {
    const c = categories.find(x => x.id === id);
    return c ? c.name : '-';
  };

  const getProductName = (id: string) => {
    const p = products.find(x => x.id === id);
    return p ? p.name : '-';
  };

  const getRoleLabel = (role: string) => {
    const labels: Record<string, string> = { administrator: 'Admin', owner: 'Owner', manager: 'Manager', cashier: 'Kasir' };
    return labels[role] || role;
  };

  const members = customers.filter(c => c.isMember);
  const purchaseTotal = purchaseItems.reduce((s, i) => s + i.subtotal, 0);
  const totalStockValue = products.reduce((s, p) => s + p.buyPrice * p.stock, 0);
  const lowStockCount = products.filter(p => p.stock <= p.minStock).length;
  const pickerProducts = products.filter(p => p.name.toLowerCase().includes(pickerSearch.toLowerCase()) && p.status === 'active');

  const totalSales = salesTransactions.reduce((s, t) => s + t.total, 0);
  const totalCogs = salesTransactions.reduce((s, t) => s + t.items.reduce((is, i) => is + i.product.buyPrice * i.quantity, 0), 0);
  const grossProfit = totalSales - totalCogs;
  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  const netProfit = grossProfit - totalExpenses;
  const avgBasket = salesTransactions.length > 0 ? totalSales / salesTransactions.length : 0;

  const currentPageLabel = useMemo(() => {
    const labels: Record<string, string> = {
      'purchase-new': 'Pembelian Baru', 'purchase-history': 'Riwayat Pembelian', 'purchase-suppliers': 'Supplier',
      'inventory-stock': 'Stok Produk', 'inventory-mutation': 'Mutasi Stok', 'inventory-adjustment': 'Penyesuaian Stok', 'inventory-opname': 'Stock Opname',
      'customer-all': 'Customer', 'customer-members': 'Member',
      'transaction-sales': 'Transaksi Penjualan', 'transaction-return': 'Retur Penjualan', 'transaction-expenses': 'Pengeluaran',
      'reports-sales': 'Laporan Penjualan', 'reports-product': 'Laporan Produk', 'reports-purchase': 'Laporan Pembelian',
      'reports-stock': 'Laporan Stok', 'reports-profit': 'Laporan Keuntungan', 'reports-cash': 'Laporan Kas',
      'settings-store': 'Pengaturan Toko', 'settings-branch': 'Cabang', 'settings-users': 'User',
      'settings-roles': 'Role & Permission', 'settings-payment': 'Metode Pembayaran', 'settings-printer': 'Printer', 'settings-receipt': 'Struk'
    };
    return labels[currentPage] || 'Halaman';
  }, [currentPage]);

  // Purchase functions
  const addProductToPurchase = (product: any) => {
    const existing = purchaseItems.find(i => i.product.id === product.id);
    if (existing) {
      setPurchaseItems(purchaseItems.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + 1, subtotal: (i.quantity + 1) * i.buyPrice } : i));
    } else {
      setPurchaseItems([...purchaseItems, { product: { ...product }, quantity: 1, buyPrice: product.buyPrice, subtotal: product.buyPrice }]);
    }
    setShowProductPicker(false);
    setPickerSearch('');
  };

  const savePurchase = () => {
    if (purchaseItems.length === 0) return;
    const supplier = suppliers.find(s => s.id === purchaseSupplierId);
    const po = {
      id: 'PO-' + Date.now(),
      poNumber: 'PUR-' + String(Date.now()).slice(-6),
      supplierId: purchaseSupplierId,
      supplierName: supplier?.name || '',
      items: JSON.parse(JSON.stringify(purchaseItems)),
      total: purchaseTotal,
      date: new Date().toISOString(),
      status: 'received',
      createdBy: store.currentUser?.name || ''
    };
    addPurchaseOrder(po);
    setPurchaseItems([]);
    alert('Pembelian berhasil!');
  };

  // Adjustment
  const saveAdjustment = () => {
    if (!adjustProductId || adjustQty === 0 || !adjustReason) return;
    const product = products.find(p => p.id === adjustProductId);
    if (!product) return;
    const newStock = product.stock + adjustQty;
    if (newStock < 0) { alert('Stok tidak boleh negatif!'); return; }
    adjustStock(adjustProductId, adjustQty, adjustReason);
    alert('Stok disesuaikan!');
    setAdjustProductId('');
    setAdjustQty(0);
    setAdjustReason('');
  };

  // Opname
  const startOpname = () => {
    setOpnameItems(products.map(p => ({ productId: p.id, systemStock: p.stock, physicalStock: p.stock, difference: 0 })));
    setOpnameStarted(true);
  };

  const updateOpnamePhysical = (productId: string, physical: number) => {
    setOpnameItems(opnameItems.map(item => item.productId === productId ? { ...item, physicalStock: physical, difference: physical - item.systemStock } : item));
  };

  const saveOpnameHandler = () => {
    const adjustments = opnameItems.filter(i => i.difference !== 0);
    saveOpname(adjustments);
    alert('Opname selesai! ' + adjustments.length + ' penyesuaian.');
    setOpnameStarted(false);
    setOpnameItems([]);
  };

  return (
    <div className="h-full overflow-y-auto p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* PURCHASE NEW */}
        {currentPage === 'purchase-new' && (
          <>
            <div className="mb-5"><h2 className="text-xl font-bold text-gray-800">Pembelian Baru</h2></div>
            <div className="bg-white rounded-xl shadow-sm border p-4 mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-700 mb-1 block">Supplier</label>
                  <select value={purchaseSupplierId} onChange={e => setPurchaseSupplierId(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                    {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 mb-1 block">Tanggal</label>
                  <input type="date" defaultValue={new Date().toISOString().split('T')[0]} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" readOnly />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-4">
              <div className="p-3 border-b flex items-center justify-between">
                <h3 className="font-medium text-sm">Item Pembelian ({purchaseItems.length})</h3>
                <button onClick={() => setShowProductPicker(true)} className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700">
                  <i className="fas fa-plus mr-1"></i>Tambah Produk
                </button>
              </div>
              {purchaseItems.length === 0 ? (
                <div className="p-8 text-center text-gray-400">
                  <i className="fas fa-cart-plus text-3xl mb-2"></i>
                  <p className="text-sm">Belum ada produk ditambahkan</p>
                </div>
              ) : (
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left py-2 px-4 font-medium text-gray-500">Produk</th>
                      <th className="text-center py-2 px-4 font-medium text-gray-500">Qty</th>
                      <th className="text-right py-2 px-4 font-medium text-gray-500">Harga Beli</th>
                      <th className="text-right py-2 px-4 font-medium text-gray-500">Subtotal</th>
                      <th className="text-center py-2 px-4 font-medium text-gray-500">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {purchaseItems.map(item => (
                      <tr key={item.product.id} className="hover:bg-gray-50">
                        <td className="py-2 px-4">
                          <p className="font-medium text-xs">{item.product.name}</p>
                          <p className="text-[10px] text-gray-400">{item.product.sku}</p>
                        </td>
                        <td className="py-2 px-4 text-center">
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={e => {
                              const qty = parseInt(e.target.value) || 0;
                              if (qty <= 0) setPurchaseItems(purchaseItems.filter(i => i.product.id !== item.product.id));
                              else setPurchaseItems(purchaseItems.map(i => i.product.id === item.product.id ? { ...i, quantity: qty, subtotal: qty * i.buyPrice } : i));
                            }}
                            className="w-16 text-center px-2 py-1 border border-gray-300 rounded text-sm"
                            min="1"
                          />
                        </td>
                        <td className="py-2 px-4 text-right">
                          <input
                            type="number"
                            value={item.buyPrice}
                            onChange={e => {
                              const price = parseInt(e.target.value) || 0;
                              setPurchaseItems(purchaseItems.map(i => i.product.id === item.product.id ? { ...i, buyPrice: price, subtotal: i.quantity * price } : i));
                            }}
                            className="w-24 text-right px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </td>
                        <td className="py-2 px-4 text-right font-bold text-xs">{formatRupiah(item.subtotal)}</td>
                        <td className="py-2 px-4 text-center">
                          <button onClick={() => setPurchaseItems(purchaseItems.filter(i => i.product.id !== item.product.id))} className="text-red-500 hover:text-red-700">
                            <i className="fas fa-trash text-xs"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <div className="bg-white rounded-xl shadow-sm border p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-bold text-blue-700">{formatRupiah(purchaseTotal)}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setPurchaseItems([])} className="px-4 py-2.5 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300">Batal</button>
                <button onClick={savePurchase} disabled={purchaseItems.length === 0} className="flex-1 py-2.5 bg-green-600 text-white rounded-lg font-bold text-sm hover:bg-green-700 disabled:opacity-50">
                  <i className="fas fa-save mr-1"></i>Simpan & Terima Stok
                </button>
              </div>
            </div>
          </>
        )}

        {/* PURCHASE HISTORY */}
        {currentPage === 'purchase-history' && (
          <>
            <div className="mb-5"><h2 className="text-xl font-bold text-gray-800">Riwayat Pembelian</h2><p className="text-sm text-gray-500">{purchaseOrders.length} pesanan</p></div>
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              {purchaseOrders.length === 0 ? (
                <div className="p-12 text-center"><i className="fas fa-truck text-5xl text-gray-300 mb-4"></i><p className="text-gray-500">Belum ada pembelian</p></div>
              ) : (
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left py-2.5 px-4 font-medium text-gray-500">No. PO</th>
                      <th className="text-left py-2.5 px-4 font-medium text-gray-500">Supplier</th>
                      <th className="text-left py-2.5 px-4 font-medium text-gray-500">Tanggal</th>
                      <th className="text-center py-2.5 px-4 font-medium text-gray-500">Item</th>
                      <th className="text-center py-2.5 px-4 font-medium text-gray-500">Status</th>
                      <th className="text-right py-2.5 px-4 font-medium text-gray-500">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {purchaseOrders.map(po => (
                      <tr key={po.id} className="hover:bg-gray-50">
                        <td className="py-2.5 px-4 font-mono text-xs font-medium text-blue-600">{po.poNumber}</td>
                        <td className="py-2.5 px-4 text-xs">{po.supplierName}</td>
                        <td className="py-2.5 px-4 text-xs text-gray-600">{formatDate(po.date)}</td>
                        <td className="py-2.5 px-4 text-center text-xs">{po.items.length} item</td>
                        <td className="py-2.5 px-4 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-xs ${po.status === 'received' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{po.status}</span>
                        </td>
                        <td className="py-2.5 px-4 text-right font-bold">{formatRupiah(po.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}

        {/* SUPPLIERS */}
        {currentPage === 'purchase-suppliers' && (
          <>
            <div className="flex items-center justify-between mb-5">
              <div><h2 className="text-xl font-bold text-gray-800">Supplier</h2><p className="text-sm text-gray-500">{suppliers.length} supplier</p></div>
              <button onClick={() => setShowSupplierModal(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"><i className="fas fa-plus mr-1"></i>Tambah</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {suppliers.map(s => (
                <div key={s.id} className="bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"><i className="fas fa-handshake text-blue-600"></i></div>
                  </div>
                  <p className="font-medium text-sm">{s.name}</p>
                  <p className="text-xs text-gray-500 mt-1"><i className="fas fa-phone mr-1"></i>{s.phone}</p>
                  <p className="text-xs text-gray-500"><i className="fas fa-map-marker-alt mr-1"></i>{s.address}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* INVENTORY STOCK */}
        {currentPage === 'inventory-stock' && (
          <>
            <div className="flex items-center justify-between mb-5">
              <div><h2 className="text-xl font-bold text-gray-800">Stok Produk</h2><p className="text-sm text-gray-500">Nilai total stok: {formatRupiah(totalStockValue)}</p></div>
              <div className="flex gap-2">
                <div className="bg-yellow-50 px-3 py-1.5 rounded-lg"><p className="text-[10px] text-yellow-600">Stok Menipis</p><p className="text-sm font-bold text-yellow-700">{lowStockCount}</p></div>
                <div className="bg-blue-50 px-3 py-1.5 rounded-lg"><p className="text-[10px] text-blue-600">Total Produk</p><p className="text-sm font-bold text-blue-700">{products.length}</p></div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left py-2.5 px-4 font-medium text-gray-500">Produk</th>
                    <th className="text-left py-2.5 px-4 font-medium text-gray-500">Kategori</th>
                    <th className="text-right py-2.5 px-4 font-medium text-gray-500">Stok</th>
                    <th className="text-right py-2.5 px-4 font-medium text-gray-500">Min</th>
                    <th className="text-right py-2.5 px-4 font-medium text-gray-500">Nilai Stok</th>
                    <th className="text-center py-2.5 px-4 font-medium text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {products.map(p => (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="py-2.5 px-4"><p className="font-medium text-xs">{p.name}</p><p className="text-[10px] text-gray-400">{p.sku}</p></td>
                      <td className="py-2.5 px-4 text-xs">{getCategoryName(p.categoryId)}</td>
                      <td className="py-2.5 px-4 text-right"><span className={`font-bold ${p.stock <= p.minStock ? 'text-red-600' : 'text-gray-800'}`}>{p.stock}</span></td>
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
          </>
        )}

        {/* INVENTORY MUTATION */}
        {currentPage === 'inventory-mutation' && (
          <>
            <div className="mb-5"><h2 className="text-xl font-bold text-gray-800">Mutasi Stok</h2><p className="text-sm text-gray-500">Riwayat perubahan stok</p></div>
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              {stockMutations.length === 0 ? (
                <div className="p-12 text-center"><i className="fas fa-arrows-left-right text-5xl text-gray-300 mb-4"></i><p className="text-gray-500">Belum ada mutasi stok</p></div>
              ) : (
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left py-2.5 px-4 font-medium text-gray-500">Tanggal</th>
                      <th className="text-left py-2.5 px-4 font-medium text-gray-500">Produk</th>
                      <th className="text-center py-2.5 px-4 font-medium text-gray-500">Tipe</th>
                      <th className="text-right py-2.5 px-4 font-medium text-gray-500">Qty</th>
                      <th className="text-right py-2.5 px-4 font-medium text-gray-500">Sebelum</th>
                      <th className="text-right py-2.5 px-4 font-medium text-gray-500">Sesudah</th>
                      <th className="text-left py-2.5 px-4 font-medium text-gray-500">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {stockMutations.map(m => (
                      <tr key={m.id} className="hover:bg-gray-50">
                        <td className="py-2.5 px-4 text-xs text-gray-600">{formatDate(m.date)}</td>
                        <td className="py-2.5 px-4 text-xs font-medium">{m.productName}</td>
                        <td className="py-2.5 px-4 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-xs ${
                            m.type === 'in' ? 'bg-green-100 text-green-700' :
                            m.type === 'out' ? 'bg-red-100 text-red-700' :
                            m.type === 'opname' ? 'bg-purple-100 text-purple-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {m.type === 'in' ? 'Masuk' : m.type === 'out' ? 'Keluar' : m.type === 'opname' ? 'Opname' : 'Adjust'}
                          </span>
                        </td>
                        <td className="py-2.5 px-4 text-right font-bold text-xs">{m.type === 'in' ? '+' : '-'}{m.quantity}</td>
                        <td className="py-2.5 px-4 text-right text-xs text-gray-500">{m.previousStock}</td>
                        <td className="py-2.5 px-4 text-right text-xs font-bold">{m.newStock}</td>
                        <td className="py-2.5 px-4 text-xs text-gray-500">{m.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}

        {/* INVENTORY ADJUSTMENT */}
        {currentPage === 'inventory-adjustment' && (
          <>
            <div className="mb-5"><h2 className="text-xl font-bold text-gray-800">Penyesuaian Stok</h2><p className="text-sm text-gray-500">Sesuaikan stok untuk barang rusak, hilang, atau kadaluarsa</p></div>
            <div className="bg-white rounded-xl shadow-sm border p-6 max-w-2xl">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Produk</label>
                  <select value={adjustProductId} onChange={e => setAdjustProductId(e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm">
                    <option value="">-- Pilih Produk --</option>
                    {products.map(p => <option key={p.id} value={p.id}>{p.name} (Stok: {p.stock})</option>)}
                  </select>
                </div>
                {adjustProductId && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Stok saat ini</p>
                    <p className="text-lg font-bold">{products.find(p => p.id === adjustProductId)?.stock}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Penyesuaian (+/-)</label>
                  <input type="number" value={adjustQty || ''} onChange={e => setAdjustQty(parseInt(e.target.value) || 0)} placeholder="Masukkan jumlah" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm" />
                </div>
                {adjustProductId && adjustQty !== 0 && (
                  <div className={`p-3 rounded-lg ${adjustQty > 0 ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                    <p className="text-sm">Stok baru: <span className="font-bold">{(products.find(p => p.id === adjustProductId)?.stock || 0) + adjustQty}</span></p>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Alasan</label>
                  <select value={adjustReason} onChange={e => setAdjustReason(e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm">
                    <option value="">-- Pilih Alasan --</option>
                    <option>Barang rusak</option>
                    <option>Barang hilang</option>
                    <option>Barang kadaluarsa</option>
                    <option>Selisih stok fisik</option>
                    <option>Lainnya</option>
                  </select>
                </div>
                <button onClick={saveAdjustment} disabled={!adjustProductId || adjustQty === 0 || !adjustReason} className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 disabled:opacity-50">
                  <i className="fas fa-save mr-1"></i>Simpan Penyesuaian
                </button>
              </div>
            </div>
          </>
        )}

        {/* STOCK OPNAME */}
        {currentPage === 'inventory-opname' && (
          <>
            <div className="flex items-center justify-between mb-5">
              <div><h2 className="text-xl font-bold text-gray-800">Stock Opname</h2><p className="text-sm text-gray-500">Cocokkan stok sistem dengan stok fisik</p></div>
              {opnameStarted && (
                <button onClick={saveOpnameHandler} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-bold hover:bg-green-700">
                  <i className="fas fa-check mr-1"></i>Simpan ({opnameItems.filter(i => i.difference !== 0).length} penyesuaian)
                </button>
              )}
            </div>
            {!opnameStarted ? (
              <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
                <i className="fas fa-clipboard-check text-5xl text-blue-300 mb-4"></i>
                <p className="font-medium text-gray-700 mb-2">Mulai Stock Opname</p>
                <p className="text-sm text-gray-500 mb-4">Hitung stok fisik semua produk dan cocokkan dengan sistem</p>
                <button onClick={startOpname} className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700"><i className="fas fa-play mr-2"></i>Mulai Opname</button>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left py-2.5 px-4 font-medium text-gray-500">Produk</th>
                      <th className="text-right py-2.5 px-4 font-medium text-gray-500">Stok Sistem</th>
                      <th className="text-right py-2.5 px-4 font-medium text-gray-500">Stok Fisik</th>
                      <th className="text-right py-2.5 px-4 font-medium text-gray-500">Selisih</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {opnameItems.map(item => {
                      const product = products.find(p => p.id === item.productId);
                      return (
                        <tr key={item.productId} className={item.difference !== 0 ? 'bg-yellow-50' : ''}>
                          <td className="py-2 px-4 text-xs font-medium">{product?.name}</td>
                          <td className="py-2 px-4 text-right text-xs">{item.systemStock}</td>
                          <td className="py-2 px-4 text-right">
                            <input
                              type="number"
                              value={item.physicalStock}
                              onChange={e => updateOpnamePhysical(item.productId, parseInt(e.target.value) || 0)}
                              className="w-16 text-right px-2 py-1 border border-gray-300 rounded text-xs"
                            />
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
          </>
        )}

        {/* CUSTOMERS */}
        {currentPage === 'customer-all' && (
          <>
            <div className="flex items-center justify-between mb-5">
              <div><h2 className="text-xl font-bold text-gray-800">Semua Customer</h2><p className="text-sm text-gray-500">{customers.length} customer</p></div>
              <button onClick={() => setShowCustomerModal(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"><i className="fas fa-plus mr-1"></i>Tambah</button>
            </div>
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left py-2.5 px-4 font-medium text-gray-500">Nama</th>
                    <th className="text-left py-2.5 px-4 font-medium text-gray-500">Telepon</th>
                    <th className="text-left py-2.5 px-4 font-medium text-gray-500">Member</th>
                    <th className="text-right py-2.5 px-4 font-medium text-gray-500">Total Transaksi</th>
                    <th className="text-right py-2.5 px-4 font-medium text-gray-500">Total Belanja</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {customers.map(c => (
                    <tr key={c.id} className="hover:bg-gray-50">
                      <td className="py-2.5 px-4 font-medium text-xs">{c.name}</td>
                      <td className="py-2.5 px-4 text-xs text-gray-500">{c.phone}</td>
                      <td className="py-2.5 px-4">{c.isMember ? <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs">{c.memberCode}</span> : <span className="text-xs text-gray-400">-</span>}</td>
                      <td className="py-2.5 px-4 text-right text-xs">{c.totalTransactions}</td>
                      <td className="py-2.5 px-4 text-right text-xs font-bold">{formatRupiah(c.totalSpent)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* MEMBERS */}
        {currentPage === 'customer-members' && (
          <>
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
          </>
        )}

        {/* TRANSACTION SALES */}
        {currentPage === 'transaction-sales' && (
          <>
            <div className="mb-5"><h2 className="text-xl font-bold text-gray-800">Transaksi Penjualan</h2><p className="text-sm text-gray-500">{salesTransactions.length} transaksi</p></div>
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              {salesTransactions.length === 0 ? (
                <div className="p-12 text-center"><i className="fas fa-receipt text-5xl text-gray-300 mb-4"></i><p className="text-gray-500">Belum ada transaksi</p></div>
              ) : (
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left py-2.5 px-4 font-medium text-gray-500">Invoice</th>
                      <th className="text-left py-2.5 px-4 font-medium text-gray-500">Tanggal</th>
                      <th className="text-left py-2.5 px-4 font-medium text-gray-500">Kasir</th>
                      <th className="text-left py-2.5 px-4 font-medium text-gray-500">Customer</th>
                      <th className="text-left py-2.5 px-4 font-medium text-gray-500">Pembayaran</th>
                      <th className="text-right py-2.5 px-4 font-medium text-gray-500">Total</th>
                    </tr>
                  </thead>
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
          </>
        )}

        {/* EXPENSES */}
        {currentPage === 'transaction-expenses' && (
          <>
            <div className="flex items-center justify-between mb-5">
              <div><h2 className="text-xl font-bold text-gray-800">Pengeluaran</h2><p className="text-sm text-gray-500">Total: {formatRupiah(expenses.reduce((s, e) => s + e.amount, 0))}</p></div>
              <button onClick={() => setShowExpenseModal(true)} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700"><i className="fas fa-plus mr-1"></i>Tambah</button>
            </div>
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              {expenses.length === 0 ? (
                <div className="p-12 text-center"><i className="fas fa-money-bill-transfer text-5xl text-gray-300 mb-4"></i><p className="text-gray-500">Belum ada pengeluaran</p></div>
              ) : (
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left py-2.5 px-4 font-medium text-gray-500">Tanggal</th>
                      <th className="text-left py-2.5 px-4 font-medium text-gray-500">Kategori</th>
                      <th className="text-left py-2.5 px-4 font-medium text-gray-500">Keterangan</th>
                      <th className="text-left py-2.5 px-4 font-medium text-gray-500">Pembayaran</th>
                      <th className="text-right py-2.5 px-4 font-medium text-gray-500">Jumlah</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {expenses.map(e => (
                      <tr key={e.id} className="hover:bg-gray-50">
                        <td className="py-2.5 px-4 text-xs">{formatDate(e.date)}</td>
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
          </>
        )}

        {/* REPORTS */}
        {currentPage.startsWith('reports-') && (
          <>
            <div className="mb-5"><h2 className="text-xl font-bold text-gray-800">{currentPageLabel}</h2></div>
            
            {currentPage === 'reports-sales' && (
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-white rounded-xl shadow-sm border p-4"><p className="text-xs text-gray-500">Total Sales</p><p className="text-xl font-bold text-green-600">{formatRupiah(totalSales)}</p></div>
                <div className="bg-white rounded-xl shadow-sm border p-4"><p className="text-xs text-gray-500">Total Transaksi</p><p className="text-xl font-bold text-blue-600">{salesTransactions.length}</p></div>
                <div className="bg-white rounded-xl shadow-sm border p-4"><p className="text-xs text-gray-500">Rata-rata Basket</p><p className="text-xl font-bold text-purple-600">{formatRupiah(Math.round(avgBasket))}</p></div>
              </div>
            )}

            {currentPage === 'reports-product' && (
              <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left py-2.5 px-4 font-medium text-gray-500">Produk</th>
                      <th className="text-right py-2.5 px-4 font-medium text-gray-500">Terjual</th>
                      <th className="text-right py-2.5 px-4 font-medium text-gray-500">Omzet</th>
                      <th className="text-right py-2.5 px-4 font-medium text-gray-500">HPP</th>
                      <th className="text-right py-2.5 px-4 font-medium text-gray-500">Profit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {(() => {
                      const sales: Record<string, { name: string; qty: number; revenue: number; cogs: number }> = {};
                      salesTransactions.forEach(t => t.items.forEach(item => {
                        if (!sales[item.product.id]) sales[item.product.id] = { name: item.product.name, qty: 0, revenue: 0, cogs: 0 };
                        sales[item.product.id].qty += item.quantity;
                        sales[item.product.id].revenue += item.subtotal;
                        sales[item.product.id].cogs += item.product.buyPrice * item.quantity;
                      }));
                      return Object.values(sales).sort((a, b) => b.revenue - a.revenue).map((p, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                          <td className="py-2.5 px-4 text-xs font-medium">{p.name}</td>
                          <td className="py-2.5 px-4 text-right text-xs">{p.qty} pcs</td>
                          <td className="py-2.5 px-4 text-right text-xs font-bold">{formatRupiah(p.revenue)}</td>
                          <td className="py-2.5 px-4 text-right text-xs text-gray-500">{formatRupiah(p.cogs)}</td>
                          <td className="py-2.5 px-4 text-right text-xs font-bold text-green-600">{formatRupiah(p.revenue - p.cogs)}</td>
                        </tr>
                      ));
                    })()}
                  </tbody>
                </table>
              </div>
            )}

            {currentPage === 'reports-profit' && (
              <div className="bg-white rounded-xl shadow-sm border p-6 max-w-2xl mx-auto">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg"><span className="font-medium">Sales (Penjualan)</span><span className="text-xl font-bold text-green-600">{formatRupiah(totalSales)}</span></div>
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg"><span className="font-medium">COGS (Harga Pokok)</span><span className="text-xl font-bold text-red-600">- {formatRupiah(totalCogs)}</span></div>
                  <div className="border-t pt-3 flex justify-between items-center p-3 bg-blue-50 rounded-lg"><span className="font-bold">Gross Profit</span><span className="text-xl font-bold text-blue-600">{formatRupiah(grossProfit)}</span></div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg"><span className="font-medium">Expense (Pengeluaran)</span><span className="text-xl font-bold text-orange-600">- {formatRupiah(totalExpenses)}</span></div>
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
            )}

            {currentPage === 'reports-stock' && (
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-white rounded-xl shadow-sm border p-4"><p className="text-xs text-gray-500">Total Produk</p><p className="text-xl font-bold">{products.length}</p></div>
                <div className="bg-white rounded-xl shadow-sm border p-4"><p className="text-xs text-gray-500">Nilai Stok</p><p className="text-xl font-bold text-blue-600">{formatRupiah(totalStockValue)}</p></div>
                <div className="bg-white rounded-xl shadow-sm border p-4"><p className="text-xs text-gray-500">Stok Menipis</p><p className="text-xl font-bold text-red-600">{lowStockCount}</p></div>
              </div>
            )}

            {currentPage === 'reports-purchase' && (
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-white rounded-xl shadow-sm border p-4"><p className="text-xs text-gray-500">Total Pembelian</p><p className="text-xl font-bold text-orange-600">{formatRupiah(purchaseOrders.reduce((s, p) => s + p.total, 0))}</p></div>
                <div className="bg-white rounded-xl shadow-sm border p-4"><p className="text-xs text-gray-500">Jumlah PO</p><p className="text-xl font-bold text-blue-600">{purchaseOrders.length}</p></div>
              </div>
            )}

            {currentPage === 'reports-cash' && (
              <div className="bg-white rounded-xl shadow-sm border p-6 max-w-2xl mx-auto">
                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-green-50 rounded-lg"><span className="font-medium">Cash Sales</span><span className="font-bold text-green-600">{formatRupiah(salesTransactions.filter(t => t.paymentMethod === 'Tunai').reduce((s, t) => s + t.total, 0))}</span></div>
                  <div className="flex justify-between p-3 bg-blue-50 rounded-lg"><span className="font-medium">Non-Cash Sales</span><span className="font-bold text-blue-600">{formatRupiah(salesTransactions.filter(t => t.paymentMethod !== 'Tunai').reduce((s, t) => s + t.total, 0))}</span></div>
                  <div className="flex justify-between p-3 bg-red-50 rounded-lg"><span className="font-medium">Pengeluaran</span><span className="font-bold text-red-600">- {formatRupiah(totalExpenses)}</span></div>
                </div>
              </div>
            )}
          </>
        )}

        {/* SETTINGS */}
        {currentPage.startsWith('settings-') && (
          <>
            <div className="mb-5"><h2 className="text-xl font-bold text-gray-800">{currentPageLabel}</h2></div>
            
            {currentPage === 'settings-store' && (
              <div className="bg-white rounded-xl shadow-sm border p-6 max-w-2xl">
                <div className="space-y-4">
                  <div><label className="text-xs font-medium text-gray-700 mb-1 block">Nama Toko</label><input value={storeSettings.name} onChange={e => updateStoreSettings({ name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" /></div>
                  <div><label className="text-xs font-medium text-gray-700 mb-1 block">Alamat</label><input value={storeSettings.address} onChange={e => updateStoreSettings({ address: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="text-xs font-medium text-gray-700 mb-1 block">Telepon</label><input value={storeSettings.phone} onChange={e => updateStoreSettings({ phone: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" /></div>
                    <div><label className="text-xs font-medium text-gray-700 mb-1 block">Email</label><input value={storeSettings.email} onChange={e => updateStoreSettings({ email: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" /></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="text-xs font-medium text-gray-700 mb-1 block">Pajak (%)</label><input type="number" value={storeSettings.taxRate} onChange={e => updateStoreSettings({ taxRate: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" /></div>
                    <div><label className="text-xs font-medium text-gray-700 mb-1 block">Mata Uang</label><input value={storeSettings.currency} onChange={e => updateStoreSettings({ currency: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" /></div>
                  </div>
                  <button onClick={() => alert('Tersimpan!')} className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700"><i className="fas fa-save mr-1"></i>Simpan</button>
                </div>
              </div>
            )}

            {currentPage === 'settings-users' && (
              <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left py-2.5 px-4 font-medium text-gray-500">Nama</th>
                      <th className="text-left py-2.5 px-4 font-medium text-gray-500">Username</th>
                      <th className="text-left py-2.5 px-4 font-medium text-gray-500">Role</th>
                      <th className="text-center py-2.5 px-4 font-medium text-gray-500">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {users.map(u => (
                      <tr key={u.id} className="hover:bg-gray-50">
                        <td className="py-2.5 px-4 font-medium text-xs">{u.name}</td>
                        <td className="py-2.5 px-4 font-mono text-xs">{u.username}</td>
                        <td className="py-2.5 px-4"><span className={`px-2 py-0.5 rounded-full text-xs ${
                          u.role === 'administrator' ? 'bg-red-100 text-red-700' :
                          u.role === 'owner' ? 'bg-purple-100 text-purple-700' :
                          u.role === 'manager' ? 'bg-blue-100 text-blue-700' :
                          'bg-green-100 text-green-700'
                        }`}>{getRoleLabel(u.role)}</span></td>
                        <td className="py-2.5 px-4 text-center"><span className={`px-2 py-0.5 rounded-full text-xs ${u.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{u.active ? 'Aktif' : 'Nonaktif'}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {currentPage === 'settings-roles' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'Administrator', color: 'bg-red-100 text-red-700', desc: 'Akses penuh ke semua fitur', perms: ['Semua modul'] },
                  { name: 'Owner', color: 'bg-purple-100 text-purple-700', desc: 'Akses penuh ke semua fitur', perms: ['Semua modul'] },
                  { name: 'Manager', color: 'bg-blue-100 text-blue-700', desc: 'Kelola operasional toko', perms: ['Dashboard', 'POS', 'Produk', 'Pembelian', 'Inventory', 'Customer', 'Transaksi', 'Laporan'] },
                  { name: 'Kasir', color: 'bg-green-100 text-green-700', desc: 'Hanya akses kasir', perms: ['POS - Penjualan Baru', 'POS - Pesanan Ditahan', 'POS - Riwayat'] },
                ].map(r => (
                  <div key={r.name} className="bg-white rounded-xl shadow-sm border p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${r.color}`}>{r.name}</span>
                    <p className="text-sm text-gray-600 mt-2">{r.desc}</p>
                    <div className="mt-3 space-y-1">
                      <p className="text-xs font-medium text-gray-500">Akses:</p>
                      {r.perms.map(p => (
                        <div key={p} className="flex items-center gap-1.5 text-xs"><i className="fas fa-check text-green-500 text-[10px]"></i>{p}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {(currentPage === 'settings-branch' || currentPage === 'settings-printer' || currentPage === 'settings-receipt' || currentPage === 'settings-payment') && (
              <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
                <i className="fas fa-cog text-4xl text-gray-300 mb-3"></i>
                <p className="text-gray-500">{currentPageLabel}</p>
              </div>
            )}
          </>
        )}

        {/* TRANSACTION RETURN & OTHER PLACEHOLDERS */}
        {currentPage === 'transaction-return' && (
          <>
            <div className="mb-5"><h2 className="text-xl font-bold text-gray-800">Retur Penjualan</h2><p className="text-sm text-gray-500">Proses pengembalian barang dari customer</p></div>
            <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
              <i className="fas fa-rotate-left text-4xl text-gray-300 mb-3"></i>
              <p className="text-gray-500">Pilih invoice untuk proses retur</p>
            </div>
          </>
        )}

        {(currentPage === 'pos-held' || currentPage === 'pos-history') && (
          <>
            <div className="mb-5"><h2 className="text-xl font-bold text-gray-800">{currentPageLabel}</h2></div>
            <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
              <i className="fas fa-clock-rotate-left text-4xl text-gray-300 mb-3"></i>
              <p className="text-gray-500">{currentPage === 'pos-held' ? 'Tidak ada pesanan ditahan' : 'Belum ada transaksi'}</p>
            </div>
          </>
        )}

        {(currentPage === 'products-categories' || currentPage === 'products-brands' || currentPage === 'products-units' || currentPage === 'products-pricing') && (
          <>
            <div className="mb-5"><h2 className="text-xl font-bold text-gray-800">{currentPageLabel}</h2></div>
            <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
              <i className="fas fa-box text-4xl text-gray-300 mb-3"></i>
              <p className="text-gray-500">{currentPageLabel}</p>
            </div>
          </>
        )}
      </div>

      {/* MODALS */}
      {showProductPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden max-h-[80vh] flex flex-col">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 flex items-center justify-between">
              <h3 className="font-bold">Pilih Produk</h3>
              <button onClick={() => setShowProductPicker(false)} className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30"><i className="fas fa-times text-sm"></i></button>
            </div>
            <div className="p-3 border-b">
              <input type="text" placeholder="Cari produk..." value={pickerSearch} onChange={e => setPickerSearch(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" autoFocus />
            </div>
            <div className="flex-1 overflow-y-auto">
              {pickerProducts.map(p => (
                <button key={p.id} onClick={() => addProductToPurchase(p)} className="w-full flex items-center gap-3 p-3 hover:bg-blue-50 border-b text-left">
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

      {showSupplierModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
            <div className="bg-blue-600 text-white p-4"><h3 className="font-bold">Tambah Supplier</h3></div>
            <div className="p-4 space-y-3">
              <div><label className="text-xs font-medium text-gray-700 mb-1 block">Nama</label><input type="text" value={supplierForm.name} onChange={e => setSupplierForm({ ...supplierForm, name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" /></div>
              <div><label className="text-xs font-medium text-gray-700 mb-1 block">Telepon</label><input type="text" value={supplierForm.phone} onChange={e => setSupplierForm({ ...supplierForm, phone: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" /></div>
              <div><label className="text-xs font-medium text-gray-700 mb-1 block">Alamat</label><input type="text" value={supplierForm.address} onChange={e => setSupplierForm({ ...supplierForm, address: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" /></div>
            </div>
            <div className="border-t p-3 flex gap-2">
              <button onClick={() => setShowSupplierModal(false)} className="px-4 py-2 bg-gray-200 rounded-lg text-sm">Batal</button>
              <button onClick={() => { addSupplier({ ...supplierForm, id: 's' + Date.now(), active: true }); setShowSupplierModal(false); setSupplierForm({ name: '', phone: '', address: '' }); }} className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold">Simpan</button>
            </div>
          </div>
        </div>
      )}

      {showCustomerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
            <div className="bg-blue-600 text-white p-4"><h3 className="font-bold">Tambah Customer</h3></div>
            <div className="p-4 space-y-3">
              <div><label className="text-xs font-medium text-gray-700 mb-1 block">Nama</label><input type="text" value={customerForm.name} onChange={e => setCustomerForm({ ...customerForm, name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" /></div>
              <div><label className="text-xs font-medium text-gray-700 mb-1 block">Telepon</label><input type="text" value={customerForm.phone} onChange={e => setCustomerForm({ ...customerForm, phone: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" /></div>
            </div>
            <div className="border-t p-3 flex gap-2">
              <button onClick={() => setShowCustomerModal(false)} className="px-4 py-2 bg-gray-200 rounded-lg text-sm">Batal</button>
              <button onClick={() => { addCustomer({ ...customerForm, id: 'c' + Date.now(), points: 0, totalSpent: 0, totalTransactions: 0, isMember: false, joinDate: new Date().toISOString().split('T')[0] }); setShowCustomerModal(false); setCustomerForm({ name: '', phone: '' }); }} className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold">Simpan</button>
            </div>
          </div>
        </div>
      )}

      {showExpenseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
            <div className="bg-red-600 text-white p-4"><h3 className="font-bold">Tambah Pengeluaran</h3></div>
            <div className="p-4 space-y-3">
              <div><label className="text-xs font-medium text-gray-700 mb-1 block">Kategori</label>
                <select value={expenseForm.category} onChange={e => setExpenseForm({ ...expenseForm, category: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option value="">-- Pilih --</option>
                  <option>Operasional</option><option>Transport</option><option>Listrik & Air</option><option>Perlengkapan Toko</option><option>Gaji</option><option>Lainnya</option>
                </select>
              </div>
              <div><label className="text-xs font-medium text-gray-700 mb-1 block">Keterangan</label><input type="text" value={expenseForm.description} onChange={e => setExpenseForm({ ...expenseForm, description: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" /></div>
              <div><label className="text-xs font-medium text-gray-700 mb-1 block">Jumlah</label><input type="number" value={expenseForm.amount || ''} onChange={e => setExpenseForm({ ...expenseForm, amount: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" /></div>
              <div><label className="text-xs font-medium text-gray-700 mb-1 block">Metode Pembayaran</label>
                <select value={expenseForm.paymentMethod} onChange={e => setExpenseForm({ ...expenseForm, paymentMethod: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>Tunai</option><option>Transfer</option>
                </select>
              </div>
            </div>
            <div className="border-t p-3 flex gap-2">
              <button onClick={() => setShowExpenseModal(false)} className="px-4 py-2 bg-gray-200 rounded-lg text-sm">Batal</button>
              <button onClick={() => { addExpense({ ...expenseForm, id: 'EXP-' + Date.now(), date: new Date().toISOString(), createdBy: store.currentUser?.name || '' }); setShowExpenseModal(false); setExpenseForm({ category: '', description: '', amount: 0, paymentMethod: 'Tunai' }); }} disabled={!expenseForm.category || !expenseForm.description || expenseForm.amount === 0} className="flex-1 py-2 bg-red-600 text-white rounded-lg text-sm font-bold disabled:opacity-50">Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
