'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement: new (
          options: {
            pageLanguage: string
            includedLanguages: string
            autoDisplay: boolean
            layout?: number
          },
          elementId: string
        ) => void
      }
    }

    googleTranslateElementInit?: () => void
  }
}

/* =========================================================
   #4 — REAL INTERNAL ROUTES INSTEAD OF "#" PLACEHOLDERS
   ========================================================= */

const services = [
  {
    name: 'Survey & Insights',
    href: '/services/survey-insights',
  },
  {
    name: 'Ground Intelligence',
    href: '/services/ground-intelligence',
  },
  {
    name: 'Political Strategy & Consulting',
    href: '/services/political-strategy-consulting',
  },
  {
    name: 'Communication & Image Management',
    href: '/services/communication-image-management',
  },
  {
    name: 'Market Research & Business Insights',
    href: '/services/market-research-business-insights',
  },
  {
    name: 'Governance & Project Monitoring (PMC)',
    href: '/services/governance-project-monitoring',
  },
]

const quickLinks = [
  {
    name: 'About Us',
    href: '/about',
  },
  {
    name: 'Our Team',
    href: '/team',
  },
  {
    name: 'Television',
    href: '/television',
  },
  {
    name: 'Careers',
    href: '/careers',
  },
  {
    name: 'Contact',
    href: '/contact',
  },
]

/* =========================================================
   #4 — SOCIAL LINKS NO LONGER USE "#"
   Replace these URLs with your exact company profiles
   if your official social handles are different.
   ========================================================= */

const socials = [
  {
    label: 'Facebook',
    icon: 'fab fa-facebook-f',
    href: 'https://www.facebook.com/indiatrollconsulting',
  },
  {
    label: 'LinkedIn',
    icon: 'fab fa-linkedin-in',
    href: 'https://www.linkedin.com/indiatrollconsulting',
  },
  {
    label: 'Instagram',
    icon: 'fab fa-instagram',
    href: 'https://www.instagram.com/indiatrollconsulting',
  },
  {
    label: 'Twitter',
    icon: 'fab fa-twitter',
    href: 'https://twitter.com/indiatrollconsulting',
  },
]

