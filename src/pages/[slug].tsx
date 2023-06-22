import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { GetServerSideProps } from "next";
import { prisma } from "@/server/db";
import { TRPCError } from "@trpc/server";

const ShortUrl = ({ statusCode }: { statusCode: number }) => {
  return null;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req, res } = ctx;
  const slug = ctx.params?.slug as string;

  try {
    const url = await prisma.url.findFirst({
      where: { shortCode: slug },
    });

    function addHttpToUrl(url: string) {
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "http://" + url;
      }
      console.log(url);
      return url;
    }

    if (!url) {
      return {
        notFound: true,
      };
    }

    return {
      redirect: {
        permanent: true,
        destination: addHttpToUrl(url.longUrl),
        basePath: false,
      },
    };
  } catch (err) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong. Please try again.",
    });
  }
};

export default ShortUrl;
