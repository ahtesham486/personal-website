import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";
import { siteConfig } from "@/data/siteConfig";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: `${siteConfig.name} | Python Developer & AI Automation Expert`,
  description:
    "Custom website developer in Pakistan. Python & AI automation expert in Lahore — WhatsApp chatbot developer, n8n workflow automation specialist, and SEO/AEO/GEO consultant.",
  alternates: { canonical: siteConfig.siteUrl },
  openGraph: {
    title: `${siteConfig.name} | Python & AI Automation Expert`,
    description: siteConfig.tagline,
    url: siteConfig.siteUrl,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Python Developer & AI Automation Expert`,
    description: siteConfig.tagline,
    images: [OG_IMAGE.url],
  },
};

export default function HomePage() {
  return <HomeClient />;
}
