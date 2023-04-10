"use client";
import { register, signIn } from "@/firebase/authService";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [view, setView] = useState<"Login" | "Signup">("Login");

  const formSubmit = () => {
    let method = view == "Login" ? login : signUp;
    method(email, password);
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
    let newView = (view == "Login" ? "signup" : "login") as "Login" | "Signup";
    setView(newView);
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div className="text-center w-full font-bold text-2xl">{view}</div>
      <div className="w-full h-full max-w-xl">
        <input
          type="text"
          name="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full my-1 h-12"
        />
        <input
          type="text"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full my-1 h-12"
        />
        <button
          className="h-12 bg-green-300 rounded-lg px-12 m-auto"
          onClick={formSubmit}
        >
          {view}
        </button>
      </div>

      <button
        className="h-12 bg-green-300 rounded-lg px-12 m-auto"
        onClick={toggleView}
      >
        Go to {view == "Login" ? "Signup" : "Login"}
      </button>
      {errorMsg ? <div className="m-auto text-red-400">{errorMsg}</div> : null}
    </>
  );
}
