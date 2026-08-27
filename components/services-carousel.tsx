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


  const repeatedServices = useMemo(() => {
    return [
      ...services,
      ...services,
      ...services,
      ...services,
      ...services,
    ];
  }, []);

  const [currentIndex, setCurrentIndex] = useState(
    services.length + visibleCards
  );

  const [isPaused, setIsPaused] = useState(false);


  const [enableTransition, setEnableTransition] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const newVisibleCards = getVisibleCards();

      setVisibleCards((previousVisibleCards) => {
        if (previousVisibleCards !== newVisibleCards) {
   
          setEnableTransition(false);

          setCurrentIndex(services.length + newVisibleCards);
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

  useEffect(() => {
    if (!enableTransition) {
      const timeout = window.setTimeout(() => {
        setEnableTransition(true);
      }, 50);

      return () => {
        window.clearTimeout(timeout);
      };
    }
  }, [enableTransition]);


  useEffect(() => {
    if (isPaused) {
      return;
    }

    const interval = window.setInterval(() => {
      setCurrentIndex((previousIndex) => previousIndex + 1);
    }, 3000);

    return () => {
      window.clearInterval(interval);
    };
  }, [isPaused]);

  
  useEffect(() => {

    const resetPoint = services.length * 3;

    if (currentIndex >= resetPoint) {
      
      setEnableTransition(false);

    
      setCurrentIndex((previousIndex) => {
        return previousIndex - services.length;
      });
    }
  }, [currentIndex]);

  
  useEffect(() => {
    if (!enableTransition) {
      const animationFrame = window.requestAnimationFrame(() => {
        setEnableTransition(true);
      });

      return () => {
        window.cancelAnimationFrame(animationFrame);
      };
    }
  }, [enableTransition]);

  
  const cardWidth = 100 / visibleCards;

  const translateX = currentIndex * cardWidth;

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

           
            transition: enableTransition
              ? "transform 0.55s ease-in-out"
              : "none",
          }}
        >
          {repeatedServices.map((service, index) => (
            <div
              className="service-carousel__slide"
              key={`${service.title}-${index}`}
              style={{
                flex: `0 0 ${cardWidth}%`,
                maxWidth: `${cardWidth}%`,
              }}
            >
              <article className="service-card">
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
                  <div className="service-card__content">
                    <h3>{service.title}</h3>

                    <div className="service-card__divider" />

                    <Link
                      href={service.href}
                      className="service-card__read-more"
                    >
                      <span className="service-card__arrow">‹</span>

                      <span>Read More</span>

                      <span className="service-card__arrow">›</span>
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}