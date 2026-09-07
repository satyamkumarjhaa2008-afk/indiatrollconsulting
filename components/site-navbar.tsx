"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import gsap from "gsap";

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

const menus = {
  Company: [
    { name: "About Us", href: "/about" },
    { name: "Meet Our Team", href: "/team" },
    { name: "Life@indiatroll", href: "/life@indiatroll" },
  ],

  Services: services,

  Media: [
    { name: "Online Article", href: "/online-articles" },
    { name: "Television", href: "/television" },
    { name: "Press Release", href: "/press-release" },
  ],
};

const links = [
  "Home",
  "Company",
  "Services",
  "Media",
  "Careers",
  "Contact Us",
];

const socials = [
  {
    label: "Facebook",
    icon: "fab fa-facebook-f",
    href: "https://www.facebook.com/indiatrollconsulting",
  },
  {
    label: "Instagram",
    icon: "fab fa-instagram",
    href: "https://www.instagram.com/indiatrollconsulting",
  },
  {
    label: "LinkedIn",
    icon: "fab fa-linkedin-in",
    href: "https://www.linkedin.com/company/indiatrollconsulting",
  },
  {
    label: "Twitter",
    icon: "fab fa-twitter",
    href: "https://twitter.com/indiatrollconsulting",
  },
];

