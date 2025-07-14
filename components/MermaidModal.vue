<template>
  <Teleport to="body" :disabled="!isMounted">
    <Transition
      name="modal"
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen && isMounted"
        :class="[
          'fixed inset-0 z-[9999] flex items-center justify-center',
          isFullscreen ? 'p-0' : 'p-4'
        ]"
        @click="closeModal"
      >
        <!-- Enhanced Backdrop -->
        <div class="absolute inset-0 bg-gradient-to-br from-black/60 via-gray-900/70 to-black/80 backdrop-blur-md"></div>
        
        <Transition
          name="modal-content"
          enter-active-class="transition duration-400 ease-out"
          enter-from-class="opacity-0 scale-90 translate-y-8"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition duration-300 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-90 translate-y-8"
        >
          <div
            :class="[
              'relative bg-white dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-900 dark:to-gray-950 shadow-2xl overflow-hidden transition-all duration-500',
              isFullscreen 
                ? 'w-screen h-screen rounded-none' 
                : 'max-w-7xl max-h-[95vh] w-full mx-4 rounded-3xl border border-gray-200/50 dark:border-gray-700/50'
            ]"
            @click.stop
          >
            <!-- Professional Header -->
            <div class="relative bg-gradient-to-r from-gray-50 via-white to-gray-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 border-b border-gray-200/60 dark:border-gray-700/60 backdrop-blur-sm">
              <!-- Header Gradient Overlay -->
              <div class="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-purple-500/5 to-pink-500/5 dark:from-primary-400/10 dark:via-purple-400/10 dark:to-pink-400/10"></div>
              
              <div class="relative flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 space-y-4 sm:space-y-0">
                <!-- Left side - Title and Info -->
                <div class="flex items-center space-x-4">
                  <!-- Professional Icon -->
                  <div class="w-12 h-12 bg-gradient-to-br from-primary-500 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg ring-4 ring-white/20 dark:ring-gray-800/20">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  
                  <div class="flex flex-col">
                    <h3 class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-gray-300 bg-clip-text text-transparent">
                      Chart Viewer
                    </h3>
                    <div class="flex items-center space-x-3 mt-1">
                      <span v-if="chartComplexity" class="inline-flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <div class="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"></div>
                        <span class="font-medium">{{ chartComplexity.type }}</span>
                        <span class="text-gray-400 dark:text-gray-500">•</span>
                        <span>{{ chartComplexity.elements }} elements</span>
                      </span>
                      <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                        {{ Math.round(currentZoom * 100) }}%
                      </span>
                    </div>
                  </div>
                </div>
                
                <!-- Right side - Controls -->
                <div class="flex items-center space-x-2">
                  <!-- Zoom Controls Group -->
                  <div class="flex items-center bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
                    <button
                      @click="zoomOut"
                      class="group p-2.5 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-r border-gray-200/50 dark:border-gray-700/50"
                      title="Zoom Out"
                    >
                      <svg class="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                      </svg>
                    </button>
                    <button
                      @click="resetZoom"
                      class="group px-3 py-2.5 text-xs font-mono font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-r border-gray-200/50 dark:border-gray-700/50"
                      title="Reset Zoom"
                    >
                      1:1
                    </button>
                    <button
                      @click="zoomIn"
                      class="group p-2.5 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      title="Zoom In"
                    >
                      <svg class="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </button>
                  </div>
                  
                  <!-- Fullscreen Toggle -->
                  <button
                    @click="toggleFullscreen"
                    class="group p-2.5 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-xl shadow-md border border-gray-200/50 dark:border-gray-700/50 transition-all duration-200 hover:scale-105"
                    :title="isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'"
                  >
                    <svg v-if="!isFullscreen" class="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                    <svg v-else class="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 9V4.5M9 9H4.5M9 9L3.5 3.5M15 9h4.5M15 9V4.5M15 9l5.5-5.5M9 15v4.5M9 15H4.5M9 15l-5.5 5.5M15 15h4.5M15 15v4.5m0 0l5.5 5.5" />
                    </svg>
                  </button>
                  
                  <!-- Action Buttons Group -->
                  <div class="hidden sm:flex items-center space-x-2">
                    <button
                      @click="downloadChart('png')"
                      class="group flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-primary-500 to-purple-600 hover:from-primary-600 hover:to-purple-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                      title="Download as PNG"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span class="hidden lg:inline">PNG</span>
                    </button>
                    
                    <button
                      @click="downloadChart('svg')"
                      class="group flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                      title="Download as SVG"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span class="hidden lg:inline">SVG</span>
                    </button>
                    
                    <button
                      @click="copyToClipboard"
                      class="group flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                      title="Copy to Clipboard"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span class="hidden lg:inline">Copy</span>
                    </button>
                  </div>
                  
                  <!-- Mobile Actions Menu -->
                  <div class="sm:hidden">
                    <button
                      @click="showMobileMenu = !showMobileMenu"
                      class="p-2.5 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-xl shadow-md border border-gray-200/50 dark:border-gray-700/50 transition-colors"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                    
                    <!-- Mobile Dropdown -->
                    <div v-if="showMobileMenu" class="absolute top-full right-4 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden z-10">
                      <button @click="downloadChart('png'); showMobileMenu = false" class="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <svg class="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        <span class="text-gray-700 dark:text-gray-300">Download PNG</span>
                      </button>
                      <button @click="downloadChart('svg'); showMobileMenu = false" class="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        <span class="text-gray-700 dark:text-gray-300">Download SVG</span>
                      </button>
                      <button @click="copyToClipboard(); showMobileMenu = false" class="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span class="text-gray-700 dark:text-gray-300">Copy to Clipboard</span>
                      </button>
                    </div>
                  </div>
                  
                  <!-- Close Button -->
                  <button
                    @click="closeModal"
                    class="group p-2.5 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 rounded-xl shadow-md border border-red-200/50 dark:border-red-800/50 transition-all duration-200 hover:scale-105"
                    title="Close"
                  >
                    <svg class="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Chart Content Area -->
            <div :class="[
              'relative bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden',
              isFullscreen ? 'h-[calc(100vh-6rem)]' : 'max-h-[calc(95vh-8rem)] min-h-[60vh]'
            ]">
              <!-- Background Pattern -->
              <div class="absolute inset-0 opacity-30">
                <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" stroke-width="0.5" class="text-gray-200 dark:text-gray-700"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>
              
              <!-- Zoom Container -->
              <div class="relative h-full flex items-center justify-center p-4 sm:p-8 overflow-auto">
                <VueZoomable 
                  ref="zoomableRef"
                  selector=".mermaid-svg" 
                  :minZoom="0.1" 
                  :maxZoom="10" 
                  :style="zoomableStyle"
                  @zoom="onZoomChange"
                  :touchEnabled="true"
                  :mouseEnabled="true"
                  class="w-full h-full flex items-center justify-center"
                >
                  <div
                    :id="renderElementId"
                    class="mermaid-container transition-all duration-300"
                    v-html="renderedSvg"
                  ></div>
                </VueZoomable>
              </div>
              
              <!-- Loading State -->
              <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <div class="flex flex-col items-center space-y-4">
                  <div class="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
                  <p class="text-gray-600 dark:text-gray-400 font-medium">Rendering chart...</p>
                </div>
              </div>
              
              <!-- Complexity Badge for large charts -->
              <div v-if="chartComplexity?.complexity === 'high'" class="absolute top-4 left-4 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 px-3 py-1.5 rounded-full text-sm font-medium border border-amber-200 dark:border-amber-800/50">
                <div class="flex items-center space-x-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Complex Chart</span>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, computed } from 'vue'
