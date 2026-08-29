"use client";

import React from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";

import SiteNavbar from "@/components/site-navbar";
import SiteFooter from "@/components/site-footer";
import ImageViewer from "@/components/View";

import "./life@rudra.css";


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
  return (
    <article className="life-gallery-card">
      <div
        className="life-gallery-image-wrapper"
        style={{
          "--life-image-bg": `url("${image.src}")`,
        } as React.CSSProperties}
      >
        {/* =================================================
            BLURRED BACKGROUND

            Keeps the complete original image visible while
            filling the fixed container behind it.
            ================================================= */}

        <div
          className="life-gallery-blur-background"
          aria-hidden="true"
        />

        {/* =================================================
            ACTUAL IMAGE

            contain = image is NEVER cropped.
            ================================================= */}

        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="
            (max-width: 600px) 90vw,
            (max-width: 900px) 45vw,
            30vw
          "
          className="life-gallery-image"
          data-image-viewer-index={index}
          draggable={false}
        />

        {/* =================================================
            ORANGE HOVER LAYER
            ================================================= */}

        <div
          className="life-gallery-hover"
          aria-hidden="true"
        />

        {/* =================================================
            MAXIMIZE ICON

            The click is passed to the actual image so that
            the reusable ImageViewer can open it.
            ================================================= */}

        <button
          type="button"
          className="life-gallery-maximize"
          aria-label={`Open ${image.alt}`}
          onClick={(event) => {
            event.stopPropagation();

            const imageElement =
              event.currentTarget.parentElement?.querySelector(
                ".life-gallery-image"
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
  );
};


/* =========================================================
   MAIN PAGE
   ========================================================= */

const LifeAtRudra = () => {
  return (
    <>
      <main className="life-rudra-page">

        <SiteNavbar />


        {/* =====================================================
            INTRODUCTION
            ===================================================== */}

        <section className="life-rudra-introduction">
          <div className="life-rudra-introduction-content">

            <p>
              We are a team that works on the ground, handles real
              situations, and delivers results with ownership and
              accountability.
            </p>

            <p>
              Our work demands coordination between field and office
              teams, ensuring that every assignment is executed with
              discipline and consistency.
            </p>

            <p>
              Along with the intensity of our work, we value team
              bonding through outings, activities, and shared moments
              that keep us connected and motivated.
            </p>

          </div>
        </section>


        {/* =====================================================
            FIELD WORK
            ===================================================== */}

        <section className="life-gallery-section life-field-section">

          <div className="life-gallery-container">

            <h2 className="life-gallery-title">
              Field Work :
            </h2>


            <ImageViewer>
              <div className="life-gallery-grid life-field-grid">

                {fieldWorkImages.map(
                  (image, index) => (
                    <GalleryImage
                      key={image.id}
                      image={image}
                      index={index}
                    />
                  )
                )}

              </div>
            </ImageViewer>

          </div>

        </section>


        {/* =====================================================
            MAIN BANNER
            ===================================================== */}

        <section className="life-rudra-banner-section">

          <div className="life-rudra-banner">

            <Image
              src="/assets/life@rudra/mainbanner/img1.jpeg"
              alt="Rudra team"
              fill
              sizes="100vw"
              className="life-rudra-banner-image"
              priority
            />

          </div>

        </section>


        {/* =====================================================
            OFFICE WORK
            ===================================================== */}

        <section className="life-gallery-section life-office-section">

          <div className="life-gallery-container">

            <h2 className="life-gallery-title office-title">
              Office Work :
            </h2>


            <ImageViewer>
              <div className="life-gallery-grid life-office-grid">

                {officeWorkImages.map(
                  (image, index) => (
                    <GalleryImage
                      key={image.id}
                      image={image}
                      index={index}
                    />
                  )
                )}

              </div>
            </ImageViewer>

          </div>

        </section>


        {/* =====================================================
            TEAM & CULTURE
            ===================================================== */}

        <section className="life-gallery-section life-team-section">

          <div className="life-gallery-container">

            <h2 className="life-gallery-title team-title">
              Team and Culture :
            </h2>


            <ImageViewer>
              <div className="life-gallery-grid life-team-grid">

                {teamCultureImages.map(
                  (image, index) => (
                    <GalleryImage
                      key={image.id}
                      image={image}
                      index={index}
                    />
                  )
                )}

              </div>
            </ImageViewer>

          </div>

        </section>

      </main>


      {/* =====================================================
          FOOTER
          ===================================================== */}

      <SiteFooter />
    </>
  );
};


export default LifeAtRudra;