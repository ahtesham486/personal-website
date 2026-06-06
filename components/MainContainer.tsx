"use client";

import { lazy, PropsWithChildren, Suspense, useEffect, useRef, useState } from "react";
import About from "./About";
import Career from "./Career";
import Cursor from "./Cursor";
import HomeFooter from "./HomeFooter";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatsAppFloat from "./WhatsAppFloat";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import setSplitText, { cleanupSplitText } from "./utils/splitText";
import { gsap, ScrollTrigger } from "@/lib/gsapPlugins";

const TechStack = lazy(() => import("./TechStack"));

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState(false);
  const [showTechStack, setShowTechStack] = useState(false);
  const techSentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = techSentinelRef.current;
    if (!sentinel || !isDesktopView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowTechStack(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [isDesktopView]);

  useEffect(() => {
    const timer = setTimeout(() => setSplitText(), 400);
    return () => {
      clearTimeout(timer);
      cleanupSplitText();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.globalTimeline.clear();
    };
  }, []);

  useEffect(() => {
    const onResize = () => setIsDesktopView(window.innerWidth > 1024);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      <WhatsAppFloat />
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing>{!isDesktopView && children}</Landing>
            <About />
            <WhatIDo />
            <Career />
            <Work />
            <div ref={techSentinelRef} aria-hidden="true" style={{ height: 1 }} />
            {isDesktopView && showTechStack && (
              <Suspense fallback={null}>
                <TechStack />
              </Suspense>
            )}
            <HomeFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
