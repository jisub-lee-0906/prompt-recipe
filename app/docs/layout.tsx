import type { ReactNode } from "react";

import { Sidebar } from "@/components/layout/sidebar";
import { Toc } from "@/components/layout/toc";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-[1600px] gap-6 px-4 py-6 sm:px-6 xl:gap-8">
      <div className="hidden md:block md:w-64 md:shrink-0">
        <Sidebar />
      </div>
      <div className="min-w-0 flex-1">{children}</div>
      <div className="hidden xl:block xl:w-64 xl:shrink-0">
        <Toc />
      </div>
    </div>
  );
}