export function SiteNavbar() {
  const [openMenu, setOpenMenu] =
    useState<string | null>(null);

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const headerRef =
    useRef<HTMLElement | null>(null);

  const navbarRef =
    useRef<HTMLElement | null>(null);

  const brandRef =
    useRef<HTMLAnchorElement | null>(null);

  const desktopNavRef =
    useRef<HTMLDivElement | null>(null);

  const mobileDrawerRef =
    useRef<HTMLElement | null>(null);

  const mobileOverlayRef =
    useRef<HTMLDivElement | null>(null);

  const drawerLinksRef =
    useRef<HTMLDivElement | null>(null);

  const drawerContactRef =
    useRef<HTMLDivElement | null>(null);

  const getHref = (link: string) => {
    switch (link) {
      case "Home":
        return "/";
      case "Careers":
        return "/careers";
      case "Contact Us":
        return "/contact";
      default:
        return "";
    }
  };

  useLayoutEffect(() => {
    const header = headerRef.current;
    const brand = brandRef.current;
    const desktopNav = desktopNavRef.current;

    if (!header || !brand || !desktopNav) {
      return;
    }

    const ctx = gsap.context(() => {
      const navItems =
        desktopNav.querySelectorAll(".nav-item");

      gsap.set(header, {
        y: -40,
        autoAlpha: 0,
      });

      gsap.set(brand, {
        x: -30,
        autoAlpha: 0,
      });

      if (navItems.length) {
        gsap.set(navItems, {
          y: -20,
          autoAlpha: 0,
        });
      }

      const entrance = gsap.timeline({
        paused: true,
        defaults: {
          ease: "power3.out",
        },
      });

      entrance
        .to(header, {
          y: 0,
          autoAlpha: 1,
          duration: 0.65,
        })
        .to(
          brand,
          {
            x: 0,
            autoAlpha: 1,
            duration: 0.55,
          },
          "-=0.35"
        )
        .to(
          navItems,
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.45,
            stagger: 0.07,
          },
          "-=0.3"
        );

      const startEntrance = () => {
        entrance.restart();
      };

      const frameOne =
        requestAnimationFrame(() => {
          requestAnimationFrame(startEntrance);
        });

      const handleScroll = () => {
        if (window.innerWidth <= 820) {
          return;
        }

        const scrollY = window.scrollY;

        if (scrollY > 40) {
          gsap.to(navbarRef.current, {
            paddingTop: "10px",
            paddingBottom: "10px",
            duration: 0.35,
            ease: "power2.out",
            overwrite: "auto",
          });

          gsap.to(brandRef.current, {
            scale: 0.9,
            duration: 0.35,
            ease: "power2.out",
            transformOrigin: "left center",
            overwrite: "auto",
          });

          gsap.to(headerRef.current, {
            boxShadow:
              "0 10px 35px rgba(0, 0, 0, 0.28)",
            duration: 0.35,
            overwrite: "auto",
          });
        } else {
          gsap.to(navbarRef.current, {
            paddingTop: "18px",
            paddingBottom: "18px",
            duration: 0.35,
            ease: "power2.out",
            overwrite: "auto",
          });

          gsap.to(brandRef.current, {
            scale: 1,
            duration: 0.35,
            ease: "power2.out",
            transformOrigin: "left center",
            overwrite: "auto",
          });

          gsap.to(headerRef.current, {
            boxShadow:
              "0 0 0 rgba(0, 0, 0, 0)",
            duration: 0.35,
            overwrite: "auto",
          });
        }
      };

      window.addEventListener(
        "scroll",
        handleScroll,
        { passive: true }
      );

      handleScroll();

      return () => {
        cancelAnimationFrame(frameOne);

        window.removeEventListener(
          "scroll",
          handleScroll
        );
      };
    }, header);

    return () => {
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const drawer = mobileDrawerRef.current;
    const overlay = mobileOverlayRef.current;

    if (!drawer || !overlay) {
      return;
    }

    gsap.killTweensOf([
      drawer,
      overlay,
    ]);

    if (mobileOpen) {
      document.body.style.overflow = "hidden";

      gsap.set(overlay, {
        opacity: 0,
        visibility: "visible",
        pointerEvents: "auto",
      });

      gsap.set(drawer, {
        xPercent: 100,
        visibility: "visible",
        pointerEvents: "auto",
      });

      if (drawerLinksRef.current) {
        gsap.set(
          drawerLinksRef.current.querySelectorAll(
            ".mobile-item"
          ),
          {
            x: 30,
            opacity: 0,
          }
        );
      }

      if (drawerContactRef.current) {
        gsap.set(drawerContactRef.current, {
          y: 20,
          opacity: 0,
        });
      }

      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .to(overlay, {
          opacity: 1,
          duration: 0.3,
        })
        .to(
          drawer,
          {
            xPercent: 0,
            duration: 0.55,
            ease: "power3.out",
          },
          "-=0.18"
        );

      if (drawerLinksRef.current) {
        const items =
          drawerLinksRef.current.querySelectorAll(
            ".mobile-item"
          );

        gsap.to(items, {
          x: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.06,
          delay: 0.25,
          ease: "power3.out",
          overwrite: "auto",
        });
      }

      if (drawerContactRef.current) {
        gsap.to(drawerContactRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.45,
          delay: 0.55,
          ease: "power3.out",
          overwrite: "auto",
        });
      }
    } else {
      document.body.style.overflow = "";

      const timeline = gsap.timeline({
        onComplete: () => {
          gsap.set(drawer, {
            visibility: "hidden",
            pointerEvents: "none",
          });

          gsap.set(overlay, {
            visibility: "hidden",
            pointerEvents: "none",
          });
        },
      });

      timeline
        .to(drawer, {
          xPercent: 100,
          duration: 0.4,
          ease: "power3.inOut",
        })
        .to(
          overlay,
          {
            opacity: 0,
            duration: 0.25,
            ease: "power2.out",
          },
          "-=0.2"
        );
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!openMenu) {
      return;
    }

    const dropdowns =
      desktopNavRef.current?.querySelectorAll(
        ".dropdown"
      );

    if (!dropdowns?.length) {
      return;
    }

    dropdowns.forEach((dropdown) => {
      gsap.fromTo(
        dropdown,
        {
          y: -12,
          opacity: 0,
          scaleY: 0.95,
          transformOrigin: "top center",
        },
        {
          y: 0,
          opacity: 1,
          scaleY: 1,
          duration: 0.28,
          ease: "power3.out",
        }
      );

      const items =
        dropdown.querySelectorAll(
          ".dropdown-link"
        );

      gsap.fromTo(
        items,
        {
          y: -8,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.25,
          stagger: 0.04,
          delay: 0.05,
          ease: "power2.out",
        }
      );
    });
  }, [openMenu]);

  useEffect(() => {
    if (!mobileOpen || !openMenu) {
      return;
    }

    const submenus =
      drawerLinksRef.current?.querySelectorAll(
        ".mobile-submenu"
      );

    if (!submenus?.length) {
      return;
    }

    submenus.forEach((submenu) => {
      gsap.fromTo(
        submenu,
        {
          height: 0,
          opacity: 0,
          overflow: "hidden",
        },
        {
          height: "auto",
          opacity: 1,
          duration: 0.35,
          ease: "power3.out",
          clearProps: "height,overflow",
        }
      );

      const submenuLinks =
        submenu.querySelectorAll("a");

      gsap.fromTo(
        submenuLinks,
        {
          x: -15,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.05,
          delay: 0.1,
          ease: "power2.out",
        }
      );
    });
  }, [openMenu, mobileOpen]);

  useEffect(() => {
    const handleEscape = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setOpenMenu(null);
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 820) {
        setMobileOpen(false);
        setOpenMenu(null);
      }
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="site-header"
    >
      <nav
        ref={navbarRef}
        className="navbar"
        aria-label="Main navigation"
      >
        <Link
          ref={brandRef}
          className="brand"
          href="/"
          aria-label="IndiaTroll home"
        >
          <Image
            src="/india-troll-logo-vector.svg"
            alt="IndiaTroll"
            width={152}
            height={48}
            priority
          />
        </Link>

        <div
          ref={desktopNavRef}
          className="desktop-nav"
        >
          {links.map((link) => {
            const hasMenu =
              link in menus;

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
                {hasMenu ? (
                  <button
                    type="button"
                    className="nav-link"
                    onClick={() => {
                      setOpenMenu(
                        openMenu === link
                          ? null
                          : link
                      );
                    }}
                    aria-haspopup="menu"
                    aria-expanded={
                      openMenu === link
                    }
                  >
                    <span>{link}</span>

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
                  </button>
                ) : (
                  <Link
                    href={getHref(link)}
                    className="nav-link"
                  >
                    <span>{link}</span>
                  </Link>
                )}

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
                                href={
                                  service.href
                                }
                                key={
                                  service.name
                                }
                                className="dropdown-link"
                                role="menuitem"
                                onClick={() =>
                                  setOpenMenu(
                                    null
                                  )
                                }
                              >
                                <span>
                                  {
                                    service.name
                                  }
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
                              href={
                                typeof item ===
                                "string"
                                  ? "#"
                                  : item.href
                              }
                              key={
                                typeof item ===
                                "string"
                                  ? item
                                  : item.name
                              }
                              className="dropdown-link"
                              role="menuitem"
                              onClick={() =>
                                setOpenMenu(
                                  null
                                )
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

        <button
          type="button"
          className="menu-toggle"
          onClick={() => {
            setOpenMenu(null);
            setMobileOpen(true);
          }}
          aria-label="Open navigation menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
        >
          <Menu
            aria-hidden="true"
            size={22}
          />
        </button>
      </nav>

      <div
        ref={mobileOverlayRef}
        className="mobile-overlay"
        onClick={() => {
          setMobileOpen(false);
          setOpenMenu(null);
        }}
        aria-hidden="true"
      />

      <aside
        id="mobile-navigation"
        ref={mobileDrawerRef}
        className="mobile-drawer"
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
      >
        <div className="drawer-top">
          <Image
            src="/india-troll-logo-vector.svg"
            alt="IndiaTroll"
            width={132}
            height={42}
          />

          <button
            type="button"
            className="close-button"
            onClick={() => {
              setMobileOpen(false);
              setOpenMenu(null);
            }}
            aria-label="Close navigation menu"
          >
            <X
              aria-hidden="true"
              size={20}
            />
          </button>
        </div>

        <div
          ref={drawerLinksRef}
          className="mobile-links"
        >
          {links.map((link) => {
            const hasMenu =
              link in menus;

            return (
              <div
                key={link}
                className="mobile-item"
              >
                {hasMenu ? (
                  <button
                    type="button"
                    className="mobile-nav-parent"
                    onClick={() => {
                      setOpenMenu(
                        openMenu === link
                          ? null
                          : link
                      );
                    }}
                    aria-haspopup="menu"
                    aria-expanded={
                      openMenu === link
                    }
                  >
                    <span>{link}</span>

                    {openMenu === link ? (
                      <X
                        aria-hidden="true"
                        size={16}
                      />
                    ) : (
                      <ChevronDown
                        aria-hidden="true"
                        size={16}
                      />
                    )}
                  </button>
                ) : (
                  <Link
                    href={getHref(link)}
                    onClick={() => {
                      setMobileOpen(false);
                      setOpenMenu(null);
                    }}
                  >
                    <span>{link}</span>
                  </Link>
                )}

                {hasMenu &&
                  openMenu === link && (
                    <div className="mobile-submenu">
                      {link === "Services"
                        ? services.map(
                            (service) => (
                              <Link
                                href={
                                  service.href
                                }
                                key={
                                  service.name
                                }
                                onClick={() => {
                                  setMobileOpen(
                                    false
                                  );
                                  setOpenMenu(
                                    null
                                  );
                                }}
                              >
                                <ArrowRight
                                  aria-hidden="true"
                                  size={13}
                                />

                                {
                                  service.name
                                }
                              </Link>
                            )
                          )
                        : menus[
                            link as keyof typeof menus
                          ].map((item) => (
                            <Link
                              href={
                                typeof item ===
                                "string"
                                  ? "#"
                                  : item.href
                              }
                              key={
                                typeof item ===
                                "string"
                                  ? item
                                  : item.name
                              }
                              onClick={() => {
                                setMobileOpen(
                                  false
                                );
                                setOpenMenu(
                                  null
                                );
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

        <div
          ref={drawerContactRef}
          className="drawer-contact"
        >
          <span>Contact Info</span>

          <p>
            Pune, Maharashtra
            <br />
            +91 88057 57772
            <br />
            info@indiatroll.in
          </p>

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