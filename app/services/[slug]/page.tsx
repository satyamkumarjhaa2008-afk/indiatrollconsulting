
"use client";

import "./services.css";

import Link from "next/link";
import { notFound } from "next/navigation";
import { motion, type Variants } from "motion/react";

import SiteNavbar from "../../../components/site-navbar";
import SiteFooter from "../../../components/site-footer";
import ServiceCarousel from "../../../components/services-carousel";
import SideNavbar from "../../../components/side-navbar";

const serviceData = [
  {
    name: "Survey & Insights",
    image: "/assets/our-services/survey-insights.png",
    href: "/services/survey-insights",
    intro:
      "We track what is happening on the ground - issues, perception, and feedback- and convert it into actionable inputs for timely decisions.",
    "How We Work":
      "We begin by defining the research objectives and designing structured questionnaires with inputs from psychologists and subject experts. Our trained field teams collect responses through face-to-face interactions and our survey application. Depending on the study, we use appropriate sampling methods, followed by rigorous validation, data processing, analysis, and interpretation.",
    "Key Work Areas": [
      "Exit polls and opinion polls",
      "Political and non-political surveys",
      "Voter and consumer behaviour studies",
      "Questionnaire design and survey planning",
      "Field data collection and monitoring",
      "Data validation and quality checks",
    ],
    Outcome:
      "Clear, reliable inputs for decision-making backed by verified ground data.",
  },

  {
    name: "Ground Intelligence",
    image: "/assets/our-services/ground-intelligence.png",
    href: "/services/ground-intelligence",
    intro:
      "We track what is happening on the ground - issues, perception, and feedback- and convert it into actionable inputs for timely decisions.",
    "How We Work":
      "Our field teams maintain regular contact with local stakeholders, voters, party workers, and community networks to capture developments as they happen. Information is systematically recorded, cross-checked, and analyzed to identify changes in sentiment, emerging issues, local concerns, and competitor activity, helping clients respond before situations become critical.",
    "Key Work Areas": [
      "Perception mapping on leaders and issues",
      "Issue tracking and early warning signals",
      "Competitor analysis and positioning",
      "Feedback from voters and party workers",
      "Impact assessment of campaigns and decisions",
      "Performance tracking of representatives",
      "Leadership and governance report cards",
      "Influencer and local network mapping",
    ],
    Outcome:
      "Early visibility of issues and clear direction for timely action.",
  },

  {
    name: "Political Strategy & Consulting",
    image: "/assets/our-services/political-strategy-consulting.png",
    href: "/services/political-strategy-consulting",
    intro:
      "Political strategy and consulting services help parties and candidates navigate the complex landscape of modern politics.",
    "How We Work":
      "We first understand the political environment, client objectives, voter priorities, organizational strengths, and competitive landscape. Our strategy teams combine field intelligence, research, and data analysis to develop practical campaign plans. We then support execution, track performance, review emerging challenges, and refine the strategy based on real-time feedback.",
    "Key Work Areas": [
      "Strategic planning and execution",
      "Campaign management and optimization",
      "Stakeholder engagement and communication",
      "Policy development and advocacy",
      "Leadership and team building",
    ],
    Outcome:
      "Enhanced strategic positioning and improved electoral performance.",
  },

  {
    name: "Communication & Image Management",
    image: "/assets/our-services/communication-image-management.png",
    href: "/services/communication-image-management",
    intro:
      "Communication and image management services help parties and candidates build and maintain a strong public presence.",
    "How We Work":
      "We begin by understanding the client's public image, communication objectives, audiences, and existing perception. Our teams develop consistent messaging across media, digital platforms, and public communication. We monitor reactions and media narratives, identify potential reputation risks, and adapt communication plans to maintain credibility and strengthen public engagement.",
    "Key Work Areas": [
      "Media relations and press management",
      "Social media strategy and execution",
      "Visual identity and branding",
      "Crisis communication and reputation management",
      "Internal communication and stakeholder engagement",
    ],
    Outcome:
      "Enhanced public perception and improved media coverage.",
  },

  {
    name: "Market Research & Business Insights",
    image: "/assets/our-services/market-research-business-insights.png",
    href: "/services/market-research-business-insights",
    intro:
      "Market research and business insights services provide data-driven intelligence to inform strategic decision-making.",
    "How We Work":
      "We start by defining the business question and identifying the information required to address it. Our researchers combine primary surveys, consumer interactions, secondary research, and market data to understand customer behaviour and competition. The findings are validated, analyzed, and translated into practical insights that support business and growth decisions.",
    "Key Work Areas": [
      "Consumer behavior analysis",
      "Market segmentation and targeting",
      "Competitive landscape assessment",
      "Product and service evaluation",
      "Financial and operational performance analysis",
    ],
    Outcome:
      "Informed strategic decisions and improved business performance.",
  },

  {
    name: "Governance & Project Monitoring (PMC)",
    image: "/assets/our-services/governance-project-monitoring.png",
    href: "/services/governance-project-monitoring",
    intro:
      "Governance and project monitoring services ensure effective oversight and performance evaluation of initiatives.",
    "How We Work":
      "We establish clear monitoring frameworks around project objectives, timelines, budgets, responsibilities, and measurable outcomes. Our teams regularly review progress through field visits, reports, stakeholder feedback, and performance data. Gaps and risks are identified early, with findings shared through structured reports and actionable recommendations to improve implementation and accountability.",
    "Key Work Areas": [
      "Project planning and execution",
      "Performance measurement and reporting",
      "Risk assessment and mitigation",
      "Compliance and regulatory adherence",
      "Stakeholder communication and engagement",
    ],
    Outcome:
      "Improved project outcomes and enhanced organizational governance.",
  },
];

