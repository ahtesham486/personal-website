import { aboutContent } from "../data/siteConfig";
import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para about-headline">{aboutContent.headline}</p>
        <p className="about-note">{aboutContent.note}</p>
        <div className="about-skills">
          {aboutContent.skills.map((skill) => (
            <span className="about-skill" key={skill}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
