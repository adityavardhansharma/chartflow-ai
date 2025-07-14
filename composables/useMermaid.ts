import { ref } from 'vue'
import mermaid from 'mermaid'

export const useMermaid = () => {
  const isInitialized = ref(false)

  const initializeMermaid = () => {
    if (!isInitialized.value) {
      mermaid.initialize({
        startOnLoad: false,
        theme: 'dark',
        securityLevel: 'loose',
        fontFamily: 'Inter, system-ui, sans-serif',
        themeVariables: {
          primaryColor: '#3b82f6',
          primaryTextColor: '#ffffff',
          primaryBorderColor: '#2563eb',
          lineColor: '#6b7280',
          sectionBkgColor: '#1f2937',
          altSectionBkgColor: '#374151',
          gridColor: '#6b7280',
          secondaryColor: '#1f2937',
          tertiaryColor: '#374151'
        }
      })
      isInitialized.value = true
    }
  }

  const calculateComplexity = (code: string) => {
    const lines = code.split('\n').filter(line => line.trim()).length
    const nodeMatches = code.match(/\w+(?:\s*\[.*?\]|\s*\(.*?\)|\s*\{.*?\}|\s*>.*?<)/g) || []
    const edgeMatches = code.match(/--[>\-]|==>|\.\.>|\-\-\->/g) || []
    const totalElements = nodeMatches.length + edgeMatches.length
    
    let type = 'diagram'
    // Improved chart type detection with priority order
    if (code.includes('flowchart')) type = 'flowchart'
    else if (code.includes('graph TD') || code.includes('graph LR') || code.includes('graph TB') || code.includes('graph RL')) type = 'flowchart'
    else if (code.includes('sequenceDiagram')) type = 'sequence diagram'
    else if (code.includes('gantt')) type = 'gantt chart'
    else if (code.includes('pie title') || code.includes('pie showData')) type = 'pie chart'
    else if (code.includes('erDiagram')) type = 'ER diagram'
    else if (code.includes('gitgraph')) type = 'git graph'
    else if (code.includes('mindmap')) type = 'mind map'
    else if (code.includes('timeline')) type = 'timeline'
    else if (code.includes('classDiagram')) type = 'class diagram'
    else if (code.includes('stateDiagram')) type = 'state diagram'
    else if (code.includes('journey')) type = 'user journey'
    else if (code.includes('sankey-beta')) type = 'sankey diagram'
    
    // Adjust complexity based on chart type and content
    let complexity = 'low'
    if (type === 'pie chart') {
      // Pie charts are generally simpler
      complexity = totalElements > 10 ? 'medium' : 'low'
    } else if (type === 'sequence diagram') {
      // Sequence diagrams can be complex with many interactions
      complexity = totalElements > 20 ? 'high' : totalElements > 10 ? 'medium' : 'low'
    } else if (type === 'gantt chart') {
      // Gantt charts complexity based on tasks and timeline
      complexity = lines > 20 ? 'high' : lines > 10 ? 'medium' : 'low'
    } else {
      // General complexity for flowcharts and other diagrams
      complexity = totalElements > 30 ? 'high' : totalElements > 15 ? 'medium' : 'low'
    }
    
    return {
      type,
      elements: totalElements,
      lines,
      complexity,
      suggestedWidth: Math.max(400, Math.min(1200, totalElements * 25)),
      suggestedHeight: Math.max(300, Math.min(800, lines * 20))
    }
  }

  const renderMermaid = async (code: string, elementId: string) => {
    try {
      initializeMermaid()
      
      // Clean the code
      const cleanCode = code.trim()
      
      // Validate code is not empty
      if (!cleanCode) {
        throw new Error('Empty diagram code provided')
      }
      
      // Basic syntax validation
      if (!cleanCode.includes('graph') && 
          !cleanCode.includes('flowchart') && 
          !cleanCode.includes('sequenceDiagram') &&
          !cleanCode.includes('gantt') &&
          !cleanCode.includes('pie') &&
          !cleanCode.includes('gitgraph') &&
          !cleanCode.includes('erDiagram') &&
          !cleanCode.includes('mindmap') &&
          !cleanCode.includes('timeline')) {
        throw new Error('Invalid Mermaid diagram type. Please check your syntax.')
      }
      
      // Generate unique ID for the diagram
      const diagramId = `diagram_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      
      // Calculate complexity for dynamic sizing
      const complexity = calculateComplexity(cleanCode)
      
      // Render the diagram
      const { svg } = await mermaid.render(diagramId, cleanCode)
      
      // Insert the SVG into the target element with sizing hints
      const element = document.getElementById(elementId)
      if (element) {
        const enhancedSvg = svg.replace('<svg', `<svg class="mermaid-svg" data-complexity="${complexity.complexity}" data-elements="${complexity.elements}"`)
        element.innerHTML = enhancedSvg
        
        // Apply dynamic sizing based on complexity
        const svgElement = element.querySelector('svg')
        if (svgElement && complexity.complexity === 'high') {
          svgElement.style.minWidth = `${complexity.suggestedWidth}px`
          svgElement.style.minHeight = `${complexity.suggestedHeight}px`
        }
        
        return { success: true, complexity }
      }
      return { success: false, error: 'Could not find target element' }
    } catch (error) {
      console.error('Mermaid render error:', error)
      
      // Return user-friendly error messages
      let userMessage = 'Failed to render diagram. '
      if (error.message.includes('Parse error')) {
        userMessage += 'Please check your Mermaid syntax.'
      } else if (error.message.includes('Empty diagram')) {
        userMessage += 'The diagram code is empty.'
      } else if (error.message.includes('Invalid Mermaid diagram type')) {
        userMessage += error.message
      } else {
        userMessage += 'Please verify your diagram syntax and try again.'
      }
      
      return { success: false, error: userMessage, originalError: error }
    }
  }

  const downloadChart = async (svgElement: SVGElement, filename: string = 'chart', format: 'png' | 'svg' = 'png') => {
    try {
      if (format === 'svg') {
        // Download as SVG
        const svgData = new XMLSerializer().serializeToString(svgElement)
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml' })
        const svgUrl = URL.createObjectURL(svgBlob)
        
        const link = document.createElement('a')
        link.href = svgUrl
        link.download = `${filename}.svg`
        link.click()
        
        URL.revokeObjectURL(svgUrl)
        return { success: true }
      } else {
        // Convert to PNG with higher quality
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        
        // Get SVG dimensions
        const svgRect = svgElement.getBoundingClientRect()
        const scale = 2 // Higher resolution
        canvas.width = svgRect.width * scale
        canvas.height = svgRect.height * scale
        
        const svgData = new XMLSerializer().serializeToString(svgElement)
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml' })
        const svgUrl = URL.createObjectURL(svgBlob)
        
        const img = new Image()
        img.onload = () => {
          // Scale context for higher resolution
          ctx!.scale(scale, scale)
          
          // Fill with white background
          ctx!.fillStyle = '#ffffff'
          ctx!.fillRect(0, 0, svgRect.width, svgRect.height)
          
          // Draw the SVG
          ctx!.drawImage(img, 0, 0, svgRect.width, svgRect.height)
          
          // Download the PNG
          canvas.toBlob((blob) => {
            if (blob) {
              const pngUrl = URL.createObjectURL(blob)
              const link = document.createElement('a')
              link.href = pngUrl
              link.download = `${filename}.png`
              link.click()
              
              URL.revokeObjectURL(pngUrl)
            }
          }, 'image/png', 0.95) // High quality
          
          URL.revokeObjectURL(svgUrl)
        }
        
        img.onerror = () => {
          console.error('Failed to load SVG for PNG conversion')
        }
        
        img.src = svgUrl
        return { success: true }
      }
    } catch (error) {
      console.error('Download error:', error)
      return { success: false, error: 'Failed to download chart' }
    }
  }

  const extractMermaidCode = (text: string): string[] => {
    const mermaidRegex = /```mermaid\s*([\s\S]*?)```/g
    const matches = []
    let match
    
    while ((match = mermaidRegex.exec(text)) !== null) {
      matches.push(match[1].trim())
    }
    
    return matches
  }

  const validateMermaidSyntax = (code: string): { isValid: boolean; suggestions?: string[] } => {
    const suggestions = []
    
    if (!code.trim()) {
      return { isValid: false, suggestions: ['Diagram code cannot be empty'] }
    }
    
    // Check for common syntax errors
    if (code.includes('graph') && !code.includes('TD') && !code.includes('LR') && !code.includes('TB')) {
      suggestions.push('Consider specifying direction: graph TD or graph LR')
    }
    
    if (code.includes('-->') && !code.match(/\w+\s*-->\s*\w+/)) {
      suggestions.push('Check arrow syntax: A --> B')
    }
    
    return { isValid: suggestions.length === 0, suggestions }
  }

  return {
    initializeMermaid,
    renderMermaid,
    downloadChart,
    extractMermaidCode,
    calculateComplexity,
    validateMermaidSyntax
  }
} 