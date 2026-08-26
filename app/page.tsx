import SiteNavbar from '@/components/site-navbar'

export default function Home() {
  return (
    <main id="home" className="min-h-screen bg-background">
      <SiteNavbar />
      <section className="hero-placeholder" aria-label="IndiaTroll introduction">
        <p className="eyebrow">Rudra Political Intelligence</p>
        <h1>Insight that moves India forward.</h1>
        <p className="hero-copy">The navigation is ready for the stories, strategy, and intelligence that shape tomorrow.</p>
      </section>
    </main>
  )
}
