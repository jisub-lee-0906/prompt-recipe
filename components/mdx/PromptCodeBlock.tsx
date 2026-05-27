import type { ReactNode } from "react";

import { PromptCopyButton } from "@/components/mdx/PromptCopyButton";

type PromptCodeBlockProps = {
  code?: ReactNode;
  children?: ReactNode;
};

function extractTextContent(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(extractTextContent).join("");
  }

  if (node && typeof node === "object" && "props" in node) {
    return extractTextContent(
      (node as { props?: { children?: ReactNode } }).props?.children,
    );
  }

  return "";
}

export function PromptCodeBlock({
  code,
  children,
}: PromptCodeBlockProps) {
  const resolvedCode = (
    (typeof code === "string" ? code : extractTextContent(code)) ||
    extractTextContent(children)
  ).replace(/\n$/, "");

  return (
    <div className="my-6 overflow-hidden rounded-[1.75rem] border border-border/80 bg-zinc-950 text-zinc-50 shadow-sm">
      <div className="border-b border-white/10 px-5 py-4 sm:px-6">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <p className="text-sm font-semibold tracking-tight">프롬프트 예시</p>
          <div className="flex items-center gap-4">
            <p className="hidden text-xs text-zinc-400 sm:block">
              그대로 복사해 AI IDE에 붙여넣을 수 있습니다.
            </p>
            <PromptCopyButton code={resolvedCode} />
          </div>
        </div>
      </div>
      <div className="px-5 py-5 sm:px-6 sm:py-6">
        <pre className="mx-auto max-w-3xl overflow-x-auto rounded-2xl border border-white/10 bg-white/5 px-5 py-5 text-sm leading-7 whitespace-pre-wrap sm:px-6">
          <code className="block text-[0.95rem]">{resolvedCode}</code>
        </pre>
      </div>
    </div>
  );
}
