"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./why-choose-us.css";

gsap.registerPlugin(ScrollTrigger);

interface Reason {
  id: string;
  title: string;
  description: string;
  icon: string;
  accent: string;
}

const reasons: Reason[] = [
  {
    id: "ground-first",
    title: "Ground First. Not Desk Research.",
    description:
      "We work at booth, ward, and village level to capture real inputs — not assumptions.",
    icon: "/assets/icons/icons2/1.svg",
    accent: "var(--brand-cyan)",
  },
  {
    id: "election-accuracy",
    title: "Proven Election Accuracy",
    description:
      "Consistent exit poll performance backed by disciplined methodology and strong field execution. Proven track record across major elections, including Lok Sabha 2024 and multiple municipal corporations.",
    icon: "/assets/icons/icons2/2.svg",
    accent: "var(--brand-magenta)",
  },
  {
    id: "technology",
    title: "Technology-Enabled Survey & Data Systems",
    description:
      "Our in-house survey app and data systems ensure control over quality, speed, and reliability.",
    icon: "/assets/icons/icons2/3.svg",
    accent: "var(--brand-violet)",
  },
  {
    id: "data-analysis",
    title: "Data Analysis & Insight Capability",
    description:
      "Our research team, data analysts, and psephologists convert field data into clear, actionable insights using proven methods.",
    icon: "/assets/icons/icons2/4.svg",
    accent: "var(--brand-cyan)",
  },
  {
    id: "trusted-partner",
    title: "Trusted Partner Approach",
    description:
      "We work closely with leaders and organisations, supporting critical decisions with reliable inputs and practical guidance.",
    icon: "/assets/icons/icons2/w1.svg",
    accent: "var(--brand-magenta)",
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(
        section.querySelectorAll(
          ".wcu-eyebrow, .wcu-title, .wcu-title-line, .wcu-item"
        ),
        {
          clearProps: "all",
        }
      );

      return;
    }

    const ctx = gsap.context(() => {
      const eyebrow = section.querySelector(".wcu-eyebrow");
      const title = section.querySelector(".wcu-title");
      const titleLine = section.querySelector(".wcu-title-line");
      const items = gsap.utils.toArray<HTMLElement>(".wcu-item");

      /*
       * Initial states
       * Only opacity + transform are animated.
       * This avoids expensive layout/reflow animations.
       */
      gsap.set(eyebrow, {
        opacity: 0,
        y: 16,
      });

      gsap.set(title, {
        opacity: 0,
        y: 28,
      });

      gsap.set(titleLine, {
        opacity: 0,
        scaleX: 0,
        transformOrigin: "center center",
      });

      gsap.set(items, {
        opacity: 0,
        y: 34,
      });

      /*
       * Section entrance
       *
       * once:true prevents ScrollTrigger from repeatedly
       * creating animations every time the user scrolls past
       * the section.
       */
      const introTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          once: true,
        },
      });

      introTimeline
        .to(eyebrow, {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power2.out",
        })
        .to(
          title,
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power3.out",
          },
          "-=0.25"
        )
        .to(
          titleLine,
          {
            opacity: 1,
            scaleX: 1,
            duration: 0.45,
            ease: "power2.out",
          },
          "-=0.22"
        )
        .to(
          items,
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.09,
            ease: "power3.out",
          },
          "-=0.08"
        );

      /*
       * Lightweight item hover.
       *
       * These are created once and don't run continuously.
       * GSAP owns the transform so it won't fight CSS transitions.
       */
      items.forEach((item) => {
        const icon = item.querySelector<HTMLElement>(".wcu-icon");
        const content = item.querySelector<HTMLElement>(".wcu-content");
        const line = item.querySelector<HTMLElement>(".wcu-item-line");

        if (!icon || !content || !line) return;

        const enter = () => {
          gsap.to(icon, {
            y: -4,
            scale: 1.035,
            duration: 0.28,
            ease: "power2.out",
            overwrite: true,
          });

          gsap.to(content, {
            x: 5,
            duration: 0.28,
            ease: "power2.out",
            overwrite: true,
          });

          gsap.to(line, {
            scaleX: 1.18,
            duration: 0.28,
            ease: "power2.out",
            overwrite: true,
          });
        };

        const leave = () => {
          gsap.to(icon, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
            overwrite: true,
          });

          gsap.to(content, {
            x: 0,
            duration: 0.3,
            ease: "power2.out",
            overwrite: true,
          });

          gsap.to(line, {
            scaleX: 1,
            duration: 0.3,
            ease: "power2.out",
            overwrite: true,
          });
        };

        item.addEventListener("mouseenter", enter);
        item.addEventListener("mouseleave", leave);

        return () => {
          item.removeEventListener("mouseenter", enter);
          item.removeEventListener("mouseleave", leave);
        };
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="why-choose-us"
      aria-labelledby="why-choose-us-title"
    >
      <div className="wcu-container">
        {/* =========================================
            HEADER
        ========================================== */}
        <header className="wcu-header">
          <span className="wcu-eyebrow">REASONS</span>

          <h2 id="why-choose-us-title" className="wcu-title">
            Why Choose Us
          </h2>

          <span
            className="wcu-title-line"
            aria-hidden="true"
          />
        </header>

        {/* =========================================
            REASONS
        ========================================== */}
        <div className="wcu-list">
          {reasons.map((reason, index) => (
            <article
              key={reason.id}
              className="wcu-item"
              style={
                {
                  "--item-accent": reason.accent,
                } as React.CSSProperties
              }
            >
              <div className="wcu-item-heading">
                <h3>{reason.title}</h3>

                <span
                  className="wcu-item-line"
                  aria-hidden="true"
                />
              </div>

              <div className="wcu-item-body">
                <div className="wcu-icon-wrap">
                  <div className="wcu-icon-glow" />

                  <div className="wcu-icon">
                    <img
                      src={reason.icon}
                      alt=""
                      aria-hidden="true"
                      loading={index < 3 ? "eager" : "lazy"}
                      draggable={false}
                    />
                  </div>
                </div>

                <div className="wcu-content">
                  <p>{reason.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}