import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";
import AgentWebMCP from "@/components/AgentWebMCP";
import { siteConfig } from "@/data/siteConfig";
import { JsonLd, OG_IMAGE, absoluteUrl, faqSchema, personSchema, websiteSchema } from "@/lib/seo";

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
  return (
    <>
      <JsonLd data={[personSchema(), websiteSchema(), faqSchema()]} />
      <AgentWebMCP />
      <HomeClient />
      <section className="seo-home-block" aria-label="Services overview">
        <h2>Custom website developer in Pakistan</h2>
        <p>
          {siteConfig.name}, also known as {siteConfig.alternateNames.join(" and ")}, is a Python
          &amp; AI automation expert based in {siteConfig.location.city}. Services include custom
          ecommerce websites, WhatsApp chatbot development for Lahore and international clients, n8n
          workflow automation, AI agents, web scraping, and SEO/AEO/GEO visibility.
        </p>
        <h2>WhatsApp chatbot developer · n8n automation specialist</h2>
        <p>
          Hire a WhatsApp chatbot developer in Pakistan for sales, support, and order flows. n8n
          workflow automation connects your email, spreadsheets, CRM, and APIs — built with production
          Python backends, not fragile prototypes.
        </p>
        <p>
          <a href={absoluteUrl("/services")}>View services &amp; pricing</a>
          {" · "}
          <a href={absoluteUrl("/about")}>About {siteConfig.name}</a>
          {" · "}
          <a href={absoluteUrl("/contact")}>Contact</a>
        </p>
      </section>
    </>
  );
}
