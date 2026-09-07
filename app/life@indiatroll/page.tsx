"use client";

import React, { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { Maximize2 } from "lucide-react";

import SiteNavbar from "@/components/site-navbar";
import SiteFooter from "@/components/site-footer";
import ImageViewer from "@/components/View";

import "./life@indiatroll.css";

/* =========================================================
   IMAGE TYPES
   ========================================================= */

interface LifeImage {
  id: number;
  src: string;
  alt: string;
}

/* =========================================================
   FIELD WORK IMAGES
   ========================================================= */

const fieldWorkImages: LifeImage[] = [
  {
    id: 1,
    src: "/assets/life@rudra/fieldwork/img1.jpeg",
    alt: "Rudra team conducting field work",
  },
  {
    id: 2,
    src: "/assets/life@rudra/fieldwork/img2.jpeg",
    alt: "Rudra team conducting field work",
  },
  {
    id: 3,
    src: "/assets/life@rudra/fieldwork/img3.jpeg",
    alt: "Rudra team conducting field work",
  },
  {
    id: 4,
    src: "/assets/life@rudra/fieldwork/img4.jpeg",
    alt: "Rudra team conducting field work",
  },
  {
    id: 5,
    src: "/assets/life@rudra/fieldwork/img5.jpeg",
    alt: "Rudra team conducting field work",
  },
];

/* =========================================================
   OFFICE WORK IMAGES
   ========================================================= */

const officeWorkImages: LifeImage[] = [
  {
    id: 1,
    src: "/assets/life@rudra/officework/img1.jpeg",
    alt: "Rudra office team at work",
  },
  {
    id: 2,
    src: "/assets/life@rudra/officework/img2.jpeg",
    alt: "Rudra office team working together",
  },
  {
    id: 3,
    src: "/assets/life@rudra/officework/img3.jpeg",
    alt: "Rudra office workspace",
  },
  {
    id: 4,
    src: "/assets/life@rudra/officework/img4.jpeg",
    alt: "Rudra team meeting in office",
  },
];

/* =========================================================
   TEAM & CULTURE IMAGES
   ========================================================= */

const teamCultureImages: LifeImage[] = [
  {
    id: 1,
    src: "/assets/life@rudra/teamculture/img1.jpeg",
    alt: "Rudra team and culture",
  },
  {
    id: 2,
    src: "/assets/life@rudra/teamculture/img2.jpeg",
    alt: "Rudra team and culture",
  },
  {
    id: 3,
    src: "/assets/life@rudra/teamculture/img3.jpeg",
    alt: "Rudra team and culture",
  },
  {
    id: 4,
    src: "/assets/life@rudra/teamculture/img4.jpeg",
    alt: "Rudra team and culture",
  },
  {
    id: 5,
    src: "/assets/life@rudra/teamculture/img5.jpeg",
    alt: "Rudra team and culture",
  },
  {
    id: 6,
    src: "/assets/life@rudra/teamculture/img6.jpeg",
    alt: "Rudra team and culture",
  },
];

/* =========================================================
   GLOBAL MOTION SETTINGS
   ========================================================= */

const revealViewport = {
  once: true,
  amount: 0.18,
};

const smoothEase = [0.22, 1, 0.36, 1] as const;

/* =========================================================
   SECTION REVEAL VARIANTS
   ========================================================= */

const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 70,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.9,
      ease: smoothEase,
    },
  },
};

/* =========================================================
   TITLE VARIANTS
   ========================================================= */

const titleVariants = {
  hidden: {
    opacity: 0,
    y: 45,
    filter: "blur(10px)",
  },

  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",

    transition: {
      duration: 0.85,
      ease: smoothEase,
    },
  },
};

/* =========================================================
   INTRO TEXT VARIANTS
   ========================================================= */

const introContainerVariants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

const introTextVariants = {
  hidden: {
    opacity: 0,
    y: 35,
    filter: "blur(8px)",
  },

  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",

    transition: {
      duration: 0.8,
      ease: smoothEase,
    },
  },
};

/* =========================================================
   GALLERY CONTAINER VARIANTS
   ========================================================= */

const galleryVariants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.12,
    },
  },
};

