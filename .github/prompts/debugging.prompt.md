# Debugging prompt

Use this prompt when investigating a bug or regression.

## Checklist

- Reproduce the issue before changing code.
- Trace the relevant route, server/client boundary, and database access path.
- Check whether the problem comes from Next.js, Clerk middleware, or Drizzle connectivity.
- Keep fixes scoped and avoid unrelated refactors.
- Re-run validation after the change with `npm run lint` and, if runtime behavior changed, `npm run build`.
