"use client";

import { useSalesStore } from "@/store/useSalesStore";
import { formatRupiah } from "@/lib/formatRupiah";
import StatCard from "@/components/dashboard/StatCard";

export default function DashboardCard() {
  const omzet = useSalesStore((state) => state.omzet);
  const sales = useSalesStore((state) => state.sales);
  const expenses = useSalesStore((state) => state.expenses);

  const cash = sales
    .filter((item) => item.pembayaran === "Cash")
    .reduce((total, item) => total + item.harga, 0);

  const qris = sales
    .filter((item) => item.pembayaran === "QRIS")
    .reduce((total, item) => total + item.harga, 0);

  const totalPengeluaran = expenses.reduce(
    (total, item) => total + item.nominal,
    0
  );

  const profit = omzet - totalPengeluaran;

  return (
    <>
      <div className="grid gap-6 md:grid-cols-3">

        <StatCard
          title="💰 Omzet Hari Ini"
          value={formatRupiah(omzet)}
          color="text-orange-600"
        />

        <StatCard
          title="💸 Pengeluaran"
          value={formatRupiah(totalPengeluaran)}
          color="text-red-600"
        />

        <StatCard
          title="💵 Profit"
          value={formatRupiah(profit)}
          color="text-green-600"
        />

      </div>

      <div className="grid gap-6 md:grid-cols-3 mt-6">

        <StatCard
          title="💵 Cash"
          value={formatRupiah(cash)}
          color="text-blue-600"
        />

        <StatCard
          title="📱 QRIS"
          value={formatRupiah(qris)}
          color="text-purple-600"
        />

        <StatCard
          title="🧾 Transaksi"
          value={`${sales.length}`}
          color="text-zinc-900"
        />

      </div>
    </>
  );
}