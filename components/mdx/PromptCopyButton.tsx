"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

type PromptCopyButtonProps = {
  code: string;
};

export function PromptCopyButton({ code }: PromptCopyButtonProps) {
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
    <Button
      type="button"
      variant="secondary"
      className="border border-white/10 bg-white/10 text-white hover:bg-white/15"
      onClick={handleCopy}
    >
      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      {copied ? "복사됨" : "복사"}
    </Button>
  );
}
