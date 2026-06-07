import { useEffect } from "react";
import { careerItems } from "../data/siteConfig";
import { ScrollTrigger } from "@/lib/gsapPlugins";
import { setCareerTimeline } from "./utils/GsapScroll";
import "./styles/Career.css";

const Career = () => {
  useEffect(() => {
    setCareerTimeline();
    ScrollTrigger.refresh();

    const onResize = () => {
      setCareerTimeline();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      ScrollTrigger.getById("career")?.kill();
    };
  }, []);

  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          {careerItems.map((item) => (
            <div className="career-info-box" key={item.year + item.role}>
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{item.role}</h4>
                  <h5>{item.company}</h5>
                </div>
                <h3>{item.year}</h3>
              </div>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;
