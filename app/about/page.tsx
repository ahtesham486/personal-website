import Link from "next/link";
import type { Metadata } from "next";
import { MdCopyright } from "react-icons/md";
import ContentHeader from "@/components/ContentHeader";
import FaqDetails from "@/components/FaqDetails";
import { aboutPageContent, aboutPageMeta } from "@/data/aboutPage";
import { siteConfig, faqItems } from "@/data/siteConfig";
import { JsonLd, absoluteUrl, faqSchema, personSchema } from "@/lib/seo";
import "@/styles/content-pages.css";
import "@/styles/faq.css";

export const metadata: Metadata = {
  title: aboutPageMeta.title,
  description: aboutPageMeta.description,
  keywords: [
    "Ahtasham Aslam",
    "Ahtesham Aslam",
    "Ehtisham Aslam",
    "Python developer Lahore",
    "WhatsApp chatbot developer Pakistan",
    "custom website developer Pakistan",
    "n8n automation expert",
  ],
  alternates: { canonical: absoluteUrl("/about") },
  openGraph: {
    title: aboutPageMeta.title,
    description: aboutPageMeta.description,
    url: absoluteUrl("/about"),
    images: [{ url: "/images/og-brand.svg", width: 1200, height: 630, alt: siteConfig.name }],
  },
};

const aboutFaqs = faqItems.slice(0, 4);

export default function AboutPage() {
  return (
    <div className="content-page about-page">
      <JsonLd data={[personSchema(), faqSchema(aboutFaqs)]} />
      <ContentHeader />

      <main className="content-main article-main">
        <h1>About {siteConfig.name}</h1>
        <p className="content-lead">{aboutPageContent.intro}</p>

        <p className="about-aliases">
          <strong>Also known as:</strong> {siteConfig.alternateNames.join(" · ")}
        </p>

        {aboutPageContent.sections.map((section) => (
          <section key={section.heading} className="about-section-block">
            <h2>{section.heading}</h2>
            {section.paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </section>
        ))}

        <div className="about-cta-row">
          <Link href="/services" className="content-cta">
            View services &amp; pricing →
          </Link>
          <Link href="/contact" className="content-link">
            Contact me →
          </Link>
        </div>

        <FaqDetails
          items={aboutFaqs}
          heading="Common questions"
          id="about-faq-heading"
          className="faq-section blog-faq-section"
        />
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
