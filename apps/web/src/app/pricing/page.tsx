import { Pricing } from '@/components/landing/pricing'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        <Pricing />
      </main>
      <Footer />
    </>
  )
}
