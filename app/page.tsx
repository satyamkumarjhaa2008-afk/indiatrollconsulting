import HeroCarousel from '@/components/hero-carousel'
import SiteFooter from '@/components/site-footer'
import SiteNavbar from '@/components/site-navbar'
import SideNavbar from '@/components/side-navbar'
import ServicesCarousel from '@/components/services-carousel'
export default function Home() {
  return (
    <main id="home" className="min-h-screen bg-background">
      <SiteNavbar />
      <HeroCarousel />
< SideNavbar />
      <ServicesCarousel />
      <SiteFooter />
    </main>
  )
}
