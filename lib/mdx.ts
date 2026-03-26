import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import { getCasebooks } from "@/lib/casebooks";
import {
  DOC_CATEGORIES,
  DOC_CATEGORY_LABELS,
  type DocCategory,
} from "@/lib/docs-config";
import { getFeatureGuides } from "@/lib/guides";
import { getComparisonHubItems, getScenarioHubItems } from "@/lib/hubs";
import { getOperationGuides } from "@/lib/operations";
import { getPlaybooks } from "@/lib/playbooks";
import { ROLE_PATHS, SITE_UPDATED_AT } from "@/lib/site-config";
import { getWorkouts } from "@/lib/workouts";

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

export type DocEntry = DocFrontmatter &
  InventoryMeta & {
    slug: string;
    href: string;
    order: number;
    difficulty: DocDifficulty;
    roleTargets: DocRoleTarget[];
    relatedSlugs: string[];
    updatedAt: string;
    readingTime: number;
    aliases: string[];
  };

export type SearchRecord = {
  title: string;
  description: string;
  category: string;
  tags: string[];
  href: string;
  priority: DocPriority;
  prerequisites: string[];
  order: number;
  difficulty: DocDifficulty;
  roleTargets: DocRoleTarget[];
  aliases: string[];
  updatedAt: string;
  kind:
    | "docs"
    | "playbooks"
    | "guides"
    | "casebooks"
    | "workouts"
    | "operations"
    | "hubs";
  categoryLabel: string;
};

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
const shouldUseProcessCache = process.env.NODE_ENV === "production";
let allDocsMetaCache: DocEntry[] | null = null;
let searchIndexCache: SearchRecord[] | null = null;

