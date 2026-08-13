import { randomBytes } from "crypto";

import { desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { shortLinks } from "@/db/schema";

type GetLinksForUserInput = {
  clerkUserId: string;
};

type CreateShortLinkForUserInput = {
  clerkUserId: string;
  url: string;
};

const SHORT_CODE_LENGTH = 7;
const MAX_SHORT_CODE_ATTEMPTS = 5;

function generateShortCode(length = SHORT_CODE_LENGTH) {
  return randomBytes(length)
    .toString("base64url")
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, length);
}

export async function getLinksForUser({ clerkUserId }: GetLinksForUserInput) {
  const normalizedUserId = clerkUserId.trim();

  if (!normalizedUserId) {
    throw new Error("clerkUserId is required");
  }

  return db
    .select({
      id: shortLinks.id,
      shortCode: shortLinks.shortCode,
      url: shortLinks.url,
      createdAt: shortLinks.createdAt,
    })
    .from(shortLinks)
    .where(eq(shortLinks.clerkUserId, normalizedUserId))
    .orderBy(desc(shortLinks.createdAt));
}

export async function createShortLinkForUser({ clerkUserId, url }: CreateShortLinkForUserInput) {
  const normalizedUserId = clerkUserId.trim();
  const normalizedUrl = url.trim();

  if (!normalizedUserId) {
    throw new Error("clerkUserId is required");
  }

  if (!normalizedUrl) {
    throw new Error("url is required");
  }

  for (let attempt = 0; attempt < MAX_SHORT_CODE_ATTEMPTS; attempt += 1) {
    const shortCode = generateShortCode();

    try {
      const [createdLink] = await db
        .insert(shortLinks)
        .values({
          clerkUserId: normalizedUserId,
          shortCode,
          url: normalizedUrl,
        })
        .returning({
          id: shortLinks.id,
          shortCode: shortLinks.shortCode,
          url: shortLinks.url,
          createdAt: shortLinks.createdAt,
        });

      if (!createdLink) {
        throw new Error("Link creation did not return a row");
      }

      return createdLink;
    } catch (error) {
      const dbError = error as { code?: string };

      if (dbError.code === "23505") {
        continue;
      }

      throw error;
    }
  }

  throw new Error("Could not generate a unique short code");
}