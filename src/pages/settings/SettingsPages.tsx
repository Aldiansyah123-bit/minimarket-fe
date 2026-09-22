import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { User, UserRole, PaymentMethod } from '../../types';

// ==================== STORE SETTINGS ====================
export function StoreSettingsPage() {
  const { storeSettings, setStoreSettings } = useStore();
  const [form, setForm] = useState(storeSettings);
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setStoreSettings(form); setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="h-full overflow-y-auto p-4 lg:p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-5"><h2 className="text-xl font-bold text-gray-800">Pengaturan Toko</h2></div>
        <div className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
          <div><label className="text-xs font-medium text-gray-700 mb-1 block">Nama Toko</label><input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
          <div><label className="text-xs font-medium text-gray-700 mb-1 block">Alamat</label><input type="text" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-xs font-medium text-gray-700 mb-1 block">Telepon</label><input type="text" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
            <div><label className="text-xs font-medium text-gray-700 mb-1 block">Email</label><input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-xs font-medium text-gray-700 mb-1 block">Pajak (%)</label><input type="number" value={form.taxRate} onChange={e => setForm({ ...form, taxRate: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
            <div><label className="text-xs font-medium text-gray-700 mb-1 block">Mata Uang</label><input type="text" value={form.currency} onChange={e => setForm({ ...form, currency: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
          </div>
          <button onClick={handleSave} className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700">
            {saved ? <><i className="fas fa-check mr-1"></i>Tersimpan!</> : <><i className="fas fa-save mr-1"></i>Simpan</>}
          </button>
        </div>
      </div>
    </div>
  );
}

// ==================== BRANCH SETTINGS ====================
export function BranchSettingsPage() {
  const { branches, setBranches } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', address: '', phone: '', active: true });

  const handleSave = () => {
    setBranches(prev => [...prev, { ...form, id: 'br' + Date.now() }]);
    setShowForm(false); setForm({ name: '', address: '', phone: '', active: true });
  };

  return (
    <div className="h-full overflow-y-auto p-4 lg:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <div><h2 className="text-xl font-bold text-gray-800">Cabang</h2></div>
          <button onClick={() => setShowForm(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"><i className="fas fa-plus mr-1"></i>Tambah</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {branches.map(b => (
            <div key={b.id} className="bg-white rounded-xl shadow-sm border p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2"><div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center"><i className="fas fa-code-branch text-blue-600 text-sm"></i></div><p className="font-medium text-sm">{b.name}</p></div>
                <span className={`px-2 py-0.5 rounded-full text-xs ${b.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{b.active ? 'Aktif' : 'Nonaktif'}</span>
              </div>
              <p className="text-xs text-gray-500"><i className="fas fa-map-marker-alt mr-1"></i>{b.address}</p>
              <p className="text-xs text-gray-500"><i className="fas fa-phone mr-1"></i>{b.phone}</p>
            </div>
          ))}
        </div>
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
              <div className="bg-blue-600 text-white p-4"><h3 className="font-bold">Tambah Cabang</h3></div>
              <div className="p-4 space-y-3">
                <div><label className="text-xs font-medium text-gray-700 mb-1 block">Nama</label><input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                <div><label className="text-xs font-medium text-gray-700 mb-1 block">Alamat</label><input type="text" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                <div><label className="text-xs font-medium text-gray-700 mb-1 block">Telepon</label><input type="text" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
              </div>
              <div className="border-t p-3 flex gap-2">
                <button onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-200 rounded-lg text-sm">Batal</button>
                <button onClick={handleSave} className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold">Simpan</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ==================== USER SETTINGS ====================
export function UserSettingsPage() {
  const { users, setUsers } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<User | null>(null);
  const [form, setForm] = useState({ username: '', password: '', name: '', role: 'cashier' as UserRole, active: true });

  const handleSave = () => {
    if (editItem) {
      setUsers(prev => prev.map(u => u.id === editItem.id ? { ...u, ...form, permissions: form.role === 'administrator' || form.role === 'owner' ? ['*'] : form.role === 'manager' ? ['dashboard', 'pos', 'products', 'purchase', 'inventory', 'customer', 'transaction', 'reports'] : ['pos', 'pos-new', 'pos-held', 'pos-history'] } : u));
    } else {
      const permissions = form.role === 'administrator' || form.role === 'owner' ? ['*'] : form.role === 'manager' ? ['dashboard', 'pos', 'products', 'purchase', 'inventory', 'customer', 'transaction', 'reports'] : ['pos', 'pos-new', 'pos-held', 'pos-history'];
      setUsers(prev => [...prev, { ...form, id: 'u' + Date.now(), permissions }]);
    }
    setShowForm(false); setEditItem(null); setForm({ username: '', password: '', name: '', role: 'cashier', active: true });
  };

  const roleLabels: Record<UserRole, { label: string; color: string }> = {
    administrator: { label: 'Admin', color: 'bg-red-100 text-red-700' },
    owner: { label: 'Owner', color: 'bg-purple-100 text-purple-700' },
    manager: { label: 'Manager', color: 'bg-blue-100 text-blue-700' },
    cashier: { label: 'Kasir', color: 'bg-green-100 text-green-700' },
  };

  return (
    <div className="h-full overflow-y-auto p-4 lg:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <div><h2 className="text-xl font-bold text-gray-800">User</h2><p className="text-sm text-gray-500">{users.length} user</p></div>
          <button onClick={() => { setEditItem(null); setForm({ username: '', password: '', name: '', role: 'cashier', active: true }); setShowForm(true); }} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"><i className="fas fa-plus mr-1"></i>Tambah</button>
        </div>
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b"><tr>
              <th className="text-left py-2.5 px-4 font-medium text-gray-500">Nama</th>
              <th className="text-left py-2.5 px-4 font-medium text-gray-500">Username</th>
              <th className="text-left py-2.5 px-4 font-medium text-gray-500">Role</th>
              <th className="text-center py-2.5 px-4 font-medium text-gray-500">Status</th>
              <th className="text-center py-2.5 px-4 font-medium text-gray-500">Aksi</th>
            </tr></thead>
            <tbody className="divide-y">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-medium text-xs">{u.name}</td>
                  <td className="py-2.5 px-4 font-mono text-xs">{u.username}</td>
                  <td className="py-2.5 px-4"><span className={`px-2 py-0.5 rounded-full text-xs ${roleLabels[u.role].color}`}>{roleLabels[u.role].label}</span></td>
                  <td className="py-2.5 px-4 text-center"><span className={`px-2 py-0.5 rounded-full text-xs ${u.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{u.active ? 'Aktif' : 'Nonaktif'}</span></td>
                  <td className="py-2.5 px-4 text-center">
                    <button onClick={() => { setEditItem(u); setForm({ username: u.username, password: u.password, name: u.name, role: u.role, active: u.active }); setShowForm(true); }} className="text-blue-500 hover:text-blue-700 mr-2"><i className="fas fa-edit text-xs"></i></button>
                    <button onClick={() => { if (confirm('Hapus?')) setUsers(prev => prev.filter(x => x.id !== u.id)); }} className="text-red-500 hover:text-red-700"><i className="fas fa-trash text-xs"></i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
              <div className="bg-blue-600 text-white p-4"><h3 className="font-bold">{editItem ? 'Edit' : 'Tambah'} User</h3></div>
              <div className="p-4 space-y-3">
                <div><label className="text-xs font-medium text-gray-700 mb-1 block">Nama</label><input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                <div><label className="text-xs font-medium text-gray-700 mb-1 block">Username</label><input type="text" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                <div><label className="text-xs font-medium text-gray-700 mb-1 block">Password</label><input type="text" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                <div><label className="text-xs font-medium text-gray-700 mb-1 block">Role</label>
                  <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value as UserRole })} className="w-full px-3 py-2 border rounded-lg text-sm">
                    <option value="administrator">Administrator</option>
                    <option value="owner">Owner</option>
                    <option value="manager">Manager</option>
                    <option value="cashier">Kasir</option>
                  </select>
                </div>
                <div className="flex items-center gap-2"><input type="checkbox" checked={form.active} onChange={e => setForm({ ...form, active: e.target.checked })} id="active" /><label htmlFor="active" className="text-sm">Aktif</label></div>
              </div>
              <div className="border-t p-3 flex gap-2">
                <button onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-200 rounded-lg text-sm">Batal</button>
                <button onClick={handleSave} className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold">Simpan</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ==================== ROLES & PERMISSIONS ====================
export function RolesPage() {
  const roles = [
    { name: 'Administrator', color: 'bg-red-100 text-red-700', desc: 'Akses penuh ke semua fitur', perms: ['Semua modul'] },
    { name: 'Owner', color: 'bg-purple-100 text-purple-700', desc: 'Akses penuh ke semua fitur', perms: ['Semua modul'] },
    { name: 'Manager', color: 'bg-blue-100 text-blue-700', desc: 'Kelola operasional toko', perms: ['Dashboard', 'POS', 'Produk', 'Pembelian', 'Inventory', 'Customer', 'Transaksi', 'Laporan'] },
    { name: 'Kasir', color: 'bg-green-100 text-green-700', desc: 'Hanya akses kasir', perms: ['POS - Penjualan Baru', 'POS - Pesanan Ditahan', 'POS - Riwayat'] },
  ];

  return (
    <div className="h-full overflow-y-auto p-4 lg:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-5"><h2 className="text-xl font-bold text-gray-800">Role & Permission</h2></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {roles.map(r => (
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
      </div>
    </div>
  );
}

// ==================== PAYMENT METHOD SETTINGS ====================
export function PaymentMethodSettingsPage() {
  const { paymentMethods, setPaymentMethods } = useStore();

  const toggleActive = (id: string) => {
    setPaymentMethods(prev => prev.map(pm => pm.id === id ? { ...pm, active: !pm.active } : pm));
  };

  return (
    <div className="h-full overflow-y-auto p-4 lg:p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-5"><h2 className="text-xl font-bold text-gray-800">Metode Pembayaran</h2></div>
        <div className="space-y-2">
          {paymentMethods.map(pm => (
            <div key={pm.id} className="bg-white rounded-xl shadow-sm border p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"><i className={`fas ${pm.icon} text-blue-600`}></i></div>
                <div><p className="font-medium text-sm">{pm.name}</p><p className="text-xs text-gray-500 capitalize">{pm.type}</p></div>
              </div>
              <button onClick={() => toggleActive(pm.id)} className={`w-12 h-6 rounded-full transition-colors ${pm.active ? 'bg-green-500' : 'bg-gray-300'}`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${pm.active ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==================== PRINTER SETTINGS ====================
export function PrinterSettingsPage() {
  const { printers, setPrinters } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', type: 'Thermal 58mm', connection: 'USB', active: true });

  const handleSave = () => {
    setPrinters(prev => [...prev, { ...form, id: 'pr' + Date.now() }]);
    setShowForm(false); setForm({ name: '', type: 'Thermal 58mm', connection: 'USB', active: true });
  };

  return (
    <div className="h-full overflow-y-auto p-4 lg:p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <div><h2 className="text-xl font-bold text-gray-800">Printer</h2></div>
          <button onClick={() => setShowForm(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"><i className="fas fa-plus mr-1"></i>Tambah</button>
        </div>
        <div className="space-y-2">
          {printers.map(p => (
            <div key={p.id} className="bg-white rounded-xl shadow-sm border p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center"><i className="fas fa-print text-gray-600"></i></div>
                <div><p className="font-medium text-sm">{p.name}</p><p className="text-xs text-gray-500">{p.type} • {p.connection}</p></div>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs ${p.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{p.active ? 'Aktif' : 'Nonaktif'}</span>
            </div>
          ))}
        </div>
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
              <div className="bg-blue-600 text-white p-4"><h3 className="font-bold">Tambah Printer</h3></div>
              <div className="p-4 space-y-3">
                <div><label className="text-xs font-medium text-gray-700 mb-1 block">Nama</label><input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                <div><label className="text-xs font-medium text-gray-700 mb-1 block">Tipe</label>
                  <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm">
                    <option>Thermal 58mm</option><option>Thermal 80mm</option><option>Inkjet</option><option>Laser</option>
                  </select>
                </div>
                <div><label className="text-xs font-medium text-gray-700 mb-1 block">Koneksi</label>
                  <select value={form.connection} onChange={e => setForm({ ...form, connection: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm">
                    <option>USB</option><option>Bluetooth</option><option>WiFi</option><option>Network</option>
                  </select>
                </div>
              </div>
              <div className="border-t p-3 flex gap-2">
                <button onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-200 rounded-lg text-sm">Batal</button>
                <button onClick={handleSave} className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold">Simpan</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ==================== RECEIPT SETTINGS ====================
export function ReceiptSettingsPage() {
  const { receiptTemplate, setReceiptTemplate } = useStore();
  const [form, setForm] = useState(receiptTemplate);
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setReceiptTemplate(form); setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="h-full overflow-y-auto p-4 lg:p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-5"><h2 className="text-xl font-bold text-gray-800">Pengaturan Struk</h2></div>
        <div className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
          <div><label className="text-xs font-medium text-gray-700 mb-1 block">Header Struk</label><input type="text" value={form.header} onChange={e => setForm({ ...form, header: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
          <div><label className="text-xs font-medium text-gray-700 mb-1 block">Footer Struk</label><textarea value={form.footer} onChange={e => setForm({ ...form, footer: e.target.value })} rows={3} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
          <div className="space-y-2">
            <label className="flex items-center gap-2"><input type="checkbox" checked={form.showLogo} onChange={e => setForm({ ...form, showLogo: e.target.checked })} /><span className="text-sm">Tampilkan Logo</span></label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={form.showTax} onChange={e => setForm({ ...form, showTax: e.target.checked })} /><span className="text-sm">Tampilkan Pajak</span></label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={form.showBarcode} onChange={e => setForm({ ...form, showBarcode: e.target.checked })} /><span className="text-sm">Tampilkan Barcode</span></label>
          </div>
          <button onClick={handleSave} className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700">
            {saved ? <><i className="fas fa-check mr-1"></i>Tersimpan!</> : <><i className="fas fa-save mr-1"></i>Simpan</>}
          </button>
        </div>
      </div>
    </div>
  );
}