/* =========================================================
   GALLERY CARD VARIANTS
   ========================================================= */

const cardVariants = {
  hidden: (index: number) => ({
    opacity: 0,
    y: 80,
    x: index % 2 === 0 ? -30 : 30,
    scale: 0.92,
    rotate: index % 2 === 0 ? -1.8 : 1.8,
    filter: "blur(8px)",
  }),

  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    rotate: 0,
    filter: "blur(0px)",

    transition: {
      duration: 0.9,
      ease: smoothEase,
    },
  },
};

/* =========================================================
   REUSABLE GALLERY IMAGE
   ========================================================= */

interface GalleryImageProps {
  image: LifeImage;
  index: number;
}

const GalleryImage = ({
  image,
  index,
}: GalleryImageProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      className="life-gallery-card"
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
    >
      <motion.div
        className="life-gallery-image-wrapper"
        style={
          {
            "--life-image-bg": `url("${image.src}")`,
          } as React.CSSProperties
        }
      >
        {/* =================================================
            BLURRED BACKGROUND
            ================================================= */}

        <motion.div
          className="life-gallery-blur-background"
          aria-hidden="true"
          initial={
            shouldReduceMotion
              ? undefined
              : {
                  scale: 1.08,
                  opacity: 0,
                }
          }
          whileInView={
            shouldReduceMotion
              ? undefined
              : {
                  scale: 1,
                  opacity: 1,
                }
          }
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 1.2,
            ease: smoothEase,
          }}
        />

        {/* =================================================
            ACTUAL IMAGE
            ================================================= */}

        <motion.div
          className="life-gallery-image"
          initial={
            shouldReduceMotion
              ? undefined
              : {
                  scale: 1.12,
                }
          }
          whileInView={
            shouldReduceMotion
              ? undefined
              : {
                  scale: 1,
                }
          }
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 1.3,
            ease: smoothEase,
          }}
          whileHover={
            shouldReduceMotion
              ? undefined
              : {
                  scale: 1.07,

                  transition: {
                    duration: 0.7,
                    ease: smoothEase,
                  },
                }
          }
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="
              (max-width: 600px) 90vw,
              (max-width: 900px) 45vw,
              30vw
            "
            style={{
              objectFit: "contain",
            }}
            data-image-viewer-index={index}
            draggable={false}
          />
        </motion.div>

        {/* =================================================
            BLACK HOVER LAYER

            Controlled completely by CSS.

            Mouse enter:
            LEFT -> RIGHT

            Mouse leave:
            RIGHT -> LEFT
            ================================================= */}

        <div
          className="life-gallery-hover"
          aria-hidden="true"
        />

        {/* =================================================
            MAXIMIZE ICON

            IMPORTANT:

            This is intentionally a normal button instead
            of motion.button.

            CSS controls:
            - visibility
            - opacity
            - centering
            - scale
            - hover animation

            This prevents Framer Motion from injecting
            inline opacity/transform values that previously
            caused the icon to remain visible.
            ================================================= */}

        <button
          type="button"
          className="life-gallery-maximize"
          aria-label={`Open ${image.alt}`}
          onClick={(event) => {
            event.stopPropagation();

            const imageElement =
              event.currentTarget.parentElement?.querySelector(
                "img[data-image-viewer-index]"
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
        </button>
      </motion.div>
    </motion.article>
  );
};

/* =========================================================
   ANIMATED GALLERY SECTION
   ========================================================= */

interface GallerySectionProps {
  title: string;
  images: LifeImage[];
  sectionClassName: string;
  titleClassName?: string;
}

const GallerySection = ({
  title,
  images,
  sectionClassName,
  titleClassName = "",
}: GallerySectionProps) => {
  return (
    <motion.section
      className={`life-gallery-section ${sectionClassName}`}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.08,
      }}
    >
      <div className="life-gallery-container">
        <motion.h2
          className={`life-gallery-title ${titleClassName}`}
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.4,
          }}
        >
          {title}
        </motion.h2>

        <ImageViewer>
          <motion.div
            className={`life-gallery-grid ${
              sectionClassName.includes("field")
                ? "life-field-grid"
                : sectionClassName.includes("office")
                ? "life-office-grid"
                : "life-team-grid"
            }`}
            variants={galleryVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.08,
            }}
          >
            {images.map((image, index) => (
              <GalleryImage
                key={image.id}
                image={image}
                index={index}
              />
            ))}
          </motion.div>
        </ImageViewer>
      </div>
    </motion.section>
  );
};

