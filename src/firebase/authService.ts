import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail as firebaseResetPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "./firebaseInit";

export const register = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signIn = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signOut = async () => {
  firebaseSignOut(auth);
};

export const onAuthChanged = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

export const sendResetPasswordEmail = async (email: string) => {
  return await firebaseResetPassword(auth, email);
};

export const verifyUserEmail = async (user?: User | null) => {
  if (!user) user = auth.currentUser;
  if (user) return await sendEmailVerification(user);
  else
    throw { message: "User must be signed in", code: "auth/not-authenticated" };
};
