"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoadingProvider } from "@/context/LoadingProvider";
import MainContainer from "@/components/MainContainer";
import ErrorBoundary from "@/components/ErrorBoundary";
import AgentWebMCP from "@/components/AgentWebMCP";

const CharacterModel = dynamic(() => import("@/components/Character"), {
  ssr: false,
  loading: () => null,
});

export default function HomeClient() {
  const router = useRouter();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (hash === "contact" || hash === "faq") {
      router.replace("/contact");
    }
  }, [router]);

  useLayoutEffect(() => {
    const update = () => setIsDesktop(window.innerWidth > 1024);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <ErrorBoundary>
      <AgentWebMCP />
      <LoadingProvider>
        <MainContainer>
          {isDesktop ? (
            <ErrorBoundary>
              <Suspense fallback={null}>
                <CharacterModel />
              </Suspense>
            </ErrorBoundary>
          ) : null}
        </MainContainer>
      </LoadingProvider>
    </ErrorBoundary>
  );
}
