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
  const [showCharacter, setShowCharacter] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (hash === "contact" || hash === "faq") {
      router.replace("/contact");
    }
  }, [router]);

  useLayoutEffect(() => {
    const mq = window.matchMedia("(min-width: 1025px)");
    const update = () => setShowCharacter(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
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
