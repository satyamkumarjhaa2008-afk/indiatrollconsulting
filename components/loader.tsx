"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./loader.css";

interface LoaderProps {
  onComplete?: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
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
         * Load the actual SVG from public/
         */
        const response = await fetch("/india-troll-logo-vector.svg");

        if (!response.ok) {
          throw new Error("Unable to load logo SVG");
        }

        const svgText = await response.text();

        if (cancelled) return;

        /*
         * Insert SVG into the DOM.
         *
         * This is important because GSAP needs access to the
         * actual SVG paths rather than an <img>.
         */
        container.innerHTML = svgText;

        const svg = container.querySelector("svg");

        if (!svg) return;

        svg.classList.add("india-troll-svg");

        animationContext = gsap.context(() => {
          /*
           * ---------------------------------------------------
           * GET SVG GROUPS
           * ---------------------------------------------------
           */

          const logoMark = svg.querySelector("#logo-mark");
          const logoIndia = svg.querySelector("#logo-india");
          const logoTroll = svg.querySelector("#logo-troll");
          const logoTagline = svg.querySelector("#logo-tagline");
          const logoOther = svg.querySelector("#logo-other");

          /*
           * ---------------------------------------------------
           * GET INDIVIDUAL PATHS
           * ---------------------------------------------------
           */

          const markPaths = logoMark
            ? Array.from(logoMark.querySelectorAll("path"))
            : [];

          const indiaPaths = logoIndia
            ? Array.from(logoIndia.querySelectorAll("path"))
            : [];

          const trollPaths = logoTroll
            ? Array.from(logoTroll.querySelectorAll("path"))
            : [];

          const taglinePaths = logoTagline
            ? Array.from(logoTagline.querySelectorAll("path"))
            : [];

          const otherPaths = logoOther
            ? Array.from(logoOther.querySelectorAll("path"))
            : [];

          /*
           * ---------------------------------------------------
           * INITIAL STATE
           * ---------------------------------------------------
           */

          gsap.set(svg, {
            opacity: 1,
            scale: 0.88,
            transformOrigin: "50% 50%",
          });

          /*
           * Everything starts invisible.
           */

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

          /*
           * Give every path a slight starting scale.
           */

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
           * ---------------------------------------------------
           * TIMELINE
           * ---------------------------------------------------
           */

          const tl = gsap.timeline({
            defaults: {
              ease: "power3.out",
            },

            onComplete: () => {
              /*
               * Final loader fade.
               */

              gsap.to(loader, {
                opacity: 0,
                duration: 0.7,
                ease: "power2.inOut",
                onComplete: () => {
                  if (onComplete) {
                    onComplete();
                  }
                },
              });
            },
          });

          /*
           * ---------------------------------------------------
           * 0. INITIAL LOGO SCALE
           * ---------------------------------------------------
           */

          tl.to(svg, {
            scale: 0.93,
            duration: 0.35,
            ease: "power2.out",
          });

          /*
           * ---------------------------------------------------
           * 1. IT / CIRCULAR MARK
           * ---------------------------------------------------
           *
           * The left-side logo starts assembling.
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
           * ---------------------------------------------------
           * 2. GOLD ELEMENTS OF MARK
           * ---------------------------------------------------
           */

          const markGold = logoMark
            ? Array.from(
                logoMark.querySelectorAll("#logo-mark-gold path")
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
           * ---------------------------------------------------
           * 3. INDIA
           * ---------------------------------------------------
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
           * Gold INDIA elements get a little extra movement.
           */

          const indiaGold = logoIndia
            ? Array.from(
                logoIndia.querySelectorAll("#logo-india-gold path")
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
           * ---------------------------------------------------
           * 4. TROLL
           * ---------------------------------------------------
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
           * ---------------------------------------------------
           * 5. TROLL GOLD
           * ---------------------------------------------------
           */

          const trollGold = logoTroll
            ? Array.from(
                logoTroll.querySelectorAll("#logo-troll-gold path")
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
           * ---------------------------------------------------
           * 6. TAGLINE
           * ---------------------------------------------------
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
           * ---------------------------------------------------
           * 7. OTHER DETAILS
           * ---------------------------------------------------
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
           * ---------------------------------------------------
           * 8. FINAL LOGO SCALE
           * ---------------------------------------------------
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
           * ---------------------------------------------------
           * 9. PROGRESS BAR
           * ---------------------------------------------------
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
        console.error("India Troll loader error:", error);

        /*
         * If SVG loading fails, don't leave the user stuck
         * on the loading screen.
         */

        gsap.to(loader, {
          opacity: 0,
          duration: 0.4,
          onComplete: () => {
            if (onComplete) {
              onComplete();
            }
          },
        });
      }
    };

    loadAndAnimate();

    return () => {
      cancelled = true;

      if (animationContext) {
        animationContext.revert();
      }
    };
  }, [onComplete]);

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