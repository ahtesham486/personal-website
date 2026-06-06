"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import About from "./About";
import Career from "./Career";
import Cursor from "./Cursor";
import ErrorBoundary from "./ErrorBoundary";
import HomeFooter from "./HomeFooter";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import TechStackFallback from "./TechStackFallback";
import WhatsAppFloat from "./WhatsAppFloat";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import setSplitText, { cleanupSplitText } from "./utils/splitText";
import { gsap, ScrollTrigger } from "@/lib/gsapPlugins";

const TechStack = dynamic(() => import("./TechStack"), {
  ssr: false,
  loading: () => (
    <div className="techstack">
      <h2> My Techstack</h2>
      <TechStackFallback />
    </div>
  ),
});

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState(false);

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
            <ErrorBoundary>
              <Work />
            </ErrorBoundary>
            <ErrorBoundary
              fallback={
                <div className="techstack">
                  <h2> My Techstack</h2>
                  <TechStackFallback />
                </div>
              }
            >
              <TechStack />
            </ErrorBoundary>
            <HomeFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
