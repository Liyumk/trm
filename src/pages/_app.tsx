import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "@/utils/api";
import Head from "next/head";
import { useLocalUser } from "@/hooks/useLocalUser";
import { ToastContainer } from "react-toastify";

import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  useLocalUser();

  return (
    <SessionProvider session={session}>
      <Head>
        <title>Trim</title>
        <meta property="og:title" content="Trim" key="title" />
        <meta name="description" content="Programming Articles" />
      </Head>
      <Component {...pageProps} />
      <ToastContainer />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
