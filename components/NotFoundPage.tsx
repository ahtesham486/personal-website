import Link from "next/link";
import { MdCopyright } from "react-icons/md";
import ContentHeader from "@/components/ContentHeader";
import { siteConfig } from "@/data/siteConfig";
import "@/styles/content-pages.css";

const quickLinks = [
  { href: "/services", label: "Services" },
  { href: "/why-me", label: "Why Me" },
  { href: "/work", label: "Work" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

export default function NotFoundPage() {
  return (
    <div className="content-page not-found-page">
      <ContentHeader />

      <main className="content-main not-found-main">
        <p className="not-found-code" aria-hidden="true">
          404
        </p>
        <p className="not-found-eyebrow">Page not found</p>
        <h1>This page doesn&apos;t exist</h1>
        <p className="content-lead not-found-lead">
          The link you opened isn&apos;t on this site — it may be misspelled, outdated, or removed.
          Head back home or pick a page below.
        </p>

        <Link href="/" className="content-cta not-found-primary">
          Back to home
        </Link>

        <nav className="not-found-links" aria-label="Popular pages">
          {quickLinks.map(({ href, label }) => (
            <Link key={href} href={href} className="not-found-link">
              {label}
            </Link>
          ))}
        </nav>
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
