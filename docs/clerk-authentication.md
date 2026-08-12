# Clerk authentication guidance

- Use Clerk for all authentication in this project. Do not introduce or rely on any other auth method.
- Keep the dashboard route protected: only signed-in users may access /dashboard.
- If an authenticated user visits the home page, redirect them to /dashboard.
- Ensure sign-in and sign-up flows use Clerk modal-based experiences.
- Keep auth-related changes aligned with the existing Clerk integration in proxy.ts and the app routes.
