"use client";

import { useMemo, useState } from "react";

import MenuCard from "./MenuCard";

import { menus } from "@/components/menu";
import { useSalesStore } from "@/store/useSalesStore";
import { formatRupiah } from "@/lib/formatRupiah";

export default function POS() {
  const tambahPenjualan = useSalesStore(
    (state) => state.tambahPenjualan
  );

  const [selectedMenu, setSelectedMenu] = useState(menus[0]);
  const [upsize, setUpsize] = useState(false);
  const [payment, setPayment] = useState<"Cash" | "QRIS">("Cash");
  const [saved, setSaved] = useState(false);

  const total = useMemo(() => {
    return upsize
      ? selectedMenu.harga + 5000
      : selectedMenu.harga;
  }, [selectedMenu, upsize]);

  function simpan() {
    tambahPenjualan(
      selectedMenu.nama,
      total,
      payment,
      upsize
    );

    setUpSize(false);
    setPayment("Cash");

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 1200);
  }

  function setUpSize(value: boolean) {
    setUpsize(value);
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-6">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-extrabold text-zinc-900">
            🍌 Kasir
          </h2>

          <p className="text-gray-500 mt-1">
            Pilih menu yang terjual
          </p>

        </div>

        {saved && (
          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
            ✓ Tersimpan
          </span>
        )}

      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">

        {menus.map((menu) => (

          <MenuCard
            key={menu.id}
            nama={menu.nama}
            harga={menu.harga}
            active={selectedMenu.id === menu.id}
            onClick={() => setSelectedMenu(menu)}
          />

        ))}

      </div>

      <div className="mt-8">

        <h3 className="text-xl font-bold text-zinc-900">
          Ukuran
        </h3>

        <div className="grid grid-cols-2 gap-3 mt-3">

          <button
            onClick={() => setUpSize(false)}
            className={`rounded-xl py-3 font-bold transition ${
              !upsize
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-zinc-900 hover:bg-gray-200"
            }`}
          >
            Normal (7 pcs)
          </button>

          <button
            onClick={() => setUpSize(true)}
            className={`rounded-xl py-3 font-bold transition ${
              upsize
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-zinc-900 hover:bg-gray-200"
            }`}
          >
            Upsize (11 pcs)
          </button>

        </div>

      </div>

      <div className="mt-8">

        <h3 className="text-xl font-bold text-zinc-900">
          Pembayaran
        </h3>

        <div className="grid grid-cols-2 gap-3 mt-3">

          <button
            onClick={() => setPayment("Cash")}
            className={`rounded-xl py-3 font-bold transition ${
              payment === "Cash"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-zinc-900 hover:bg-gray-200"
            }`}
          >
            Cash
          </button>

          <button
            onClick={() => setPayment("QRIS")}
            className={`rounded-xl py-3 font-bold transition ${
              payment === "QRIS"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-zinc-900 hover:bg-gray-200"
            }`}
          >
            QRIS
          </button>

        </div>

      </div>

      <div className="mt-8 rounded-xl bg-orange-50 border border-orange-200 p-5">

        <p className="text-gray-600">
          Total
        </p>

        <h2 className="text-4xl font-extrabold text-zinc-900 mt-2">
          {formatRupiah(total)}
        </h2>

      </div>

      <button
        onClick={simpan}
        className="mt-6 w-full rounded-xl bg-orange-500 hover:bg-orange-600 py-4 text-xl font-bold text-white transition"
      >
        Catat Penjualan
      </button>

    </div>
  );
}