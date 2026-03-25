import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";

import { Callout } from "@/components/mdx/Callout";
import { PromptCodeBlock } from "@/components/mdx/PromptCodeBlock";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getFeatureGuideBySlug, getFeatureGuides } from "@/lib/guides";
import { getDocsBySlugs } from "@/lib/mdx";
import { getPlaybookBySlug, getPlaybooksByRole } from "@/lib/playbooks";

type GuidePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getFeatureGuides().map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getFeatureGuideBySlug(slug);

  if (!guide) {
    return {
      title: "기능 가이드를 찾을 수 없습니다",
    };
  }

  return {
    title: guide.title,
    description: guide.summary,
    alternates: {
      canonical: `/guides/${guide.slug}`,
    },
    openGraph: {
      title: guide.title,
      description: guide.summary,
      url: `/guides/${guide.slug}`,
    },
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getFeatureGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const relatedDocs = getDocsBySlugs(guide.docs);
  const relatedPlaybooks = guide.playbooks
    .map((playbookSlug) => getPlaybookBySlug(playbookSlug))
    .filter((item) => item !== null);
  const primaryAudience = guide.audience[0];
  const nextPlaybooks = primaryAudience
    ? getPlaybooksByRole(primaryAudience).slice(0, 2)
    : [];

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-12">
      <article className="rounded-[2rem] border border-border/70 bg-card/70 px-6 py-8 shadow-sm backdrop-blur sm:px-10 sm:py-10">
        <header className="space-y-5 border-b border-border/70 pb-8">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{guide.level}</Badge>
            {guide.audience.map((role) => (
              <Badge key={role} variant="outline">
                {role}
              </Badge>
            ))}
            <Badge variant="outline">기능 가이드</Badge>
          </div>
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {guide.title}
            </h1>
            <p className="max-w-3xl text-base leading-8 text-muted-foreground">
              {guide.summary}
            </p>
          </div>
        </header>

        <section className="mt-10 space-y-8">
          <Callout type="tip" title="이 가이드의 목표">
            {guide.goal}
          </Callout>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              단계별 구현 흐름
            </h2>
            <div className="grid gap-3">
              {guide.stages.map((stage, index) => (
                <div
                  key={stage}
                  className="rounded-2xl border border-border/70 bg-background/70 px-4 py-4"
                >
                  <div className="flex items-start gap-3">
                    <Badge variant="outline">
                      {String(index + 1).padStart(2, "0")}
                    </Badge>
                    <p className="text-sm leading-7 text-muted-foreground">
                      {stage}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              바로 써볼 수 있는 프롬프트
            </h2>
            {guide.prompts.map((prompt) => (
              <div key={prompt.title} className="space-y-3">
                <p className="text-sm font-medium">{prompt.title}</p>
                <PromptCodeBlock>{prompt.body}</PromptCodeBlock>
              </div>
            ))}
          </div>

          <RelatedSection title="같이 읽어야 하는 문서">
            {relatedDocs.map((doc) => (
              <RelatedCard
                key={doc.slug}
                href={doc.href}
                title={doc.title}
                summary={doc.description}
                badges={[doc.priority, doc.difficulty]}
              />
            ))}
          </RelatedSection>

          <RelatedSection title="관련 플레이북">
            {relatedPlaybooks.map((playbook) => (
              <RelatedCard
                key={playbook.slug}
                href={`/playbooks/${playbook.slug}`}
                title={playbook.title}
                summary={playbook.summary}
                badges={[playbook.role, playbook.level]}
              />
            ))}
          </RelatedSection>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              최종 체크리스트
            </h2>
            <div className="grid gap-3">
              {guide.checklist.map((item) => (
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

          {nextPlaybooks.length > 0 ? (
            <Callout type="info" title="같은 역할의 다음 플레이북">
              {primaryAudience} 관점에서 이어서 보기 좋은 플레이북으로{" "}
              {nextPlaybooks.map((item) => item.title).join(", ")}을 추천합니다.
            </Callout>
          ) : null}
        </section>

        <footer className="mt-12 border-t border-border/70 pt-8">
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary"
          >
            기능 가이드 목록으로 돌아가기
            <ArrowRight className="size-4" />
          </Link>
        </footer>
      </article>
    </main>
  );
}

function RelatedSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <div className="grid gap-4 md:grid-cols-2">{children}</div>
    </div>
  );
}

function RelatedCard({
  href,
  title,
  summary,
  badges,
}: {
  href: string;
  title: string;
  summary: string;
  badges: string[];
}) {
  return (
    <Link href={href}>
      <Card className="rounded-[1.5rem] border border-border/70 bg-background/70 transition-colors hover:bg-muted/60">
        <CardHeader className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {badges.map((badge) => (
              <Badge key={badge} variant="outline">
                {badge}
              </Badge>
            ))}
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-7 text-muted-foreground">{summary}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
