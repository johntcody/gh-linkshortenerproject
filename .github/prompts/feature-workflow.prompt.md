# Feature workflow prompt

Use this prompt when implementing a feature in this repository.

## Expectations

- Create and use a working branch named after the feature before making changes.
- Inspect the relevant route, component, and data files before making changes.
- Prefer incremental edits that fit the existing Next.js App Router structure.
- Keep UI components aligned with the shadcn-style patterns already used in [components/ui](components/ui).
- If database changes are required, update the schema and Drizzle config together.
- Verify the result with the relevant checks, usually `npm run lint` and, when appropriate, `npm run build`.
- If unit tests exist for the touched area, run them and ensure they pass before opening a PR.
- Include a clear summary of what changed in the PR comments/description.

## Scope guide

- App and routing work: [app](app)
- Shared UI primitives: [components/ui](components/ui)
- Database helpers and schema: [db](db)
- Shared utilities: [lib](lib)
