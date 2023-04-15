import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
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
