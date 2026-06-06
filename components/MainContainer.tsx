"use client";

import { PropsWithChildren, Suspense, useEffect, useState } from "react";
import About from "./About";
import Career from "./Career";
import Cursor from "./Cursor";
import ErrorBoundary from "./ErrorBoundary";
import HomeFooter from "./HomeFooter";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import TechStack from "./TechStack";
import WhatsAppFloat from "./WhatsAppFloat";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import setSplitText, { cleanupSplitText } from "./utils/splitText";
import { gsap, ScrollTrigger } from "@/lib/gsapPlugins";

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
            <ErrorBoundary>
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
