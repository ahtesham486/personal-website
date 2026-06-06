import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ContactLink from "@/components/ContactLink";
import { workProjects, siteConfig } from "@/data/siteConfig";
import { JsonLd, absoluteUrl, projectSchema } from "@/lib/seo";
import "@/styles/content-pages.css";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return workProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = workProjects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: project.description,
    keywords: project.tools.split(", "),
    openGraph: {
      title: project.title,
      description: project.description,
      url: absoluteUrl(`/work/${project.slug}`),
      images: [{ url: project.image }],
    },
    alternates: { canonical: absoluteUrl(`/work/${project.slug}`) },
  };
}

export default async function WorkProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = workProjects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <div className="content-page">
      <JsonLd data={projectSchema(project)} />
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
        <Link href="/work" className="content-back">
          ← All projects
        </Link>
        <span className="work-num">{project.num}</span>
        <h1>{project.title}</h1>
        <p className="work-category">{project.category}</p>
        <img className="article-cover" src={project.image} alt={project.title} />
        <p className="content-lead">{project.description}</p>

        <h2>Tools & features</h2>
        <p>{project.tools}</p>

        <h2>Highlights</h2>
        <ul className="project-highlights">
          {project.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <ContactLink className="content-cta">
          Discuss a similar project →
        </ContactLink>
      </main>
    </div>
  );
}
