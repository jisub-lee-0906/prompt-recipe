import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-var(--header-height))] w-full max-w-5xl items-center px-6 py-16">
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-6">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Prompting Docs
          </p>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              AI에게 더 정확하게 지시하기 위한 개발 용어 가이드
            </h1>
            <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              비개발자와 주니어 개발자가 UI/UX, 프론트엔드, 백엔드 용어를
              문서형 인터페이스로 빠르게 이해하고, 더 좋은 프롬프트를 작성할 수
              있도록 돕는 정적 문서 사이트입니다.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/docs/ui-ux/modal">
              <Button size="lg">문서 둘러보기</Button>
            </Link>
            <Link href="/docs/frontend/component">
              <Button variant="outline" size="lg">
                샘플 문서 보기
              </Button>
            </Link>
          </div>
        </div>
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <div className="space-y-4">
            <p className="text-sm font-medium text-muted-foreground">
              현재 준비된 카테고리
            </p>
            <ul className="space-y-3 text-sm leading-7 text-foreground/90">
              <li>UI/UX: 모달, 토스트</li>
              <li>프론트엔드: 컴포넌트, 상태 관리</li>
              <li>백엔드: API, 인증 흐름</li>
            </ul>
            <p className="border-t border-border/70 pt-4 text-sm leading-7 text-muted-foreground">
              Step 2에서는 헤더, 다크모드, 사이드바, TOC 뼈대까지 포함한
              문서 레이아웃을 구성합니다.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
