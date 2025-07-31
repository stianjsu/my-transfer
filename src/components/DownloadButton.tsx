"use client"
import { useState } from "react"
import { saveAs } from "file-saver"
import { toast } from "sonner"
import { LoaderCircle, FileDown } from "lucide-react"
import { FILE_URL } from "@/components/uploadthing"
import { markFileAsDownloaded } from "@/server/actions/downloading"

export const DownloadButton = ({
  name,
  fileKey,
}: {
  name: string
  fileKey: string
}) => {
  const [downloading, setDownloading] = useState(false)
  const downloadUrl = FILE_URL + fileKey

  const handleDownload = async () => {
    try {
      setDownloading(true)
      const response = await fetch(downloadUrl)
      const blob = await response.blob()
      saveAs(blob, name)
      await markFileAsDownloaded(fileKey).catch((e) => console.error(e))
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
      onClick={(e) => {
        e.stopPropagation()
        handleDownload()
      }}
      className="group flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-200 transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:border-blue-500 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      disabled={downloading}
    >
      {downloading ? (
        <LoaderCircle size={30} className="animate-spin" />
      ) : (
        <FileDown size={30} />
      )}
    </button>
  )
}
