import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { api } from "@/utils/api";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { getLocalUser } from "@/utils/getLocalUser";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TRPCError } from "@trpc/server";
import { toastInstance } from "@/utils/toast";
import { handleError } from "@/utils/handleError";
import ReactLoading from "react-loading";
import { useRouter } from "next/router";
import { useLocalUser } from "@/hooks/useLocalUser";

const Home: NextPage = () => {
  const [url, setUrl] = useState<string | null>(null);

  const onCopy = () => {
    if (url) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          toastInstance({
            message: "Copied url to clipboard!",
            type: "success",
            position: "bottom-center",
          });
        })
        .catch(() => {
          toastInstance({
            message: "Failed to copy url to clipboard!",
            type: "error",
            position: "bottom-center",
          });
        });
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center p-5">
      <div className="text-center">
        <p className="text-3xl font-bold">TRIM</p>
        <p className="text-md">Shorter. Easier. Cleaner.</p>
      </div>
      <div className="mt-8 w-full max-w-2xl">
        <InputUrlForm setUrl={setUrl} />
      </div>
      {url && (
        <div className="mt-2 flex w-full max-w-2xl justify-between bg-slate-600 p-2">
          <p className="text-slate-300">{url}</p>
          <DocumentDuplicateIcon
            onClick={onCopy}
            className="h-6 w-6 text-slate-100 hover:cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};

type Inputs = {
  url: string;
  alias?: string;
};

const InputUrlForm = ({
  setUrl,
}: {
  setUrl: Dispatch<SetStateAction<string | null>>;
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const getBaseUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.origin.replace(/^https?\:\/\//i, "");
    }
  };

  const { mutate, data, isLoading, error } = api.url.create.useMutation({
    onSuccess: (data) => {
      console.log("onSuccess create url", data);
      const { alias, shortCode } = data;
      const short = !!shortCode ? shortCode : alias;
      console.log(short);
      setUrl(`${getBaseUrl()}/${short}`);
    },
    onError: (error) => {
      setUrl(null);
      const isInternalServerError =
        error.data?.code === "INTERNAL_SERVER_ERROR";
      if (isInternalServerError) {
        toastInstance({
          message: "Something went wrong! Please try again.",
          type: "error",
        });
        useLocalUser();
      } else {
        toastInstance({ message: error.message, type: "error" });
      }
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("onSubmit", data);

    mutate({
      url: data.url,
      alias: data.alias,
      luid: getLocalUser(),
    });
  };

  return (
    <div>
      <form className="flex rounded" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full flex-col rounded-l md:flex-row">
          <input
            id="url"
            placeholder="http://yourURL"
            className="w-full bg-white p-3 text-sm text-gray-900 outline-0 outline-slate-600 dark:bg-white dark:placeholder-slate-400"
            autoComplete="off"
            {...register("url", { required: "Please enter your URL" })}
          />
          <input
            id="alias"
            placeholder="Enter alias (Optional)"
            className="w-48 border-t border-slate-300 bg-white p-3 text-sm text-gray-900 outline-0 dark:bg-white dark:placeholder-slate-400 md:border-l-2 md:border-t-0"
            autoComplete="off"
            {...register("alias")}
          />
        </div>
        <button
          type="submit"
          className="flex h-11 w-28 items-center justify-center rounded-r bg-slate-200  text-slate-800 shadow-sm hover:bg-slate-300"
        >
          {isLoading ? (
            <ReactLoading type="spin" color="#000" height={22} width={22} />
          ) : (
            "Shorten!"
          )}
        </button>
      </form>
      {errors.url?.message && (
        <span className="text-xs text-red-400">{errors.url?.message}</span>
      )}
    </div>
  );
};

export default Home;
