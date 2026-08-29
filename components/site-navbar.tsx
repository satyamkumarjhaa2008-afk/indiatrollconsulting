
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";

import ServiceCarousel from "./services-carousel";
import SideNavbar from "./side-navbar";

/* ============================================
   SERVICES
============================================ */

const services = [
  {
    name: "Survey & Insights",
    href: "/services/survey-insights",
  },
  {
    name: "Ground Intelligence",
    href: "/services/ground-intelligence",
  },
  {
    name: "Political Strategy & Consulting",
    href: "/services/political-strategy-consulting",
  },
  {
    name: "Communication & Image Management",
    href: "/services/communication-image-management",
  },
  {
    name: "Market Research & Business Insights",
    href: "/services/market-research-business-insights",
  },
  {
    name: "Governance & Project Monitoring (PMC)",
    href: "/services/governance-project-monitoring",
  },
];

/* ============================================
   DROPDOWN MENUS
============================================ */

const menus = {
  Company: [
    "About Us",
    "Meet Our Team",
    "Life@Rudra",
  ],

  Services: services,

  Media: [
    "Online Article",
    "Television",
    "Press Release",
  ],
};

/* ============================================
   MAIN NAVIGATION LINKS
============================================ */

const links = [
  "Home",
  "Company",
  "Services",
  "Media",
  "Careers",
  "Contact Us",
];

/* ============================================
   SOCIAL MEDIA
   Font Awesome classes
============================================ */

const socials = [
  {
    label: "Facebook",
    icon: "fab fa-facebook-f",
    href: "https://www.facebook.com/indiatroll",
  },
  {
    label: "Instagram",
    icon: "fab fa-instagram",
    href: "https://www.instagram.com/indiatroll",
  },
  {
    label: "LinkedIn",
    icon: "fab fa-linkedin-in",
    href: "https://www.linkedin.com/company/indiatroll",
  },
  {
    label: "Twitter",
    icon: "fab fa-twitter",
    href: "https://twitter.com/indiatroll",
  },
];

/* ============================================
   NAVBAR COMPONENT
============================================ */

