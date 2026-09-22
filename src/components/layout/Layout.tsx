import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { PageId, MenuItem, UserRole } from '../../types';

const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'fa-chart-line', roles: ['administrator', 'owner', 'manager', 'cashier'] },
  {
    id: 'pos', label: 'POS', icon: 'fa-cash-register',
    roles: ['administrator', 'owner', 'manager', 'cashier'],
    children: [
      { id: 'pos-new', label: 'Penjualan Baru', icon: 'fa-cart-plus', roles: ['administrator', 'owner', 'manager', 'cashier'] },
      { id: 'pos-held', label: 'Pesanan Ditahan', icon: 'fa-pause-circle', roles: ['administrator', 'owner', 'manager', 'cashier'] },
      { id: 'pos-history', label: 'Riwayat Penjualan', icon: 'fa-clock-rotate-left', roles: ['administrator', 'owner', 'manager', 'cashier'] },
    ]
  },
  {
    id: 'products', label: 'Produk', icon: 'fa-boxes-stacked',
    roles: ['administrator', 'owner', 'manager'],
    children: [
      { id: 'products-all', label: 'Semua Produk', icon: 'fa-box', roles: ['administrator', 'owner', 'manager'] },
      { id: 'products-categories', label: 'Kategori', icon: 'fa-tags', roles: ['administrator', 'owner', 'manager'] },
      { id: 'products-brands', label: 'Brand', icon: 'fa-bookmark', roles: ['administrator', 'owner', 'manager'] },
      { id: 'products-units', label: 'Unit', icon: 'fa-ruler', roles: ['administrator', 'owner', 'manager'] },
      { id: 'products-pricing', label: 'Harga', icon: 'fa-tag', roles: ['administrator', 'owner', 'manager'] },
    ]
  },
  {
    id: 'purchase', label: 'Pembelian', icon: 'fa-truck',
    roles: ['administrator', 'owner', 'manager'],
    children: [
      { id: 'purchase-new', label: 'Pembelian Baru', icon: 'fa-cart-shopping', roles: ['administrator', 'owner', 'manager'] },
      { id: 'purchase-history', label: 'Riwayat Pembelian', icon: 'fa-file-invoice', roles: ['administrator', 'owner', 'manager'] },
      { id: 'purchase-suppliers', label: 'Supplier', icon: 'fa-handshake', roles: ['administrator', 'owner', 'manager'] },
    ]
  },
  {
    id: 'inventory', label: 'Inventory', icon: 'fa-warehouse',
    roles: ['administrator', 'owner', 'manager'],
    children: [
      { id: 'inventory-stock', label: 'Stok', icon: 'fa-cubes', roles: ['administrator', 'owner', 'manager'] },
      { id: 'inventory-mutation', label: 'Mutasi Stok', icon: 'fa-arrows-left-right', roles: ['administrator', 'owner', 'manager'] },
      { id: 'inventory-adjustment', label: 'Penyesuaian Stok', icon: 'fa-sliders', roles: ['administrator', 'owner', 'manager'] },
      { id: 'inventory-opname', label: 'Stock Opname', icon: 'fa-clipboard-check', roles: ['administrator', 'owner', 'manager'] },
    ]
  },
  {
    id: 'customer', label: 'Customer', icon: 'fa-users',
    roles: ['administrator', 'owner', 'manager'],
    children: [
      { id: 'customer-all', label: 'Semua Customer', icon: 'fa-user-group', roles: ['administrator', 'owner', 'manager'] },
      { id: 'customer-members', label: 'Member', icon: 'fa-id-card', roles: ['administrator', 'owner', 'manager'] },
    ]
  },
  {
    id: 'transaction', label: 'Transaksi', icon: 'fa-money-bill-trend-up',
    roles: ['administrator', 'owner', 'manager'],
    children: [
      { id: 'transaction-sales', label: 'Penjualan', icon: 'fa-receipt', roles: ['administrator', 'owner', 'manager'] },
      { id: 'transaction-return', label: 'Retur Penjualan', icon: 'fa-rotate-left', roles: ['administrator', 'owner', 'manager'] },
      { id: 'transaction-expenses', label: 'Pengeluaran', icon: 'fa-money-bill-transfer', roles: ['administrator', 'owner', 'manager'] },
    ]
  },
  {
    id: 'reports', label: 'Laporan', icon: 'fa-chart-pie',
    roles: ['administrator', 'owner', 'manager'],
    children: [
      { id: 'reports-sales', label: 'Penjualan', icon: 'fa-chart-bar', roles: ['administrator', 'owner', 'manager'] },
      { id: 'reports-product', label: 'Produk', icon: 'fa-chart-column', roles: ['administrator', 'owner', 'manager'] },
      { id: 'reports-purchase', label: 'Pembelian', icon: 'fa-chart-area', roles: ['administrator', 'owner', 'manager'] },
      { id: 'reports-stock', label: 'Stok', icon: 'fa-chart-line', roles: ['administrator', 'owner', 'manager'] },
      { id: 'reports-profit', label: 'Keuntungan', icon: 'fa-sack-dollar', roles: ['administrator', 'owner', 'manager'] },
      { id: 'reports-cash', label: 'Kas', icon: 'fa-vault', roles: ['administrator', 'owner', 'manager'] },
    ]
  },
  {
    id: 'settings', label: 'Pengaturan', icon: 'fa-gear',
    roles: ['administrator', 'owner'],
    children: [
      { id: 'settings-store', label: 'Toko', icon: 'fa-store', roles: ['administrator', 'owner'] },
      { id: 'settings-branch', label: 'Cabang', icon: 'fa-code-branch', roles: ['administrator', 'owner'] },
      { id: 'settings-users', label: 'User', icon: 'fa-user-gear', roles: ['administrator', 'owner'] },
      { id: 'settings-roles', label: 'Role & Permission', icon: 'fa-shield-halved', roles: ['administrator'] },
      { id: 'settings-payment', label: 'Metode Pembayaran', icon: 'fa-credit-card', roles: ['administrator', 'owner'] },
      { id: 'settings-printer', label: 'Printer', icon: 'fa-print', roles: ['administrator', 'owner'] },
      { id: 'settings-receipt', label: 'Struk', icon: 'fa-file-lines', roles: ['administrator', 'owner'] },
    ]
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const { currentUser, logout, currentPage, setCurrentPage, currentShift, sidebarOpen, setSidebarOpen, formatRupiah } = useStore();
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['pos']);

  if (!currentUser) return <>{children}</>;

  const toggleMenu = (id: string) => {
    setExpandedMenus(prev => prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]);
  };

  const hasAccess = (roles: UserRole[]) => {
    if (!currentUser) return false;
    return roles.includes(currentUser.role);
  };

  const filteredMenu = menuItems.filter(item => hasAccess(item.roles));

  const getRoleBadge = (role: UserRole) => {
    const badges: Record<UserRole, { label: string; color: string }> = {
      administrator: { label: 'Admin', color: 'bg-red-100 text-red-700' },
      owner: { label: 'Owner', color: 'bg-purple-100 text-purple-700' },
      manager: { label: 'Manager', color: 'bg-blue-100 text-blue-700' },
      cashier: { label: 'Kasir', color: 'bg-green-100 text-green-700' },
    };
    return badges[role];
  };

  const badge = getRoleBadge(currentUser.role);

  return (
    <div className="h-screen flex bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col transition-all duration-300 flex-shrink-0`}>
        {/* Logo */}
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <i className="fas fa-store text-sm"></i>
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="text-sm font-bold leading-tight">POS Minimarket</h1>
                <p className="text-[10px] text-slate-400">Sistem Kasir Digital</p>
              </div>
            )}
          </div>
        </div>

        {/* Shift Info */}
        {sidebarOpen && currentShift && (
          <div className="mx-3 mt-3 p-2 bg-green-900/30 border border-green-700/50 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-300">Shift Aktif</span>
            </div>
            <p className="text-xs text-slate-300 mt-1">Modal: {formatRupiah(currentShift.initialModal)}</p>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 scrollbar-hide">
          {filteredMenu.map(item => (
            <div key={item.id}>
              <button
                onClick={() => {
                  if (item.children) {
                    toggleMenu(item.id);
                  } else {
                    setCurrentPage(item.id as PageId);
                  }
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                  currentPage === item.id || (item.children && item.children.some(c => c.id === currentPage))
                    ? 'bg-blue-600/20 text-blue-300 border-r-2 border-blue-400'
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                }`}
              >
                <i className={`fas ${item.icon} w-4 text-center flex-shrink-0`}></i>
                {sidebarOpen && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.children && (
                      <i className={`fas fa-chevron-down text-[10px] transition-transform ${expandedMenus.includes(item.id) ? 'rotate-180' : ''}`}></i>
                    )}
                  </>
                )}
              </button>
              {sidebarOpen && item.children && expandedMenus.includes(item.id) && (
                <div className="bg-slate-800/50">
                  {item.children.filter(c => hasAccess(c.roles)).map(child => (
                    <button
                      key={child.id}
                      onClick={() => setCurrentPage(child.id)}
                      className={`w-full flex items-center gap-3 pl-11 pr-4 py-2 text-xs transition-colors ${
                        currentPage === child.id
                          ? 'bg-blue-600/30 text-blue-300'
                          : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
                      }`}
                    >
                      <i className={`fas ${child.icon} w-3 text-center`}></i>
                      <span>{child.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* User Info */}
        <div className="p-3 border-t border-slate-700">
          {sidebarOpen ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center flex-shrink-0">
                <i className="fas fa-user text-xs"></i>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate">{currentUser.name}</p>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${badge.color}`}>{badge.label}</span>
              </div>
              <button onClick={logout} className="text-slate-400 hover:text-red-400 transition-colors" title="Logout">
                <i className="fas fa-right-from-bracket"></i>
              </button>
            </div>
          ) : (
            <button onClick={logout} className="w-full flex justify-center text-slate-400 hover:text-red-400">
              <i className="fas fa-right-from-bracket"></i>
            </button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b px-4 py-2.5 flex items-center justify-between shadow-sm flex-shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-500 hover:text-gray-700">
              <i className="fas fa-bars"></i>
            </button>
            <div>
              <h2 className="text-sm font-semibold text-gray-800">
                {(() => { const all = menuItems.flatMap(m => m.children ? m.children.map(c => ({ id: c.id, label: c.label })) : [{ id: m.id as PageId, label: m.label }]); return all.find(m => m.id === currentPage)?.label || 'Dashboard'; })()}
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-xs text-gray-500">{new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
              <p className="text-xs text-gray-400">{new Date().toLocaleTimeString('id-ID')}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-1 rounded-full ${badge.color}`}>{badge.label}</span>
              <span className="text-sm font-medium text-gray-700">{currentUser.name}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
