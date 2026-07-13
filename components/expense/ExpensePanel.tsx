"use client";

import { useState } from "react";
import { useSalesStore } from "@/store/useSalesStore";
import { formatRupiah } from "@/lib/formatRupiah";

export default function ExpensePanel() {
  const expenses = useSalesStore((state) => state.expenses);
  const tambahPengeluaran = useSalesStore(
    (state) => state.tambahPengeluaran
  );
  const hapusPengeluaran = useSalesStore(
    (state) => state.hapusPengeluaran
  );

  const [nama, setNama] = useState("");
  const [nominal, setNominal] = useState("");

  function simpan() {
    if (!nama.trim()) return;

    const nilai = Number(nominal);

    if (isNaN(nilai) || nilai <= 0) return;

    tambahPengeluaran(nama, nilai);

    setNama("");
    setNominal("");
  }

  const totalPengeluaran = expenses.reduce(
    (total, item) => total + item.nominal,
    0
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-6">

      <h2 className="text-3xl font-extrabold text-zinc-900">
        💸 Pengeluaran
      </h2>

      <p className="text-gray-500 mt-1">
        Catat semua biaya operasional hari ini
      </p>

      <input
        value={nama}
        onChange={(e) => setNama(e.target.value)}
        placeholder="Contoh: Minyak"
        className="mt-6 w-full rounded-xl border border-gray-300 bg-white p-3 text-black placeholder:text-gray-400"
      />

      <input
        type="number"
        value={nominal}
        onChange={(e) => setNominal(e.target.value)}
        placeholder="Nominal"
        className="mt-3 w-full rounded-xl border border-gray-300 bg-white p-3 text-black placeholder:text-gray-400"
      />

      <button
        onClick={simpan}
        className="mt-4 w-full rounded-xl bg-red-500 hover:bg-red-600 py-3 font-bold text-white"
      >
        Tambah Pengeluaran
      </button>

      <div className="mt-8">

        <div className="flex items-center justify-between mb-4">

          <h3 className="font-bold text-xl text-zinc-900">
            Riwayat
          </h3>

          <span className="font-bold text-red-600">
            {formatRupiah(totalPengeluaran)}
          </span>

        </div>

        <div className="space-y-3">

          {expenses.map((item) => (

            <div
              key={item.id}
              className="rounded-xl border border-gray-200 p-4 flex items-center justify-between"
            >

              <div>

                <h4 className="font-bold text-zinc-900">
                  {item.nama}
                </h4>

                <p className="text-gray-500 text-sm">
                  {item.waktu}
                </p>

              </div>

              <div className="text-right">

                <p className="font-bold text-red-600">
                  {formatRupiah(item.nominal)}
                </p>

                <button
                  onClick={() => hapusPengeluaran(item.id)}
                  className="mt-2 rounded-lg bg-red-100 px-3 py-1 text-sm font-semibold text-red-700 hover:bg-red-200"
                >
                  Hapus
                </button>

              </div>

            </div>

          ))}

          {expenses.length === 0 && (
            <div className="rounded-xl border border-dashed border-gray-300 p-6 text-center text-gray-500">
              Belum ada pengeluaran.
            </div>
          )}

        </div>

      </div>

    </div>
  );
}