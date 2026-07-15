"use client";

import Header from "@/components/layout/Header";
import AppLayout from "@/components/layout/AppLayout";
import PageWrapper from "@/components/layout/PageWrapper";
import SalesSession from "@/components/layout/SalesSession";
import POS from "@/components/kasir/POS";
import TransactionHistory from "@/components/TransactionHistory";

export default function KasirPage() {
  return (
    <main className="min-h-screen bg-orange-50">

      <Header />

      <AppLayout>

        <PageWrapper
          title="🍌 Kasir"
          subtitle="Catat penjualan dengan cepat dan akurat."
        >

          
          
          

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

            <POS />

            <TransactionHistory />

          </div>

        </PageWrapper>

      </AppLayout>

    </main>
  );
}