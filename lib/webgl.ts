import * as THREE from "three";

/** Probe WebGL without leaving a live context (avoids exhausting context limits). */
export function isWebGLAvailable(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: false }) ||
      canvas.getContext("webgl", { failIfMajorPerformanceCaveat: false }) ||
      canvas.getContext("experimental-webgl", {
        failIfMajorPerformanceCaveat: false,
      })) as WebGLRenderingContext | null;
    if (!gl) return false;
    const ext = gl.getExtension("WEBGL_lose_context");
    ext?.loseContext();
    return true;
  } catch {
    return false;
  }
}

export function createWebGLRenderer(
  params: THREE.WebGLRendererParameters = {}
): THREE.WebGLRenderer | null {
  const preferences: WebGLPowerPreference[] = ["default", "low-power", "high-performance"];

  for (const powerPreference of preferences) {
    const canvas = document.createElement("canvas");
    try {
      return new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        failIfMajorPerformanceCaveat: false,
        powerPreference,
        ...params,
      });
    } catch (err) {
      console.warn("[WebGL] Renderer attempt failed:", powerPreference, err);
    }
  }

  return null;
}
