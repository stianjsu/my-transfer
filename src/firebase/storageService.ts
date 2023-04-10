import { FileService } from "@/types/firebase";
import { Auth, User, getAuth } from "firebase/auth";
import { storage } from "./firebaseInit";
import {
  ref,
  listAll,
  getMetadata,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";

const getFiles = async () => {
  //const filesDataDocs = await getFilesDataFromUser(auth);
  const auth = getAuth();
  if (!auth.currentUser) throw Error("User must be logged in");
  const userStorageRef = ref(storage, "files/" + auth.currentUser.uid);

  const userFilesRefs = (await listAll(userStorageRef)).items;
  const fileMetaData = await Promise.all(
    userFilesRefs.map(async (fileRef) => {
      return {
        ...(await getMetadata(fileRef)),
        url: await getDownloadURL(fileRef),
      };
    })
  );

  return fileMetaData.map((file) =>
    (({ name, size, timeCreated, url }) => ({
      name,
      sizeMB: size,
      timeCreated: new Date(timeCreated),
      downloadUrl: url,
      validRef: true,
    }))(file)
  );
};

const uploadFile = async (file: File) => {
  const auth = getAuth();

  if (!auth.currentUser) throw Error("User must be logged in");

  const storageRef = ref(
    storage,
    "files/" + auth.currentUser.uid + "/" + file.name
  );
  const uploadResult = await uploadBytes(storageRef, file);
  return !!uploadResult;
};

const firebaseService: FileService = {
  getFiles,
  uploadFile,
};

export default firebaseService;
