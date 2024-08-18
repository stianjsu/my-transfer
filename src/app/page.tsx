import FilesDisplay from "@/components/FilesDisplay"
import Navbar from "@/components/NavBar"
import { db } from "../server/db"

const Home = async () => {
  const uplodedFiles = await db.query.posts.findMany()

  return (
    <>
      <Navbar />
      <main className="m-auto flex min-h-screen flex-col pt-24">
        <FilesDisplay />
        {uplodedFiles.map((file) => {
          return (
            <div key={file.id}>
              {file.name}
              {file.id}
            </div>
          )
        })}
      </main>
    </>
  )
}

export default Home
