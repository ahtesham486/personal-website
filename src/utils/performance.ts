export function isMobileDevice() {
  return window.innerWidth <= 1024;
}

export function isLowEndDevice() {
  const cores = navigator.hardwareConcurrency || 4;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return reducedMotion || cores <= 4 || memory <= 4 || isMobileDevice();
}

export function getRendererPixelRatio() {
  return Math.min(window.devicePixelRatio || 1, isLowEndDevice() ? 1 : 1.25);
}
