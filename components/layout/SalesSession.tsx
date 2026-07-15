"use client";

import { useMemo, useState } from "react";

import { useSalesStore } from "@/store/useGorpisStore";
import SalesSummaryModal from "./SalesSummaryModal";

export default function SalesSession() {

  const sales = useSalesStore(
    (state) => state.sales
  );

  const sessionOpen = useSalesStore(
    (state) => state.sessionOpen
  );

  const sessionStart = useSalesStore(
    (state) => state.sessionStart
  );

  const mulaiJualan = useSalesStore(
    (state) => state.mulaiJualan
  );

  const tutupJualan = useSalesStore(
    (state) => state.tutupJualan
  );

  const [showSummary, setShowSummary] =
    useState(false);
    const [summary, setSummary] = useState({
      omzet: 0,
      cash: 0,
      qris: 0,
      transaksi: 0,
    });

  const omzet = useMemo(() => {
    return sales.reduce(
      (t, s) => t + s.harga,
      0
    );
  }, [sales]);

  const cash = useMemo(() => {
    return sales
      .filter(
        (s) => s.pembayaran === "Cash"
      )
      .reduce(
        (t, s) => t + s.harga,
        0
      );
  }, [sales]);

  const qris = useMemo(() => {
    return sales
      .filter(
        (s) => s.pembayaran === "QRIS"
      )
      .reduce(
        (t, s) => t + s.harga,
        0
      );
  }, [sales]);

  function handleTutup() {
    
    console.log({
      omzet,
      cash,
      qris,
      transaksi: sales.length,
    });
    setSummary({
      omzet,
      cash,
      qris,
      transaksi: sales.length,
    });

    tutupJualan();

    setShowSummary(true);

}
  

  return (
    <>
      {!sessionOpen ? (

        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-md">

          <h2 className="text-2xl font-extrabold text-zinc-900">
            🟢 Sesi Jualan
          </h2>

          <p className="mt-2 text-gray-500">
            Belum ada sesi aktif.
          </p>

          <button
            onClick={mulaiJualan}
            className="mt-5 w-full rounded-xl bg-green-600 py-4 text-lg font-bold text-white hover:bg-green-700"
          >
            Mulai Jualan
          </button>

        </div>

      ) : (

        <div className="mb-6 rounded-2xl border-2 border-green-500 bg-green-50 p-6 shadow-md">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-extrabold text-green-700">
                🟢 Sedang Jualan
              </h2>

              <p className="mt-1 text-green-700">
                Mulai {sessionStart}
              </p>

            </div>

            <button
              onClick={handleTutup}
              className="rounded-xl bg-red-600 px-6 py-3 font-bold text-white hover:bg-red-700"
            >
              Tutup Jualan
            </button>

          </div>

        </div>

      )}      <SalesSummaryModal
        open={showSummary}
        onClose={() => setShowSummary(false)}
        omzet={summary.omzet}
        cash={summary.cash}
        qris={summary.qris}
        transaksi={summary.transaksi}
      />
    </>
  );
}