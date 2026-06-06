const SCROLL_KEY = "scrollToSection";

export function queueScrollToSection(id: string) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(SCROLL_KEY, id.replace(/^#/, ""));
}

export function scrollToSectionId(id: string, behavior: ScrollBehavior = "smooth") {
  const targetId = id.replace(/^#/, "");
  const el = document.getElementById(targetId);
  if (el) {
    el.scrollIntoView({ behavior, block: "start" });
    return true;
  }
  return false;
}

export function consumeQueuedScroll(delayMs = 600): void {
  if (typeof window === "undefined") return;

  const fromStorage = sessionStorage.getItem(SCROLL_KEY);
  const hashId = window.location.hash.replace(/^#/, "");
  const targetId = fromStorage || hashId;

  if (!targetId) return;

  sessionStorage.removeItem(SCROLL_KEY);

  const attempt = (retriesLeft: number) => {
    if (scrollToSectionId(targetId)) {
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }
      return;
    }
    if (retriesLeft > 0) {
      window.setTimeout(() => attempt(retriesLeft - 1), 200);
    }
  };

  window.setTimeout(() => attempt(8), delayMs);
}
