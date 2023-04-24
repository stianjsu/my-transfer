"use client";
import { onAuthChanged, signOut } from "@/firebase/authService";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);

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
    toast.success("Signed out");
  };

  return (
    <nav className="fixed left-0 top-0 flex h-16 w-full border-b-2 border-slate-400">
      <div className="mx-auto flex h-full w-full max-w-[50rem] flex-row px-5">
        <div className="flex grow items-center">
          <Link href={"/"}>
            <span className="pl-4 text-2xl font-semibold hover:font-bold">
              My-Transfer
            </span>
          </Link>
        </div>
        <div className="flex items-center">
          <Link href={"/about"}>
            <button className="h-3/4 w-20 hover:font-bold">About</button>
          </Link>
        </div>

        {!!user && (
          <div className="flex items-center">
            <button
              className="h-3/4 w-20 hover:font-bold"
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
