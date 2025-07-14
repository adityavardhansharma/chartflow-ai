# Mermaid Chat - AI Chart Generation

A full-screen chat application built with Vue 3 and Nuxt 3 that integrates with OpenRouter API for GPT-4.1 Nano to generate interactive Mermaid charts and diagrams.

## Features

- **Full-screen chat interface** similar to ChatGPT and T3.chat
- **Dual mode system**: Normal chat and Chart mode
- **OpenRouter API integration** with GPT-4.1 Nano
- **Mermaid.js integration** for real-time chart rendering
- **Syntax highlighting** with Prism.js
- **Markdown support** for rich text formatting
- **Chart download** functionality (PNG/SVG)
- **Dark/Light mode** toggle
- **Modern, responsive UI** with Tailwind CSS

## Setup Instructions

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure API Key

You need to get an OpenRouter API key from [OpenRouter.ai](https://openrouter.ai/) and configure it in your environment.

Since .env files are restricted, you can either:

**Option A: Set environment variables directly**
```bash
# Windows PowerShell
$env:OPENROUTER_API_KEY="your_openrouter_api_key_here"
$env:SITE_URL="http://localhost:3000"
$env:SITE_NAME="Mermaid Chat"

# Linux/Mac
export OPENROUTER_API_KEY="your_openrouter_api_key_here"
export SITE_URL="http://localhost:3000"
export SITE_NAME="Mermaid Chat"
```

**Option B: Modify nuxt.config.ts directly**
```typescript
runtimeConfig: {
  public: {
    openRouterApiKey: 'your_openrouter_api_key_here',
    siteUrl: 'http://localhost:3000',
    siteName: 'Mermaid Chat'
  }
}
```

### 3. Run the Application

```bash
# Development mode
pnpm dev

# Production build
pnpm build
pnpm preview
```

The application will be available at `http://localhost:3000`

## Usage Guide

### Chat Modes

**Normal Mode** (Default)
- General conversation with AI
- Can answer questions, help with tasks
- Suggests switching to Chart Mode for diagrams

**Chart Mode**
- Specialized for creating Mermaid charts
- Provide data or scenarios
- AI generates appropriate diagrams
- Supports all Mermaid chart types

### Chart Generation

1. **Switch to Chart Mode** by clicking the mode toggle button
2. **Describe your data or scenario** in the chat input
3. **AI generates Mermaid code** in structured code blocks
4. **Click "Run" button** next to any Mermaid code block
5. **View the rendered chart** in a modal window
6. **Download charts** as PNG or SVG files

### Supported Chart Types

- **Flowchart**: Process flows and decision trees
- **Sequence Diagrams**: Interactions between entities
- **Gantt Charts**: Project timelines and schedules
- **Pie Charts**: Proportions and percentages
- **ER Diagrams**: Database relationships
- **Git Graphs**: Version control workflows
- **Mind Maps**: Hierarchical information
- **Timelines**: Chronological events
- **Sankey Diagrams**: Flow quantities

### Keyboard Shortcuts

- **Enter**: Send message
- **Shift + Enter**: New line in message
- **Escape**: Close modals

## Technical Architecture

### Frontend Stack
- **Vue 3** with Composition API
- **Nuxt 3** for SSR and development experience
- **Tailwind CSS** for styling
- **Mermaid.js** for chart rendering
- **Prism.js** for syntax highlighting
- **Marked** for markdown processing

### API Integration
- **OpenRouter API** with GPT-4.1 Nano model
- **Dual system prompts** for different modes
- **Streaming responses** for real-time chat experience

### Key Components
- `ChatMessage.vue`: Message display with syntax highlighting
- `MermaidModal.vue`: Chart rendering and download
- `ColorModeButton.vue`: Theme toggle
- `useOpenRouter.ts`: API integration composable
- `useMermaid.ts`: Chart rendering composable

## Development

### Project Structure
```
mermaid-chat-app/
├── components/
│   ├── ChatMessage.vue
│   ├── MermaidModal.vue
│   └── ColorModeButton.vue
├── composables/
│   ├── useOpenRouter.ts
│   └── useMermaid.ts
├── layouts/
│   └── default.vue
├── app.vue
├── nuxt.config.ts
└── tailwind.config.js
```


## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
1. Check the existing issues
2. Create a new issue with detailed description
3. Provide code examples and error messages

---
