"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const REVEAL_SELECTOR = [
  "main h1",
  "main h2",
  "main h3",
  "main h4",
  "main h5",
  "main h6",
  "main p",
  "main li",
  "main blockquote",
  "main figure",
  "main img",
  "main article",
  "main button",
  "main .section-label",
  "main .eyebrow",
  "main .label",
  "main [data-reveal]",
  "main a:not(nav a)",
  "main span:not([aria-hidden=\"true\"])",
].join(",");

const SKIP_SELECTOR = [
  "[data-reveal-ignore]",
  ".site-navbar",
  ".site-footer",
  ".editorial-page-hero",
  ".service-hero",
  ".image-viewer-overlay",
].join(",");

export default function GlobalScrollReveal() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    let raf = 0;

    const setup = () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const ctx = gsap.context(() => {
        const candidates = Array.from(
          document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR)
        );

        const elements = candidates.filter((element) => {
          if (element.closest(SKIP_SELECTOR)) return false;
          if (element.dataset.revealReady === "true") return false;

          const computed = window.getComputedStyle(element);

          // Existing GSAP / Framer Motion animations keep ownership.
          if (
            element.style.transform ||
            element.style.opacity ||
            computed.opacity !== "1"
          ) {
            return false;
          }

          if (element.getBoundingClientRect().height < 2) return false;

          return true;
        });

        if (!elements.length) {
          ScrollTrigger.refresh();
          return;
        }

        if (reduceMotion) {
          gsap.set(elements, {
            clearProps: "all",
            opacity: 1,
          });
          return;
        }

        elements.forEach((element) => {
          element.dataset.revealReady = "true";
          element.style.willChange = "transform, opacity, filter";
        });

        elements.forEach((element) => {
          const isMedia = element.matches(
            "img, figure, article"
          );

          gsap.fromTo(
            element,
            isMedia
              ? {
                  y: 55,
                  opacity: 0,
                  scale: 0.94,
                  rotateX: 7,
                  filter: "blur(7px)",
                  clipPath:
                    "inset(10% 0 10% 0 round 16px)",
                }
              : {
                  y: 38,
                  opacity: 0,
                  filter: "blur(8px)",
                  clipPath: "inset(0 0 18% 0)",
                },
            isMedia
              ? {
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  rotateX: 0,
                  filter: "blur(0px)",
                  clipPath:
                    "inset(0% 0 0% 0 round 0px)",
                  duration: 0.9,
                  ease: "power4.out",
                  clearProps:
                    "willChange,filter,clipPath",
                  scrollTrigger: {
                    trigger: element,
                    start: "top 88%",
                    once: true,
                    invalidateOnRefresh: true,
                  },
                }
              : {
                  y: 0,
                  opacity: 1,
                  filter: "blur(0px)",
                  clipPath: "inset(0 0 0% 0)",
                  duration: 0.72,
                  ease: "power3.out",
                  clearProps:
                    "willChange,filter,clipPath",
                  scrollTrigger: {
                    trigger: element,
                    start: "top 88%",
                    once: true,
                    invalidateOnRefresh: true,
                  },
                }
          );
        });

        ScrollTrigger.refresh();
      });

      const refresh = () => ScrollTrigger.refresh();

      window.addEventListener("load", refresh, {
        once: true,
      });

      return () => {
        window.removeEventListener("load", refresh);
        ctx.revert();
      };
    };

    raf = requestAnimationFrame(() => {
      setup();
    });

    return () => {
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return null;
}