import VueZoomable from "vue-zoomable";
import "vue-zoomable/dist/style.css";

const props = defineProps<{
  isOpen: boolean
  mermaidCode: string
}>()

const emit = defineEmits<{
  close: []
}>()

const { renderMermaid, downloadChart: downloadMermaidChart } = useMermaid()

const renderElementId = ref(`mermaid-modal-${Date.now()}`)
const renderedSvg = ref('')
const isFullscreen = ref(false)
const isLoading = ref(false)
const currentZoom = ref(1)
const zoomableRef = ref(null)
const chartComplexity = ref(null)
const showMobileMenu = ref(false)
const isMounted = ref(false)

// Calculate chart complexity for better sizing and UX
const calculateComplexity = (code: string) => {
  const lines = code.split('\n').filter(line => line.trim()).length
  const nodeMatches = code.match(/\w+(?:\s*\[.*?\]|\s*\(.*?\)|\s*\{.*?\}|\s*>.*?<)/g) || []
  const edgeMatches = code.match(/--[>\-]|==>|\.\.>|\-\-\->/g) || []
  
  let type = 'diagram'
  if (code.includes('graph') || code.includes('flowchart')) type = 'flowchart'
  else if (code.includes('sequenceDiagram')) type = 'sequence'
  else if (code.includes('gantt')) type = 'gantt'
  else if (code.includes('pie')) type = 'pie chart'
  else if (code.includes('gitgraph')) type = 'git graph'
  else if (code.includes('mindmap')) type = 'mind map'
  else if (code.includes('timeline')) type = 'timeline'
  
  const elementCount = nodeMatches.length + edgeMatches.length
  let complexity = 'low'
  if (elementCount > 30 || lines > 25) complexity = 'high'
  else if (elementCount > 15 || lines > 15) complexity = 'medium'
  
  return {
    type,
    elements: elementCount,
    complexity,
    lines
  }
}

