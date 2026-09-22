import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { CartItem, SaleTransaction } from '../../types';

export default function POSPage() {
  const { products, categories, customers, paymentMethods, currentUser, currentShift, addSaleTransaction, formatRupiah, getCategoryName, getUnitName, storeSettings } = useStore();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showPayment, setShowPayment] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [lastTransaction, setLastTransaction] = useState<SaleTransaction | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState(customers[0]);
  const [discount, setDiscount] = useState(0);
  const [showShiftModal, setShowShiftModal] = useState(false);
  const [shiftModal, setShiftModal] = useState(0);
  const searchRef = useRef<HTMLInputElement>(null);

  // Open shift modal if no shift
  useEffect(() => {
    if (currentUser && !currentShift && currentUser.role === 'cashier') {
      setShowShiftModal(true);
    }
  }, [currentUser, currentShift]);

  const activeProducts = products.filter(p => p.status === 'active');

  const filteredProducts = useMemo(() => {
    return activeProducts.filter(p => {
      const matchCat = activeCategory === 'all' || p.categoryId === activeCategory;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.barcode.includes(search) || p.sku.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeProducts, activeCategory, search]);

  const addToCart = (product: typeof products[0]) => {
    if (product.stock <= 0) return;
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        if (existing.quantity >= product.stock) return prev;
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1, subtotal: (item.quantity + 1) * item.product.sellPrice - item.discount }
            : item
        );
      }
      return [...prev, { product, quantity: 1, discount: 0, subtotal: product.sellPrice }];
    });
  };

  const updateQty = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        const newQty = item.quantity + delta;
        if (newQty <= 0) return null as any;
        if (newQty > item.product.stock) return item;
        return { ...item, quantity: newQty, subtotal: newQty * item.product.sellPrice - item.discount };
      }
      return item;
    }).filter(Boolean));
  };

  const removeItem = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const subtotal = cart.reduce((s, i) => s + (i.product.sellPrice * i.quantity), 0);
  const discountAmount = discount;
  const tax = Math.round((subtotal - discountAmount) * (storeSettings.taxRate / 100));
  const total = subtotal - discountAmount + tax;
  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);

  const handlePaymentComplete = (paymentMethod: string, paymentAmount: number) => {
    if (!currentUser) return;
    const change = paymentAmount - total;
    const transaction: SaleTransaction = {
      id: 'TX-' + Date.now(),
      invoiceNo: 'INV-' + String(Date.now()).slice(-6),
      items: [...cart],
      subtotal,
      discount: discountAmount,
      tax,
      total,
      paymentMethod,
      paymentAmount,
      change,
      customerId: selectedCustomer.id,
      customerName: selectedCustomer.name,
      cashierId: currentUser.id,
      cashierName: currentUser.name,
      date: new Date().toISOString(),
      status: 'completed',
      shiftId: currentShift?.id || '',
    };
    addSaleTransaction(transaction);
    setLastTransaction(transaction);
    setShowPayment(false);
    setShowReceipt(true);
    setCart([]);
    setDiscount(0);
  };

  return (
    <div className="h-full flex">
      {/* Left: Products */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Search */}
        <div className="p-3 bg-white border-b shadow-sm">
          <div className="relative mb-2">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              ref={searchRef}
              type="text"
              placeholder="🔍 Scan barcode / Cari produk..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              autoFocus
            />
          </div>
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-1">
            <button onClick={() => setActiveCategory('all')} className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${activeCategory === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              <i className="fas fa-border-all mr-1"></i>Semua
            </button>
            {categories.map(cat => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${activeCategory === cat.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                <i className={`fas ${cat.icon} mr-1`}></i>{cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1 overflow-y-auto p-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {filteredProducts.map(product => {
              const cat = categories.find(c => c.id === product.categoryId);
              return (
                <button key={product.id} onClick={() => addToCart(product)} disabled={product.stock <= 0}
                  className={`group relative bg-white rounded-xl border-2 p-2.5 text-left transition-all hover:shadow-lg hover:-translate-y-0.5 ${product.stock <= 0 ? 'opacity-50 cursor-not-allowed' : 'border-gray-100 hover:border-blue-300'}`}>
                  <div className={`w-full aspect-square rounded-lg flex items-center justify-center mb-2 ${cat?.color || 'bg-gray-100 text-gray-400'}`}>
                    <i className={`fas ${cat?.icon || 'fa-box'} text-xl`}></i>
                  </div>
                  <h3 className="text-[11px] font-semibold text-gray-800 line-clamp-2 leading-tight mb-1">{product.name}</h3>
                  <p className="text-sm font-bold text-blue-700">{formatRupiah(product.sellPrice)}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${product.stock > product.minStock ? 'bg-green-100 text-green-700' : product.stock > 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                      {product.stock} {getUnitName(product.unitId)}
                    </span>
                    <span className="text-[9px] text-gray-400">{product.sku}</span>
                  </div>
                </button>
              );
            })}
          </div>
          {filteredProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center h-48 text-gray-400">
              <i className="fas fa-search text-4xl mb-3 opacity-30"></i>
              <p className="text-sm">Produk tidak ditemukan</p>
            </div>
          )}
        </div>
      </div>

      {/* Right: Cart */}
      <div className="w-[380px] bg-white border-l flex flex-col shadow-xl flex-shrink-0">
        {/* Cart Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <i className="fas fa-shopping-cart"></i>
              <h2 className="font-bold text-sm">Keranjang</h2>
            </div>
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">{totalItems} item</span>
          </div>
          <p className="text-xl font-bold">{formatRupiah(total)}</p>
        </div>

        {/* Customer */}
        <div className="p-2 border-b bg-gray-50">
          <select value={selectedCustomer.id} onChange={e => setSelectedCustomer(customers.find(c => c.id === e.target.value) || customers[0])}
            className="w-full px-2 py-1.5 text-xs border rounded-lg bg-white">
            {customers.map(c => <option key={c.id} value={c.id}>{c.name} {c.isMember ? `(${c.memberCode})` : ''}</option>)}
          </select>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 p-6">
              <i className="fas fa-cart-shopping text-4xl mb-3 opacity-30"></i>
              <p className="text-xs font-medium">Keranjang kosong</p>
              <p className="text-[10px] mt-1">Klik produk untuk menambahkan</p>
            </div>
          ) : (
            <div className="divide-y">
              {cart.map(item => (
                <div key={item.product.id} className="p-2.5 hover:bg-gray-50">
                  <div className="flex items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-medium text-gray-800 truncate">{item.product.name}</h4>
                      <p className="text-[10px] text-gray-500">{formatRupiah(item.product.sellPrice)} × {item.quantity}</p>
                    </div>
                    <button onClick={() => removeItem(item.product.id)} className="text-red-400 hover:text-red-600 text-[10px] p-1"><i className="fas fa-trash"></i></button>
                  </div>
                  <div className="flex items-center justify-between mt-1.5">
                    <div className="flex items-center gap-1">
                      <button onClick={() => updateQty(item.product.id, -1)} className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xs font-bold">−</button>
                      <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                      <button onClick={() => updateQty(item.product.id, 1)} disabled={item.quantity >= item.product.stock} className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xs font-bold disabled:opacity-50">+</button>
                    </div>
                    <p className="text-xs font-bold text-blue-700">{formatRupiah(item.product.sellPrice * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Footer */}
        <div className="border-t bg-gray-50 p-3 space-y-1.5">
          <div className="flex justify-between text-xs"><span className="text-gray-600">Subtotal</span><span className="font-medium">{formatRupiah(subtotal)}</span></div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">Diskon</span>
            <input type="number" value={discount || ''} onChange={e => setDiscount(parseInt(e.target.value) || 0)} placeholder="0" className="w-24 text-right px-2 py-1 border rounded text-xs" />
          </div>
          <div className="flex justify-between text-xs"><span className="text-gray-600">PPN ({storeSettings.taxRate}%)</span><span className="font-medium">{formatRupiah(tax)}</span></div>
          <div className="flex justify-between text-base font-bold border-t pt-1.5"><span>TOTAL</span><span className="text-blue-700">{formatRupiah(total)}</span></div>
          <div className="flex gap-2 pt-2">
            <button onClick={() => { setCart([]); setDiscount(0); }} disabled={cart.length === 0} className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium text-xs hover:bg-gray-300 disabled:opacity-50">
              <i className="fas fa-times mr-1"></i>Batal
            </button>
            <button onClick={() => setShowPayment(true)} disabled={cart.length === 0} className="flex-1 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-bold text-xs hover:from-green-600 hover:to-green-700 disabled:opacity-50 shadow-lg shadow-green-200">
              <i className="fas fa-credit-card mr-1"></i>BAYAR
            </button>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && <PaymentModal total={total} onComplete={handlePaymentComplete} onClose={() => setShowPayment(false)} paymentMethods={paymentMethods} formatRupiah={formatRupiah} />}

      {/* Receipt Modal */}
      {showReceipt && lastTransaction && <ReceiptModal transaction={lastTransaction} onClose={() => setShowReceipt(false)} formatRupiah={formatRupiah} storeSettings={storeSettings} />}

      {/* Shift Modal */}
      {showShiftModal && !currentShift && <ShiftModal modal={shiftModal} setModal={setShiftModal} onClose={() => setShowShiftModal(false)} />}
    </div>
  );
}

// Payment Modal Component
function PaymentModal({ total, onComplete, onClose, paymentMethods, formatRupiah }: { total: number; onComplete: (method: string, amount: number) => void; onClose: () => void; paymentMethods: any[]; formatRupiah: (n: number) => string }) {
  const [method, setMethod] = useState('Tunai');
  const [cashAmount, setCashAmount] = useState('');
  const cash = parseInt(cashAmount.replace(/\D/g, '')) || 0;
  const change = cash - total;
  const isValid = method === 'Tunai' ? cash >= total : true;

  const quickAmounts = [total, Math.ceil(total / 10000) * 10000, Math.ceil(total / 50000) * 50000, 100000, 200000, 500000].filter((v, i, a) => a.indexOf(v) === i && v >= total).slice(0, 6);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold"><i className="fas fa-cash-register mr-2"></i>Pembayaran</h2>
            <button onClick={onClose} className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30"><i className="fas fa-times text-sm"></i></button>
          </div>
        </div>
        <div className="p-4">
          <div className="bg-gray-900 text-white rounded-xl p-4 text-center mb-4">
            <p className="text-xs text-gray-300">Total Pembayaran</p>
            <p className="text-2xl font-bold">{formatRupiah(total)}</p>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {paymentMethods.filter(p => p.active).map(pm => (
              <button key={pm.id} onClick={() => setMethod(pm.name)} className={`p-2 rounded-lg border-2 text-xs font-medium transition-all flex flex-col items-center gap-1 ${method === pm.name ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                <i className={`fas ${pm.icon} text-blue-500`}></i>
                {pm.name}
              </button>
            ))}
          </div>
          {method === 'Tunai' && (
            <>
              <div className="relative mb-3">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">Rp</span>
                <input type="text" value={cashAmount ? parseInt(cashAmount).toLocaleString('id-ID') : ''} onChange={e => setCashAmount(e.target.value.replace(/\D/g, ''))} placeholder="0"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl text-xl font-bold focus:border-blue-500 outline-none" autoFocus />
              </div>
              <div className="grid grid-cols-3 gap-1.5 mb-3">
                {quickAmounts.map(a => (
                  <button key={a} onClick={() => setCashAmount(a.toString())} className="py-1.5 bg-gray-100 hover:bg-blue-100 rounded-lg text-xs font-medium">{formatRupiah(a)}</button>
                ))}
              </div>
              {cash > 0 && (
                <div className={`p-2 rounded-lg text-center ${change >= 0 ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <p className="text-xs text-gray-600">Kembalian</p>
                  <p className={`text-xl font-bold ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>{change >= 0 ? formatRupiah(change) : 'Kurang ' + formatRupiah(Math.abs(change))}</p>
                </div>
              )}
            </>
          )}
        </div>
        <div className="border-t p-3 flex gap-2">
          <button onClick={onClose} className="px-4 py-2.5 bg-gray-200 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-300">Batal</button>
          <button onClick={() => onComplete(method, method === 'Tunai' ? cash : total)} disabled={!isValid} className="flex-1 py-2.5 bg-green-600 text-white rounded-xl font-bold text-sm hover:bg-green-700 disabled:opacity-50">
            <i className="fas fa-check-circle mr-1"></i>Proses Pembayaran
          </button>
        </div>
      </div>
    </div>
  );
}

// Shift Modal Component
function ShiftModal({ modal, setModal, onClose }: { modal: number; setModal: (n: number) => void; onClose: () => void }) {
  const { openShift } = useStore();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 text-center">
          <i className="fas fa-door-open text-3xl mb-2"></i>
          <h2 className="text-lg font-bold">Open Shift</h2>
          <p className="text-green-100 text-sm">Masukkan modal awal</p>
        </div>
        <div className="p-4">
          <label className="text-sm font-medium text-gray-700 mb-1 block">Modal Awal</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">Rp</span>
            <input type="number" value={modal || ''} onChange={e => setModal(parseInt(e.target.value) || 0)} placeholder="500000"
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl text-lg font-bold focus:border-green-500 outline-none" />
          </div>
        </div>
        <div className="p-4 border-t">
          <button onClick={() => { openShift(modal); onClose(); }} className="w-full py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700">
            <i className="fas fa-play mr-2"></i>Mulai Shift
          </button>
        </div>
      </div>
    </div>
  );
}

// Receipt Modal Component
function ReceiptModal({ transaction, onClose, formatRupiah, storeSettings }: { transaction: SaleTransaction; onClose: () => void; formatRupiah: (n: number) => string; storeSettings: any }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
        <div className="bg-green-500 text-white p-4 text-center">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
            <i className="fas fa-check text-xl"></i>
          </div>
          <h2 className="font-bold">Transaksi Berhasil!</h2>
        </div>
        <div className="p-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 font-mono text-xs">
            <div className="text-center mb-2 pb-2 border-b border-dashed">
              <p className="font-bold text-sm">{storeSettings.name}</p>
              <p className="text-[10px] text-gray-500">{storeSettings.address}</p>
            </div>
            <div className="mb-2 pb-2 border-b border-dashed space-y-0.5">
              <div className="flex justify-between"><span>No:</span><span>{transaction.invoiceNo}</span></div>
              <div className="flex justify-between"><span>Tgl:</span><span>{new Date(transaction.date).toLocaleString('id-ID')}</span></div>
              <div className="flex justify-between"><span>Kasir:</span><span>{transaction.cashierName}</span></div>
            </div>
            <div className="mb-2 pb-2 border-b border-dashed space-y-1">
              {transaction.items.map(item => (
                <div key={item.product.id}>
                  <p className="truncate">{item.product.name}</p>
                  <div className="flex justify-between text-[10px] text-gray-600">
                    <span>{item.quantity} x {formatRupiah(item.product.sellPrice)}</span>
                    <span>{formatRupiah(item.product.sellPrice * item.quantity)}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-0.5 mb-2 pb-2 border-b border-dashed">
              <div className="flex justify-between"><span>Subtotal:</span><span>{formatRupiah(transaction.subtotal)}</span></div>
              {transaction.discount > 0 && <div className="flex justify-between"><span>Diskon:</span><span>-{formatRupiah(transaction.discount)}</span></div>}
              <div className="flex justify-between"><span>PPN:</span><span>{formatRupiah(transaction.tax)}</span></div>
              <div className="flex justify-between font-bold"><span>TOTAL:</span><span>{formatRupiah(transaction.total)}</span></div>
            </div>
            <div className="space-y-0.5">
              <div className="flex justify-between"><span>Bayar ({transaction.paymentMethod}):</span><span>{formatRupiah(transaction.paymentAmount)}</span></div>
              {transaction.change > 0 && <div className="flex justify-between"><span>Kembali:</span><span>{formatRupiah(transaction.change)}</span></div>}
            </div>
            <div className="text-center mt-3 pt-2 border-t border-dashed">
              <p className="text-[10px] text-gray-500">Terima kasih atas kunjungan Anda</p>
            </div>
          </div>
        </div>
        <div className="border-t p-3 flex gap-2">
          <button onClick={onClose} className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl font-medium text-sm hover:bg-blue-700">
            <i className="fas fa-plus mr-1"></i>Transaksi Baru
          </button>
          <button onClick={() => window.print()} className="px-4 py-2.5 bg-gray-200 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-300">
            <i className="fas fa-print"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