export function SiteNavbar() {
  const [openMenu, setOpenMenu] =
    useState<string | null>(null);

  const [mobileOpen, setMobileOpen] =
    useState(false);

  /* ==========================================
     GET NAVIGATION URL
  ========================================== */

  const getHref = (link: string) => {
    switch (link) {
      case "Home":
        return "/";

      case "Careers":
        return "/careers";

      case "Contact Us":
        return "/contact";

      default:
        return `#${link
          .toLowerCase()
          .replace(/\s+/g, "-")}`;
    }
  };

  return (
    <header className="site-header">
      <nav
        className="navbar"
        aria-label="Main navigation"
      >

        {/* ======================================
            LOGO
        ====================================== */}

        <Link
          className="brand"
          href="/"
          aria-label="IndiaTroll home"
        >
          <Image
            src="/india-troll-logo.jpeg"
            alt="IndiaTroll"
            width={152}
            height={48}
            priority
          />
        </Link>

        {/* ======================================
            DESKTOP NAVIGATION
        ====================================== */}

        <div className="desktop-nav">

          {links.map((link) => {
            const hasMenu = link in menus;

            return (
              <div
                key={link}
                className="nav-item"

                onMouseEnter={() => {
                  if (hasMenu) {
                    setOpenMenu(link);
                  }
                }}

                onMouseLeave={() => {
                  if (hasMenu) {
                    setOpenMenu(null);
                  }
                }}
              >

                {/* NAV LINK */}

                <Link
                  href={getHref(link)}
                  className="nav-link"

                  onClick={(event) => {
                    if (hasMenu) {
                      event.preventDefault();

                      setOpenMenu(
                        openMenu === link
                          ? null
                          : link
                      );
                    }
                  }}

                  aria-haspopup={
                    hasMenu
                      ? "menu"
                      : undefined
                  }

                  aria-expanded={
                    hasMenu
                      ? openMenu === link
                      : undefined
                  }
                >

                  <span>{link}</span>

                  {hasMenu && (
                    <span
                      className={`nav-chevron ${
                        openMenu === link
                          ? "is-open"
                          : ""
                      }`}
                    >
                      <ChevronDown
                        aria-hidden="true"
                        size={16}
                        strokeWidth={3}
                      />
                    </span>
                  )}

                </Link>

                {/* ==================================
                    DESKTOP DROPDOWN
                ================================== */}

                {hasMenu &&
                  openMenu === link && (
                    <div
                      className="dropdown"
                      role="menu"
                    >

                      {link === "Services"
                        ? services.map(
                            (service) => (
                              <Link
                                href={service.href}
                                key={service.name}
                                className="dropdown-link"
                                role="menuitem"

                                onClick={() =>
                                  setOpenMenu(null)
                                }
                              >

                                <span>
                                  {service.name}
                                </span>

                                <ArrowRight
                                  aria-hidden="true"
                                  size={15}
                                />

                              </Link>
                            )
                          )

                        : menus[
                            link as keyof typeof menus
                          ].map((item) => (
                            <Link
                              href="#"
                              key={
                                typeof item ===
                                "string"
                                  ? item
                                  : item.name
                              }

                              className="dropdown-link"
                              role="menuitem"

                              onClick={() =>
                                setOpenMenu(null)
                              }
                            >

                              <span>
                                {typeof item ===
                                "string"
                                  ? item
                                  : item.name}
                              </span>

                              <ArrowRight
                                aria-hidden="true"
                                size={15}
                              />

                            </Link>
                          ))}
                    </div>
                  )}
              </div>
            );
          })}

        </div>

        {/* ======================================
            MOBILE MENU BUTTON
        ====================================== */}

        <button
          className="menu-toggle"
          onClick={() =>
            setMobileOpen(true)
          }
          aria-label="Open navigation menu"
          aria-expanded={mobileOpen}
        >
          <Menu
            aria-hidden="true"
            size={22}
          />
        </button>

      </nav>

      {/* ========================================
          MOBILE OVERLAY
      ======================================== */}

      <div
        className={`mobile-overlay ${
          mobileOpen ? "is-open" : ""
        }`}

        onClick={() =>
          setMobileOpen(false)
        }

        aria-hidden="true"
      />

      {/* ========================================
          MOBILE DRAWER
      ======================================== */}

      <aside
        className={`mobile-drawer ${
          mobileOpen ? "is-open" : ""
        }`}

        aria-label="Mobile navigation"
      >

        {/* ======================================
            DRAWER HEADER
        ====================================== */}

        <div className="drawer-top">

          <Image
            src="/india-troll-logo.jpeg"
            alt="IndiaTroll"
            width={132}
            height={42}
          />

          <button
            className="close-button"
            onClick={() =>
              setMobileOpen(false)
            }
            aria-label="Close navigation menu"
          >
            <X
              aria-hidden="true"
              size={20}
            />
          </button>

        </div>

        {/* ======================================
            MOBILE LINKS
        ====================================== */}

        <div className="mobile-links">

          {links.map((link) => {
            const hasMenu = link in menus;

            return (
              <div
                key={link}
                className="mobile-item"
              >

                <Link
                  href={getHref(link)}

                  onClick={(event) => {
                    if (hasMenu) {
                      event.preventDefault();

                      setOpenMenu(
                        openMenu === link
                          ? null
                          : link
                      );
                    } else {
                      setMobileOpen(false);
                    }
                  }}

                  aria-haspopup={
                    hasMenu
                      ? "menu"
                      : undefined
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

                {/* ==================================
                    MOBILE SUBMENU
                ================================== */}

                {hasMenu &&
                  openMenu === link && (
                    <div className="mobile-submenu">

                      {link === "Services"
                        ? services.map(
                            (service) => (
                              <Link
                                href={service.href}
                                key={service.name}

                                onClick={() => {
                                  setMobileOpen(false);
                                  setOpenMenu(null);
                                }}
                              >

                                <ArrowRight
                                  aria-hidden="true"
                                  size={13}
                                />

                                {service.name}

                              </Link>
                            )
                          )

                        : menus[
                            link as keyof typeof menus
                          ].map((item) => (
                            <Link
                              href="#"
                              key={
                                typeof item ===
                                "string"
                                  ? item
                                  : item.name
                              }

                              onClick={() => {
                                setMobileOpen(false);
                                setOpenMenu(null);
                              }}
                            >

                              <ArrowRight
                                aria-hidden="true"
                                size={13}
                              />

                              {typeof item ===
                              "string"
                                ? item
                                : item.name}

                            </Link>
                          ))}

                    </div>
                  )}

              </div>
            );
          })}

        </div>

        {/* ======================================
            CONTACT INFORMATION
        ====================================== */}

        <div className="drawer-contact">

          <span>Contact Info</span>

          <p>
            Pune, Maharashtra
            <br />
            +91 88057 57772
            <br />
            info@indiatroll.in
          </p>

          {/* ====================================
              SOCIAL MEDIA ICONS
              
              Using Font Awesome <i> tags
          ==================================== */}

          <div
            className="socials"
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

      </aside>
    </header>
  );
}

export default SiteNavbar;

