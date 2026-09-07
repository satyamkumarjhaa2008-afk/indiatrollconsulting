"use client";

import React from "react";
import Link from "next/link";

import HeroCarousel from "@/components/hero-carousel";
import SiteFooter from "@/components/site-footer";
import SiteNavbar from "@/components/site-navbar";
import ServicesCarousel from "@/components/services-carousel";
import ContactForm from "@/components/contactform";
import Impact from "@/components/impact";
import WhyChooseUs from "@/components/WhyChooseUs";

/* ============================================================
   INDIA TROLL — RESULTS DATA
   ============================================================ */

const results = [
  {
    title: "Urban Elections & Ground Intelligence (2026)",
    description:
      "Comprehensive ground research and voter sentiment analysis across urban local bodies and key constituencies in Maharashtra.",
    category: "Urban Election Research",
  },
  {
    title: "Lok Sabha Election Research & Analysis",
    description:
      "Detailed constituency research, voter sentiment mapping, and data-led insights for parliamentary election planning.",
    category: "Parliamentary Research",
  },
  {
    title: "Assembly & Constituency Research",
    description:
      "Ground-level research on voting trends, local issues, constituency dynamics, leadership perception, and emerging electoral patterns across Maharashtra and beyond.",
    category: "Assembly Research",
  },
  {
    title: "State Election Research & Strategy",
    description:
      "Data-backed constituency analysis, voter sentiment research, and issue tracking to support informed electoral strategy and planning.",
    category: "State Election Research",
  },
];

/* ============================================================
   WINNING THRONE SECTION
   ============================================================ */

function WinningThroneSection() {
  return (
    <section
      className="winning-throne-section"
      aria-label="Winning"
    >
      <div className="winning-throne-container">
        <div
          className="winning-throne-visual"
          aria-hidden="true"
        >
          <div className="winning-throne-glow" />

          <img
            src="/assets/win-thrones-chess.png"
            alt=""
            className="winning-throne-image"
          />
        </div>

        <div className="winning-throne-copy">
          <p className="winning-throne-phrase">
            <span>There’s </span>

            <span className="winning-throne-highlight">
              winning
            </span>

            <span className="winning-throne-final">
              {" "}and then, everything else.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   INDIA TROLL RESULTS SECTION
   ============================================================ */

function IndiaTrollResultsSection() {
  return (
    <section
      className="rudra-results-section"
      aria-labelledby="rudra-results-title"
    >
      <div className="rudra-results-container">

        <div className="rudra-results-header">
          <p className="rudra-results-eyebrow">
            Proven Track Record
          </p>

          <h2
            id="rudra-results-title"
            className="rudra-results-title"
          >
            India Troll Research &amp; Proven Insights
          </h2>

          <span
            className="rudra-results-line"
            aria-hidden="true"
          />
        </div>

        <div className="rudra-results-grid">
          {results.map((result, index) => (
            <article
              key={`${result.title}-${index}`}
              className="rudra-result-card"
              tabIndex={0}
            >
              <div className="rudra-result-card-content">
                <h3 className="rudra-result-title">
                  {result.title}
                </h3>

                <p className="rudra-result-description">
                  {result.description}
                </p>
              </div>

              <div className="rudra-result-category">
                <span>{result.category}</span>

                <span
                  className="rudra-result-arrow"
                  aria-hidden="true"
                >
                  →
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ============================================================
   ABOUT / WHAT WE DO SECTION
   ============================================================ */

function AboutWhatWeDoSection() {
  return (
    <section
      className="about-wedo-section"
      aria-labelledby="about-wedo-title"
    >
      <div className="about-wedo-container">

        {/* LEFT CONTENT */}
        <div className="about-wedo-content">

          <p className="about-wedo-eyebrow">
            About Us
          </p>

          <h2
            id="about-wedo-title"
            className="about-wedo-title"
          >
            What We Do
          </h2>

          <span
            className="about-wedo-line"
            aria-hidden="true"
          />

          <p className="about-wedo-description">
            India Troll delivers election research, ground intelligence,
            voter sentiment studies, and data-backed insights that help
            organisations understand public opinion, constituencies,
            issues, and emerging political trends across India.
          </p>

          <Link
            href="/about"
            className="about-wedo-read-more"
          >
            <span
              className="about-wedo-arrow-left"
              aria-hidden="true"
            >
              ‹
            </span>

            <span>Read More</span>

            <span
              className="about-wedo-arrow-right"
              aria-hidden="true"
            >
              ›
            </span>
          </Link>

        </div>

        {/* RIGHT VISUAL */}
        <div className="about-wedo-visual">

          <div
            className="about-wedo-visual-glow"
            aria-hidden="true"
          />

          <img
            src="/assets/india-map-analytics.png"
            alt=""
            className="about-wedo-map"
            aria-hidden="true"
          />

          <div className="about-wedo-illustration">
            <div className="about-wedo-image-frame">
              <div className="about-wedo-image-accent" />
              <div className="about-wedo-image-accent-secondary" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

/* ============================================================
   HOME PAGE
   ============================================================ */

export default function Home() {
  return (
    <main
      id="home"
      className="min-h-screen bg-background"
    >
      <SiteNavbar />

      <HeroCarousel />

      {/* EXIT POLL RESULTS */}
      <IndiaTrollResultsSection />

      {/* ABOUT / WHAT WE DO */}
      <AboutWhatWeDoSection />

      <WhyChooseUs />

      <WinningThroneSection />

      <Impact />

      <ServicesCarousel />

      <ContactForm />

      <SiteFooter />
    </main>
  );
}