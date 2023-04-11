"use client";
import FilesDisplay from "@/components/FilesDisplay";
import Login from "@/components/Login";
import Navbar from "@/components/NavBar";
import { onAuthChanged } from "@/firebase/authService";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";

const Home = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthChanged((user) => {
      setUser(user);
    });
  }, []);

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between pt-24 m-auto">
        {user ? <FilesDisplay /> : <Login />}
      </main>
    </>
  );
};

export default Home;
