import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Hero } from '@/components/landing/hero'
import { Features } from '@/components/landing/features'
import { SocialProof } from '@/components/landing/social-proof'
import { Waitlist } from '@/components/landing/waitlist'

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <SocialProof />
        <Waitlist />
      </main>
      <Footer />
    </>
  )
}
