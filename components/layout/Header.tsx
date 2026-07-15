"use client";

import { useSalesStore } from "@/store/useGorpisStore";

export default function Header() {
  const sessionOpen = useSalesStore(
    (state) => state.sessionOpen
  );

  const sessionStart = useSalesStore(
    (state) => state.sessionStart
  );

  const tanggalOperasional = useSalesStore(
    (state) => state.tanggalOperasional
  );

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

        <div>

          <h1 className="text-3xl font-extrabold text-zinc-900">
            🍌 GORPIS OS
          </h1>

          <p className="mt-1 text-zinc-500">
            Business Operating System
          </p>

          <p className="mt-2 text-sm text-zinc-400">
            Hari Operasional : {tanggalOperasional}
          </p>

        </div>

        <div className="flex items-center gap-4">

          {sessionOpen ? (

            <div className="rounded-xl border border-green-300 bg-green-50 px-5 py-3">

              <p className="text-xs font-semibold uppercase text-green-600">
                Status
              </p>

              <h3 className="font-bold text-green-700">
                🟢 Sedang Jualan
              </h3>

              <p className="text-sm text-green-600">
                Mulai {sessionStart}
              </p>

            </div>

          ) : (

            <div className="rounded-xl border border-red-300 bg-red-50 px-5 py-3">

              <p className="text-xs font-semibold uppercase text-red-600">
                Status
              </p>

              <h3 className="font-bold text-red-700">
                🔴 Belum Jualan
              </h3>

            </div>

          )}

          <div className="rounded-full border border-orange-300 bg-orange-50 px-4 py-2">

            <span className="font-bold text-zinc-900">
              GORPIS OS v0.6
            </span>

          </div>

        </div>

      </div>

    </header>
  );
}