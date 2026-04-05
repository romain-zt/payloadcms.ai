import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'payloadcms.ai — Your CMS developer, available 24/7',
  description: 'A developer for your PayloadCMS that never sleeps. Create pages, update content, upload media. No tickets. No waiting.',
  openGraph: {
    title: 'payloadcms.ai — Your CMS developer, available 24/7',
    description: 'A developer for your PayloadCMS that never sleeps. Create pages, update content, upload media. No tickets. No waiting.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-zinc-950 text-zinc-100 antialiased min-h-screen">
        {children}
      </body>
    </html>
  )
}
