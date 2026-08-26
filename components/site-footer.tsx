'use client'

import { useEffect, useRef, useState } from 'react'

const sections = [
  {
    title: 'Basic Things',
    links: ['About Us', 'Meet Our Team', 'Life @ Rudra', 'Careers'],
  },
  {
    title: 'Find Us',
    links: ['New Delhi', 'Mumbai', 'Bengaluru', 'Across India'],
  },
  {
    title: 'Services',
    links: ['Survey & Insights', 'Ground Intelligence', 'Political Strategy & Consulting', 'Communication & Image Management', 'Market Research & Business Insights', 'Governance & Project Monitoring'],
  },
  {
    title: 'Quick Links',
    links: ['Home', 'Company', 'Media', 'Contact Us'],
  },
]

const socialLinks = [
  { label: 'Facebook', icon: 'fab fa-facebook-f', href: '#' },
  { label: 'LinkedIn', icon: 'fab fa-linkedin-in', href: '#' },
  { label: 'Instagram', icon: 'fab fa-instagram', href: '#' },
  { label: 'Twitter', icon: 'fab fa-twitter', href: '#' },
]

export default function SiteFooter() {
  const footerRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = footerRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <footer ref={footerRef} className={`site-footer${isVisible ? ' is-visible' : ''}`}>
      <div className="footer-main">
        <div className="footer-intro footer-reveal">
          <p className="footer-kicker">Rudra Research &amp; Strategy</p>
          <h2>Ideas that move India forward.</h2>
          <p className="footer-description">
            We combine insight, strategy, and execution to help leaders and institutions create meaningful change.
          </p>
          <a className="footer-cta" href="#contact">
            Start a conversation <i className="fa fa-angle-right" aria-hidden="true" />
          </a>
        </div>

        <div className="footer-columns">
          {sections.map((section, index) => (
            <nav key={section.title} className={`footer-section footer-reveal footer-reveal-${index + 1}`} aria-label={section.title}>
              <h3>{section.title}</h3>
              <ul>
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#home">
                      <i className="fa fa-angle-right" aria-hidden="true" />
                      <span>{link}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="footer-contact-band footer-reveal">
        <div className="footer-contact">
          <i className="fa fa-map" aria-hidden="true" />
          <span>New Delhi, India</span>
        </div>
        <div className="footer-contact">
          <i className="fa fa-phone" aria-hidden="true" />
          <a href="tel:+911140000000">+91 11 4000 0000</a>
        </div>
        <div className="footer-contact">
          <i className="flaticon-gmail" aria-hidden="true" />
          <a href="mailto:connect@rudraresearch.com">connect@rudraresearch.com</a>
        </div>
        <div className="footer-socials" aria-label="Social media">
          {socialLinks.map((social) => (
            <a key={social.label} href={social.href} aria-label={social.label}>
              <i className={social.icon} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Rudra Research &amp; Strategy. All rights reserved.</p>
        <p>Built with purpose.</p>
      </div>
    </footer>
  )
}
