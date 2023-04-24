"use client";
import FilesDisplay from "@/components/FilesDisplay";
import { LoadingSpinner } from "@/components/Icons";
import Login from "@/components/Login";
import Navbar from "@/components/NavBar";
import { onAuthChanged } from "@/firebase/authService";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

const Home = () => {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    let unsub = onAuthChanged((user) => {
      setUser(user);
    });
    return () => {
      unsub();
    };
  }, []);

  return (
    <>
      <Navbar />
      <main className="m-auto flex min-h-screen flex-col pt-24">
        {user === undefined ? (
          <div className="mb-4 flex h-[50vh] w-full items-center justify-center text-2xl font-bold">
            <LoadingSpinner size={64} />
          </div>
        ) : user ? (
          <FilesDisplay />
        ) : (
          <Login />
        )}
      </main>
      <Toaster position="bottom-center" />
    </>
  );
};

export default Home;
