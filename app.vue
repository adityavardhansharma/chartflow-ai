<template>
  <NuxtLayout>
    <div class="h-screen flex flex-col bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950">
      <!-- Professional Header with Glassmorphism -->
      <header class="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg shadow-gray-200/20 dark:shadow-gray-900/20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <!-- Left side - Logo and Mode Toggle -->
            <div class="flex items-center space-x-6">
              <!-- Professional Logo -->
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h1 class="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    Mermaid Chat
                  </h1>
                  <p class="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                    AI-Powered Chart Generation
                  </p>
                </div>
              </div>
              
              <!-- Enhanced Mode Toggle -->
              <div class="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl p-1 shadow-inner">
                <button
                  @click="toggleMode"
                  :class="[
                    'relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900',
                    currentMode === 'normal' 
                      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  ]"
                >
                  <div class="flex items-center space-x-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>Chat</span>
                  </div>
                </button>
                <button
                  @click="toggleMode"
                  :class="[
                    'relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900',
                    currentMode === 'chart' 
                      ? 'bg-gradient-to-r from-primary-500 to-purple-600 text-white shadow-sm' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  ]"
                >
                  <div class="flex items-center space-x-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span>Charts</span>
                  </div>
                </button>
              </div>
            </div>

            <!-- Right side - Actions -->
            <div class="flex items-center space-x-3">
              <!-- Message Counter Badge -->
              <div v-if="messages.length > 0" class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <div class="flex items-center space-x-1">
                  <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>{{ messages.length }} messages</span>
                </div>
              </div>
              
              <!-- Clear Chat Button -->
              <button
                @click="clearChat"
                :disabled="messages.length === 0"
                class="group flex items-center space-x-2 px-3 py-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Clear all messages"
              >
                <svg class="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span class="hidden sm:inline text-sm font-medium">Clear</span>
              </button>
              
              <!-- Theme Toggle -->
              <ColorModeButton />
            </div>
          </div>
        </div>
      </header>

      <!-- Chat Messages Area -->
      <div class="flex-1 overflow-y-auto">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <!-- Enhanced Empty State -->
          <div v-if="messages.length === 0" class="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div class="relative">
              <!-- Animated Background Circles -->
              <div class="absolute inset-0 -m-8">
                <div class="w-32 h-32 bg-gradient-to-br from-primary-200 to-purple-200 dark:from-primary-900 dark:to-purple-900 rounded-full opacity-20 animate-pulse"></div>
              </div>
              <div class="absolute inset-0 -m-4">
                <div class="w-24 h-24 bg-gradient-to-br from-purple-200 to-pink-200 dark:from-purple-900 dark:to-pink-900 rounded-full opacity-30 animate-ping" style="animation-duration: 3s;"></div>
              </div>
              
              <!-- Main Icon -->
              <div class="relative w-20 h-20 bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <svg class="w-10 h-10 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path v-if="currentMode === 'chart'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
            </div>
            
            <div class="mt-8 space-y-4">
              <h2 class="text-3xl font-bold bg-gradient-to-r from-gray-900 via-primary-600 to-purple-600 dark:from-white dark:via-primary-400 dark:to-purple-400 bg-clip-text text-transparent">
                {{ currentMode === 'chart' ? 'Create Stunning Charts' : 'Start Chatting' }}
              </h2>
              <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
                {{ currentMode === 'chart' 
                  ? 'Transform your ideas into beautiful Mermaid diagrams. Describe your data, process, or structure and watch it come to life.' 
                  : 'Welcome to your AI assistant. Ask questions, get help, or switch to Chart Mode for diagram creation.' 
                }}
              </p>
              
              <!-- Feature Pills -->
              <div class="flex flex-wrap justify-center gap-3 mt-6">
                <div v-if="currentMode === 'chart'" class="flex flex-wrap justify-center gap-2">
                  <span class="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">Flowcharts</span>
                  <span class="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">Sequence Diagrams</span>
                  <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">Gantt Charts</span>
                  <span class="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">Mind Maps</span>
                </div>
                <div v-else class="flex flex-wrap justify-center gap-2">
                  <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">Questions & Answers</span>
                  <span class="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">Code Help</span>
                  <span class="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">Problem Solving</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Messages Container -->
          <div v-else class="space-y-6">
            <TransitionGroup
              name="message"
              tag="div"
              class="space-y-6"
            >
              <ChatMessage
                v-for="message in messages"
                :key="message.timestamp.getTime()"
                :message="message"
                @runMermaid="openMermaidModal"
              />
            </TransitionGroup>
          </div>
        </div>
      </div>

      <!-- Professional Input Area -->
      <div class="backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 border-t border-gray-200/50 dark:border-gray-700/50 shadow-2xl shadow-gray-900/10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <!-- Input Container -->
          <div class="relative">
            <!-- Gradient Border Effect -->
            <div class="absolute inset-0 bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 rounded-2xl opacity-20 blur-sm"></div>
            
            <div class="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <!-- Input Header -->
              <div class="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-600">
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span class="text-xs font-medium text-gray-500 dark:text-gray-400">
                    {{ currentMode === 'chart' ? 'Chart Generation Mode' : 'Chat Mode' }}
                  </span>
                </div>
                <div class="flex items-center space-x-2 text-xs text-gray-400 dark:text-gray-500">
                  <kbd class="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-600 rounded text-xs">⏎</kbd>
                  <span>Send</span>
                  <kbd class="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-600 rounded text-xs">⇧⏎</kbd>
                  <span>New line</span>
                </div>
              </div>
              
              <!-- Main Input Area -->
              <div class="flex items-end space-x-4 p-4">
                <div class="flex-1 relative">
                  <!-- Character Count -->
                  <div v-if="inputMessage.length > 0" class="absolute -top-8 right-0 text-xs text-gray-400 dark:text-gray-500">
                    {{ inputMessage.length }} characters
                  </div>
                  
                  <!-- Enhanced Textarea -->
                  <textarea
                    v-model="inputMessage"
                    @keydown.enter.prevent="handleEnterKey"
                    :placeholder="getInputPlaceholder()"
                    class="w-full px-4 py-3 bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 resize-none focus:outline-none transition-all duration-200 min-h-[60px] max-h-[200px]"
                    rows="1"
                    ref="textareaRef"
                    style="field-sizing: content;"
                  />
                  
                  <!-- Loading Indicator inside input -->
                  <div v-if="isLoading" class="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div class="flex items-center space-x-1">
                      <div class="w-2 h-2 bg-primary-500 rounded-full animate-bounce"></div>
                      <div class="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                      <div class="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                    </div>
                  </div>
                </div>
                
                <!-- Enhanced Send Button -->
                <button
                  @click="sendMessage"
                  :disabled="!inputMessage.trim() || isLoading"
                  class="group relative bg-gradient-to-r from-primary-500 to-purple-600 hover:from-primary-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white p-3 rounded-xl font-medium transition-all duration-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
                >
                  <div class="flex items-center space-x-2">
                    <span v-if="isLoading" class="animate-spin">
                      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </span>
                    <span v-else class="group-hover:scale-110 transition-transform">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </span>
                    <span class="hidden sm:inline font-semibold">
                      {{ isLoading ? 'Sending...' : 'Send' }}
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mermaid Modal -->
      <MermaidModal
        :isOpen="showMermaidModal"
        :mermaidCode="selectedMermaidCode"
        @close="closeMermaidModal"
      />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from 'vue'

