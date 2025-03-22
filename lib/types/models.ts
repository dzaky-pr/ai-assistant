export interface Model {
  id: string
  name: string
  provider: string
  providerId: string
}

export const models: Model[] = [
  {
    id: 'skki-skko-ai',
    name: 'SKKI SKKO AI',
    provider: 'PLN AI Models',
    providerId: 'nuii-ai'
  },
  {
    id: 'sdm-ai',
    name: 'SDM AI',
    provider: 'PLN AI Models',
    providerId: 'nuii-ai'
  },
  {
    id: 'niaga-ai',
    name: 'NIAGA AI',
    provider: 'PLN AI Models',
    providerId: 'nuii-ai'
  },
  {
    id: 'jaringan-ai',
    name: 'JARINGAN AI',
    provider: 'PLN AI Models',
    providerId: 'nuii-ai'
  },
  {
    id: 'llama-3.3-70b-versatile',
    name: 'GENERAL AI',
    provider: 'Groq',
    providerId: 'groq'
  }
]
