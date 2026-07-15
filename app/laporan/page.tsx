"use client";

import Header from "@/components/layout/Header";
import AppLayout from "@/components/layout/AppLayout";
import PageWrapper from "@/components/layout/PageWrapper";
import { useSalesStore } from "@/store/useGorpisStore";
import { formatRupiah } from "@/lib/formatRupiah";

import { useEffect, useMemo, useState } from "react";
export default function LaporanPage() {
  const loadData = useSalesStore(
    (state) => state.loadData
  );
  const history = useSalesStore(
    (state) => state.history
  );
  const [search, setSearch] = useState("");
  const filteredHistory = useMemo(() => {
  return history.filter((item) =>
    item.tanggal.includes(search)
  );
}, [history, search]);
  const hapusHistory = useSalesStore(
  (state) => state.hapusHistory
  );

  useEffect(() => {
    loadData();
  }, []);

  console.log("SEMUA HISTORY", history);

  return (
    <main className="min-h-screen bg-orange-50">

      <Header />

      <AppLayout>

        <PageWrapper
          title="📈 Laporan"
          subtitle="Riwayat Hari Operasional"
        >
          <div className="mb-6">

  <input
    type="text"
    placeholder="🔍 Cari tanggal... (contoh: 2026-07)"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-orange-500"
  />

</div>


<div className="mb-6 flex justify-end">

  <button
    onClick={() => {
      if (
        confirm("Hapus seluruh history laporan?")
      ) {
        hapusHistory();
      }
    }}
    className="rounded-xl bg-red-600 px-5 py-3 font-bold text-white hover:bg-red-700"
  >
    🗑 Hapus Semua History
  </button>

</div>
          {history.length === 0 ? (

            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">

              <h2 className="text-2xl font-bold text-zinc-800">
                Belum Ada History
              </h2>

              <p className="mt-2 text-gray-500">
                Tutup Hari Operasional terlebih dahulu agar history tersimpan.
              </p>

            </div>

          ) : (

            <div className="space-y-5">

              {[...filteredHistory]
                .reverse()
                .map((item) => {

                  console.log(item);
                  console.log("OMZET:", item.omzet, "MULAI:", item.mulai);

                  const pengeluaran =
                    item.expenses.reduce(
                      (a, b) => a + b.nominal,
                      0
                    );

                  const profit =
                   item.omzet - pengeluaran;

                  return (

                  <div
                    key={item.id}
                    className="rounded-2xl bg-white p-6 shadow-md border border-gray-200"
                  >

                    <div className="flex items-center justify-between">

                      <div>

                        <h2 className="text-2xl font-extrabold">

                          📅 {item.tanggal}

                        </h2>

                        <p className="mt-1 text-gray-500">

                          {item.mulai} - {item.selesai}

                        </p>

                      </div>

                      <div className="rounded-full bg-orange-100 px-4 py-2">

                        <span className="font-bold text-orange-700">

                          {item.transaksi} Transaksi

                        </span>

                      </div>

                    </div>

                    <div className="mt-6 grid gap-4 md:grid-cols-3">

                      <Card
                        title="Omzet"
                        value={formatRupiah(item.omzet)}
                        color="text-orange-600"
                      />

                      <Card
                        title="Pengeluaran"
                        value={formatRupiah(pengeluaran)}
                        color="text-red-600"
                      />

                      <Card
                        title="Profit"
                        value={formatRupiah(profit)}
                        color="text-green-600"
                      />

                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-2">

                      <Card
                        title="Cash"
                        value={formatRupiah(item.cash)}
                        color="text-blue-600"
                      />

                      <Card
                        title="QRIS"
                        value={formatRupiah(item.qris)}
                        color="text-purple-600"
                      />

                    </div>

                  </div>

                );

              })}

            </div>

          )}

        </PageWrapper>

      </AppLayout>

    </main>
  );
}

type CardProps = {
  title: string;
  value: string;
  color: string;
};

function Card({
  title,
  value,
  color,
}: CardProps) {

  return (

    <div className="rounded-xl bg-gray-50 p-4">

      <p className="text-sm text-gray-500">

        {title}

      </p>

      <h3 className={`mt-2 text-xl font-extrabold ${color}`}>

        {value}

      </h3>

    </div>

  );

}