'use client'

import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  { src: '/assets/hero/s1.jpeg', alt: 'IndiaTroll strategic intelligence' },
  { src: '/assets/hero/s2.jpeg', alt: 'IndiaTroll political strategy' },
  { src: '/assets/hero/s3.jpeg', alt: 'IndiaTroll ground intelligence' },
  { src: '/assets/hero/s4.jpeg', alt: 'IndiaTroll communication and insights' },
  { src: '/assets/hero/s5.jpeg', alt: 'IndiaTroll research and governance' },
]

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)

  const showSlide = useCallback((index: number) => {
    setActiveIndex((index + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length)
    }, 7000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <section className="hero-carousel" aria-label="IndiaTroll highlights">
      <div className="hero-slide-frame">
        {slides.map((slide, index) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            className={`hero-slide ${index === activeIndex ? 'is-active' : ''}`}
            aria-hidden={index !== activeIndex}
          />
        ))}
        <button type="button" className="carousel-arrow carousel-arrow-left" onClick={() => showSlide(activeIndex - 1)} aria-label="Previous slide">
          <ChevronLeft aria-hidden="true" />
        </button>
        <button type="button" className="carousel-arrow carousel-arrow-right" onClick={() => showSlide(activeIndex + 1)} aria-label="Next slide">
          <ChevronRight aria-hidden="true" />
        </button>
        <div className="carousel-indicators" aria-label="Choose a slide">
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              className={`carousel-indicator ${index === activeIndex ? 'is-active' : ''}`}
              onClick={() => showSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === activeIndex ? 'true' : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroCarousel
