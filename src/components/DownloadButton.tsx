"use client"
import { useState } from "react"
import { Download, RefreshIcon } from "./Icons"
import { saveAs } from "file-saver"
import { toast } from "sonner"

export const DownloadButton = ({
  name,
  downloadUrl,
}: {
  name: string
  downloadUrl: string
}) => {
  const [downloading, setDownloading] = useState(false)

  const handleDownload = async () => {
    try {
      setDownloading(true)
      const response = await fetch(downloadUrl)
      const blob = await response.blob()
      saveAs(blob, name)
    } catch (error) {
      console.error(error)
      toast.error("Failed to open download window")
      window.open(downloadUrl, "_blank")
    } finally {
      setDownloading(false)
    }
  }

  return (
    <button
      onClick={handleDownload}
      className="flex size-12 items-center justify-center rounded-full border border-slate-300 transition ease-in-out hover:bg-slate-500"
    >
      {downloading ? <RefreshIcon size={30} /> : <Download size={30} />}
    </button>
  )
}
