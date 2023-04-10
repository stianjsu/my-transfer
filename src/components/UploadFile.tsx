"use client";
import firebaseService from "@/firebase/storageService";
import { ChangeEvent, useState } from "react";

export default function UploadFile() {
  const [file, setFile] = useState<File>();
  const [errMsg, setErrMsg] = useState("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      let inpFile = e.target.files[0];
      if (inpFile.size > 100 * 1024 * 1024) {
        setErrMsg("Files cant be larger than 100 MB. Sorry");
        return;
      }
      setFile(inpFile);
    }
  };

  const uploadFile = async () => {
    if (!file) {
      setErrMsg("Please provide a file to upload");
      return;
    }
    if (file.size > 100 * 1024 * 1024) {
      setErrMsg("Files cant be larger than 100 MB. Sorry");
      return;
    }
    console.log(file.name);
    await firebaseService.uploadFile(file).catch((e) => {
      console.error(e);
      setErrMsg("Something went wrong when uploading");
    });
    setFile(undefined);
  };

  return (
    <>
      <div>
        <input type="file" onChange={handleFileChange} />
        <button
          className="h-12 bg-green-300 rounded-lg px-12 m-auto"
          onClick={uploadFile}
        >
          Upload
        </button>
      </div>
      {errMsg ? <div className="m-auto text-red-400">{errMsg}</div> : null}
    </>
  );
}
