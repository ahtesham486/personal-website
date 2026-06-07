import Link from "next/link";
import type { Metadata } from "next";
import { FaWhatsapp } from "react-icons/fa6";
import ContentHeader from "@/components/ContentHeader";
import FaqDetails from "@/components/FaqDetails";
import { servicePackages, servicesFaqItems, servicesPageMeta } from "@/data/services";
import { siteConfig } from "@/data/siteConfig";
import {
  JsonLd,
  OG_IMAGE,
  absoluteUrl,
  breadcrumbSchema,
  faqSchema,
  localBusinessSchema,
  professionalServiceSchema,
} from "@/lib/seo";
import "@/styles/content-pages.css";
import "@/styles/services.css";

export const metadata: Metadata = {
  title: servicesPageMeta.title,
  description: servicesPageMeta.description,
  keywords: [
    "web development pricing Pakistan",
    "WhatsApp chatbot ecommerce",
    "SEO AEO GEO monthly",
    "AI agent development",
    "Python automation services",
  ],
  alternates: { canonical: absoluteUrl("/services") },
  openGraph: {
    title: `${servicesPageMeta.title} | ${siteConfig.name}`,
    description: servicesPageMeta.description,
    url: absoluteUrl("/services"),
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: servicesPageMeta.title,
    description: servicesPageMeta.description,
    images: [OG_IMAGE.url],
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

function formatPrice(pkg: (typeof servicePackages)[number]) {
  const suffix = pkg.billing === "monthly" ? "/mo" : "";
  return `$${pkg.price}${suffix}`;
}

export default function ServicesPage() {
  const waBase = siteConfig.whatsappUrl;

  return (
    <div className="content-page services-page">
      <JsonLd
        data={[
          servicesSchema(),
          localBusinessSchema(),
          professionalServiceSchema(),
          faqSchema(servicesFaqItems),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
        ]}
      />
      <ContentHeader />

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
            const priceLabel = formatPrice(pkg);
            const waUrl = `${waBase}?text=${encodeURIComponent(
              `Hi Ahtasham, I'm interested in: ${pkg.title} (${priceLabel})`
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
                  <span className="service-price">
                    ${pkg.price}
                    {pkg.billing === "monthly" && <small className="service-price-period">/mo</small>}
                  </span>
                  <span className="service-price-old">
                    ${pkg.originalPrice}
                    {pkg.billing === "monthly" ? "/mo" : ""}
                  </span>
                  <span className="service-price-note">
                    {pkg.billing === "monthly" ? "Monthly" : "Only"}
                  </span>
                </div>
                <ul className="service-features">
                  {pkg.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <p className="service-offer-note">
                  {pkg.billing === "monthly"
                    ? "Cancel anytime — visibility on autopilot."
                    : "Limited-time pricing — lock in today."}
                </p>
                <a href={waUrl} target="_blank" rel="noopener noreferrer" className="service-cta">
                  {pkg.cta} <FaWhatsapp />
                </a>
              </article>
            );
          })}
        </div>

        <FaqDetails
          items={servicesFaqItems}
          heading="Services FAQ"
          id="services-faq-heading"
          className="faq-section services-faq-section"
        />

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
