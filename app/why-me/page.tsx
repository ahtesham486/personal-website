import Link from "next/link";
import type { Metadata } from "next";
import { FaWhatsapp } from "react-icons/fa6";
import ContentHeader from "@/components/ContentHeader";
import { servicePackages, servicesPageMeta, whyMeContent } from "@/data/services";
import { siteConfig } from "@/data/siteConfig";
import { JsonLd, absoluteUrl, breadcrumbSchema, personSchema, professionalServiceSchema } from "@/lib/seo";
import "@/styles/content-pages.css";
import "@/styles/services.css";
import "@/styles/why-me.css";

export const metadata: Metadata = {
  title: whyMeContent.title,
  description: whyMeContent.lead,
  alternates: { canonical: absoluteUrl("/why-me") },
  openGraph: {
    title: `${whyMeContent.title} | ${siteConfig.name}`,
    description: whyMeContent.lead,
    url: absoluteUrl("/why-me"),
  },
};

export default function WhyMePage() {
  const waUrl = `${siteConfig.whatsappUrl}?text=${encodeURIComponent(
    "Hi Ahtasham, I'd like to discuss a project with you."
  )}`;

  return (
    <div className="content-page why-me-page">
      <JsonLd
        data={[
          personSchema(),
          professionalServiceSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Why Me", path: "/why-me" },
          ]),
        ]}
      />
      <ContentHeader />

      <main className="why-me-main">
        <div className="why-me-hero">
          <h1>{whyMeContent.title}</h1>
          <p className="why-me-lead">{whyMeContent.lead}</p>
        </div>

        <div className="why-me-stats">
          {whyMeContent.stats.map((s) => (
            <div key={s.label} className="why-me-stat">
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>

        <div className="why-me-grid">
          {whyMeContent.points.map((point) => (
            <article key={point.title} className="why-me-card">
              <h2>{point.title}</h2>
              <p>{point.body}</p>
            </article>
          ))}
        </div>

        <section className="why-me-cta">
          <h2>Ready to start?</h2>
          <p>See packages on the services page or message directly — quick reply guaranteed.</p>
          <div className="why-me-cta-actions">
            <Link href="/services" className="content-cta">
              View pricing →
            </Link>
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="service-cta why-me-wa">
              WhatsApp me <FaWhatsapp />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
