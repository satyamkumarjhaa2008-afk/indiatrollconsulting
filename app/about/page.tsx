"use client";

import React, { useEffect, useRef, useState } from "react";
import "./about.css";
import ImaggeViewer from "@/components/View";
import ContactForm from "@/components/contactform";
import SiteNavbar from "@/components/site-navbar";

interface StrategicItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

const strategicItems: StrategicItem[] = [
  {
    id: "01",
    icon: "/assets/icons/icons3/i1.svg",
    title: "Ground-Level Understanding",
    description:
      "We capture real inputs from the ground — voter sentiment, local issues, organisational strength, and field-level feedback. This ensures decisions are based on reality, not assumptions.",
  },
  {
    id: "02",
    icon: "/assets/icons/icons3/i2.svg",
    title: "Structured Analysis & Validation",
    description:
      "Collected inputs are validated and analysed by our research team, data analysts, and psephologists using proven methods. This helps identify key patterns, risks, and priority areas.",
  },
  {
    id: "03",
    icon: "/assets/icons/icons3/i3.svg",
    title: "Strategy Direction & Priority Setting",
    description:
      "Based on insights, we define clear direction — where to focus, what to prioritise, and what actions are required. The aim is to align efforts with ground realities for maximum impact.",
  },
  {
    id: "04",
    icon: "/assets/icons/icons3/i4.svg",
    title: "Strategy Direction & Priority Setting",
    description:
      "Based on insights, we define clear direction — where to focus, what to prioritise, and what actions are required. The aim is to align efforts with ground realities for maximum impact.",
  },
  {
    id: "05",
    icon: "/assets/icons/icons3/i5.svg",
    title: "Continuous Monitoring & Support",
    description:
      "We track changes on the ground, emerging issues, and response to actions taken. This enables timely course correction and better control over outcomes.",
  },
];

