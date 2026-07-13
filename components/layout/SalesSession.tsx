"use client";

import { useMemo, useState } from "react";

import { useSalesStore } from "@/store/useSalesStore";
import SalesSummaryModal from "./SalesSummaryModal";

export default function SalesSession() {
  const sales = useSalesStore((state) => state.sales);

  const [isOpen, setIsOpen] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [startTime, setStartTime] = useState("");

  const omzet = useMemo(() => {
    return sales.reduce((t, s) => t + s.harga, 0);
  }, [sales]);

  const cash = useMemo(() => {
    return sales
      .filter((s) => s.pembayaran === "Cash")
      .reduce((t, s) => t + s.harga, 0);
  }, [sales]);

  const qris = useMemo(() => {
    return sales
      .filter((s) => s.pembayaran === "QRIS")
      .reduce((t, s) => t + s.harga, 0);
  }, [sales]);

  function mulaiJualan() {
    setStartTime(
      new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );

    setIsOpen(true);
  }

  function tutupJualan() {
    setIsOpen(false);
    setShowSummary(true);
  }

  return (
    <>
      {!isOpen ? (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-6 mb-6">

          <h2 className="text-2xl font-extrabold text-zinc-900">
            🟢 Sesi Jualan
          </h2>

          <p className="text-gray-500 mt-2">
            Belum ada sesi aktif.
          </p>

          <button
            onClick={mulaiJualan}
            className="mt-5 w-full rounded-xl bg-green-600 hover:bg-green-700 py-4 text-lg font-bold text-white"
          >
            Mulai Jualan
          </button>

        </div>
      ) : (
        <div className="bg-green-50 border-2 border-green-500 rounded-2xl shadow-md p-6 mb-6">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-extrabold text-green-700">
                🟢 Sedang Jualan
              </h2>

              <p className="mt-1 text-green-700">
                Mulai {startTime}
              </p>

            </div>

            <button
              onClick={tutupJualan}
              className="rounded-xl bg-red-600 hover:bg-red-700 px-6 py-3 font-bold text-white"
            >
              Tutup Jualan
            </button>

          </div>

        </div>
      )}

      <SalesSummaryModal
        open={showSummary}
        onClose={() => setShowSummary(false)}
        omzet={omzet}
        cash={cash}
        qris={qris}
        transaksi={sales.length}
      />
    </>
  );
}