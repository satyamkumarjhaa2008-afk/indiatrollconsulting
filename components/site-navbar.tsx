'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react'
import ServiceCarousel from './services-carousel'
import SideNavbar from './side-navbar'
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

const menus = {
  Company: ['About Us', 'Meet Our Team', 'Life@Rudra'],
  Services: services,
  Media: ['Online Article', 'Television', 'Press Release'],
}

const links = [
  'Home',
  'Company',
  'Services',
  'Media',
  'Careers',
  'Contact Us',
]

export function SiteNavbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  const getHref = (link: string) => {
    switch (link) {
      case 'Home':
        return '/'
      case 'Careers':
        return '/careers'
      case 'Contact Us':
        return '/contact'
      default:
        return `#${link.toLowerCase().replace(/\s+/g, '-')}`
    }
  }

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">

        {/* Logo */}
        <Link
          className="brand"
          href="/"
          aria-label="IndiaTroll home"
        >
          <Image
            src="/india-troll-logo.svg"
            alt="IndiaTroll"
            width={152}
            height={48}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="desktop-nav">
          {links.map((link) => {
            const hasMenu = link in menus

            return (
              <div
                key={link}
                className="nav-item"
                onMouseEnter={() => {
                  if (hasMenu) {
                    setOpenMenu(link)
                  }
                }}
                onMouseLeave={() => {
                  if (hasMenu) {
                    setOpenMenu(null)
                  }
                }}
              >
                <Link
                  href={getHref(link)}
                  className="nav-link"
                  onClick={(event) => {
                    if (hasMenu) {
                      event.preventDefault()
                      setOpenMenu(
                        openMenu === link ? null : link
                      )
                    }
                  }}
                  aria-haspopup={hasMenu ? 'menu' : undefined}
                  aria-expanded={
                    hasMenu ? openMenu === link : undefined
                  }
                >
                  {link}

                  {hasMenu && (
                    <span
                      className={`nav-chevron ${
                        openMenu === link ? 'is-open' : ''
                      }`}
                    >
                      <ChevronDown
                        aria-hidden="true"
                        size={14}
                        strokeWidth={1.7}
                      />
                    </span>
                  )}
                </Link>

                {/* Desktop Dropdown */}
                {hasMenu && openMenu === link && (
                  <div className="dropdown" role="menu">
                    {link === 'Services'
                      ? services.map((service) => (
                          <Link
                            href={service.href}
                            key={service.name}
                            className="dropdown-link"
                            role="menuitem"
                            onClick={() => setOpenMenu(null)}
                          >
                            <span>{service.name}</span>

                            <ArrowRight
                              aria-hidden="true"
                              size={15}
                            />
                          </Link>
                        ))
                      : menus[
                          link as keyof typeof menus
                        ].map((item) => (
                          <Link
                            href="#"
                            key={typeof item === 'string' ? item : item.name}
                            className="dropdown-link"
                            role="menuitem"
                            onClick={() => setOpenMenu(null)}
                          >
                            <span>{typeof item === 'string' ? item : item.name}</span>

                            <ArrowRight
                              aria-hidden="true"
                              size={15}
                            />
                          </Link>
                        ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="menu-toggle"
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={mobileOpen}
        >
          <Menu
            aria-hidden="true"
            size={22}
          />
        </button>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`mobile-overlay ${
          mobileOpen ? 'is-open' : ''
        }`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Drawer */}
      <aside
        className={`mobile-drawer ${
          mobileOpen ? 'is-open' : ''
        }`}
        aria-label="Mobile navigation"
      >

        {/* Drawer Header */}
        <div className="drawer-top">
          <Image
            src="/india-troll-logo.svg"
            alt="IndiaTroll"
            width={132}
            height={42}
          />

          <button
            className="close-button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation menu"
          >
            <X
              aria-hidden="true"
              size={20}
            />
          </button>
        </div>

        {/* Mobile Links */}
        <div className="mobile-links">
          {links.map((link) => {
            const hasMenu = link in menus

            return (
              <div
                key={link}
                className="mobile-item"
              >
                <Link
                  href={getHref(link)}
                  onClick={(event) => {
                    if (hasMenu) {
                      event.preventDefault()

                      setOpenMenu(
                        openMenu === link ? null : link
                      )
                    } else {
                      setMobileOpen(false)
                    }
                  }}
                  aria-haspopup={
                    hasMenu ? 'menu' : undefined
                  }
                  aria-expanded={
                    hasMenu
                      ? openMenu === link
                      : undefined
                  }
                >
                  <span>{link}</span>

                  {hasMenu &&
                    (openMenu === link ? (
                      <X
                        aria-hidden="true"
                        size={16}
                      />
                    ) : (
                      <ChevronDown
                        aria-hidden="true"
                        size={16}
                      />
                    ))}
                </Link>

                {/* Mobile Submenu */}
                {hasMenu && openMenu === link && (
                  <div className="mobile-submenu">

                    {link === 'Services'
                      ? services.map((service) => (
                          <Link
                            href={service.href}
                            key={service.name}
                            onClick={() => {
                              setMobileOpen(false)
                              setOpenMenu(null)
                            }}
                          >
                            <ArrowRight
                              aria-hidden="true"
                              size={13}
                            />

                            {service.name}
                          </Link>
                        ))
                      : menus[
                          link as keyof typeof menus
                        ].map((item) => (
                          <Link
                            href="#"
                            key={typeof item === 'string' ? item : item.name}
                            onClick={() => {
                              setMobileOpen(false)
                              setOpenMenu(null)
                            }}
                          >
                            <ArrowRight
                              aria-hidden="true"
                              size={13}
                            />

                            {typeof item === 'string' ? item : item.name}
                          </Link>
                        ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Contact */}
        <div className="drawer-contact">
          <span>Contact Info</span>

          <p>
            Pune, Maharashtra
            <br />
            +91 86000 00000
            <br />
            hello@indiatroll.in
          </p>

          <div className="socials">
            <a
              href="#"
              aria-label="Facebook"
            >
              f
            </a>

            <a
              href="#"
              aria-label="Instagram"
            >
              ig
            </a>

            <a
              href="#"
              aria-label="LinkedIn"
            >
              in
            </a>

            <a
              href="#"
              aria-label="Twitter"
            >
              x
            </a>
          </div>
        </div>
      </aside>
    </header>
  )
}

export default SiteNavbar