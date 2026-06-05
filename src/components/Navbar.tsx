import { useEffect } from "react";
import HoverLinks from "./HoverLinks";
import { siteConfig } from "../data/siteConfig";
import { initialFX } from "./utils/initialFX";
import "./styles/Navbar.css";

export const smoother = null;

function scrollToSection(selector: string | null) {
  if (!selector) return;
  const target = document.querySelector(selector);
  target?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const Navbar = () => {
  useEffect(() => {
    document.body.style.overflowY = "auto";

    requestAnimationFrame(() => {
      setTimeout(() => initialFX(), 100);
    });

    const links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          const link = e.currentTarget as HTMLAnchorElement;
          scrollToSection(link.getAttribute("data-href"));
        }
      });
    });
  }, []);

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          AA.
        </a>
        <a
          href={`mailto:${siteConfig.email}`}
          className="navbar-connect"
          data-cursor="disable"
        >
          {siteConfig.email}
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
