"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./team.css";
import SiteNavbar from "@/components/site-navbar";
import SiteFooter from "@/components/site-footer";

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   TEAM MEMBERS
   ------------------------------------------------------------
   FUTURE:
   To add another member, simply add another object to this
   array. The complete layout will automatically render it.
   ============================================================ */

interface TeamMember {
  name: string;
  role: string;
  image: string;
  email: string;
  linkedin: string;
  description: string;
  number: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Tejas",
    role: "Co-Founder & Director",
    image: "/assets/team/Tejasingle.png",

    // Replace these with the actual details.
    email: "mailto:your-email@example.com",
    linkedin: "https://www.linkedin.com/",

    number: "01",

    description:
      "Tejas brings a sharp blend of strategic thinking, execution, and a deep understanding of the ground realities that shape people, businesses, and communities. As a co-founder of India Troll, he plays an integral role in shaping the organisation’s vision, building meaningful systems, and turning ideas into focused, measurable execution. His approach combines curiosity, structured thinking, and a strong commitment to creating work that delivers real-world impact.",
  },

  /*
    ============================================================
    FUTURE MEMBER — COPY THIS OBJECT AND CHANGE THE DETAILS

    {
      name: "Member Name",
      role: "Designation",
      image: "/assets/team/member-image.jpeg",
      email: "mailto:member@example.com",
      linkedin: "https://www.linkedin.com/in/member",
      number: "02",
      description:
        "Write the member's introduction here.",
    },

    ============================================================
  */
];

const MailIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="team-social-icon"
  >
    <rect
      x="3"
      y="5"
      width="18"
      height="14"
      rx="2"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />

    <path
      d="M4 7l8 6 8-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="team-social-icon"
  >
    <path
      d="M6.5 8.5V18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />

    <path
      d="M6.5 6.2v.1"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />

    <path
      d="M11 18v-5.2c0-1.8 1-3 2.7-3 1.8 0 2.8 1.2 2.8 3V18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />

    <path
      d="M11 10v8"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="team-arrow-icon"
  >
    <path
      d="M5 19L19 5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />

    <path
      d="M8 5h11v11"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const page = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* ========================================================
         HERO ANIMATION
         ======================================================== */

      gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      }).from(".team-title-line", {
        y: 90,
        opacity: 0,
        rotateX: -30,
        duration: 1,
        stagger: 0.12,
      });

      /* ========================================================
         BACKGROUND ORBS
         ======================================================== */

      gsap.to(".team-orb", {
        x: 70,
        y: -35,
        duration: 8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(".team-orb-small", {
        x: -40,
        y: 45,
        duration: 6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      /* ========================================================
         TEAM MEMBER REVEAL
         ======================================================== */

      gsap.utils
        .toArray<HTMLElement>(".team-member")
        .forEach((member) => {
          const image = member.querySelector(".team-image-wrap");
          const content = member.querySelector(".team-member-content");
          const number = member.querySelector(".team-member-number");
          const divider = member.querySelector(".team-member-divider");

          const memberTl = gsap.timeline({
            scrollTrigger: {
              trigger: member,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          });

          memberTl
            .from(
              image,
              {
                y: 60,
                opacity: 0,
                scale: 0.95,
                duration: 1,
                ease: "power4.out",
              },
              0
            )
            .from(
              content,
              {
                x: 55,
                opacity: 0,
                duration: 0.9,
                ease: "power4.out",
              },
              0.15
            )
            .from(
              number,
              {
                x: 25,
                opacity: 0,
                duration: 0.6,
              },
              0.3
            )
            .from(
              divider,
              {
                scaleX: 0,
                transformOrigin: "left center",
                duration: 0.7,
              },
              0.35
            );
        });

      /* ========================================================
         IMAGE PARALLAX
         ======================================================== */

      gsap.utils
        .toArray<HTMLElement>(".team-image-inner")
        .forEach((image) => {
          gsap.fromTo(
            image,
            {
              yPercent: -4,
            },
            {
              yPercent: 4,
              ease: "none",
              scrollTrigger: {
                trigger: image,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            }
          );
        });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="team-page" ref={pageRef}>
      <SiteNavbar />

      <main>
        {/* =====================================================
            HERO
            ===================================================== */}

        <section className="team-hero">
          <div className="team-hero-grid" />

          <div className="team-orb" />
          <div className="team-orb-small" />

          <div className="team-hero-inner">
            <h1
              className="team-title"
              aria-label="The minds behind the mission"
            >
              <span className="team-title-line">The minds</span>

              <span className="team-title-line team-title-accent">
                behind
              </span>

              <span className="team-title-line">
                the mission.
              </span>
            </h1>
          </div>
        </section>

        {/* =====================================================
            TEAM MEMBERS
            ===================================================== */}

        <section className="team-members-section">
          <div className="team-section-label">
            <span>OUR TEAM</span>

            <span className="team-section-label-line" />
          </div>

          {teamMembers.map((member) => (
            <article
              className="team-member"
              key={member.name}
            >
              {/* =================================================
                  MEMBER IMAGE
                  ================================================= */}

              <div className="team-image-column">
                <div className="team-image-wrap">
                  <div className="team-image-frame">
                    <div className="team-image-inner">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="team-member-image"
                      />
                    </div>

                    <div className="team-image-shine" />

                    <div className="team-image-corner corner-top" />

                    <div className="team-image-corner corner-bottom" />
                  </div>

                  <div className="team-image-caption">
                    <span>INDIA TROLL</span>

                    <span>CO-FOUNDER</span>
                  </div>
                </div>
              </div>

              {/* =================================================
                  MEMBER CONTENT
                  ================================================= */}

              <div className="team-member-content">
                <div className="team-member-top">
                  <span className="team-member-number">
                    {member.number}
                  </span>

                  <span className="team-member-role">
                    {member.role}
                  </span>
                </div>

                <div className="team-member-divider" />

                <h2 className="team-member-name">
                  {member.name}
                </h2>

                <p className="team-member-description">
                  {member.description}
                </p>

                {/* =================================================
                    SOCIAL LINKS
                    ================================================= */}

                <div className="team-member-actions">
                  <a
                    href={member.email}
                    className="team-social-link"
                    aria-label={`Email ${member.name}`}
                  >
                    <span className="team-social-icon-box">
                      <MailIcon />
                    </span>

                    <span className="team-social-text">
                      <small>GET IN TOUCH</small>
                      <strong>Email</strong>
                    </span>

                    <span className="team-social-arrow">
                      <ArrowIcon />
                    </span>
                  </a>

                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="team-social-link"
                    aria-label={`${member.name} on LinkedIn`}
                  >
                    <span className="team-social-icon-box">
                      <LinkedInIcon />
                    </span>

                    <span className="team-social-text">
                      <small>CONNECT</small>
                      <strong>LinkedIn</strong>
                    </span>

                    <span className="team-social-arrow">
                      <ArrowIcon />
                    </span>
                  </a>
                </div>

                <div className="team-member-footer">
                  <span>STRATEGY</span>
                  <span>RESEARCH</span>
                  <span>EXECUTION</span>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default page;