// Dynamic styling based on chart complexity and fullscreen state
const zoomableStyle = computed(() => {
  if (isFullscreen.value) {
    return 'width: 100%; height: 100%; max-width: 100vw; max-height: 100vh;'
  }
  
  const complexity = chartComplexity.value
  if (!complexity) return 'width: 100%; height: 100%; min-height: 400px;'
  
  // Adjust size based on complexity
  if (complexity.complexity === 'high') {
    return 'width: 100%; height: 100%; min-height: 600px;'
  } else if (complexity.complexity === 'medium') {
    return 'width: 100%; height: 100%; min-height: 500px;'
  }
  
  return 'width: 100%; height: 100%; min-height: 400px;'
})

// Watch for modal opening and render mermaid code
watch(() => props.isOpen, async (newVal, oldVal) => {
  // Only process if modal is newly opened (prevent infinite loops)
  if (newVal && !oldVal && props.mermaidCode) {
    isLoading.value = true
    showMobileMenu.value = false
    
    // Calculate complexity first
    chartComplexity.value = calculateComplexity(props.mermaidCode)
    
    await nextTick()
    try {
      const result = await renderMermaid(props.mermaidCode, renderElementId.value)
      if (result.success) {
        const element = document.getElementById(renderElementId.value)
        if (element) {
          renderedSvg.value = element.innerHTML
          
          // Update complexity with actual render results
          if (result.complexity) {
            chartComplexity.value = { ...chartComplexity.value, ...result.complexity }
          }
          
          // Auto-suggest fullscreen for complex charts
          if (chartComplexity.value.complexity === 'high' && chartComplexity.value.elements > 25) {
            // Show a subtle suggestion (could be a toast notification)
            console.log('💡 Tip: Use fullscreen mode for better viewing of this complex chart')
          }
        }
      } else {
        // Enhanced error display
        renderErrorState(result.error || 'Unknown rendering error')
      }
    } catch (error) {
      console.error('Error rendering mermaid:', error)
      renderErrorState('An unexpected error occurred while rendering the chart.')
    } finally {
      isLoading.value = false
    }
  }
})

const renderErrorState = (errorMessage: string) => {
  const element = document.getElementById(renderElementId.value)
  if (element) {
    element.innerHTML = `
      <div class="flex flex-col items-center justify-center p-12 text-center max-w-md mx-auto">
        <div class="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">Chart Rendering Failed</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">${errorMessage}</p>
        <div class="flex flex-col sm:flex-row gap-3">
          <button onclick="window.location.reload()" class="px-6 py-3 bg-gradient-to-r from-primary-500 to-purple-600 text-white rounded-xl hover:from-primary-600 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105">
            Try Again
          </button>
          <button onclick="navigator.clipboard.writeText('${props.mermaidCode}')" class="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium">
            Copy Code
          </button>
        </div>
      </div>
    `
  }
}

const closeModal = () => {
  isFullscreen.value = false
  showMobileMenu.value = false
  emit('close')
}

