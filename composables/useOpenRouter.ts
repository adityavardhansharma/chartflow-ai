export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
}

export interface ChatMode {
  type: 'normal' | 'chart'
  systemPrompt: string
}

export const useOpenRouter = () => {
  const chatModes: Record<string, ChatMode> = {
    normal: {
      type: 'normal',
      systemPrompt: 'General conversation mode'
    },
    chart: {
      type: 'chart',
      systemPrompt: 'Mermaid chart generation mode'
    }
  }

  const sendMessage = async (messages: ChatMessage[], mode: 'normal' | 'chart' = 'normal') => {
    try {
      const response = await $fetch<{ content: string }>('/api/chat', {
        method: 'POST',
        body: {
          messages: messages.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          mode
        }
      })

      return response.content
    } catch (error: any) {
      console.error('API error:', error)
      if (error.statusCode === 500 && error.statusMessage?.includes('API key not configured')) {
        throw new Error('OpenRouter API key not configured. Please add OPENROUTER_API_KEY to your .env.local file')
      }
      throw new Error('Failed to get response from AI service')
    }
  }

  return {
    sendMessage,
    chatModes
  }
} 