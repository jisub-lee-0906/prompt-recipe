import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { mdxComponents } from "@/components/mdx-components";
import { Badge } from "@/components/ui/badge";
import {
  DOC_CATEGORIES,
  getAllDocsMeta,
  getDocBySlug,
  type DocCategory,
} from "@/lib/mdx";

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
      title: "문서를 찾을 수 없습니다 | AI 프롬프팅 가이드",
    };
  }

  const doc = getDocBySlug(category, slug);

  if (!doc) {
    return {
      title: "문서를 찾을 수 없습니다 | AI 프롬프팅 가이드",
    };
  }

  return {
    title: `${doc.title} | AI 프롬프팅 가이드`,
    description: doc.description,
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

  return (
    <main className="mx-auto w-full max-w-4xl">
      <article className="rounded-[2rem] border border-border/70 bg-card/70 px-6 py-8 shadow-sm backdrop-blur sm:px-10 sm:py-10">
        <header className="space-y-5 border-b border-border/70 pb-8">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{doc.category}</Badge>
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
      </article>
    </main>
  );
}
