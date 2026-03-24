import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import { DOC_CATEGORIES, type DocCategory } from "@/lib/docs-config";
import { ROLE_PATHS, SITE_UPDATED_AT } from "@/lib/site-config";

export type DocFrontmatter = {
  title: string;
  description: string;
  category: DocCategory;
  tags: string[];
};

export type DocPriority = "P1" | "P2" | "P3";
export type DocDifficulty = "입문" | "중급" | "심화";
export type DocRoleTarget = "기획자" | "디자이너" | "주니어 개발자";

export type InventoryMeta = {
  priority: DocPriority;
  prerequisites: string[];
  status: string;
};

export type TocHeading = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type DocEntry = DocFrontmatter & {
  slug: string;
  href: string;
  order: number;
  difficulty: DocDifficulty;
  roleTargets: DocRoleTarget[];
  relatedSlugs: string[];
  updatedAt: string;
  readingTime: number;
  aliases: string[];
} & InventoryMeta;

export type SearchRecord = Pick<
  DocEntry,
  | "title"
  | "description"
  | "category"
  | "tags"
  | "href"
  | "priority"
  | "prerequisites"
  | "order"
  | "difficulty"
  | "roleTargets"
  | "aliases"
>;

export type DocDocument = DocEntry & {
  content: string;
  headings: TocHeading[];
};

export type AdjacentDocs = {
  previous: DocEntry | null;
  next: DocEntry | null;
};

export type RecommendedDocs = DocEntry[];

const CONTENT_ROOT = path.join(process.cwd(), "content");
const MASTER_INVENTORY_PATH = path.join(
  process.cwd(),
  "docs",
  "master-inventory.md",
);
const MDX_EXTENSION = ".mdx";

const DOC_ALIAS_MAP: Record<string, string[]> = {
  modal: ["팝업", "오버레이", "레이어 팝업"],
  toast: ["알림", "토스트 메시지", "피드백 메시지"],
  dialog: ["확인창", "대화상자"],
  drawer: ["슬라이드 패널", "사이드 패널"],
  dropdown: ["셀렉트 메뉴", "펼침 메뉴"],
  "search-bar": ["검색창", "검색 입력"],
  "state-management": ["상태값", "state", "상태 관리"],
  "auth-flow": ["인증", "로그인 흐름", "인증 절차"],
  api: ["엔드포인트", "서버 통신"],
  token: ["액세스 토큰", "jwt", "인증 토큰"],
  rbac: ["권한", "역할 기반 권한"],
  "request-response-schema": ["요청 응답", "스키마", "응답 구조"],
};

