
"use client";

import React from "react";
import SiteNavbar from "@/components/site-navbar";
import SiteFooter from "@/components/site-footer";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { motion } from "motion/react";
import ImageViewer from "@/components/View";
import "./press-release.css";

interface Newspaper {
  id: number;
  src: string;
  alt: string;
  className: string;
}

const newspapers: Newspaper[] = [
  {
    id: 1,
    src: "/assets/newspaper/news1.jpg",
    alt: "Newspaper article",
    className: "newspaper newspaper-1",
  },
  {
    id: 2,
    src: "/assets/newspaper/news2.jpg",
    alt: "Newspaper article",
    className: "newspaper newspaper-2",
  },
  {
    id: 3,
    src: "/assets/newspaper/news3.jpg",
    alt: "Times of India newspaper",
    className: "newspaper newspaper-3",
  },
  {
    id: 4,
    src: "/assets/newspaper/news4.png",
    alt: "Pudhari newspaper",
    className: "newspaper newspaper-4",
  },
  {
    id: 5,
    src: "/assets/newspaper/news5.png",
    alt: "Lokmat newspaper",
    className: "newspaper newspaper-5",
  },
  {
    id: 6,
    src: "/assets/newspaper/news6.png",
    alt: "Newspaper article",
    className: "newspaper newspaper-6",
  },
  {
    id: 7,
    src: "/assets/newspaper/news7.jpg",
    alt: "Newspaper article",
    className: "newspaper newspaper-7",
  },
  {
    id: 8,
    src: "/assets/newspaper/news8.jpg",
    alt: "Times of India newspaper",
    className: "newspaper newspaper-8",
  },
];

/* ============================================================
   ANIMATION VARIANTS
   ============================================================ */

const headerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const headerItem = {
  hidden: {
    opacity: 0,
    y: 50,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/*
  Each newspaper gets a slightly different entrance.
  This creates the "random" feeling without making
  the animation look chaotic.
*/
const newspaperAnimations = [
  {
    hidden: {
      opacity: 0,
      x: -120,
      y: 40,
      rotate: -5,
      scale: 0.9,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      filter: "blur(0px)",
    },
  },

  {
    hidden: {
      opacity: 0,
      x: 100,
      y: 70,
      rotate: 5,
      scale: 0.88,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      filter: "blur(0px)",
    },
  },

  {
    hidden: {
      opacity: 0,
      y: 120,
      scale: 0.82,
      rotate: -3,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      filter: "blur(0px)",
    },
  },

  {
    hidden: {
      opacity: 0,
      x: -90,
      y: 80,
      rotate: 4,
      scale: 0.9,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      filter: "blur(0px)",
    },
  },

  {
    hidden: {
      opacity: 0,
      x: 100,
      y: 100,
      rotate: -4,
      scale: 0.86,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      filter: "blur(0px)",
    },
  },

  {
    hidden: {
      opacity: 0,
      y: 110,
      x: -50,
      rotate: 3,
      scale: 0.88,
      filter: "blur(9px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      rotate: 0,
      scale: 1,
      filter: "blur(0px)",
    },
  },

  {
    hidden: {
      opacity: 0,
      x: -110,
      y: 60,
      rotate: -4,
      scale: 0.87,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      filter: "blur(0px)",
    },
  },

  {
    hidden: {
      opacity: 0,
      x: 110,
      y: 90,
      rotate: 5,
      scale: 0.86,
      filter: "blur(9px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      filter: "blur(0px)",
    },
  },
];

const PressRelease = () => {
  return (
    <>
      <main className="press-release-page">

        {/* =====================================================
            NAVBAR
            ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: -40,
            filter: "blur(6px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <SiteNavbar />
        </motion.div>

        {/* =====================================================
            PAGE HEADER
            ===================================================== */}

        <motion.section
          className="press-release-header"
          variants={headerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="press-release-header-content"
            variants={headerContainer}
          >
            <motion.span
              className="press-release-small-title"
              variants={headerItem}
            >
              MEDIA
            </motion.span>

            <motion.h1
              className="press-release-title"
              variants={headerItem}
            >
              Press Release
            </motion.h1>

            <motion.p
              className="press-release-description"
              variants={headerItem}
            >
              Our latest insights, research and media coverage
              across leading newspapers and publications.
            </motion.p>
          </motion.div>
        </motion.section>

        {/* =====================================================
            NEWSPAPER GALLERY
            ===================================================== */}

        <section className="newspaper-gallery-section">

          <ImageViewer>

            <div className="newspaper-gallery">

              {newspapers.map((newspaper, index) => {

                const animation =
                  newspaperAnimations[index % newspaperAnimations.length];

                return (
                  <motion.article
                    key={newspaper.id}
                    className={newspaper.className}

                    variants={animation}

                    initial="hidden"

                    whileInView="visible"

                    viewport={{
                      once: false,
                      amount: 0.18,
                    }}

                    transition={{
                      duration: 0.9,
                      delay: (index % 3) * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}

                    whileHover={{
                      y: -12,
                      scale: 1.025,
                      rotate: 0,
                      transition: {
                        duration: 0.35,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    }}
                  >

                    <motion.div
                      className="newspaper-image-wrapper"

                      whileHover={{
                        boxShadow:
                          "0 25px 60px rgba(0, 0, 0, 0.18)",
                      }}

                      transition={{
                        duration: 0.35,
                      }}
                    >

                      {/* =====================================
                          NEWSPAPER IMAGE
                          ===================================== */}

                      <Image
                        src={newspaper.src}
                        alt={newspaper.alt}
                        fill
                        sizes="(max-width: 768px) 80vw, 35vw"
                        className="newspaper-image"
                        priority={index < 3}
                      />

                      {/* =====================================
                          IMAGE OVERLAY
                          ===================================== */}

                      <motion.div
                        className="newspaper-animation-overlay"
                        initial={{
                          opacity: 0,
                        }}
                        whileHover={{
                          opacity: 1,
                        }}
                        transition={{
                          duration: 0.3,
                        }}
                      />

                      {/* =====================================
                          MAXIMIZE BUTTON
                          ===================================== */}

                      <motion.button
                        type="button"
                        className="newspaper-maximize"
                        aria-label={`Open ${newspaper.alt}`}

                        initial={{
                          opacity: 0,
                          scale: 0.7,
                          rotate: -20,
                        }}

                        whileHover={{
                          opacity: 1,
                          scale: 1,
                          rotate: 0,
                        }}

                        animate={{
                          opacity: 0.85,
                        }}

                        whileTap={{
                          scale: 0.85,
                        }}

                        transition={{
                          duration: 0.3,
                          ease: [0.22, 1, 0.36, 1],
                        }}

                        onClick={(event) => {
                          event.stopPropagation();

                          const imageElement =
                            event.currentTarget.parentElement?.querySelector(
                              ".newspaper-image"
                            ) as HTMLImageElement | null;

                          if (imageElement) {
                            imageElement.click();
                          }
                        }}
                      >
                        <Maximize2
                          size={42}
                          strokeWidth={2}
                        />
                      </motion.button>

                    </motion.div>

                  </motion.article>
                );
              })}

            </div>

          </ImageViewer>

        </section>

      </main>

      {/* =====================================================
          FOOTER
          ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 100,
          filter: "blur(8px)",
        }}

        whileInView={{
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        }}

        viewport={{
          once: false,
          amount: 0.1,
        }}

        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <SiteFooter />
      </motion.div>
    </>
  );
};

export default PressRelease;

