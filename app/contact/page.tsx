import Link from "next/link";
import type { Metadata } from "next";
import { MdArrowOutward, MdCopyright } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa6";
import ContentHeader from "@/components/ContentHeader";
import FaqSection from "@/components/FaqSection";
import { siteConfig, faqItems, locationFull } from "@/data/siteConfig";
import { JsonLd, absoluteUrl, faqSchema } from "@/lib/seo";
import "@/styles/content-pages.css";
import "@/styles/faq.css";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${siteConfig.name} for Python development, AI automation, WhatsApp bots, and SEO/AEO/GEO projects.`,
  alternates: { canonical: absoluteUrl("/contact") },
  openGraph: {
    title: `Contact ${siteConfig.name}`,
    description: siteConfig.tagline,
    url: absoluteUrl("/contact"),
  },
};

export default function ContactPage() {
  const waUrl = `${siteConfig.whatsappUrl}?text=${encodeURIComponent(
    "Hi Ahtasham, I want to discuss a project."
  )}`;

  return (
    <div className="content-page contact-page">
      <JsonLd data={faqSchema(faqItems)} />
      <ContentHeader />

      <main className="content-main contact-page-main" id="contact">
        <h1>Contact</h1>
        <p className="content-lead">
          Discuss a Python backend, AI automation, WhatsApp bot, or SEO/AEO/GEO project — email or
          WhatsApp for a quote.
        </p>

        <div className="contact-page-grid">
          <section className="contact-page-card">
            <h2>Email</h2>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </section>

          <section className="contact-page-card">
            <h2>WhatsApp</h2>
            <a href={waUrl} target="_blank" rel="noopener noreferrer">
              Products &amp; quotes <FaWhatsapp />
            </a>
          </section>

          <section className="contact-page-card">
            <h2>Address</h2>
            <p>{locationFull}</p>
          </section>

          <section className="contact-page-card">
            <h2>Social</h2>
            <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="contact-social">
              LinkedIn <MdArrowOutward />
            </a>
          </section>
        </div>

        <FaqSection />
      </main>

      <footer className="contact-page-footer">
        <p>
          Designed and developed by <span>{siteConfig.name}</span>
        </p>
        <p>
          <MdCopyright /> {siteConfig.year}
        </p>
      </footer>
    </div>
  );
}
