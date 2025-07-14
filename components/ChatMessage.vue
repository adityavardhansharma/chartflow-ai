<template>
  <div class="flex" :class="message.role === 'user' ? 'justify-end' : 'justify-start'">
    <div class="max-w-[80%] mb-6">
      <!-- User message bubble -->
      <div 
        v-if="message.role === 'user'"
        class="flex items-start space-x-2 sm:space-x-3 justify-end"
      >
        <div class="bg-primary-500 text-white px-4 sm:px-5 py-2 sm:py-3 rounded-2xl rounded-br-md shadow-sm max-w-xs sm:max-w-none">
          <p class="whitespace-pre-wrap text-sm sm:text-base">{{ message.content }}</p>
        </div>
        <div class="flex-shrink-0">
          <div class="w-6 h-6 sm:w-8 sm:h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
            <svg class="w-3 h-3 sm:w-4 sm:h-4 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
      
      <!-- Assistant message -->
      <div 
        v-else-if="message.role === 'assistant'"
        class="flex items-start space-x-2 sm:space-x-3"
      >
        <div class="flex-shrink-0">
          <div class="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-purple-500 to-primary-500 rounded-full flex items-center justify-center">
            <svg class="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl rounded-bl-md p-3 sm:p-5 shadow-sm hover:shadow-md transition-shadow relative group flex-1 min-w-0">
          <!-- Copy button for entire message -->
          <button
            @click="copyToClipboard(message.content)"
            class="absolute top-2 right-2 sm:top-3 sm:right-3 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded"
            title="Copy message"
          >
            <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
          
          <div class="prose prose-sm dark:prose-invert max-w-none pr-6 sm:pr-8">
            <div v-html="renderedContent"></div>
          </div>
          
          <!-- Mermaid code blocks with run buttons -->
          <div v-if="mermaidCodes.length > 0" class="mt-4 sm:mt-5 space-y-3 sm:space-y-4">
            <div 
              v-for="(code, index) in mermaidCodes" 
              :key="index"
              class="relative group/code"
            >
              <div class="bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <!-- Preview thumbnail -->
                <div class="bg-white dark:bg-gray-800 p-2 sm:p-3 border-b border-gray-200 dark:border-gray-700">
                  <div class="flex items-start space-x-2 sm:space-x-3">
                    <div class="flex-shrink-0">
                      <div 
                        :id="`preview-${message.timestamp.getTime()}-${index}`"
                        class="w-16 h-10 sm:w-24 sm:h-16 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors overflow-hidden"
                        @click.stop="runMermaidCode(code, index)"
                        title="Click to view full chart"
                      >
                        <svg v-if="!previews[`${message.timestamp.getTime()}-${index}`]" class="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                        <div class="flex flex-wrap items-center gap-1 sm:gap-2">
                          <span class="text-xs font-semibold text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded-full">
                            MERMAID
                          </span>
                          <span class="text-xs text-gray-500 dark:text-gray-400">
                            Chart {{ index + 1 }}
                          </span>
                          <span v-if="chartTypes[index]" class="text-xs text-gray-400 dark:text-gray-500 capitalize">
                            {{ chartTypes[index] }}
                          </span>
                        </div>
                        <div class="flex items-center space-x-1">
                          <button
                            @click="copyToClipboard(code)"
                            class="opacity-60 sm:opacity-0 group-hover/code:opacity-100 transition-opacity text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded"
                            title="Copy code"
                          >
                            <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </button>
                          <button
                            @click.stop="runMermaidCode(code, index)"
                            class="bg-primary-500 hover:bg-primary-600 text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg text-xs font-medium transition-colors shadow-sm hover:shadow-md"
                          >
                            <svg class="w-3 h-3 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <span class="hidden sm:inline">View</span>
                          </button>
                        </div>
                      </div>
                      <p class="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                        {{ getCodePreview(code) }}
                      </p>
                    </div>
                  </div>
                </div>
                
                <!-- Code block -->
                <div class="p-3 sm:p-4">
                  <pre class="whitespace-pre-wrap text-xs sm:text-sm text-gray-800 dark:text-gray-200 font-mono leading-relaxed overflow-x-auto"><code>{{ code }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick } from 'vue'
import { marked } from 'marked'
import Prism from 'prismjs'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-markdown'

// Define the ChatMessage interface locally to avoid import issues
interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
}

const props = defineProps<{
  message: ChatMessage
}>()

const emit = defineEmits<{
  runMermaid: [code: string, index: number]
}>()

const { extractMermaidCode } = useMermaid()

// State for preview thumbnails
const previews = ref({})
const chartTypes = ref({})