const DOC_ALIAS_MAP: Record<string, string[]> = {
  modal: ["팝업", "오버레이", "겹침 창"],
  toast: ["알림", "토스트 메시지", "상태 알림"],
  dialog: ["확인창", "대화상자"],
  drawer: ["사이드 패널", "슬라이드 패널"],
  dropdown: ["선택 메뉴", "드롭다운 메뉴"],
  "search-bar": ["검색창", "검색 입력"],
  "state-management": ["상태값", "state", "상태 관리"],
  "auth-flow": ["인증", "로그인 흐름", "인증 플로우"],
  api: ["백엔드", "서버 통신"],
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
  const targets = ROLE_PATHS.filter((pathItem) =>
    pathItem.slugs.some((item) => item === slug),
  ).map((pathItem) => pathItem.role) as DocRoleTarget[];

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
      prerequisitesColumn === "없음"
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
  if (shouldUseProcessCache && allDocsMetaCache) {
    return allDocsMetaCache;
  }

  const inventoryOrderMap = getInventoryOrderMap();
  const inventoryMetaMap = getInventoryMetaMap();

  const baseDocs = getAllDocPaths()
    .map((filePath) => {
      const { frontmatter, slug, content } = parseDocFile(filePath);
      const inventoryMeta = inventoryMetaMap.get(slug);
      const order = inventoryOrderMap.get(slug);

      if (!inventoryMeta || order === undefined) {
        throw new Error(
          `마스터 인벤토리에서 문서 메타를 찾을 수 없습니다: ${slug}`,
        );
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

  const computedDocs = baseDocs.map((doc) => ({
    ...doc,
    relatedSlugs: getRelatedSlugs(
      baseDocs,
      doc.slug,
      doc.category,
      doc.prerequisites,
    ),
  }));

  if (shouldUseProcessCache) {
    allDocsMetaCache = computedDocs;
  }

  return computedDocs;
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
  if (shouldUseProcessCache && searchIndexCache) {
    return searchIndexCache;
  }

  const docs = getAllDocsMeta().map(
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
      updatedAt,
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
      updatedAt,
      kind: "docs" as const,
      categoryLabel: DOC_CATEGORY_LABELS[category],
    }),
  );

  const playbooks = getPlaybooks().map((playbook, index) => ({
    title: playbook.title,
    description: playbook.summary,
    category: "playbooks",
    tags: [playbook.role, playbook.level, "플레이북", "실전 시나리오"],
    href: `/playbooks/${playbook.slug}`,
    priority: playbook.level === "입문" ? ("P1" as const) : ("P2" as const),
    prerequisites: playbook.docs,
    order: 10_000 + index,
    difficulty: playbook.level,
    roleTargets: [playbook.role],
    aliases: [
      playbook.slug,
      ...playbook.docs,
      playbook.role,
      "AI IDE",
      "작업 교과서",
      "실전 플레이북",
    ],
    updatedAt: SITE_UPDATED_AT,
    kind: "playbooks" as const,
    categoryLabel: "플레이북",
  }));

  const guides = getFeatureGuides().map((guide, index) => ({
    title: guide.title,
    description: guide.summary,
    category: "guides",
    tags: [...guide.audience, guide.level, "기능 가이드"],
    href: `/guides/${guide.slug}`,
    priority: guide.level === "입문" ? ("P1" as const) : ("P2" as const),
    prerequisites: guide.docs,
    order: 20_000 + index,
    difficulty: guide.level,
    roleTargets: guide.audience,
    aliases: [
      guide.slug,
      ...guide.docs,
      ...guide.playbooks,
      "기능 가이드",
      "구현 가이드",
    ],
    updatedAt: SITE_UPDATED_AT,
    kind: "guides" as const,
    categoryLabel: "기능 가이드",
  }));

  const casebooks = getCasebooks().map((casebook, index) => ({
    title: casebook.title,
    description: casebook.summary,
    category: "casebooks",
    tags: [...casebook.roles, casebook.level, "사례집", "완성형 사례", "프로젝트 사례"],
    href: `/casebooks/${casebook.slug}`,
    priority: casebook.level === "입문" ? ("P1" as const) : ("P2" as const),
    prerequisites: [...casebook.docs, ...casebook.playbooks, ...casebook.guides],
    order: 30_000 + index,
    difficulty: casebook.level,
    roleTargets: casebook.roles,
    aliases: [
      casebook.slug,
      ...casebook.docs,
      ...casebook.playbooks,
      ...casebook.guides,
      ...(casebook.workouts ?? []),
      ...casebook.roles,
      "사례집",
      "완성형 사례",
      "프로젝트 사례",
    ],
    updatedAt: SITE_UPDATED_AT,
    kind: "casebooks" as const,
    categoryLabel: "프로젝트 사례집",
  }));

  const workouts = getWorkouts().map((workout, index) => ({
    title: workout.title,
    description: workout.problem,
    category: "workouts",
    tags: [workout.role, workout.level, "실습", "훈련"],
    href: `/workouts/${workout.slug}`,
    priority: workout.level === "입문" ? ("P1" as const) : ("P2" as const),
    prerequisites: [
      ...workout.docs,
      ...workout.playbooks,
      ...workout.guides,
      ...workout.casebooks,
    ],
    order: 40_000 + index,
    difficulty: workout.level,
    roleTargets: [workout.role],
    aliases: [
      workout.slug,
      ...workout.docs,
      ...workout.guides,
      ...workout.casebooks,
      workout.role,
      "실습",
      "훈련",
      "요청 개선",
    ],
    updatedAt: SITE_UPDATED_AT,
    kind: "workouts" as const,
    categoryLabel: "실습 훈련",
  }));

  const operations = getOperationGuides().map((guide, index) => ({
    title: guide.title,
    description: guide.summary,
    category: "operations",
    tags: [...guide.roleTargets, guide.level, "운영 가이드", "AI IDE 운영"],
    href: `/operations/${guide.slug}`,
    priority: guide.level === "입문" ? ("P1" as const) : ("P2" as const),
    prerequisites: [
      ...guide.docs,
      ...guide.playbooks,
      ...guide.guides,
      ...guide.casebooks,
      ...guide.workouts,
    ],
    order: 45_000 + index,
    difficulty: guide.level,
    roleTargets: guide.roleTargets,
    aliases: [
      guide.slug,
      ...guide.docs,
      ...guide.playbooks,
      ...guide.guides,
      ...guide.casebooks,
      ...guide.workouts,
      "수정 요청",
      "검증",
      "리뷰",
      "코드베이스 읽기",
      "작업 분해",
    ],
    updatedAt: SITE_UPDATED_AT,
    kind: "operations" as const,
    categoryLabel: "운영 가이드",
  }));

  const comparisonHubs = getComparisonHubItems().map((item, index) => ({
    title: item.title,
    description: item.summary,
    category: "hubs",
    tags: ["비교 허브", "개념 비교"],
    href: `/compare#${item.slug}`,
    priority: "P2" as const,
    prerequisites: item.docs,
    order: 50_000 + index,
    difficulty: "입문" as const,
    roleTargets: ["기획자", "디자이너", "주니어 개발자"] as DocRoleTarget[],
    aliases: [item.slug, ...item.docs, "비교", "헷갈리는 개념", item.confusedWith],
    updatedAt: SITE_UPDATED_AT,
    kind: "hubs" as const,
    categoryLabel: "비교 허브",
  }));

  const scenarioHubs = getScenarioHubItems().map((item, index) => ({
    title: item.title,
    description: item.summary,
    category: "hubs",
    tags: ["상황 허브", "추천 경로"],
    href: `/scenarios#${item.slug}`,
    priority: "P1" as const,
    prerequisites: [
      ...item.docs,
      ...item.guides,
      ...item.casebooks,
      ...item.workouts,
    ],
    order: 60_000 + index,
    difficulty: "입문" as const,
    roleTargets: ["기획자", "디자이너", "주니어 개발자"] as DocRoleTarget[],
    aliases: [
      item.slug,
      ...item.docs,
      ...item.guides,
      ...item.casebooks,
      ...item.workouts,
      "상황 허브",
      "무엇부터 읽을까",
      "추천 경로",
    ],
    updatedAt: SITE_UPDATED_AT,
    kind: "hubs" as const,
    categoryLabel: "상황 허브",
  }));

  const computedIndex = [
    ...docs,
    ...playbooks,
    ...guides,
    ...casebooks,
    ...workouts,
    ...operations,
    ...comparisonHubs,
    ...scenarioHubs,
  ];

  if (shouldUseProcessCache) {
    searchIndexCache = computedIndex;
  }

  return computedIndex;
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
