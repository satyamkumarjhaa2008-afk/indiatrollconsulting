"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SiteNavbar from "@/components/site-navbar";
import SiteFooter from "@/components/site-footer";

import ProfileModal, {
  ProfileData,
} from "@/components/ProfileModal";

import "./team.css";

gsap.registerPlugin(ScrollTrigger);

interface TeamMember extends ProfileData {
  founder?: boolean;
}

const teamMembers: TeamMember[] = [
  /* =========================================================
     FOUNDER
     ========================================================= */

  {
    id: "tejas-ingle",
    name: "Tejas Ingle",
    shortName: "TI",
    role: "Founder & Chief Managing Director",
    category: "FOUNDING LEADERSHIP",
    image: "/assets/team/TejasIngle.jpeg",

    email: "tejas.ingle@indiatrollconsultancy.com",
    linkedin: "https://www.linkedin.com/in/tejas-ingle",

    statement:
      "At Indiatroll Consultancy, we believe that meaningful change begins with the right information, deep understanding, technology and a clear strategy. I founded Indiatroll Consultancy with the vision of bringing research, technology, data-driven analysis, strategic consulting and innovative solutions together to support better decision-making and create meaningful impact.",

    highlights: [
      "Founder of Indiatroll Consultancy",
      "Research-led & impact-oriented consulting",
      "Strategic thinking and institutional development",
      "Technology, data and research driven approach",
      "Focus on informed and impactful decisions",
    ],

    education: [
      "B.Tech — National Institute of Technology, Warangal",
      "Master's in Artificial Intelligence & Machine Learning — IIT Hyderabad",
      "Master's Program in Political Leadership — IIM Bangalore",
      "MBA — Operations & Supply Chain Management, IIM Bombay",
    ],

    expertise: [
      "Research",
      "Strategy",
      "Consulting",
      "Artificial Intelligence",
      "Leadership",
      "Data Intelligence",
      "Institution Building",
    ],

    founder: true,
  },

  /* =========================================================
     ADITYA JOSHI
     ========================================================= */

  {
    id: "aditya-joshi",
    name: "Aditya Joshi",
    shortName: "AJ",
    role: "Chief Executive Officer",
    category: "EXECUTIVE LEADERSHIP",
    image: "/assets/team/AdityaJoshi.jpeg",

    email: "aditya.joshi@indiatrollconsultancy.com",
    linkedin: "https://www.linkedin.com/in/aditya-joshi",

    statement:
      "Hi, I'm Aditya Joshi, a Computer Science Master's graduate from San Jose State University, California, USA, and a technology enthusiast passionate about building efficient, scalable and impactful software solutions. My experience spans full-stack development, distributed systems, APIs, workflow automation and machine learning.",

    highlights: [
      "Master's in Computer Science — San Jose State University, California",
      "Full-stack software development",
      "Distributed systems & RESTful APIs",
      "Camunda workflow automation",
      "MongoDB & data-driven applications",
      "Machine learning & scalable technology",
    ],

    education: [
      "Master's in Computer Science — San Jose State University, California, USA",
    ],

    experience: [
      "Software Engineering — full-stack development and scalable software solutions",
      "API migrations and development of RESTful services",
      "Camunda workflow automation and distributed workflow systems",
      "MongoDB-based data-driven applications",
      "Technology projects involving machine learning and scalable systems",
    ],

    expertise: [
      "Software Engineering",
      "Full-Stack Development",
      "Distributed Systems",
      "REST APIs",
      "Workflow Automation",
      "Machine Learning",
      "MongoDB",
    ],
  },

  /* =========================================================
     SUBODH WAGHMARE
     ========================================================= */

  {
    id: "subodh-waghmare",
    name: "Subodh Waghmare",
    shortName: "SW",
    role: "Co-Founder — Indiatroll Research & Analytics",
    category: "RESEARCH & ANALYTICS",
    image: "/assets/team/SubodhWaghmare.jpeg",

    email: "subodh.waghmare@indiatrollconsultancy.com",
    linkedin: "https://www.linkedin.com/in/subodh-waghmare",

    statement:
      "With 8+ years of experience empowering political leaders and executing political campaigns across different states, Subodh brings extensive field experience to research, analytics and campaign strategy. His work sits at the intersection of political understanding, execution, research and data-driven decision-making.",

    highlights: [
      "8+ years of experience",
      "Empowering political leaders",
      "Political campaign execution across different states",
      "General Assembly Elections — 2019 & 2024",
      "Lok Sabha Elections — 2019 & 2024",
      "Research & analytical campaign strategy",
    ],

    education: [
      "MBA — Digital Marketing, DY Patil University, Pune",
      "M.A. Political Science — SRTM University, Nanded",
      "B.Ed. — SRTM University, Nanded",
    ],

    experience: [
      "Ex. IPAC",
      "Ex. Jansuraj Consultancy",
      "Ex. Prime Agency",
      "Ex. Chakravyuh Analytics",
      "Ex. Edumyze Etech",
      "General Assembly Elections — 2019 & 2024",
      "Lok Sabha Elections — 2019 & 2024",
      "8+ years of political campaign and leadership experience",
    ],

    expertise: [
      "Political Campaigns",
      "Research",
      "Analytics",
      "Political Strategy",
      "Digital Marketing",
      "Field Execution",
      "Leadership",
    ],
  },

  /* =========================================================
     V. E. GAYATHIRI
     ========================================================= */

  {
    id: "ve-gayathiri",
    name: "V. E. Gayathiri",
    shortName: "VG",
    role: "Chief Advisor",
    category: "LEGAL & INTERNATIONAL AFFAIRS",
    image: "/assets/team/VEGayathiri.jpeg",

    email: "g.ekambaramm@gmail.com",
    linkedin: "https://www.linkedin.com/in/v-e-gayathiri",

    statement:
      "V. E. Gayathiri brings extensive experience across international law, constitutional law, legal research and dispute settlement. Her professional journey includes serving as a Judicial Fellow at the International Court of Justice in The Hague, representing the Union of India as Panel B Counsel before the Supreme Court of India, and working as a Judicial Law Clerk and Research Assistant in the Chief Justice's chamber.",

    highlights: [
      "Judicial Fellow — International Court of Justice, The Hague",
      "Panel B Counsel — Union of India",
      "Judicial Law Clerk & Research Assistant — Supreme Court of India",
      "Advanced LL.M. — Leiden University, Netherlands",
      "Research experience in international dispute settlement",
      "Rapporteur — International Law & Changing Global Order Conference",
      "Published researcher and international law practitioner",
    ],

    education: [
      "Advanced LL.M. — International Dispute Settlement, Leiden University",
      "Diploma in International Affairs & Diplomacy — Indian Institute of Governance & Leadership",
      "B.A. LL.B. (Hons) — Chanakya National Law University, Patna",
    ],

    experience: [
      "Judicial Fellow — International Court of Justice, The Hague (2018–2019)",
      "Group B Panel Counsel — Legal Department, Union of India (2015–2017)",
      "Legal Counsel — Parasaran Law Office, New Delhi (2014–2017)",
      "Judicial Law Clerk cum Research Assistant — Supreme Court of India, Chief Justice's Chamber (2011–2014)",
      "Research Assistant — Grotius Centre of International Law, Leiden University",
      "Legal Research Analyst for K. Parasaran",
      "Research Fellow — Legal and Treaties Division, Ministry of External Affairs",
      "Rapporteur — 9th International Conference on International Law and Changing Global Order",
    ],

    expertise: [
      "International Law",
      "Constitutional Law",
      "Dispute Settlement",
      "Legal Research",
      "International Affairs",
      "Strategic Advisory",
      "Policy & Governance",
    ],
  },

  /* =========================================================
     SATYAM JHA
     ========================================================= */

  {
    id: "satyam-jha",
    name: "Satyam Jha",
    shortName: "SJ",
    role: "Chief Technical Officer",
    category: "TECHNOLOGY",
    image: "/assets/team/SatyamJha.jpeg",

    email: "satyam.jha@indiatrollconsultancy.com",
    linkedin: "https://www.linkedin.com/in/satyam-jha",

    statement:
      "Satyam leads the technical direction of Indiatroll, working across digital systems, web technologies and product development. His role focuses on turning ideas into reliable digital experiences and building technology that strengthens the organization's research, analytics and consulting capabilities.",

    highlights: [
      "Technical direction & digital strategy",
      "Modern web application development",
      "Digital systems & product development",
      "Technology-led research solutions",
      "Interactive data and information experiences",
    ],

    expertise: [
      "Technology",
      "Web Development",
      "Digital Systems",
      "Product Development",
      "UI Engineering",
      "Data Applications",
      "Technical Strategy",
    ],
  },
];

