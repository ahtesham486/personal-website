"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoadingProvider } from "@/context/LoadingProvider";
import MainContainer from "@/components/MainContainer";
import ErrorBoundary from "@/components/ErrorBoundary";

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
    const start = () => setShowCharacter(true);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(start, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(start, 600);
    return () => clearTimeout(id);
  }, []);

  return (
    <ErrorBoundary>
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
