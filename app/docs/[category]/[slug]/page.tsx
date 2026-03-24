import type { Metadata } from "next";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, Heart } from "lucide-react";
import { notFound } from "next/navigation";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { Toc } from "@/components/layout/toc";
import { mdxComponents } from "@/components/mdx-components";
import { Badge } from "@/components/ui/badge";
import {
  DOC_CATEGORIES,
  DOC_CATEGORY_LABELS,
  type DocCategory,
} from "@/lib/docs-config";
import {
  getAdjacentDocs,
  getAllDocsMeta,
  getDocBySlug,
  getDocsBySlugs,
  getRecommendedNextDocs,
} from "@/lib/mdx";
import { FEEDBACK_URL, REQUEST_TERM_URL, SITE_NAME } from "@/lib/site-config";

type DocPageProps = {
  params: Promise<{
    category: string;
    slug: string;
  }>;
};

function isDocCategory(value: string): value is DocCategory {
  return DOC_CATEGORIES.includes(value as DocCategory);
}

export async function generateStaticParams() {
  return getAllDocsMeta().map(({ category, slug }) => ({
    category,
    slug,
  }));
}

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const { category, slug } = await params;

  if (!isDocCategory(category)) {
    return {
      title: `문서를 찾을 수 없습니다 | ${SITE_NAME}`,
    };
  }

  const doc = getDocBySlug(category, slug);

  if (!doc) {
    return {
      title: `문서를 찾을 수 없습니다 | ${SITE_NAME}`,
    };
  }

  return {
    title: `${doc.title} | ${SITE_NAME}`,
    description: `${doc.description} 난이도 ${doc.difficulty}, 우선순위 ${doc.priority} 문서입니다.`,
    alternates: {
      canonical: doc.href,
    },
    openGraph: {
      title: doc.title,
      description: doc.description,
      url: doc.href,
    },
  };
}

