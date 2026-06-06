import type { Metadata } from "next";
import NotFoundPage from "@/components/NotFoundPage";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "The page you're looking for doesn't exist on ahtasham.site.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <NotFoundPage />;
}
