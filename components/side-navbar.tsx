'use client'

import { useState } from 'react'
import './side-navbar.css'

const services = [
  {
    id: 'survey',
    title: 'Survey & Insights',
    description:
      'We conduct surveys across political and non-political segments, helping clients take decisions based on actual ground feedback, not assumptions.',
    image: '/images/survey.jpg',
  },
  {
    id: 'ground',
    title: 'Ground Intelligence',
    description:
      'Our ground intelligence solutions provide actionable information and real-world insights from the field.',
    image: '/images/ground.jpg',
  },
  {
    id: 'strategy',
    title: 'Political Strategy & Consulting',
    description:
      'We provide strategic political consulting based on data, research and comprehensive ground-level analysis.',
    image: '/images/strategy.jpg',
  },
  {
    id: 'communication',
    title: 'Communication & Image Management',
    description:
      'We build effective communication strategies and manage public image through data-driven insights.',
    image: '/images/communication.jpg',
  },
  {
    id: 'market',
    title: 'Market Research & Business Insights',
    description:
      'Our market research helps businesses understand customers, markets, competition and emerging opportunities.',
    image: '/images/market.jpg',
  },
  {
    id: 'governance',
    title: 'Governance & Project Monitoring (PMC)',
    description:
      'We monitor projects and governance initiatives to provide accurate progress insights and actionable intelligence.',
    image: '/images/governance.jpg',
  },
]

function ArrowIcon() {
  return (
    <span className="service-arrow">
      <span className="arrow-line"></span>
      <span className="arrow-head"></span>
    </span>
  )
}

export default function ServicesSidebar() {
  const [activeService, setActiveService] = useState('survey')

  const activeContent = services.find(
    (service) => service.id === activeService
  )

  return (
    <section className="services-section">

        <div className="services-content">

      {/* RIGHT SIDEBAR */}
      <div className="services-sidebar">

        {services.map((service) => {
          const isActive = activeService === service.id

          return (
            <button
              key={service.id}
              className={`service-item ${
                isActive ? 'active' : ''
              }`}
              onClick={() => setActiveService(service.id)}
            >
              <span className="service-title">
                {service.title}
              </span>

              <ArrowIcon />
            </button>
          )
        })}

      </div>
      </div>

    </section>
  )
}