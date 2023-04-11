"use client";
import { register, signIn } from "@/firebase/authService";
import { useState } from "react";

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
    await signIn(email, password).catch((err) => {
      console.error(err);
      setErrorMsg("Could not login");
    });
  };

  const signUp = async (email: string, password: string) => {
    await register(email, password).catch((err) => {
      console.error(err);
      setErrorMsg("Could not sign up");
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
      <div className="text-center w-full font-bold text-2xl mb-4">
        Loading...
      </div>
    );

  return (
    <>
      <div className="text-center w-full font-bold text-2xl mb-4">{view}</div>
      <div className="w-full h-full">
        <input
          type="text"
          name="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 h-12 pl-4 bg-slate-300 rounded-md text-slate-600 outline-none"
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 h-12 pl-4 bg-slate-300 rounded-md text-slate-600 outline-none"
        />
        <button
          className="h-8 bg-slate-900 rounded-md m-auto w-28 hover:font-bold"
          onClick={formSubmit}
        >
          {view}
        </button>
      </div>

      <button
        className="h-12 bg-slate-950 rounded-lg w-[10rem] m-auto hover:font-bold"
        onClick={toggleView}
      >
        Go to {view == "Login" ? "Signup" : "Login"}
      </button>
      {errorMsg ? <div className="m-auto text-red-400">{errorMsg}</div> : null}
    </>
  );
}
