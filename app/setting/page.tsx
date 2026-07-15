"use client";

import { useState } from "react";
import { useSalesStore } from "@/store/useGorpisStore";

export default function SettingPage() {
  const targetOmzet = useSalesStore(
    (state) => state.targetOmzet
  );

  const setTargetOmzet = useSalesStore(
    (state) => state.setTargetOmzet
  );

  const [target, setTarget] = useState(targetOmzet);

  return (
    <main className="min-h-screen bg-orange-50 p-6">
      <div className="mx-auto max-w-6xl">

        <h1 className="text-4xl font-extrabold">
          ⚙️ Setting
        </h1>

        <p className="mt-2 text-gray-600">
          Pengaturan GORPIS OS.
        </p>

        <div className="mt-8 grid gap-6">

          {/* Informasi Usaha */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold">
              🏪 Informasi Usaha
            </h2>

            <div className="mt-5 space-y-4">

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Nama Usaha
                </label>

                <input
                  type="text"
                  defaultValue="GORPIS"
                  className="w-full rounded-xl border border-gray-300 p-3"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Lokasi
                </label>

                <input
                  type="text"
                  defaultValue="Klungkung"
                  className="w-full rounded-xl border border-gray-300 p-3"
                />
              </div>

            </div>

          </div>

          {/* Target Harian */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold">
              🎯 Target Harian
            </h2>

            <div className="mt-5">

              <label className="mb-2 block text-sm font-semibold">
                Target Omzet / Hari
              </label>

              <input
                type="number"
                value={target}
                onChange={(e) =>
                  setTarget(Number(e.target.value))
                }
                className="w-full rounded-xl border border-gray-300 p-3"
              />

              <button
                onClick={() => {
                  setTargetOmzet(target);
                  alert("Target omzet berhasil disimpan.");
                }}
                className="mt-4 rounded-xl bg-orange-500 px-5 py-3 font-bold text-white hover:bg-orange-600"
              >
                💾 Simpan Target
              </button>

              <p className="mt-3 text-sm text-gray-500">
                Target ini akan digunakan di Dashboard.
              </p>

            </div>

          </div>

          {/* Data */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold">
              💾 Data
            </h2>

            <div className="mt-5 flex flex-wrap gap-4">

              <button className="rounded-xl bg-blue-600 px-5 py-3 font-bold text-white">
                📤 Export Data
              </button>

              <button className="rounded-xl bg-green-600 px-5 py-3 font-bold text-white">
                📥 Import Data
              </button>

              <button className="rounded-xl bg-red-600 px-5 py-3 font-bold text-white">
                🗑 Reset Semua Data
              </button>

            </div>

          </div>

        </div>

      </div>
    </main>
  );
}