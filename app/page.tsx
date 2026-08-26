import HeroCarousel from '@/components/hero-carousel'
import SiteNavbar from '@/components/site-navbar'

export default function Home() {
  return (
    <main id="home" className="min-h-screen bg-background">
      <SiteNavbar />
      <HeroCarousel />
    </main>
  )
}
