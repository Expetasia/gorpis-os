"use client";

import { useSalesStore } from "@/store/useGorpisStore";
import { formatRupiah } from "@/lib/formatRupiah";

export default function TargetCard() {
  const omzet = useSalesStore((state) => state.omzet);
  const targetOmzet = useSalesStore((state) => state.targetOmzet);
  const sessionOpen = useSalesStore((state) => state.sessionOpen);
  const lastClosedSession = useSalesStore(
    (state) => state.lastClosedSession
  );

  const activeOmzet =
    sessionOpen || !lastClosedSession
      ? omzet
      : lastClosedSession.omzet;

  const progressTarget =
    targetOmzet === 0
      ? 0
      : Math.round((activeOmzet / targetOmzet) * 100);

  return (
    <div className="mb-6 rounded-2xl border border-orange-200 bg-white p-6 shadow-sm">

      <div className="flex items-center justify-between">

        <h2 className="text-xl font-bold">
          🎯 Target Hari Ini
        </h2>

        <span className="font-bold text-orange-600">
          {progressTarget}%
        </span>

      </div>

      <p className="mt-4 text-lg font-semibold">
        {formatRupiah(activeOmzet)} / {formatRupiah(targetOmzet)}
      </p>

      <div className="mt-4 h-4 overflow-hidden rounded-full bg-gray-200">

        <div
          className="h-full rounded-full bg-orange-500 transition-all duration-500"
          style={{
            width: `${Math.min(progressTarget, 100)}%`,
          }}
        />

      </div>

      <p className="mt-3 text-sm text-gray-500">

        {progressTarget >= 100
          ? "🎉 Target omzet hari ini sudah tercapai!"
          : `Sisa ${formatRupiah(
              Math.max(targetOmzet - activeOmzet, 0)
            )} lagi untuk mencapai target.`}

      </p>

    </div>
  );
}