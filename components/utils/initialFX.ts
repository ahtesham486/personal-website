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
      { opacity: 0, y: 80, filter: "blur(5px)" },
      {
        opacity: 1,
        duration: 1.2,
        filter: "blur(0px)",
        ease: "power3.inOut",
        y: 0,
        stagger: 0.025,
        delay: 0.3,
      }
    );

    const textProps = { type: "chars,lines" as const, linesClass: "split-h2" };

    const h2Info = document.querySelector(".landing-h2-info");
    if (h2Info) {
      const landingText2 = new SplitText(h2Info, textProps);
      if (landingText2.chars?.length) {
        gsap.fromTo(
          landingText2.chars,
          { opacity: 0, y: 80, filter: "blur(5px)" },
          {
            opacity: 1,
            duration: 1.2,
            filter: "blur(0px)",
            ease: "power3.inOut",
            y: 0,
            stagger: 0.025,
            delay: 0.3,
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
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        duration: 1.2,
        ease: "power1.inOut",
        y: 0,
        delay: 0.8,
      }
    );
    gsap.fromTo(
      [".header", ".icons-section", ".nav-fade"],
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.2,
        ease: "power1.inOut",
        delay: 0.1,
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
    { opacity: 0, y: 80 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power3.inOut",
      y: 0,
      stagger: 0.1,
      delay: delay,
    },
    0
  )
    .fromTo(
      text1.chars,
      { y: 80 },
      {
        duration: 1.2,
        ease: "power3.inOut",
        y: 0,
        stagger: 0.1,
        delay: delay2,
      },
      1
    )
    .fromTo(
      text1.chars,
      { y: 0 },
      {
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay,
      },
      0
    )
    .to(
      text2.chars,
      {
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay2,
      },
      1
    );
}