// Define the ChatMessage interface locally to avoid import issues
interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
}

const { sendMessage: sendOpenRouterMessage } = useOpenRouter()

// State
const messages = ref<ChatMessage[]>([])
const inputMessage = ref('')
const currentMode = ref<'normal' | 'chart'>('chart') // Default to chart mode for better UX
const isLoading = ref(false)
const showMermaidModal = ref(false)
const selectedMermaidCode = ref('')
const textareaRef = ref<HTMLTextAreaElement | null>(null)

// Computed properties
const getInputPlaceholder = () => {
  if (currentMode.value === 'chart') {
    const placeholders = [
      "Describe your workflow and I'll create a flowchart...",
      "Explain your system architecture for a diagram...", 
      "Tell me about your project timeline for a Gantt chart...",
      "Describe your data flow for a sequence diagram..."
    ]
    return placeholders[Math.floor(Math.random() * placeholders.length)]
  } else {
    return "Ask me anything, or describe what you'd like help with..."
  }
}

// Auto-resize textarea
watch(inputMessage, async () => {
  await nextTick()
  if (textareaRef.value) {
    textareaRef.value.style.height = 'auto'
    textareaRef.value.style.height = Math.min(textareaRef.value.scrollHeight, 200) + 'px'
  }
})

// Toggle between normal and chart modes
const toggleMode = () => {
  currentMode.value = currentMode.value === 'normal' ? 'chart' : 'normal'
}

