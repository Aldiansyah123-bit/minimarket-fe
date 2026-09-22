import React, { useState, useCallback } from 'react';
import { Product, CartItem, Transaction, Page } from './types';
import { products } from './data/products';
import POSPage from './components/POSPage';
import DashboardPage from './components/DashboardPage';
import HistoryPage from './components/HistoryPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('pos');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [productData, setProductData] = useState<Product[]>(products);

  const addTransaction = useCallback((transaction: Transaction) => {
    setTransactions(prev => [transaction, ...prev]);
    // Update stock
    setProductData(prev =>
      prev.map(p => {
        const item = transaction.items.find(i => i.product.id === p.id);
        if (item) {
          return { ...p, stock: p.stock - item.quantity };
        }
        return p;
      })
    );
  }, []);

  const navItems = [
    { id: 'pos' as Page, label: 'Kasir', icon: 'fa-cash-register' },
    { id: 'dashboard' as Page, label: 'Dashboard', icon: 'fa-chart-line' },
    { id: 'history' as Page, label: 'Riwayat', icon: 'fa-clock-rotate-left' },
  ];

  return (
    <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-lg">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <i className="fas fa-store text-xl"></i>
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight">POS Minimarket</h1>
              <p className="text-xs text-blue-200">Sistem Kasir Digital</p>
            </div>
          </div>
          <nav className="flex gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  currentPage === item.id
                    ? 'bg-white text-blue-800 shadow-md'
                    : 'text-white/80 hover:bg-white/10'
                }`}
              >
                <i className={`fas ${item.icon}`}></i>
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">Kasir 01</p>
              <p className="text-xs text-blue-200">{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center">
              <i className="fas fa-user text-sm"></i>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {currentPage === 'pos' && (
          <POSPage products={productData} onAddTransaction={addTransaction} />
        )}
        {currentPage === 'dashboard' && (
          <DashboardPage transactions={transactions} products={productData} />
        )}
        {currentPage === 'history' && (
          <HistoryPage transactions={transactions} />
        )}
      </main>
    </div>
  );
}
