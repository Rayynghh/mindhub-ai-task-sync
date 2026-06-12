# Phase 1: Foundation & Supabase Setup - Research

**Researched:** 2026-06-12
**Domain:** Database Schema & Authentication Baseline
**Confidence:** HIGH

## Summary

This phase focuses on establishing the core infrastructure for the Task Management & Google Calendar Integration project. The project will use **Next.js (App Router)** as the frontend framework and **Supabase** for the database and authentication. The primary goal is to set up a secure, scalable foundation where users can sign in and manage their own tasks privately.

**Primary recommendation:** Use `@supabase/ssr` for authentication in the Next.js App Router, as it is the current official recommendation replacing the deprecated `@supabase/auth-helpers-nextjs`.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| AUTH-01 | User can sign in via Supabase Auth. | Recommended `@supabase/ssr` setup with Email/Password and Server Actions. |
| AUTH-04 | Row Level Security (RLS) ensures users only see their own tasks. | Verified SQL for RLS policies using `auth.uid() = user_id`. |
</phase_requirements>

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| User Authentication | Supabase Auth | Frontend (Server Actions) | Supabase manages users/sessions; Server Actions provide the secure bridge. |
| Data Persistence | Database (PostgreSQL) | — | Supabase PostgreSQL stores all task and user data. |
| Access Control | Database (RLS) | — | Row Level Security is the "gold standard" for multi-tenant data safety in Supabase. |
| Session Management | Browser (Cookies) | Frontend Server (Middleware) | Cookies store session info; Middleware refreshes it to prevent expiration. |

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 14+ (App Router) | Web Framework | Industry standard for SSR/ISR and modern React features. |
| @supabase/supabase-js | ^2.43.4 | Supabase Client | Official client for interacting with Supabase services. |
| @supabase/ssr | ^0.3.0 | SSR Auth Helpers | Current official package for handling Supabase Auth in SSR environments. |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|--------------|
| zod | ^3.23.8 | Input Validation | Validating auth forms and task data before sending to Supabase. |
| shadcn/ui | latest | UI Components | Rapid building of accessible, themed auth and task management interfaces. |

**Installation:**
```bash
npm install @supabase/supabase-js @supabase/ssr zod
```

## Package Legitimacy Audit

| Package | Registry | Age | Downloads | Source Repo | Verdict | Disposition |
|---------|----------|-----|-----------|-------------|---------|-------------|
| @supabase/supabase-js | npm | 6 yrs | 19M/wk | github.com/supabase/supabase-js | [OK] | Approved |
| @supabase/ssr | npm | 1 yr | 4.5M/wk | github.com/supabase/ssr | [OK] | Approved |
| zod | npm | 4 yrs | 15M/wk | github.com/colinhacks/zod | [OK] | Approved |

*Note: @supabase packages showed recent updates (3 days ago) but have extremely high download volume and official backing.*

## Architecture Patterns

### Recommended Project Structure
```text
src/
├── app/
│   ├── (auth)/                 # Route group for login/signup
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── auth/
│   │   ├── callback/route.ts   # PKCE callback handler
│   │   └── actions.ts          # Auth server actions
│   ├── layout.tsx
│   └── middleware.ts           # Session refresh logic
├── lib/
│   └── supabase/               # Supabase client utilities
│       ├── client.ts           # Browser client
│       ├── server.ts           # Server client (for actions/RSC)
│       └── middleware.ts       # Specialized middleware client
└── types/
    └── database.ts             # Generated Supabase types
```

### Pattern 1: Server Actions for Auth
**What:** Using Next.js Server Actions to handle sign-in, sign-up, and sign-out logic on the server.
**When to use:** All authentication-related form submissions.
**Example:**
```typescript
// app/auth/actions.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const supabase = createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })

  if (error) redirect('/error')
  redirect('/dashboard')
}
```

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Authentication | Custom JWT/Session logic | Supabase Auth | Handles security, session persistence, and social providers. |
| Access Control | Manual API checks | PostgreSQL RLS | Built-in, declarative security that cannot be bypassed by the client. |
| Form Validation | RegEx for emails/passwords | Zod | Type-safe, composable, and handles complex schema validation. |

## Architecture Patterns (SQL)

### Tasks Table Schema
```sql
CREATE TABLE tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status VARCHAR(50) DEFAULT 'to-do',
  google_event_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### RLS Policies
```sql
-- Enable RLS
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see/edit their own tasks
CREATE POLICY "Users can only manage their own tasks" 
ON tasks FOR ALL USING (auth.uid() = user_id);
```

## Common Pitfalls

### Pitfall 1: Missing Middleware Session Refresh
**What goes wrong:** User remains "logged in" in the browser, but the session expires on the server, leading to unexpected 401 errors in Server Components.
**Why it happens:** Next.js Server Components don't automatically update cookies.
**How to avoid:** Implement the Supabase middleware pattern that refreshes the session on every request.

### Pitfall 2: Client-side DB Operations
**What goes wrong:** Data is fetching but UI is sluggish, or RLS is accidentally bypassed by misconfigured `service_role` keys.
**Why it happens:** Attempting to do heavy data manipulation in Client Components.
**How to avoid:** Use Server Components for initial data fetching and Server Actions for mutations.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Project Runtime | ✓ | 22.16.0 | — |
| npm | Package Management | ✓ | 10.9.2 | — |
| Supabase CLI | Local Dev/Migrations | ✗ | — | Manual Web Portal |
| Next.js | Frontend | ✗ | — | `npx create-next-app` |

**Missing dependencies with no fallback:**
- None.

**Missing dependencies with fallback:**
- Supabase CLI: Can use the web dashboard for initial schema setup, though CLI is recommended for v2.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest + React Testing Library |
| Config file | `vitest.config.ts` |
| Quick run command | `npm test` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| AUTH-01 | Login Server Action redirects to dashboard | Integration | `npm test login.test.ts` | ❌ Wave 0 |
| AUTH-04 | Query for tasks returns only user-owned rows | Database (RLS) | `supabase test db` (if CLI) | ❌ Wave 0 |

## Security Domain

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | yes | Supabase Auth (Email/Pass) |
| V4 Access Control | yes | Row Level Security (RLS) |
| V5 Input Validation | yes | Zod schemas for all forms |

### Known Threat Patterns for Next.js + Supabase

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Insecure Direct Object Reference | Elevation of Privilege | Strict RLS on all tables. |
| SQL Injection | Tampering | Use Supabase PostgREST (parameterized by default). |
| Cross-Site Scripting (XSS) | Information Disclosure | Next.js automatic escaping; CSP headers. |

## Sources

### Primary (HIGH confidence)
- Official Supabase SSR Docs: https://supabase.com/docs/guides/auth/server-side/nextjs
- Next.js Auth Patterns: https://nextjs.org/docs/app/building-your-application/authentication

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `@supabase/ssr` is preferred over `auth-helpers` | Standard Stack | Minor migration effort later. |
| A2 | Database schema requires `google_event_id` in v1 | Architecture Patterns | Unused column until v4. |

## Metadata
**Confidence breakdown:**
- Standard stack: HIGH - Current docs verified.
- Architecture: HIGH - Standard Supabase pattern.
- Pitfalls: MEDIUM - Based on community experience.

**Research date:** 2026-06-12
**Valid until:** 2026-07-12
