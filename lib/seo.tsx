import { siteConfig, faqItems, workProjects } from "@/data/siteConfig";
import type { BlogPostMeta } from "@/lib/blog";

export type FaqSchemaItem = { question: string; answer: string };

export const OG_IMAGE_PATH = "/opengraph-image";
export const PROFILE_IMAGE_PATH = siteConfig.profileImage;
export const OG_IMAGE = {
  url: OG_IMAGE_PATH,
  width: 1200,
  height: 630,
  alt: `${siteConfig.name} — Python Developer & AI Automation Expert`,
};

export function absoluteUrl(path: string) {
  return `${siteConfig.siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

function postalAddressSchema() {
  return {
    "@type": "PostalAddress",
    streetAddress: siteConfig.location.streetAddress,
    addressLocality: siteConfig.location.city,
    addressRegion: siteConfig.location.region,
    postalCode: siteConfig.location.postalCode,
    addressCountry: siteConfig.location.countryCode,
  };
}

const PERSON_ID = `${siteConfig.siteUrl}/#person`;

function personSchemaCore() {
  const { city, secondaryCity, country } = siteConfig.location;
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: siteConfig.name,
    alternateName: ["Ahtesham Aslam", "Ahtsham Aslam", "Ehtisham Aslam"],
    url: siteConfig.siteUrl,
    image: absoluteUrl(PROFILE_IMAGE_PATH),
    email: siteConfig.email,
    telephone: `+${siteConfig.whatsappNumber}`,
    jobTitle: siteConfig.jobTitle,
    description:
      "Pakistani Python developer and AI automation specialist. Also known as Ahtesham Aslam, Ehtisham Aslam, or Ahtsham Aslam.",
    worksFor: { "@type": "Organization", name: "Freelance" },
    address: postalAddressSchema(),
    nationality: { "@type": "Country", name: country },
    knowsAbout: [
      "Python Automation",
      "AI Integration",
      "n8n Workflow Automation",
      "WhatsApp Chatbot Development",
      "Django",
      "FastAPI",
      "LLM Integration",
    ],
    sameAs: [siteConfig.wikidata, siteConfig.linkedin, siteConfig.github],
  };
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    ...personSchemaCore(),
  };
}

export function profilePageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": absoluteUrl("/about"),
    url: absoluteUrl("/about"),
    name: `About ${siteConfig.name}`,
    description: `Profile of ${siteConfig.name} — Python developer and AI automation specialist in ${siteConfig.location.country}.`,
    mainEntity: { "@id": PERSON_ID },
    isPartOf: { "@type": "WebSite", url: siteConfig.siteUrl, name: `${siteConfig.name} Portfolio` },
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
    author: { "@id": PERSON_ID },
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${siteConfig.name} — Python & AI Development`,
    description:
      "Custom websites, WhatsApp AI chatbots, n8n automation, Python APIs, and SEO/AEO/GEO services in Pakistan.",
    url: siteConfig.siteUrl,
    image: absoluteUrl(OG_IMAGE_PATH),
    logo: absoluteUrl("/icon.svg"),
    email: siteConfig.email,
    telephone: `+${siteConfig.whatsappNumber}`,
    priceRange: "$$",
    areaServed: ["Pakistan", "Gulf", "Europe", "North America"],
    address: postalAddressSchema(),
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.location.latitude,
      longitude: siteConfig.location.longitude,
    },
    sameAs: [siteConfig.wikidata, siteConfig.linkedin, siteConfig.github],
    founder: { "@id": PERSON_ID },
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
    image: absoluteUrl(OG_IMAGE_PATH),
    logo: absoluteUrl("/icon.svg"),
    telephone: `+${siteConfig.whatsappNumber}`,
    priceRange: "$$",
    serviceType: [
      "Custom Website Development",
      "WhatsApp Chatbot Development",
      "n8n Workflow Automation",
      "Python Backend Development",
      "SEO AEO GEO Optimization",
    ],
    areaServed: ["Pakistan", "Gulf", "Europe", "North America"],
    address: postalAddressSchema(),
    provider: { "@id": PERSON_ID },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
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
    dateModified: post.date,
    author: { "@type": "Person", name: siteConfig.name, url: siteConfig.siteUrl },
    publisher: { "@type": "Person", name: siteConfig.name },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    url: absoluteUrl(`/blog/${post.slug}`),
    image: post.cover ? absoluteUrl(post.cover) : absoluteUrl(OG_IMAGE_PATH),
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
    author: { "@type": "Person", name: siteConfig.name, url: siteConfig.siteUrl },
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
