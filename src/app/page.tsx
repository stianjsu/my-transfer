import FilesDisplay from "@/components/FilesDisplay"
import { LoadingSpinner } from "@/components/Icons"
import Navbar from "@/components/NavBar"

const Home = () => {
  return (
    <>
      <Navbar />
      <main className="m-auto flex min-h-screen flex-col pt-24">
        <div className="mb-4 flex h-[50vh] w-full items-center justify-center text-2xl font-bold">
          <LoadingSpinner size={64} />
        </div>

        <FilesDisplay />
      </main>
    </>
  )
}

export default Home
