import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ContactLink from "@/components/ContactLink";
import ContentHeader from "@/components/ContentHeader";
import { workProjects, siteConfig } from "@/data/siteConfig";
import { workCaseStudies } from "@/data/workCaseStudies";
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
    title: `${project.title} — Case Study`,
    description: project.description,
    keywords: project.tools.split(", "),
    openGraph: {
      title: `${project.title} | ${siteConfig.name}`,
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

  const caseStudy = workCaseStudies[slug];

  return (
    <div className="content-page">
      <JsonLd data={projectSchema(project)} />
      <ContentHeader />

      <main className="content-main article-main">
        <Link href="/work" className="content-back">
          ← All projects
        </Link>
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

        <ContactLink className="content-cta">
          Discuss a similar project →
        </ContactLink>
      </main>
    </div>
  );
}
