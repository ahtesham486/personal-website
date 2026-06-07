import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContentHeader from "@/components/ContentHeader";
import BlogFaqs from "@/components/BlogFaqs";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/data/siteConfig";
import {
  JsonLd,
  OG_IMAGE,
  absoluteUrl,
  blogPostingSchema,
  breadcrumbSchema,
  faqSchema,
} from "@/lib/seo";
import "@/styles/content-pages.css";
import "@/styles/faq.css";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  const ogImage = post.cover ? { url: post.cover, width: 1200, height: 630, alt: post.title } : OG_IMAGE;

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
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [typeof ogImage.url === "string" ? ogImage.url : OG_IMAGE.url],
    },
    alternates: { canonical: absoluteUrl(`/blog/${post.slug}`) },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const schemas: Record<string, unknown>[] = [
    blogPostingSchema(post),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
  ];
  if (post.faqs.length) schemas.push(faqSchema(post.faqs));

  return (
    <div className="content-page">
      <JsonLd data={schemas} />
      <ContentHeader />

      <main className="content-main article-main">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]}
        />
        <time dateTime={post.date}>{post.date}</time>
        <h1>{post.title}</h1>
        <p className="content-lead">{post.description}</p>
        {post.cover && <img className="article-cover" src={post.cover} alt={post.title} />}
        <article className="markdown-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </article>
        <BlogFaqs faqs={post.faqs} />
        <p className="article-internal-links">
          Related: <Link href="/services">Services &amp; pricing</Link>
          {" · "}
          <Link href="/work">Portfolio case studies</Link>
          {" · "}
          <Link href="/contact">Contact</Link>
        </p>
      </main>
    </div>
  );
}
