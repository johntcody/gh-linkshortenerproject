"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

import { createShortLinkForUser } from "@/data/links";

const createLinkInputSchema = z.object({
  url: z.string().trim().url("Enter a valid URL"),
});

export type CreateLinkInput = z.infer<typeof createLinkInputSchema>;

export type CreateLinkResult =
  | {
      success: {
        id: string;
        shortCode: string;
        url: string;
      };
    }
  | {
      error: string;
    };

export async function createLink(input: CreateLinkInput): Promise<CreateLinkResult> {
  const parsedInput = createLinkInputSchema.safeParse(input);

  if (!parsedInput.success) {
    return { error: parsedInput.error.issues[0]?.message ?? "Invalid input" };
  }

  const { userId } = await auth();

  if (!userId) {
    return { error: "You must be signed in to create links" };
  }

  try {
    const createdLink = await createShortLinkForUser({
      clerkUserId: userId,
      url: parsedInput.data.url,
    });

    return {
      success: {
        id: createdLink.id,
        shortCode: createdLink.shortCode,
        url: createdLink.url,
      },
    };
  } catch {
    return { error: "Failed to create link. Please try again." };
  }
}