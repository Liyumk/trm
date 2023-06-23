import { toast } from "react-toastify";

interface Props {
  message: string;
  type: "success" | "error" | "info" | "warning";
  position?:
    | "top-right"
    | "top-center"
    | "top-left"
    | "bottom-right"
    | "bottom-center"
    | "bottom-left";
}

export const toastInstance = ({ message, type, position }: Props) =>
  toast(message, {
    toastId: message,
    position: position ? position : "top-right",
    type: type,
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
