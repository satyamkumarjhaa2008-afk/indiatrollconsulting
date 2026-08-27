"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import "./services-carousel.css";

type Service = {
  title: string;
  image: string;
  href: string;
};

const services: Service[] = [
  {
    title: "Survey & Insights",
    image: "/assets/our-services/survey-insights.png",
    href: "/services/survey-insights",
  },
  {
    title: "Ground Intelligence",
    image: "/assets/our-services/ground-intelligence.png",
    href: "/services/ground-intelligence",
  },
  {
    title: "Political Strategy & Consulting",
    image: "/assets/our-services/political-strategy-consulting.png",
    href: "/services/political-strategy-consulting",
  },
  {
    title: "Communication & Image Management",
    image: "/assets/our-services/communication-image-management.png",
    href: "/services/communication-image-management",
  },
  {
    title: "Market Research & Business Insights",
    image: "/assets/our-services/market-research-business-insights.png",
    href: "/services/market-research-business-insights",
  },
  {
    title: "Governance & Project Monitoring (PMC)",
    image: "/assets/our-services/governance-project-monitoring.png",
    href: "/services/governance-project-monitoring",
  },
];

function getVisibleCards(): number {
  if (typeof window === "undefined") {
    return 3;
  }

  if (window.innerWidth < 768) {
    return 1;
  }

  if (window.innerWidth < 1200) {
    return 2;
  }

  return 3;
}

export default function ServiceCarousel() {
  const [visibleCards, setVisibleCards] = useState(3);
  const [currentPage, setCurrentPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  /*
   * Number of carousel positions.
   *
   * Desktop:
   * 6 cards / 3 visible = 2 pages
   *
   * Tablet:
   * 6 cards / 2 visible = 3 pages
   *
   * Mobile:
   * 6 cards / 1 visible = 6 pages
   */
  const totalPages = useMemo(() => {
    return Math.ceil(services.length / visibleCards);
  }, [visibleCards]);

  /*
   * Detect screen-size changes.
   */
  useEffect(() => {
    const handleResize = () => {
      const newVisibleCards = getVisibleCards();

      setVisibleCards((previousVisibleCards) => {
        if (previousVisibleCards !== newVisibleCards) {
          setCurrentPage(0);
        }

        return newVisibleCards;
      });
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /*
   * Automatic sliding every 3 seconds.
   */
  useEffect(() => {
    if (isPaused || totalPages <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setCurrentPage((previousPage) => {
        return (previousPage + 1) % totalPages;
      });
    }, 3000);

    return () => {
      window.clearInterval(interval);
    };
  }, [isPaused, totalPages]);

  /*
   * Go to a specific carousel page.
   */
  const handleIndicatorClick = (page: number) => {
    setCurrentPage(page);
  };

  /*
   * Every carousel page occupies 100% of the viewport.
   */
  const translateX = currentPage * 100;

  return (
    <section className="service-carousel">
      <div
        className="service-carousel__viewport"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="service-carousel__track"
          style={{
            transform: `translate3d(-${translateX}%, 0, 0)`,
          }}
        >
          {services.map((service) => (
            <div
              className="service-carousel__slide"
              key={service.title}
            >
              <article className="service-card">
                {/* Top white strip */}
                <div className="service-card__top">
                  <div className="service-card__top-fill" />
                </div>

                {/* Image */}
                <div className="service-card__image-wrapper">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="service-card__image"
                  />
                </div>

                {/* Bottom section */}
                <div className="service-card__body">
                  {/* Black animated background */}
                  <div className="service-card__black-fill" />

                  {/* Text/content */}
                  <div className="service-card__content">
                    <h3>{service.title}</h3>

                    <div className="service-card__divider" />

                    <Link
                      href={service.href}
                      className="service-card__read-more"
                    >
                      <span className="service-card__arrow">
                        ‹
                      </span>

                      <span>Read More</span>

                      <span className="service-card__arrow">
                        ›
                      </span>
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel indicators */}
      <div className="service-carousel__indicators">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            type="button"
            className={`service-carousel__indicator ${
              currentPage === index
                ? "service-carousel__indicator--active"
                : ""
            }`}
            aria-label={`Go to service group ${index + 1}`}
            aria-current={
              currentPage === index ? "true" : undefined
            }
            onClick={() => handleIndicatorClick(index)}
          />
        ))}
      </div>
    </section>
  );
}