import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react"
import { env } from "@/env"

import type { UtFileRouter } from "@/app/api/uploadthing/core"

export const UploadButton = generateUploadButton<UtFileRouter>()
export const UploadDropzone = generateUploadDropzone<UtFileRouter>()

export const FILE_URL = `https://utfs.io/a/${env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/`
