"use client";

import { useEffect } from "react";

import Header from "@/components/layout/Header";
import AppLayout from "@/components/layout/AppLayout";
import SalesSession from "@/components/layout/SalesSession";
import PageWrapper from "@/components/layout/PageWrapper";

import DashboardCard from "@/components/DashboardCard";
import POS from "@/components/kasir/POS";
import TransactionHistory from "@/components/TransactionHistory";

import { useSalesStore } from "@/store/useSalesStore";

export default function Home() {
  const loadData = useSalesStore((state) => state.loadData);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <main className="min-h-screen bg-orange-50">

      <Header />

      <AppLayout>

        <PageWrapper
          title="🏠 Dashboard"
          subtitle="Ringkasan operasional GORPIS hari ini."
        >

          <SalesSession />

          <DashboardCard />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">

            <POS />

            <TransactionHistory />

          </div>

        </PageWrapper>

      </AppLayout>

    </main>
  );
}