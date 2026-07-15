"use client";

import { useMemo, useState } from "react";
import { useSalesStore } from "@/store/useGorpisStore";
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

  const totalPengeluaran = useMemo(() => {
    return expenses.reduce((a, b) => a + b.nominal, 0);
  }, [expenses]);

  function simpan() {
    if (!nama.trim()) {
      alert("Nama pengeluaran wajib diisi.");
      return;
    }

    const nilai = Number(nominal);

    if (isNaN(nilai) || nilai <= 0) {
      alert("Nominal tidak valid.");
      return;
    }

    tambahPengeluaran(nama.trim(), nilai);

    setNama("");
    setNominal("");
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-extrabold text-zinc-900">
            💸 Pengeluaran
          </h2>

          <p className="mt-1 text-zinc-500">
            Kelola biaya operasional harian
          </p>

        </div>

        <div className="text-right">

          <p className="text-sm text-zinc-500">
            Total Hari Ini
          </p>

          <h2 className="text-2xl font-extrabold text-red-600">
            {formatRupiah(totalPengeluaran)}
          </h2>

        </div>

      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">

        <input
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Nama pengeluaran"
          className="rounded-xl border border-gray-300 p-3 outline-none focus:border-red-500"
        />

        <input
          type="number"
          value={nominal}
          onChange={(e) => setNominal(e.target.value)}
          placeholder="Nominal"
          className="rounded-xl border border-gray-300 p-3 outline-none focus:border-red-500"
        />

      </div>

      <button
        onClick={simpan}
        className="mt-5 w-full rounded-xl bg-red-500 py-3 text-lg font-bold text-white transition hover:bg-red-600"
      >
        + Tambah Pengeluaran
      </button>

      <div className="mt-8 space-y-3">

        {expenses.length === 0 && (

          <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-zinc-500">
            Belum ada pengeluaran hari ini.
          </div>

        )}

        {expenses.map((item) => (

          <div
            key={item.id}
            className="flex items-center justify-between rounded-xl border border-gray-200 p-4"
          >

            <div>

              <h3 className="font-bold text-zinc-900">
                {item.nama}
              </h3>

              <p className="mt-1 text-sm text-zinc-500">
                {item.waktu}
              </p>

            </div>

            <div className="text-right">

              <h3 className="font-bold text-red-600">
                {formatRupiah(item.nominal)}
              </h3>

              <button
                onClick={() => {
                  if (
                    confirm(
                      "Hapus pengeluaran ini?"
                    )
                  ) {
                    hapusPengeluaran(item.id);
                  }
                }}
                className="mt-2 rounded-lg bg-red-100 px-3 py-1 text-sm font-bold text-red-700 transition hover:bg-red-200"
              >
                🗑 Hapus
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}