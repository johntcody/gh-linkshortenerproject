# Project agent instructions

This repository is a Next.js 16 App Router project for a link shortener. Follow these conventions when editing code or creating prompts for this workspace.

## Working conventions

- Before generating any code, ALWAYS read the relevant individual instruction files in [docs](docs); this is mandatory for every coding task without exception.
- Start from the existing app structure: route-level work belongs in [app](app), shared UI lives in [components/ui](components/ui), database helpers live in [db](db), and shared utilities live in [lib](lib).
- Use TypeScript and the existing path alias `@/*` defined in [tsconfig.json](tsconfig.json). Keep new code typed and avoid unnecessary dependencies.
- Keep UI changes consistent with the existing shadcn-style patterns in [components/ui/button.tsx](components/ui/button.tsx) and the shared helper in [lib/utils.ts](lib/utils.ts).
- For data access, keep schema and DB wiring in [db/schema.ts](db/schema.ts) and [db/index.ts](db/index.ts). If you touch persistence, make sure the change stays compatible with [drizzle.config.ts](drizzle.config.ts) and the required `DATABASE_URL` environment variable.
- Authentication and middleware live in [proxy.ts](proxy.ts); respect the Clerk integration unless the request explicitly asks to change it.
- Use [README.md](README.md) and [package.json](package.json) as the source of truth for setup and scripts.
- For cloud agent feature work, ALWAYS create and use a working branch named after the feature before making changes.

## Verification

- Prefer lightweight, focused changes over broad rewrites.
- Verify changes with `npm run lint` and, when the change affects runtime behavior, `npm run build`.
- If unit tests exist for the changed area, run them and ensure they pass before creating a PR.
- Avoid editing generated or local artifacts under `.next` unless the task explicitly requires it.

## Prompt files

- Reusable prompt files for this repository should live in [.github/prompts](.github/prompts).
- Keep prompt instructions concise, actionable, and tied to the patterns above rather than repeating the full README.
- PR descriptions and comments should clearly summarize what was changed.

## Documentation

- Auth requirements and conventions are documented in [docs/clerk-authentication.md](docs/clerk-authentication.md).
- UI component conventions are documented in [docs/shadcn-ui-components.md](docs/shadcn-ui-components.md).
