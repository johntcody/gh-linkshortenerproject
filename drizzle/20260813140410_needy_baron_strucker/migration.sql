CREATE TABLE "short_links" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"clerk_user_id" text NOT NULL,
	"short_code" text NOT NULL,
	"url" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "short_links_short_code_key" ON "short_links" ("short_code");--> statement-breakpoint
CREATE INDEX "short_links_clerk_user_id_idx" ON "short_links" ("clerk_user_id");