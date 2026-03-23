import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Link from "next/link";
import type { MDXComponents } from "mdx/types";

import { Callout } from "@/components/mdx/Callout";
import { PromptCard } from "@/components/mdx/PromptCard";
import { PromptCodeBlock } from "@/components/mdx/PromptCodeBlock";
import { cn } from "@/lib/utils";

type NodeWithChildren = {
  props?: {
    children?: ReactNode;
  };
};

function extractTextContent(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(extractTextContent).join("");
  }

  if (node && typeof node === "object" && "props" in node) {
    return extractTextContent((node as NodeWithChildren).props?.children);
  }

  return "";
}

function PreBlock({ children, ...props }: ComponentPropsWithoutRef<"pre">) {
  const code = extractTextContent(children).replace(/\n$/, "");

  if (!code) {
    return <pre {...props}>{children}</pre>;
  }

  return <PromptCodeBlock code={code} />;
}

function InlineCode({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"code">) {
  const content = extractTextContent(children);
  const isInline = !className;

  if (!isInline) {
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  }

  return (
    <code
      className="rounded-lg bg-muted px-1.5 py-1 font-mono text-[0.9em] text-foreground"
      {...props}
    >
      {content}
    </code>
  );
}

export const mdxComponents: MDXComponents = {
  h1: ({ className, ...props }) => (
    <h1
      className={cn(
        "mt-2 scroll-m-24 text-4xl font-semibold tracking-tight sm:text-5xl",
        className,
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }) => (
    <h2
      className={cn(
        "mt-14 scroll-m-24 border-t border-border/70 pt-8 text-2xl font-semibold tracking-tight first:mt-0 first:border-t-0 first:pt-0",
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn("mt-10 scroll-m-24 text-xl font-semibold tracking-tight", className)}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p
      className={cn("text-base leading-8 text-foreground/90", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }) => (
    <ul className={cn("my-6 space-y-2 marker:text-muted-foreground", className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol className={cn("my-6 space-y-2 marker:text-muted-foreground", className)} {...props} />
  ),
  li: ({ className, ...props }) => (
    <li className={cn("pl-1 text-base leading-8 text-foreground/90", className)} {...props} />
  ),
  a: ({ className, href = "", ...props }) => {
    const isInternal = href.startsWith("/");

    if (isInternal) {
      return (
        <Link
          href={href}
          className={cn(
            "font-medium text-primary underline underline-offset-4 transition-colors hover:text-primary/80",
            className,
          )}
          {...props}
        />
      );
    }

    return (
      <a
        href={href}
        className={cn(
          "font-medium text-primary underline underline-offset-4 transition-colors hover:text-primary/80",
          className,
        )}
        target="_blank"
        rel="noreferrer"
        {...props}
      />
    );
  },
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        "my-6 rounded-r-2xl border-l-4 border-primary/40 bg-muted/40 px-5 py-4 text-base italic text-muted-foreground",
        className,
      )}
      {...props}
    />
  ),
  hr: ({ className, ...props }) => (
    <hr className={cn("my-10 border-border/70", className)} {...props} />
  ),
  table: ({ className, ...props }) => (
    <div className="my-8 overflow-x-auto">
      <table className={cn("w-full text-left text-sm", className)} {...props} />
    </div>
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn(
        "border-b border-border px-4 py-3 font-semibold text-foreground",
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td className={cn("border-b border-border/70 px-4 py-3 align-top", className)} {...props} />
  ),
  pre: PreBlock,
  code: InlineCode,
  Callout,
  PromptCard,
  PromptCodeBlock,
};
