import { FileDisplay } from "@/components/FilesDisplay"
import { db } from "../server/db"
import { FILE_URL } from "@/components/uploadthing"
import { DropZone } from "@/components/Dropzone"
import { auth } from "@clerk/nextjs/server"
import { SelectMultipleProvider } from "@/components/selectMultiple/SelectMutipleContext"
import { SelectionWrapper } from "@/components/selectMultiple/SelectWrapper"
import { SelectMultipleBar } from "@/components/selectMultiple/SelectMultipleBar"

const Home = async () => {
  const session = await auth()

  if (!session || !session.userId) return session.redirectToSignIn()

  const uplodedFiles = await db.query.uploadedFilesTable.findMany({
    where: (files, { eq }) => eq(files.userId, session.userId),
  })

  return (
    <SelectMultipleProvider>
      <main className="m-auto flex min-h-screen flex-col gap-4 pb-12 pt-24">
        <DropZone />
        <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(300px,1fr))] justify-center gap-4">
          {uplodedFiles.map((file) => {
            return (
              <SelectionWrapper
                key={file.key}
                fileKey={file.key}
                fileName={file.name}
              >
                <FileDisplay
                  key={file.key}
                  name={file.name}
                  downloadUrl={FILE_URL + file.key}
                  timeCreated={file.createdAt}
                  size={file.size}
                />
              </SelectionWrapper>
            )
          })}
        </div>
        <SelectMultipleBar />
      </main>
    </SelectMultipleProvider>
  )
}

export default Home
