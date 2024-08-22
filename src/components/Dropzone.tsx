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
        endpoint="fileUploader"
        appearance={{
          container: "flex bg-slate-50 p-4",
          uploadIcon: "max-w-full",
          label: "max-w-full text-wrap text-slate-700",
          allowedContent: "hidden",
          button: "h-8 max-w-full bg-slate-700 text-sm",
        }}
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
          className="cursor-pointer rounded-lg bg-slate-900 p-2 hover:bg-slate-700"
          onClick={router.refresh}
        >
          <RefreshIcon size={28} />
        </div>
      </div>
    </>
  )
}
