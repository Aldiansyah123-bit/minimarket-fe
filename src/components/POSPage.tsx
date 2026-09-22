import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Product, CartItem, Transaction } from '../types';
import { categories } from '../data/products';
import PaymentModal from './PaymentModal';
import ReceiptModal from './ReceiptModal';

interface Props {
  products: Product[];
  onAddTransaction: (t: Transaction) => void;
}

export default function POSPage({ products, onAddTransaction }: Props) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [showPayment, setShowPayment] = useState(false);
  const [lastTransaction, setLastTransaction] = useState<Transaction | null>(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'F2') { e.preventDefault(); searchRef.current?.focus(); }
      if (e.key === 'F9') { e.preventDefault(); if (cart.length > 0) setShowPayment(true); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [cart]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchCategory = activeCategory === 'Semua' || p.category === activeCategory;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.barcode.includes(search);
      return matchCategory && matchSearch;
    });
  }, [products, activeCategory, search]);

  const addToCart = (product: Product) => {
    if (product.stock <= 0) return;
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        if (existing.quantity >= product.stock) return prev;
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1, subtotal: (item.quantity + 1) * item.product.price }
            : item
        );
      }
      return [...prev, { product, quantity: 1, subtotal: product.price }];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          if (newQty <= 0) return null as any;
          if (newQty > item.product.stock) return item;
          return { ...item, quantity: newQty, subtotal: newQty * item.product.price };
        }
        return item;
      }).filter(Boolean);
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((sum, item) => sum + item.subtotal, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handlePaymentComplete = (transaction: Transaction) => {
    onAddTransaction(transaction);
    setLastTransaction(transaction);
    setShowPayment(false);
    setShowReceipt(true);
    setCart([]);
  };

  const formatRupiah = (n: number) => 'Rp ' + n.toLocaleString('id-ID');

  const getCategoryIcon = (cat: string) => {
    const icons: Record<string, string> = {
      'Semua': 'fa-border-all',
      'Makanan': 'fa-bowl-food',
      'Minuman': 'fa-mug-hot',
      'Snack': 'fa-cookie-bite',
      'Kebutuhan Harian': 'fa-soap',
      'Dairy': 'fa-cheese',
      'Bumbu & Saus': 'fa-pepper-hot',
      'Frozen Food': 'fa-snowflake',
    };
    return icons[cat] || 'fa-box';
  };

  return (
    <div className="h-full flex gap-0">
      {/* Left: Product Grid */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Search & Category */}
        <div className="p-3 bg-white border-b shadow-sm">
          <div className="flex gap-3 mb-3">
            <div className="flex-1 relative">
              <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                ref={searchRef}
                type="text"
                placeholder="Cari produk atau scan barcode... (F2)"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <i className="fas fa-times"></i>
                </button>
              )}
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <i className={`fas ${getCategoryIcon(cat)} text-[10px]`}></i>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1 overflow-y-auto p-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
            {filteredProducts.map(product => (
              <button
                key={product.id}
                onClick={() => addToCart(product)}
                disabled={product.stock <= 0}
                className={`group relative bg-white rounded-xl border-2 p-3 text-left transition-all hover:shadow-lg hover:-translate-y-0.5 ${
                  product.stock <= 0
                    ? 'opacity-50 cursor-not-allowed border-gray-200'
                    : 'border-gray-100 hover:border-blue-300'
                }`}
              >
                <div className="w-full aspect-square bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center mb-2">
                  <i className={`fas ${getCategoryIcon(product.category)} text-2xl text-blue-400`}></i>
                </div>
                <h3 className="text-xs font-semibold text-gray-800 line-clamp-2 leading-tight mb-1">
                  {product.name}
                </h3>
                <p className="text-sm font-bold text-blue-700">{formatRupiah(product.price)}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    product.stock > 20 ? 'bg-green-100 text-green-700' :
                    product.stock > 0 ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    Stok: {product.stock}
                  </span>
                </div>
                {product.stock <= 0 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl">
                    <span className="text-white text-xs font-bold bg-red-600 px-2 py-1 rounded">HABIS</span>
                  </div>
                )}
              </button>
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <i className="fas fa-search text-4xl mb-3"></i>
              <p className="text-sm">Produk tidak ditemukan</p>
            </div>
          )}
        </div>
      </div>

      {/* Right: Cart */}
      <div className="w-96 bg-white border-l flex flex-col shadow-xl">
        {/* Cart Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <i className="fas fa-shopping-cart"></i>
              <h2 className="font-bold">Keranjang</h2>
            </div>
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
              {totalItems} item
            </span>
          </div>
          <p className="text-2xl font-bold">{formatRupiah(total)}</p>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 p-6">
              <i className="fas fa-cart-shopping text-5xl mb-4 opacity-30"></i>
              <p className="text-sm font-medium">Keranjang kosong</p>
              <p className="text-xs mt-1">Klik produk untuk menambahkan</p>
            </div>
          ) : (
            <div className="divide-y">
              {cart.map(item => (
                <div key={item.product.id} className="p-3 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-800 truncate">{item.product.name}</h4>
                      <p className="text-xs text-gray-500">{formatRupiah(item.product.price)}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-red-400 hover:text-red-600 text-xs p-1"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => updateQuantity(item.product.id, -1)}
                        className="w-7 h-7 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-sm font-bold transition-colors"
                      >
                        −
                      </button>
                      <span className="w-10 text-center text-sm font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, 1)}
                        disabled={item.quantity >= item.product.stock}
                        className="w-7 h-7 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-sm font-bold transition-colors disabled:opacity-50"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-sm font-bold text-blue-700">{formatRupiah(item.subtotal)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Footer */}
        <div className="border-t bg-gray-50 p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal ({totalItems} item)</span>
            <span className="font-semibold">{formatRupiah(total)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">PPN (11%)</span>
            <span className="font-semibold">{formatRupiah(Math.round(total * 0.11))}</span>
          </div>
          <div className="flex justify-between text-lg font-bold border-t pt-2">
            <span>TOTAL</span>
            <span className="text-blue-700">{formatRupiah(Math.round(total * 1.11))}</span>
          </div>
          <div className="flex gap-2 pt-2">
            <button
              onClick={clearCart}
              disabled={cart.length === 0}
              className="px-4 py-2.5 bg-gray-200 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-300 transition-colors disabled:opacity-50"
            >
              <i className="fas fa-times mr-1"></i> Batal
            </button>
            <button
              onClick={() => setShowPayment(true)}
              disabled={cart.length === 0}
              className="flex-1 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-bold text-sm hover:from-green-600 hover:to-green-700 transition-all disabled:opacity-50 shadow-lg shadow-green-200"
            >
              <i className="fas fa-credit-card mr-1"></i> Bayar (F9)
            </button>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <PaymentModal
          total={Math.round(total * 1.11)}
          items={cart}
          onComplete={handlePaymentComplete}
          onClose={() => setShowPayment(false)}
        />
      )}

      {/* Receipt Modal */}
      {showReceipt && lastTransaction && (
        <ReceiptModal
          transaction={lastTransaction}
          onClose={() => setShowReceipt(false)}
        />
      )}
    </div>
  );
}
