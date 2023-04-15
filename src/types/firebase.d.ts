import { Timestamp } from "firebase/firestore";
import { Auth } from "firebase/auth";
import { StorageReference, UploadResult } from "firebase/storage";

interface FileDataDoc {
  name: string;
  timeCreated: Date;
  sizeBytes: number;
  validRef: boolean;
}

interface UserData {
  files: FileDataDoc[];
}

interface FileData extends FileDataDoc {
  downloadUrl: string;
}

interface FileService {
  uploadFile(file: File): Promise<UploadResult>;
  getFiles(): Promise<FileData[]>;
  getFile(ref: StorageReference): Promise<FileData>;
}