const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value
  showMobileMenu.value = false
}

const downloadChart = async (format: 'png' | 'svg') => {
  showMobileMenu.value = false
  const element = document.getElementById(renderElementId.value)
  if (element) {
    const svgElement = element.querySelector('svg')
    if (svgElement) {
      const timestamp = new Date().toISOString().slice(0, 19).replace(/[:-]/g, '')
      const chartType = chartComplexity.value?.type.replace(/\s+/g, '-') || 'chart'
      const filename = `mermaid-${chartType}-${timestamp}`
      
      try {
        await downloadMermaidChart(svgElement, filename, format)
        // Could show a success toast here
        console.log(`✅ Chart downloaded as ${filename}.${format}`)
      } catch (error) {
        console.error('Download failed:', error)
        // Could show an error toast here
      }
    }
  }
}

const copyToClipboard = async () => {
  showMobileMenu.value = false
  const element = document.getElementById(renderElementId.value)
  if (element) {
    const svgElement = element.querySelector('svg')
    if (svgElement) {
      try {
        const svgData = new XMLSerializer().serializeToString(svgElement)
        await navigator.clipboard.writeText(svgData)
        console.log('✅ SVG copied to clipboard')
        // Could show a success toast here
      } catch (err) {
        console.error('Failed to copy SVG:', err)
        // Fallback: copy the mermaid code instead
        try {
          await navigator.clipboard.writeText(props.mermaidCode)
          console.log('✅ Mermaid code copied to clipboard')
        } catch (fallbackErr) {
          console.error('Failed to copy to clipboard:', fallbackErr)
        }
      }
    }
  }
}

// Enhanced zoom controls
const zoomIn = () => {
  if (zoomableRef.value && zoomableRef.value.zoomIn) {
    zoomableRef.value.zoomIn()
  }
}

const zoomOut = () => {
  if (zoomableRef.value && zoomableRef.value.zoomOut) {
    zoomableRef.value.zoomOut()
  }
}

const resetZoom = () => {
  if (zoomableRef.value && zoomableRef.value.reset) {
    zoomableRef.value.reset()
  }
}

const onZoomChange = (zoomData) => {
  currentZoom.value = zoomData.zoom || 1
}

// Close mobile menu when clicking outside
const handleClickOutside = (event) => {
  if (showMobileMenu.value && !event.target.closest('.mobile-menu-container')) {
    showMobileMenu.value = false
  }
}

// Keyboard shortcuts
const handleKeydown = (event) => {
  if (props.isOpen) {
    switch (event.key) {
      case 'Escape':
        closeModal()
        break
      case 'f':
      case 'F':
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault()
          toggleFullscreen()
        }
        break
      case '+':
      case '=':
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault()
          zoomIn()
        }
        break
      case '-':
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault()
          zoomOut()
        }
        break
      case '0':
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault()
          resetZoom()
        }
        break
    }
  }
}

// Setup event listeners
onMounted(() => {
  isMounted.value = true
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  isMounted.value = false
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.mermaid-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 300px;
}

.mermaid-container :deep(svg) {
  max-width: 100%;
  max-height: 100%;
  height: auto;
  filter: drop-shadow(0 10px 25px rgba(0, 0, 0, 0.15)) drop-shadow(0 4px 10px rgba(0, 0, 0, 0.1));
  border-radius: 12px;
  background: white;
  padding: 20px;
}

.dark .mermaid-container :deep(svg) {
  background: #1f2937;
  filter: drop-shadow(0 10px 25px rgba(0, 0, 0, 0.5)) drop-shadow(0 4px 10px rgba(0, 0, 0, 0.3));
}

/* Enhanced modal transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-content-enter-active,
.modal-content-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-content-enter-from,
.modal-content-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(2rem);
}

/* Custom scrollbar for modal content */
.overflow-auto::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.overflow-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-auto::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, rgb(156 163 175), rgb(107 114 128));
  border-radius: 4px;
}

.overflow-auto::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, rgb(107 114 128), rgb(75 85 99));
}

/* Mobile menu container for click outside detection */
.mobile-menu-container {
  position: relative;
}
</style> 