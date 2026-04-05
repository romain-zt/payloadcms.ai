import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'payloadcms.ai — AI assistant for PayloadCMS',
  description: 'Add AI to your PayloadCMS admin in minutes.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
