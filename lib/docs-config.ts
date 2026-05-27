export const DOC_CATEGORIES = ["ui-ux", "frontend", "backend"] as const;

export type DocCategory = (typeof DOC_CATEGORIES)[number];

export const DOC_CATEGORY_LABELS: Record<DocCategory, string> = {
  "ui-ux": "UI/UX",
  frontend: "프론트엔드",
  backend: "백엔드",
};
