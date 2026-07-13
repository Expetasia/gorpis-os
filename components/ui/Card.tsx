type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`bg-white rounded-2xl border border-gray-200 shadow-md p-6 ${className}`}
    >
      {children}
    </div>
  );
}