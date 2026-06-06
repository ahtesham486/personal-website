import { gsap, SplitText } from "@/lib/gsapPlugins";

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

    const textProps = { type: "chars,lines" as const, linesClass: "split-h2" };

    const h2Info = document.querySelector(".landing-h2-info");
    if (h2Info) {
      const landingText2 = new SplitText(h2Info, textProps);
      if (landingText2.chars?.length) {
        gsap.fromTo(
          landingText2.chars,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            duration: 0.38,
            ease: "power2.out",
            y: 0,
            stagger: 0.008,
            delay: 0.05,
          }
        );

        const h2Info1 = document.querySelector(".landing-h2-info-1");
        const h2_1 = document.querySelector(".landing-h2-1");
        const h2_2 = document.querySelector(".landing-h2-2");
        if (h2Info1 && h2_1 && h2_2) {
          const landingText3 = new SplitText(h2Info1, textProps);
          const landingText4 = new SplitText(h2_1, textProps);
          const landingText5 = new SplitText(h2_2, textProps);
          if (landingText3.chars?.length && landingText4.chars?.length && landingText5.chars?.length) {
            loopText(landingText2, landingText3);
            loopText(landingText4, landingText5);
          }
        }
      }
    }

    gsap.fromTo(
      ".landing-info-h2",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        duration: 0.35,
        ease: "power2.out",
        y: 0,
        delay: 0.12,
      }
    );
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

function loopText(text1: SplitText, text2: SplitText) {
  if (!text1.chars?.length || !text2.chars?.length) return;

  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  const delay = 4;
  const delay2 = delay * 2 + 1;

  tl.fromTo(
    text2.chars,
    { opacity: 0, y: 36 },
    {
      opacity: 1,
      duration: 0.45,
      ease: "power2.out",
      y: 0,
      stagger: 0.06,
      delay: delay,
    },
    0
  )
    .fromTo(
      text1.chars,
      { y: 36 },
      {
        duration: 0.45,
        ease: "power2.out",
        y: 0,
        stagger: 0.06,
        delay: delay2,
      },
      1
    )
    .fromTo(
      text1.chars,
      { y: 0 },
      {
        y: -36,
        duration: 0.45,
        ease: "power2.in",
        stagger: 0.06,
        delay: delay,
      },
      0
    )
    .to(
      text2.chars,
      {
        y: -36,
        duration: 0.45,
        ease: "power2.in",
        stagger: 0.06,
        delay: delay2,
      },
      1
    );
}
