export default function Home() {
  return (
    <main className="min-h-screen bg-orange-50 flex items-center justify-center">
      <div className="text-center">

        <h1 className="text-5xl font-bold text-orange-600">
          🍌 GORPIS OS
        </h1>

        <p className="mt-4 text-gray-600 text-xl">
          Business Operating System
        </p>

        <p className="mt-2 text-gray-400">
          Version 1.0
        </p>

        <button className="mt-10 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition">
          Mulai
        </button>

      </div>
    </main>
  );
}