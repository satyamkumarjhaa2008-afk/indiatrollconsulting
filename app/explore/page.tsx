"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./page.css";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    number: "01",
    title: "Creative Direction",
    description:
      "Build visual experiences that feel intentional, expressive and memorable across every screen.",
    tag: "DESKTOP / MOBILE",
  },
  {
    number: "02",
    title: "Motion Design",
    description:
      "Use movement to guide attention, communicate hierarchy and create a stronger sense of interaction.",
    tag: "RESPONSIVE MOTION",
  },
  {
    number: "03",
    title: "Digital Experience",
    description:
      "Create interfaces that adapt their behavior instead of simply shrinking a desktop experience.",
    tag: "ADAPTIVE UI",
  },
  {
    number: "04",
    title: "Interaction",
    description:
      "Every interaction can have its own rhythm, from subtle hover states to large scroll-driven moments.",
    tag: "INTERACTION",
  },
];

export default function ResponsiveAnimationPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  const [deviceMode, setDeviceMode] = useState<"desktop" | "mobile">(
    "desktop"
  );

  useEffect(() => {
    const updateMode = () => {
      setDeviceMode(window.innerWidth >= 768 ? "desktop" : "mobile");
    };

    updateMode();

    window.addEventListener("resize", updateMode);

    return () => {
      window.removeEventListener("resize", updateMode);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /*
      ============================================================
      DESKTOP
      ============================================================
      */

      mm.add("(min-width: 768px)", () => {
        /*
        HERO
        */

        gsap.from(".responsive-eyebrow", {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
        });

        gsap.from(".responsive-title-line", {
          opacity: 0,
          y: 100,
          rotateX: -70,
          transformOrigin: "50% 100%",
          duration: 1.2,
          stagger: 0.12,
          ease: "power4.out",
        });

        gsap.from(".responsive-intro", {
          opacity: 0,
          y: 40,
          duration: 1,
          delay: 0.35,
          ease: "power3.out",
        });

        /*
        DESKTOP CARDS

        Each card:
        - rotates
        - moves vertically
        - scales
        - has 3D depth
        */

        gsap.utils.toArray<HTMLElement>(".responsive-card").forEach(
          (card, index) => {
            gsap.from(card, {
              opacity: 0,
              y: 160,
              x: index % 2 === 0 ? -100 : 100,
              rotation: index % 2 === 0 ? -12 : 12,
              scale: 0.75,
              rotateX: 35,
              transformPerspective: 1200,
              duration: 1.15,
              ease: "power4.out",

              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "top 45%",
                toggleActions: "play none none reverse",
              },
            });
          }
        );

        /*
        DESKTOP CARD INNER CONTENT
        */

        gsap.utils.toArray<HTMLElement>(".responsive-card-content").forEach(
          (content) => {
            gsap.from(content.children, {
              opacity: 0,
              y: 25,
              duration: 0.7,
              stagger: 0.08,
              delay: 0.25,
              ease: "power3.out",

              scrollTrigger: {
                trigger: content,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            });
          }
        );

        /*
        DESKTOP DECORATIVE ORBS
        */

        gsap.to(".responsive-orb.orb-one", {
          y: -35,
          x: 20,
          rotation: 180,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(".responsive-orb.orb-two", {
          y: 30,
          x: -25,
          rotation: -180,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        return () => {
          gsap.killTweensOf(".responsive-orb");
        };
      });

      /*
      ============================================================
      MOBILE
      ============================================================
      */

      mm.add("(max-width: 767px)", () => {
        /*
        MOBILE HERO

        Notice that there is NO:
        - rotation
        - scale
        - 3D transform
        - large horizontal movement
        */

        gsap.from(".responsive-eyebrow", {
          opacity: 0,
          y: 15,
          duration: 0.6,
          ease: "power2.out",
        });

        gsap.from(".responsive-title-line", {
          opacity: 0,
          y: 45,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
        });

        gsap.from(".responsive-intro", {
          opacity: 0,
          y: 20,
          duration: 0.7,
          delay: 0.15,
          ease: "power2.out",
        });

        /*
        MOBILE CARDS

        Simple:
        fade + slide up

        No rotation.
        No scale.
        No X movement.
        */

        gsap.utils.toArray<HTMLElement>(".responsive-card").forEach(
          (card) => {
            gsap.from(card, {
              opacity: 0,
              y: 60,
              duration: 0.75,
              ease: "power3.out",

              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                end: "top 55%",
                toggleActions: "play none none reverse",
              },
            });
          }
        );

        /*
        MOBILE CONTENT
        */

        gsap.utils.toArray<HTMLElement>(".responsive-card-content").forEach(
          (content) => {
            gsap.from(content.children, {
              opacity: 0,
              y: 15,
              duration: 0.45,
              stagger: 0.06,
              delay: 0.15,
              ease: "power2.out",

              scrollTrigger: {
                trigger: content,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            });
          }
        );

        return () => {
          gsap.killTweensOf(".responsive-orb");
        };
      });

      return () => {
        mm.revert();
      };
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} className="responsive-page">
      {/* ========================================================
          FLOATING BACKGROUND
      ======================================================== */}

      <div className="responsive-background" aria-hidden="true">
        <div className="responsive-orb orb-one" />
        <div className="responsive-orb orb-two" />
        <div className="responsive-grid" />
      </div>

      {/* ========================================================
          TOP BAR
      ======================================================== */}

      <header className="responsive-topbar">
        <div className="responsive-logo">GSAP / 11</div>

        <div
          className={`responsive-mode ${
            deviceMode === "desktop" ? "is-desktop" : "is-mobile"
          }`}
        >
          <span className="mode-dot" />
          {deviceMode === "desktop" ? "DESKTOP MODE" : "MOBILE MODE"}
        </div>
      </header>

      {/* ========================================================
          HERO
      ======================================================== */}

      <section className="responsive-hero">
        <div className="responsive-eyebrow">
          <span>11</span>
          GSAP MATCHMEDIA
        </div>

        <h1 className="responsive-title">
          <span className="responsive-title-line">Different screen.</span>
          <span className="responsive-title-line">
            Different <em>motion.</em>
          </span>
        </h1>

        <p className="responsive-intro">
          GSAP&apos;s <code>matchMedia()</code> lets you build completely
          different animation systems for desktop and mobile — instead of
          forcing the same motion onto every screen.
        </p>

        <div className="responsive-scroll-hint">
          <span className="scroll-line" />
          SCROLL TO EXPLORE
        </div>
      </section>

      {/* ========================================================
          EXPLANATION
      ======================================================== */}

      <section className="responsive-explanation">
        <div className="explanation-label">THE IDEA</div>

        <div className="explanation-content">
          <h2>
            Your animation should
            <br />
            <span>adapt.</span>
          </h2>

          <p>
            A large desktop screen can handle dramatic movement, 3D rotations
            and horizontal travel. On a phone, the same animation can feel
            cramped or cause unwanted visual movement.
          </p>

          <div className="code-card">
            <div className="code-header">
              <span />
              <span />
              <span />
              <small>responsive.tsx</small>
            </div>

            <pre>
              <code>{`const mm = gsap.matchMedia();

mm.add("(min-width: 768px)", () => {
  // dramatic desktop animation
});

mm.add("(max-width: 767px)", () => {
  // simple mobile animation
});`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* ========================================================
          CARDS
      ======================================================== */}

      <section className="responsive-cards-section">
        <div className="cards-heading">
          <span>RESPONSIVE ANIMATION</span>
          <span>04 EXAMPLES</span>
        </div>

        <div className="responsive-cards">
          {cards.map((card) => (
            <article className="responsive-card" key={card.number}>
              <div className="responsive-card-number">{card.number}</div>

              <div className="responsive-card-content">
                <span className="responsive-card-tag">{card.tag}</span>

                <h3>{card.title}</h3>

                <p>{card.description}</p>

                <div className="card-arrow">↗</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ========================================================
          DESKTOP VS MOBILE
      ======================================================== */}

      <section className="comparison-section">
        <div className="comparison-title">
          <span>THE SAME CARDS</span>
          <h2>
            Two completely
            <br />
            different <em>experiences.</em>
          </h2>
        </div>

        <div className="comparison-grid">
          <div className="comparison-panel desktop-panel">
            <div className="comparison-panel-top">
              <span className="comparison-icon">01</span>
              <span>MIN-WIDTH: 768PX</span>
            </div>

            <div className="comparison-visual desktop-visual">
              <div className="visual-card card-a">ROTATE</div>
              <div className="visual-card card-b">SCALE</div>
              <div className="visual-card card-c">FLY</div>
            </div>

            <div className="comparison-description">
              <h3>Desktop</h3>
              <p>
                Cards enter with rotation, scale, horizontal movement and 3D
                depth.
              </p>
            </div>
          </div>

          <div className="comparison-panel mobile-panel">
            <div className="comparison-panel-top">
              <span className="comparison-icon">02</span>
              <span>MAX-WIDTH: 767PX</span>
            </div>

            <div className="comparison-visual mobile-visual">
              <div className="visual-card">FADE</div>
              <div className="visual-card">SLIDE</div>
              <div className="visual-card">REVEAL</div>
            </div>

            <div className="comparison-description">
              <h3>Mobile</h3>
              <p>
                Cards simply fade and slide upward, keeping the experience
                smooth and stable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          FOOTER
      ======================================================== */}

      <footer className="responsive-footer">
        <div>GSAP EXPLORE</div>

        <div className="footer-center">
          MATCHMEDIA
          <br />
          RESPONSIVE MOTION
        </div>

        <div>11 / 20</div>
      </footer>
    </main>
  );
}