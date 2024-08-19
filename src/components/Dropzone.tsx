"use client"

import { UploadDropzone } from "@/components/uploadthing"

export default function DropZone() {
  return (
    <UploadDropzone
      className="bg-slate-50"
      endpoint="fileUploader"
      onClientUploadComplete={(res) => {
        // Do something with the response
        console.log("Files: ", res)
        alert("Upload Completed")
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`)
      }}
    />
  )
}
