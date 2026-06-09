import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/app.css";
import { siteConfig } from "@/data/siteConfig";
import {
  JsonLd,
  OG_IMAGE,
  localBusinessSchema,
  personSchema,
  professionalServiceSchema,
  websiteSchema,
} from "@/lib/seo";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.name} | Python Developer & AI Automation Specialist`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Pakistani Python developer and AI automation specialist. Expert in WhatsApp chatbots, n8n workflows, Django, FastAPI and LLM integration.",
  keywords: [
    "Python developer Pakistan",
    "Ahtasham Aslam",
    "Ahtesham Aslam",
    "Ehtisham Aslam",
    "Ahtsham Aslam",
    "Ahtasham Python developer",
    "Ahtasham developer",
    "custom website developer Pakistan",
    `WhatsApp chatbot developer ${siteConfig.location.city}`,
    `Python developer ${siteConfig.location.city}`,
    "n8n automation expert",
    "AI automation",
    "web scraping Python",
    "Django Flask developer",
    "SEO AEO GEO",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.siteUrl }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.siteUrl,
    siteName: `${siteConfig.name} Portfolio`,
    title: `${siteConfig.name} | Python Developer & AI Automation Specialist`,
    description:
      "Pakistani Python developer and AI automation specialist.",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Python Developer`,
    description:
      "Pakistani Python developer and AI automation specialist.",
    images: [OG_IMAGE.url],
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
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  verification: {
    google: "googlebc723ae048b0eb7f",
    other: { "msvalidate.01": "0460475F067698B5E6733EC9653BE28D" },
  },
  other: {
    "geo.region": "PK-PB",
    "geo.placename": `${siteConfig.location.city}, ${siteConfig.location.country}`,
    "geo.position": `${siteConfig.location.latitude};${siteConfig.location.longitude}`,
    ICBM: `${siteConfig.location.latitude}, ${siteConfig.location.longitude}`,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.variable}>
      <body>
        <JsonLd
          data={[
            personSchema(),
            websiteSchema(),
            localBusinessSchema(),
            professionalServiceSchema(),
          ]}
        />
        {children}
      </body>
    </html>
  );
}
