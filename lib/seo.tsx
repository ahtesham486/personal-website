import { siteConfig, faqItems, workProjects } from "@/data/siteConfig";
import type { BlogPostMeta } from "@/lib/blog";

export function absoluteUrl(path: string) {
  return `${siteConfig.siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    email: siteConfig.email,
    jobTitle: "Python Developer & AI Automation Specialist",
    knowsAbout: [
      "Python",
      "Django",
      "Flask",
      "AI Agents",
      "WhatsApp Bots",
      "Web Scraping",
      "SEO",
      "AEO",
      "GEO",
      "WordPress",
    ],
    sameAs: [siteConfig.linkedin, siteConfig.github],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${siteConfig.name} Portfolio`,
    url: siteConfig.siteUrl,
    description: siteConfig.tagline,
    inLanguage: "en",
    author: { "@type": "Person", name: siteConfig.name },
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function blogPostingSchema(post: BlogPostMeta) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Person", name: siteConfig.name },
    url: absoluteUrl(`/blog/${post.slug}`),
    image: post.cover ? absoluteUrl(post.cover) : absoluteUrl("/images/work-python-api.webp"),
  };
}

export function projectSchema(project: (typeof workProjects)[number]) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: absoluteUrl(`/work/${project.slug}`),
    image: absoluteUrl(project.image),
    keywords: project.tools,
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
