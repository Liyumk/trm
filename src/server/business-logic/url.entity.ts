import { z } from "zod";
import {
  ValidationSchemaUrlCreate,
  ValidationSchemaUrlFind,
} from "../api/validation-schemas/url.schema";
import { prisma } from "../db";
import { ALIAS_LENGTH, CHARACTERS } from "@/utils/constants";
import { TRPCError } from "@trpc/server";

export default class UrlEntity {
  async create(input: ValidationSchemaUrlCreate) {
    const { url: newLongUrl, alias, luid } = input;

    this.isUrl(newLongUrl);

    const url = await prisma.url.findFirst({
      where: { longUrl: newLongUrl, userId: luid },
    });
    if (url) {
      return url;
    }

    const shortCode = await this.shortenUrl();
    const newUrl = await prisma.url.create({
      data: {
        longUrl: newLongUrl,
        shortCode: shortCode,
        userId: luid,
        alias: alias ? alias : null,
      },
    });
    return newUrl;
  }

  async find(input: ValidationSchemaUrlFind) {
    const { url: longUrl, luid } = input;
    const url = await prisma.url.findFirst({
      where: { longUrl, userId: luid },
    });

    if (!url) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "URL not found",
      });
    }

    return url;
  }

  private async shortenUrl() {
    let isUnique = false;
    let shortCode = "";

    while (!isUnique) {
      shortCode = "";
      for (let i = 0; i < ALIAS_LENGTH; i++) {
        const randomIndex = Math.floor(Math.random() * CHARACTERS.length);
        shortCode += CHARACTERS[randomIndex];
      }
      const existingUrl = await prisma.url.findFirst({
        where: { shortCode: shortCode },
      });
      isUnique = !existingUrl;
    }

    return shortCode;
  }

  private isUrl(url: string) {
    const urlPattern =
      /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-_.~!*'();:@&=+$,/?#[\]]+\.[a-zA-Z0-9-_.~!*'();:@&=+$,/?#[\]]+$/i;

    var isURL = urlPattern.test(url);
    console.log(url, "isUrl", isURL);

    if (!isURL)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Invalid URL",
      });
    // return;

    return url;
  }
}
