import Link from "next/link";
import type { Metadata } from "next";
import ContentHeader from "@/components/ContentHeader";
import { workProjects, siteConfig } from "@/data/siteConfig";
import "@/styles/content-pages.css";

export const metadata: Metadata = {
  title: "Work — Projects & Case Studies",
  description:
    "Selected Python, AI automation, WhatsApp bot, and web scraping projects by Ahtasham Aslam.",
  alternates: { canonical: `${siteConfig.siteUrl}/work` },
};

export default function WorkIndexPage() {
  return (
    <div className="content-page">
      <ContentHeader />

      <main className="content-main">
        <h1>My Work</h1>
        <p className="content-lead">Production projects — Python backends, AI bots, scraping & automation.</p>

        <div className="work-grid">
          {workProjects.map((project) => (
            <article key={project.slug} className="work-card">
              <Link href={`/work/${project.slug}`}>
                <img src={project.image} alt={project.title} loading="lazy" />
              </Link>
              <div className="work-card-body">
                <span className="work-num">{project.num}</span>
                <h2>
                  <Link href={`/work/${project.slug}`}>{project.title}</Link>
                </h2>
                <p className="work-category">{project.category}</p>
                <p>{project.description}</p>
                <Link href={`/work/${project.slug}`} className="content-link">
                  View project →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
