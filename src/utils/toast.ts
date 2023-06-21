import { toast } from "react-toastify";

interface Props {
  message: string;
  type: "success" | "error" | "info" | "warning";
}

export const toastInstance = ({ message, type }: Props) =>
  toast(message, {
    position: "top-right",
    type: type,
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
