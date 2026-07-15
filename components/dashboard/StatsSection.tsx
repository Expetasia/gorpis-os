"use client";

import { useSalesStore } from "@/store/useGorpisStore";
import { formatRupiah } from "@/lib/formatRupiah";
import StatCard from "./StatCard";

export default function StatsSection() {
  const omzet = useSalesStore((state) => state.omzet);
  const sales = useSalesStore((state) => state.sales);
  const expenses = useSalesStore((state) => state.expenses);
  const sessionOpen = useSalesStore((state) => state.sessionOpen);
  const lastClosedSession = useSalesStore(
    (state) => state.lastClosedSession
  );

  const activeSales =
    sessionOpen || !lastClosedSession
      ? sales
      : lastClosedSession.sales;

  const activeExpenses =
    sessionOpen || !lastClosedSession
      ? expenses
      : lastClosedSession.expenses;

  const activeOmzet =
    sessionOpen || !lastClosedSession
      ? omzet
      : lastClosedSession.omzet;

  const cash = activeSales
    .filter((item) => item.pembayaran === "Cash")
    .reduce((total, item) => total + item.harga, 0);

  const qris = activeSales
    .filter((item) => item.pembayaran === "QRIS")
    .reduce((total, item) => total + item.harga, 0);

  const totalPengeluaran = activeExpenses.reduce(
    (total, item) => total + item.nominal,
    0
  );

  const profit = activeOmzet - totalPengeluaran;

  return (
    <>
      <div className="grid gap-6 md:grid-cols-3">
        <StatCard
          title="Omzet Hari Ini"
          value={formatRupiah(activeOmzet)}
          icon="💰"
          color="orange"
        />

        <StatCard
          title="Pengeluaran"
          value={formatRupiah(totalPengeluaran)}
          icon="💸"
          color="red"
        />

        <StatCard
          title="Profit"
          value={formatRupiah(profit)}
          icon="📈"
          color="green"
        />
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <StatCard
          title="Cash"
          value={formatRupiah(cash)}
          icon="💵"
          color="blue"
        />

        <StatCard
          title="QRIS"
          value={formatRupiah(qris)}
          icon="📱"
          color="purple"
        />

        <StatCard
          title="Total Transaksi"
          value={activeSales.length}
          icon="🧾"
          color="yellow"
          subtitle="Transaksi hari ini"
        />
      </div>
    </>
  );
}