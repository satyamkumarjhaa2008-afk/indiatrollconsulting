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

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const eyebrow = section.querySelector(".wcu-eyebrow");
      const title = section.querySelector(".wcu-title");
      const titleLine = section.querySelector(".wcu-title-line");

      if (!eyebrow || !title || !titleLine) return;

      // Animate only the section heading. The cards are intentionally
      // NOT controlled by GSAP/ScrollTrigger. This prevents mobile
      // scrolling and ScrollTrigger refreshes from ever hiding or
      // shifting an icon/description.
      gsap.fromTo(
        [eyebrow, title, titleLine],
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "transform,opacity",
        }
      );
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
                  <p className="wcu-description">{reason.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}