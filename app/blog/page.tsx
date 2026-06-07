import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/data/siteConfig";
import ContentHeader from "@/components/ContentHeader";
import { JsonLd, OG_IMAGE, absoluteUrl, breadcrumbSchema, websiteSchema } from "@/lib/seo";
import "@/styles/content-pages.css";

export const metadata: Metadata = {
  title: "Blog — Python, AI & Automation",
  description:
    "SEO guides, WhatsApp bot tutorials, Python automation, AI agents, and web development articles by Ahtasham Aslam.",
  alternates: { canonical: absoluteUrl("/blog") },
  openGraph: {
    title: "Blog — Python, AI & Automation",
    description:
      "Practical guides on WhatsApp bots, SEO/AEO/GEO, Python automation, and AI agents by Ahtasham Aslam.",
    url: absoluteUrl("/blog"),
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Python, AI & Automation",
    description:
      "Practical guides on WhatsApp bots, SEO/AEO/GEO, Python automation, and AI agents.",
    images: [OG_IMAGE.url],
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="content-page">
      <JsonLd
        data={[
          websiteSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ]),
        ]}
      />
      <ContentHeader />

      <main className="content-main content-main-wide">
        <h1>Blog</h1>
        <p className="content-lead">
          Python, AI agents, automation, SEO/AEO/GEO — practical guides with FAQs for business owners
          and developers.
        </p>

        <div className="blog-list">
          {posts.map((post) => (
            <article key={post.slug} className="blog-card">
              {post.cover ? (
                <Link href={`/blog/${post.slug}`} className="blog-card-media">
                  <img src={post.cover} alt={post.title} loading="lazy" decoding="async" />
                </Link>
              ) : (
                <div className="blog-card-media blog-card-media-placeholder" aria-hidden="true" />
              )}
              <div className="blog-card-body">
                <time dateTime={post.date}>{post.date}</time>
                <h2>
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p>{post.description}</p>
                <Link href={`/blog/${post.slug}`} className="content-link">
                  Read article →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
