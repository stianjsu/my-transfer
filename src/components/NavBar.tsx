import Link from "next/link"
import { SignedIn, UserButton } from "@clerk/nextjs"

export default function Navbar() {
  return (
    <nav className="fixed left-0 top-0 z-50 flex h-16 w-full items-center border-b-2 border-slate-400 bg-slate-800">
      <div className="mx-auto flex size-full h-full max-w-[50rem] flex-row items-center justify-center px-5 sm:justify-start">
        <div className="hidden grow items-center sm:flex">
          <Link
            href={"/"}
            className="pl-4 text-2xl font-semibold hover:font-bold"
          >
            My-Transfer
          </Link>
        </div>
        <div className="flex h-full items-center justify-center">
          <Link
            href={"/"}
            className="flex h-full w-24 items-center justify-center hover:font-bold"
          >
            Home
          </Link>
        </div>
        <div className="flex h-full items-center justify-center">
          <Link
            href={"/about"}
            className="flex h-full w-24 items-center justify-center hover:font-bold"
          >
            About
          </Link>
        </div>

        <SignedIn>
          <div className="flex w-24 flex-1 items-center justify-end sm:flex-none sm:justify-center">
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </nav>
  )
}
