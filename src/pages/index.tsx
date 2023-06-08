import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { api } from "@/utils/api";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <div className="flex h-screen flex-col items-center justify-center p-5">
      <div className="text-center">
      <p className="text-3xl font-bold">Trim</p>
        <p className="text-lg">Shorter. Easier. Cleaner.</p>
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

const InputUrlForm = () => {
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
      >
        Shorten!
      </button>
    </div>
  );
};

export default Home;
