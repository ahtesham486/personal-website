import { gsap, SplitText } from "@/lib/gsapPlugins";

function loopWordPair(primary: Element, alternate: Element) {
  gsap.set(alternate, { y: "110%", opacity: 0, visibility: "hidden" });
  gsap.set(primary, { y: "0%", opacity: 1, visibility: "visible" });

  const tl = gsap.timeline({ repeat: -1, repeatDelay: 2.5 });

  tl.to(primary, {
    y: "-110%",
    opacity: 0,
    duration: 0.55,
    ease: "power2.in",
    onComplete: () => gsap.set(primary, { visibility: "hidden" }),
  })
    .set(alternate, { visibility: "visible" })
    .fromTo(
      alternate,
      { y: "110%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 0.55, ease: "power2.out" },
      "<0.12"
    )
    .to({}, { duration: 2.8 })
    .to(alternate, {
      y: "-110%",
      opacity: 0,
      duration: 0.55,
      ease: "power2.in",
      onComplete: () => gsap.set(alternate, { visibility: "hidden" }),
    })
    .set(primary, { visibility: "visible" })
    .fromTo(
      primary,
      { y: "110%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 0.55, ease: "power2.out" },
      "<0.12"
    )
    .to({}, { duration: 2.8 });
}

export function initialFX() {
  try {
    document.body.style.overflowY = "auto";
    document.body.style.backgroundColor = "#0b080c";

    const landingNodes = [
      ...document.querySelectorAll(".landing-info h3"),
      ...document.querySelectorAll(".landing-intro h2"),
      ...document.querySelectorAll(".landing-intro h1"),
    ];
    if (!landingNodes.length) return;

    const landingText = new SplitText(landingNodes, {
      type: "chars,lines",
      linesClass: "split-line",
    });
    if (!landingText.chars?.length) return;

    gsap.fromTo(
      landingText.chars,
      { opacity: 0, y: 36 },
      {
        opacity: 1,
        duration: 0.38,
        ease: "power2.out",
        y: 0,
        stagger: 0.006,
        delay: 0,
      }
    );

    const h2_1 = document.querySelector(".landing-h2-1");
    const h2_2 = document.querySelector(".landing-h2-2");

    if (h2_1 && h2_2) {
      gsap.set(h2_2, { y: "110%", opacity: 0, visibility: "hidden" });

      gsap.fromTo(
        ".landing-info-h2",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out", delay: 0.12 }
      );
      gsap.fromTo(h2_1, { opacity: 0, y: 28 }, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
        delay: 0.1,
        onComplete: () => loopWordPair(h2_1, h2_2),
      });
    }

    gsap.fromTo(
      [".header", ".icons-section", ".nav-fade"],
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
        delay: 0,
      }
    );
  } catch (err) {
    console.warn("initialFX skipped:", err);
  }
}
