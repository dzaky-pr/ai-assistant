'use client'

import { Model, models } from '@/lib/types/models'
import { Check, ChevronsUpDown } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { createModelId } from '../lib/utils'
import { Button } from './ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from './ui/command'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

interface ModelSelectorProps {
  isSearchMode?: boolean
  selectedModelId: string
  onModelSelect: (modelId: string) => void
}

function groupModelsByProvider(models: Model[]) {
  return models.reduce((groups, model) => {
    const provider = model.provider
    if (!groups[provider]) {
      groups[provider] = []
    }
    groups[provider].push(model)
    return groups
  }, {} as Record<string, Model[]>)
}

export function ModelSelector({
  isSearchMode = false,
  selectedModelId,
  onModelSelect
}: ModelSelectorProps) {
  const [open, setOpen] = useState(false)

  const handleModelSelect = (id: string) => {
    if (isSearchMode) return
    onModelSelect(id)
    setOpen(false)
  }

  const groupedModels = groupModelsByProvider(models)
  const selectedModel = models.find(m => createModelId(m) === selectedModelId)

  return (
    <Popover open={!isSearchMode && open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="text-sm rounded-full shadow-none focus:ring-0"
          disabled={isSearchMode} // Nonaktifkan jika search mode aktif
        >
          {selectedModel ? (
            <div className="flex items-center space-x-1">
              <Image
                src={`/providers/logos/${selectedModel.providerId}.svg`}
                alt={selectedModel.provider}
                width={18}
                height={18}
                className="bg-white rounded-full border"
              />
              <span className="text-xs font-medium">{selectedModel.name}</span>
            </div>
          ) : (
            'Select model'
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0" align="start">
        <Command>
          <CommandInput placeholder="Search models..." />
          <CommandList>
            <CommandEmpty>No model found.</CommandEmpty>
            {Object.entries(groupModelsByProvider(models)).map(
              ([provider, models]) => (
                <CommandGroup key={provider} heading={provider}>
                  {models.map(model => {
                    const modelId = createModelId(model)
                    return (
                      <CommandItem
                        key={modelId}
                        value={modelId}
                        onSelect={handleModelSelect}
                        className="flex justify-between"
                      >
                        <div className="flex items-center space-x-2">
                          <Image
                            src={`/providers/logos/${model.providerId}.svg`}
                            alt={model.provider}
                            width={18}
                            height={18}
                            className="bg-white rounded-full border"
                          />
                          <span className="text-xs font-medium">
                            {model.name}
                          </span>
                        </div>
                        <Check
                          className={`h-4 w-4 ${
                            selectedModelId === modelId
                              ? 'opacity-100'
                              : 'opacity-0'
                          }`}
                        />
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              )
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
