"use client";

import { useState } from "react";
import { useSalesStore } from "@/store/useSalesStore";
import { formatRupiah } from "@/lib/formatRupiah";

export default function TransactionHistory() {
  const sales = useSalesStore((state) => state.sales);
  const hapusPenjualan = useSalesStore((state) => state.hapusPenjualan);

  const [selectedId, setSelectedId] = useState<number | null>(null);

  function handleDelete(id: number) {
    if (confirm("Yakin ingin menghapus transaksi ini?")) {
      hapusPenjualan(id);

      if (selectedId === id) {
        setSelectedId(null);
      }
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md">

      <div className="mb-6">

        <h2 className="text-3xl font-extrabold text-zinc-900">
          Riwayat Transaksi
        </h2>

        <p className="mt-1 text-zinc-600">
          {sales.length} transaksi hari ini
        </p>

      </div>

      <div className="space-y-3 max-h-[650px] overflow-y-auto pr-2">

        {sales.length === 0 && (

          <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center">

            <p className="text-zinc-500">
              Belum ada transaksi.
            </p>

          </div>

        )}

        {sales.map((sale) => (

          <button
            key={sale.id}
            onClick={() => setSelectedId(sale.id)}
            className={`w-full rounded-2xl border p-4 text-left transition

            ${
              selectedId === sale.id
                ? "border-orange-500 bg-orange-50"
                : "border-gray-200 bg-white hover:bg-gray-50"
            }`}
          >

            <div className="flex items-start justify-between">

              <div>

                <h3 className="text-xl font-bold text-zinc-900">
                  {sale.menu}
                </h3>

                <p className="mt-1 text-zinc-600">
                  {sale.upsize
                    ? "Upsize (11 pcs)"
                    : "Normal (7 pcs)"}
                </p>

                <div className="mt-2 flex gap-2">

                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                    {sale.pembayaran}
                  </span>

                  <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-zinc-600">
                    {sale.waktu}
                  </span>

                </div>

              </div>

              <div className="text-right">

                <h2 className="text-2xl font-extrabold text-zinc-900">
                  {formatRupiah(sale.harga)}
                </h2>

              </div>

            </div>

            {selectedId === sale.id && (

              <div className="mt-5 grid grid-cols-2 gap-3">

                <button
                  className="rounded-xl bg-blue-600 py-3 font-bold text-white hover:bg-blue-700"
                >
                  ✏ Edit
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(sale.id);
                  }}
                  className="rounded-xl bg-red-600 py-3 font-bold text-white hover:bg-red-700"
                >
                  🗑 Hapus
                </button>

              </div>

            )}

          </button>

        ))}

      </div>

    </div>
  );
}