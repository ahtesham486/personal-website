import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactLink from "@/components/ContactLink";
import ContentHeader from "@/components/ContentHeader";
import FaqDetails from "@/components/FaqDetails";
import { workProjects, siteConfig } from "@/data/siteConfig";
import { workCaseStudies } from "@/data/workCaseStudies";
import { workPageFaqs } from "@/data/workFaqs";
import { JsonLd, absoluteUrl, breadcrumbSchema, faqSchema, projectSchema } from "@/lib/seo";
import "@/styles/content-pages.css";
import "@/styles/faq.css";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return workProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = workProjects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };

  const title = `${project.title} — Case Study`;

  return {
    title,
    description: project.description,
    keywords: project.tools.split(", "),
    openGraph: {
      title,
      description: project.description,
      url: absoluteUrl(`/work/${project.slug}`),
      images: [{ url: project.image, width: 1200, height: 630, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.description,
      images: [project.image],
    },
    alternates: { canonical: absoluteUrl(`/work/${project.slug}`) },
  };
}

export default async function WorkProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = workProjects.find((p) => p.slug === slug);
  if (!project) notFound();

  const caseStudy = workCaseStudies[slug];

  return (
    <div className="content-page">
      <JsonLd
        data={[
          projectSchema(project),
          faqSchema(workPageFaqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
            { name: project.title, path: `/work/${project.slug}` },
          ]),
        ]}
      />
      <ContentHeader />

      <main className="content-main article-main">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Work", href: "/work" },
            { label: project.title },
          ]}
        />
        <span className="work-num">{project.num}</span>
        <h1>{project.title}</h1>
        <p className="work-category">{project.category}</p>
        <img className="article-cover" src={project.image} alt={project.title} />
        <p className="content-lead">{project.description}</p>

        {caseStudy && (
          <>
            <h2>Problem</h2>
            <p>{caseStudy.problem}</p>

            <h2>Solution</h2>
            <p>{caseStudy.solution}</p>

            {caseStudy.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                <p>{section.body}</p>
              </section>
            ))}

            <h2>Tools used</h2>
            <ul className="project-highlights">
              {caseStudy.tools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>

            <h2>Results</h2>
            <ul className="project-highlights">
              {caseStudy.results.map((result) => (
                <li key={result}>{result}</li>
              ))}
            </ul>
          </>
        )}

        <h2>Highlights</h2>
        <ul className="project-highlights">
          {project.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <p className="article-internal-links">
          Need something similar? <Link href="/services">View services &amp; pricing</Link>
          {" · "}
          <Link href="/contact">Contact for a quote</Link>
        </p>

        <FaqDetails
          items={workPageFaqs}
          heading="Project FAQ"
          id="work-faq-heading"
          className="faq-section blog-faq-section"
        />

        <ContactLink className="content-cta">
          Discuss a similar project →
        </ContactLink>
      </main>
    </div>
  );
}
