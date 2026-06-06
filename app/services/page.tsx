import Link from "next/link";
import type { Metadata } from "next";
import { FaWhatsapp } from "react-icons/fa6";
import { servicePackages, servicesPageMeta } from "@/data/services";
import { siteConfig } from "@/data/siteConfig";
import { JsonLd, absoluteUrl } from "@/lib/seo";
import "@/styles/content-pages.css";
import "@/styles/services.css";

export const metadata: Metadata = {
  title: servicesPageMeta.title,
  description: servicesPageMeta.description,
  keywords: [
    "web development pricing Pakistan",
    "WhatsApp chatbot ecommerce",
    "AI agent development",
    "Python automation services",
    "affordable custom website",
  ],
  alternates: { canonical: absoluteUrl("/services") },
  openGraph: {
    title: `${servicesPageMeta.title} | ${siteConfig.name}`,
    description: servicesPageMeta.description,
    url: absoluteUrl("/services"),
  },
};

function servicesSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Ahtasham Aslam Development Services",
    itemListElement: servicePackages.map((pkg, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Offer",
        name: pkg.title,
        description: pkg.subtitle,
        price: pkg.price,
        priceCurrency: "USD",
        url: absoluteUrl("/services"),
        seller: { "@type": "Person", name: siteConfig.name },
      },
    })),
  };
}

export default function ServicesPage() {
  const waBase = siteConfig.whatsappUrl;

  return (
    <div className="content-page services-page">
      <JsonLd data={servicesSchema()} />
      <header className="content-header">
        <Link href="/" className="content-logo">
          AA.
        </Link>
        <nav className="content-nav">
          <Link href="/">Home</Link>
          <Link href="/services">Services</Link>
          <Link href="/work">Work</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </header>

      <main className="services-main">
        <div className="services-hero">
          <h1>Complete Web Solutions for Your Business</h1>
          <p className="services-hero-lead">
            From concept to launch — websites, ecommerce, WhatsApp bots, AI agents, and Python
            automation. Transparent pricing, no hidden fees.
          </p>
        </div>

        <div className="services-grid">
          {servicePackages.map((pkg) => {
            const waUrl = `${waBase}?text=${encodeURIComponent(
              `Hi Ahtasham, I'm interested in: ${pkg.title} ($${pkg.price})`
            )}`;
            return (
              <article
                key={pkg.id}
                className={`service-card${pkg.featured ? " service-card-featured" : ""}`}
              >
                {pkg.badge && <span className="service-badge">{pkg.badge}</span>}
                <h2>{pkg.title}</h2>
                <p className="service-subtitle">{pkg.subtitle}</p>
                <div className="service-price-row">
                  <span className="service-price">${pkg.price}</span>
                  <span className="service-price-old">${pkg.originalPrice}</span>
                  <span className="service-price-note">Only</span>
                </div>
                <ul className="service-features">
                  {pkg.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <p className="service-offer-note">Limited-time pricing — lock in today.</p>
                <a href={waUrl} target="_blank" rel="noopener noreferrer" className="service-cta">
                  {pkg.cta} <FaWhatsapp />
                </a>
              </article>
            );
          })}
        </div>

        <section className="services-bottom-cta">
          <h2>Not sure which package fits?</h2>
          <p>
            Message on WhatsApp or email{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> — free scope chat, no
            pressure.
          </p>
          <Link href="/contact" className="content-cta">
            Contact page →
          </Link>
        </section>
      </main>
    </div>
  );
}
