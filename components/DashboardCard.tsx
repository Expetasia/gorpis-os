"use client";

import PaymentCard from "@/components/dashboard/PaymentCard";
import InsightCard from "@/components/dashboard/InsightCard";
import BestSellerCard from "@/components/dashboard/BestSellerCard";
import StatsSection from "@/components/dashboard/StatsSection";
import TargetCard from "@/components/dashboard/TargetCard";
import OperationalCard from "@/components/dashboard/OperationalCard";
import { useSalesStore } from "@/store/useGorpisStore";
import { formatRupiah } from "@/lib/formatRupiah";
import StatCard from "@/components/dashboard/StatCard";

export default function DashboardCard() {
  const omzet = useSalesStore((state) => state.omzet);
  const sessionOpen = useSalesStore(
  (state) => state.sessionOpen
);

const lastClosedSession = useSalesStore(
  (state) => state.lastClosedSession
);
const sessionStart = useSalesStore(
  (state) => state.sessionStart
);

const tanggalOperasional = useSalesStore(
  (state) => state.tanggalOperasional
);
const targetOmzet = useSalesStore(
  (state) => state.targetOmzet
);
  const sales = useSalesStore((state) => state.sales);
  const expenses = useSalesStore((state) => state.expenses);

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
  const rataRataTransaksi =
  activeSales.length === 0
    ? 0
    : Math.round(activeOmzet / activeSales.length);

const pembayaranDominan =
  cash >= qris ? "Cash" : "QRIS";

const persentaseDominan =
  activeOmzet === 0
    ? 0
    : Math.round(
        (Math.max(cash, qris) / activeOmzet) * 100
      );

const progressTarget =
  targetOmzet === 0
    ? 0
    : Math.round((activeOmzet / targetOmzet) * 100);
  const menuTerlaris = Object.entries(
  activeSales.reduce((acc, sale) => {
    acc[sale.menu] =
  (acc[sale.menu] || 0) + (sale.qty ?? 1);
    return acc;
  }, {} as Record<string, number>)
).sort((a, b) => b[1] - a[1]);

  return (
    <>
   <OperationalCard />

   <TargetCard />

   <StatsSection />
      
   <BestSellerCard menuTerlaris={menuTerlaris} />

<PaymentCard
  cash={cash}
  qris={qris}
  activeOmzet={activeOmzet}
/>
    <InsightCard
  menuTerlaris={menuTerlaris}
  profit={profit}
  pembayaranDominan={pembayaranDominan}
  persentaseDominan={persentaseDominan}
  activeSales={activeSales}
  rataRataTransaksi={rataRataTransaksi}
/>

    </>
  );
}