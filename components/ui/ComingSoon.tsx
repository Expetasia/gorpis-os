type ComingSoonProps = {
  title: string;
  description: string;
};

export default function ComingSoon({
  title,
  description,
}: ComingSoonProps) {
  return (
    <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">

      <h2 className="text-3xl font-extrabold text-zinc-900">
        {title}
      </h2>

      <p className="mt-3 text-zinc-600">
        {description}
      </p>

    </div>
  );
}