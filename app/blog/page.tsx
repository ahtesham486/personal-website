import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/data/siteConfig";
import "@/styles/content-pages.css";

export const metadata: Metadata = {
  title: "Blog — Python, AI & Automation",
  description:
    "Articles on Python development, WhatsApp AI bots, web scraping, SEO, AEO, GEO, and automation by Ahtasham Aslam.",
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
          <Link href="/blog">Blog</Link>
          <Link href="/work">Work</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
      </header>

      <main className="content-main">
        <h1>Blog</h1>
        <p className="content-lead">
          Python, AI agents, automation, SEO/AEO/GEO — practical notes from real projects.
        </p>

        <div className="blog-list">
          {posts.map((post) => (
            <article key={post.slug} className="blog-card">
              {post.cover && (
                <Link href={`/blog/${post.slug}`}>
                  <img src={post.cover} alt={post.title} loading="lazy" />
                </Link>
              )}
              <div className="blog-card-body">
                <time dateTime={post.date}>{post.date}</time>
                <h2>
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p>{post.description}</p>
                <div className="blog-tags">
                  {post.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
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