export default function SiteFooter() {
  const footerRef = useRef<HTMLElement>(null)

  /* =========================================================
     FOOTER REVEAL — GSAP ONLY
     CSS does not control the reveal animation.
     ========================================================= */

  useLayoutEffect(() => {
    const footer = footerRef.current

    if (!footer) return

    const ctx = gsap.context(() => {
      const revealItems = footer.querySelectorAll('.footer-reveal')

      if (!revealItems.length) return

      const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches

      /*
       * Respect the user's reduced-motion preference.
       * No GSAP reveal animation is created in this case.
       */
      if (reduceMotion) {
        gsap.set(revealItems, {
          y: 0,
          opacity: 1,
          clearProps: 'transform,opacity',
        })

        return
      }

      gsap.fromTo(
        revealItems,
        {
          y: 80,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          stagger: 0.12,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: footer,
            start: 'top 50%',
            once: true,
          },
        }
      )

      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
      })
    }, footer)

    return () => {
      ctx.revert()
    }
  }, [])

  /* =========================================================
     GOOGLE TRANSLATE
     ========================================================= */

  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (
        window.google?.translate?.TranslateElement &&
        document.getElementById('google_translate_element')
      ) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,hi,mr',
            autoDisplay: false,
          },
          'google_translate_element'
        )
      }
    }

    const existingScript = document.querySelector(
      'script[src*="translate.google.com/translate_a/element.js"]'
    )

    if (!existingScript) {
      const script = document.createElement('script')

      script.src =
        'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'

      script.async = true

      document.body.appendChild(script)
    } else if (window.google?.translate?.TranslateElement) {
      window.googleTranslateElementInit()
    }

    return () => {
      delete window.googleTranslateElementInit
    }
  }, [])

  /* =========================================================
     #4 — REAL BACK-TO-TOP ACTION
     No "#home" placeholder required.
     ========================================================= */

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <footer
      ref={footerRef}
      className="site-footer"
    >
      {/* =====================================================
          FOOTER WATERMARK
          ===================================================== */}

      <div
        className="footer-watermark"
        aria-hidden="true"
      >
        R
      </div>

      <div className="footer-main footer-reference-layout">

        {/* ===================================================
            INTRO
            =================================================== */}

        <div className="footer-intro footer-reveal footer-reveal-1">

          {/* =================================================
              #1 — REMOVED WHITE FILTER FROM LOGO.
              The original SVG colors will now remain visible.
              ================================================= */}

          <Link
            href="/"
            className="footer-logo-link"
          >
            <img
              className="footer-logo"
              src="/india-troll-logo-vector.svg"
              alt="Rudra Research & Analytics"
            />
          </Link>

          <p className="footer-description">
            IndiaTroll Research & Analytics specialises in strategic research, ground-level intelligence, opinion analysis, market insights and data-driven solutions, helping organisations and decision-makers make smarter, evidence-based choices.

            {/* ===============================================
                #4 — REAL CONTACT ROUTE
                =============================================== */}

            <Link
              className="footer-read-more"
              href="/about"
            >
              Read More &gt;&gt;
            </Link>
          </p>

          {/* =================================================
              SOCIAL MEDIA
              ================================================= */}

          <div
            className="footer-socials footer-intro-socials"
            aria-label="Social media"
          >
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i
                  className={social.icon}
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </div>

        {/* ===================================================
            FIND US
            =================================================== */}

        <nav
          className="footer-section footer-reveal footer-reveal-2"
          aria-label="Find us"
        >
          <h3>Find Us</h3>

          <ul>

            <li>
              <span className="footer-contact-item">
                <i
                  className="fa fa-map-marker-alt"
                  aria-hidden="true"
                />

                <span>
                  Office No. 305, 3rd Floor, Orion Business Centre,
                  Baner Road, Baner, Pune – 411045, Maharashtra, India
                </span>
              </span>
            </li>

            <li>
              <a href="tel:+912045219327">
                <i
                  className="fa fa-phone"
                  aria-hidden="true"
                />
                <span>020-45219327</span>
              </a>
            </li>

            <li>
              <a href="tel:+918805757772">
                <i
                  className="fa fa-mobile-alt"
                  aria-hidden="true"
                />
                <span>+91-8805757772</span>
              </a>
            </li>

            <li>
              <a href="mailto:info@indiatroll.in">
                <i
                  className="fa fa-envelope"
                  aria-hidden="true"
                />
                <span>info@indiatroll.in</span>
              </a>
            </li>

            <li>
              <a
                href="https://indiatroll.in"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i
                  className="fa fa-globe"
                  aria-hidden="true"
                />
                <span>www.indiatroll.in</span>
              </a>
            </li>

          </ul>
        </nav>

        {/* ===================================================
            SERVICES
            =================================================== */}

        <nav
          className="footer-section footer-reveal footer-reveal-3"
          aria-label="Services"
        >
          <h3>Services</h3>

          <ul>
            {services.map((service) => (
              <li key={service.name}>

                {/* =================================================
                    #6 — ICON IS ALWAYS VISIBLE.
                    No width:0, opacity:0 or slide-in animation.
                    ================================================= */}

                <Link href={service.href}>
                  <i
                    className="fa fa-check"
                    aria-hidden="true"
                  />

                  <span>{service.name}</span>
                </Link>

              </li>
            ))}
          </ul>
        </nav>

        {/* ===================================================
            QUICK LINKS
            =================================================== */}

        <nav
          className="footer-section footer-reveal footer-reveal-4"
          aria-label="Quick links"
        >
          <h3>Quick Links</h3>

          <ul>
            {quickLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href}>

                  {/* =================================================
                      #6 — ARROW ALWAYS EXISTS.
                      It no longer appears only after hovering.
                      ================================================= */}

                  <i
                    className="fa fa-angle-right"
                    aria-hidden="true"
                  />

                  <span>{link.name}</span>
                </Link>
              </li>
            ))}

            {/* =================================================
                #5 — PRIVACY POLICY PAGE
                ================================================= */}

            <li>
              <Link href="/privacy-policy">
                <i
                  className="fa fa-angle-right"
                  aria-hidden="true"
                />
                <span>Privacy Policy</span>
              </Link>
            </li>

            {/* =================================================
                #5 — TERMS & CONDITIONS PAGE
                ================================================= */}

            <li>
              <Link href="/terms-and-conditions">
                <i
                  className="fa fa-angle-right"
                  aria-hidden="true"
                />
                <span>Terms &amp; Conditions</span>
              </Link>
            </li>

          </ul>
        </nav>

      </div>

      {/* =====================================================
          LANGUAGE TRANSLATOR
          ===================================================== */}

      <div className="footer-language">
        <div
          id="google_translate_element"
          className="google-translate"
        />
      </div>

      {/* =====================================================
          BOTTOM BAR
          ===================================================== */}

      <div className="footer-bottom footer-reveal footer-reveal-4">

        <p>
          © {new Date().getFullYear()} IndiaTroll Research &amp; Analytics.
          All Rights Reserved.
        </p>

        <p>
          <Link href="/privacy-policy">
            Privacy Policy
          </Link>

          <span> - </span>

          <Link href="/terms-and-conditions">
            Terms &amp; Conditions
          </Link>
        </p>

      </div>

      {/* =====================================================
          WHATSAPP
          ===================================================== */}

      <a
        className="footer-whatsapp"
        href="https://wa.me/916204535975"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <i
          className="fab fa-whatsapp"
          aria-hidden="true"
        />
      </a>

      {/* =====================================================
          #4 — BUTTON INSTEAD OF "#home"
          ===================================================== */}

      <button
        type="button"
        className="footer-to-top"
        onClick={handleBackToTop}
        aria-label="Back to top"
      >
        <i
          className="fa fa-angle-up"
          aria-hidden="true"
        />
      </button>

    </footer>
  )
}