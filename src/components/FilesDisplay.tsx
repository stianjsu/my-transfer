import { onAuthChanged } from "@/firebase/authService";
import { FileData } from "@/types/firebase";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import firebaseService, { dummydata, getFile } from "@/firebase/storageService";
import UploadFile from "./UploadFile";
import { Download, LoadingSpinner } from "./Icons";
import { fileSizeConverter } from "@/firebase/util";
import { UploadResult } from "firebase/storage";
import { toast } from "react-hot-toast";
import { FirebaseError } from "firebase/app";

const FileDisplay = ({ file }: { file: FileData }) => {
  return (
    <div className="flex w-full flex-row items-center gap-4 rounded-lg bg-slate-900 p-2">
      <span className="grow">{file.name}</span>
      <div className="flex flex-col text-sm">
        <span>Size: {fileSizeConverter(file.sizeBytes)}</span>
        <span>
          Uploaded:{" "}
          {file.timeCreated.toLocaleDateString("no", { dateStyle: "short" })}
        </span>
      </div>
      <a href={file.downloadUrl} target="_blank" className="h-12 w-12">
        <div className="flex h-full w-full items-center justify-center rounded-full border border-slate-300 transition ease-in-out hover:bg-slate-500">
          <Download size={30} />
        </div>
      </a>
    </div>
  );
};

export default function FilesDisplay() {
  const [user, setUser] = useState<User | null>(null);
  const [files, setFiles] = useState<FileData[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<FileData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsub = onAuthChanged((user) => {
      setUser(user);
    });
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    if (user) {
      setLoading(true);
      firebaseService
        .getFiles()
        .then((files) => {
          setFiles(files);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          toast.error("Failed to get your files 😢");
        });
    } else if (files.length) {
      setLoading(false);
    }
  }, [user]);

  const fileUploaded = async (result: UploadResult) => {
    const newFile = await getFile(result.ref).catch(() => {
      toast.error("Failed to get your uploaded file. Please refresh");
    });
    if (newFile) setUploadedFiles((prev) => [newFile, ...prev]);
  };

  if (loading)
    return (
      <div className="mb-4 flex h-[50vh] w-full items-center justify-center text-2xl font-bold">
        <LoadingSpinner size={64} />
      </div>
    );

  return (
    <>
      <UploadFile fileUploaded={fileUploaded} />
      <div className="mt-8 flex w-full flex-col gap-2">
        {uploadedFiles.map((file, i) => {
          return <FileDisplay file={file} key={i} />;
        })}
        {files.map((file, i) => {
          return <FileDisplay file={file} key={i} />;
        })}
      </div>
    </>
  );
}
