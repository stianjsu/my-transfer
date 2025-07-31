"use client"
import { useSelection } from "@/components/selectMultiple/SelectMutipleContext"
import { ReactNode, use } from "react"

interface SelectionWrapperProps {
  fileKey: string
  fileName: string
  children: ReactNode
  className?: string
}

export const SelectionWrapper = ({
  fileKey,
  fileName,
  children,
  className = "",
}: SelectionWrapperProps) => {
  const { isSelected, toggleSelection } = useSelection()
  const selected = isSelected(fileKey)

  return (
    <div
      className={`relative cursor-pointer rounded-lg transition-all duration-200 hover:ring-4 ${
        selected
          ? "bg-white/10 ring-4 ring-blue-500 ring-offset-2"
          : "hover:ring-white"
      } ${className}`}
      onClick={() => toggleSelection(fileKey, fileName)}
    >
      {children}
    </div>
  )
}
