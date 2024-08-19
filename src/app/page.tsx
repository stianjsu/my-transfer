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
        {/* <img
          src={FILE_URL + "/913c73dd-5348-4f30-9a8a-7e5bb25d2f7d-smowyx.jpg"}
        /> */}
        {uplodedFiles.map((file) => {
          return (
            <div key={file.key}>
              {file.name}
              {file.key}
            </div>
          )
        })}
      </main>
    </>
  )
}

export default Home
