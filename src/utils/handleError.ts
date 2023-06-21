import { TRPCClientErrorLike } from "@trpc/client";
import { TRPC_ERROR_CODE_KEY } from "@trpc/server/rpc";
import { toastInstance } from "./toast";

export const handleError = (error: {
  message: string;
  data: {
    code: TRPC_ERROR_CODE_KEY;
  };
}) => {
  const isInternalServerError = error.data?.code === "INTERNAL_SERVER_ERROR";
  if (isInternalServerError) {
    toastInstance({ message: "Something went wrong.", type: "error" });
  } else {
    toastInstance({ message: error.message, type: "error" });
  }
};