export default async function DocPage({ params }: DocPageProps) {
  const { category, slug } = await params;

  if (!isDocCategory(category)) {
    notFound();
  }

  const doc = getDocBySlug(category, slug);

  if (!doc) {
    notFound();
  }

  const { previous, next } = getAdjacentDocs(category, slug);
  const prerequisiteDocs = getDocsBySlugs(doc.prerequisites);
  const relatedDocs = getDocsBySlugs(doc.relatedSlugs).filter(
    (item) => item.slug !== doc.slug,
  );
  const recommendedDocs = getRecommendedNextDocs(category, slug, 3);

  return (
    <div className="mx-auto flex w-full max-w-[1180px] gap-8">
      <main className="min-w-0 flex-1">
        <article className="rounded-[2rem] border border-border/70 bg-card/70 px-6 py-8 shadow-sm backdrop-blur sm:px-10 sm:py-10">
          <header className="space-y-5 border-b border-border/70 pb-8">
            <div className="flex flex-wrap gap-2">
              <Link href={`/docs/${doc.category}`}>
                <Badge variant="secondary">{DOC_CATEGORY_LABELS[doc.category]}</Badge>
              </Link>
              <Badge variant="outline">{doc.priority}</Badge>
              <Badge variant="outline">{doc.difficulty}</Badge>
              {doc.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="space-y-3">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {doc.title}
              </h1>
              <p className="max-w-3xl text-base leading-8 text-muted-foreground">
                {doc.description}
              </p>
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1 rounded-full border border-border/70 px-3 py-1">
                  <Clock3 className="size-3.5" />
                  예상 읽기 시간 {doc.readingTime}분
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-border/70 px-3 py-1">
                  <CalendarDays className="size-3.5" />
                  최종 업데이트 {doc.updatedAt}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {prerequisiteDocs.length > 0 ? (
                  prerequisiteDocs.map((item) => (
                    <Link key={item.slug} href={item.href}>
                      <Badge variant="secondary">선행: {item.title}</Badge>
                    </Link>
                  ))
                ) : (
                  <Badge variant="secondary">선행 개념 없음</Badge>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {doc.roleTargets.map((role) => (
                  <Badge key={role} variant="outline">
                    대상: {role}
                  </Badge>
                ))}
              </div>
            </div>
          </header>

          <div className="prose prose-zinc mt-10 max-w-none dark:prose-invert prose-headings:font-semibold prose-pre:bg-transparent prose-pre:p-0 prose-code:before:content-none prose-code:after:content-none">
            <MDXRemote
              source={doc.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    rehypeSlug,
                    [
                      rehypeAutolinkHeadings,
                      {
                        behavior: "append",
                        properties: {
                          className: ["heading-anchor"],
                          "aria-label": "섹션 바로가기",
                        },
                      },
                    ],
                  ],
                },
              }}
            />
          </div>

          {recommendedDocs.length > 0 ? (
            <section className="mt-12 border-t border-border/70 pt-8">
              <div className="space-y-3 pb-5">
                <h2 className="text-2xl font-semibold tracking-tight">
                  다음 추천 학습
                </h2>
                <p className="text-sm leading-7 text-muted-foreground">
                  현재 문서를 읽은 뒤 이어서 보면 좋은 문서를 추천합니다.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {recommendedDocs.map((item) => (
                  <Link
                    key={item.slug}
                    href={item.href}
                    className="rounded-[1.5rem] border border-border/70 bg-background/70 px-5 py-5 transition-colors hover:bg-muted/60"
                  >
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{item.priority}</Badge>
                      <Badge variant="outline">{item.difficulty}</Badge>
                    </div>
                    <p className="mt-3 font-semibold">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          {relatedDocs.length > 0 ? (
            <section className="mt-12 border-t border-border/70 pt-8">
              <div className="space-y-3 pb-5">
                <h2 className="text-2xl font-semibold tracking-tight">
                  같이 읽으면 좋은 문서
                </h2>
                <p className="text-sm leading-7 text-muted-foreground">
                  헷갈리기 쉬운 개념이나 바로 이어서 보면 이해가 쉬운 문서입니다.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {relatedDocs.slice(0, 4).map((item) => (
                  <Link
                    key={item.slug}
                    href={item.href}
                    className="rounded-[1.5rem] border border-border/70 bg-background/70 px-5 py-5 transition-colors hover:bg-muted/60"
                  >
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        {DOC_CATEGORY_LABELS[item.category]}
                      </Badge>
                      <Badge variant="secondary">{item.priority}</Badge>
                    </div>
                    <p className="mt-3 font-semibold">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          <section className="mt-12 border-t border-border/70 pt-8">
            <div className="space-y-3 pb-5">
              <h2 className="text-2xl font-semibold tracking-tight">피드백</h2>
              <p className="text-sm leading-7 text-muted-foreground">
                문서가 도움이 되었는지, 누락된 용어가 있는지 알려주시면 다음
                업데이트에 반영합니다.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={FEEDBACK_URL} className="inline-flex">
                <Badge className="rounded-full px-4 py-2">
                  <Heart className="mr-1 size-3.5" />
                  이 문서가 도움이 되었나요?
                </Badge>
              </a>
              <a href={REQUEST_TERM_URL} className="inline-flex">
                <Badge variant="outline" className="rounded-full px-4 py-2">
                  누락된 용어 요청하기
                </Badge>
              </a>
            </div>
          </section>

          <footer className="mt-12 border-t border-border/70 pt-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {previous ? (
                <Link
                  href={previous.href}
                  className="rounded-[1.5rem] border border-border/70 bg-background/70 px-5 py-5 transition-colors hover:bg-muted/60"
                >
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    <ArrowLeft className="size-3.5" />
                    이전 문서
                  </p>
                  <p className="mt-3 text-base font-semibold">{previous.title}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {previous.description}
                  </p>
                </Link>
              ) : (
                <div className="hidden sm:block" />
              )}

              {next ? (
                <Link
                  href={next.href}
                  className="rounded-[1.5rem] border border-border/70 bg-background/70 px-5 py-5 transition-colors hover:bg-muted/60"
                >
                  <p className="flex items-center justify-end gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    다음 문서
                    <ArrowRight className="size-3.5" />
                  </p>
                  <p className="mt-3 text-base font-semibold">{next.title}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {next.description}
                  </p>
                </Link>
              ) : null}
            </div>
          </footer>
        </article>
      </main>
      <Toc headings={doc.headings} />
    </div>
  );
}
