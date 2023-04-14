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

export const dummydata = [
  {
    name: "file1.png",
    sizeMB: 123123,
    timeCreated: new Date(Date.now()),
    downloadUrl: "http://localhost:3000",
    validRef: true,
  },
  {
    name: "file2.jpg",
    sizeMB: 123123,
    timeCreated: new Date(Date.now()),
    downloadUrl: "http://localhost:3000",
    validRef: true,
  },
  {
    name: "file3.docx",
    sizeMB: 123123,
    timeCreated: new Date(Date.now()),
    downloadUrl: "http://localhost:3000",
    validRef: true,
  },
  {
    name: "file4.zip",
    sizeMB: 123123,
    timeCreated: new Date(Date.now()),
    downloadUrl: "http://localhost:3000",
    validRef: true,
  },
];
