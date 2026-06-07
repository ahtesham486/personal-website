import { siteConfig, faqItems, workProjects } from "@/data/siteConfig";
import type { BlogPostMeta } from "@/lib/blog";

export type FaqSchemaItem = { question: string; answer: string };

export function absoluteUrl(path: string) {
  return `${siteConfig.siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    alternateName: siteConfig.alternateNames,
    url: siteConfig.siteUrl,
    email: siteConfig.email,
    jobTitle: siteConfig.jobTitle,
    worksFor: { "@type": "Organization", name: "Freelance" },
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.city,
      addressCountry: siteConfig.location.countryCode,
    },
    knowsAbout: [
      "Python",
      "Django",
      "Flask",
      "n8n",
      "AI Agents",
      "WhatsApp Bots",
      "Web Scraping",
      "SEO",
      "AEO",
      "GEO",
      "WordPress",
      "Custom Website Development",
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

export function faqSchema(items: FaqSchemaItem[] = faqItems) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function professionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${siteConfig.name} — Development Services`,
    url: absoluteUrl("/services"),
    description:
      "Custom website development, WhatsApp AI chatbots, n8n automation, AI agents, Python APIs, and SEO/AEO/GEO in Pakistan.",
    areaServed: { "@type": "Country", name: "Pakistan" },
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.city,
      addressCountry: siteConfig.location.countryCode,
    },
    provider: personSchema(),
    knowsAbout: [
      "Custom website development",
      "WhatsApp chatbot development",
      "n8n workflow automation",
      "Python backend development",
      "SEO AEO GEO optimization",
    ],
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
    image: post.cover ? absoluteUrl(post.cover) : absoluteUrl("/images/og-brand.svg"),
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
    author: { "@type": "Person", name: siteConfig.name },
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
