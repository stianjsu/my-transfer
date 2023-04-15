"use client";
import firebaseService from "@/firebase/storageService";
import { ChangeEvent, useState } from "react";
import { LoadingSpinner } from "./Icons";
import { UploadResult } from "firebase/storage";
import { toast } from "react-hot-toast";

export default function UploadFile({
  fileUploaded,
}: {
  fileUploaded: (result: UploadResult) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [errMsg, setErrMsg] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      let inpFile = e.target.files[0];
      if (inpFile.size > 100 * 1024 * 1024) {
        toast.error("Files cant be larger than 100 MB. Sorry");
        return;
      }
      setFile(inpFile);
    }
  };

  const uploadFile = async () => {
    if (!file) {
      toast.error("Please provide a file to upload");
      return;
    }
    if (file.size > 100 * 1024 * 1024) {
      toast.error("Files cant be larger than 100 MB. Sorry");
      return;
    }
    setUploading(true);
    let uploadResult = await firebaseService.uploadFile(file).catch((e) => {
      console.error(e);
      toast.error("Failed to upload file 😢");
    });

    setUploading(false);
    if (uploadResult) {
      setFile(null);
      fileUploaded(uploadResult);
    }
  };

  return (
    <div className="flex w-full">
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-slate-200  hover:bg-gray-100"
        >
          {uploading ? (
            <LoadingSpinner size={32} />
          ) : (
            <>
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 font-semibold">
                  {file ? (
                    <span>{file.name}</span>
                  ) : (
                    <>
                      <span>Click to upload</span> or drag and drop
                    </>
                  )}
                </p>
                {file ? (
                  <button
                    onClick={uploadFile}
                    className="text-xs h-6 mt-1 bg-slate-800 rounded-md m-auto w-28 hover:font-bold"
                  >
                    Upload file
                  </button>
                ) : (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Max 100 MB
                  </p>
                )}
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </>
          )}
        </label>
      </div>
      {errMsg ? <div className="m-auto text-red-400">{errMsg}</div> : null}
    </div>
  );
}
