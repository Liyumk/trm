import { z } from "zod";
import {
  ValidationSchemaShortenCreate,
  ValidationSchemaShortenFind,
} from "../api/validation-schemas/shorten.schema";
import { prisma } from "../db";
import { ALIAS_LENGTH, CHARACTERS } from "@/utils/constants";
import { TRPCError } from "@trpc/server";

export default class ShortenEntity {
  async create(input: ValidationSchemaShortenCreate) {
    const { url: newLongUrl, alias } = input;
    const url = await prisma.url.findFirst({ where: { longUrl: newLongUrl } });

    if (url) {
      return url;
    }

    this.isUrl(newLongUrl);

    const shortCode = await this.shortenUrl();
    const newUrl = await prisma.url.create({
      data: {
        longUrl: newLongUrl,
        shortCode: shortCode,
        alias: alias ? alias : null,
      },
    });
    return newUrl;
  }

  async find(input: ValidationSchemaShortenFind) {
    const { url: longUrl } = input;
    const url = await prisma.url.findFirst({ where: { longUrl } });

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

  private async isUrl(url: string) {
    const urlPattern = /^(https?:\/\/)?(www\.)?[^\s/$.?#].[^\s]*$/i;
    var isURL = urlPattern.test(url);

    if (!isURL)
      throw new TRPCError({
        code: "UNPROCESSABLE_CONTENT",
        message: "Invalid URL",
      });

    return url;
  }
}
