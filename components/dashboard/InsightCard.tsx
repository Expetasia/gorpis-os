"use client";

import { formatRupiah } from "@/lib/formatRupiah";

type Props = {
  menuTerlaris: [string, number][];
  profit: number;
  pembayaranDominan: string;
  persentaseDominan: number;
  activeSales: {
    id: number;
  }[];
  rataRataTransaksi: number;
};

export default function InsightCard({
  menuTerlaris,
  profit,
  pembayaranDominan,
  persentaseDominan,
  activeSales,
  rataRataTransaksi,
}: Props) {
  return (
    <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <h2 className="text-xl font-bold">
        💡 Insight Hari Ini
      </h2>

      <div className="mt-5 space-y-4">

        <div className="flex items-center justify-between">
          <span>🏆 Menu Terlaris</span>

          <span className="font-bold">
            {menuTerlaris.length > 0 ? menuTerlaris[0][0] : "-"}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span>💰 Profit</span>

          <span className="font-bold text-green-600">
            {formatRupiah(profit)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span>💳 Pembayaran Dominan</span>

          <span className="font-bold">
            {pembayaranDominan} ({persentaseDominan}%)
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span>🧾 Total Transaksi</span>

          <span className="font-bold">
            {activeSales.length}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span>💵 Rata-rata / Transaksi</span>

          <span className="font-bold text-orange-600">
            {formatRupiah(rataRataTransaksi)}
          </span>
        </div>

      </div>

    </div>
  );
}