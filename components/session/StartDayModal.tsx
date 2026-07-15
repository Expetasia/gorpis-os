"use client";

type Props = {
  open: boolean;
  onStart: () => void;
};

export default function StartDayModal({
  open,
  onStart,
}: Props) {

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">

        <div className="text-center">

          <div className="text-6xl">
            🍌
          </div>

          <h2 className="mt-4 text-3xl font-extrabold text-zinc-900">
            Hari Operasional
          </h2>

          <p className="mt-3 text-gray-600">
            Selamat datang SOPIS.
          </p>

          <p className="mt-1 text-gray-600">
            Tekan tombol di bawah untuk memulai
            operasional hari ini.
          </p>

          <button
            onClick={onStart}
            className="mt-8 w-full rounded-2xl bg-orange-500 py-4 text-lg font-bold text-white hover:bg-orange-600"
          >
            ▶ Mulai Hari Ini
          </button>

        </div>

      </div>

    </div>
  );
}