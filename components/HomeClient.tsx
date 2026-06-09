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
    let revealed = false;
    const reveal = () => {
      if (cancelled || revealed) return;
      revealed = true;
      setShowCharacter(true);
    };

    const landing = document.getElementById("landingDiv");
    const onIntent = () => reveal();

    landing?.addEventListener("mousemove", onIntent, { once: true, passive: true });
    landing?.addEventListener("click", onIntent, { once: true });
    window.addEventListener("keydown", onIntent, { once: true });

    // Fast fallback — show within 1.5s if no interaction (was 8s before)
    const fallbackId = window.setTimeout(reveal, 1500);

    return () => {
      cancelled = true;
      landing?.removeEventListener("mousemove", onIntent);
      landing?.removeEventListener("click", onIntent);
      window.removeEventListener("keydown", onIntent);
      clearTimeout(fallbackId);
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
