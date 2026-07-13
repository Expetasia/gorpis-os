"use client";

import { useMemo, useState } from "react";
import { menus } from "./menu";
import { formatRupiah } from "@/lib/formatRupiah";
import { useSalesStore } from "@/store/useSalesStore";

type PaymentMethod = "Cash" | "QRIS";

export default function QuickSale() {
  const tambahPenjualan = useSalesStore((state) => state.tambahPenjualan);

  const [selectedMenu, setSelectedMenu] = useState<(typeof menus)[0] | null>(
    null
  );

  const [upsize, setUpsize] = useState(false);
  const [payment, setPayment] = useState<PaymentMethod>("Cash");

  const total = useMemo(() => {
    if (!selectedMenu) return 0;
    return upsize ? selectedMenu.harga + 5000 : selectedMenu.harga;
  }, [selectedMenu, upsize]);

  function simpan() {
    if (!selectedMenu) return;

    tambahPenjualan(
      selectedMenu.nama,
      total,
      payment,
      upsize
    );

    setSelectedMenu(null);
    setUpsize(false);
    setPayment("Cash");
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-8">

      <h2 className="text-3xl font-extrabold text-zinc-900 mb-6">
        ⚡ Quick Sale
      </h2>

      <p className="text-gray-600 mb-6">
        Pilih menu yang terjual
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

        {menus.map((menu) => (

          <button
            key={menu.id}
            onClick={() => setSelectedMenu(menu)}
            className={`rounded-2xl border-2 p-5 transition text-left ${
              selectedMenu?.id === menu.id
                ? "border-orange-500 bg-orange-100"
                : "border-gray-200 bg-white hover:border-orange-300"
            }`}
          >

            <h3 className="text-2xl font-extrabold text-zinc-900">
              {menu.nama}
            </h3>

            <p className="mt-2 text-lg font-semibold text-gray-700">
              {formatRupiah(menu.harga)}
            </p>

          </button>

        ))}

      </div>

      {selectedMenu && (

        <div className="mt-8 rounded-2xl border border-orange-200 bg-orange-50 p-6">

          <h2 className="text-3xl font-extrabold text-zinc-900 mb-6">
            {selectedMenu.nama}
          </h2>

          <div className="mb-6">

            <p className="text-lg font-bold text-zinc-900 mb-3">
              Ukuran
            </p>

            <div className="flex gap-3">

              <button
                onClick={() => setUpsize(false)}
                className={`rounded-xl px-5 py-3 font-semibold ${
                  !upsize
                    ? "bg-orange-500 text-white"
                    : "bg-white border border-gray-300 text-zinc-900"
                }`}
              >
                Normal (7 pcs)
              </button>

              <button
                onClick={() => setUpsize(true)}
                className={`rounded-xl px-5 py-3 font-semibold ${
                  upsize
                    ? "bg-orange-500 text-white"
                    : "bg-white border border-gray-300 text-zinc-900"
                }`}
              >
                Upsize (+5K)
              </button>

            </div>

          </div>

          <div className="mb-6">

            <p className="text-lg font-bold text-zinc-900 mb-3">
              Pembayaran
            </p>

            <div className="flex gap-3">

              <button
                onClick={() => setPayment("Cash")}
                className={`rounded-xl px-5 py-3 font-semibold ${
                  payment === "Cash"
                    ? "bg-green-600 text-white"
                    : "bg-white border border-gray-300 text-zinc-900"
                }`}
              >
                Cash
              </button>

              <button
                onClick={() => setPayment("QRIS")}
                className={`rounded-xl px-5 py-3 font-semibold ${
                  payment === "QRIS"
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-gray-300 text-zinc-900"
                }`}
              >
                QRIS
              </button>

            </div>

          </div>

          <div className="flex items-center justify-between border-t border-orange-200 pt-5">

            <div>

              <p className="font-semibold text-gray-600">
                Total
              </p>

              <h2 className="text-3xl font-extrabold text-zinc-900">
                {formatRupiah(total)}
              </h2>

            </div>

            <button
              onClick={simpan}
              className="rounded-xl bg-orange-600 px-8 py-4 font-bold text-white hover:bg-orange-700"
            >
              Catat Penjualan
            </button>

          </div>

        </div>

      )}

    </div>
  );
}