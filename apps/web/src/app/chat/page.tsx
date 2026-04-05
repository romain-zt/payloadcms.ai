import { ChatInterface } from '@/components/chat/chat-interface'
import { Header } from '@/components/layout/header'

export const metadata = {
  title: 'Chat — payloadcms.ai',
  description: 'Talk to your CMS developer.',
}

export default function ChatPage() {
  return (
    <>
      <Header />
      <main className="flex flex-col h-[calc(100vh-64px)] pt-16">
        <ChatInterface />
      </main>
    </>
  )
}
