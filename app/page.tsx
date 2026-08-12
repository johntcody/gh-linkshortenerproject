import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { BarChart3, Link2, Lock, Zap } from "lucide-react";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

const features = [
  {
    name: "Fast link shortening",
    description: "Turn long URLs into clean, shareable links in seconds.",
    icon: Link2,
  },
  {
    name: "Performance insights",
    description: "Track how your links perform and see engagement trends at a glance.",
    icon: BarChart3,
  },
  {
    name: "Secure by default",
    description: "Clerk-powered authentication keeps your dashboard and links protected.",
    icon: Lock,
  },
  {
    name: "Built for speed",
    description: "A streamlined workflow helps you create and manage links without friction.",
    icon: Zap,
  },
];

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-16 px-6 pb-16 pt-10 sm:px-8 lg:px-12">
      <section className="flex flex-col items-start gap-6 rounded-2xl border border-border bg-card p-8 md:p-12">
        <p className="text-sm font-medium text-muted-foreground">Simple URL management</p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Shorten, manage, and measure every link from one dashboard.
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          This link shortener gives you fast URL creation, clear insights, and secure access so
          your team can share with confidence.
        </p>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <SignUpButton mode="modal">
            <Button size="lg" className="w-full sm:w-auto">
              Get started
            </Button>
          </SignUpButton>
          <SignInButton mode="modal">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Sign in
            </Button>
          </SignInButton>
        </div>
      </section>

      <section aria-label="Features" className="grid gap-4 sm:grid-cols-2">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <article
              key={feature.name}
              className="rounded-2xl border border-border bg-card p-6 transition-colors hover:bg-muted/30"
            >
              <Icon className="mb-4 size-5 text-muted-foreground" aria-hidden="true" />
              <h2 className="mb-2 text-xl font-medium">{feature.name}</h2>
              <p className="text-sm leading-6 text-muted-foreground">{feature.description}</p>
            </article>
          );
        })}
      </section>
    </main>
  );
}
