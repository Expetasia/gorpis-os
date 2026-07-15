import { create } from "zustand";

export type Sale = {
  id: number;
  menu: string;
  harga: number;
  qty: number;
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

export type OperationalHistory = {
  id: number;
  tanggal: string;
  mulai: string;
  selesai: string;
  omzet: number;
  cash: number;
  qris: number;
  transaksi: number;
  sales: Sale[];
  expenses: Expense[];
};
export type LastClosedSession = OperationalHistory | null;

type GorpisState = {
  sessionOpen: boolean;
  sessionStart: string;
  tanggalOperasional: string;

  sales: Sale[];
  expenses: Expense[];
  omzet: number;

  history: OperationalHistory[];
  lastClosedSession: LastClosedSession;

  shoppingChecklist: string[];
  targetOmzet: number;
  setTargetOmzet: (target: number) => void;
  tambahPenjualan: (
    menu: string,
    harga: number,
    pembayaran: "Cash" | "QRIS",
    upsize: boolean,
    qty: number
  ) => void;
  hapusPenjualan: (id: number) => void;
  editPenjualan: (id: number, data: Partial<Omit<Sale, "id">>) => void;

  tambahPengeluaran: (nama: string, nominal: number) => void;
  hapusPengeluaran: (id: number) => void;

  mulaiJualan: () => void;
  tutupJualan: () => void;
  hapusHistory: () => void;

  toggleChecklist: (item: string) => void;
  resetChecklist: () => void;
  

  resetHari: () => void;
  cekHariOperasional: () => void;

  loadData: () => void;
};

const STORAGE_KEY = "gorpis-os";

function getTanggalHariIni(): string {
  return new Date().toLocaleDateString("sv-SE");
}

function getJamSekarang(): string {
  const now = new Date();
  return now.toTimeString().split(" ")[0].slice(0, 5);
}

function generateId(): number {
  return Date.now() + Math.floor(Math.random() * 1000);
}

function hitungOmzet(sales: Sale[]): number {
  return sales.reduce((acc, s) => acc + s.harga, 0);
}

function simpanKeStorage(state: {
  sessionOpen: boolean;
  sessionStart: string;
  tanggalOperasional: string;
  sales: Sale[];
  expenses: Expense[];
  omzet: number;
  history: OperationalHistory[];
  lastClosedSession: LastClosedSession;
}) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error("Gagal menyimpan data ke localStorage:", err);
  }
}

