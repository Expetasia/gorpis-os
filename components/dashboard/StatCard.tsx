import Card from "@/components/ui/Card";

type StatCardProps = {
  title: string;
  value: string;
  color?: string;
};

export default function StatCard({
  title,
  value,
  color = "text-zinc-900",
}: StatCardProps) {
  return (
    <Card>

      <p className="text-sm font-semibold text-zinc-600">
        {title}
      </p>

      <h2 className={`mt-3 text-4xl font-extrabold ${color}`}>
        {value}
      </h2>

    </Card>
  );
}