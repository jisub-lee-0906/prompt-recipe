import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

export const DOC_CATEGORIES = ["ui-ux", "frontend", "backend"] as const;

export type DocCategory = (typeof DOC_CATEGORIES)[number];

export type DocFrontmatter = {
  title: string;
  description: string;
  category: DocCategory;
  tags: string[];
};

export type TocHeading = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type DocEntry = DocFrontmatter & {
  slug: string;
  href: string;
};

export type SearchRecord = Pick<
  DocEntry,
  "title" | "description" | "category" | "tags" | "href"
>;

export type DocDocument = DocEntry & {
  content: string;
  headings: TocHeading[];
};

const CONTENT_ROOT = path.join(process.cwd(), "content");
const MDX_EXTENSION = ".mdx";

function assertContentDirectoryExists() {
  if (!fs.existsSync(CONTENT_ROOT)) {
    throw new Error(
      `content 디렉터리를 찾을 수 없습니다: ${CONTENT_ROOT}`,
    );
  }
}

function isDocCategory(value: unknown): value is DocCategory {
  return typeof value === "string" && DOC_CATEGORIES.includes(value as DocCategory);
}

function slugifySegment(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[`~!@#$%^&*()_=+[\]{}\\|;:'",.<>/?]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function parseDocFile(filePath: string) {
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const title = data.title;
  const description = data.description;
  const category = data.category;
  const tags = data.tags;

  if (typeof title !== "string" || !title.trim()) {
    throw new Error(`title frontmatter가 잘못되었습니다: ${filePath}`);
  }

  if (typeof description !== "string" || !description.trim()) {
    throw new Error(`description frontmatter가 잘못되었습니다: ${filePath}`);
  }

  if (!isDocCategory(category)) {
    throw new Error(`category frontmatter가 잘못되었습니다: ${filePath}`);
  }

  if (
    !Array.isArray(tags) ||
    tags.length === 0 ||
    tags.some((tag) => typeof tag !== "string" || !tag.trim())
  ) {
    throw new Error(`tags frontmatter가 잘못되었습니다: ${filePath}`);
  }

  const slug = path.basename(filePath, MDX_EXTENSION);

  return {
    frontmatter: {
      title: title.trim(),
      description: description.trim(),
      category,
      tags: tags.map((tag) => tag.trim()),
    } satisfies DocFrontmatter,
    content,
    slug,
  };
}

export function extractHeadings(content: string): TocHeading[] {
  const headings: TocHeading[] = [];
  const matches = content.matchAll(/^(##|###)\s+(.+)$/gm);

  for (const match of matches) {
    const [, hashes, rawText] = match;
    const text = rawText.trim();
    const level = hashes.length as 2 | 3;

    headings.push({
      id: slugifySegment(text),
      text,
      level,
    });
  }

  return headings;
}

export function getAllDocPaths() {
  assertContentDirectoryExists();

  return DOC_CATEGORIES.flatMap((category) => {
    const categoryDirectory = path.join(CONTENT_ROOT, category);

    if (!fs.existsSync(categoryDirectory)) {
      return [];
    }

    return fs
      .readdirSync(categoryDirectory, { withFileTypes: true })
      .filter((entry) => entry.isFile() && entry.name.endsWith(MDX_EXTENSION))
      .map((entry) => path.join(categoryDirectory, entry.name));
  }).sort();
}

export function getAllDocsMeta(): DocEntry[] {
  return getAllDocPaths()
    .map((filePath) => {
      const { frontmatter, slug } = parseDocFile(filePath);

      return {
        ...frontmatter,
        slug,
        href: `/docs/${frontmatter.category}/${slug}`,
      } satisfies DocEntry;
    })
    .sort((left, right) => left.title.localeCompare(right.title, "ko"));
}

export function getDocsByCategory(category: DocCategory) {
  return getAllDocsMeta().filter((doc) => doc.category === category);
}

export function getDocBySlug(
  category: DocCategory,
  slug: string,
): DocDocument | null {
  const filePath = path.join(CONTENT_ROOT, category, `${slug}${MDX_EXTENSION}`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const { frontmatter, content } = parseDocFile(filePath);

  if (frontmatter.category !== category) {
    throw new Error(
      `문서 경로와 frontmatter category가 일치하지 않습니다: ${filePath}`,
    );
  }

  return {
    ...frontmatter,
    slug,
    href: `/docs/${category}/${slug}`,
    content,
    headings: extractHeadings(content),
  };
}

export function getSearchIndex(): SearchRecord[] {
  return getAllDocsMeta().map(
    ({ title, description, category, tags, href }) => ({
      title,
      description,
      category,
      tags,
      href,
    }),
  );
}
