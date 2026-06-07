"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
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
  const [showCharacter, setShowCharacter] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (hash === "contact" || hash === "faq") {
      router.replace("/contact");
    }
  }, [router]);

  useEffect(() => {
    if (window.innerWidth <= 1024) return;

    let cancelled = false;
    const reveal = () => {
      if (!cancelled) setShowCharacter(true);
    };

    let idleId: number | undefined;
    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(reveal, { timeout: 3500 });
    } else {
      idleId = window.setTimeout(reveal, 1200);
    }

    const onScroll = () => {
      reveal();
      window.removeEventListener("scroll", onScroll, { capture: true });
    };
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });

    return () => {
      cancelled = true;
      if (typeof window.cancelIdleCallback === "function" && idleId !== undefined) {
        window.cancelIdleCallback(idleId);
      } else if (idleId !== undefined) {
        clearTimeout(idleId);
      }
      window.removeEventListener("scroll", onScroll, { capture: true });
    };
  }, []);

  return (
    <ErrorBoundary>
      <AgentWebMCP />
      <LoadingProvider>
        <MainContainer>
          {showCharacter && (
            <ErrorBoundary>
              <Suspense fallback={null}>
                <CharacterModel />
              </Suspense>
            </ErrorBoundary>
          )}
        </MainContainer>
      </LoadingProvider>
    </ErrorBoundary>
  );
}
