import Link from "next/link"
import { SignedIn, UserButton } from "@clerk/nextjs"

export default function Navbar() {
  return (
    <nav className="fixed left-0 top-0 flex h-16 w-full border-b-2 border-slate-400 bg-slate-800">
      <div className="mx-auto flex size-full max-w-[50rem] flex-row justify-around px-5 sm:justify-normal">
        <div className="hidden grow items-center sm:flex">
          <Link href={"/"}>
            <span className="pl-4 text-2xl font-semibold hover:font-bold">
              My-Transfer
            </span>
          </Link>
        </div>
        <div className="flex items-center">
          <Link href={"/"} className="h-full">
            <button className={"h-full w-24 hover:font-bold"}>Home</button>
          </Link>
        </div>
        <div className="flex items-center">
          <Link href={"/about"} className="h-full">
            <button className={"h-full w-24 hover:font-bold"}>About</button>
          </Link>
        </div>

        <SignedIn>
          <div className="flex h-full w-24 items-center justify-center">
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </nav>
  )
}