export const useSalesStore = create<GorpisState>((set, get) => ({
  sessionOpen: false,
  sessionStart: "",
  tanggalOperasional: getTanggalHariIni(),

  sales: [],
  expenses: [],
  omzet: 0,

  history: [],
lastClosedSession: null,
  shoppingChecklist: [],
  targetOmzet: 500000,

  tambahPenjualan: (menu, harga, pembayaran, upsize, qty) => {
    if (!get().sessionOpen) return;
    console.log("QTY MASUK:", qty);
    const newSale: Sale = {
      id: generateId(),
      menu,
      harga,
      qty,
      pembayaran,
      upsize,
      waktu: getJamSekarang(),
    };

    set((state) => {
      const sales = [...state.sales, newSale];
      const omzet = hitungOmzet(sales);
      const newState = { ...state, sales, omzet };
      simpanKeStorage(newState);
      return { sales, omzet };
    });
  },

  hapusPenjualan: (id) => {
    set((state) => {
      const sales = state.sales.filter((s) => s.id !== id);
      const omzet = hitungOmzet(sales);
      const newState = { ...state, sales, omzet };
      simpanKeStorage(newState);
      return { sales, omzet };
    });
  },

  editPenjualan: (id, data) => {
    set((state) => {
      const sales = state.sales.map((s) =>
        s.id === id ? { ...s, ...data } : s
      );
      const omzet = hitungOmzet(sales);
      const newState = { ...state, sales, omzet };
      simpanKeStorage(newState);
      return { sales, omzet };
    });
  },

  tambahPengeluaran: (nama, nominal) => {
    
    const newExpense: Expense = {
      id: generateId(),
      nama,
      nominal,
      waktu: getJamSekarang(),
    };

    set((state) => {
      const expenses = [...state.expenses, newExpense];
      const newState = { ...state, expenses };
      simpanKeStorage(newState);
      return { expenses };
    });
  },

  hapusPengeluaran: (id) => {
    set((state) => {
      const expenses = state.expenses.filter((e) => e.id !== id);
      const newState = { ...state, expenses };
      simpanKeStorage(newState);
      return { expenses };
    });
  },

 mulaiJualan: () => {
  if (get().sessionOpen) return;

  set((state) => {
    const sessionStart = getJamSekarang();

    const newState = {
      ...state,
      sessionOpen: true,
      sessionStart,
      lastClosedSession: null,
    };

    simpanKeStorage(newState);

    return newState;
  });
},

 tutupJualan: () => {
  set((state) => {
    console.log("STORE", {
      omzet: state.omzet,
      sales: state.sales.length,
      expenses: state.expenses.length,
    });
    const cash = state.sales
      .filter((s) => s.pembayaran === "Cash")
      .reduce((acc, s) => acc + s.harga, 0);

    const qris = state.sales
      .filter((s) => s.pembayaran === "QRIS")
      .reduce((acc, s) => acc + s.harga, 0);

    const snapshot: OperationalHistory = {
      id: generateId(),
      tanggal: state.tanggalOperasional,
      mulai: state.sessionStart,
      selesai: getJamSekarang(),
      omzet: state.omzet,
      cash,
      qris,
      transaksi: state.sales.length,
      sales: [...state.sales],
      expenses: [...state.expenses],
    };

    const history = [...state.history, snapshot];

    const newState = {
      ...state,
      history,
      lastClosedSession: snapshot,
      sales: [] as Sale[],
      expenses: [] as Expense[],
      omzet: 0,
      sessionOpen: false,
      sessionStart: "",
    };

    simpanKeStorage(newState);

    return newState;
  });
},
    
hapusHistory: () => {
  set((state) => {
    const newState = {
      ...state,
      history: [],
    };

    simpanKeStorage(newState);

    return newState;
  });
},
toggleChecklist: (item) => {
  set((state) => {
    const shoppingChecklist =
      state.shoppingChecklist.includes(item)
        ? state.shoppingChecklist.filter((i) => i !== item)
        : [...state.shoppingChecklist, item];

    const newState = {
      ...state,
      shoppingChecklist,
    };

    simpanKeStorage(newState);

    return newState;
  });
},

resetChecklist: () => {
  set((state) => {
    const newState = {
      ...state,
      shoppingChecklist: [],
    };

    simpanKeStorage(newState);

    return newState;
  });
},
setTargetOmzet: (target) => {
  set((state) => {
    const newState = {
      ...state,
      targetOmzet: target,
    };

    simpanKeStorage(newState);

    return newState;
  });
},
  resetHari: () => {
    set((state) => {
      const newState = {
        ...state,
        sales: [] as Sale[],
        expenses: [] as Expense[],
        omzet: 0,
        sessionOpen: false,
        sessionStart: "",
        tanggalOperasional: getTanggalHariIni(),
      };
      simpanKeStorage(newState);
      return {
        sales: [],
        expenses: [],
        omzet: 0,
        sessionOpen: false,
        sessionStart: "",
        tanggalOperasional: newState.tanggalOperasional,
      };
    });
  },

  cekHariOperasional: () => {
    const state = get();
    const hariIni = getTanggalHariIni();

    if (state.tanggalOperasional !== hariIni) {
      set((s) => {
        const newState = {
          ...s,
          tanggalOperasional: hariIni,
          sales: [] as Sale[],
          expenses: [] as Expense[],
          omzet: 0,
          sessionOpen: false,
          sessionStart: "",
        };
        simpanKeStorage(newState);
        return {
          tanggalOperasional: hariIni,
          sales: [],
          expenses: [],
          omzet: 0,
          sessionOpen: false,
          sessionStart: "",
        };
      });
    }
  },

  loadData: () => {
    if (typeof window === "undefined") return;

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;

      const parsed = JSON.parse(raw);

      set({
        sessionOpen: parsed.sessionOpen ?? false,
        sessionStart: parsed.sessionStart ?? "",
        tanggalOperasional: parsed.tanggalOperasional ?? getTanggalHariIni(),
        sales: parsed.sales ?? [],
        expenses: parsed.expenses ?? [],
        omzet: parsed.omzet ?? 0,
        history: parsed.history ?? [],
        lastClosedSession: parsed.lastClosedSession ?? null,
        targetOmzet: parsed.targetOmzet ?? 500000,
      });

      get().cekHariOperasional();
    } catch (err) {
      console.error("Gagal memuat data dari localStorage:", err);
    }
  },
}));
