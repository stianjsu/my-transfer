import { db } from "@/server/db"
import { uploadedFilesTable } from "@/server/db/schema"
import { createUploadthing, type FileRouter } from "uploadthing/next"
import { UploadThingError } from "uploadthing/server"
import { auth } from "@clerk/nextjs/server"

const f = createUploadthing()

const FILE_TYPE_OPTIONS = {
  maxFileSize: "128MB",
  maxFileCount: 10,
} as const

const ALLOWED_FILE_TYPES = [
  "image",
  "video",
  "audio",
  "pdf",
  "text",
  "blob",
] as const

const FILE_UPLOAD_CONFIG = ALLOWED_FILE_TYPES.reduce(
  (acc, item) => ((acc[item] = FILE_TYPE_OPTIONS), acc),
  {} as Record<(typeof ALLOWED_FILE_TYPES)[number], typeof FILE_TYPE_OPTIONS>,
)

export const utFileRouter = {
  fileUploader: f(FILE_UPLOAD_CONFIG)
    .middleware(async ({ files }) => {
      const user = await auth()
      if (!user || !user.userId) throw new UploadThingError("Unauthorized")

      const totalSize = files.reduce((acc, next) => acc + next.size, 0)
      if (totalSize > 128 * 10 ** 6)
        throw new UploadThingError("Total File size cannot exceed 128MB")

      return { userId: user.userId }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId)

      await db.insert(uploadedFilesTable).values({
        key: file.key,
        name: file.name,
        size: file.size,
        userId: metadata.userId,
      })

      return {
        uploadedBy: metadata.userId,
        file: {
          key: file.key,
          name: file.name,
          size: file.size,
          userId: metadata.userId,
        },
      }
    }),
} satisfies FileRouter

export type UtFileRouter = typeof utFileRouter
