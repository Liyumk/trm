import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { api } from "@/utils/api";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <div className="container flex h-screen items-center justify-center">
      <div>{hello.data?.greeting ?? "No data"}</div>
    </div>
  );
};

export default Home;
