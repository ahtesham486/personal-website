"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect } from "react";
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

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (hash === "contact" || hash === "faq") {
      router.replace("/contact");
    }
  }, [router]);

  return (
    <ErrorBoundary>
      <AgentWebMCP />
      <LoadingProvider>
        <MainContainer>
          <ErrorBoundary>
            <Suspense fallback={null}>
              <CharacterModel />
            </Suspense>
          </ErrorBoundary>
        </MainContainer>
      </LoadingProvider>
    </ErrorBoundary>
  );
}
