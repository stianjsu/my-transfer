"use client";
import { register, signIn } from "@/firebase/authService";
import { useState } from "react";
import { LoadingSpinner } from "./Icons";
import toast from "react-hot-toast";
import { FirebaseError } from "firebase/app";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [view, setView] = useState<"Login" | "Signup">("Login");

  const [loading, setLoading] = useState(false);

  const formSubmit = async () => {
    setLoading(true);
    let method = view == "Login" ? login : signUp;
    await method(email, password);
    setLoading(false);
  };

  const login = async (email: string, password: string) => {
    await signIn(email, password).catch((err: FirebaseError) => {
      if (err.code == "auth/invalid-email")
        toast.error("No user exists with this email");
      else if (err.code == "auth/wrong-password")
        toast.error("Wrong password!");
      else toast.error("Something went wrong");
    });
  };

  const signUp = async (email: string, password: string) => {
    await register(email, password).catch((err: FirebaseError) => {
      if (err.code == "auth/invalid-email")
        toast.error("Please provide a valid email");
      else if (err.code == "auth/missing-password")
        toast.error("Please provide a password");
      else toast.error("Something went wrong when signing up");
    });
  };

  const toggleView = () => {
    let newView = (view == "Login" ? "Signup" : "Login") as "Login" | "Signup";
    setView(newView);
    setEmail("");
    setPassword("");
  };

  if (loading)
    return (
      <div className="mb-4 flex h-[50vh] w-full items-center justify-center text-2xl font-bold">
        <LoadingSpinner size={64} />
      </div>
    );

  return (
    <>
      <div className="mb-4 w-full text-center text-2xl font-bold">{view}</div>
      <div className="h-full w-full">
        <input
          type="text"
          name="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 h-12 w-full rounded-md bg-slate-300 pl-4 text-slate-600 outline-none"
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6 h-12 w-full rounded-md bg-slate-300 pl-4 text-slate-600 outline-none"
        />
        <button
          className="m-auto h-8 w-28 rounded-md bg-slate-900 hover:font-bold"
          onClick={formSubmit}
        >
          {view}
        </button>
      </div>

      <button
        className="m-auto h-12 w-[10rem] rounded-lg bg-slate-950 hover:font-bold"
        onClick={toggleView}
      >
        Go to {view == "Login" ? "Signup" : "Login"}
      </button>
      {errorMsg ? <div className="m-auto text-red-400">{errorMsg}</div> : null}
    </>
  );
}
