import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-var(--header-height))] w-full max-w-4xl items-center px-6 py-16">
      <div className="w-full rounded-[2rem] border border-border/70 bg-card/70 px-8 py-12 text-center shadow-sm backdrop-blur">
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">
          404
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">
          문서를 찾을 수 없습니다
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
          주소가 바뀌었거나 존재하지 않는 문서입니다. 홈으로 돌아가거나 카테고리
          문서에서 다시 탐색해보세요.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/">
            <Button>홈으로 이동</Button>
          </Link>
          <Link href="/docs/ui-ux">
            <Button variant="outline">UI/UX 문서 보기</Button>
          </Link>
          <Link href="/docs/frontend">
            <Button variant="outline">프론트엔드 문서 보기</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
