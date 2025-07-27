"use client"
import { Download } from "./Icons"
import { saveAs } from "file-saver"

export const DownloadButton = ({
  name,
  downloadUrl,
}: {
  name: string
  downloadUrl: string
}) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(downloadUrl)
      const blob = await response.blob()
      saveAs(blob, name)
    } catch (error) {
      console.error("Download failed:", error)
      window.open(downloadUrl, "_blank")
    }
  }

  return (
    <button
      onClick={handleDownload}
      className="flex size-12 items-center justify-center rounded-full border border-slate-300 transition ease-in-out hover:bg-slate-500"
    >
      <Download size={30} />
    </button>
  )
}
