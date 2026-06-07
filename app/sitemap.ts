import type { MetadataRoute } from "next";
import { getAllPostSlugs } from "@/lib/blog";
import { workProjects, siteConfig } from "@/data/siteConfig";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.siteUrl;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.95 },
    { url: `${base}/services`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.95 },
    { url: `${base}/why-me`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/work`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/404`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
  ];

  const blogRoutes = getAllPostSlugs().map((slug) => ({
    url: `${base}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const workRoutes = workProjects.map((p) => ({
    url: `${base}/work/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  return [...staticRoutes, ...blogRoutes, ...workRoutes];
}
