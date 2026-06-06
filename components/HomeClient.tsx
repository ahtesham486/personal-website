"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { LoadingProvider } from "@/context/LoadingProvider";
import MainContainer from "@/components/MainContainer";
import ErrorBoundary from "@/components/ErrorBoundary";

const CharacterModel = dynamic(() => import("@/components/Character"), {
  ssr: false,
  loading: () => null,
});

export default function HomeClient() {
  const [showCharacter, setShowCharacter] = useState(false);

  useEffect(() => {
    const start = () => setShowCharacter(true);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(start, { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(start, 400);
    return () => clearTimeout(id);
  }, []);

  return (
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
  );
}
