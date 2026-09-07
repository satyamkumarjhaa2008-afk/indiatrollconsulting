"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./loader.css";

import { useLoader } from "@/components/LoaderProvider";

const Loader = () => {
  const { setIsLoading } = useLoader();

  const loaderRef = useRef<HTMLDivElement>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let animationContext: gsap.Context | null = null;

    const loadAndAnimate = async () => {
      const container = svgContainerRef.current;
      const loader = loaderRef.current;

      if (!container || !loader) return;

      try {
        /*
         * ============================================================
         * LOAD SVG
         * ============================================================
         */

        const response = await fetch(
          "/india-troll-logo-vector.svg"
        );

        if (!response.ok) {
          throw new Error("Unable to load logo SVG");
        }

        const svgText = await response.text();

        if (cancelled) return;

        /*
         * ============================================================
         * INSERT SVG INTO DOM
         * ============================================================
         */

        container.innerHTML = svgText;

        const svg = container.querySelector("svg");

        if (!svg) {
          throw new Error("Logo SVG element not found");
        }

        svg.classList.add("india-troll-svg");

        /*
         * ============================================================
         * GSAP CONTEXT
         * ============================================================
         */

        animationContext = gsap.context(() => {
          /*
           * ==========================================================
           * GET SVG GROUPS
           * ==========================================================
           */

          const logoMark = svg.querySelector("#logo-mark");
          const logoIndia = svg.querySelector("#logo-india");
          const logoTroll = svg.querySelector("#logo-troll");
          const logoTagline = svg.querySelector("#logo-tagline");
          const logoOther = svg.querySelector("#logo-other");

          /*
           * ==========================================================
           * GET INDIVIDUAL PATHS
           * ==========================================================
           */

          const markPaths = logoMark
            ? Array.from(
                logoMark.querySelectorAll("path")
              )
            : [];

          const indiaPaths = logoIndia
            ? Array.from(
                logoIndia.querySelectorAll("path")
              )
            : [];

          const trollPaths = logoTroll
            ? Array.from(
                logoTroll.querySelectorAll("path")
              )
            : [];

          const taglinePaths = logoTagline
            ? Array.from(
                logoTagline.querySelectorAll("path")
              )
            : [];

          const otherPaths = logoOther
            ? Array.from(
                logoOther.querySelectorAll("path")
              )
            : [];

          /*
           * ==========================================================
           * INITIAL STATE
           * ==========================================================
           */

          gsap.set(svg, {
            opacity: 1,
            scale: 0.88,
            transformOrigin: "50% 50%",
          });

          gsap.set(
            [
              ...markPaths,
              ...indiaPaths,
              ...trollPaths,
              ...taglinePaths,
              ...otherPaths,
            ],
            {
              opacity: 0,
            }
          );

          gsap.set(markPaths, {
            scale: 0.92,
            transformOrigin: "center center",
          });

          gsap.set(indiaPaths, {
            scale: 0.94,
            transformOrigin: "center center",
          });

          gsap.set(trollPaths, {
            scale: 0.94,
            transformOrigin: "center center",
          });

          gsap.set(taglinePaths, {
            y: 12,
          });

          /*
           * ==========================================================
           * LOADER TIMELINE
           * ==========================================================
           */

          const tl = gsap.timeline({
            defaults: {
              ease: "power3.out",
            },

            /*
             * ========================================================
             * LOADER COMPLETE
             * ========================================================
             *
             * IMPORTANT:
             *
             * We don't reveal the page immediately.
             * First the loader fades away.
             * Only AFTER that do we call setIsLoading(false).
             *
             * That causes the page to mount.
             *
             * Therefore the page's own GSAP useEffect()
             * starts AFTER the loader has disappeared.
             */

            onComplete: () => {
              gsap.to(loader, {
                opacity: 0,
                duration: 0.7,
                ease: "power2.inOut",

                onComplete: () => {
                  if (cancelled) return;

                  setIsLoading(false);
                },
              });
            },
          });

          /*
           * ==========================================================
           * 0. INITIAL LOGO SCALE
           * ==========================================================
           */

          tl.to(svg, {
            scale: 0.93,
            duration: 0.35,
            ease: "power2.out",
          });

          /*
           * ==========================================================
           * 1. IT / CIRCULAR MARK
           * ==========================================================
           */

          tl.to(
            markPaths,
            {
              opacity: 1,
              scale: 1,
              duration: 0.65,
              stagger: {
                each: 0.055,
                from: "start",
              },
              ease: "power3.out",
            },
            "-=0.05"
          );

          /*
           * ==========================================================
           * 2. GOLD ELEMENTS OF MARK
           * ==========================================================
           */

          const markGold = logoMark
            ? Array.from(
                logoMark.querySelectorAll(
                  "#logo-mark-gold path"
                )
              )
            : [];

          if (markGold.length) {
            tl.to(
              markGold,
              {
                opacity: 1,
                scale: 1,
                duration: 0.55,
                stagger: 0.07,
                ease: "back.out(1.4)",
              },
              "-=0.35"
            );
          }

          /*
           * ==========================================================
           * 3. INDIA
           * ==========================================================
           */

          tl.to(
            indiaPaths,
            {
              opacity: 1,
              scale: 1,
              duration: 0.65,
              stagger: {
                each: 0.035,
                from: "start",
              },
              ease: "power3.out",
            },
            "-=0.15"
          );

          /*
           * ==========================================================
           * GOLD INDIA ELEMENTS
           * ==========================================================
           */

          const indiaGold = logoIndia
            ? Array.from(
                logoIndia.querySelectorAll(
                  "#logo-india-gold path"
                )
              )
            : [];

          if (indiaGold.length) {
            tl.fromTo(
              indiaGold,
              {
                x: -20,
                opacity: 0,
              },
              {
                x: 0,
                opacity: 1,
                duration: 0.5,
                stagger: 0.06,
                ease: "power3.out",
              },
              "-=0.45"
            );
          }

          /*
           * ==========================================================
           * 4. TROLL
           * ==========================================================
           */

          tl.to(
            trollPaths,
            {
              opacity: 1,
              scale: 1,
              duration: 0.7,
              stagger: {
                each: 0.045,
                from: "start",
              },
              ease: "back.out(1.15)",
            },
            "-=0.15"
          );

          /*
           * ==========================================================
           * 5. TROLL GOLD
           * ==========================================================
           */

          const trollGold = logoTroll
            ? Array.from(
                logoTroll.querySelectorAll(
                  "#logo-troll-gold path"
                )
              )
            : [];

          if (trollGold.length) {
            tl.fromTo(
              trollGold,
              {
                opacity: 0,
                scale: 0.75,
              },
              {
                opacity: 1,
                scale: 1,
                duration: 0.55,
                stagger: 0.055,
                ease: "back.out(1.5)",
              },
              "-=0.45"
            );
          }

          /*
           * ==========================================================
           * 6. TAGLINE
           * ==========================================================
           */

          tl.to(
            taglinePaths,
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              stagger: 0.025,
              ease: "power3.out",
            },
            "-=0.05"
          );

          /*
           * ==========================================================
           * 7. OTHER DETAILS
           * ==========================================================
           */

          if (otherPaths.length) {
            tl.to(
              otherPaths,
              {
                opacity: 1,
                duration: 0.4,
                stagger: 0.03,
                ease: "power2.out",
              },
              "-=0.35"
            );
          }

          /*
           * ==========================================================
           * 8. FINAL LOGO SCALE
           * ==========================================================
           */

          tl.to(
            svg,
            {
              scale: 1.015,
              duration: 0.22,
              ease: "power2.out",
            },
            "+=0.05"
          );

          tl.to(svg, {
            scale: 1,
            duration: 0.35,
            ease: "power2.out",
          });

          /*
           * ==========================================================
           * 9. PROGRESS BAR
           * ==========================================================
           */

          if (progressRef.current) {
            gsap.set(progressRef.current, {
              scaleX: 0,
              transformOrigin: "left center",
            });

            tl.to(
              progressRef.current,
              {
                scaleX: 0.2,
                duration: 0.65,
                ease: "power2.out",
              },
              0
            );

            tl.to(
              progressRef.current,
              {
                scaleX: 0.48,
                duration: 0.7,
                ease: "power2.out",
              },
              0.7
            );

            tl.to(
              progressRef.current,
              {
                scaleX: 0.72,
                duration: 0.7,
                ease: "power2.out",
              },
              1.45
            );

            tl.to(
              progressRef.current,
              {
                scaleX: 1,
                duration: 0.7,
                ease: "power2.inOut",
              },
              2.15
            );
          }
        }, loader);
      } catch (error) {
        console.error(
          "India Troll loader error:",
          error
        );

        /*
         * ============================================================
         * FAILSAFE
         * ============================================================
         *
         * Never leave the website stuck behind the loader.
         */

        if (!cancelled) {
          gsap.to(loader, {
            opacity: 0,
            duration: 0.4,
            ease: "power2.inOut",

            onComplete: () => {
              if (cancelled) return;

              setIsLoading(false);
            },
          });
        }
      }
    };

    loadAndAnimate();

    return () => {
      cancelled = true;

      if (animationContext) {
        animationContext.revert();
      }
    };
  }, [setIsLoading]);

  return (
    <div
      ref={loaderRef}
      className="logo-loader"
      role="status"
      aria-label="Loading India Troll"
    >
      {/* Background glow */}
      <div className="logo-loader__ambient" />

      {/* Main logo */}
      <div
        ref={svgContainerRef}
        className="logo-loader__svg-container"
      />

      {/* Loading progress */}
      <div className="logo-loader__progress">
        <div
          ref={progressRef}
          className="logo-loader__progress-fill"
        />
      </div>

      {/* Loading text */}
      <div className="logo-loader__text">
        LOADING
      </div>
    </div>
  );
};

export default Loader;