# Feature workflow prompt

Use this prompt when implementing a feature in this repository.

## Expectations

- For Cloud agent feature work, create or switch to a working branch named after the feature before making edits.
- Inspect the relevant route, component, and data files before making changes.
- Prefer incremental edits that fit the existing Next.js App Router structure.
- Keep UI components aligned with the shadcn-style patterns already used in [components/ui](components/ui).
- Add or update unit tests when the feature changes behavior.
- If database changes are required, update the schema and Drizzle config together.
- Verify the result with the relevant checks, usually `npm run lint` and, when appropriate, `npm run build`.
- If unit tests exist for the touched area, run them and ensure they pass before opening a PR.
- Require all unit tests to pass before opening a pull request.
- Include a clear summary of what changed in the PR comments/description.
- Pull requests should include comments that summarize what changed and which checks passed.

## Scope guide

- App and routing work: [app](app)
- Shared UI primitives: [components/ui](components/ui)
- Database helpers and schema: [db](db)
- Shared utilities: [lib](lib)
