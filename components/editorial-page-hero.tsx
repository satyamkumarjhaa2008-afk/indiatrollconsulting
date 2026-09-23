"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import "./editorial-page-hero.css";

type EditorialPageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  accentWord?: string;
};

export function EditorialPageHero({
  eyebrow,
  title,
  description,
  accentWord,
}: EditorialPageHeroProps) {
  const rootRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const words = root.querySelectorAll<HTMLElement>(".editorial-hero-word");
      const eyebrowParts = root.querySelectorAll<HTMLElement>(".editorial-hero-eyebrow > *");
      const description = root.querySelector<HTMLElement>(".editorial-hero-description");
      const line = root.querySelector<HTMLElement>(".editorial-hero-line");
      const hint = root.querySelector<HTMLElement>(".editorial-hero-scroll");
      const orb = root.querySelector<HTMLElement>(".editorial-hero-orb");
      const grid = root.querySelector<HTMLElement>(".editorial-hero-grid");

      if (reduceMotion) {
        gsap.set([eyebrowParts, words, description, line, hint, orb, grid], { clearProps: "all" });
        return;
      }

      gsap.set(eyebrowParts, { y: 16, autoAlpha: 0 });
      gsap.set(words, { yPercent: 115, rotateX: -55, autoAlpha: 0 });
      gsap.set(description, { y: 24, autoAlpha: 0 });
      gsap.set(line, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(hint, { y: 12, autoAlpha: 0 });
      gsap.set(orb, { scale: 0.65, autoAlpha: 0 });
      gsap.set(grid, { autoAlpha: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(grid, { autoAlpha: 1, duration: 0.5 })
        .to(orb, { scale: 1, autoAlpha: 1, duration: 1.25, ease: "power2.out" }, "-=0.4")
        .to(eyebrowParts, { y: 0, autoAlpha: 1, duration: 0.55, stagger: 0.08 }, "-=0.8")
        .to(words, { yPercent: 0, rotateX: 0, autoAlpha: 1, duration: 0.95, stagger: 0.075, ease: "power4.out" }, "-=0.3")
        .to(line, { scaleX: 1, duration: 0.7, ease: "power2.inOut" }, "-=0.45")
        .to(description, { y: 0, autoAlpha: 1, duration: 0.7 }, "-=0.3")
        .to(hint, { y: 0, autoAlpha: 1, duration: 0.55 }, "-=0.2");

      gsap.to(orb, {
        x: 35,
        y: -20,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const words = title.split(/\s+/).filter(Boolean);

  return (
    <section ref={rootRef} className="editorial-page-hero" aria-labelledby="editorial-page-hero-title">
      <div className="editorial-hero-grid" aria-hidden="true" />
      <div className="editorial-hero-orb" aria-hidden="true" />

      <div className="editorial-page-hero-inner">
        <div className="editorial-hero-eyebrow">
          <span className="editorial-hero-eyebrow-line" aria-hidden="true" />
          <span>{eyebrow}</span>
          <span className="editorial-hero-index" aria-hidden="true">/ 01</span>
        </div>

        <h1 id="editorial-page-hero-title" className="editorial-hero-title" aria-label={title}>
          {words.map((word, index) => (
            <span className="editorial-hero-word-wrap" key={`${word}-${index}`}>
              <span className={`editorial-hero-word${accentWord && word.toLowerCase() === accentWord.toLowerCase() ? " is-accent" : ""}`}>
                {word}
              </span>
            </span>
          ))}
        </h1>

        <span className="editorial-hero-line" aria-hidden="true" />
        <p className="editorial-hero-description">{description}</p>

        <div className="editorial-hero-scroll" aria-hidden="true">
          <span className="editorial-hero-scroll-line" />
          <span>SCROLL TO EXPLORE</span>
          <span className="editorial-hero-scroll-dot" />
        </div>
      </div>
    </section>
  );
}

export default EditorialPageHero;
