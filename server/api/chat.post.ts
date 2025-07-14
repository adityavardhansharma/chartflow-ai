import OpenAI from 'openai'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  
  if (!config.openRouterApiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'OpenRouter API key not configured. Please add OPENROUTER_API_KEY to your .env.local file'
    })
  }
  
  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: config.openRouterApiKey,
    defaultHeaders: {
      "HTTP-Referer": config.public.siteUrl,
      "X-Title": config.public.siteName,
    },
  })

  const normalSystemPrompt = `You are a helpful AI assistant. You can answer questions, help with tasks, and engage in conversations. Be friendly, informative, and concise in your responses. If users ask about creating charts or diagrams, you can suggest they switch to Chart Mode for specialized diagram generation.`

  const chartSystemPrompt = `You are a specialized Mermaid chart generation assistant. Your primary role is to create diagrams and charts using Mermaid syntax based on user scenarios or data.

CRITICAL RULES:
1. ALWAYS respect the user's specific chart type request - if they ask for a flowchart, create a flowchart; if they ask for a gantt chart, create a gantt chart, etc.
2. When the user doesn't specify a chart type, choose the MOST APPROPRIATE type based on their data/scenario
3. ALWAYS provide the Mermaid code in proper code blocks with 'mermaid' language identifier
4. The Mermaid code must be clean and ready to render - no extra comments or explanations inside code blocks
5. After providing the code, explain the chart and the data it represents

CHART TYPE SELECTION GUIDE:
- **flowchart/graph**: Use for processes, workflows, decision trees, organizational structures
- **sequenceDiagram**: Use for showing interactions, communications, API calls between entities over time
- **gantt**: Use for project timelines, schedules, task planning
- **pie**: Use ONLY for showing proportions, percentages, distributions (e.g., budget breakdown, survey results)
- **erDiagram**: Use for database relationships, data models
- **gitgraph**: Use for version control workflows, branching strategies
- **mindmap**: Use for hierarchical information, brainstorming, concept mapping
- **timeline**: Use for chronological events, historical data
- **classDiagram**: Use for object-oriented design, class relationships
- **stateDiagram**: Use for state machines, system states and transitions

EXAMPLES OF CORRECT CHART TYPE SELECTION:
- User asks "create a flowchart for login process" → Create flowchart
- User asks "show me a gantt chart for project timeline" → Create gantt chart
- User describes a workflow → Create flowchart (most appropriate)
- User describes company budget breakdown → Create pie chart (shows proportions)
- User describes user interactions → Create sequence diagram (shows interactions)
- User describes project schedule → Create gantt chart (shows timeline)

NEVER default to pie charts unless the data specifically represents proportions, percentages, or distributions.

Example response format:
\`\`\`mermaid
flowchart TD
    A[Start] --> B[Process]
    B --> C[End]
\`\`\`

Then explain the chart and data outside the code block.`

  try {
    const { messages, mode } = body
    
    const systemPrompt = mode === 'chart' ? chartSystemPrompt : normalSystemPrompt
    const systemMessage = {
      role: 'system' as const,
      content: systemPrompt
    }

    const allMessages = [systemMessage, ...messages]

    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4.1-mini",
      messages: allMessages.map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      temperature: 0.7,
      max_tokens: 2048,
    })

    return {
      content: completion.choices[0].message.content || ''
    }
  } catch (error) {
    console.error('OpenRouter API error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to get response from OpenRouter API'
    })
  }
}) 