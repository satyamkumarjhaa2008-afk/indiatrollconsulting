"use client";

import React, {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./careers.css";

import { OnRoleJD, InternJD } from "@/components/data";
import SiteNavbar from "@/components/site-navbar";
import SiteFooter from "@/components/site-footer";

gsap.registerPlugin(ScrollTrigger);

type FilterType = "all" | "fulltime" | "internship";

const CareersPage = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const pageRef = useRef<HTMLElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const heroGlowRef = useRef<HTMLDivElement | null>(null);
  const heroOrbRef = useRef<HTMLDivElement | null>(null);
  const heroGridRef = useRef<HTMLDivElement | null>(null);
  const heroContentRef = useRef<HTMLDivElement | null>(null);
  const heroLabelRef = useRef<HTMLSpanElement | null>(null);
  const heroTitleRef = useRef<HTMLHeadingElement | null>(null);
  const heroCopyRef = useRef<HTMLParagraphElement | null>(null);
  const heroMetaRef = useRef<HTMLDivElement | null>(null);

  const headingRef = useRef<HTMLDivElement | null>(null);
  const filtersRef = useRef<HTMLDivElement | null>(null);
  const countRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const detailRefs = useRef<(HTMLDivElement | null)[]>([]);

  const jobs =
    activeFilter === "fulltime"
      ? OnRoleJD
      : activeFilter === "internship"
        ? InternJD
        : [...OnRoleJD, ...InternJD];

  const animateJobDetails = useCallback((index: number) => {
    const details = detailRefs.current[index];

    if (!details) return;

    gsap.fromTo(
      details,
      {
        y: -18,
        clipPath: "inset(0 0 100% 0)",
      },
      {
        y: 0,
        clipPath: "inset(0 0 0% 0)",
        duration: 0.65,
        ease: "power3.out",
        clearProps: "clipPath",
      }
    );

    const sections = details.querySelectorAll(".job-section");
    const footer = details.querySelector(".job-details-footer");

    gsap.fromTo(
      sections,
      {
        y: 18,
      },
      {
        y: 0,
        duration: 0.55,
        stagger: 0.07,
        delay: 0.08,
        ease: "power3.out",
        clearProps: "transform",
      }
    );

    if (footer) {
      gsap.fromTo(
        footer,
        {
          y: 15,
        },
        {
          y: 0,
          duration: 0.5,
          delay: 0.3,
          ease: "power3.out",
          clearProps: "transform",
        }
      );
    }
  }, []);

  useLayoutEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: "(min-width: 769px)",
          mobile: "(max-width: 768px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { desktop, mobile, reduceMotion } =
            context.conditions as {
              desktop: boolean;
              mobile: boolean;
              reduceMotion: boolean;
            };

          if (reduceMotion) {
            return;
          }

          const heroTl = gsap.timeline({
            defaults: {
              ease: "power4.out",
            },
          });

          heroTl
            .fromTo(
              heroGridRef.current,
              {
                opacity: 0,
              },
              {
                opacity: 1,
                duration: 1.4,
              }
            )
            .fromTo(
              heroGlowRef.current,
              {
                opacity: 0,
                scale: 0.7,
              },
              {
                opacity: 1,
                scale: 1,
                duration: 1.5,
              },
              "-=1.1"
            )
            .fromTo(
              heroOrbRef.current,
              {
                opacity: 0,
                scale: 0.5,
                rotation: -25,
              },
              {
                opacity: 0.8,
                scale: 1,
                rotation: 0,
                duration: 1.4,
              },
              "-=1.1"
            )
            .fromTo(
              heroLabelRef.current,
              {
                y: 24,
                letterSpacing: "0.5em",
              },
              {
                y: 0,
                letterSpacing: "0.28em",
                duration: 0.8,
                clearProps: "transform",
              },
              "-=0.8"
            )
            .fromTo(
              heroTitleRef.current,
              {
                y: 55,
                clipPath: "inset(100% 0 0 0)",
              },
              {
                y: 0,
                clipPath: "inset(0% 0 0 0)",
                duration: 1.15,
                clearProps: "transform,clipPath",
              },
              "-=0.5"
            )
            .fromTo(
              heroCopyRef.current,
              {
                y: 25,
              },
              {
                y: 0,
                duration: 0.8,
                clearProps: "transform",
              },
              "-=0.55"
            )
            .fromTo(
              heroMetaRef.current,
              {
                y: 18,
              },
              {
                y: 0,
                duration: 0.7,
                clearProps: "transform",
              },
              "-=0.4"
            );

          if (desktop) {
            gsap.to(heroOrbRef.current, {
              y: -35,
              rotation: 8,
              duration: 5,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
            });

            gsap.to(heroGlowRef.current, {
              scale: 1.08,
              opacity: 0.72,
              duration: 4,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
            });

            gsap.to(heroGridRef.current, {
              yPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 1.2,
              },
            });

            gsap.to(heroContentRef.current, {
              yPercent: -10,
              ease: "none",
              scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 1.5,
              },
            });
          } else if (mobile) {
            gsap.to(heroOrbRef.current, {
              y: -18,
              duration: 4,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
            });

            gsap.to(heroGlowRef.current, {
              scale: 1.04,
              duration: 3.5,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
            });
          }

          if (headingRef.current) {
            gsap.fromTo(
              headingRef.current,
              {
                y: 60,
              },
              {
                y: 0,
                duration: 1,
                ease: "power3.out",
                clearProps: "transform",
                scrollTrigger: {
                  trigger: headingRef.current,
                  start: "top 82%",
                  once: true,
                },
              }
            );
          }

          if (filtersRef.current) {
            gsap.fromTo(
              filtersRef.current,
              {
                y: 30,
              },
              {
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                clearProps: "transform",
                scrollTrigger: {
                  trigger: filtersRef.current,
                  start: "top 88%",
                  once: true,
                },
              }
            );
          }

          if (countRef.current) {
            gsap.fromTo(
              countRef.current,
              {
                x: -20,
              },
              {
                x: 0,
                duration: 0.6,
                ease: "power3.out",
                clearProps: "transform",
                scrollTrigger: {
                  trigger: countRef.current,
                  start: "top 90%",
                  once: true,
                },
              }
            );
          }

          const cards = cardRefs.current.filter(Boolean);

          cards.forEach((card, index) => {
            if (!card) return;

            gsap.fromTo(
              card,
              {
                y: mobile ? 35 : 55,
                rotateX: desktop ? 5 : 0,
                scale: 0.985,
                transformPerspective: 1000,
              },
              {
                y: 0,
                rotateX: 0,
                scale: 1,
                duration: 0.85,
                delay: Math.min(index * 0.06, 0.35),
                ease: "power3.out",
                clearProps: "transform",
                scrollTrigger: {
                  trigger: card,
                  start: "top 92%",
                  once: true,
                },
              }
            );

            if (desktop) {
              const number = card.querySelector(".job-number");
              const line = card.querySelector(".job-card-line");

              card.addEventListener("mouseenter", () => {
                gsap.to(card, {
                  y: -5,
                  duration: 0.35,
                  ease: "power2.out",
                  overwrite: true,
                });

                if (number) {
                  gsap.to(number, {
                    scale: 1.08,
                    rotate: 8,
                    duration: 0.35,
                    ease: "back.out(2)",
                    overwrite: true,
                  });
                }

                if (line) {
                  gsap.to(line, {
                    scaleX: 1,
                    duration: 0.5,
                    ease: "power3.out",
                    overwrite: true,
                  });
                }
              });

              card.addEventListener("mouseleave", () => {
                gsap.to(card, {
                  y: 0,
                  duration: 0.45,
                  ease: "power3.out",
                  overwrite: true,
                });

                if (number) {
                  gsap.to(number, {
                    scale: 1,
                    rotate: 0,
                    duration: 0.35,
                    ease: "power3.out",
                    overwrite: true,
                  });
                }

                if (line) {
                  gsap.to(line, {
                    scaleX: 0,
                    duration: 0.35,
                    ease: "power2.out",
                    overwrite: true,
                  });
                }
              });
            }
          });

          if (listRef.current && desktop) {
            gsap.to(listRef.current, {
              "--list-glow": "1",
              scrollTrigger: {
                trigger: listRef.current,
                start: "top 75%",
                end: "bottom 25%",
                scrub: true,
              },
            });
          }
        }
      );

      return () => mm.revert();
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleFilterChange = (filter: FilterType) => {
    if (filter === activeFilter) return;

    const cards = cardRefs.current.filter(Boolean);

    gsap.to(cards, {
      y: 18,
      scale: 0.985,
      duration: 0.25,
      stagger: 0.025,
      ease: "power2.in",
      overwrite: true,
      onComplete: () => {
        setActiveFilter(filter);
        setExpandedIndex(null);

        window.requestAnimationFrame(() => {
          const newCards = document.querySelectorAll(".job-card");

          gsap.fromTo(
            newCards,
            {
              y: 28,
              scale: 0.985,
            },
            {
              y: 0,
              scale: 1,
              duration: 0.55,
              stagger: 0.045,
              ease: "power3.out",
              clearProps: "transform",
            }
          );
        });
      },
    });
  };

  const handleToggle = (index: number) => {
    const nextIndex = expandedIndex === index ? null : index;

    if (expandedIndex !== null && expandedIndex !== index) {
      const currentDetails = detailRefs.current[expandedIndex];

      if (currentDetails) {
        gsap.to(currentDetails, {
          y: -10,
          duration: 0.22,
          ease: "power2.in",
          overwrite: true,
        });
      }
    }

    setExpandedIndex(nextIndex);

    if (nextIndex !== null) {
      window.requestAnimationFrame(() => {
        animateJobDetails(nextIndex);
      });
    }
  };

  return (
    <main ref={pageRef} className="careers-page">
      <SiteNavbar />

      <section ref={heroRef} className="careers-hero">
        <div ref={heroGridRef} className="careers-hero-grid" />
        <div ref={heroGlowRef} className="careers-hero-glow" />

        <div ref={heroOrbRef} className="careers-hero-orb">
          <span />
          <span />
          <span />
        </div>

        <div className="careers-hero-noise" />

        <div ref={heroContentRef} className="careers-hero-content">
          <div className="hero-kicker">
            <span className="hero-kicker-line" />
            <span ref={heroLabelRef}>CAREERS</span>
            <span className="hero-kicker-line" />
          </div>

          <h1 ref={heroTitleRef}>
            Build What
            <br />
            <span>Matters.</span>
          </h1>

          <p ref={heroCopyRef}>
            Join a team working at the intersection of research, data,
            strategy, technology, and real-world impact.
          </p>

          <div ref={heroMetaRef} className="hero-meta">
            <div className="hero-meta-item">
              <span className="hero-meta-dot" />
              <span>Research</span>
            </div>

            <div className="hero-meta-item">
              <span className="hero-meta-dot" />
              <span>Strategy</span>
            </div>

            <div className="hero-meta-item">
              <span className="hero-meta-dot" />
              <span>Technology</span>
            </div>

            <div className="hero-meta-item">
              <span className="hero-meta-dot" />
              <span>Impact</span>
            </div>
          </div>

          <div className="hero-scroll-indicator">
            <span>SCROLL TO EXPLORE</span>
            <i />
          </div>
        </div>
      </section>

      <section className="careers-container">
        <div ref={headingRef} className="careers-heading">
          <div className="section-eyebrow">
            <span />
            OPPORTUNITIES
          </div>

          <div className="heading-layout">
            <h2>
              Find your next
              <br />
              <span>opportunity.</span>
            </h2>

            <p>
              Explore our current openings and discover a role where your
              skills, ideas, and ambition can create meaningful impact.
            </p>
          </div>

          <div className="heading-rule">
            <span />
          </div>
        </div>

        <div ref={filtersRef} className="career-filters">
          <div className="filter-glider" />

          <button
            type="button"
            className={activeFilter === "all" ? "active" : ""}
            onClick={() => handleFilterChange("all")}
          >
            <span>01</span>
            All Opportunities
          </button>

          <button
            type="button"
            className={activeFilter === "fulltime" ? "active" : ""}
            onClick={() => handleFilterChange("fulltime")}
          >
            <span>02</span>
            Full-Time Roles
          </button>

          <button
            type="button"
            className={activeFilter === "internship" ? "active" : ""}
            onClick={() => handleFilterChange("internship")}
          >
            <span>03</span>
            Internships
          </button>
        </div>

        <div ref={countRef} className="job-count">
          <span className="count-line" />

          <span>
            Showing <strong>{jobs.length}</strong>{" "}
            {jobs.length === 1 ? "opportunity" : "opportunities"}
          </span>

          <span className="count-status">
            OPEN POSITIONS
            <i />
          </span>
        </div>

        <div ref={listRef} className="job-list">
          {jobs.map((job, index) => {
            const isExpanded = expandedIndex === index;

            const experience: string[] =
              "Experience" in job && Array.isArray(job.Experience)
                ? job.Experience
                : ["Freshers are welcome to apply"];

            return (
              <article
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
                className={`job-card ${isExpanded ? "expanded" : ""}`}
                key={`${job["Job Title"]}-${index}`}
              >
                <span className="job-card-line" />

                <button
                  type="button"
                  className="job-card-header"
                  onClick={() => handleToggle(index)}
                  aria-expanded={isExpanded}
                  aria-controls={`job-details-${index}`}
                >
                  <div className="job-title-wrapper">
                    <span className="job-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="job-title-content">
                      <span className="job-type">
                        {"Experience" in job
                          ? "FULL-TIME ROLE"
                          : "INTERNSHIP"}
                      </span>

                      <h3>{job["Job Title"]}</h3>
                    </div>
                  </div>

                  <span
                    className={`job-toggle ${isExpanded ? "open" : ""}`}
                    aria-hidden="true"
                  >
                    <i />
                    <i />
                  </span>
                </button>

                {isExpanded && (
                  <div
                    ref={(element) => {
                      detailRefs.current[index] = element;
                    }}
                    id={`job-details-${index}`}
                    className="job-details"
                  >
                    <div className="details-intro">
                      <span>ROLE DETAILS</span>
                      <div />
                    </div>

                    <div className="job-section">
                      <h4>
                        <span />
                        Role Overview
                      </h4>

                      <p>{job["Role Overview"]}</p>
                    </div>

                    <div className="job-section">
                      <h4>
                        <span />
                        Key Responsibilities
                      </h4>

                      <ul>
                        {job["Key Responsibilities"].map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="job-section">
                      <h4>
                        <span />
                        Required Skills
                      </h4>

                      <ul>
                        {job["Required Skills"].map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="job-info-grid">
                      <div className="job-section">
                        <h4>
                          <span />
                          Education
                        </h4>

                        <ul>
                          {job["Education"].map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="job-section">
                        <h4>
                          <span />
                          Experience
                        </h4>

                        <ul>
                          {experience.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="job-section">
                      <h4>
                        <span />
                        Work Nature
                      </h4>

                      <ul>
                        {job["Work Nature"].map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="job-details-footer">
                      <div className="job-location-detail">
                        <span>LOCATION</span>
                        <strong>{job.Location}</strong>
                      </div>

                      <button
                        type="button"
                        className="apply-button"
                      >
                        <span className="apply-label">Apply Now</span>
                        <span className="apply-arrow">↗</span>
                        <span className="apply-shine" />
                      </button>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {jobs.length === 0 && (
          <div className="no-jobs">
            <div className="no-jobs-icon">
              <span />
              <span />
            </div>

            <span className="no-jobs-label">CURRENTLY CLOSED</span>

            <h3>No opportunities available</h3>

            <p>
              There are currently no openings in this category.
              Please check back later.
            </p>
          </div>
        )}
      </section>

      <section className="careers-bottom-cta">
        <div className="cta-glow" />

        <div className="cta-inner">
          <span className="cta-label">THE NEXT CHAPTER</span>

          <h2>
            Your work could
            <br />
            <span>matter here.</span>
          </h2>

          <p>
            We are always interested in meeting thoughtful people who want
            to solve meaningful problems and build things that matter.
          </p>

          <div className="cta-line">
            <span />
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
};

export default CareersPage;