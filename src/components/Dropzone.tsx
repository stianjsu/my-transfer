"use client"

import { UploadDropzone } from "@/components/uploadthing"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { RefreshIcon } from "./Icons"
import { useState } from "react"

export function DropZone() {
  const router = useRouter()

  const [dropzoneResetKey, setDropzoneResetKey] = useState(0)

  return (
    <>
      <UploadDropzone
        endpoint="fileUploader"
        key={dropzoneResetKey}
        appearance={{
          container:
            "flex bg-card p-4 cursor-pointer border-2 border-dashed border-white/40 hover:border-blue-500 hover:bg-blue-800/10 transition-all duration-300 ease-in-out hover:-translate-y-[2px]",
          uploadIcon: "max-w-full",
          label: "max-w-full text-wrap",
          allowedContent: "hidden",
          button: "h-8 max-w-full bg-slate-700 text-sm",
        }}
        onClientUploadComplete={() => {
          router.refresh()
        }}
        onUploadError={(error: Error) => {
          toast.error(error.message)
          // Reset dropzone on error (which includes cancellation on iOS)
          setDropzoneResetKey((prev) => (prev + 1) % 2)
        }}
        onUploadAborted={() => {
          // Reset when upload is aborted/cancelled
          setDropzoneResetKey((prev) => (prev + 1) % 2)
        }}
      />
      <div className="flex w-full items-center justify-end gap-2 align-middle">
        <span>Refresh</span>
        <div
          className="cursor-pointer rounded-lg bg-slate-900 p-2 hover:bg-slate-700"
          onClick={router.refresh}
        >
          <RefreshIcon size={28} />
        </div>
      </div>
    </>
  )
}
