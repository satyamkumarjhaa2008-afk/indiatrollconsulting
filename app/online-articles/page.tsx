"use client";

import React, {
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./online-articles.css";

import data from "@/components/newsdata";

gsap.registerPlugin(ScrollTrigger);


/* ============================================================
   TYPES
   ============================================================ */

type Article = {
  header: string;
  url: string;
  image: string;
  lastUpdated: string;
};

type FilterType = "all" | "latest" | "old";


/* ============================================================
   INDIA TROLL LOGO
   ============================================================ */

const INDIA_TROLL_LOGO = "/india-troll-logo-vector.svg";


/* ============================================================
   ARTICLE CARD
   ============================================================ */

type ArticleCardProps = {
  article: Article;
  index: number;
};


const ArticleCard = ({
  article,
  index,
}: ArticleCardProps) => {

  const cardRef = useRef<HTMLAnchorElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const iconRef = useRef<HTMLSpanElement | null>(null);


  /* ==========================================================
     SCROLL REVEAL
     ========================================================== */

  useLayoutEffect(() => {

    const card = cardRef.current;

    if (!card) return;


    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


    const ctx = gsap.context(() => {

      /*
       * Reduced motion:
       * Keep card immediately visible.
       */

      if (reduceMotion) {

        gsap.set(card, {
          opacity: 1,
          y: 0,
          scale: 1,
        });

        return;
      }


      /*
       * Scroll reveal.
       *
       * fromTo is used here so the card does not depend
       * on CSS opacity being set to 0.
       */

      gsap.fromTo(
        card,

        {
          opacity: 0,
          y: 70,
          scale: 0.96,
        },

        {
          opacity: 1,
          y: 0,
          scale: 1,

          duration: 0.75,

          delay: (index % 3) * 0.08,

          ease: "power3.out",

          scrollTrigger: {
            trigger: card,

            start: "top 88%",

            once: true,

            toggleActions:
              "play none none none",
          },
        }
      );

    }, cardRef);


    return () => {
      ctx.revert();
    };

  }, [index]);


  /* ==========================================================
     HOVER ENTER
     ========================================================== */

  const handleMouseEnter = () => {

    const image = imageRef.current;
    const overlay = overlayRef.current;
    const icon = iconRef.current;

    if (!image || !overlay || !icon) {
      return;
    }


    /*
     * Don't run desktop hover animation on touch devices.
     */

    const canHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;


    if (!canHover) {
      return;
    }


    /*
     * Kill any animation currently running on these elements.
     */

    gsap.killTweensOf([
      image,
      overlay,
      icon,
    ]);


    /*
     * Hover animation.
     */

    const tl = gsap.timeline();


    tl.to(
      image,
      {
        scale: 1.055,

        duration: 0.7,

        ease: "power3.out",
      },
      0
    );


    tl.to(
      overlay,
      {
        opacity: 1,

        duration: 0.35,

        ease: "power2.out",
      },
      0
    );


    tl.to(
      icon,
      {
        opacity: 1,

        scale: 1,

        rotation: 0,

        duration: 0.5,

        ease: "back.out(1.7)",
      },
      0.05
    );
  };


  /* ==========================================================
     HOVER LEAVE
     ========================================================== */

  const handleMouseLeave = () => {

    const image = imageRef.current;
    const overlay = overlayRef.current;
    const icon = iconRef.current;

    if (!image || !overlay || !icon) {
      return;
    }


    const canHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;


    if (!canHover) {
      return;
    }


    gsap.killTweensOf([
      image,
      overlay,
      icon,
    ]);


    const tl = gsap.timeline();


    tl.to(
      icon,
      {
        opacity: 0,

        scale: 0.55,

        rotation: -12,

        duration: 0.22,

        ease: "power2.in",
      },
      0
    );


    tl.to(
      overlay,
      {
        opacity: 0,

        duration: 0.28,

        ease: "power2.out",
      },
      0
    );


    tl.to(
      image,
      {
        scale: 1,

        duration: 0.65,

        ease: "power3.out",
      },
      0
    );
  };


  return (
    <a
      ref={cardRef}
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="online-article-card"
      aria-label={`Read article: ${article.header}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >

      {/* ======================================================
          IMAGE
      ====================================================== */}

      <div className="online-article-image-wrapper">

        <img
          ref={imageRef}
          src={`/assets/onlinearticles/${article.image}`}
          alt={article.header}
          className="online-article-image"
          loading={index < 3 ? "eager" : "lazy"}
          decoding="async"
        />


        {/* ====================================================
            HOVER OVERLAY
        ==================================================== */}

        <div
          ref={overlayRef}
          className="online-article-overlay"
          aria-hidden="true"
        >

          <span
            ref={iconRef}
            className="online-article-link-icon"
          >

            <svg
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >

              {/* Main connecting line */}

              <path
                d="M25.5 38.5L38.5 25.5"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />


              {/* Lower chain */}

              <path
                d="
                  M22 31
                  L17.5 35.5
                  C13.3579 39.6421
                  13.3579 46.3579
                  17.5 50.5
                  C21.6421 54.6421
                  28.3579 54.6421
                  32.5 50.5
                  L37 46
                "
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />


              {/* Upper chain */}

              <path
                d="
                  M42 33
                  L46.5 28.5
                  C50.6421 24.3579
                  50.6421 17.6421
                  46.5 13.5
                  C42.3579 9.35786
                  35.6421 9.35786
                  31.5 13.5
                  L27 18
                "
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

            </svg>

          </span>

        </div>


        {/* ====================================================
            INDIA TROLL LOGO
        ==================================================== */}

        <div className="online-article-logo">

          <img
            src={INDIA_TROLL_LOGO}
            alt="India Troll"
            className="online-article-logo-image"
            loading="lazy"
            decoding="async"
          />

        </div>

      </div>


      {/* ======================================================
          CONTENT
      ====================================================== */}

      <div className="online-article-content">

        <h2 className="online-article-title">
          {article.header}
        </h2>


        {/* ====================================================
            READ MORE
        ==================================================== */}

        <div className="online-article-read-more">

          <span
            className="online-article-dot"
            aria-hidden="true"
          />

          <span className="online-article-read-text">
            Read More
          </span>

          <span
            className="online-article-plus"
            aria-hidden="true"
          >
            +
          </span>

        </div>

      </div>

    </a>
  );
};


/* ============================================================
   MAIN COMPONENT
   ============================================================ */

const OnlineArticles = () => {

  const [activeFilter, setActiveFilter] =
    useState<FilterType>("all");


  /* ==========================================================
     GET ARTICLE DATE
     ========================================================== */

  const getArticleDate = (dateString: string) => {

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return null;
    }

    /*
     * Normalize to local midnight.
     */

    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
  };


  /* ==========================================================
     LATEST / OLD CHECK
     ========================================================== */

  const isLatest = (dateString: string) => {

    const articleDate =
      getArticleDate(dateString);

    if (!articleDate) {
      return false;
    }


    const today = new Date();

    const todayOnly = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );


    /*
     * Exactly one calendar month ago.
     *
     * Example:
     *
     * September 1
     *       ↓
     * August 1
     *
     * August 1 is still within one month.
     *
     * July 31 is OLD.
     */

    const oneMonthAgo = new Date(
      todayOnly.getFullYear(),
      todayOnly.getMonth() - 1,
      todayOnly.getDate()
    );


    return articleDate >= oneMonthAgo;
  };


  /* ==========================================================
     FILTER ARTICLES
     ========================================================== */

  const filteredArticles =
    (data as Article[]).filter(
      (article) => {

        /*
         * VIEW ALL
         */

        if (activeFilter === "all") {
          return true;
        }


        /*
         * LATEST
         */

        if (activeFilter === "latest") {
          return isLatest(
            article.lastUpdated
          );
        }


        /*
         * OLD
         */

        if (activeFilter === "old") {
          return !isLatest(
            article.lastUpdated
          );
        }


        return true;
      }
    );


  /* ==========================================================
     FILTER HANDLER
     ========================================================== */

  const handleFilterChange = (
    filter: FilterType
  ) => {

    if (filter === activeFilter) {
      return;
    }


    setActiveFilter(filter);


    /*
     * Give React time to render the new cards,
     * then refresh ScrollTrigger.
     */

    requestAnimationFrame(() => {

      requestAnimationFrame(() => {

        ScrollTrigger.refresh();

      });

    });

  };


  return (
    <section
      className="online-articles-section"
      aria-label="Online Articles"
    >

      <div className="online-articles-container">


        {/* ====================================================
            FILTERS
        ==================================================== */}

        <nav
          className="online-articles-filter"
          aria-label="Article filters"
        >

          {/* ==================================================
              VIEW ALL
          ================================================== */}

          <button
            type="button"
            className={`online-filter-btn ${
              activeFilter === "all"
                ? "active"
                : ""
            }`}
            onClick={() =>
              handleFilterChange("all")
            }
            aria-pressed={
              activeFilter === "all"
            }
          >
            VIEW ALL
          </button>


          {/* ==================================================
              LATEST
          ================================================== */}

          <button
            type="button"
            className={`online-filter-btn ${
              activeFilter === "latest"
                ? "active"
                : ""
            }`}
            onClick={() =>
              handleFilterChange("latest")
            }
            aria-pressed={
              activeFilter === "latest"
            }
          >
            LATEST
          </button>


          {/* ==================================================
              OLD
          ================================================== */}

          <button
            type="button"
            className={`online-filter-btn ${
              activeFilter === "old"
                ? "active"
                : ""
            }`}
            onClick={() =>
              handleFilterChange("old")
            }
            aria-pressed={
              activeFilter === "old"
            }
          >
            OLD
          </button>

        </nav>


        {/* ====================================================
            ARTICLES
        ==================================================== */}

        <div className="online-articles-grid">

          {filteredArticles.map(
            (article, index) => (

              <ArticleCard
                key={`${activeFilter}-${article.url}`}
                article={article}
                index={index}
              />

            )
          )}

        </div>


        {/* ====================================================
            EMPTY STATE
        ==================================================== */}

        {filteredArticles.length === 0 && (

          <div className="online-articles-empty">

            <p>
              No articles available in this category.
            </p>

          </div>

        )}

      </div>

    </section>
  );
};


export default OnlineArticles;