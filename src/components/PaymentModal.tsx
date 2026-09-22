import React, { useState, useRef, useEffect } from 'react';
import { CartItem, Transaction } from '../types';

interface Props {
  total: number;
  items: CartItem[];
  onComplete: (t: Transaction) => void;
  onClose: () => void;
}

export default function PaymentModal({ total, items, onComplete, onClose }: Props) {
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [cashAmount, setCashAmount] = useState('');
  const [emoneyNumber, setEmoneyNumber] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [paymentMethod]);

  const cash = parseInt(cashAmount.replace(/\D/g, '')) || 0;
  const change = cash - total;
  const isValid = paymentMethod === 'cash' ? cash >= total : emoneyNumber.length >= 4;

  const quickAmounts = [
    total,
    Math.ceil(total / 10000) * 10000,
    Math.ceil(total / 50000) * 50000,
    100000,
    200000,
    500000,
  ].filter((v, i, a) => a.indexOf(v) === i && v >= total).slice(0, 6);

  const formatRupiah = (n: number) => 'Rp ' + n.toLocaleString('id-ID');

  const handleCashInput = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    setCashAmount(cleaned);
  };

  const handlePayment = () => {
    if (!isValid) return;
    const transaction: Transaction = {
      id: 'TRX-' + Date.now(),
      items: [...items],
      total,
      payment: paymentMethod === 'cash' ? cash : total,
      change: paymentMethod === 'cash' ? change : 0,
      paymentMethod,
      date: new Date().toISOString(),
      cashierName: 'Kasir 01',
    };
    onComplete(transaction);
  };

  const paymentMethods = [
    { id: 'cash', label: 'Tunai', icon: 'fa-money-bill-wave', color: 'from-green-500 to-green-600' },
    { id: 'debit', label: 'Debit', icon: 'fa-credit-card', color: 'from-blue-500 to-blue-600' },
    { id: 'qris', label: 'QRIS', icon: 'fa-qrcode', color: 'from-purple-500 to-purple-600' },
    { id: 'ewallet', label: 'E-Wallet', icon: 'fa-wallet', color: 'from-orange-500 to-orange-600' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <i className="fas fa-cash-register"></i> Pembayaran
              </h2>
              <p className="text-blue-200 text-sm mt-1">Pilih metode pembayaran</p>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30">
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>

        <div className="p-5">
          {/* Total */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl p-4 mb-5 text-center">
            <p className="text-sm text-gray-300 mb-1">Total Pembayaran</p>
            <p className="text-3xl font-bold">{formatRupiah(total)}</p>
          </div>

          {/* Payment Methods */}
          <div className="grid grid-cols-4 gap-2 mb-5">
            {paymentMethods.map(method => (
              <button
                key={method.id}
                onClick={() => setPaymentMethod(method.id)}
                className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1.5 ${
                  paymentMethod === method.id
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${method.color} flex items-center justify-center text-white`}>
                  <i className={`fas ${method.icon}`}></i>
                </div>
                <span className="text-xs font-medium">{method.label}</span>
              </button>
            ))}
          </div>

          {/* Payment Input */}
          {paymentMethod === 'cash' ? (
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Jumlah Uang</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">Rp</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={cashAmount ? parseInt(cashAmount).toLocaleString('id-ID') : ''}
                    onChange={e => handleCashInput(e.target.value)}
                    placeholder="0"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl text-xl font-bold focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                  />
                </div>
              </div>
              
              {/* Quick Amounts */}
              <div className="grid grid-cols-3 gap-2">
                {quickAmounts.map(amount => (
                  <button
                    key={amount}
                    onClick={() => handleCashInput(amount.toString())}
                    className="py-2 px-3 bg-gray-100 hover:bg-blue-100 hover:text-blue-700 rounded-lg text-sm font-medium transition-colors"
                  >
                    {formatRupiah(amount)}
                  </button>
                ))}
              </div>

              {/* Change */}
              {cash > 0 && (
                <div className={`p-3 rounded-xl text-center ${
                  change >= 0 ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                }`}>
                  <p className="text-sm text-gray-600">Kembalian</p>
                  <p className={`text-2xl font-bold ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {change >= 0 ? formatRupiah(change) : `- ${formatRupiah(Math.abs(change))}`}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  {paymentMethod === 'debit' ? 'Nomor Kartu' : paymentMethod === 'qris' ? 'Scan QR Code' : 'Nomor E-Wallet'}
                </label>
                {paymentMethod === 'qris' ? (
                  <div className="flex flex-col items-center py-6 bg-gray-50 rounded-xl">
                    <div className="w-40 h-40 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center mb-3">
                      <div className="grid grid-cols-5 gap-1 p-3">
                        {Array.from({ length: 25 }).map((_, i) => (
                          <div key={i} className={`w-4 h-4 ${Math.random() > 0.5 ? 'bg-gray-900' : 'bg-white'} rounded-sm`}></div>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">Tunjukkan QR ke pelanggan</p>
                    <p className="text-xs text-gray-400 mt-1">atau scan dari aplikasi</p>
                  </div>
                ) : (
                  <input
                    ref={inputRef}
                    type="text"
                    value={emoneyNumber}
                    onChange={e => setEmoneyNumber(e.target.value)}
                    placeholder={paymentMethod === 'debit' ? 'Masukkan nomor kartu' : 'Masukkan nomor e-wallet'}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-lg font-medium focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                  />
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-4 bg-gray-50 flex gap-3">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={handlePayment}
            disabled={!isValid}
            className="flex-1 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold text-lg hover:from-green-600 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-200"
          >
            <i className="fas fa-check-circle mr-2"></i>
            Proses Pembayaran
          </button>
        </div>
      </div>
    </div>
  );
}
