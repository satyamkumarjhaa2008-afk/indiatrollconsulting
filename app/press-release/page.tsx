
"use client";

import React, { useEffect, useRef } from "react";
import SiteNavbar from "@/components/site-navbar";
import SiteFooter from "@/components/site-footer";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImageViewer from "@/components/View";
import "./press-release.css";

gsap.registerPlugin(ScrollTrigger);

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
    alt: "Hindustan Times newspaper",
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

const desktopStartPositions = [
  {
    x: -900,
    y: -500,
    z: -1200,
    rotationX: 40,
    rotationY: -45,
    rotationZ: -18,
  },
  {
    x: 900,
    y: -450,
    z: -1300,
    rotationX: -35,
    rotationY: 45,
    rotationZ: 16,
  },
  {
    x: 1000,
    y: 50,
    z: -1200,
    rotationX: 42,
    rotationY: 42,
    rotationZ: -14,
  },
  {
    x: -1000,
    y: 80,
    z: -1250,
    rotationX: -40,
    rotationY: -45,
    rotationZ: 17,
  },
  {
    x: -850,
    y: 500,
    z: -1350,
    rotationX: 45,
    rotationY: -40,
    rotationZ: -16,
  },
  {
    x: 950,
    y: 480,
    z: -1250,
    rotationX: -42,
    rotationY: 43,
    rotationZ: 15,
  },
  {
    x: -900,
    y: -550,
    z: -1400,
    rotationX: 35,
    rotationY: -48,
    rotationZ: -15,
  },
  {
    x: 950,
    y: -550,
    z: -1450,
    rotationX: -42,
    rotationY: 48,
    rotationZ: 18,
  },
];

const desktopEndPositions = [
  {
    x: -1000,
    y: 250,
    z: -1200,
    rotationX: -38,
    rotationY: -48,
    rotationZ: -18,
  },
  {
    x: 1000,
    y: -250,
    z: -1250,
    rotationX: 38,
    rotationY: 45,
    rotationZ: 17,
  },
  {
    x: 1100,
    y: 300,
    z: -1200,
    rotationX: -42,
    rotationY: 48,
    rotationZ: -15,
  },
  {
    x: -1100,
    y: -300,
    z: -1250,
    rotationX: 40,
    rotationY: -48,
    rotationZ: 18,
  },
  {
    x: -950,
    y: 550,
    z: -1300,
    rotationX: -38,
    rotationY: -45,
    rotationZ: -17,
  },
  {
    x: 1000,
    y: 520,
    z: -1250,
    rotationX: 42,
    rotationY: 45,
    rotationZ: 16,
  },
  {
    x: -1000,
    y: -550,
    z: -1350,
    rotationX: -40,
    rotationY: -48,
    rotationZ: -17,
  },
  {
    x: 1050,
    y: -550,
    z: -1400,
    rotationX: 38,
    rotationY: 48,
    rotationZ: 18,
  },
];

const scatterTargets = [
  {
    x: 0.17,
    y: 0.22,
    maxWidth: 0.27,
    maxHeight: 0.36,
    rotation: -5,
  },
  {
    x: 0.5,
    y: 0.21,
    maxWidth: 0.29,
    maxHeight: 0.36,
    rotation: 3,
  },
  {
    x: 0.83,
    y: 0.22,
    maxWidth: 0.27,
    maxHeight: 0.36,
    rotation: -4,
  },
  {
    x: 0.16,
    y: 0.52,
    maxWidth: 0.28,
    maxHeight: 0.37,
    rotation: 4,
  },
  {
    x: 0.5,
    y: 0.53,
    maxWidth: 0.29,
    maxHeight: 0.38,
    rotation: -3,
  },
  {
    x: 0.84,
    y: 0.52,
    maxWidth: 0.28,
    maxHeight: 0.37,
    rotation: 5,
  },
  {
    x: 0.34,
    y: 0.79,
    maxWidth: 0.28,
    maxHeight: 0.34,
    rotation: -4,
  },
  {
    x: 0.68,
    y: 0.79,
    maxWidth: 0.28,
    maxHeight: 0.34,
    rotation: 4,
  },
];

