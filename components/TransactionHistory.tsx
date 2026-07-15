"use client";

import { useMemo, useState } from "react";
import { useSalesStore } from "@/store/useGorpisStore";
import { formatRupiah } from "@/lib/formatRupiah";

export default function TransactionHistory() {
  const sales = useSalesStore((state) => state.sales);
  const hapusPenjualan = useSalesStore((state) => state.hapusPenjualan);

  const [selectedId, setSelectedId] = useState<number | null>(null);

  const totalOmzet = useMemo(() => {
    return sales.reduce((a, b) => a + b.harga, 0);
  }, [sales]);

  const totalCash = useMemo(() => {
    return sales
      .filter((x) => x.pembayaran === "Cash")
      .reduce((a, b) => a + b.harga, 0);
  }, [sales]);

  const totalQRIS = useMemo(() => {
    return sales
      .filter((x) => x.pembayaran === "QRIS")
      .reduce((a, b) => a + b.harga, 0);
  }, [sales]);

  function handleDelete(id: number) {
    if (!confirm("Yakin ingin menghapus transaksi ini?")) return;

    hapusPenjualan(id);

    if (selectedId === id) {
      setSelectedId(null);
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-extrabold text-zinc-900">
            Riwayat Transaksi
          </h2>

          <p className="mt-1 text-zinc-500">
            {sales.length} transaksi
          </p>

        </div>

        <div className="text-right">

          <p className="text-sm text-zinc-500">
            Omzet
          </p>

          <h2 className="text-2xl font-extrabold text-orange-600">
            {formatRupiah(totalOmzet)}
          </h2>

        </div>

      </div>

      <div className="mb-6 grid grid-cols-2 gap-3">

        <div className="rounded-xl bg-green-50 p-4">

          <p className="text-sm text-green-700">
            Cash
          </p>

          <h3 className="mt-1 text-xl font-bold">
            {formatRupiah(totalCash)}
          </h3>

        </div>

        <div className="rounded-xl bg-blue-50 p-4">

          <p className="text-sm text-blue-700">
            QRIS
          </p>

          <h3 className="mt-1 text-xl font-bold">
            {formatRupiah(totalQRIS)}
          </h3>

        </div>

      </div>

      <div className="space-y-3 max-h-[620px] overflow-y-auto pr-2">

        {sales.length === 0 && (

          <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center">

            <p className="text-zinc-500">
              Belum ada transaksi hari ini.
            </p>

          </div>

        )}

        {sales.map((sale) => (

          <div
            key={sale.id}
            onClick={() =>
              setSelectedId(
                selectedId === sale.id ? null : sale.id
              )
            }
            className={`w-full rounded-2xl border p-4 text-left transition

            ${
              selectedId === sale.id
                ? "border-orange-500 bg-orange-50"
                : "border-gray-200 hover:bg-gray-50"
            }`}
          >

            <div className="flex items-start justify-between">

              <div>

                <h3 className="text-xl font-bold">
  {sale.menu}

  {sale.qty > 1 && (
    <span className="ml-2 rounded-full bg-orange-100 px-2 py-1 text-sm font-bold text-orange-700">
      x{sale.qty}
    </span>
  )}
</h3>

                <div className="mt-2 flex flex-wrap gap-2">

                  <span
  className={`rounded-full px-3 py-1 text-sm font-bold
  ${
    sale.upsize
      ? "bg-orange-100 text-orange-700"
      : "bg-gray-100 text-gray-700"
  }`}
>
  {sale.upsize ? "Upsize" : "Normal"}
</span>

<span className="rounded-full bg-orange-50 px-3 py-1 text-sm font-bold text-orange-700">
  Qty: {sale.qty}
</span>
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-bold

                    ${
                      sale.pembayaran === "Cash"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {sale.pembayaran}
                  </span>

                  <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm">
                    {sale.waktu}
                  </span>

                </div>

              </div>

              <h2 className="text-2xl font-extrabold text-zinc-900">
                {formatRupiah(sale.harga)}
              </h2>

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

          </div>

        ))}

      </div>

    </div>
  );
}