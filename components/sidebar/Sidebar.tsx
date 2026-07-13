"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menus = [
  {
    name: "Dashboard",
    href: "/",
    icon: "🏠",
  },
  {
    name: "Kasir",
    href: "/kasir",
    icon: "🍌",
  },
  {
    name: "Pengeluaran",
    href: "/pengeluaran",
    icon: "💸",
  },
  {
    name: "Laporan",
    href: "/laporan",
    icon: "📈",
  },
  {
    name: "Inventory",
    href: "/inventory",
    icon: "📦",
  },
  {
    name: "Setting",
    href: "/setting",
    icon: "⚙️",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-5 shadow-md">

      <div className="mb-8">

        <h2 className="text-2xl font-extrabold text-zinc-900">
          SOPIS
        </h2>

        <p className="mt-1 text-sm text-zinc-600">
          Smart Operational Pisang Information System
        </p>

      </div>

      <nav className="space-y-2">

        {menus.map((menu) => {

          const active = pathname === menu.href;

          return (
            <Link
              key={menu.href}
              href={menu.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 font-semibold transition

              ${
                active
                  ? "bg-orange-500 text-white shadow"
                  : "text-zinc-700 hover:bg-orange-50 hover:text-orange-600"
              }`}
            >
              <span className="text-xl">
                {menu.icon}
              </span>

              <span>
                {menu.name}
              </span>
            </Link>
          );
        })}

      </nav>

      <div className="mt-10 rounded-xl border border-orange-200 bg-orange-50 p-4">

        <p className="text-xs font-semibold uppercase tracking-wide text-orange-700">
          Version
        </p>

        <h3 className="mt-1 text-lg font-bold text-zinc-900">
          GORPIS OS v0.4
        </h3>

      </div>

    </aside>
  );
}