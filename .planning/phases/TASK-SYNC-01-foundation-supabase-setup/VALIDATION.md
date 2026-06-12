# Phase 1 Validation: Foundation & Supabase Setup

## Success Criteria

- [ ] Next.js project initialized with App Router and Tailwind CSS.
- [ ] Vitest and React Testing Library configured for unit and integration testing.
- [ ] Supabase SSR utilities implemented and session management verified.
- [ ] Database schema for `tasks` table created with correct types and RLS enabled.
- [ ] Auth Server Actions (login, signup, signout) implemented and tested.
- [ ] Middleware session refresh logic verified.
- [ ] Behavioral tests confirm that unauthenticated users are redirected from protected areas.

## Test Matrix

| Req ID | Feature | Test Case | Type | Automated |
|--------|---------|-----------|------|-----------|
| AUTH-01 | Sign In | Successful login redirects to home | Integration | `npm test auth.test.ts` |
| AUTH-01 | Sign In | Invalid credentials show error message | Integration | `npm test auth.test.ts` |
| AUTH-04 | RLS | User A cannot read User B's tasks | DB/RLS | `npm test rls.test.ts` |
| INFRA | Testing | Vitest is configured and runs simple tests | Unit | `npm test` |

## Truths

- User can see a login form at `/login`.
- User can create a new account at `/signup`.
- After logging in, the user sees a "dashboard" or "home" view.
- Attempting to access the dashboard while logged out redirects to `/login`.
- `tasks` table in Supabase dashboard shows RLS is enabled.

## Key Links

- `src/app/auth/actions.ts` -> `@supabase/ssr` (Server Actions logic)
- `src/middleware.ts` -> `src/lib/supabase/middleware.ts` (Session protection)
- `src/lib/supabase/server.ts` -> `.env.local` (Client initialization)
