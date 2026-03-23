"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

type PromptCodeBlockProps = {
  code: string;
};

export function PromptCodeBlock({ code }: PromptCodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success("프롬프트가 복사되었습니다!");
    } catch {
      toast.error("클립보드 복사에 실패했습니다.");
    }
  };

  React.useEffect(() => {
    if (!copied) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setCopied(false);
    }, 2000);

    return () => window.clearTimeout(timeout);
  }, [copied]);

  return (
    <div className="my-6 overflow-hidden rounded-[1.75rem] border border-border/80 bg-zinc-950 text-zinc-50 shadow-sm">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div>
          <p className="text-sm font-semibold tracking-tight">프롬프트 예시</p>
          <p className="text-xs text-zinc-400">
            그대로 복사해 AI IDE에 붙여넣을 수 있습니다.
          </p>
        </div>
        <Button
          type="button"
          variant="secondary"
          className="border border-white/10 bg-white/10 text-white hover:bg-white/15"
          onClick={handleCopy}
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          {copied ? "복사됨" : "복사"}
        </Button>
      </div>
      <pre className="overflow-x-auto px-4 py-4 text-sm leading-7 whitespace-pre-wrap">
        <code>{code}</code>
      </pre>
    </div>
  );
}
