import React, { useRef } from 'react';
import { Transaction } from '../types';

interface Props {
  transaction: Transaction;
  onClose: () => void;
}

export default function ReceiptModal({ transaction, onClose }: Props) {
  const receiptRef = useRef<HTMLDivElement>(null);

  const formatRupiah = (n: number) => 'Rp ' + n.toLocaleString('id-ID');
  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' }) +
      ' ' + d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  };

  const subtotal = transaction.items.reduce((sum, item) => sum + item.subtotal, 0);
  const ppn = Math.round(subtotal * 0.11);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 text-center">
          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
            <i className="fas fa-check text-2xl"></i>
          </div>
          <h2 className="text-lg font-bold">Transaksi Berhasil!</h2>
          <p className="text-green-100 text-sm">Pembayaran telah diterima</p>
        </div>

        {/* Receipt */}
        <div ref={receiptRef} className="p-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 font-mono text-sm">
            {/* Store Info */}
            <div className="text-center mb-3 pb-3 border-b border-dashed border-gray-300">
              <p className="font-bold text-base">MINIMARKET SEJAHTERA</p>
              <p className="text-xs text-gray-500">Jl. Merdeka No. 123, Jakarta</p>
              <p className="text-xs text-gray-500">Telp: (021) 1234-5678</p>
            </div>

            {/* Transaction Info */}
            <div className="mb-3 pb-3 border-b border-dashed border-gray-300 space-y-0.5">
              <div className="flex justify-between text-xs">
                <span>No:</span>
                <span>{transaction.id}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Tgl:</span>
                <span>{formatDate(transaction.date)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Kasir:</span>
                <span>{transaction.cashierName}</span>
              </div>
            </div>

            {/* Items */}
            <div className="mb-3 pb-3 border-b border-dashed border-gray-300 space-y-1.5">
              {transaction.items.map(item => (
                <div key={item.product.id}>
                  <p className="text-xs font-medium truncate">{item.product.name}</p>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>{item.quantity} x {formatRupiah(item.product.price)}</span>
                    <span>{formatRupiah(item.subtotal)}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-1 mb-3 pb-3 border-b border-dashed border-gray-300">
              <div className="flex justify-between text-xs">
                <span>Subtotal:</span>
                <span>{formatRupiah(subtotal)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>PPN (11%):</span>
                <span>{formatRupiah(ppn)}</span>
              </div>
              <div className="flex justify-between font-bold text-sm pt-1 border-t border-dashed">
                <span>TOTAL:</span>
                <span>{formatRupiah(transaction.total)}</span>
              </div>
            </div>

            {/* Payment */}
            <div className="space-y-1 mb-3">
              <div className="flex justify-between text-xs">
                <span>Bayar ({transaction.paymentMethod === 'cash' ? 'Tunai' : transaction.paymentMethod.toUpperCase()}):</span>
                <span>{formatRupiah(transaction.payment)}</span>
              </div>
              {transaction.change > 0 && (
                <div className="flex justify-between text-xs font-medium">
                  <span>Kembali:</span>
                  <span>{formatRupiah(transaction.change)}</span>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="text-center pt-2 border-t border-dashed border-gray-300">
              <p className="text-xs text-gray-500">Terima kasih atas kunjungan Anda</p>
              <p className="text-xs text-gray-500">Barang yang sudah dibeli</p>
              <p className="text-xs text-gray-500">tidak dapat dikembalikan</p>
              <div className="mt-2 flex justify-center">
                <div className="flex gap-0.5">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="w-1 bg-gray-800" style={{ height: `${20 + Math.random() * 20}px` }}></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="border-t p-4 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
          >
            <i className="fas fa-plus mr-1"></i> Transaksi Baru
          </button>
          <button
            onClick={() => window.print()}
            className="px-4 py-2.5 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-colors"
          >
            <i className="fas fa-print"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
