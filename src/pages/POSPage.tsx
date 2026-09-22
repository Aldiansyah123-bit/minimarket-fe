import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';

export default function POSPage() {
  const { products, categories, units, customers, storeSettings, currentUser, addSaleTransaction } = useStore();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [cart, setCart] = useState<Array<{ product: any; quantity: number }>>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState('c0');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Tunai');
  const [cashInput, setCashInput] = useState('');

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (p.status !== 'active') return false;
      const matchCat = activeCategory === 'all' || p.categoryId === activeCategory;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.barcode.includes(search) ||
        p.sku.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [products, activeCategory, search]);

  const cartTotalItems = cart.reduce((s, i) => s + i.quantity, 0);
  const cartSubtotal = cart.reduce((s, i) => s + i.product.sellPrice * i.quantity, 0);
  const cartTax = Math.round(cartSubtotal * (storeSettings.taxRate / 100));
  const cartGrandTotal = cartSubtotal + cartTax;

  const cashValue = parseInt(cashInput.replace(/\D/g, '')) || 0;
  const cashChange = cashValue - cartGrandTotal;
  const isPaymentValid = paymentMethod === 'Tunai' ? cashValue >= cartGrandTotal : true;

  const getCategoryIcon = (id: string) => {
    const cat = categories.find(c => c.id === id);
    return cat ? cat.icon : 'fa-box';
  };

  const getCategoryColor = (id: string) => {
    const cat = categories.find(c => c.id === id);
    return cat ? cat.color : '#f3f4f6';
  };

  const getUnitName = (id: string) => {
    const unit = units.find(u => u.id === id);
    return unit ? unit.shortName : '-';
  };

  const getStockBadge = (product: any) => {
    if (product.stock === 0) return 'bg-red-100 text-red-700';
    if (product.stock <= product.minStock) return 'bg-yellow-100 text-yellow-700';
    return 'bg-green-100 text-green-700';
  };

  const formatRupiah = (n: number) => 'Rp ' + (n || 0).toLocaleString('id-ID');

  const addToCart = (product: any) => {
    if (product.stock <= 0) return;
    const existing = cart.find(i => i.product.id === product.id);
    if (existing) {
      if (existing.quantity < product.stock) {
        setCart(cart.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
    } else {
      setCart([...cart, { product: { ...product }, quantity: 1 }]);
    }
  };

  const updateCartQty = (productId: string, delta: number) => {
    const item = cart.find(i => i.product.id === productId);
    if (!item) return;
    const newQty = item.quantity + delta;
    if (newQty <= 0) {
      removeFromCart(productId);
      return;
    }
    if (newQty > item.product.stock) return;
    setCart(cart.map(i => i.product.id === productId ? { ...i, quantity: newQty } : i));
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(i => i.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const processPayment = () => {
    if (!isPaymentValid || !currentUser) return;
    const change = paymentMethod === 'Tunai' ? cashChange : 0;
    const payment = paymentMethod === 'Tunai' ? cashValue : cartGrandTotal;
    const customer = customers.find(c => c.id === selectedCustomerId);
    
    const transaction = {
      id: 'TX-' + Date.now(),
      invoiceNo: 'INV-' + String(Date.now()).slice(-6),
      items: cart.map(i => ({ product: i.product, quantity: i.quantity, subtotal: i.product.sellPrice * i.quantity })),
      subtotal: cartSubtotal,
      discount: 0,
      tax: cartTax,
      total: cartGrandTotal,
      paymentMethod,
      paymentAmount: payment,
      change,
      customerId: selectedCustomerId,
      customerName: customer?.name || 'Walk-in',
      cashierId: currentUser.id,
      cashierName: currentUser.name,
      date: new Date().toISOString(),
      status: 'completed',
      shiftId: ''
    };

    addSaleTransaction(transaction);
    alert('Transaksi berhasil! Invoice: ' + transaction.invoiceNo);
    setCart([]);
    setCashInput('');
    setShowPaymentModal(false);
  };

  return (
    <div className="h-full flex">
      {/* Left: Products */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-3 bg-white border-b shadow-sm">
          <div className="relative mb-2">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="🔍 Scan barcode / Cari produk..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
            />
          </div>
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                activeCategory === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <i className="fas fa-border-all mr-1"></i>Semua
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <i className={`fas ${cat.icon} mr-1`}></i>{cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {filteredProducts.map(product => (
              <button
                key={product.id}
                onClick={() => addToCart(product)}
                disabled={product.stock <= 0}
                className={`group relative bg-white rounded-xl border-2 p-2.5 text-left transition-all hover:shadow-lg hover:-translate-y-0.5 ${
                  product.stock <= 0 ? 'opacity-50 cursor-not-allowed border-gray-200' : 'border-gray-100 hover:border-blue-300'
                }`}
              >
                <div
                  className="w-full aspect-square rounded-lg flex items-center justify-center mb-2"
                  style={{ background: getCategoryColor(product.categoryId) }}
                >
                  <i className={`fas ${getCategoryIcon(product.categoryId)} text-xl`}></i>
                </div>
                <h3 className="text-[11px] font-semibold text-gray-800 line-clamp-2 leading-tight mb-1">{product.name}</h3>
                <p className="text-sm font-bold text-blue-700">{formatRupiah(product.sellPrice)}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${getStockBadge(product)}`}>
                    {product.stock} {getUnitName(product.unitId)}
                  </span>
                  <span className="text-[9px] text-gray-400">{product.sku}</span>
                </div>
              </button>
            ))}
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
      <div className="w-96 bg-white border-l flex flex-col shadow-xl">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <i className="fas fa-shopping-cart"></i>
              <h2 className="font-bold text-sm">Keranjang</h2>
            </div>
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">{cartTotalItems} item</span>
          </div>
          <p className="text-xl font-bold">{formatRupiah(cartGrandTotal)}</p>
        </div>

        <div className="p-2 border-b bg-gray-50">
          <select
            value={selectedCustomerId}
            onChange={e => setSelectedCustomerId(e.target.value)}
            className="w-full px-2 py-1.5 text-xs border rounded-lg bg-white"
          >
            {customers.map(c => (
              <option key={c.id} value={c.id}>
                {c.name} {c.isMember ? `(${c.memberCode})` : ''}
              </option>
            ))}
          </select>
        </div>

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
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-red-400 hover:text-red-600 text-[10px] p-1"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-1.5">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => updateCartQty(item.product.id, -1)}
                        className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xs font-bold"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQty(item.product.id, 1)}
                        disabled={item.quantity >= item.product.stock}
                        className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xs font-bold disabled:opacity-50"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-xs font-bold text-blue-700">{formatRupiah(item.product.sellPrice * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t bg-gray-50 p-3 space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">{formatRupiah(cartSubtotal)}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-600">PPN ({storeSettings.taxRate}%)</span>
            <span className="font-medium">{formatRupiah(cartTax)}</span>
          </div>
          <div className="flex justify-between text-base font-bold border-t pt-1.5">
            <span>TOTAL</span>
            <span className="text-blue-700">{formatRupiah(cartGrandTotal)}</span>
          </div>
          <div className="flex gap-2 pt-2">
            <button
              onClick={clearCart}
              disabled={cart.length === 0}
              className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium text-xs hover:bg-gray-300 disabled:opacity-50"
            >
              <i className="fas fa-times mr-1"></i>Batal
            </button>
            <button
              onClick={() => setShowPaymentModal(true)}
              disabled={cart.length === 0}
              className="flex-1 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-bold text-xs hover:from-green-600 hover:to-green-700 disabled:opacity-50 shadow-lg shadow-green-200"
            >
              <i className="fas fa-credit-card mr-1"></i>BAYAR
            </button>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold"><i className="fas fa-cash-register mr-2"></i>Pembayaran</h2>
                <button onClick={() => setShowPaymentModal(false)} className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30">
                  <i className="fas fa-times text-sm"></i>
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="bg-gray-900 text-white rounded-xl p-4 text-center mb-4">
                <p className="text-xs text-gray-300">Total Pembayaran</p>
                <p className="text-2xl font-bold">{formatRupiah(cartGrandTotal)}</p>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {['Tunai', 'QRIS', 'Debit', 'E-Wallet', 'Transfer'].map(method => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`p-2 rounded-lg border-2 text-xs font-medium transition-all flex flex-col items-center gap-1 ${
                      paymentMethod === method ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <i className="fas fa-money-bill-wave text-blue-500"></i>
                    {method}
                  </button>
                ))}
              </div>
              {paymentMethod === 'Tunai' && (
                <>
                  <div className="relative mb-3">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">Rp</span>
                    <input
                      type="text"
                      value={cashInput ? parseInt(cashInput).toLocaleString('id-ID') : ''}
                      onChange={e => setCashInput(e.target.value.replace(/\D/g, ''))}
                      placeholder="0"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl text-xl font-bold focus:border-blue-500 outline-none"
                      autoFocus
                    />
                  </div>
                  {cashValue > 0 && (
                    <div className={`p-2 rounded-lg text-center ${cashChange >= 0 ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                      <p className="text-xs text-gray-600">Kembalian</p>
                      <p className={`text-xl font-bold ${cashChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {cashChange >= 0 ? formatRupiah(cashChange) : 'Kurang ' + formatRupiah(Math.abs(cashChange))}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="border-t p-3 flex gap-2">
              <button onClick={() => setShowPaymentModal(false)} className="px-4 py-2.5 bg-gray-200 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-300">
                Batal
              </button>
              <button
                onClick={processPayment}
                disabled={!isPaymentValid}
                className="flex-1 py-2.5 bg-green-600 text-white rounded-xl font-bold text-sm hover:bg-green-700 disabled:opacity-50"
              >
                <i className="fas fa-check-circle mr-1"></i>Proses Pembayaran
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
