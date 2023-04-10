import { onAuthChanged } from "@/firebase/authService";
import { FileData } from "@/types/firebase";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import firebaseService from "@/firebase/storageService";

export default function FilesDisplay() {
  const [user, setUser] = useState<User | null>(null);
  const [files, setFiles] = useState<FileData[]>([]);

  useEffect(() => {
    onAuthChanged((user) => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    if (user) {
      console.log("fetching files");
      firebaseService.getFiles().then((files) => {
        setFiles(files);
      });
    } else console.log("Not fetching");
  }, [user]);

  return (
    <div>
      <h1>Files Display</h1>
      {files.map((file, i) => {
        return (
          <div key={file.name + i}>
            <p>{file.name}</p>
            <a className="text-xs" href={file.downloadUrl}>
              Download
            </a>
          </div>
        );
      })}
    </div>
  );
}
