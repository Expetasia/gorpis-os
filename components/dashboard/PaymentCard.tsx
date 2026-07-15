"use client";

import { formatRupiah } from "@/lib/formatRupiah";

type Props = {
  cash: number;
  qris: number;
  activeOmzet: number;
};

export default function PaymentCard({
  cash,
  qris,
  activeOmzet,
}: Props) {
  return (
    <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <h2 className="text-xl font-bold">
        💳 Komposisi Pembayaran
      </h2>

      <div className="mt-6 space-y-5">

        <div>

          <div className="mb-2 flex justify-between">

            <span className="font-medium">
              Cash
            </span>

            <span className="font-bold">
              {formatRupiah(cash)}
            </span>

          </div>

          <div className="h-3 overflow-hidden rounded-full bg-gray-200">

            <div
              className="h-full rounded-full bg-blue-500 transition-all duration-500"
              style={{
                width: `${activeOmzet === 0 ? 0 : (cash / activeOmzet) * 100}%`,
              }}
            />

          </div>

        </div>

        <div>

          <div className="mb-2 flex justify-between">

            <span className="font-medium">
              QRIS
            </span>

            <span className="font-bold">
              {formatRupiah(qris)}
            </span>

          </div>

          <div className="h-3 overflow-hidden rounded-full bg-gray-200">

            <div
              className="h-full rounded-full bg-purple-500 transition-all duration-500"
              style={{
                width: `${activeOmzet === 0 ? 0 : (qris / activeOmzet) * 100}%`,
              }}
            />

          </div>

        </div>

      </div>

    </div>
  );
}