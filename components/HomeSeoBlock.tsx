import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";

export default function HomeSeoBlock() {
  return (
    <section className="home-seo" aria-label="Services overview">
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
      <p className="home-seo-links">
        <Link href="/services">View services &amp; pricing</Link>
        {" · "}
        <Link href="/about">About {siteConfig.name}</Link>
        {" · "}
        <Link href="/contact">Contact</Link>
      </p>
    </section>
  );
}
