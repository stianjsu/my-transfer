/* import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseInit";
import { Auth } from "firebase/auth";
import { UserData } from "@/types/firebase";

export const getFilesDataFromUser = async (auth: Auth) => {
  if (!auth.currentUser) throw Error("User must be signed in");

  const docRef = doc(db, "UserData", auth.currentUser.uid);
  const userData = (await getDoc(docRef)).data() as UserData;

  return userData.files;
}; */
