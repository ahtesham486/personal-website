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

function HomeFallback() {
  return (
    <div className="home-fallback">
      <p>Loading portfolio…</p>
    </div>
  );
}

export default function HomeClient() {
  const [showCharacter, setShowCharacter] = useState(false);

  useEffect(() => {
    const start = () => setShowCharacter(true);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(start, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(start, 600);
    return () => clearTimeout(id);
  }, []);

  return (
    <ErrorBoundary fallback={<HomeFallback />}>
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