function assertContentDirectoryExists() {
  if (!fs.existsSync(CONTENT_ROOT)) {
    throw new Error(`content 디렉터리를 찾을 수 없습니다: ${CONTENT_ROOT}`);
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

function estimateReadingTime(content: string) {
  const plainText = content
    .replace(/^---[\s\S]*?---/m, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/[`*_>#-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const wordCount = plainText ? plainText.split(" ").length : 0;
  return Math.max(1, Math.ceil(wordCount / 180));
}

function priorityToDifficulty(priority: DocPriority): DocDifficulty {
  if (priority === "P1") return "입문";
  if (priority === "P2") return "중급";
  return "심화";
}

function getRoleTargets(slug: string): DocRoleTarget[] {
  const targets = ROLE_PATHS.filter((path) =>
    path.slugs.some((item) => item === slug),
  ).map((path) => path.role) as DocRoleTarget[];

  return targets.length > 0 ? targets : ["주니어 개발자"];
}

function parseDocFile(filePath: string) {
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const title = data.title;
  const description = data.description;
  const category = data.category;
  const tags = data.tags;

  if (typeof title !== "string" || !title.trim()) {
    throw new Error(`title frontmatter가 올바르지 않습니다: ${filePath}`);
  }

  if (typeof description !== "string" || !description.trim()) {
    throw new Error(`description frontmatter가 올바르지 않습니다: ${filePath}`);
  }

  if (!isDocCategory(category)) {
    throw new Error(`category frontmatter가 올바르지 않습니다: ${filePath}`);
  }

  if (
    !Array.isArray(tags) ||
    tags.length === 0 ||
    tags.some((tag) => typeof tag !== "string" || !tag.trim())
  ) {
    throw new Error(`tags frontmatter가 올바르지 않습니다: ${filePath}`);
  }

  const slug = path.basename(filePath, MDX_EXTENSION);

  return {
    frontmatter: {
      title: title.trim(),
      description: description.trim(),
      category,
      tags: tags.map((tag: string) => tag.trim()),
    } satisfies DocFrontmatter,
    content,
    slug,
  };
}

function getInventoryRows() {
  if (!fs.existsSync(MASTER_INVENTORY_PATH)) {
    return [];
  }

  const inventory = fs.readFileSync(MASTER_INVENTORY_PATH, "utf8");
  return inventory.split(/\r?\n/).filter((line) => line.startsWith("|"));
}

function getInventoryOrderMap() {
  const orderMap = new Map<string, number>();
  let order = 0;

  for (const line of getInventoryRows()) {
    const columns = line.split("|").map((value) => value.trim());
    const slugColumn = columns[2];

    if (!slugColumn?.startsWith("`") || !slugColumn.endsWith("`")) {
      continue;
    }

    const slug = slugColumn.slice(1, -1);

    if (!orderMap.has(slug)) {
      orderMap.set(slug, order);
      order += 1;
    }
  }

  return orderMap;
}

function getInventoryMetaMap() {
  const metaMap = new Map<string, InventoryMeta>();

  for (const line of getInventoryRows()) {
    const columns = line.split("|").map((value) => value.trim());

    if (columns.length < 6) {
      continue;
    }

    const slugColumn = columns[2];
    const priority = columns[3] as DocPriority;
    const prerequisitesColumn = columns[4];
    const status = columns[5];

    if (!slugColumn?.startsWith("`") || !slugColumn.endsWith("`")) {
      continue;
    }

    if (!["P1", "P2", "P3"].includes(priority)) {
      continue;
    }

    const slug = slugColumn.slice(1, -1);
    const prerequisites =
      prerequisitesColumn === "없음" || prerequisitesColumn === "?놁쓬"
        ? []
        : prerequisitesColumn
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);

    metaMap.set(slug, {
      priority,
      prerequisites,
      status,
    });
  }

  return metaMap;
}

function getRelatedSlugs(
  allDocs: DocEntry[],
  slug: string,
  category: DocCategory,
  prerequisites: string[],
) {
  const sameCategoryDocs = allDocs
    .filter((doc) => doc.category === category && doc.slug !== slug)
    .slice(0, 2)
    .map((doc) => doc.slug);

  return [...new Set([...prerequisites, ...sameCategoryDocs])];
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
  const inventoryOrderMap = getInventoryOrderMap();
  const inventoryMetaMap = getInventoryMetaMap();

  const baseDocs = getAllDocPaths()
    .map((filePath) => {
      const { frontmatter, slug, content } = parseDocFile(filePath);
      const inventoryMeta = inventoryMetaMap.get(slug);
      const order = inventoryOrderMap.get(slug);

      if (!inventoryMeta || order === undefined) {
        throw new Error(`마스터 인벤토리에서 문서 메타를 찾을 수 없습니다: ${slug}`);
      }

      return {
        ...frontmatter,
        slug,
        href: `/docs/${frontmatter.category}/${slug}`,
        order,
        ...inventoryMeta,
        difficulty: priorityToDifficulty(inventoryMeta.priority),
        roleTargets: getRoleTargets(slug),
        relatedSlugs: [],
        updatedAt: SITE_UPDATED_AT,
        readingTime: estimateReadingTime(content),
        aliases: DOC_ALIAS_MAP[slug] ?? [],
      } satisfies DocEntry;
    })
    .sort((left, right) => left.order - right.order);

  return baseDocs.map((doc) => ({
    ...doc,
    relatedSlugs: getRelatedSlugs(
      baseDocs,
      doc.slug,
      doc.category,
      doc.prerequisites,
    ),
  }));
}

export function getDocsByCategory(category: DocCategory) {
  return getAllDocsMeta().filter((doc) => doc.category === category);
}

export function getDocsBySlugs(slugs: string[]) {
  if (slugs.length === 0) {
    return [];
  }

  const allDocs = getAllDocsMeta();
  return slugs
    .map((slug) => allDocs.find((doc) => doc.slug === slug) ?? null)
    .filter((doc): doc is DocEntry => doc !== null);
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
  const doc = getAllDocsMeta().find(
    (item) => item.category === category && item.slug === slug,
  );

  if (frontmatter.category !== category) {
    throw new Error(
      `문서 경로와 frontmatter category가 일치하지 않습니다: ${filePath}`,
    );
  }

  if (!doc) {
    throw new Error(`마스터 인벤토리에서 문서 메타를 찾을 수 없습니다: ${slug}`);
  }

  return {
    ...doc,
    content,
    headings: extractHeadings(content),
  };
}

export function getSearchIndex(): SearchRecord[] {
  return getAllDocsMeta().map(
    ({
      title,
      description,
      category,
      tags,
      href,
      priority,
      prerequisites,
      order,
      difficulty,
      roleTargets,
      aliases,
    }) => ({
      title,
      description,
      category,
      tags,
      href,
      priority,
      prerequisites,
      order,
      difficulty,
      roleTargets,
      aliases,
    }),
  );
}

export function getAdjacentDocs(category: DocCategory, slug: string): AdjacentDocs {
  const docs = getDocsByCategory(category);
  const currentIndex = docs.findIndex((doc) => doc.slug === slug);

  if (currentIndex === -1) {
    return {
      previous: null,
      next: null,
    };
  }

  return {
    previous: docs[currentIndex - 1] ?? null,
    next: docs[currentIndex + 1] ?? null,
  };
}

export function getRecommendedNextDocs(
  category: DocCategory,
  slug: string,
  limit = 3,
): RecommendedDocs {
  const docs = getAllDocsMeta();
  const current = docs.find((doc) => doc.category === category && doc.slug === slug);

  if (!current) {
    return [];
  }

  const directDependents = docs.filter((doc) => doc.prerequisites.includes(slug));
  const relatedDocs = getDocsBySlugs(current.relatedSlugs);
  const sameCategoryNext = docs.filter(
    (doc) => doc.category === category && doc.slug !== slug,
  );

  const ordered = [...directDependents, ...relatedDocs, ...sameCategoryNext];
  const unique = new Map<string, DocEntry>();

  for (const doc of ordered) {
    if (doc.slug !== slug && !unique.has(doc.slug)) {
      unique.set(doc.slug, doc);
    }
  }

  return [...unique.values()].slice(0, limit);
}
