import { formatRupiah } from "@/lib/formatRupiah";

type SalesSummaryModalProps = {
  open: boolean;
  onClose: () => void;
  omzet: number;
  cash: number;
  qris: number;
  transaksi: number;
};

export default function SalesSummaryModal({
  open,
  onClose,
 omzet,
  cash,
  qris,
  transaksi,
}: SalesSummaryModalProps) {
  if (!open) return null;

  const sekarang = new Date();

  const tanggal = sekarang.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const jam = sekarang.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl">

        <div className="rounded-t-3xl bg-orange-500 p-6 text-white">

          <h2 className="text-3xl font-extrabold">
            📊 Penutupan Hari Operasional
          </h2>

          <p className="mt-2 opacity-90">
            {tanggal}
          </p>

          <p className="opacity-90">
            Ditutup pukul {jam}
          </p>

        </div>

        <div className="space-y-4 p-6">

          <Item
            title="💰 Omzet"
            value={formatRupiah(omzet)}
            color="text-orange-600"
          />

          <Item
            title="💵 Cash"
            value={formatRupiah(cash)}
            color="text-green-600"
          />

          <Item
            title="📱 QRIS"
            value={formatRupiah(qris)}
            color="text-blue-600"
          />

          <Item
            title="🧾 Total Transaksi"
            value={String(transaksi)}
            color="text-zinc-900"
          />

        </div>

        <div className="border-t p-6">

          <button
            onClick={onClose}
            className="w-full rounded-xl bg-orange-500 py-4 text-lg font-bold text-white transition hover:bg-orange-600"
          >
            Selesai
          </button>

        </div>

      </div>

    </div>
  );
}

type ItemProps = {
  title: string;
  value: string;
  color: string;
};

function Item({
  title,
  value,
  color,
}: ItemProps) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">

      <span className="font-medium text-gray-600">
        {title}
      </span>

      <span className={`text-xl font-extrabold ${color}`}>
        {value}
      </span>

    </div>
  );
}