"use client";

import Header from "@/components/layout/Header";
import AppLayout from "@/components/layout/AppLayout";
import PageWrapper from "@/components/layout/PageWrapper";

import { useSalesStore } from "@/store/useGorpisStore";

export default function InventoryPage() {
  const shoppingChecklist = useSalesStore(
    (state) => state.shoppingChecklist
  );

  const toggleChecklist = useSalesStore(
    (state) => state.toggleChecklist
  );

  const resetChecklist = useSalesStore(
    (state) => state.resetChecklist
  );

    const bahanUtama = [
      "Pisang",
      "Tepung LM",
      "Tepung Beras",
      "Minyak",
      "Gas",
      "Box",
      "Plastik",
      "Sarung Tangan",
    ];

    const topping = [
      "Keju",
      "Coklat",
      "Coklat Parut",
      "Matcha",
      "Tiramisu",
      "Oreo",
      "Red Velvet",
      "Choco Crunchy",
      "Milk Crunchy",
    ];

    const lainnya = [
      "Susu",
      "Brown Sugar",
      "Wijen Putih",
      "Wijen Hitam",
      "Garam",
      "Soda Kue",
    ];

  return (
    <main className="min-h-screen bg-orange-50">

      <Header />

      <AppLayout>

        <PageWrapper
          title="🛒 Checklist Belanja"
          subtitle="Centang bahan yang harus dibeli besok."
        >
          <div className="mb-6 flex items-center justify-between">

  <div>

    <h3 className="text-lg font-bold text-zinc-800">
      {shoppingChecklist.length} Barang Harus Dibeli
    </h3>

    <p className="text-sm text-gray-500">
      Checklist tersimpan otomatis.
    </p>

  </div>

  <button
    onClick={() => {
      if (confirm("Reset seluruh checklist?")) {
        resetChecklist();
      }
    }}
    className="rounded-xl border border-red-200 bg-red-50 px-5 py-3 font-bold text-red-600 transition hover:bg-red-100"
  >
    🗑 Reset
  </button>

</div>

          <div className="grid gap-6 lg:grid-cols-3">

            
{[
  { title: "📦 Bahan Utama", data: bahanUtama },
  { title: "🍫 Topping", data: topping },
  { title: "🧂 Lainnya", data: lainnya },
].map((section) => (

  <div
  key={section.title}
  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-md"
>

    <h3 className="mb-4 text-xl font-bold text-zinc-800">
      {section.title}
    </h3>

    <div className="space-y-3">

      {section.data.map((item) => (

        <label
          key={item}
          className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
            shoppingChecklist.includes(item)
              ? "border-green-300 bg-green-50"
              : "border-gray-200 bg-white hover:bg-orange-50"
          }`}
        >

          <input
            type="checkbox"
            checked={shoppingChecklist.includes(item)}
            onChange={() => toggleChecklist(item)}
            className="h-5 w-5"
          />

          <span className="font-medium">
            {item}
          </span>

        </label>

      ))}

    </div>

  </div>

))}
            

          </div>

        </PageWrapper>

      </AppLayout>

    </main>
  );
}