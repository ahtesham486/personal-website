"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import HoverLinks from "./HoverLinks";
import { initialFX } from "./utils/initialFX";
import { consumeQueuedScroll, queueScrollToSection, scrollToSectionId } from "@/lib/hashScroll";
import "./styles/Navbar.css";

export const smoother = null;

function handleHashClick(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  const href = e.currentTarget.getAttribute("data-href");
  if (!href) return;
  scrollToSectionId(href);
  window.history.replaceState(null, "", href);
}

const Navbar = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) return;

    document.body.style.overflowY = "auto";
    consumeQueuedScroll(500);

    requestAnimationFrame(() => {
      setTimeout(() => initialFX(), 150);
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
            {isHome ? (
              <a data-href="#about" href="#about" onClick={handleHashClick} data-cursor="disable">
                <HoverLinks text="ABOUT" />
              </a>
            ) : (
              <Link href="/#about">
                <HoverLinks text="ABOUT" />
              </Link>
            )}
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
            {isHome ? (
              <a data-href="#contact" href="#contact" onClick={handleHashClick} data-cursor="disable">
                <HoverLinks text="CONTACT" />
              </a>
            ) : (
              <Link href="/" prefetch={false} onClick={() => queueScrollToSection("contact")}>
                <HoverLinks text="CONTACT" />
              </Link>
            )}
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
