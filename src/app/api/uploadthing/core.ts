import { db } from "@/server/db"
import { uploadedFilesTable } from "@/server/db/schema"
import { createUploadthing, type FileRouter } from "uploadthing/next"
import { UploadThingError } from "uploadthing/server"
import { auth } from "@clerk/nextjs/server"

const f = createUploadthing()

// FileRouter for your app, can contain multiple FileRoutes
export const utFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  fileUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async (/* { req } */) => {
      // This code runs on your server before upload
      const user = auth()

      // If you throw, the user will not be able to upload
      if (!user || !user.userId) throw new UploadThingError("Unauthorized")

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.userId }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId)

      console.log("file url", file.url)

      await db.insert(uploadedFilesTable).values({
        key: file.key,
        name: file.name,
        size: file.size,
        userId: metadata.userId,
      })
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
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
