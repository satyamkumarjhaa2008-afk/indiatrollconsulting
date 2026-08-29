
'use client'

import { useEffect, useRef, useState } from 'react'

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
  'About Us',
  'Our Team',
  'Television',
  'Careers',
  'Contact',
]

const socials = [
  { label: 'Facebook', icon: 'fab fa-facebook-f' },
  { label: 'LinkedIn', icon: 'fab fa-linkedin' },
  { label: 'Instagram', icon: 'fab fa-instagram' },
  { label: 'Twitter', icon: 'fab fa-twitter' },
]

export default function SiteFooter() {
  const footerRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = footerRef.current

    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [])

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

  return (
    <footer
      ref={footerRef}
      className={`site-footer${isVisible ? ' is-visible' : ''}`}
    >
      <div className="footer-watermark" aria-hidden="true">
        R
      </div>

      <div className="footer-main footer-reference-layout">
        <div className="footer-intro footer-reveal footer-reveal-1">
          <img
            className="footer-logo"
            src="/assets/icons/logos/india-troll-logo.svg"
            alt="IndiaTroll"
          />

          <p className="footer-description">
            IndiaTroll conducts opinion and exit polls for media and supports
            political and governance decisions through ground surveys and
            data-backed insights...
            <a className="footer-read-more" href="#contact">
              Read More &gt;&gt;
            </a>
          </p>

          <div
            className="footer-socials footer-intro-socials"
            aria-label="Social media"
          >
            {socials.map((social) => (
              <a
                key={social.label}
                href="#"
                aria-label={social.label}
              >
                <i
                  className={social.icon}
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </div>

        <nav
          className="footer-section footer-reveal footer-reveal-2"
          aria-label="Find us"
        >
          <h3>Find Us</h3>

          <ul>
            <li>
              <span className="footer-contact-item">
                <i className="fa fa-map" aria-hidden="true" />
                Office No. 22, 4th Floor, Solitaire Business Hub, Balewadi
                High Street, Baner, Pune – 411045
              </span>
            </li>

            <li>
              <a href="tel:+912045219327">
                <i className="fa fa-phone" aria-hidden="true" />
                020-45219327
              </a>
            </li>

            <li>
              <a href="tel:+918484986359">
                <i className="fa fa-music" aria-hidden="true" />
                +91-8484986359
              </a>
            </li>

            <li>
              <a href="mailto:info@rudraresearch.in">
                <i className="fa fa-envelope" aria-hidden="true" />
                info@rudraresearch.in
              </a>
            </li>

            <li>
              <a
                href="https://www.rudraresearch.in"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-globe" aria-hidden="true" />
                www.rudraresearch.in
              </a>
            </li>
          </ul>
        </nav>

        <nav
          className="footer-section footer-reveal footer-reveal-3"
          aria-label="Services"
        >
          <h3>Services</h3>

          <ul>
            {services.map((service) => (
              <li key={service.name}>
                <i className="fa fa-check" aria-hidden="true" />

                <a href={service.href}>
                  {service.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav
          className="footer-section footer-reveal footer-reveal-4"
          aria-label="Quick links"
        >
          <h3>Quick Links</h3>

          <ul>
            {quickLinks.map((link) => (
              <li key={link}>
                <a href="#home">
                  <i
                    className="fa fa-angle-right"
                    aria-hidden="true"
                  />
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="footer-bottom footer-reveal footer-reveal-4">
        <p>
          @ Website Designed and Managed By Web Biz Solutions
        </p>

        <p>
          <a href="#privacy">
            Privacy Policy
          </a>

          <span> - </span>

          <a href="#terms">
            Terms &amp; Conditions
          </a>
        </p>
      </div>

      {/* Google Translate */}
      <div className="footer-language">
        <div
          id="google_translate_element"
          className="google-translate"
        />
      </div>

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

      <a
        className="footer-to-top"
        href="#home"
        aria-label="Back to top"
      >
        <i
          className="fa fa-angle-up"
          aria-hidden="true"
        />
      </a>
    </footer>
  )
}