const Page = () => {
  const aboutAppRef = useRef<HTMLElement | null>(null);
  const strategicRef = useRef<HTMLElement | null>(null);
  const lifeRudraRef = useRef<HTMLElement | null>(null);

  // =========================================================
  // CONTACT MODAL STATE
  // =========================================================

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const openContactModal = () => {
    setIsContactModalOpen(true);
  };

  const closeContactModal = () => {
    setIsContactModalOpen(false);
  };

  // =========================================================
  // PREVENT BACKGROUND SCROLL WHEN MODAL IS OPEN
  // =========================================================

  useEffect(() => {
    if (isContactModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isContactModalOpen]);

  // =========================================================
  // CLOSE MODAL WITH ESCAPE KEY
  // =========================================================

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsContactModalOpen(false);
      }
    };

    if (isContactModalOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isContactModalOpen]);

  // =========================================================
  // ABOUT APP INTERSECTION ANIMATION
  // =========================================================

  useEffect(() => {
    const section = aboutAppRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("about-app-visible");
          observer.unobserve(section);
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  // =========================================================
  // STRATEGIC APPROACH INTERSECTION ANIMATION
  // =========================================================

  useEffect(() => {
    const section = strategicRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("strategic-visible");
          observer.unobserve(section);
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  // =========================================================
  // LIFE @ RUDRA INTERSECTION ANIMATION
  // =========================================================

  useEffect(() => {
    const section = lifeRudraRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("life-rudra-visible");
          observer.unobserve(section);
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -80px 0px",
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* =========================================================
          ABOUT APP SECTION
          ========================================================= */}
<SiteNavbar/>
      <section
        ref={aboutAppRef}
        className="about-app-section"
      >
        <div className="about-app-container">

          {/* HAND / PHONE */}

          <div className="about-hand-reveal">
            <div className="about-hand-float">
              <img
                src="/hands.png"
                alt="Hand holding phone"
                className="about-hand-image"
              />
            </div>
          </div>

          {/* TEXT */}

          <div className="about-app-text">
            <p>
              Our experts use an{" "}
              <span>Exclusive App</span>
            </p>

            <p>
              to conduct unbiased, accurate surveys.
            </p>
          </div>

        </div>
      </section>

      {/* =========================================================
          STRATEGIC APPROACH SECTION
          ========================================================= */}

      <section
        ref={strategicRef}
        className="strategic-approach-section"
      >
        <div className="strategic-approach-container">

          {/* HEADING */}

          <div className="strategic-heading">

            <div className="strategic-small-title">
              STRATEGIC
            </div>

            <h2>
              APPROACH
            </h2>

            <div className="strategic-heading-line"></div>

            <p>
              Our work is driven by ground reality and practical
              decision-making. We focus on understanding what is
              happening on the ground and converting it into clear
              direction for action.
            </p>

          </div>

          {/* =====================================================
              FIRST ROW
              ===================================================== */}

          <div
            className="
              strategic-timeline-row
              strategic-row-one
            "
          >

            {/* HORIZONTAL LINE */}

            <div className="strategic-horizontal-line">
              <span className="line-dot line-dot-left"></span>
              <span className="line-dot line-dot-right"></span>
            </div>

            {/* ARROW 01 → 02 */}

            <div
              className="
                strategic-arrow
                strategic-arrow-one
              "
            >
              <svg
                viewBox="0 0 180 90"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M5 58 C55 8, 125 8, 172 62"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray="8 7"
                />

                <path
                  d="M158 52 L173 64 L157 68"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* ARROW 02 → 03 */}

            <div
              className="
                strategic-arrow
                strategic-arrow-two
              "
            >
              <svg
                viewBox="0 0 180 90"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M5 58 C55 8, 125 8, 172 62"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray="8 7"
                />

                <path
                  d="M158 52 L173 64 L157 68"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* ITEM 01 */}

            <div
              className="
                strategic-item
                strategic-item-01
              "
            >
              <div className="strategic-icon-wrapper">
                <div className="strategic-icon-circle">
                  <img
                    src={strategicItems[0].icon}
                    alt=""
                    className="strategic-icon"
                  />
                </div>
              </div>

              <div className="strategic-number">
                <span>01</span>
              </div>

              <div className="strategic-card">
                <h3>
                  {strategicItems[0].title}
                </h3>

                <p>
                  {strategicItems[0].description}
                </p>
              </div>
            </div>

            {/* ITEM 02 */}

            <div
              className="
                strategic-item
                strategic-item-02
              "
            >
              <div className="strategic-icon-wrapper">
                <div className="strategic-icon-circle">
                  <img
                    src={strategicItems[1].icon}
                    alt=""
                    className="strategic-icon"
                  />
                </div>
              </div>

              <div className="strategic-number">
                <span>02</span>
              </div>

              <div className="strategic-card">
                <h3>
                  {strategicItems[1].title}
                </h3>

                <p>
                  {strategicItems[1].description}
                </p>
              </div>
            </div>

            {/* ITEM 03 */}

            <div
              className="
                strategic-item
                strategic-item-03
              "
            >
              <div className="strategic-icon-wrapper">
                <div className="strategic-icon-circle">
                  <img
                    src={strategicItems[2].icon}
                    alt=""
                    className="strategic-icon"
                  />
                </div>
              </div>

              <div className="strategic-number">
                <span>03</span>
              </div>

              <div className="strategic-card">
                <h3>
                  {strategicItems[2].title}
                </h3>

                <p>
                  {strategicItems[2].description}
                </p>
              </div>
            </div>

          </div>

          {/* =====================================================
              SECOND ROW
              ===================================================== */}

          <div
            className="
              strategic-timeline-row
              strategic-row-two
            "
          >

            {/* HORIZONTAL LINE */}

            <div className="strategic-horizontal-line">
              <span className="line-dot line-dot-left"></span>
              <span className="line-dot line-dot-right"></span>
            </div>

            {/* ARROW 04 → 05 */}

            <div
              className="
                strategic-arrow
                strategic-arrow-three
              "
            >
              <svg
                viewBox="0 0 180 90"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M5 58 C55 8, 125 8, 172 62"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray="8 7"
                />

                <path
                  d="M158 52 L173 64 L157 68"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* ITEM 04 */}

            <div
              className="
                strategic-item
                strategic-item-04
              "
            >
              <div className="strategic-icon-wrapper">
                <div className="strategic-icon-circle">
                  <img
                    src={strategicItems[3].icon}
                    alt=""
                    className="strategic-icon"
                  />
                </div>
              </div>

              <div className="strategic-number">
                <span>04</span>
              </div>

              <div className="strategic-card">
                <h3>
                  {strategicItems[3].title}
                </h3>

                <p>
                  {strategicItems[3].description}
                </p>
              </div>
            </div>

            {/* ITEM 05 */}

            <div
              className="
                strategic-item
                strategic-item-05
              "
            >
              <div className="strategic-icon-wrapper">
                <div className="strategic-icon-circle">
                  <img
                    src={strategicItems[4].icon}
                    alt=""
                    className="strategic-icon"
                  />
                </div>
              </div>

              <div className="strategic-number">
                <span>05</span>
              </div>

              <div className="strategic-card">
                <h3>
                  {strategicItems[4].title}
                </h3>

                <p>
                  {strategicItems[4].description}
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================
          LIFE @ RUDRA
          ========================================================= */}

      <section
        ref={lifeRudraRef}
        className="life-rudra-section"
      >
        <div className="life-rudra-container">

          {/* =====================================================
              LIFE @ RUDRA HEADER
              ===================================================== */}

          <div
            className="
              life-rudra-header
              life-rudra-reveal
            "
          >
            <div className="life-rudra-label">
              Life@Rudra
            </div>

            <h2>
              Deeply committed to our people.
            </h2>

            <div className="life-rudra-heading-line"></div>
          </div>

          {/* =====================================================
              DESCRIPTION
              ===================================================== */}

          <div
            className="
              life-rudra-description
              life-rudra-reveal
            "
          >
            <p>
              We firmly believe in being considerate towards one
              another. Our results are born out of collaboration
              and our commitment to inclusivity, care, and respect.
              We are driven by our work and how important it is,
              and also make the time to celebrate one another
              through commendations, recognitions, and by building
              human connections.
            </p>
          </div>

          {/* =====================================================
              IMAGE GALLERY
              ===================================================== */}

          <ImaggeViewer>
            <div className="life-rudra-gallery">

              {/* IMAGE 1 */}

              <div
                className="
                  life-rudra-image-card
                  life-rudra-reveal
                  life-rudra-image-card-1
                "
              >
                <img
                  src="/assets/ImgForAbout/Img1.jpeg"
                  alt="Rudra Group annual conference"
                  className="life-rudra-image"
                />
              </div>

              {/* IMAGE 2 */}

              <div
                className="
                  life-rudra-image-card
                  life-rudra-reveal
                  life-rudra-image-card-2
                "
              >
                <img
                  src="/assets/ImgForAbout/Img2.jpeg"
                  alt="Rudra Group team activity"
                  className="life-rudra-image"
                />
              </div>

              {/* IMAGE 3 */}

              <div
                className="
                  life-rudra-image-card
                  life-rudra-reveal
                  life-rudra-image-card-3
                "
              >
                <img
                  src="/assets/ImgForAbout/Img3.jpeg"
                  alt="Rudra Group team celebration"
                  className="life-rudra-image"
                />
              </div>

            </div>
          </ImaggeViewer>

          {/* =====================================================
              CTA SECTION
              ===================================================== */}

          <div className="life-rudra-cta-area">

            {/* =================================================
                PARTNER WITH US
                ================================================= */}

            <div
              className="
                life-rudra-cta
                life-rudra-cta-left
                life-rudra-reveal
              "
            >
              <h3>
                Partner with us
              </h3>

              <button
                type="button"
                className="life-rudra-touch-button"
                aria-label="Get in touch for partnership"
                onClick={openContactModal}
              >
                <span className="life-rudra-button-arrow">
                  →
                </span>

                <span>
                  Get in touch
                </span>
              </button>
            </div>

            {/* =================================================
                JOIN OUR TEAM
                ================================================= */}

            <div
              className="
                life-rudra-cta
                life-rudra-cta-right
                life-rudra-reveal
              "
            >
              <h3>
                Join our team
              </h3>

              <button
                type="button"
                className="life-rudra-touch-button"
                aria-label="Get in touch to join our team"
                onClick={openContactModal}
              >
                <span className="life-rudra-button-arrow">
                  →
                </span>

                <span>
                  Get in touch
                </span>
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================
          CONTACT FORM MODAL
          ========================================================= */}

      {isContactModalOpen && (
        <div
          className="about-contact-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Contact form"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeContactModal();
            }
          }}
        >
          <div className="about-contact-modal">

            {/* CLOSE BUTTON */}

            <button
              type="button"
              className="about-contact-modal-close"
              onClick={closeContactModal}
              aria-label="Close contact form"
            >
              <span></span>
              <span></span>
            </button>

            {/* CONTACT FORM */}

            <div className="about-contact-modal-content">
              <ContactForm />
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default Page;