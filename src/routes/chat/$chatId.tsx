import { createFileRoute } from '@tanstack/react-router'
import { Chat } from '../../components/Chat'
import { getChatWithMessages } from '@/lib/chat-actions'

export const Route = createFileRoute('/chat/$chatId')({
    loader: async ({ params }) => {
        const result = await getChatWithMessages({
            data: { chatId: params.chatId } as any,
        })
        return {
            chatId: params.chatId,
            messages: result.messages || [],
            chat: result.chat,
        }
    },
    component: ChatPage,
})

function ChatPage() {
    const { chatId, messages } = Route.useLoaderData()

    return <Chat key={chatId} chatId={chatId} initialMessages={messages} />
}
