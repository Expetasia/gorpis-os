type StatCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: string;
  color?:
    | "orange"
    | "green"
    | "red"
    | "blue"
    | "purple"
    | "yellow";
};

const colorClass = {
  orange: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-600",
  },
  green: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-600",
  },
  red: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-600",
  },
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-600",
  },
  purple: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    text: "text-purple-600",
  },
  yellow: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    text: "text-yellow-600",
  },
};

export default function StatCard({
  title,
  value,
  subtitle,
  icon = "📊",
  color = "orange",
}: StatCardProps) {
  const style = colorClass[color];

  return (
    <div
      className={`
        rounded-2xl
        border
        ${style.border}
        ${style.bg}
        p-5
        shadow-sm
        transition-all
        duration-200
        hover:shadow-lg
        hover:-translate-y-1
      `}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h2 className={`mt-2 text-3xl font-extrabold ${style.text}`}>
            {value}
          </h2>

          {subtitle && (
            <p className="mt-2 text-xs text-gray-500">
              {subtitle}
            </p>
          )}
        </div>

        <div className="text-4xl">
          {icon}
        </div>
      </div>
    </div>
  );
}