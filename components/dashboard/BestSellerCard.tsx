"use client";

type Props = {
  menuTerlaris: [string, number][];
};

export default function BestSellerCard({
  menuTerlaris,
}: Props) {
  return (
    <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <h2 className="text-xl font-bold">
        🏆 Menu Terlaris Hari Ini
      </h2>

      {menuTerlaris.length === 0 ? (

        <p className="mt-4 text-gray-500">
          Belum ada penjualan hari ini.
        </p>

      ) : (

        <div className="mt-5 space-y-3">

          {menuTerlaris.map(([menu, jumlah], index) => (

            <div
              key={menu}
              className="flex items-center justify-between rounded-xl bg-orange-50 px-4 py-3"
            >

              <div className="flex items-center gap-3">

                <span className="text-xl">

                  {index === 0
                    ? "🥇"
                    : index === 1
                    ? "🥈"
                    : index === 2
                    ? "🥉"
                    : "🏅"}

                </span>

                <span className="font-semibold">
                  {menu}
                </span>

              </div>

              <span className="font-bold text-orange-600">
                {jumlah} Box
              </span>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}