/* =========================================================
   SOCIAL LINKS
   ========================================================= */

function SocialLinks({ member }: { member: TeamMember }) {
  return (
    <div className="member-socials">
      <a
        href={`mailto:${member.email}`}
        className="social-link"
        aria-label={`Email ${member.name}`}
      >
        <span className="social-icon">✉</span>
        <span>Email</span>
        <span className="social-arrow">↗</span>
      </a>

      <a
        href={member.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="social-link"
        aria-label={`LinkedIn profile of ${member.name}`}
      >
        <span className="linkedin-icon">in</span>
        <span>LinkedIn</span>
        <span className="social-arrow">↗</span>
      </a>
    </div>
  );
}

/* =========================================================
   HIGHLIGHTS
   ========================================================= */

function HighlightList({
  highlights,
  className = "",
}: {
  highlights: string[];
  className?: string;
}) {
  return (
    <div className={`highlight-list ${className}`}>
      {highlights.map((item, index) => (
        <div className="highlight-item" key={item}>
          <span className="highlight-number">
            {String(index + 1).padStart(2, "0")}
          </span>

          <span className="highlight-text">{item}</span>
        </div>
      ))}
    </div>
  );
}

/* =========================================================
   EDUCATION
   ========================================================= */

function EducationList({
  education,
}: {
  education?: string[];
}) {
  if (!education?.length) return null;

  return (
    <div className="education-block">
      <div className="content-label">EDUCATION</div>

      <div className="education-list">
        {education.map((item, index) => (
          <div className="education-item" key={item}>
            <span className="education-dot">
              {String(index + 1).padStart(2, "0")}
            </span>

            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   EXPERTISE
   ========================================================= */

function ExpertiseList({
  expertise,
}: {
  expertise: string[];
}) {
  return (
    <div className="expertise-list">
      {expertise.map((item) => (
        <span key={item} className="expertise-tag">
          {item}
        </span>
      ))}
    </div>
  );
}

/* =========================================================
   FOUNDER SECTION
   ========================================================= */

function FounderSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const founder = teamMembers[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".founder-image-wrap", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
        },
        y: 80,
        opacity: 0,
        duration: 1.1,
        ease: "power4.out",
      });

      gsap.from(".founder-content > *", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 35,
        opacity: 0,
        duration: 0.8,
        stagger: 0.09,
        ease: "power3.out",
      });

      gsap.from(".founder-highlight-item", {
        scrollTrigger: {
          trigger: ".founder-highlights",
          start: "top 85%",
        },
        x: -30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="founder-section"
      id="tejas-ingle"
    >
      <div className="founder-image-column">
        <div className="founder-image-wrap">
          <div className="founder-image-frame">
            <img
              src={founder.image}
              alt={founder.name}
              className="founder-image"
            />

            <div className="image-gradient" />

            <div className="image-number">01</div>

            <div className="image-corner top-left" />
            <div className="image-corner bottom-right" />

            <div className="image-name-overlay">
              <span>FOUNDER</span>
              <strong>IT</strong>
            </div>
          </div>
        </div>

        <div className="founder-image-caption">
          <span>INDIATROLL CONSULTANCY</span>
          <span>FOUNDING LEADERSHIP</span>
        </div>
      </div>

      <div className="founder-content">
        <div className="section-kicker">
          <span className="kicker-line" />
          <span>01 / FOUNDING STATEMENT</span>
        </div>

        <div className="founder-heading">
          <span className="small-label">FOUNDER</span>

          <h2>{founder.name}</h2>

          <div className="founder-role">
            {founder.role}
          </div>
        </div>

        <div className="statement-heading">
          <span>THE VISION</span>
        </div>

        <p className="founder-statement">
          {founder.statement}
        </p>

        <div className="founder-principles">
          <div className="principle">
            <span>01</span>

            <strong>RESEARCH</strong>

            <p>
              Understanding realities through systematic research,
              accurate information and ground-level insights.
            </p>
          </div>

          <div className="principle">
            <span>02</span>

            <strong>STRATEGY</strong>

            <p>
              Transforming knowledge and insights into practical,
              innovative and effective strategies.
            </p>
          </div>

          <div className="principle">
            <span>03</span>

            <strong>IMPACT</strong>

            <p>
              Supporting informed decisions and creating measurable,
              sustainable and meaningful outcomes.
            </p>
          </div>
        </div>

        <div className="content-label founder-education-label">
          ACADEMIC FOUNDATION
        </div>

        <EducationList education={founder.education} />

        <div className="content-label expertise-heading">
          AREAS OF EXPERTISE
        </div>

        <ExpertiseList expertise={founder.expertise} />

        <SocialLinks member={founder} />
      </div>
    </section>
  );
}

/* =========================================================
   MEMBER CARD
   ========================================================= */

function MemberCard({
  member,
  index,
  onOpen,
}: {
  member: TeamMember;
  index: number;
  onOpen: (member: TeamMember) => void;
}) {
  const cardRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 88%",
        },
        y: 70,
        opacity: 0,
        duration: 0.9,
        ease: "power4.out",
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  const handleOpen = () => {
    onOpen(member);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLElement>
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpen(member);
    }
  };

  return (
    <article
      ref={cardRef}
      className="member-card member-card-clickable"
      id={member.id}
      role="button"
      tabIndex={0}
      aria-label={`View profile of ${member.name}`}
      onClick={handleOpen}
      onKeyDown={handleKeyDown}
    >
      <div className="member-card-number">
        {String(index + 2).padStart(2, "0")}
      </div>

      {/* IMAGE */}
      <div className="member-image-wrap">
        <img
          src={member.image}
          alt={member.name}
          className="member-image"
        />

        <div className="member-image-shade" />

        <div className="member-image-bottom">
          <span>{member.category}</span>

          <span className="member-image-arrow">
            ↗
          </span>
        </div>
      </div>

      {/* PREVIEW CONTENT */}
      <div className="member-card-content">
        <div className="member-topline">
          <span>{member.category}</span>
          <span className="member-dot" />
        </div>

        <h3 className="member-name">
          {member.name}
        </h3>

        <div className="member-role">
          {member.role}
        </div>

        <div className="member-card-preview">
          <span className="member-card-preview-line" />

          <span>
            VIEW PROFILE
          </span>

          <span className="member-card-preview-arrow">
            ↗
          </span>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   PHILOSOPHY
   ========================================================= */



/* =========================================================
   CLOSING
   ========================================================= */



/* =========================================================
   TEAM PAGE
   ========================================================= */

export default function TeamPage() {
  const pageRef = useRef<HTMLDivElement | null>(null);

  const [selectedProfile, setSelectedProfile] =
    useState<ProfileData | null>(null);

  const openProfile = (member: TeamMember) => {
    setSelectedProfile(member);
  };

  const closeProfile = () => {
    setSelectedProfile(null);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroTimeline = gsap.timeline();

      heroTimeline
        .from(".team-hero-eyebrow", {
          y: 25,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
        })
        .from(
          ".team-hero-title span",
          {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.14,
            ease: "power4.out",
          },
          "-=0.3"
        )
        .from(
          ".team-hero-copy",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .from(
          ".hero-scroll",
          {
            opacity: 0,
            x: 25,
            duration: 0.6,
          },
          "-=0.3"
        );

      gsap.to(".hero-orb", {
        y: -35,
        x: 25,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".hero-orb-small", {
        y: 30,
        x: -20,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.utils
        .toArray<HTMLElement>(".reveal-section")
        .forEach((section) => {
          gsap.from(section, {
            scrollTrigger: {
              trigger: section,
              start: "top 88%",
            },
            opacity: 0,
            y: 40,
            duration: 0.9,
            ease: "power3.out",
          });
        });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={pageRef}
      className="team-page"
    >
      <SiteNavbar />

      <main>
        {/* =====================================================
            HERO
            ===================================================== */}

        <section className="team-hero">
          <div className="hero-grid" />

          <div className="hero-orb" />

          <div className="hero-orb-small" />

          <div className="team-hero-inner">
            <div className="team-hero-eyebrow">
        

              <span>
                THE PEOPLE BEHIND INDIATROLL
              </span>
            </div>

            <h1 className="team-hero-title">
              <span>PEOPLE.</span>

              <span className="gold-text">
                EXPERIENCE.
              </span>

              <span>IMPACT.</span>
            </h1>

            <div className="team-hero-bottom">
              <p className="team-hero-copy">
                A multidisciplinary leadership team
                bringing together research, political
                strategy, law, technology, analytics and
                strategic thinking to create meaningful
                outcomes.
              </p>

      
            </div>
          </div>
        </section>

        {/* =====================================================
            FOUNDING LEADERSHIP
            ===================================================== */}

        <section
          id="founding-team"
          className="founding-team-heading"
        >
          <div className="section-number">
            01
          </div>

          <div>
            <span>
              FOUNDING LEADERSHIP
            </span>

            <h2>
              THE FOUNDATION
            </h2>
          </div>
        </section>

        <FounderSection />

        {/* =====================================================
            COLLECTIVE
            ===================================================== */}

        <section className="collective-section">
          <div className="collective-heading">
            <div>
              <span className="section-eyebrow">
                02 / LEADERSHIP
              </span>

              <h2>
                THE COLLECTIVE
              </h2>
            </div>

            <p>
              The people shaping research, political
              strategy, advisory, technology, analytics
              and execution across Indiatroll.
              <br />
              <br />
              <strong>
                Select a profile to explore their
                experience.
              </strong>
            </p>
          </div>

          <div className="team-grid">
            {teamMembers
              .slice(1)
              .map((member, index) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  index={index}
                  onOpen={openProfile}
                />
              ))}
          </div>
        </section>

        {/* =====================================================
            PHILOSOPHY
            ===================================================== */}

  

        {/* =====================================================
            CLOSING
            ===================================================== */}


      </main>

      <SiteFooter />

      {/* =======================================================
          PROFILE MODAL
          ======================================================= */}

      <ProfileModal
        profile={selectedProfile}
        isOpen={Boolean(selectedProfile)}
        onClose={closeProfile}
      />
    </div>
  );
}