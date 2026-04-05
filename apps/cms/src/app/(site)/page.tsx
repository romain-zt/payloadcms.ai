import { WaitlistForm } from '@/components/landing/waitlist-form'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <span className="font-semibold tracking-tight">payloadcms.ai</span>
          <nav className="flex items-center gap-6 text-sm text-gray-500">
            <a href="/demo" className="hover:text-gray-900 transition-colors">Demo</a>
            <a href="/admin" className="hover:text-gray-900 transition-colors">Admin</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl leading-tight">
          AI assistant for your<br />PayloadCMS admin
        </h1>
        <p className="mt-6 text-lg text-gray-500 leading-relaxed max-w-xl mx-auto">
          Add a chat widget to your admin panel. Ask questions, create content, and manage your CMS without leaving the keyboard.
        </p>
        <div className="mt-10 flex flex-col gap-4 items-center">
          <div className="w-full max-w-md">
            <WaitlistForm />
          </div>
          <a href="/demo" className="text-sm text-gray-400 hover:text-gray-700 underline underline-offset-4 transition-colors">
            Try the demo first →
          </a>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="text-center text-2xl font-semibold mb-12">How it works</h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { step: '1', title: 'Install the plugin', body: 'One npm install. Adds the chat endpoint and admin widget to your existing Payload project.' },
              { step: '2', title: 'Add your OpenAI key', body: 'Set OPENAI_API_KEY in your environment. Choose any model — gpt-4o by default.' },
              { step: '3', title: 'Talk to your CMS', body: 'Open the admin panel. A chat button appears. Type anything — questions, commands, content requests.' },
            ].map(({ step, title, body }) => (
              <div key={step} className="rounded-xl border border-gray-200 bg-white p-6">
                <div className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
                  {step}
                </div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-2xl font-semibold mb-10 text-center">What you get</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            'Floating chat widget in the PayloadCMS admin panel',
            'Streams real-time responses from OpenAI',
            'Can list, create, and update documents in any collection',
            'Conversation history saved in your own database',
            'Works with any PayloadCMS 3.x project',
            'Zero telemetry — your data stays in your Payload instance',
          ].map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-lg border border-gray-100 p-4">
              <svg className="mt-0.5 shrink-0 text-green-600" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <span className="text-sm text-gray-600">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-xl px-6 py-20 text-center">
          <h2 className="text-2xl font-semibold mb-4">Get early access</h2>
          <p className="text-gray-500 text-sm mb-8">We're opening access gradually. Leave your email and we'll reach out.</p>
          <WaitlistForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100">
        <div className="mx-auto max-w-5xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <span>payloadcms.ai — Only PayloadCMS 3.x</span>
          <div className="flex gap-6">
            <a href="/demo" className="hover:text-gray-700 transition-colors">Demo</a>
            <a href="/admin" className="hover:text-gray-700 transition-colors">Admin</a>
          </div>
        </div>
      </footer>

    </main>
  )
}
