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
      <main className="flex min-h-screen flex-col items-center pt-24 m-auto">
        {user === undefined ? (
          <div className="flex justify-center items-center w-full h-[50vh] font-bold text-2xl mb-4">
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
