import { formatRupiah } from "@/lib/formatRupiah";

type MenuCardProps = {
  nama: string;
  harga: number;
  active: boolean;
  onClick: () => void;
};

export default function MenuCard({
  nama,
  harga,
  active,
  onClick,
}: MenuCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-2xl border-2 p-5 text-left transition-all duration-200

      ${
        active
          ? "border-orange-500 bg-orange-50"
          : "border-gray-200 bg-white hover:border-orange-300"
      }`}
    >

      <h3 className="text-2xl font-extrabold text-zinc-900">
        {nama}
      </h3>

      <p className="mt-2 text-lg font-semibold text-zinc-600">
        {formatRupiah(harga)}
      </p>

    </button>
  );
}