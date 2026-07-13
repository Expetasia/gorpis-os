"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Sale = {
  menu: string;
  harga: number;
  pembayaran: string;
  upsize: boolean;
  waktu: string;
};

type SalesContextType = {
  omzet: number;
  sales: Sale[];
  tambahPenjualan: (
    menu: string,
    harga: number,
    pembayaran: string,
    upsize: boolean
  ) => void;
};

const SalesContext = createContext<SalesContextType | null>(null);

export function SalesProvider({ children }: { children: ReactNode }) {
  const [omzet, setOmzet] = useState(0);
  const [sales, setSales] = useState<Sale[]>([]);

  function tambahPenjualan(
    menu: string,
    harga: number,
    pembayaran: string,
    upsize: boolean
  ) {
    setOmzet((prev) => prev + harga);

    setSales((prev) => [
      {
        menu,
        harga,
        pembayaran,
        upsize,
        waktu: new Date().toLocaleTimeString("id-ID"),
      },
      ...prev,
    ]);
  }

  return (
    <SalesContext.Provider
      value={{
        omzet,
        sales,
        tambahPenjualan,
      }}
    >
      {children}
    </SalesContext.Provider>
  );
}

export function useSales() {
  const context = useContext(SalesContext);

  if (!context) {
    throw new Error("useSales harus digunakan di dalam SalesProvider");
  }

  return context;
}