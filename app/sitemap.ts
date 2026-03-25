import type { MetadataRoute } from "next";

import { getCasebooks } from "@/lib/casebooks";
import { getFeatureGuides } from "@/lib/guides";
import { getAllDocsMeta } from "@/lib/mdx";
import { getPlaybooks } from "@/lib/playbooks";
import { SITE_URL } from "@/lib/site-config";
import { getWorkouts } from "@/lib/workouts";

export default function sitemap(): MetadataRoute.Sitemap {
  const casebooks = getCasebooks();
  const docs = getAllDocsMeta();
  const playbooks = getPlaybooks();
  const guides = getFeatureGuides();
  const workouts = getWorkouts();
  const baseDate = new Date("2026-03-25");

  return [
    { url: SITE_URL, lastModified: baseDate, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/tracks`, lastModified: baseDate, changeFrequency: "weekly", priority: 0.98 },
    { url: `${SITE_URL}/playbooks`, lastModified: baseDate, changeFrequency: "weekly", priority: 0.96 },
    { url: `${SITE_URL}/guides`, lastModified: baseDate, changeFrequency: "weekly", priority: 0.96 },
    { url: `${SITE_URL}/casebooks`, lastModified: baseDate, changeFrequency: "weekly", priority: 0.97 },
    { url: `${SITE_URL}/workouts`, lastModified: baseDate, changeFrequency: "weekly", priority: 0.97 },
    { url: `${SITE_URL}/compare`, lastModified: baseDate, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/scenarios`, lastModified: baseDate, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/docs/ui-ux`, lastModified: baseDate, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/docs/frontend`, lastModified: baseDate, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/docs/backend`, lastModified: baseDate, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/updates`, lastModified: baseDate, changeFrequency: "weekly", priority: 0.75 },
    ...docs.map((doc) => ({
      url: `${SITE_URL}${doc.href}`,
      lastModified: baseDate,
      changeFrequency: "monthly" as const,
      priority: doc.priority === "P1" ? 0.82 : doc.priority === "P2" ? 0.72 : 0.62,
    })),
    ...playbooks.map((playbook) => ({
      url: `${SITE_URL}/playbooks/${playbook.slug}`,
      lastModified: baseDate,
      changeFrequency: "monthly" as const,
      priority: playbook.level === "입문" ? 0.84 : 0.74,
    })),
    ...guides.map((guide) => ({
      url: `${SITE_URL}/guides/${guide.slug}`,
      lastModified: baseDate,
      changeFrequency: "monthly" as const,
      priority: guide.level === "입문" ? 0.86 : 0.76,
    })),
    ...casebooks.map((casebook) => ({
      url: `${SITE_URL}/casebooks/${casebook.slug}`,
      lastModified: baseDate,
      changeFrequency: "monthly" as const,
      priority: casebook.level === "입문" ? 0.88 : 0.78,
    })),
    ...workouts.map((workout) => ({
      url: `${SITE_URL}/workouts/${workout.slug}`,
      lastModified: baseDate,
      changeFrequency: "monthly" as const,
      priority: workout.level === "입문" ? 0.84 : 0.74,
    })),
  ];
}
