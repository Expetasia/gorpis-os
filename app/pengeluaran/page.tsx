"use client";

import Header from "@/components/layout/Header";
import AppLayout from "@/components/layout/AppLayout";
import PageWrapper from "@/components/layout/PageWrapper";
import ExpensePanel from "@/components/expense/ExpensePanel";

export default function PengeluaranPage() {
  return (
    <main className="min-h-screen bg-orange-50">

      <Header />

      <AppLayout>

        <PageWrapper
          title="💸 Pengeluaran"
          subtitle="Kelola biaya operasional harian."
        >

          <ExpensePanel />

        </PageWrapper>

      </AppLayout>

    </main>
  );
}