"use client"

import { UploadDropzone } from "@/components/uploadthing"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { RefreshIcon } from "./Icons"

export function DropZone() {
  const router = useRouter()

  return (
    <>
      <UploadDropzone
        className="flex gap-1 bg-slate-50 p-4 ut-button:h-8 ut-button:max-w-36 ut-button:bg-slate-700 ut-button:text-sm ut-label:text-slate-700"
        endpoint="fileUploader"
        onClientUploadComplete={() => {
          router.refresh()
        }}
        onUploadError={(error: Error) => {
          toast.error(error.message)
        }}
      />
      <div className="flex w-full items-center justify-end gap-2 align-middle">
        <span>Refresh</span>
        <div
          className="mr-6 cursor-pointer rounded-lg bg-slate-900 p-2 hover:bg-slate-700"
          onClick={router.refresh}
        >
          <RefreshIcon size={28} />
        </div>
      </div>
    </>
  )
}
