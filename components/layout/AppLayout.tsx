import { ReactNode } from "react";
import Sidebar from "@/components/sidebar/Sidebar";

type Props = {
  children: ReactNode;
};

export default function AppLayout({
  children,
}: Props) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-6">

      <div className="grid grid-cols-12 gap-6">

        <div className="col-span-12 lg:col-span-3 xl:col-span-2">

          <Sidebar />

        </div>

        <div className="col-span-12 lg:col-span-9 xl:col-span-10">

          {children}

        </div>

      </div>

    </div>
  );
}