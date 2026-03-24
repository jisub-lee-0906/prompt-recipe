import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DOC_CATEGORIES,
  DOC_CATEGORY_LABELS,
  type DocCategory,
} from "@/lib/docs-config";
import { getDocsByCategory, getDocsBySlugs } from "@/lib/mdx";
import { CATEGORY_META } from "@/lib/site-config";

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

function isDocCategory(value: string): value is DocCategory {
  return DOC_CATEGORIES.includes(value as DocCategory);
}

export async function generateStaticParams() {
  return DOC_CATEGORIES.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;

  if (!isDocCategory(category)) {
    return {
      title: "카테고리를 찾을 수 없습니다",
    };
  }

  return {
    title: `${DOC_CATEGORY_LABELS[category]} 문서`,
    description: CATEGORY_META[category].description,
    alternates: {
      canonical: `/docs/${category}`,
    },
    openGraph: {
      title: `${DOC_CATEGORY_LABELS[category]} 문서`,
      description: CATEGORY_META[category].description,
      url: `/docs/${category}`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  if (!isDocCategory(category)) {
    notFound();
  }

  const docs = getDocsByCategory(category);
  const starterDocs = docs.slice(0, 3);
  const prerequisiteDocs = getDocsBySlugs(
    docs.flatMap((doc) => doc.prerequisites).filter(Boolean),
  );
  const prerequisiteMap = new Map(prerequisiteDocs.map((doc) => [doc.slug, doc]));

  return (
    <div className="mx-auto w-full max-w-[1180px] space-y-8">
      <section className="rounded-[2rem] border border-border/70 bg-card/70 px-6 py-8 shadow-sm backdrop-blur sm:px-10 sm:py-10">
        <div className="space-y-5">
          <Badge variant="secondary" className="w-fit">
            {DOC_CATEGORY_LABELS[category]}
          </Badge>
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {DOC_CATEGORY_LABELS[category]} 문서
            </h1>
            <p className="max-w-3xl text-base leading-8 text-muted-foreground">
              {CATEGORY_META[category].description}
            </p>
          </div>
          {docs[0] ? (
            <Link href={docs[0].href}>
              <Button>
                첫 문서부터 읽기
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          ) : null}
        </div>
      </section>

      <section className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">추천 시작 경로</h2>
          <p className="text-sm leading-7 text-muted-foreground">
            이 카테고리를 처음 읽는 사용자가 순서대로 따라가기 좋은 문서입니다.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {starterDocs.map((doc, index) => (
            <Link
              key={doc.slug}
              href={doc.href}
              className="rounded-[1.5rem] border border-border/70 bg-card/80 px-5 py-5 transition-colors hover:bg-muted/60"
            >
              <div className="flex items-center gap-2">
                <Badge variant="outline">{String(index + 1).padStart(2, "0")}</Badge>
                <Badge variant="secondary">{doc.priority}</Badge>
                <Badge variant="outline">{doc.difficulty}</Badge>
              </div>
              <p className="mt-3 font-semibold">{doc.title}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {doc.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-4">
        {docs.map((doc, index) => (
          <Link key={doc.href} href={doc.href}>
            <Card className="rounded-[1.75rem] border border-border/70 bg-card/80 py-0 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg">
              <CardHeader className="space-y-4 px-6 py-6">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="outline">{String(index + 1).padStart(2, "0")}</Badge>
                  <Badge variant="secondary">{doc.priority}</Badge>
                  <Badge variant="outline">{doc.difficulty}</Badge>
                  <CardTitle className="text-xl">{doc.title}</CardTitle>
                </div>
                <p className="text-sm leading-7 text-muted-foreground">
                  {doc.description}
                </p>
              </CardHeader>
              <CardContent className="space-y-3 border-t border-border/70 px-6 py-4">
                <div className="flex flex-wrap gap-2">
                  {doc.prerequisites.length > 0 ? (
                    doc.prerequisites.map((slug) => {
                      const prerequisite = prerequisiteMap.get(slug);

                      return (
                        <Badge key={slug} variant="outline">
                          선행: {prerequisite?.title ?? slug}
                        </Badge>
                      );
                    })
                  ) : (
                    <Badge variant="outline">선행 개념 없음</Badge>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {doc.roleTargets.map((role) => (
                    <Badge key={role} variant="secondary">
                      {role}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  );
}
