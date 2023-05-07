"use client";
import { onAuthChanged, signOut } from "@/firebase/authService";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const pathName = usePathname();

  useEffect(() => {
    let unsub = onAuthChanged((user) => {
      setUser(user);
    });
    return () => {
      unsub();
    };
  }, []);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    toast.success("Signed out");
  };

  return (
    <nav className="fixed left-0 top-0 flex h-16 w-full border-b-2 border-slate-400 bg-slate-800">
      <div className="mx-auto flex h-full w-full max-w-[50rem] flex-row justify-around px-5 sm:justify-normal">
        <div className="hidden grow items-center sm:flex">
          <Link href={"/"}>
            <span className="pl-4 text-2xl font-semibold hover:font-bold">
              My-Transfer
            </span>
          </Link>
        </div>
        <div className="flex items-center">
          <Link href={"/"} className="h-full">
            <button
              className={
                "h-full w-24 hover:font-bold " +
                (pathName == "/" ? " border-b-2 font-bold" : "")
              }
            >
              Home
            </button>
          </Link>
        </div>
        <div className="flex items-center">
          <Link href={"/about"} className="h-full">
            <button
              className={
                "h-full w-24 hover:font-bold " +
                (pathName == "/about" ? "border-b-2 font-bold" : "")
              }
            >
              About
            </button>
          </Link>
        </div>

        {!!user && (
          <div className="flex items-center">
            <button
              className="h-full w-24 hover:font-bold"
              onClick={handleSignOut}
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
