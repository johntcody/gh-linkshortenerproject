import { desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { shortLinks } from "@/db/schema";

type GetLinksForUserInput = {
  clerkUserId: string;
};

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