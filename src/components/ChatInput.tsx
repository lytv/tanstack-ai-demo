import { useRef } from 'react'
import { Button } from './ui/button'
import { Send } from 'lucide-react'

interface ChatInputProps {
    value: string
    onChange: (value: string) => void
    onSubmit: () => void
    isLoading: boolean
}

export function ChatInput({
    value,
    onChange,
    onSubmit,
    isLoading,
}: ChatInputProps) {
    const inputRef = useRef<HTMLTextAreaElement>(null)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!value.trim() || isLoading) return
        onSubmit()
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit(e)
        }
    }

    return (
        <div className="sticky bottom-0 bg-gradient-to-t from-background via-background to-transparent pt-6 pb-8">
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto px-4">
                <div className="relative flex items-end gap-3 bg-muted/60 backdrop-blur-xl rounded-3xl p-3 border border-border/50 shadow-lg hover:shadow-xl transition-shadow">
                    <textarea
                        ref={inputRef}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Message ChatApp..."
                        className="flex-1 bg-transparent border-0 resize-none focus:ring-0 focus:outline-none min-h-[48px] max-h-[200px] py-3 px-4 text-sm placeholder:text-muted-foreground/60"
                        rows={1}
                        disabled={isLoading}
                    />
                    <Button
                        type="submit"
                        size="icon"
                        disabled={!value.trim() || isLoading}
                        className="shrink-0 rounded-2xl h-12 w-12 shadow-md hover:shadow-lg transition-all"
                    >
                        <Send className="h-5 w-5" />
                    </Button>
                </div>
            </form>
        </div>
    )
}
