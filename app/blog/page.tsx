import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/data/siteConfig";
import "@/styles/content-pages.css";

export const metadata: Metadata = {
  title: "Blog — Python, AI & Automation",
  description:
    "SEO guides, WhatsApp bot tutorials, Python automation, AI agents, and web development articles by Ahtasham Aslam.",
  alternates: { canonical: `${siteConfig.siteUrl}/blog` },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="content-page">
      <header className="content-header">
        <Link href="/" className="content-logo">
          AA.
        </Link>
        <nav className="content-nav">
          <Link href="/">Home</Link>
          <Link href="/services">Services</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/work">Work</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </header>

      <main className="content-main">
        <h1>Blog</h1>
        <p className="content-lead">
          Python, AI agents, automation, SEO/AEO/GEO — practical guides with FAQs for business owners
          and developers.
        </p>

        <div className="blog-list">
          {posts.map((post) => (
            <article key={post.slug} className="blog-card">
              <Link href={`/blog/${post.slug}`}>
                {post.cover && (
                  <img src={post.cover} alt={post.title} loading="lazy" decoding="async" />
                )}
                <div className="blog-card-body">
                  <time dateTime={post.date}>{post.date}</time>
                  <h2>{post.title}</h2>
                  <p>{post.description}</p>
                  <span className="content-link">Read article →</span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
