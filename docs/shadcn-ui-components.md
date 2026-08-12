# Shadcn UI Component Guidance

- Use shadcn/ui components for every UI element in this app.
- DO NOT create custom UI components when a shadcn/ui component can cover the need.
- Build screens by composing existing shadcn/ui primitives and shared helpers instead of hand-rolled controls.
- If a needed primitive does not exist yet, add it following the shadcn/ui pattern rather than introducing a bespoke alternative.
- Keep any added UI consistent with the existing shadcn-style setup in [components/ui](../components/ui) and [lib/utils.ts](../lib/utils.ts).