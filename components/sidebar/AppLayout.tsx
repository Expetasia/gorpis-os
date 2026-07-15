"use client";

import Sidebar from "@/components/sidebar/Sidebar";

type Props = {
  children: React.ReactNode;
};

export default function AppLayout({
  children,
}: Props) {
  return (
    <div className="flex">

      <Sidebar />

      <main className="flex-1 p-6">

        {children}

      </main>

    </div>
  );
}