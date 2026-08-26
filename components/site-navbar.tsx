'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react'

const menus = {
  Company: ['About Us', 'Meet Our Team', 'Life@Rudra'],
  Services: [
    'Survey & Insights',
    'Ground Intelligence',
    'Political Strategy & Consulting',
    'Communication & Image Management',
    'Market Research & Business Insights',
    'Governance & Project Monitoring (PMC)',
  ],
  Media: ['Online Article', 'Television', 'Press Release'],
}

const links = ['Home', 'Company', 'Services', 'Media', 'Careers', 'Contact Us']

export function SiteNavbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
        <a className="brand" href="#home" aria-label="IndiaTroll home">
          <Image src="/india-troll-logo.svg" alt="IndiaTroll" width={152} height={48} priority />
        </a>

        <div className="desktop-nav">
          {links.map((link) => {
            const hasMenu = link in menus
            return (
              <div
                key={link}
                className="nav-item"
                onMouseEnter={() => hasMenu && setOpenMenu(link)}
                onMouseLeave={() => hasMenu && setOpenMenu(null)}
              >
                <a
                  href={`#${link.toLowerCase().replace(' ', '-')}`}
                  className="nav-link"
                  onClick={(event) => {
                    if (hasMenu) {
                      event.preventDefault()
                      setOpenMenu(openMenu === link ? null : link)
                    }
                  }}
                  aria-haspopup={hasMenu ? 'menu' : undefined}
                  aria-expanded={hasMenu ? openMenu === link : undefined}
                >
                  {link}
                  {hasMenu && (
                    <span className={`nav-chevron ${openMenu === link ? 'is-open' : ''}`}>
                      <ChevronDown aria-hidden="true" size={14} strokeWidth={1.7} />
                    </span>
                  )}
                </a>
                {hasMenu && openMenu === link && (
                  <div className="dropdown" role="menu">
                    {menus[link as keyof typeof menus].map((item) => (
                      <a href="#" key={item} className="dropdown-link" role="menuitem">
                        <span>{item}</span><ArrowRight aria-hidden="true" size={15} />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <button className="menu-toggle" onClick={() => setMobileOpen(true)} aria-label="Open navigation menu" aria-expanded={mobileOpen}>
          <Menu aria-hidden="true" size={22} />
        </button>
      </nav>

      <div className={`mobile-overlay ${mobileOpen ? 'is-open' : ''}`} onClick={() => setMobileOpen(false)} aria-hidden="true" />
      <aside className={`mobile-drawer ${mobileOpen ? 'is-open' : ''}`} aria-label="Mobile navigation">
        <div className="drawer-top">
          <Image src="/india-troll-logo.svg" alt="IndiaTroll" width={132} height={42} />
          <button className="close-button" onClick={() => setMobileOpen(false)} aria-label="Close navigation menu"><X aria-hidden="true" size={20} /></button>
        </div>
        <div className="mobile-links">
          {links.map((link) => {
            const hasMenu = link in menus
            return <div key={link} className="mobile-item">
              <a
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                onClick={(event) => {
                  if (hasMenu) {
                    event.preventDefault()
                    setOpenMenu(openMenu === link ? null : link)
                  } else {
                    setMobileOpen(false)
                  }
                }}
                aria-haspopup={hasMenu ? 'menu' : undefined}
                aria-expanded={hasMenu ? openMenu === link : undefined}
              >
                <span>{link}</span>
                {hasMenu && (openMenu === link ? <X aria-hidden="true" size={16} /> : <ChevronDown aria-hidden="true" size={16} />)}
              </a>
              {hasMenu && openMenu === link && <div className="mobile-submenu">{menus[link as keyof typeof menus].map((item) => <a href="#" key={item} onClick={() => setMobileOpen(false)}><ArrowRight aria-hidden="true" size={13} />{item}</a>)}</div>}
            </div>
          })}
        </div>
        <div className="drawer-contact"><span>Contact Info</span><p>Pune, Maharashtra<br />+91 86000 00000<br />hello@indiatroll.in</p><div className="socials"><a href="#" aria-label="Facebook">f</a><a href="#" aria-label="Instagram">ig</a><a href="#" aria-label="LinkedIn">in</a><a href="#" aria-label="Twitter">x</a></div></div>
      </aside>
    </header>
  )
}

export default SiteNavbar
