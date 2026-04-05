import { Hero } from '@/components/landing/hero'
import { Benefits } from '@/components/landing/benefits'
import { Demo } from '@/components/landing/demo'
import { HowItWorks } from '@/components/landing/how-it-works'
import { Pricing } from '@/components/landing/pricing'
import { Cta } from '@/components/landing/cta'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Benefits />
        <Demo />
        <HowItWorks />
        <Pricing />
        <Cta />
      </main>
      <Footer />
    </>
  )
}
