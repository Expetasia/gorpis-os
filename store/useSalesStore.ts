import { create } from "zustand";

export type Sale = {
  id: number;
  menu: string;
  harga: number;
  pembayaran: "Cash" | "QRIS";
  upsize: boolean;
  waktu: string;
};

export type Expense = {
  id: number;
  nama: string;
  nominal: number;
  waktu: string;
};

type SalesStore = {
  omzet: number;
  sales: Sale[];
  expenses: Expense[];

  tambahPenjualan: (
    menu: string,
    harga: number,
    pembayaran: "Cash" | "QRIS",
    upsize: boolean
  ) => void;

  hapusPenjualan: (id: number) => void;

  editPenjualan: (
    id: number,
    data: Omit<Sale, "id" | "waktu">
  ) => void;

  tambahPengeluaran: (
    nama: string,
    nominal: number
  ) => void;

  hapusPengeluaran: (
    id: number
  ) => void;

  resetHari: () => void;

  loadData: () => void;
};

const STORAGE_KEY = "gorpis-os";

export const useSalesStore = create<SalesStore>((set, get) => ({
  omzet: 0,
  sales: [],
  expenses: [],

  tambahPenjualan(menu, harga, pembayaran, upsize) {
    const sale: Sale = {
      id: Date.now(),
      menu,
      harga,
      pembayaran,
      upsize,
      waktu: new Date().toLocaleTimeString("id-ID"),
    };

    const newState = {
      ...get(),
      omzet: get().omzet + harga,
      sales: [sale, ...get().sales],
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));

    set(newState);
  },

  hapusPenjualan(id) {
    const transaksi = get().sales.find((x) => x.id === id);

    if (!transaksi) return;

    const newState = {
      ...get(),
      omzet: get().omzet - transaksi.harga,
      sales: get().sales.filter((x) => x.id !== id),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));

    set(newState);
  },

  editPenjualan(id, data) {
    const sales = get().sales.map((item) =>
      item.id === id
        ? {
            ...item,
            ...data,
          }
        : item
    );

    const omzet = sales.reduce(
      (total, item) => total + item.harga,
      0
    );

    const newState = {
      ...get(),
      omzet,
      sales,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));

    set(newState);
  },

  tambahPengeluaran(nama, nominal) {
    const expense: Expense = {
      id: Date.now(),
      nama,
      nominal,
      waktu: new Date().toLocaleTimeString("id-ID"),
    };

    const newState = {
      ...get(),
      expenses: [expense, ...get().expenses],
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));

    set(newState);
  },

  hapusPengeluaran(id) {
    const newState = {
      ...get(),
      expenses: get().expenses.filter(
        (item) => item.id !== id
      ),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));

    set(newState);
  },

  resetHari() {
    const newState = {
      ...get(),
      omzet: 0,
      sales: [],
      expenses: [],
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));

    set(newState);
  },

  loadData() {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) return;

    set(JSON.parse(data));
  },
}));