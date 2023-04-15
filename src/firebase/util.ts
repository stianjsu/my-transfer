import { AuthError } from "firebase/auth";
import { FirestoreError } from "firebase/firestore";

export const fileSizeConverter: (size: number) => string = (size) => {
  const sizeOrders = ["bytes", "KB", "MB", "GB"];
  let order = Math.floor(Math.log10(size) / 3);

  return `${(size / 1024 ** order).toFixed(1)} ${sizeOrders[order]}`;
};

interface FormattedError {
  messageToUser: string;
  title: string;
}

const formatFirebaseErrors: (
  error: AuthError | FirestoreError
) => FormattedError = (error) => {
  return {
    messageToUser: error.message,
    title: error.name,
  };
};
