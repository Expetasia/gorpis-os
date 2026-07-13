export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">

        <div>

          <h1 className="text-3xl font-extrabold text-zinc-900">
            🍌 GORPIS OS
          </h1>

          <p className="mt-1 text-zinc-600">
            Business Operating System
          </p>

        </div>

        <div className="rounded-full border border-orange-300 bg-orange-50 px-4 py-2">

          <span className="font-bold text-zinc-900">
            SOPIS v1.0
          </span>

        </div>

      </div>

    </header>
  );
}