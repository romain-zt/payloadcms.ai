import { ChatInterface } from '@/components/chat/chat-interface'
import { Header } from '@/components/layout/header'

export default function AppPage() {
  return (
    <>
      <Header />
      <main className="flex flex-col h-[calc(100vh-64px)] pt-16">
        <ChatInterface />
      </main>
    </>
  )
}
