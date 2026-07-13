type SalesSummaryModalProps = {
  open: boolean;
  onClose: () => void;
  omzet: number;
  cash: number;
  qris: number;
  transaksi: number;
};

import { formatRupiah } from "@/lib/formatRupiah";

export default function SalesSummaryModal({
  open,
  onClose,
  omzet,
  cash,
  qris,
  transaksi,
}: SalesSummaryModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

        <h2 className="text-3xl font-extrabold text-zinc-900">
          📊 Ringkasan Hari Ini
        </h2>

        <div className="mt-6 space-y-4">

          <div className="flex justify-between">
            <span className="text-gray-500">Omzet</span>
            <span className="font-bold text-orange-600">
              {formatRupiah(omzet)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Cash</span>
            <span className="font-bold">
              {formatRupiah(cash)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">QRIS</span>
            <span className="font-bold">
              {formatRupiah(qris)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">
              Jumlah Transaksi
            </span>
            <span className="font-bold">
              {transaksi}
            </span>
          </div>

        </div>

        <button
          onClick={onClose}
          className="mt-8 w-full rounded-xl bg-orange-500 py-3 font-bold text-white hover:bg-orange-600"
        >
          Tutup
        </button>

      </div>

    </div>
  );
}