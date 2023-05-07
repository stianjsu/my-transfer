import { onAuthChanged } from "@/firebase/authService";
import { FileData } from "@/types/firebase";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import firebaseService, { dummydata, getFile } from "@/firebase/storageService";
import UploadFile from "./UploadFile";
import { Download, LoadingSpinner, RefreshIcon } from "./Icons";
import { fileSizeConverter } from "@/firebase/util";
import { UploadResult } from "firebase/storage";
import { toast } from "react-hot-toast";
import VerifyPrompt from "./VerifyPrompt";

const FileDisplay = ({ file }: { file: FileData }) => {
  return (
    <div className="flex h-24 w-full flex-row items-center gap-4 rounded-lg bg-slate-900 p-2 sm:h-20 ">
      <span className="line-clamp-3 grow break-words text-sm sm:line-clamp-3 sm:text-base">
        {file.name}
      </span>

      <div className="flex min-w-[85px] flex-col text-sm">
        <span>
          {/* Uploaded:{" "} */}
          {file.timeCreated.toLocaleDateString("no", { dateStyle: "short" })}
        </span>
        <span>Size: {fileSizeConverter(file.sizeBytes)}</span>
        <span>Type: {file.name.split(".")[1].toUpperCase()}</span>
      </div>
      <div className="h-12 w-12 min-w-max">
        <a
          href={file.downloadUrl}
          target="_blank"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-300 transition ease-in-out hover:bg-slate-500"
        >
          <Download size={30} />
        </a>
      </div>
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

  const refetchFiles = async () => {
    setLoading(true);
    let files = await firebaseService.getFiles().catch(() => {
      setLoading(false);
      toast.error("Failed to get your files 😢");
    });
    if (files) setFiles(files);
    setUploadedFiles([]);
    setLoading(false);
  };

  const fileUploaded = async (result: UploadResult) => {
    const newFile = await getFile(result.ref).catch(() => {
      toast.error("Failed to get your uploaded file. Please refresh");
    });
    if (newFile) setUploadedFiles((prev) => [newFile, ...prev]);
  };

  if (user?.emailVerified == false) {
    return (
      <div className="mb-4 flex h-[50vh] w-full items-center justify-center text-2xl font-bold">
        <VerifyPrompt user={user} />
      </div>
    );
  }

  return (
    <>
      <UploadFile fileUploaded={fileUploaded} />

      {loading ? (
        <div className="mb-4 flex h-[50vh] w-full items-center justify-center text-2xl font-bold">
          <LoadingSpinner size={64} />
        </div>
      ) : (
        <>
          <div className="my-6 flex w-full items-center justify-end gap-2 align-middle">
            <span>Refresh</span>
            <div
              className="mr-6 cursor-pointer rounded-lg bg-slate-900 p-2 hover:bg-slate-700"
              onClick={refetchFiles}
            >
              <RefreshIcon size={28} />
            </div>
          </div>
          <div className="flex w-full flex-col gap-2">
            {[...uploadedFiles, ...files]
              .sort((a, b) => b.timeCreated.getTime() - a.timeCreated.getTime())
              .map((file, i) => {
                return <FileDisplay file={file} key={i} />;
              })}
          </div>
        </>
      )}
    </>
  );
}
