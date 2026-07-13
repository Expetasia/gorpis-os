"use client";

import ComingSoon from "@/components/ui/ComingSoon";

export default function InventoryPage() {
  return (
    <main className="min-h-screen bg-orange-50 p-6">

      <div className="max-w-6xl mx-auto">

        <ComingSoon
          title="📦 Inventory"
          description="Stok pisang, topping, minyak, gas, box dan seluruh bahan baku akan dikelola di halaman ini."
        />

      </div>

    </main>
  );
}