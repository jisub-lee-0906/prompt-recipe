import { CheckCircle2, XCircle } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type PromptCardProps = {
  goodPrompt: string;
  badPrompt: string;
};

export function PromptCard({ goodPrompt, badPrompt }: PromptCardProps) {
  return (
    <div className="my-8 grid gap-4 lg:grid-cols-2">
      <Card className="rounded-3xl border border-rose-200/80 bg-rose-50/80 ring-0 dark:border-rose-900/60 dark:bg-rose-950/30">
        <CardHeader className="gap-3">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-rose-100 text-rose-700 dark:bg-rose-900/60 dark:text-rose-200">
              <XCircle className="size-5" />
            </div>
            <div>
              <CardTitle className="text-rose-900 dark:text-rose-100">
                나쁜 프롬프트
              </CardTitle>
              <CardDescription className="text-rose-700/80 dark:text-rose-200/80">
                의도가 모호해서 결과 품질이 흔들리기 쉽습니다.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <pre className="overflow-x-auto rounded-2xl border border-rose-200/80 bg-white/80 p-4 text-sm leading-7 whitespace-pre-wrap text-rose-950 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-50">
            <code>{badPrompt}</code>
          </pre>
        </CardContent>
      </Card>
      <Card className="rounded-3xl border border-emerald-200/80 bg-emerald-50/80 ring-0 dark:border-emerald-900/60 dark:bg-emerald-950/30">
        <CardHeader className="gap-3">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-200">
              <CheckCircle2 className="size-5" />
            </div>
            <div>
              <CardTitle className="text-emerald-900 dark:text-emerald-100">
                좋은 프롬프트
              </CardTitle>
              <CardDescription className="text-emerald-700/80 dark:text-emerald-200/80">
                목적, 맥락, 기대 결과가 분명하게 정리되어 있습니다.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <pre className="overflow-x-auto rounded-2xl border border-emerald-200/80 bg-white/80 p-4 text-sm leading-7 whitespace-pre-wrap text-emerald-950 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-50">
            <code>{goodPrompt}</code>
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
