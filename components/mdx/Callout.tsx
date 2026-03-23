import type { ReactNode } from "react";
import { Info, Lightbulb, TriangleAlert } from "lucide-react";

import { cn } from "@/lib/utils";

type CalloutType = "info" | "warning" | "tip";

type CalloutProps = {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
};

const CALLOUT_STYLES: Record<
  CalloutType,
  {
    icon: typeof Info;
    wrapper: string;
    iconWrapper: string;
    title: string;
  }
> = {
  info: {
    icon: Info,
    wrapper:
      "border-sky-200/80 bg-sky-50/90 text-sky-950 dark:border-sky-900/70 dark:bg-sky-950/40 dark:text-sky-50",
    iconWrapper:
      "bg-sky-100 text-sky-700 dark:bg-sky-900/60 dark:text-sky-200",
    title: "text-sky-900 dark:text-sky-100",
  },
  warning: {
    icon: TriangleAlert,
    wrapper:
      "border-amber-200/80 bg-amber-50/90 text-amber-950 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-50",
    iconWrapper:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-200",
    title: "text-amber-900 dark:text-amber-100",
  },
  tip: {
    icon: Lightbulb,
    wrapper:
      "border-emerald-200/80 bg-emerald-50/90 text-emerald-950 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-50",
    iconWrapper:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-200",
    title: "text-emerald-900 dark:text-emerald-100",
  },
};

export function Callout({
  type = "info",
  title,
  children,
}: CalloutProps) {
  const { icon: Icon, wrapper, iconWrapper, title: titleClassName } =
    CALLOUT_STYLES[type];

  return (
    <div
      className={cn(
        "my-6 flex gap-4 rounded-3xl border px-4 py-4 shadow-sm sm:px-5",
        wrapper,
      )}
    >
      <div
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-2xl",
          iconWrapper,
        )}
      >
        <Icon className="size-5" />
      </div>
      <div className="min-w-0 space-y-2">
        {title ? (
          <p className={cn("text-sm font-semibold tracking-tight", titleClassName)}>
            {title}
          </p>
        ) : null}
        <div className="text-sm leading-7 [&_p]:m-0">{children}</div>
      </div>
    </div>
  );
}
