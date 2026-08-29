"use client";

import React from "react";
import SiteNavbar from "@/components/site-navbar";
import SiteFooter from "@/components/site-footer";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
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

const PressRelease = () => {
  return (
    <>
      <main className="press-release-page">
        <SiteNavbar />

        {/* =====================================================
            PAGE HEADER
            ===================================================== */}

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

        {/* =====================================================
            NEWSPAPER GALLERY

            ImageViewer wraps the entire gallery so that all
            newspapers belong to the same image collection.
            ===================================================== */}

        <section className="newspaper-gallery-section">
          <ImageViewer>
            <div className="newspaper-gallery">
              {newspapers.map((newspaper, index) => (
                <article
                  key={newspaper.id}
                  className={newspaper.className}
                >
                  <div className="newspaper-image-wrapper">

                    {/* =========================================
                        NEWSPAPER IMAGE
                        ========================================= */}

                    <Image
                      src={newspaper.src}
                      alt={newspaper.alt}
                      fill
                      sizes="(max-width: 768px) 80vw, 35vw"
                      className="newspaper-image"
                      priority={index < 3}
                    />

                    {/* =========================================
                        MAXIMIZE BUTTON

                        This is the original Lucide Maximize2
                        button.

                        Clicking it triggers the image itself,
                        which is detected by ImageViewer.
                        ========================================= */}

                    <button
                      type="button"
                      className="newspaper-maximize"
                      aria-label={`Open ${newspaper.alt}`}
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
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </ImageViewer>
        </section>
      </main>

      <SiteFooter />
    </>
  );
};

export default PressRelease;