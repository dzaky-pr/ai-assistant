import { groq } from '@ai-sdk/groq'
import { experimental_createProviderRegistry as createProviderRegistry } from 'ai'

import { createOllama } from 'ollama-ai-provider'

export const registry = createProviderRegistry({
  groq,
  'ai-assistant': createOllama({
    baseURL: `${process.env.RUNPOD_SERVER_URL}`
  })
})

export function getModel(model: string) {
  const modelName = model.split(':')[1]
  if (model.includes('ollama')) {
    if (model.includes('ai-assistant')) {
      const ollama = createOllama({
        baseURL: `${process.env.RUNPOD_SERVER_URL}/tanya`
      })

      // if ollama provider, set simulateStreaming to true
      return ollama(modelName, {
        simulateStreaming: true
      })
    }
  }

  return registry.languageModel(model)
}

export function isProviderEnabled(providerId: string): boolean {
  switch (providerId) {
    case 'groq':
      return !!process.env.GROQ_API_KEY
    case 'ai-assistant':
      return true
    default:
      return false
  }
}

export function getToolCallModel(model?: string) {
  const provider = model?.split(':')[0]
  switch (provider) {
    case 'groq':
      return getModel('groq:llama-3.3-70b-versatile')
  }
}
