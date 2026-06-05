import { useEffect } from "react";
import HoverLinks from "./HoverLinks";
import { ScrollSmoother } from "../utils/gsapPlugins";
import { siteConfig } from "../data/siteConfig";
import { isLowEndDevice } from "../utils/performance";
import { initialFX } from "./utils/initialFX";
import "./styles/Navbar.css";

export let smoother: ScrollSmoother;

const Navbar = () => {
  useEffect(() => {
    const lowEnd = isLowEndDevice();
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: lowEnd ? 0.5 : 0.75,
      effects: false,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    requestAnimationFrame(() => {
      setTimeout(() => initialFX(), 100);
    });

    const links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          const elem = e.currentTarget as HTMLAnchorElement;
          const section = elem.getAttribute("data-href");
          smoother.scrollTo(section, true, "top top");
        }
      });
    });
    window.addEventListener("resize", () => {
      ScrollSmoother.refresh(true);
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
