import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { api } from "@/utils/api";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { getLocalUser } from "@/utils/getLocalUser";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TRPCError } from "@trpc/server";
import { toastInstance } from "@/utils/toast";
import { handleError } from "@/utils/handleError";
import ReactLoading from "react-loading";

const Home: NextPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center p-5">
      <div className="text-center">
        <p className="text-3xl font-bold">TRIM</p>
        <p className="text-md">Shorter. Easier. Cleaner.</p>
      </div>
      <div className="mt-8 w-full max-w-xl">
        <InputUrlForm />
      </div>
      <div className="mt-2 flex w-full max-w-xl justify-between bg-slate-600 p-2">
        <p className="text-slate-300">Hey this is your url copy it</p>
        <DocumentDuplicateIcon
          onClick={() => {
            console.log("Do copy");
          }}
          className="h-6 w-6 text-slate-100 hover:cursor-pointer"
        />
      </div>
    </div>
  );
};

type Inputs = {
  url: string;
};

const InputUrlForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const { mutate, data, isLoading, error } = api.url.create.useMutation({
    onSuccess: (data) => {
      console.log("onSuccess create url", data?.shortCode);
    },
    onError: handleError,
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate({
      url: data.url,
      luid: getLocalUser(),
    });
  };

  return (
    <div>
      <form
        className="flex rounded bg-slate-100"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          id="first_name"
          placeholder="http://yourURL"
          className="block w-full rounded-l bg-white p-2.5 text-sm text-gray-900  outline-0 outline-slate-600 dark:bg-white dark:placeholder-slate-400"
          autoComplete="off"
          {...register("url", { required: "Please enter your URL" })}
        />
        <button
          type="submit"
          className="flex w-24 items-center justify-center rounded-r bg-slate-100 px-3.5 py-2.5 text-slate-800 shadow-sm hover:bg-slate-200"
        >
          {isLoading ? (
            <ReactLoading type="spin" color="#000" height={20} width={20} />
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
