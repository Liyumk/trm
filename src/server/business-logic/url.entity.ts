import { z } from "zod";
import {
  ValidationSchemaUrlCreate,
  ValidationSchemaUrlFind,
} from "../api/validation-schemas/url.schema";
import { prisma } from "../db";
import { ALIAS_LENGTH, CHARACTERS } from "@/utils/constants";
import { TRPCError } from "@trpc/server";
import isUrl from "is-url";
import { addHttpToUrl } from "@/utils/addHttpToUrl";

export default class UrlEntity {
  async create(input: ValidationSchemaUrlCreate) {
    const { url: longUrl, alias, luid } = input;
    const trimmedLongUrl = longUrl.trim();

    this.checkUrl(trimmedLongUrl);

    const url = await prisma.url.findFirst({
      where: { longUrl: trimmedLongUrl, userId: luid },
    });
    if (url) {
      return url;
    }

    const shortCode = await this.shortenUrl();
    const newUrl = await prisma.url.create({
      data: {
        longUrl: trimmedLongUrl,
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

  async findUrlByShortCode(input: { shortCode: string }) {
    const { shortCode } = input;
    const url = await prisma.url.findUnique({ where: { shortCode } });

    if (!url)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "URL not found",
      });

    const longUrl = url.longUrl;

    return longUrl;
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

  private checkUrl(url: string) {
    const urlWithHttp = addHttpToUrl(url);
    var isURL = isUrl(urlWithHttp);

    if (!isURL)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Invalid URL",
      });

    return url;
  }
}
