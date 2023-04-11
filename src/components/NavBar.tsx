"use client";
import {
  onAuthChanged,
  register,
  signIn,
  signOut,
} from "@/firebase/authService";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthChanged((user) => {
      setUser(user);
    });
  }, []);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="flex fixed top-0 left-0 w-full h-16 border-b-2 border-slate-400">
      <div className="flex flex-row h-full w-full max-w-xl mx-auto">
        <div className="flex items-center grow">
          <Link href={"/"}>
            <span className="font-semibold text-2xl pl-4">My-transfer</span>
          </Link>
        </div>
        <div className="flex items-center">
          <Link href={"/about"}>
            <button
              className="w-20 h-3/4 hover:font-bold"
              onClick={handleSignOut}
            >
              About
            </button>
          </Link>
        </div>

        {!!user && (
          <div className="flex items-center">
            <button
              className="w-20 h-3/4 hover:font-bold"
              onClick={handleSignOut}
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
