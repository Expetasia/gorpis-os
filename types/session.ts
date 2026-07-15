import { Expense, Sale } from "@/store/useGorpisStore";

export type Session = {
  id: number;

  tanggal: string;

  mulai: string;

  selesai?: string;

  omzet: number;

  pengeluaran: number;

  profit: number;

  cash: number;

  qris: number;

  totalTransaksi: number;

  sales: Sale[];

  expenses: Expense[];
};