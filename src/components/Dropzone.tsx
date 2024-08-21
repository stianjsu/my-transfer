"use client"

import { UploadDropzone } from "@/components/uploadthing"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function DropZone() {
  const router = useRouter()

  return (
    <UploadDropzone
      className="bg-slate-50"
      endpoint="fileUploader"
      onClientUploadComplete={() => {
        // Do something with the response
        router.refresh()
      }}
      onUploadError={(error: Error) => {
        toast.error(error.message)
      }}
    />
  )
}
