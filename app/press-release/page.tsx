"use client";

import React, { useEffect, useState } from "react";
import SiteNavbar from "@/components/site-navbar";
import SiteFooter from "@/components/site-footer";
import Image from "next/image";
import {
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
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

const PressRelease = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const showPrevious = () => {
    setSelectedImage((current) => {
      if (current === null) return null;

      return current === 0
        ? newspapers.length - 1
        : current - 1;
    });
  };

  const showNext = () => {
    setSelectedImage((current) => {
      if (current === null) return null;

      return current === newspapers.length - 1
        ? 0
        : current + 1;
    });
  };

  /*
   * Keyboard controls for the lightbox.
   */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedImage === null) return;

      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowLeft") {
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        showNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage]);

  /*
   * Prevent background scrolling when lightbox is open.
   */
  useEffect(() => {
    if (selectedImage !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedImage]);

  return (
    <>
      <main className="press-release-page">
<SiteNavbar/>
        {/* =========================
            PAGE HEADER
        ========================== */}
        <section className="press-release-header">
          <div className="press-release-header-content">
            <span className="press-release-small-title">
              MEDIA
            </span>

            <h1 className="press-release-title">
              Press Release
            </h1>

            <p className="press-release-description">
              Our latest insights, research and media coverage
              across leading newspapers and publications.
            </p>
          </div>
        </section>

        {/* =========================
            NEWSPAPER GALLERY
        ========================== */}
        <section className="newspaper-gallery-section">

          <div className="newspaper-gallery">

            {newspapers.map((newspaper, index) => (
              <article
                key={newspaper.id}
                className={newspaper.className}
              >
                <div className="newspaper-image-wrapper">

                  <Image
                    src={newspaper.src}
                    alt={newspaper.alt}
                    fill
                    sizes="(max-width: 768px) 80vw, 35vw"
                    className="newspaper-image"
                    priority={index < 3}
                  />

                  {/* =========================
                      ORANGE HOVER OVERLAY
                  ========================== */}
                  <div className="newspaper-hover-overlay">
                    <button
                      type="button"
                      className="newspaper-maximize"
                      aria-label={`Open ${newspaper.alt}`}
                      onClick={(event) => {
                        event.stopPropagation();
                        openLightbox(index);
                      }}
                    >
                      <Maximize2
                        size={42}
                        strokeWidth={2}
                      />
                    </button>
                  </div>

                </div>
              </article>
            ))}

          </div>

        </section>

      </main>

      {/* =========================
          LIGHTBOX
      ========================== */}
      {selectedImage !== null && (
        <div
          className="newspaper-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Newspaper image viewer"
          onClick={closeLightbox}
        >

          {/* =========================
              TOP CONTROLS
          ========================== */}
          <div
            className="lightbox-top-bar"
            onClick={(event) => event.stopPropagation()}
          >
            <span className="lightbox-counter">
              {selectedImage + 1} / {newspapers.length}
            </span>

            <button
              type="button"
              className="lightbox-close"
              aria-label="Close image viewer"
              onClick={closeLightbox}
            >
              <X size={30} />
            </button>
          </div>

          {/* =========================
              PREVIOUS BUTTON
          ========================== */}
          <button
            type="button"
            className="lightbox-navigation lightbox-prev"
            aria-label="Previous newspaper"
            onClick={(event) => {
              event.stopPropagation();
              showPrevious();
            }}
          >
            <ChevronLeft size={42} />
          </button>

          {/* =========================
              IMAGE
          ========================== */}
          <div
            className="lightbox-image-container"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={newspapers[selectedImage].src}
              alt={newspapers[selectedImage].alt}
              fill
              sizes="95vw"
              className="lightbox-image"
              priority
            />
          </div>

          {/* =========================
              NEXT BUTTON
          ========================== */}
          <button
            type="button"
            className="lightbox-navigation lightbox-next"
            aria-label="Next newspaper"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
          >
            <ChevronRight size={42} />
          </button>

        </div>
      )}
      <SiteFooter/>
    </>
  );
};

export default PressRelease;        