// Clear chat messages with confirmation for better UX
const clearChat = () => {
  if (messages.value.length > 0) {
    if (confirm('Are you sure you want to clear all messages? This cannot be undone.')) {
      messages.value = []
    }
  }
}

// Send message
const sendMessage = async () => {
  if (!inputMessage.value.trim() || isLoading.value) return

  const userMessage = {
    role: 'user',
    content: inputMessage.value.trim(),
    timestamp: new Date()
  }

  messages.value.push(userMessage)
  const messageToSend = inputMessage.value.trim()
  inputMessage.value = ''

  // Reset textarea height
  if (textareaRef.value) {
    textareaRef.value.style.height = 'auto'
  }

  isLoading.value = true

  try {
    // Send to OpenRouter API
    const response = await sendOpenRouterMessage(messages.value, currentMode.value)
    
    const assistantMessage = {
      role: 'assistant',
      content: response,
      timestamp: new Date()
    }
    
    messages.value.push(assistantMessage)
  } catch (error) {
    console.error('Error sending message:', error)
    const errorMessage = {
      role: 'assistant',
      content: 'I apologize, but I encountered an error processing your request. Please check your connection and try again.',
      timestamp: new Date()
    }
    messages.value.push(errorMessage)
  } finally {
    isLoading.value = false
  }
}

// Handle Enter key in textarea
const handleEnterKey = (event) => {
  if (event.shiftKey) {
    // Shift+Enter = new line
    return
  }
  // Enter = send message
  sendMessage()
}

// Open Mermaid modal
const openMermaidModal = (code, index) => {
  console.log('App: openMermaidModal called with:', { code: code.substring(0, 50), index })
  selectedMermaidCode.value = code
  showMermaidModal.value = true
  console.log('App: Modal state updated to:', showMermaidModal.value)
}

// Close Mermaid modal
const closeMermaidModal = () => {
  showMermaidModal.value = false
  selectedMermaidCode.value = ''
}

// Set up page title
useHead({
  title: 'Mermaid Chat - Professional AI Chart Generation',
  meta: [
    { name: 'description', content: 'Create stunning Mermaid diagrams with AI assistance. Professional chart generation made simple.' }
  ]
})
</script>

<style>
/* Enhanced scrollbar styling */
* {
  scrollbar-width: thin;
  scrollbar-color: rgb(156 163 175) transparent;
}

*::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

*::-webkit-scrollbar-track {
  background: transparent;
}

*::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, rgb(156 163 175), rgb(107 114 128));
  border-radius: 3px;
}

*::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, rgb(107 114 128), rgb(75 85 99));
}

/* Enhanced message animations */
.message-enter-active {
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.message-leave-active {
  transition: all 0.4s cubic-bezier(0.55, 0.06, 0.68, 0.19);
}

.message-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}

.message-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
}

.message-move {
  transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Glass morphism effects */
.backdrop-blur-xl {
  backdrop-filter: blur(24px);
}

/* Enhanced focus states */
textarea:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Custom gradient animations */
@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient-shift 3s ease infinite;
}
</style>
