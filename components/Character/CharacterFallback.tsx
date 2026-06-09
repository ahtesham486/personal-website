"use client";

import { useEffect } from "react";

/** Shown when WebGL is unavailable or the 3D scene throws. */
export default function CharacterFallback() {
  useEffect(() => {
    document.querySelector(".character-container")?.classList.add("character-loaded");
  }, []);

  return (
    <div className="character-container">
      <div className="character-model character-fallback">
        <div className="character-rim" />
      </div>
    </div>
  );
}
