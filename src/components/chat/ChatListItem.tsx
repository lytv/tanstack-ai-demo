import { Link } from '@tanstack/react-router'
import { MessageSquare, Pin, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChatItem {
    id: string
    title: string
    isPinned: boolean
    createdAt: Date
}

interface ChatListItemProps {
    chat: ChatItem
    isActive: boolean
    onDelete: () => void
    onTogglePin: () => void
}

export function ChatListItem({ chat, isActive, onDelete, onTogglePin }: ChatListItemProps) {
    return (
        <div
            className="relative group"
        >
            <Link
                to="/chat/$chatId"
                params={{ chatId: chat.id }}
                className={cn(
                    'flex items-center gap-2 px-3 py-2.5 pr-16 rounded-lg text-sm transition-colors relative',
                    isActive
                        ? 'bg-accent text-accent-foreground'
                        : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground group-hover:bg-accent/50 group-hover:text-foreground'
                )}
            >
                <MessageSquare className="h-4 w-4 shrink-0" />
                <span className="truncate flex-1">{chat.title}</span>
            </Link>

            {/* Action buttons - visible on group hover */}
            <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                {/* Pin button */}
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        onTogglePin()
                    }}
                    className={cn(
                        'p-1.5 rounded-md transition-colors pointer-events-auto',
                        chat.isPinned
                            ? 'text-primary hover:text-primary/70'
                            : 'text-muted-foreground hover:text-foreground'
                    )}
                    aria-label={chat.isPinned ? 'Unpin chat' : 'Pin chat'}
                    title={chat.isPinned ? 'Unpin' : 'Pin'}
                >
                    <Pin className={cn('h-3.5 w-3.5', chat.isPinned && 'fill-current')} />
                </button>

                {/* Delete button */}
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        if (confirm(`Delete "${chat.title}"?`)) {
                            onDelete()
                        }
                    }}
                    className="p-1.5 rounded-md text-muted-foreground hover:text-destructive transition-colors pointer-events-auto"
                    aria-label="Delete chat"
                    title="Delete"
                >
                    <Trash2 className="h-3.5 w-3.5" />
                </button>
            </div>
        </div>
    )
}
