export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center px-6">
        <h1 className="text-3xl font-semibold text-gray-900 mb-3">payloadcms.ai</h1>
        <p className="text-gray-500 text-lg">AI assistant for PayloadCMS — coming soon</p>
        <a
          href="/admin"
          className="mt-8 inline-block px-5 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
        >
          Admin panel
        </a>
      </div>
    </main>
  )
}
