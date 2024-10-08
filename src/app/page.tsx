import { FileDisplay } from "@/components/FilesDisplay"
import { db } from "../server/db"
import { FILE_URL } from "@/components/uploadthing"
import { DropZone } from "@/components/Dropzone"
import { auth } from "@clerk/nextjs/server"

const Home = async () => {
  const session = auth()

  if (!session || !session.userId) return session.redirectToSignIn()

  const uplodedFiles = await db.query.uploadedFilesTable.findMany({
    where: (files, { eq }) => eq(files.userId, session.userId),
  })

  return (
    <main className="m-auto flex min-h-screen flex-col gap-4 pt-24">
      <DropZone />
      <div className="flex w-full flex-col gap-2">
        {uplodedFiles.map((file) => {
          return (
            <FileDisplay
              key={file.key}
              name={file.name}
              downloadUrl={FILE_URL + file.key}
              timeCreated={file.createdAt}
              size={file.size}
            />
          )
        })}
      </div>
    </main>
  )
}

export default Home
