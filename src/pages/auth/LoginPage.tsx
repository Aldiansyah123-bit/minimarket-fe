import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';

export default function LoginPage() {
  const { login } = useStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    setTimeout(() => {
      const success = login(username, password);
      if (!success) {
        setError('Username atau password salah');
      }
      setLoading(false);
    }, 500);
  };

  const demoAccounts = [
    { role: 'Administrator', username: 'admin', password: 'admin123', color: 'bg-red-500' },
    { role: 'Owner', username: 'owner', password: 'owner123', color: 'bg-purple-500' },
    { role: 'Manager', username: 'manager', password: 'manager123', color: 'bg-blue-500' },
    { role: 'Kasir', username: 'kasir1', password: 'kasir123', color: 'bg-green-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left: Branding */}
        <div className="text-white space-y-6 hidden lg:block">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <i className="fas fa-store text-2xl"></i>
            </div>
            <div>
              <h1 className="text-3xl font-bold">POS Minimarket</h1>
              <p className="text-blue-200">Sistem Kasir Digital</p>
            </div>
          </div>
          <p className="text-lg text-blue-100 leading-relaxed">
            Kelola toko Anda dengan mudah. Sistem POS modern untuk minimarket dengan fitur lengkap mulai dari kasir, inventory, hingga laporan.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <i className="fas fa-cash-register text-2xl text-blue-300 mb-2"></i>
              <p className="font-medium text-sm">Kasir Cepat</p>
              <p className="text-xs text-blue-200">Transaksi dalam hitungan detik</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <i className="fas fa-chart-line text-2xl text-green-300 mb-2"></i>
              <p className="font-medium text-sm">Laporan Real-time</p>
              <p className="text-xs text-blue-200">Pantau penjualan kapan saja</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <i className="fas fa-warehouse text-2xl text-yellow-300 mb-2"></i>
              <p className="font-medium text-sm">Inventory</p>
              <p className="text-xs text-blue-200">Kelola stok dengan mudah</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <i className="fas fa-shield-halved text-2xl text-purple-300 mb-2"></i>
              <p className="font-medium text-sm">Multi-Role</p>
              <p className="text-xs text-blue-200">Keamanan berbasis peran</p>
            </div>
          </div>
        </div>

        {/* Right: Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200">
              <i className="fas fa-store text-2xl text-white"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Selamat Datang</h2>
            <p className="text-gray-500 text-sm mt-1">Masuk ke akun Anda untuk melanjutkan</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Username</label>
              <div className="relative">
                <i className="fas fa-user absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="Masukkan username"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Password</label>
              <div className="relative">
                <i className="fas fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg flex items-center gap-2">
                <i className="fas fa-exclamation-circle"></i>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-200 disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="fas fa-spinner animate-spin"></i> Memproses...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <i className="fas fa-right-to-bracket"></i> Masuk
                </span>
              )}
            </button>
          </form>

          {/* Demo Accounts */}
          <div className="mt-6 pt-6 border-t">
            <p className="text-xs text-gray-500 text-center mb-3">Demo Accounts (klik untuk mengisi):</p>
            <div className="grid grid-cols-2 gap-2">
              {demoAccounts.map(acc => (
                <button
                  key={acc.username}
                  onClick={() => { setUsername(acc.username); setPassword(acc.password); setError(''); }}
                  className="flex items-center gap-2 p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className={`w-6 h-6 ${acc.color} rounded-full flex items-center justify-center`}>
                    <i className="fas fa-user text-[8px] text-white"></i>
                  </div>
                  <div>
                    <p className="text-xs font-medium">{acc.role}</p>
                    <p className="text-[10px] text-gray-400">{acc.username}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
