import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ContentHeader from "@/components/ContentHeader";
import BlogFaqs from "@/components/BlogFaqs";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/data/siteConfig";
import { JsonLd, absoluteUrl, blogPostingSchema } from "@/lib/seo";
import "@/styles/content-pages.css";
import "@/styles/faq.css";

type Props = { params: Promise<{ slug: string }> };

function blogFaqSchema(post: NonNullable<ReturnType<typeof getPostBySlug>>) {
  if (!post.faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

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

  const faqSchema = blogFaqSchema(post);

  return (
    <div className="content-page">
      <JsonLd data={faqSchema ? [blogPostingSchema(post), faqSchema] : blogPostingSchema(post)} />
      <ContentHeader />

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
        <BlogFaqs faqs={post.faqs} />
      </main>
    </div>
  );
}
