"use client";

import { useEffect } from "react";

import Header from "@/components/layout/Header";
import AppLayout from "@/components/layout/AppLayout";
import PageWrapper from "@/components/layout/PageWrapper";

import DashboardCard from "@/components/DashboardCard";
import SalesSession from "@/components/layout/SalesSession";

import { useSalesStore } from "@/store/useGorpisStore";

export default function Home() {
  const loadData = useSalesStore(
    (state) => state.loadData
  );

  const cekHariOperasional = useSalesStore(
    (state) => state.cekHariOperasional
  );

  useEffect(() => {
    loadData();
    cekHariOperasional();
  }, []);

  return (
    <main className="min-h-screen bg-orange-50">

      <Header />

      <AppLayout>

        <PageWrapper
          title="📊 Dashboard"
          subtitle="Ringkasan operasional hari ini."
        >
          <SalesSession />

          <DashboardCard />

        </PageWrapper>

      </AppLayout>

    </main>
  );
}