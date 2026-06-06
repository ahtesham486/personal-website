import Link from "next/link";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapPlugins";
import { workProjects } from "../data/siteConfig";

const Work = () => {
  useEffect(() => {
    if (window.innerWidth <= 1024) return;

    let timeline: gsap.core.Timeline | null = null;

    try {
      const box = document.getElementsByClassName("work-box");
      const container = document.querySelector(".work-container");
      if (!box.length || !container || !box[0].parentElement) return;

      const rectLeft = container.getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement.getBoundingClientRect().width;
      const paddingRaw = parseInt(window.getComputedStyle(box[0]).padding, 10);
      const padding = Number.isFinite(paddingRaw) ? paddingRaw / 2 : 0;
      const translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;

      if (!Number.isFinite(translateX) || translateX <= 0) return;

      timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".work-section",
          start: "top top",
          end: `+=${translateX}`,
          scrub: true,
          pin: true,
          id: "work",
          anticipatePin: 1,
        },
      });

      timeline.to(".work-flex", {
        x: -translateX,
        ease: "none",
      });
    } catch (err) {
      console.warn("Work scroll animation skipped:", err);
    }

    return () => {
      timeline?.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <Link href="/work" className="work-view-all" data-cursor="disable">
          View all projects →
        </Link>
        <div className="work-flex">
          {workProjects.map((project) => (
            <div className="work-box" key={project.num}>
              <div className="work-info">
                <div className="work-title">
                  <h3>{project.num}</h3>
                  <div>
                    <h4>
                      <Link href={`/work/${project.slug}`}>{project.title}</Link>
                    </h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage
                image={project.image}
                alt={project.title}
                link={`/work/${project.slug}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
