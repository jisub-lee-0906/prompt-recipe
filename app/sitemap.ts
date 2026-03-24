import type { MetadataRoute } from "next";

import { getAllDocsMeta } from "@/lib/mdx";
import { SITE_URL } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const docs = getAllDocsMeta();
  const baseDate = new Date("2026-03-24");

  return [
    {
      url: SITE_URL,
      lastModified: baseDate,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/docs/ui-ux`,
      lastModified: baseDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/docs/frontend`,
      lastModified: baseDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/docs/backend`,
      lastModified: baseDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...docs.map((doc) => ({
      url: `${SITE_URL}${doc.href}`,
      lastModified: baseDate,
      changeFrequency: "monthly" as const,
      priority: doc.priority === "P1" ? 0.8 : doc.priority === "P2" ? 0.7 : 0.6,
    })),
  ];
}