// Extract Mermaid code blocks
const mermaidCodes = computed(() => {
  if (props.message.role === 'assistant') {
    const codes = extractMermaidCode(props.message.content)
    
    // Analyze chart types for each code block
    codes.forEach((code, index) => {
      let type = 'diagram'
      if (code.includes('graph') || code.includes('flowchart')) type = 'flowchart'
      else if (code.includes('sequenceDiagram')) type = 'sequence'
      else if (code.includes('gantt')) type = 'gantt'
      else if (code.includes('pie')) type = 'pie chart'
      else if (code.includes('gitgraph')) type = 'git graph'
      else if (code.includes('erDiagram')) type = 'ER diagram'
      else if (code.includes('mindmap')) type = 'mindmap'
      else if (code.includes('timeline')) type = 'timeline'
      
      chartTypes.value[index] = type
      
      // Generate small preview thumbnails
      generatePreview(code, index)
    })
    
    return codes
  }
  return []
})

// Generate a mini preview of the Mermaid chart
const generatePreview = async (code: string, index: number) => {
  try {
    const previewId = `preview-${props.message.timestamp.getTime()}-${index}`
    await nextTick()
    
    // Wait a bit for the element to be in the DOM
    setTimeout(async () => {
      const element = document.getElementById(previewId)
      if (element && !previews.value[`${props.message.timestamp.getTime()}-${index}`]) {
        try {
          // Create a temporary container for rendering
          const tempContainer = document.createElement('div')
          tempContainer.id = `temp-${previewId}`
          tempContainer.style.position = 'absolute'
          tempContainer.style.left = '-9999px'
          tempContainer.style.width = '200px'
          tempContainer.style.height = '120px'
          document.body.appendChild(tempContainer)
          
          const { renderMermaid } = useMermaid()
          const result = await renderMermaid(code, tempContainer.id)
          
          if (result.success) {
            const svgElement = tempContainer.querySelector('svg')
            if (svgElement) {
              // Scale down the SVG for thumbnail and disable pointer events
              svgElement.style.width = '96px'
              svgElement.style.height = '64px'
              svgElement.style.fontSize = '8px'
              svgElement.style.pointerEvents = 'none' // Prevent SVG from capturing clicks
              
              element.innerHTML = svgElement.outerHTML
              previews.value[`${props.message.timestamp.getTime()}-${index}`] = true
            }
          }
          
          // Clean up
          if (document.body.contains(tempContainer)) {
            document.body.removeChild(tempContainer)
          }
        } catch (error) {
          console.error('Failed to generate preview:', error)
        }
      }
    }, 100)
  } catch (error) {
    console.error('Preview generation error:', error)
  }
}

// Render markdown content (excluding Mermaid blocks)
const renderedContent = computed(() => {
  if (props.message.role === 'assistant') {
    let content = props.message.content
    
    // Remove Mermaid code blocks from the content before rendering
    content = content.replace(/```mermaid\s*([\s\S]*?)```/g, '')
    
    // Configure marked for better rendering
    marked.setOptions({
      breaks: true,
      gfm: true,
      highlight: function(code, lang) {
        if (lang && Prism.languages[lang]) {
          return Prism.highlight(code, Prism.languages[lang], lang)
        }
        return code
      }
    })
    
    return marked(content)
  }
  return props.message.content
})

const runMermaidCode = (code: string, index: number) => {
  console.log('ChatMessage: runMermaidCode called with:', { code: code.substring(0, 50), index })
  emit('runMermaid', code, index)
}

// Copy to clipboard functionality
const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    // You could add a toast notification here
    console.log('Copied to clipboard')
  } catch (err) {
    console.error('Failed to copy: ', err)
  }
}

// Get a short preview of the code
const getCodePreview = (code: string): string => {
  const lines = code.split('\n').filter(line => line.trim())
  const firstSignificantLine = lines.find(line => 
    !line.trim().startsWith('graph') && 
    !line.trim().startsWith('flowchart') &&
    !line.trim().startsWith('sequenceDiagram') &&
    line.trim().length > 0
  ) || lines[0] || ''
  
  return firstSignificantLine.length > 50 
    ? firstSignificantLine.substring(0, 47) + '...' 
    : firstSignificantLine
}
</script>

<style scoped>
.prose {
  color: inherit;
}

.prose pre {
  @apply bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4;
}

.prose code {
  @apply bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono;
}

.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
  @apply text-gray-900 dark:text-gray-100 font-semibold;
}

.prose p {
  @apply text-gray-800 dark:text-gray-200 leading-relaxed;
}

.prose ul, .prose ol {
  @apply text-gray-800 dark:text-gray-200;
}

.prose li {
  @apply mb-1;
}

.prose blockquote {
  @apply border-l-4 border-primary-500 bg-primary-50 dark:bg-primary-900/20 pl-4 py-2 my-4 rounded-r-lg;
}

.prose a {
  @apply text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-200 transition-colors;
}

.prose strong {
  @apply text-gray-900 dark:text-gray-100 font-semibold;
}

.prose em {
  @apply text-gray-700 dark:text-gray-300;
}
</style> 