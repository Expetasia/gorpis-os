"use client";

import POS from "@/components/kasir/POS";
import TransactionHistory from "@/components/TransactionHistory";

export default function KasirPage() {
  return (
    <main className="min-h-screen bg-orange-50 p-6">

      <div className="max-w-7xl mx-auto">

        <div className="mb-6">

          <h1 className="text-4xl font-extrabold text-zinc-900">
            🍌 Kasir
          </h1>

          <p className="text-zinc-600 mt-1">
            Catat penjualan dengan cepat
          </p>

        </div>

        <div className="grid xl:grid-cols-2 gap-6">

          <POS />

          <TransactionHistory />

        </div>

      </div>

    </main>
  );
}