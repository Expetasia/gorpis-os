"use client";

import ComingSoon from "@/components/ui/ComingSoon";

export default function LaporanPage() {
  return (
    <main className="min-h-screen bg-orange-50 p-6">

      <div className="max-w-6xl mx-auto">

        <ComingSoon
          title="📈 Laporan"
          description="Laporan harian, mingguan, bulanan, export PDF, grafik dan analisis akan hadir pada versi berikutnya."
        />

      </div>

    </main>
  );
}