const mobileDepthPositions = [
  {
    x: -75,
    y: 80,
    z: -900,
    rotationX: 24,
    rotationY: -28,
    rotationZ: -9,
    scale: 0.72,
  },
  {
    x: 85,
    y: 70,
    z: -1050,
    rotationX: -28,
    rotationY: 30,
    rotationZ: 8,
    scale: 0.68,
  },
  {
    x: -70,
    y: 100,
    z: -950,
    rotationX: 32,
    rotationY: 25,
    rotationZ: -7,
    scale: 0.7,
  },
  {
    x: 80,
    y: 90,
    z: -1100,
    rotationX: -25,
    rotationY: -32,
    rotationZ: 10,
    scale: 0.68,
  },
  {
    x: -90,
    y: 70,
    z: -1000,
    rotationX: 27,
    rotationY: -26,
    rotationZ: -8,
    scale: 0.69,
  },
  {
    x: 75,
    y: 100,
    z: -1150,
    rotationX: -30,
    rotationY: 28,
    rotationZ: 9,
    scale: 0.67,
  },
  {
    x: -65,
    y: 80,
    z: -980,
    rotationX: 24,
    rotationY: 34,
    rotationZ: -10,
    scale: 0.7,
  },
  {
    x: 85,
    y: 90,
    z: -1080,
    rotationX: -28,
    rotationY: -30,
    rotationZ: 8,
    scale: 0.68,
  },
];

const getRotatedBounds = (
  width: number,
  height: number,
  rotation: number
) => {
  const radians = (Math.abs(rotation) * Math.PI) / 180;
  const cos = Math.abs(Math.cos(radians));
  const sin = Math.abs(Math.sin(radians));

  return {
    width: width * cos + height * sin,
    height: width * sin + height * cos,
  };
};

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

const waitForImages = async (images: HTMLImageElement[]) => {
  await Promise.all(
    images.map(async (image) => {
      if (!image.complete) {
        await new Promise<void>((resolve) => {
          const handleLoad = () => resolve();
          const handleError = () => resolve();

          image.addEventListener("load", handleLoad, { once: true });
          image.addEventListener("error", handleError, { once: true });
        });
      }

      if (image.decode) {
        try {
          await image.decode();
        } catch {
          return;
        }
      }
    })
  );
};

const calculateDesktopLayout = (
  gallery: HTMLElement,
  images: HTMLImageElement[]
) => {
  const galleryWidth = gallery.clientWidth;
  const galleryHeight = gallery.clientHeight;

  const safeMargin = Math.max(
    18,
    Math.min(galleryWidth, galleryHeight) * 0.018
  );

  return images.map((image, index) => {
    const target =
      scatterTargets[index] ??
      scatterTargets[scatterTargets.length - 1];

    const naturalWidth = image.naturalWidth || 1;
    const naturalHeight = image.naturalHeight || 1;
    const aspectRatio = naturalWidth / naturalHeight;

    const maxWidth = galleryWidth * target.maxWidth;
    const maxHeight = galleryHeight * target.maxHeight;

    let width = maxWidth;
    let height = width / aspectRatio;

    if (height > maxHeight) {
      height = maxHeight;
      width = height * aspectRatio;
    }

    const absoluteMaxWidth = galleryWidth - safeMargin * 2;
    const absoluteMaxHeight = galleryHeight - safeMargin * 2;

    if (width > absoluteMaxWidth) {
      width = absoluteMaxWidth;
      height = width / aspectRatio;
    }

    if (height > absoluteMaxHeight) {
      height = absoluteMaxHeight;
      width = height * aspectRatio;
    }

    const rotated = getRotatedBounds(
      width,
      height,
      target.rotation
    );

    let centerX = galleryWidth * target.x;
    let centerY = galleryHeight * target.y;

    const minCenterX = safeMargin + rotated.width / 2;
    const maxCenterX =
      galleryWidth - safeMargin - rotated.width / 2;

    const minCenterY = safeMargin + rotated.height / 2;
    const maxCenterY =
      galleryHeight - safeMargin - rotated.height / 2;

    centerX = clamp(
      centerX,
      minCenterX,
      Math.max(minCenterX, maxCenterX)
    );

    centerY = clamp(
      centerY,
      minCenterY,
      Math.max(minCenterY, maxCenterY)
    );

    return {
      width,
      height,
      left: centerX - width / 2,
      top: centerY - height / 2,
      rotation: target.rotation,
    };
  });
};

