'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { CollapsibleMessage } from './collapsible-message'
import { DefaultSkeleton } from './default-skeleton'
import { BotMessage } from './message'
import { MessageActions } from './message-actions'

export type AnswerSectionProps = {
  content: string
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  chatId?: string
}

export function AnswerSection({
  content,
  isOpen,
  onOpenChange,
  chatId
}: AnswerSectionProps) {
  const enableShare = process.env.NEXT_PUBLIC_ENABLE_SHARE === 'true'
  const [previewIndex, setPreviewIndex] = useState<number | null>(null)

  // helper to download arbitrary text/blobs
  const downloadFile = (text: string, filename: string) => {
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  // strip off any "data:" prefix
  let cleaned = content.trim()
  if (cleaned.startsWith('data:')) cleaned = cleaned.slice(5).trim()

  // parse or fallback
  let parsed: {
    answer?: string
    image?: string | string[]
    sources?: Array<{
      content: string
      collection?: string
      fileName?: string
      fileUrl?: string
    }>
  } = {}

  try {
    parsed = JSON.parse(cleaned)
  } catch {
    parsed.answer = cleaned
  }

  const images = Array.isArray(parsed.image)
    ? parsed.image
    : parsed.image
    ? [parsed.image]
    : []

  return (
    <CollapsibleMessage
      role="assistant"
      isCollapsible={false}
      header={
        <div className="flex items-center gap-1">
          <span className="text-lg font-bold">Answer</span>
        </div>
      }
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      showBorder={false}
    >
      <div className="flex flex-col gap-4">
        {parsed.answer ? (
          <BotMessage message={parsed.answer} />
        ) : (
          <DefaultSkeleton />
        )}

        {images.map((img, i) => (
          <div key={i} className="mt-4">
            <Image
              src={`/images/${img}`}
              alt={`Answer image ${i + 1}`}
              width={400}
              height={300}
              className="rounded"
            />
          </div>
        ))}

        {images.length > 0 && <p>Gambar: {images.join(', ')}</p>}

        {parsed.sources?.map((src, idx) => {
          const defaultName = src.collection
            ? `${src.collection}.txt`
            : `source-${idx + 1}.txt`
          const fileName = src.fileName || defaultName

          return (
            <div key={idx} className="p-4 rounded-md bg-muted border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">{fileName}</span>
                <div className="flex gap-2">
                  {src.fileUrl ? (
                    // untuk PDF/berkas: gunakan <a download>
                    <a href={src.fileUrl} download={fileName}>
                      <Button size="sm" variant="outline">
                        Download File
                      </Button>
                    </a>
                  ) : (
                    // untuk teks: gunakan blob download
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => downloadFile(src.content, fileName)}
                    >
                      Download Text
                    </Button>
                  )}

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      setPreviewIndex(previewIndex === idx ? null : idx)
                    }
                  >
                    {previewIndex === idx ? 'Hide' : 'Preview'}
                  </Button>
                </div>
              </div>

              {previewIndex === idx && (
                <pre className="whitespace-pre-wrap text-sm">{src.content}</pre>
              )}

              {src.fileUrl && (
                <div className="mt-2">
                  <Link
                    href={src.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm underline"
                  >
                    Open {fileName}
                  </Link>
                </div>
              )}
            </div>
          )
        })}

        <MessageActions
          message={parsed.answer || content}
          chatId={chatId}
          enableShare={enableShare}
        />
      </div>
    </CollapsibleMessage>
  )
}
