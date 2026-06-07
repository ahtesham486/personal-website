import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/siteConfig";

export const dynamic = "force-static";

/** Single clean ruleset — avoid duplicate User-agent blocks (Cloudflare may prepend its own block; disable AI blocks in CF dashboard → Security → Bots). */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
  };
}
