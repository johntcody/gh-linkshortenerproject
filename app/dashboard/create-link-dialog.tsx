"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { createLink } from "./actions";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CreateLinkDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await createLink({ url });

      if ("error" in result) {
        setError(result.error);
        return;
      }

      setUrl("");
      setOpen(false);
      router.refresh();
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button size="sm">Create link</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new short link</DialogTitle>
          <DialogDescription>
            Paste the destination URL and we will generate a short code for you.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="create-link-url">Destination URL</Label>
            <Input
              id="create-link-url"
              type="url"
              placeholder="https://example.com/article"
              value={url}
              onChange={(event) => setUrl(event.currentTarget.value)}
              required
            />
          </div>

          {error ? <p className="text-sm text-destructive">{error}</p> : null}

          <DialogFooter>
            <DialogClose render={<Button type="button" variant="outline">Cancel</Button>} />
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create link"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}