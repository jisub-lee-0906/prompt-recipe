import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";

import { Callout } from "@/components/mdx/Callout";
import { PromptCard } from "@/components/mdx/PromptCard";
import { PromptCodeBlock } from "@/components/mdx/PromptCodeBlock";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDocsBySlugs } from "@/lib/mdx";
import {
  getPlaybookBySlug,
  getPlaybooks,
  getRelatedPlaybooks,
} from "@/lib/playbooks";

type PlaybookPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getPlaybooks().map((playbook) => ({
    slug: playbook.slug,
  }));
}

export async function generateMetadata({
  params,
}: PlaybookPageProps): Promise<Metadata> {
  const { slug } = await params;
  const playbook = getPlaybookBySlug(slug);

  if (!playbook) {
    return {
      title: "플레이북을 찾을 수 없습니다",
    };
  }

  return {
    title: playbook.title,
    description: playbook.summary,
    alternates: {
      canonical: `/playbooks/${playbook.slug}`,
    },
    openGraph: {
      title: playbook.title,
      description: playbook.summary,
      url: `/playbooks/${playbook.slug}`,
    },
  };
}

export default async function PlaybookPage({ params }: PlaybookPageProps) {
  const { slug } = await params;
  const playbook = getPlaybookBySlug(slug);

  if (!playbook) {
    notFound();
  }

  const relatedDocs = getDocsBySlugs(playbook.docs);
  const relatedPlaybooks = getRelatedPlaybooks(playbook.slug);

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-12">
      <article className="rounded-[2rem] border border-border/70 bg-card/70 px-6 py-8 shadow-sm backdrop-blur sm:px-10 sm:py-10">
        <header className="space-y-5 border-b border-border/70 pb-8">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{playbook.role}</Badge>
            <Badge variant="outline">{playbook.level}</Badge>
            <Badge variant="outline">플레이북</Badge>
          </div>
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {playbook.title}
            </h1>
            <p className="max-w-3xl text-base leading-8 text-muted-foreground">
              {playbook.summary}
            </p>
          </div>
        </header>

        <section className="mt-10 space-y-8">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight">상황</h2>
            <p className="text-base leading-8 text-muted-foreground">
              {playbook.situation}
            </p>
          </div>

          <Callout type="tip" title="이 플레이북의 목표">
            {playbook.outcome}
          </Callout>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">빠른 프롬프트</h2>
            <PromptCodeBlock>{playbook.quickPrompt}</PromptCodeBlock>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              더 좋은 요청으로 확장하기
            </h2>
            <PromptCard
              badPrompt={playbook.commonMistake}
              goodPrompt={playbook.improvedRequest}
            />
            <PromptCodeBlock>{playbook.detailedPrompt}</PromptCodeBlock>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              같이 보면 좋은 문서
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {relatedDocs.map((doc) => (
                <Link key={doc.slug} href={doc.href}>
                  <Card className="rounded-[1.5rem] border border-border/70 bg-background/70 transition-colors hover:bg-muted/60">
                    <CardHeader className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">{doc.priority}</Badge>
                        <Badge variant="outline">{doc.difficulty}</Badge>
                      </div>
                      <CardTitle className="text-xl">{doc.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-7 text-muted-foreground">
                        {doc.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {relatedPlaybooks.length > 0 ? (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">
                이어서 보기 좋은 플레이북
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {relatedPlaybooks.map((item) => (
                  <Link key={item.slug} href={`/playbooks/${item.slug}`}>
                    <Card className="rounded-[1.5rem] border border-border/70 bg-background/70 transition-colors hover:bg-muted/60">
                      <CardHeader className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">{item.role}</Badge>
                          <Badge variant="outline">{item.level}</Badge>
                        </div>
                        <CardTitle className="text-xl">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm leading-7 text-muted-foreground">
                          {item.summary}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              요청 전 체크리스트
            </h2>
            <div className="grid gap-3">
              {playbook.checklist.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-border/70 bg-background/70 px-4 py-4"
                >
                  <CheckCircle2 className="mt-0.5 size-5 text-primary" />
                  <p className="text-sm leading-7 text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <Callout type="info" title="활용 팁">
            플레이북은 그대로 복붙해도 되지만, 실제 프로젝트 맥락과 제약 조건을
            덧붙일수록 결과가 더 좋아집니다.
          </Callout>
        </section>

        <footer className="mt-12 border-t border-border/70 pt-8">
          <Link
            href="/playbooks"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary"
          >
            플레이북 목록으로 돌아가기
            <ArrowRight className="size-4" />
          </Link>
        </footer>
      </article>
    </main>
  );
}
