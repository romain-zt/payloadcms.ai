import { DemoChat } from '@/components/demo/demo-chat'

export const metadata = {
  title: 'Demo — payloadcms.ai',
  description: 'Try the PayloadCMS AI assistant on a live demo CMS.',
}

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <a href="/" className="font-semibold tracking-tight hover:opacity-70 transition-opacity">payloadcms.ai</a>
          <a href="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">← Back</a>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 py-12">

        {/* Title */}
        <div className="mb-8 text-center">
          <span className="inline-block mb-3 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
            Live demo — fictional CMS data
          </span>
          <h1 className="text-3xl font-semibold tracking-tight">Try the assistant</h1>
          <p className="mt-3 text-gray-500 text-sm max-w-md mx-auto">
            This demo uses a fictional "Acme Corp" CMS with sample data. In your own project, the AI talks to your real PayloadCMS collections.
          </p>
        </div>

        {/* Chat */}
        <DemoChat />

        {/* Info */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3 text-sm">
          {[
            { label: 'Read-only mode', desc: 'Demo can only read fixture data — no real writes.' },
            { label: '5 messages per session', desc: 'Sign up for unlimited conversations.' },
            { label: 'Rate limited', desc: '10 requests per hour per IP.' },
          ].map(({ label, desc }) => (
            <div key={label} className="rounded-lg border border-gray-100 p-4">
              <p className="font-medium text-gray-700 mb-1">{label}</p>
              <p className="text-gray-400">{desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-xl border border-gray-200 bg-gray-50 p-6 text-center">
          <p className="font-medium text-gray-800">Want this in your own PayloadCMS admin?</p>
          <p className="mt-1 text-sm text-gray-500">Join the waitlist and get early access.</p>
          <a href="/" className="mt-4 inline-block rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-700 transition-colors">
            Join waitlist →
          </a>
        </div>

      </div>
    </main>
  )
}
