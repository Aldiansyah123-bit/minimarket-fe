import React from 'react';
import { useStore } from '../context/StoreContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { currentUser, currentPage, sidebarCollapsed, expandedMenus, toggleSidebar, toggleMenu, setCurrentPage, logout } = useStore();

  const hasRoleAccess = (roles: string[]) => {
    return currentUser && roles.includes(currentUser.role);
  };

  const filteredMenu = currentUser ? useStore().menuConfig.filter(item => hasRoleAccess(item.roles)) : [];

  const getRoleBadge = (role: string) => {
    const badges: Record<string, { label: string; color: string }> = {
      administrator: { label: 'Admin', color: 'bg-red-100 text-red-700' },
      owner: { label: 'Owner', color: 'bg-purple-100 text-purple-700' },
      manager: { label: 'Manager', color: 'bg-blue-100 text-blue-700' },
      cashier: { label: 'Kasir', color: 'bg-green-100 text-green-700' },
    };
    return badges[role] || { label: '', color: '' };
  };

  const getCurrentPageLabel = () => {
    const all: Array<{ id: string; label: string }> = [];
    useStore().menuConfig.forEach(m => {
      if (m.children) m.children.forEach(c => all.push({ id: c.id, label: c.label }));
      else all.push({ id: m.id, label: m.label });
    });
    const found = all.find(m => m.id === currentPage);
    return found ? found.label : 'Dashboard';
  };

  const roleBadge = currentUser ? getRoleBadge(currentUser.role) : { label: '', color: '' };

  return (
    <div className="h-screen flex bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-slate-900 text-white flex flex-col transition-all duration-300 flex-shrink-0`}>
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <i className="fas fa-store text-sm"></i>
            </div>
            {!sidebarCollapsed && (
              <div>
                <h1 className="text-sm font-bold">POS Minimarket</h1>
                <p className="text-[10px] text-slate-400">Sistem Kasir Digital</p>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-3">
          {filteredMenu.map(item => (
            <div key={item.id}>
              <button
                onClick={() => item.children ? toggleMenu(item.id) : setCurrentPage(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                  currentPage === item.id || (item.children && item.children.some(c => c.id === currentPage))
                    ? 'bg-blue-600/20 text-blue-300 border-r-2 border-blue-400'
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                }`}
              >
                <i className={`fas ${item.icon} w-4 text-center`}></i>
                {!sidebarCollapsed && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.children && (
                      <i className={`fas fa-chevron-down text-[10px] transition-transform ${expandedMenus.includes(item.id) ? 'rotate-180' : ''}`}></i>
                    )}
                  </>
                )}
              </button>
              {!sidebarCollapsed && item.children && expandedMenus.includes(item.id) && (
                <div className="bg-slate-800/50">
                  {item.children.filter(c => hasRoleAccess(c.roles)).map(child => (
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

        <div className="p-3 border-t border-slate-700">
          {!sidebarCollapsed ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center flex-shrink-0">
                <i className="fas fa-user text-xs"></i>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate">{currentUser?.name}</p>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${roleBadge.color}`}>{roleBadge.label}</span>
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
        <header className="bg-white border-b px-4 py-2.5 flex items-center justify-between shadow-sm flex-shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-700">
              <i className="fas fa-bars"></i>
            </button>
            <h2 className="text-sm font-semibold text-gray-800">{getCurrentPageLabel()}</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-xs text-gray-500">{new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-1 rounded-full ${roleBadge.color}`}>{roleBadge.label}</span>
              <span className="text-sm font-medium text-gray-700">{currentUser?.name}</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
