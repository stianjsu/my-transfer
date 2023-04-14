import { onAuthChanged } from "@/firebase/authService";
import { FileData } from "@/types/firebase";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import firebaseService from "@/firebase/storageService";
import UploadFile from "./UploadFile";

const FileDisplay = ({ file }: { file: FileData }) => {
  return (
    <div>
      <p>{file.name}</p>
      <a className="text-xs" href={file.downloadUrl}>
        Download
      </a>
    </div>
  );
};

export default function FilesDisplay() {
  const [user, setUser] = useState<User | null>(null);
  const [files, setFiles] = useState<FileData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthChanged((user) => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    if (user) {
      setLoading(true);
      console.log("fetching files");
      firebaseService
        .getFiles()
        .then((files) => {
          setFiles(files);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } else if (files.length) {
      setLoading(false);
    }
  }, [user]);

  if (loading)
    return (
      <div className="text-center w-full font-bold text-2xl mb-4">
        Loading...
      </div>
    );

  return (
    <div>
      <UploadFile />
      <h1>Files Display</h1>
      {files.map((file, i) => {
        return <FileDisplay file={file} key={i} />;
      })}
    </div>
  );
}
