import type { Metadata } from "next";
import { MdCopyright } from "react-icons/md";
import ContentHeader from "@/components/ContentHeader";
import { privacyPageContent, privacyPageMeta } from "@/data/privacyPage";
import { siteConfig } from "@/data/siteConfig";
import { JsonLd, OG_IMAGE, absoluteUrl, breadcrumbSchema } from "@/lib/seo";
import "@/styles/content-pages.css";

export const metadata: Metadata = {
  title: privacyPageMeta.title,
  description: privacyPageMeta.description,
  keywords: [
    "Ahtasham Aslam",
    "Ahtesham Aslam",
    "Ehtisham Aslam",
    "Ahtsham Aslam",
    "privacy policy",
    siteConfig.name,
  ],
  alternates: { canonical: absoluteUrl("/privacy") },
  openGraph: {
    title: privacyPageMeta.title,
    description: privacyPageMeta.description,
    url: absoluteUrl("/privacy"),
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: privacyPageMeta.title,
    description: privacyPageMeta.description,
    images: [OG_IMAGE.url],
  },
};

export default function PrivacyPage() {
  return (
    <div className="content-page privacy-page">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
        ])}
      />
      <ContentHeader />

      <main className="content-main article-main">
        <h1>Privacy Policy</h1>
        <p className="content-lead">{privacyPageContent.intro}</p>

        {privacyPageContent.sections.map((section) => (
          <section key={section.heading} className="about-section-block">
            <h2>{section.heading}</h2>
            {section.paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </section>
        ))}
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
