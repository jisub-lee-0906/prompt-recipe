import type { MetadataRoute } from "next";

import { getFeatureGuides } from "@/lib/guides";
import { getAllDocsMeta } from "@/lib/mdx";
import { getPlaybooks } from "@/lib/playbooks";
import { SITE_URL } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const docs = getAllDocsMeta();
  const playbooks = getPlaybooks();
  const guides = getFeatureGuides();
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
    {
      url: `${SITE_URL}/playbooks`,
      lastModified: baseDate,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/guides`,
      lastModified: baseDate,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/tracks`,
      lastModified: baseDate,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/compare`,
      lastModified: baseDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/updates`,
      lastModified: baseDate,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    ...docs.map((doc) => ({
      url: `${SITE_URL}${doc.href}`,
      lastModified: baseDate,
      changeFrequency: "monthly" as const,
      priority: doc.priority === "P1" ? 0.8 : doc.priority === "P2" ? 0.7 : 0.6,
    })),
    ...playbooks.map((playbook) => ({
      url: `${SITE_URL}/playbooks/${playbook.slug}`,
      lastModified: baseDate,
      changeFrequency: "monthly" as const,
      priority: playbook.level === "입문" ? 0.82 : 0.72,
    })),
    ...guides.map((guide) => ({
      url: `${SITE_URL}/guides/${guide.slug}`,
      lastModified: baseDate,
      changeFrequency: "monthly" as const,
      priority: guide.level === "입문" ? 0.84 : 0.74,
    })),
  ];
}
