"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import HoverLinks from "./HoverLinks";
import { initialFX } from "./utils/initialFX";
import "./styles/Navbar.css";

export const smoother = null;

function scrollToSection(selector: string | null) {
  if (!selector) return;
  const target = document.querySelector(selector);
  target?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const Navbar = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) return;

    document.body.style.overflowY = "auto";

    requestAnimationFrame(() => {
      setTimeout(() => initialFX(), 100);
    });

    const links = document.querySelectorAll(".header ul a[data-href]");
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
  }, [isHome]);

  return (
    <>
      <div className="header">
        <Link href="/" className="navbar-title" data-cursor="disable">
          AA.
        </Link>
        <ul>
          <li>
            <a data-href="#about" href="/#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <Link href="/work">
              <HoverLinks text="WORK" />
            </Link>
          </li>
          <li>
            <Link href="/blog">
              <HoverLinks text="BLOG" />
            </Link>
          </li>
          <li>
            <a data-href="#contact" href="/#contact">
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
