import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { api } from "@/utils/api";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { useLocalUser } from "@/hooks/useLocalUser";

const Home: NextPage = () => {
  const { luid } = useLocalUser();
  const { mutate, data, isLoading } = api.url.create.useMutation({
    onSuccess: (data) => {
      console.log("onSuccess create url", data.shortCode);
    },
  });

  const handleShortenUrl = async () => {
    console.log("handleShortenUrl luid", luid);
    mutate({
      luid: luid,
      url: "https://www.googlee.com",
    });
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center p-5">
      <div className="text-center">
        <p className="text-3xl font-bold">TRIM</p>
        <p className="text-md">Shorter. Easier. Cleaner.</p>
      </div>
      <div className="mt-8 w-full max-w-xl">
        <InputUrlForm handleShortenUrl={handleShortenUrl} />
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

const InputUrlForm = ({
  handleShortenUrl,
}: {
  handleShortenUrl: () => void;
}) => {
  return (
    <div className="flex rounded bg-slate-100">
      <input
        type="text"
        id="first_name"
        className="block w-full rounded-l bg-white p-2.5 text-sm text-gray-900  outline-0 outline-slate-600 dark:bg-white dark:placeholder-slate-400"
        placeholder="http://yourURL"
        required
        autoComplete="off"
      />

      <button
        type="button"
        className="rounded-r bg-slate-100 px-3.5 py-2.5 text-slate-800 shadow-sm hover:bg-slate-200"
        onClick={() => {
          handleShortenUrl();
        }}
      >
        Shorten!
      </button>
    </div>
  );
};

export default Home;
