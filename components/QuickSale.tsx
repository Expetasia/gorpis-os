"use client";

import { useMemo, useState } from "react";
import { menus } from "./menu";
import { formatRupiah } from "@/lib/formatRupiah";
import { useSalesStore } from "@/store/useGorpisStore";

type PaymentMethod = "Cash" | "QRIS";

export default function QuickSale() {
  const tambahPenjualan = useSalesStore(
    (state) => state.tambahPenjualan
  );

  const [selectedMenu, setSelectedMenu] = useState<(typeof menus)[0] | null>(
    null
  );

  const [upsize, setUpsize] = useState(false);
  const [payment, setPayment] =
    useState<PaymentMethod>("Cash");

  const [saved, setSaved] = useState(false);

  const total = useMemo(() => {
    if (!selectedMenu) return 0;

    return upsize
      ? selectedMenu.harga + 5000
      : selectedMenu.harga;
  }, [selectedMenu, upsize]);

  function simpan() {
    if (!selectedMenu) return;

    tambahPenjualan(
      selectedMenu.nama,
      total,
      payment,
      upsize,
      1
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 1200);

    setSelectedMenu(null);
    setUpsize(false);
    setPayment("Cash");
  }

  return (
    <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-md">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-extrabold text-zinc-900">
            ⚡ Quick Sale
          </h2>

          <p className="mt-1 text-zinc-500">
            Penjualan super cepat
          </p>

        </div>

        {saved && (
          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
            ✓ Berhasil
          </span>
        )}

      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

        {menus.map((menu) => (

          <button
            key={menu.id}
            onClick={() => setSelectedMenu(menu)}
            className={`rounded-2xl border-2 p-5 text-left transition

            ${
              selectedMenu?.id === menu.id
                ? "border-orange-500 bg-orange-50"
                : "border-gray-200 hover:border-orange-300 hover:bg-orange-50"
            }`}
          >

            <h3 className="text-xl font-bold">
              {menu.nama}
            </h3>

            <p className="mt-2 text-lg font-semibold text-orange-600">
              {formatRupiah(menu.harga)}
            </p>

          </button>

        ))}

      </div>

      {selectedMenu && (

        <div className="mt-8 rounded-2xl border border-orange-200 bg-orange-50 p-6">

          <h2 className="text-2xl font-extrabold">
            {selectedMenu.nama}
          </h2>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">

            <div>

              <p className="mb-3 font-bold">
                Ukuran
              </p>

              <div className="grid grid-cols-2 gap-3">

                <button
                  onClick={() => setUpsize(false)}
                  className={`rounded-xl py-3 font-bold

                  ${
                    !upsize
                      ? "bg-orange-500 text-white"
                      : "bg-white"
                  }`}
                >
                  Normal
                </button>

                <button
                  onClick={() => setUpsize(true)}
                  className={`rounded-xl py-3 font-bold

                  ${
                    upsize
                      ? "bg-orange-500 text-white"
                      : "bg-white"
                  }`}
                >
                  Upsize
                </button>

              </div>

            </div>

            <div>

              <p className="mb-3 font-bold">
                Pembayaran
              </p>

              <div className="grid grid-cols-2 gap-3">

                <button
                  onClick={() => setPayment("Cash")}
                  className={`rounded-xl py-3 font-bold

                  ${
                    payment === "Cash"
                      ? "bg-green-600 text-white"
                      : "bg-white"
                  }`}
                >
                  Cash
                </button>

                <button
                  onClick={() => setPayment("QRIS")}
                  className={`rounded-xl py-3 font-bold

                  ${
                    payment === "QRIS"
                      ? "bg-blue-600 text-white"
                      : "bg-white"
                  }`}
                >
                  QRIS
                </button>

              </div>

            </div>

          </div>

          <div className="mt-8 flex items-center justify-between border-t border-orange-200 pt-6">

            <div>

              <p className="text-sm text-gray-500">
                Total
              </p>

              <h2 className="text-4xl font-extrabold text-orange-600">
                {formatRupiah(total)}
              </h2>

            </div>

            <button
              onClick={simpan}
              className="rounded-xl bg-orange-500 px-8 py-4 text-lg font-bold text-white transition hover:bg-orange-600"
            >
              Catat Penjualan
            </button>

          </div>

        </div>

      )}

    </div>
  );
}