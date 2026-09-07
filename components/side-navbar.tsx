'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import './side-navbar.css'

const services = [
  {
    id: 'survey',
    title: 'Survey & Insights',
    href: '/services/survey-insights',
  },
  {
    id: 'ground',
    title: 'Ground Intelligence',
    href: '/services/ground-intelligence',
  },
  {
    id: 'strategy',
    title: 'Political Strategy & Consulting',
    href: '/services/political-strategy-consulting',
  },
  {
    id: 'communication',
    title: 'Communication & Image Management',
    href: '/services/communication-image-management',
  },
  {
    id: 'market',
    title: 'Market Research & Business Insights',
    href: '/services/market-research-business-insights',
  },
  {
    id: 'governance',
    title: 'Governance & Project Monitoring (PMC)',
    href: '/services/governance-project-monitoring',
  },
]

function ArrowIcon() {
  return (
    <span className="service-arrow" aria-hidden="true">
      <span className="arrow-line"></span>
      <span className="arrow-head"></span>
    </span>
  )
}

export default function ServicesSidebar() {
  const pathname = usePathname()

  return (
    <section className="services-section">
      {services.map((service) => {
        const isActive = pathname === service.href

        return (
          <Link
            key={service.id}
            href={service.href}
            className={`service-item ${isActive ? 'active' : ''}`}
            aria-current={isActive ? 'page' : undefined}
          >
            <span className="service-title">
              {service.title}
            </span>

            <ArrowIcon />
          </Link>
        )
      })}
    </section>
  )
}