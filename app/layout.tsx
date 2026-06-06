import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/app.css";
import { siteConfig } from "@/data/siteConfig";
import { JsonLd, faqSchema, personSchema, websiteSchema } from "@/lib/seo";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.name} | Python Developer & AI Automation Expert`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Ahtasham Aslam — Python backend developer, AI agents, WhatsApp bots, web scraping, n8n automation, WordPress & SEO/AEO/GEO specialist in Pakistan.",
  keywords: [
    "Python developer Pakistan",
    "AI automation",
    "WhatsApp chatbot developer",
    "web scraping Python",
    "Django Flask developer",
    "SEO AEO GEO",
    "Ahtasham Aslam",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.siteUrl }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.siteUrl,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Python & AI Automation Expert`,
    description: siteConfig.tagline,
    images: [{ url: "/images/work-python-api.webp", width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Python Developer`,
    description: siteConfig.tagline,
    images: ["/images/work-python-api.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: siteConfig.siteUrl,
    types: {
      "text/plain": `${siteConfig.siteUrl}/llms.txt`,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.variable}>
      <body>
        <JsonLd data={[personSchema(), websiteSchema(), faqSchema()]} />
        {children}
      </body>
    </html>
  );
}
