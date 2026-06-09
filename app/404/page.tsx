import type { Metadata } from "next";
import NotFoundPage from "@/components/NotFoundPage";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "The page you're looking for doesn't exist on ahtasham.site.",
  robots: { index: false, follow: false },
  alternates: { canonical: absoluteUrl("/404") },
  openGraph: {
    title: "404 — Page Not Found",
    description: "The page you're looking for doesn't exist on ahtasham.site.",
    url: absoluteUrl("/404"),
  },
};

export default function NotFoundRoutePage() {
  return <NotFoundPage />;
}
