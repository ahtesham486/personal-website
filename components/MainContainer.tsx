"use client";

import dynamic from "next/dynamic";
import { PropsWithChildren, useEffect, useState } from "react";
import About from "./About";
import Cursor from "./Cursor";
import ErrorBoundary from "./ErrorBoundary";
import HomeFooter from "./HomeFooter";
import Landing from "./Landing";
import LazyWhenVisible from "./LazyWhenVisible";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatsAppFloat from "./WhatsAppFloat";
import setSplitText, { cleanupSplitText } from "./utils/splitText";
import { gsap, ScrollTrigger } from "@/lib/gsapPlugins";

const WhatIDo = dynamic(() => import("./WhatIDo"), { ssr: false });
const Career = dynamic(() => import("./Career"), { ssr: false });
const Work = dynamic(() => import("./Work"), {
  ssr: false,
  loading: () => <div className="work-section work-placeholder" aria-hidden />,
});

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const run = () => {
      if (!cancelled) setSplitText();
    };

    let idleHandle: number | undefined;
    let timeoutHandle: number | NodeJS.Timeout | undefined;

    if (typeof window.requestIdleCallback === "function") {
      idleHandle = window.requestIdleCallback(run, { timeout: 2200 });
    } else {
      timeoutHandle = window.setTimeout(run, 400);
    }

    return () => {
      cancelled = true;
      if (idleHandle !== undefined) {
        window.cancelIdleCallback(idleHandle);
      }
      if (timeoutHandle !== undefined) {
        clearTimeout(timeoutHandle);
      }
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
            <LazyWhenVisible minHeight={420}>
              <WhatIDo />
            </LazyWhenVisible>
            <LazyWhenVisible minHeight={360}>
              <Career />
            </LazyWhenVisible>
            <LazyWhenVisible minHeight={480} rootMargin="320px 0px">
              <ErrorBoundary>
                <Work />
              </ErrorBoundary>
            </LazyWhenVisible>
            <HomeFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
