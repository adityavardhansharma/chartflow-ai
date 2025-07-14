// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode'
  ],
  css: [
    'prismjs/themes/prism-tomorrow.css'
  ],
  runtimeConfig: {
    // Server-side only (API keys should be here)
    openRouterApiKey: process.env.OPENROUTER_API_KEY || '',
    
    // Public config (available on client-side)
    public: {
      siteUrl: process.env.SITE_URL || 'http://localhost:3000',
      siteName: process.env.SITE_NAME || 'Mermaid Chat'
    }
  },
  colorMode: {
    preference: 'dark',
    fallback: 'dark'
  },
  app: {
    head: {
      title: 'Mermaid Chat - AI Chart Generation',
      meta: [
        { name: 'description', content: 'AI-powered chat interface for generating Mermaid charts and diagrams' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  }
})
