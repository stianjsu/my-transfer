"use client"
import { createContext, use, useState, ReactNode } from "react"

export type SelectMultipleFileType = { key: string; name: string }

interface SelectMultipleContextType {
  selectedFiles: SelectMultipleFileType[]
  toggleSelection: (fileKey: string, name: string) => void
  clearSelection: () => void
  isSelected: (fileKey: string) => boolean
}

export const SelectMultipleContext =
  createContext<SelectMultipleContextType | null>(null)

export const useSelection = () => {
  const context = use(SelectMultipleContext)
  if (!context) {
    throw new Error("useSelection must be used within SelectionProvider")
  }
  return context
}

export const SelectMultipleProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [selectedFiles, setSelectedFiles] = useState<
    SelectMultipleContextType["selectedFiles"]
  >([])

  const toggleSelection = (fileKey: string, name: string) => {
    setSelectedFiles((prev) => {
      let i = prev.findIndex((file) => file.key == fileKey)
      if (i == -1) return [...prev, { key: fileKey, name }]

      return [...prev.slice(0, i), ...prev.slice(i + 1)]
    })
  }

  const clearSelection = () => {
    setSelectedFiles([])
  }

  const isSelected = (fileKey: string) =>
    selectedFiles.findIndex((file) => file.key == fileKey) != -1

  return (
    <SelectMultipleContext.Provider
      value={{
        selectedFiles,
        toggleSelection,
        clearSelection,
        isSelected,
      }}
    >
      {children}
    </SelectMultipleContext.Provider>
  )
}
