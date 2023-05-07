"use client";
import {
  register,
  sendResetPasswordEmail,
  signIn,
  verifyUserEmail,
} from "@/firebase/authService";
import { Dispatch, SetStateAction, useState } from "react";
import { LoadingSpinner } from "./Icons";
import toast from "react-hot-toast";
import { FirebaseError } from "firebase/app";

export default function Login() {
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState<[boolean, NodeJS.Timeout | null]>([
    false,
    null,
  ]);
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState<
    [boolean, NodeJS.Timeout | null]
  >([false, null]);
  const [password2, setPassword2] = useState("");

  const [view, setView] = useState<"Login" | "Signup">("Login");

  const [showResetPw, setShowResetPw] = useState(false);

  const [loading, setLoading] = useState(false);

  const formSubmit = async () => {
    setLoading(true);
    let method = view == "Login" ? login : signUp;
    await method(email, password);
    setLoading(false);
  };

  const setInputErr = (
    err: [boolean, NodeJS.Timeout | null],
    setter: Dispatch<SetStateAction<[boolean, NodeJS.Timeout | null]>>
  ) => {
    if (err[1]) {
      clearTimeout(err[1]);
    }
    let dispatchId = setTimeout(() => {
      setter([false, null]);
    }, 7000);
    setter([true, dispatchId]);
  };

  const login = async (email: string, password: string) => {
    await signIn(email, password).catch((err: FirebaseError) => {
      if (err.code == "auth/invalid-email") {
        toast.error("No user exists with this email");
        setInputErr(emailErr, setEmailErr);
      } else if (err.code == "auth/wrong-password") {
        toast.error("Wrong password!");
        setInputErr(passwordErr, setPasswordErr);
      } else if (err.code == "auth/too-many-requests") {
        toast.error(
          "This account has been disabled due to too many failed login-attempts. Please reset your password"
        );
        setShowResetPw(true);
        setInputErr(emailErr, setEmailErr);
        setInputErr(passwordErr, setPasswordErr);
      } else {
        console.log(err);
        toast.error("Something went wrong");
      }
    });
  };

  const signUp = async (email: string, password: string) => {
    if (password !== password2) {
      toast.error("The passwords must match!");
      setInputErr(passwordErr, setPasswordErr);
      return;
    }
    let user = await register(email, password).catch((err: FirebaseError) => {
      if (err.code == "auth/invalid-email") {
        setInputErr(emailErr, setEmailErr);
        toast.error("Please provide a valid email");
      } else if (err.code == "auth/missing-password") {
        setInputErr(passwordErr, setPasswordErr);
        toast.error("Please provide a password");
      } else {
        setInputErr(emailErr, setEmailErr);
        setInputErr(passwordErr, setPasswordErr);
        toast.error("Something went wrong when signing up");
      }
    });
    if (user)
      await verifyUserEmail(user.user).catch((err) =>
        toast.error("Something went wrong when sending verification email")
      );
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    let hasErr = false;
    await sendResetPasswordEmail(email).catch((err) => {
      hasErr = true;
      if (err.code == "auth/invalid-email") {
        setInputErr(emailErr, setEmailErr);
        toast.error("Please provide a valid email");
      } else if (err.code == "auth/user-not-found") {
        toast.error("No user exists with this email");
        setInputErr(emailErr, setEmailErr);
      } else {
        setInputErr(emailErr, setEmailErr);
        toast.error("Something went wrong when sending reset password email");
      }
    });
    if (!hasErr) {
      setShowResetPw(false);
      toast.success("A reset password email was sent to " + email);
    }
    setLoading(false);
  };

  if (loading)
    return (
      <div className="mb-4 flex h-[50vh] w-full items-center justify-center text-2xl font-bold">
        <LoadingSpinner size={64} />
      </div>
    );

  return (
    <>
      <div className="my-14 flex w-full justify-around">
        <button
          className={
            "h-20 w-[45%] rounded-lg border-slate-200 text-2xl transition  " +
            (view == "Login"
              ? "border-b-2 font-bold"
              : "border-slate-500 hover:border-b")
          }
          onClick={() => {
            setView("Login");
            setShowResetPw(false);
          }}
        >
          Login
        </button>
        <button
          className={
            "h-20 w-[45%] rounded-lg border-slate-200 text-2xl transition " +
            (view == "Signup"
              ? "border-b-2 font-bold"
              : "border-slate-500 hover:border-b")
          }
          onClick={() => setView("Signup")}
        >
          Signup
        </button>
      </div>
      <div className="h-full w-full">
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={
            "mb-6 h-12 w-full rounded-md border-red-500 bg-slate-300 pl-4 text-slate-600 outline-none " +
            (emailErr[0] ? "border-2" : null)
          }
        />
        {!showResetPw && (
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={
              "mb-4 h-12 w-full rounded-md border-red-500 bg-slate-300 pl-4 text-slate-600 outline-none " +
              (passwordErr[0] ? "border-2" : null)
            }
          />
        )}
        {view == "Signup" && (
          <input
            type="password"
            name="password"
            placeholder="Repeat Password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            className={
              "mb-6 h-12 w-full rounded-md border-red-500 bg-slate-300 pl-4 text-slate-600 outline-none " +
              (passwordErr[0] ? "border-2" : null)
            }
          />
        )}
        <div className="flex w-full flex-wrap justify-around gap-1">
          {showResetPw && view == "Login" ? (
            <>
              <button
                className="h-12 w-28 rounded-md bg-slate-900 px-4 hover:font-bold"
                onClick={() => setShowResetPw(false)}
              >
                Cancel
              </button>
              <button
                className="h-12 rounded-md bg-slate-900 px-4 hover:font-bold"
                onClick={() => resetPassword(email)}
              >
                Reset Password
              </button>
            </>
          ) : (
            <>
              <button
                className="h-12 w-28 rounded-md bg-slate-900 hover:font-bold"
                onClick={formSubmit}
              >
                {view}
              </button>
              {view != "Signup" && (
                <button
                  className="h-12 rounded-md bg-slate-900 px-4 hover:font-bold"
                  onClick={() => setShowResetPw(true)}
                >
                  Reset Password
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
