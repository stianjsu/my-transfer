"use client";
import { verifyUserEmail } from "@/firebase/authService";
import type { User } from "firebase/auth";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { LoadingSpinner } from "./Icons";
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/navigation";

export default function VerifyPrompt({ user }: { user: User }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const resendVerification = async () => {
    setLoading(true);
    try {
      await verifyUserEmail();
      toast.success("An email has been sent to " + user.email);
    } catch (err) {
      let fbErr = err as FirebaseError;
      if (fbErr.code == "auth/too-many-requests") {
        toast.error("An email was just sent. Please check your inbox");
      } else {
        toast.error("Something went wrong when sending verification email");
      }
    }
    setLoading(false);
  };

  if (loading) {
    return <LoadingSpinner size={64} />;
  }

  return (
    <div className="mx-auto text-center">
      <p>An email verification has been sent to {user.email}</p>
      <p className="mt-4 text-lg font-normal">
        Please verify your email to use the application
      </p>
      <button
        className="mt-12 h-12 rounded-md bg-slate-900 px-4 text-lg font-normal hover:font-bold"
        onClick={resendVerification}
      >
        Resend verification
      </button>
      <p className="mt-16 text-lg font-normal">
        If you already verified your account, please refresh!{" "}
      </p>
      <button
        className="mt-8 h-12 rounded-md bg-slate-900 px-4 text-lg font-normal hover:font-bold"
        onClick={() => window.location.reload()}
      >
        Refresh
      </button>
    </div>
  );
}
