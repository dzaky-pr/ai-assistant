'use client'

import { CHAT_ID } from '@/lib/constants'
import { getCookie, setCookie } from '@/lib/utils/cookies'
import { Message, useChat } from 'ai/react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { ChatMessages } from './chat-messages'
import { ChatPanel } from './chat-panel'

type StreamProtocol = 'text' | 'data'

export function Chat({
  id,
  savedMessages = [],
  query
}: {
  id: string
  savedMessages?: Message[]
  query?: string
}) {
  const [selectedModelId, setSelectedModelId] = useState<string>('')
  const [dynamicStreamProtocol, setDynamicStreamProtocol] =
    useState<StreamProtocol>('data')

  // Baca cookie model sekali saat mount
  useEffect(() => {
    if (getCookie('search-mode') === undefined) {
      setCookie('search-mode', 'false')
    }

    const modelFromCookie = getCookie('selected-model')
    const searchMode = getCookie('search-mode') === 'true'

    if (!modelFromCookie) {
      const defaultModel = searchMode
        ? 'groq:llama-3.3-70b-versatile'
        : 'ai-assistant:ai-assistant'
      setCookie('selected-model', defaultModel)
      setSelectedModelId(defaultModel)
    } else {
      setSelectedModelId(modelFromCookie)
    }
  }, [])

  // Update dynamicStreamProtocol ketika selectedModelId berubah
  useEffect(() => {
    setDynamicStreamProtocol(
      selectedModelId === 'ai-assistant:ai-assistant' ? 'text' : 'data'
    )
  }, [selectedModelId])

  // Ketika search mode toggle berubah
  const handleSearchModeToggle = (isSearchMode: boolean) => {
    const newModelId = isSearchMode
      ? 'groq:llama-3.3-70b-versatile'
      : 'ai-assistant:ai-assistant'
    setCookie('selected-model', newModelId)
    setSelectedModelId(newModelId)
  }

  // Callback untuk update model secara manual dari ModelSelector
  const handleModelSelect = (modelId: string) => {
    setCookie('selected-model', modelId)
    setSelectedModelId(modelId)
  }

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
    stop,
    append,
    data,
    setData
  } = useChat({
    streamProtocol: dynamicStreamProtocol,
    initialMessages: savedMessages,
    id: CHAT_ID,
    body: { id },
    sendExtraMessageFields: false,
    onFinish: () => {
      window.history.replaceState({}, '', `/search/${id}`)
    },
    onError: error => {
      toast.error(`Error in chat: ${error.message}`)
      console.error('Error in chat:', error)
    }
  })

  useEffect(() => {
    setMessages(savedMessages)
  }, [id])

  const onQuerySelect = (query: string) => {
    append({
      role: 'user',
      content: query
    })
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setData(undefined)
    handleSubmit(e)
  }

  return (
    <div
      key={dynamicStreamProtocol}
      className="flex flex-col w-full max-w-3xl pt-14 pb-60 mx-auto stretch"
    >
      <ChatMessages
        messages={messages}
        data={data}
        onQuerySelect={onQuerySelect}
        isLoading={isLoading}
        chatId={id}
      />
      <ChatPanel
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={onSubmit}
        isLoading={isLoading}
        messages={messages}
        setMessages={setMessages}
        stop={stop}
        query={query}
        append={append}
        onSearchModeToggle={handleSearchModeToggle}
        onModelSelect={handleModelSelect}
        selectedModelId={selectedModelId}
      />
    </div>
  )
}
