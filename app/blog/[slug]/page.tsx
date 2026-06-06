import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/data/siteConfig";
import { JsonLd, absoluteUrl, blogPostingSchema } from "@/lib/seo";
import "@/styles/content-pages.css";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      url: absoluteUrl(`/blog/${post.slug}`),
      images: post.cover ? [{ url: post.cover }] : undefined,
    },
    alternates: { canonical: absoluteUrl(`/blog/${post.slug}`) },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="content-page">
      <JsonLd data={blogPostingSchema(post)} />
      <header className="content-header">
        <Link href="/" className="content-logo">
          AA.
        </Link>
        <nav className="content-nav">
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/work">Work</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </header>

      <main className="content-main article-main">
        <Link href="/blog" className="content-back">
          ← Back to blog
        </Link>
        <time dateTime={post.date}>{post.date}</time>
        <h1>{post.title}</h1>
        <p className="content-lead">{post.description}</p>
        {post.cover && <img className="article-cover" src={post.cover} alt={post.title} />}
        <article className="markdown-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </article>
      </main>
    </div>
  );
}
