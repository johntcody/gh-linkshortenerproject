import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getLinksForUser } from "@/data/links";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const links = await getLinksForUser({ clerkUserId: userId });

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 pb-16 pt-10 sm:px-8 lg:px-12">
      <Card>
        <CardHeader>
          <CardTitle>Your links</CardTitle>
          <CardDescription>
            View and manage all shortened links associated with your account.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent links</CardTitle>
          <CardDescription>{links.length} total link{links.length === 1 ? "" : "s"}</CardDescription>
        </CardHeader>
        <CardContent>
          {links.length === 0 ? (
            <p className="rounded-xl border border-dashed border-border bg-muted/30 px-4 py-6 text-sm text-muted-foreground">
              No links yet. Create your first short link to see it here.
            </p>
          ) : (
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.id} className="rounded-xl border border-border bg-background p-4">
                  <p className="text-sm font-medium">{appUrl}/{link.shortCode}</p>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 block truncate text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.url}
                  </a>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Created {new Date(link.createdAt).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
