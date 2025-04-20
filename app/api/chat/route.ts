import { createManualToolStreamResponse } from '@/lib/streaming/create-manual-tool-stream'
import { isProviderEnabled } from '@/lib/utils/registry'
import { cookies } from 'next/headers'

export const maxDuration = 30
const DEFAULT_MODEL = 'groq:llama-3.3-70b-versatile'

export async function POST(req: Request) {
  try {
    // 1. Parse request
    const { messages, id: chatId } = await req.json()
    console.log('[route.ts] incoming messages:', messages)

    // 2. Cek share page
    const referer = req.headers.get('referer')
    if (referer?.includes('/share/')) {
      return new Response('Chat API is not available on share pages', {
        status: 403,
        statusText: 'Forbidden'
      })
    }

    // 3. Ambil model & provider
    const cookieStore = await cookies()
    const modelFromCookie = cookieStore.get('selected-model')?.value
    const searchMode = cookieStore.get('search-mode')?.value === 'true'
    const model = modelFromCookie || DEFAULT_MODEL
    const provider = model.split(':')[0]
    console.log('[route.ts] selected model/provider:', model, provider)

    if (!isProviderEnabled(provider)) {
      return new Response(`Selected provider is not enabled: ${provider}`, {
        status: 404,
        statusText: 'Not Found'
      })
    }

    // 4. Khusus ai‑assistant → panggil FastAPI
    if (provider === 'ai-assistant') {
      const userQuery = messages[messages.length - 1].content
      console.log('[route.ts] ai-assistant query:', userQuery)

      const response = await fetch(`${process.env.RUNPOD_SERVER_URL}/tanya`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userQuery })
      })

      if (!response.ok) {
        throw new Error(
          `AI ASSISTANT error: ${response.status} ${response.statusText}`
        )
      }

      const data = await response.json()
      console.log('[route.ts] FastAPI response data:', data)

      // 5. Bentuk finalObj termasuk sources
      const finalObj = {
        answer: data.answer,
        image: data.image,
        sources: data.sources // pastikan FastAPI mengirim key "sources"
      }
      console.log('[route.ts] SSE payload finalObj:', finalObj)

      // 6. Buat SSE stream
      const encoder = new TextEncoder()
      const stream = new ReadableStream({
        start(controller) {
          const chunkStr = 'data: ' + JSON.stringify(finalObj) + '\n\n'
          console.log('[route.ts] enqueue chunk:', chunkStr)
          controller.enqueue(encoder.encode(chunkStr))
          controller.close()
        }
      })

      return new Response(stream, {
        status: 200,
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache'
        }
      })
    }

    // 7. Provider lain → delegasi ke helper
    return createManualToolStreamResponse({
      messages,
      model,
      chatId,
      searchMode
    })
  } catch (error) {
    console.error('[route.ts] API route error:', error)
    return new Response(
      JSON.stringify({
        error:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
        status: 500
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}
