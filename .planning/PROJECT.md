# Task Management & Google Calendar Integration

## What This Is

A feature for the MindHub education platform that allows users to plan, track, and manage their study schedules or tasks through a Timeline/Gantt Chart interface. It includes automatic synchronization of tasks to the user's personal Google Calendar.

## Core Value

Seamless synchronization between personal study planning in MindHub and the user's Google Calendar for improved productivity.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Task management (CRUD operations)
- [ ] Timeline/Gantt Chart visualization
- [ ] Google Calendar bi-directional sync (or at least push from MindHub)
- [ ] Secure authentication with Supabase and Google OAuth

### Out of Scope

- Mobile app (Web-first)
- Integration with other calendar providers (Outlook, Apple) — Focused on Google for v1
- Real-time collaborative task editing — Focused on personal productivity

## Context

- Building on MindHub platform
- Users are primarily students or lifelong learners
- Need for visual roadmap of tasks (Gantt style)

## Constraints

- **Tech Stack**: Next.js (App Router), Supabase (Auth & DB), Google Calendar API, Tailwind CSS v4, Shadcn/UI — Chosen for modern developer experience and rapid prototyping.
- **Security**: Supabase RLS must be enforced for all task data.
- **API**: Google Calendar API usage limits and OAuth scope requirements.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js App Router | Modern React framework with Server Actions for simplified backend logic. | — Pending |
| Supabase | All-in-one Auth and Database solution with built-in RLS. | — Pending |
| Gantt-task-react | Chosen for visual roadmap representation as per spec. | — Pending |

---
*Last updated: 2026-06-12 after project initialization*