/* ---------------------------------------------------------
   MOTION VARIANTS
--------------------------------------------------------- */

const pageVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      staggerChildren: 0.12,
    },
  },
};

const contentVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 70,
    rotateX: 8,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const headingVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    rotateX: 25,
    transformPerspective: 1000,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const listContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const listItemVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -50,
    rotateY: -12,
    scale: 0.94,
  },
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const sidebarVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 80,
    rotateY: -18,
  },
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    transition: {
      duration: 0.9,
      delay: 0.25,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const imageVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    rotateX: 12,
    rotateY: -10,
    y: 80,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    y: 0,
    transition: {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/* ---------------------------------------------------------
   PAGE
--------------------------------------------------------- */

export default async function Services({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const service = serviceData.find((item) => {
    const serviceSlug = item.href.split("/").filter(Boolean).pop();

    return serviceSlug === slug;
  });

  if (!service) {
    notFound();
  }

  return (
    <>
      {/* -------------------------------------------------
          NAVBAR
      ------------------------------------------------- */}

      <motion.div
        initial={{
          opacity: 0,
          y: -40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <SiteNavbar />
      </motion.div>

      <motion.main
        className="service-page"
        id="service-top"
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        style={{
          perspective: 1400,
        }}
      >
        <div className="service-layout">

          {/* =================================================
              LEFT SIDE
          ================================================= */}

          <motion.section
            className="service-content"
            variants={contentVariants}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            <div className="service-content-inner">

              {/* -------------------------------------------------
                  INTRO
              ------------------------------------------------- */}

              {service.intro && (
                <motion.section
                  className="service-intro"
                  variants={contentVariants}
                  whileHover={{
                    y: -5,
                    rotateX: 1.5,
                    transition: {
                      duration: 0.3,
                    },
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  <motion.p
                    initial={{
                      opacity: 0,
                      y: 25,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.4,
                    }}
                    transition={{
                      duration: 0.7,
                      ease: "easeOut",
                    }}
                  >
                    {service.intro}
                  </motion.p>
                </motion.section>
              )}

              {/* -------------------------------------------------
                  MAIN IMAGE
              ------------------------------------------------- */}

              <motion.section
                className="service-image-section"
                variants={imageVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                  amount: 0.25,
                }}
                style={{
                  perspective: 1400,
                }}
              >
                <motion.div
                  className="service-image-wrapper"
                  whileHover={{
                    scale: 1.025,
                    rotateX: 2,
                    rotateY: -2,
                    z: 30,
                    transition: {
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  }}
                  whileTap={{
                    scale: 0.985,
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  <motion.img
                    src={service.image}
                    alt={service.name}
                    className="service-main-image"
                    initial={{
                      scale: 1.12,
                    }}
                    whileInView={{
                      scale: 1,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.25,
                    }}
                    transition={{
                      duration: 1.4,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />

                  {/* 3D shine layer */}
                  <motion.div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      inset: 0,
                      pointerEvents: "none",
                      background:
                        "linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.18) 45%, transparent 70%)",
                      transform: "translateX(-120%)",
                    }}
                    whileHover={{
                      x: "220%",
                      transition: {
                        duration: 1.1,
                        ease: "easeInOut",
                      },
                    }}
                  />
                </motion.div>
              </motion.section>

              {/* -------------------------------------------------
                  HOW WE WORK
              ------------------------------------------------- */}

              <motion.section
                className="service-work service-section"
                variants={contentVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                  amount: 0.25,
                }}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <motion.h2
                  variants={headingVariants}
                  whileHover={{
                    x: 8,
                    rotateY: -4,
                    transition: {
                      duration: 0.3,
                    },
                  }}
                >
                  How We Work
                </motion.h2>

                <motion.p
                  initial={{
                    opacity: 0,
                    y: 35,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.35,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {service["How We Work"]}
                </motion.p>
              </motion.section>

              {/* -------------------------------------------------
                  KEY WORK AREAS
              ------------------------------------------------- */}

              <motion.section
                className="service-key-areas service-section"
                variants={contentVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <motion.h2 variants={headingVariants}>
                  Key Work Areas
                </motion.h2>

                <motion.ul
                  className="service-work-list"
                  variants={listContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  style={{
                    perspective: 1000,
                  }}
                >
                  {service["Key Work Areas"].map((area, index) => (
                    <motion.li
                      key={index}
                      variants={listItemVariants}
                      whileHover={{
                        x: 12,
                        scale: 1.025,
                        rotateY: -3,
                        z: 20,
                        transition: {
                          duration: 0.25,
                          ease: "easeOut",
                        },
                      }}
                      whileTap={{
                        scale: 0.98,
                      }}
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <motion.span
                        className="service-list-icon"
                        aria-hidden="true"
                        whileHover={{
                          rotate: 180,
                          scale: 1.15,
                          transition: {
                            duration: 0.45,
                            ease: "easeOut",
                          },
                        }}
                      >
                        <motion.span
                          initial={{
                            scale: 0,
                          }}
                          whileInView={{
                            scale: 1,
                          }}
                          viewport={{
                            once: true,
                          }}
                          transition={{
                            duration: 0.4,
                            delay: index * 0.05,
                            type: "spring",
                            stiffness: 250,
                            damping: 15,
                          }}
                        />
                      </motion.span>

                      <motion.span
                        className="service-list-text"
                        initial={{
                          opacity: 0,
                        }}
                        whileInView={{
                          opacity: 1,
                        }}
                        viewport={{
                          once: true,
                        }}
                        transition={{
                          duration: 0.4,
                          delay: index * 0.05,
                        }}
                      >
                        {area}
                      </motion.span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.section>

              {/* -------------------------------------------------
                  OUTCOME
              ------------------------------------------------- */}

              <motion.section
                className="service-outcome service-section"
                initial={{
                  opacity: 0,
                  y: 80,
                  scale: 0.92,
                  rotateX: 12,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  rotateX: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.3,
                }}
                transition={{
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{
                  y: -8,
                  scale: 1.015,
                  rotateX: 2,
                  rotateY: -2,
                  transition: {
                    duration: 0.35,
                  },
                }}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <motion.p>
                  <motion.strong
                    initial={{
                      opacity: 0,
                      x: -20,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.5,
                    }}
                  >
                    Outcome:
                  </motion.strong>{" "}
                  {service.Outcome}
                </motion.p>
              </motion.section>

            </div>
          </motion.section>

          {/* =================================================
              RIGHT SIDEBAR
          ================================================= */}

          <motion.aside
            className="service-sidebar"
            aria-label="Services navigation"
            variants={sidebarVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            <motion.div
              whileHover={{
                rotateY: -3,
                x: -5,
                transition: {
                  duration: 0.35,
                },
              }}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <SideNavbar />
            </motion.div>
          </motion.aside>
        </div>

        {/* =================================================
            SERVICE CAROUSEL
        ================================================= */}

        <motion.section
          className="service-carousel-section"
          initial={{
            opacity: 0,
            y: 100,
            scale: 0.94,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: 1,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            perspective: 1200,
          }}
        >
          <motion.div
            initial={{
              rotateX: 8,
            }}
            whileInView={{
              rotateX: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
            }}
            whileHover={{
              y: -6,
              transition: {
                duration: 0.3,
              },
            }}
          >
            <ServiceCarousel />
          </motion.div>
        </motion.section>

        {/* =================================================
            FOOTER
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 80,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.1,
          }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <SiteFooter />
        </motion.div>
      </motion.main>
    </>
  );
}