const PressRelease = () => {
  const pageRef = useRef<HTMLElement | null>(null);
  const newspaperSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!pageRef.current || !newspaperSectionRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const section = newspaperSectionRef.current;

        if (!section) {
          return;
        }

        const gallery = section.querySelector(
          ".newspaper-gallery"
        ) as HTMLElement | null;

        const newspaperElements =
          gsap.utils.toArray<HTMLImageElement>(
            section.querySelectorAll(".newspaper")
          );

        if (!gallery || newspaperElements.length === 0) {
          return;
        }

        let destroyed = false;
        let innerCleanup: (() => void) | undefined;

        gsap.set(gallery, {
          perspective: 1800,
          perspectiveOrigin: "50% 50%",
          transformStyle: "preserve-3d",
        });

        gsap.set(newspaperElements, {
          transformStyle: "preserve-3d",
          transformOrigin: "center center",
          force3D: true,
          scale: 1,
        });

        const applySafeLayout = () => {
          if (destroyed) {
            return;
          }

          const layout = calculateDesktopLayout(
            gallery,
            newspaperElements
          );

          layout.forEach((item, index) => {
            const newspaper = newspaperElements[index];
            const start = desktopStartPositions[index];

            gsap.set(newspaper, {
              width: item.width,
              left: item.left,
              top: item.top,
              opacity: 0,
              x: start.x,
              y: start.y,
              z: start.z,
              rotationX: start.rotationX,
              rotationY: start.rotationY,
              rotationZ: start.rotationZ,
              scale: 1,
            });
          });
        };

        const setup = async () => {
          await waitForImages(newspaperElements);

          if (destroyed) {
            return;
          }

          applySafeLayout();

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=1900",
              scrub: 0.7,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              fastScrollEnd: true,
            },
          });

          newspaperElements.forEach((newspaper, index) => {
            const finalRotation =
              scatterTargets[index]?.rotation ?? 0;

            timeline.to(
              newspaper,
              {
                opacity: 1,
                x: 0,
                y: 0,
                z: 0,
                rotationX: 0,
                rotationY: 0,
                rotationZ: finalRotation,
                scale: 1,
                duration: 0.7,
                ease: "power4.out",
              },
              index * 0.055
            );
          });

          timeline.to(newspaperElements, {
            x: 0,
            y: 0,
            z: 0,
            rotationX: 0,
            rotationY: 0,
            rotationZ: (index: number) =>
              scatterTargets[index]?.rotation ?? 0,
            scale: 1,
            duration: 0.15,
            ease: "power3.out",
            stagger: 0.01,
          });

          timeline.to(
            {},
            {
              duration: 0.38,
            }
          );

          newspaperElements.forEach((newspaper, index) => {
            const end = desktopEndPositions[index];

            timeline.to(
              newspaper,
              {
                opacity: 0,
                x: end.x,
                y: end.y,
                z: end.z,
                rotationX: end.rotationX,
                rotationY: end.rotationY,
                rotationZ: end.rotationZ,
                scale: 1,
                duration: 0.48,
                ease: "power3.in",
              },
              1.45 + index * 0.025
            );
          });

          let resizeTimer:
            | ReturnType<typeof setTimeout>
            | null = null;

          const handleResize = () => {
            if (resizeTimer) {
              clearTimeout(resizeTimer);
            }

            resizeTimer = setTimeout(() => {
              if (destroyed) {
                return;
              }

              applySafeLayout();
              ScrollTrigger.refresh();
            }, 120);
          };

          window.addEventListener("resize", handleResize);

          innerCleanup = () => {
            destroyed = true;

            window.removeEventListener(
              "resize",
              handleResize
            );

            if (resizeTimer) {
              clearTimeout(resizeTimer);
            }

            timeline.scrollTrigger?.kill();
            timeline.kill();
          };
        };

        setup();

        return () => {
          destroyed = true;
          innerCleanup?.();
        };
      });

      mm.add("(max-width: 767px)", () => {
        const section = newspaperSectionRef.current;

        if (!section) {
          return;
        }

        const gallery = section.querySelector(
          ".newspaper-gallery"
        ) as HTMLElement | null;

        const newspaperElements =
          gsap.utils.toArray<HTMLImageElement>(
            section.querySelectorAll(".newspaper")
          );

        if (!gallery || newspaperElements.length === 0) {
          return;
        }

        let destroyed = false;
        const triggers: ScrollTrigger[] = [];

        const setupMobile = async () => {
          await waitForImages(newspaperElements);

          if (destroyed) {
            return;
          }

          gsap.set(gallery, {
            perspective: 1200,
            perspectiveOrigin: "50% 50%",
            transformStyle: "preserve-3d",
          });

          gsap.set(newspaperElements, {
            opacity: 0,
            transformStyle: "preserve-3d",
            transformOrigin: "center center",
            force3D: true,
            clearProps: "rotate",
          });

          newspaperElements.forEach((newspaper, index) => {
            const depth =
              mobileDepthPositions[index] ??
              mobileDepthPositions[
                mobileDepthPositions.length - 1
              ];

            gsap.set(newspaper, {
              opacity: 0,
              x: depth.x,
              y: depth.y,
              z: depth.z,
              rotationX: depth.rotationX,
              rotationY: depth.rotationY,
              rotationZ: depth.rotationZ,
              scale: depth.scale,
              transformStyle: "preserve-3d",
              force3D: true,
            });

            const trigger = ScrollTrigger.create({
              trigger: newspaper,
              start: "top 92%",
              end: "top 35%",
              scrub: 1.1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const progress = self.progress;

                const eased =
                  progress < 0.5
                    ? 2 * progress * progress
                    : 1 -
                      Math.pow(
                        -2 * progress + 2,
                        2
                      ) / 2;

                gsap.set(newspaper, {
                  opacity: eased,
                  x: gsap.utils.interpolate(
                    depth.x,
                    0,
                    eased
                  ),
                  y: gsap.utils.interpolate(
                    depth.y,
                    0,
                    eased
                  ),
                  z: gsap.utils.interpolate(
                    depth.z,
                    0,
                    eased
                  ),
                  rotationX: gsap.utils.interpolate(
                    depth.rotationX,
                    0,
                    eased
                  ),
                  rotationY: gsap.utils.interpolate(
                    depth.rotationY,
                    0,
                    eased
                  ),
                  rotationZ: gsap.utils.interpolate(
                    depth.rotationZ,
                    0,
                    eased
                  ),
                  scale: gsap.utils.interpolate(
                    depth.scale,
                    1,
                    eased
                  ),
                });
              },
            });

            triggers.push(trigger);
          });

          ScrollTrigger.refresh();

          newspaperElements.forEach(
            (newspaper, index) => {
              const depth =
                mobileDepthPositions[index] ??
                mobileDepthPositions[
                  mobileDepthPositions.length - 1
                ];

              const entrance = gsap.timeline({
                scrollTrigger: {
                  trigger: newspaper,
                  start: "top 98%",
                  end: "top 82%",
                  scrub: 0.8,
                  invalidateOnRefresh: true,
                },
              });

              entrance.fromTo(
                newspaper,
                {
                  opacity: 0,
                  x: depth.x,
                  y: depth.y,
                  z: depth.z,
                  rotationX: depth.rotationX,
                  rotationY: depth.rotationY,
                  rotationZ: depth.rotationZ,
                  scale: depth.scale,
                },
                {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  z: 0,
                  rotationX: 0,
                  rotationY: 0,
                  rotationZ: 0,
                  scale: 1,
                  ease: "power4.out",
                }
              );

              if (entrance.scrollTrigger) {
                triggers.push(entrance.scrollTrigger);
              }
            }
          );
        };

        setupMobile();

        return () => {
          destroyed = true;

          triggers.forEach((trigger) => {
            trigger.kill();
          });

          gsap.killTweensOf(newspaperElements);

          gsap.set(newspaperElements, {
            clearProps: "all",
          });

          gsap.set(gallery, {
            clearProps: "all",
          });
        };
      });

      return () => {
        mm.revert();
      };
    }, pageRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <>
      <main
        ref={pageRef}
        className="press-release-page"
      >
        <div
          className="press-release-background"
          aria-hidden="true"
        >
          <div className="background-grid" />

          <div className="background-glow glow-one" />

          <div className="background-glow glow-two" />

          <div className="background-glow glow-three" />

          <div className="background-noise" />
        </div>

        <motion.div
          className="press-release-navbar"
          initial={{
            opacity: 0,
            y: -40,
            filter: "blur(8px)",
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
              Our latest insights, research and media
              coverage across leading newspapers and
              publications.
            </motion.p>

            <motion.div
              className="press-release-scroll"
              variants={headerItem}
            >
              <span />
              SCROLL TO EXPLORE
            </motion.div>
          </motion.div>
        </motion.section>

        <section
          ref={newspaperSectionRef}
          className="newspaper-gallery-section"
        >
          <div className="gallery-label">
            <span>PRESS ARCHIVE</span>
            <span>08 PUBLICATIONS</span>
          </div>

          <ImageViewer>
            <div className="newspaper-gallery">
              {newspapers.map((newspaper) => (
                <img
                  key={newspaper.id}
                  src={newspaper.src}
                  alt={newspaper.alt}
                  className={newspaper.className}
                  draggable={false}
                  loading="eager"
                  decoding="async"
                />
              ))}
            </div>
          </ImageViewer>
        </section>

        <section className="press-release-end">
          <div className="end-line" />

          <p>MORE STORIES</p>

          <h2>
            Stay
            <br />
            <em>informed.</em>
          </h2>
        </section>
      </main>

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

