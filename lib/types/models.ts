export interface Model {
  id: string
  name: string
  provider: string
  providerId: string
}

export const models: Model[] = [
  // {
  //   id: 'skki-skko-ai',
  //   name: 'SKKI SKKO AI',
  //   provider: 'PLN AI Models',
  //   providerId: 'ai-assistant'
  // },
  // {
  //   id: 'sdm-ai',
  //   name: 'SDM AI',
  //   provider: 'PLN AI Models',
  //   providerId: 'ai-assistant'
  // },
  // {
  //   id: 'niaga-ai',
  //   name: 'NIAGA AI',
  //   provider: 'PLN AI Models',
  //   providerId: 'ai-assistant'
  // },
  // {
  //   id: 'jaringan-ai',
  //   name: 'JARINGAN AI',
  //   provider: 'PLN AI Models',
  //   providerId: 'ai-assistant'
  // },
  {
    id: 'ai-assistant',
    name: 'AI ASSISTANT 1.0',
    provider: 'PLN AI Models',
    providerId: 'ai-assistant'
  },
  {
    id: 'llama-3.3-70b-versatile',
    name: 'GENERAL AI',
    provider: 'Groq',
    providerId: 'groq'
  }
]