/* =========================================================
   MAIN BANNER
   ========================================================= */

const AnimatedBanner = () => {
  const bannerRef = useRef<HTMLDivElement>(null);

  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: bannerRef,
    offset: ["start end", "end start"],
  });

  const bannerY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    shouldReduceMotion
      ? [0, 0, 0]
      : [60, 0, -60]
  );

  const bannerScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    shouldReduceMotion
      ? [1, 1, 1]
      : [1.08, 1, 1.08]
  );

  return (
    <motion.section
      ref={bannerRef}
      className="life-rudra-banner-section"
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
        amount: 0.15,
      }}
      transition={{
        duration: 1,
        ease: smoothEase,
      }}
    >
      <motion.div
        className="life-rudra-banner"
        initial={{
          scale: 0.96,
        }}
        whileInView={{
          scale: 1,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 1.2,
          ease: smoothEase,
        }}
      >
        <motion.div
          style={{
            y: bannerY,
            scale: bannerScale,
            position: "absolute",
            inset: 0,
          }}
        >
          <Image
            src="/assets/life@rudra/mainbanner/img1.jpeg"
            alt="Rudra team"
            fill
            sizes="100vw"
            className="life-rudra-banner-image"
            priority
          />
        </motion.div>

        {/* =================================================
            SUBTLE ANIMATED OVERLAY
            ================================================= */}

        <motion.div
          aria-hidden="true"
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 1.4,
            delay: 0.2,
          }}
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
          }}
        />
      </motion.div>
    </motion.section>
  );
};

/* =========================================================
   MAIN PAGE
   ========================================================= */

const LifeAtRudra = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <main className="life-rudra-page">
        {/* =================================================
            NAVBAR
            ================================================= */}

        <motion.div
          initial={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: 0,
                  y: -30,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            ease: smoothEase,
          }}
        >
          <SiteNavbar />
        </motion.div>

        {/* =================================================
            INTRODUCTION
            ================================================= */}

        <motion.section
          className="life-rudra-introduction"
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
        >
          <motion.div
            className="life-rudra-introduction-content"
            variants={introContainerVariants}
          >
            <motion.p variants={introTextVariants}>
              We are a team built around real work, real situations,
              and the responsibility to deliver with ownership.
            </motion.p>

            <motion.p variants={introTextVariants}>
              Our field and office teams work together closely,
              making sure every assignment is handled with discipline
              and consistency.
            </motion.p>

            <motion.p variants={introTextVariants}>
              Beyond work, we believe in staying connected through
              outings, activities, and shared moments that keep the
              team motivated.
            </motion.p>
          </motion.div>
        </motion.section>

        {/* =================================================
            FIELD WORK
            ================================================= */}

        <GallerySection
          title="Field Work :"
          images={fieldWorkImages}
          sectionClassName="life-field-section"
        />

        {/* =================================================
            MAIN BANNER
            ================================================= */}

        <AnimatedBanner />

        {/* =================================================
            OFFICE WORK
            ================================================= */}

        <GallerySection
          title="Office Work :"
          images={officeWorkImages}
          sectionClassName="life-office-section"
          titleClassName="office-title"
        />

        {/* =================================================
            TEAM & CULTURE
            ================================================= */}

        <GallerySection
          title="Team and Culture :"
          images={teamCultureImages}
          sectionClassName="life-team-section"
          titleClassName="team-title"
        />
      </main>

      {/* =====================================================
          FOOTER
          ===================================================== */}

      <motion.div
        initial={
          shouldReduceMotion
            ? undefined
            : {
                opacity: 0,
                y: 50,
              }
        }
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
          ease: smoothEase,
        }}
      >
        <SiteFooter />
      </motion.div>
    </>
  );
};

export default LifeAtRudra;