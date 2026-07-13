type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "success" | "danger" | "secondary";
  className?: string;
};

export default function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const styles = {
    primary:
      "bg-orange-500 hover:bg-orange-600 text-white",
    success:
      "bg-green-600 hover:bg-green-700 text-white",
    danger:
      "bg-red-500 hover:bg-red-600 text-white",
    secondary:
      "bg-gray-100 hover:bg-gray-200 text-zinc-900",
  };

  return (
    <button
      onClick={onClick}
      className={`rounded-xl px-5 py-3 font-semibold transition ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}