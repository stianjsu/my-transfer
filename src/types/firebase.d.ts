import { Timestamp } from "firebase/firestore";
import { Auth } from "firebase/auth";

interface FileDataDoc {
  name: string;
  timeCreated: Date;
  sizeMB: number;
  validRef: boolean;
}

interface UserData {
  files: FileDataDoc[];
}

interface FileData extends FileDataDoc {
  downloadUrl: string;
}

interface FileService {
  uploadFile(auth: Auth, file: File): Promise<boolean>;
  getFiles(auth: Auth): Promise<FileData[]>;
}
