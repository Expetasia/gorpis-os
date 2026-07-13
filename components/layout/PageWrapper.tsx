import { ReactNode } from "react";

type Props = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export default function PageWrapper({
  title,
  subtitle,
  children,
}: Props) {
  return (
    <section>

      <div className="mb-8">

        <h1 className="text-4xl font-extrabold text-zinc-900">
          {title}
        </h1>

        <p className="mt-2 text-zinc-600">
          {subtitle}
        </p>

      </div>

      {children}

    </section>
  );
}