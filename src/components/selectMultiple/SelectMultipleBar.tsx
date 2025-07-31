"use client"
import { Download, X, FileDown } from "lucide-react"
import { useSelection } from "./SelectMutipleContext"
import { useState } from "react"
import saveAs from "file-saver"
import { toast } from "sonner"
import { FILE_URL } from "@/components/uploadthing"

export function SelectMultipleBar({}: {}) {
  const { selectedFiles, clearSelection } = useSelection()
  const [downloading, setDownloading] = useState(false)

  const selectedFilesArray = [...selectedFiles]

  const downloadMultiple = async () => {
    setDownloading(true)

    const promises: Promise<void>[] = []

    selectedFiles.forEach((file) => {
      promises.push(handleDownload(FILE_URL + file.key, file.name))
    })

    await Promise.allSettled(promises)
    clearSelection()
    setDownloading(false)
  }

  const handleDownload = async (downloadUrl: string, name: string) => {
    try {
      const response = await fetch(downloadUrl)
      const blob = await response.blob()
      saveAs(blob, name)
    } catch (error) {
      toast.error(`Failed to open download window for ${name}`)
    }
  }

  return (
    <div
      className={
        "fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4 rounded-lg border border-gray-200 bg-slate-800 p-4 shadow-lg transition-transform " +
        (selectedFilesArray.length == 0 &&
          "pointer-events-none translate-y-32 opacity-0")
      }
      aria-hidden={selectedFilesArray.length === 0}
    >
      <form action={downloadMultiple}>
        <button
          type="submit"
          disabled={downloading}
          className="flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 disabled:opacity-50"
        >
          <FileDown size={24} />
          <span className="min-w-32">
            {downloading
              ? "Downloading..."
              : `Download ${selectedFilesArray.length} file${selectedFilesArray.length !== 1 ? "s" : ""}`}
          </span>
        </button>
      </form>

      <button
        onClick={clearSelection}
        className="rounded-md p-2 transition-colors hover:bg-blue-500"
      >
        <X size={16} />
      </button>
    </div>
  )
}
