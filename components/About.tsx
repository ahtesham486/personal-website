import Link from "next/link";
import { aboutContent, siteConfig } from "../data/siteConfig";
import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para about-headline">{aboutContent.headline}</p>
        <p className="about-note">{aboutContent.note}</p>
        <p className="about-seo-intro">
          {siteConfig.name}, also known as {siteConfig.alternateNames.join(" and ")}, is a custom
          website developer, n8n agent builder, AI chatbot specialist, and automation expert based in{" "}
          {siteConfig.location.city}, {siteConfig.location.country}.
        </p>
        <div className="about-skills">
          {aboutContent.skills.map((skill) => (
            <span className="about-skill" key={skill}>
              {skill}
            </span>
          ))}
        </div>
        <Link href="/about" className="about-full-link">
          Read full bio →
        </Link>
      </div>
    </div>
  );
};

export default About;
