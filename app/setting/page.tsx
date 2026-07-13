"use client";

import ComingSoon from "@/components/ui/ComingSoon";

export default function SettingPage() {
  return (
    <main className="min-h-screen bg-orange-50 p-6">

      <div className="max-w-6xl mx-auto">

        <ComingSoon
          title="⚙️ Pengaturan"
          description="Konfigurasi toko, target omzet, backup data, PIN kasir, printer dan pengaturan aplikasi."
        />

      </div>

    </main>

  );
}