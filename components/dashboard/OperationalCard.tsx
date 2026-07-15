"use client";

import { useSalesStore } from "@/store/useGorpisStore";

export default function OperationalCard() {
  const sessionOpen = useSalesStore((state) => state.sessionOpen);
  const sessionStart = useSalesStore((state) => state.sessionStart);
  const tanggalOperasional = useSalesStore(
    (state) => state.tanggalOperasional
  );
  const lastClosedSession = useSalesStore(
    (state) => state.lastClosedSession
  );

  return (
    <div className="mb-6 rounded-2xl border border-orange-200 bg-white p-6 shadow-sm">

      <h2 className="text-xl font-bold">
        📅 Hari Operasional
      </h2>

      <p className="mt-2 text-gray-600">
        {tanggalOperasional}
      </p>

      <div className="mt-5 grid grid-cols-3 gap-4">

        <div>
          <p className="text-sm text-gray-500">
            Status
          </p>

          <p className="font-bold">
            {sessionOpen ? "🟢 Sedang Jualan" : "🔴 Tutup"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Mulai
          </p>

          <p className="font-bold">
            {sessionStart || "-"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Selesai
          </p>

          <p className="font-bold">
            {lastClosedSession?.selesai || "-"}
          </p>
        </div>

      </div>

    </div>
  );
}