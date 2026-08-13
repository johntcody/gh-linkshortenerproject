# Server Actions and Data Mutation Guidance

- Perform all data mutations through server actions only.
- Invoke server actions from client components.
- Name every server action module `actions.ts`.
- Co-locate each `actions.ts` file with the client component that calls it.
- Use explicit TypeScript input types for all server action inputs.
- Do not use the `FormData` TypeScript type for server action inputs.
- Validate all incoming mutation data in server actions with Zod before any business logic runs.
- In every server action, check for a logged-in user before any database operation.
- Do not throw errors from server actions.
- Return a typed result object from every server action with either a `success` property or an `error` property.
- Keep all database reads and writes used by server actions in helper functions under `data/*`.
- Do not write direct Drizzle queries inside server actions.
- Have server actions call typed data-layer helpers that wrap Drizzle queries.

## Recommended Flow

1. Client component collects and shapes typed input data.
2. Client component calls co-located server action from `actions.ts`.
3. Server action validates input with Zod.
4. Server action checks authenticated user.
5. Server action calls `data/*` helper function(s) for database work.
6. Data helper executes Drizzle query and returns typed result.
