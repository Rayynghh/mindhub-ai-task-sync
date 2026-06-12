# Roadmap: Task Management & Google Calendar Integration

## Overview

This roadmap outlines the development of a task management system with Google Calendar integration. We start with the foundation (database and auth), move to core task management, integrate with Google Calendar, and finally implement the visual Gantt chart interface.

## Phases

- [ ] **Phase 1: Foundation & Supabase Setup** - Initialize Supabase project, define schema, and setup basic auth.
- [ ] **Phase 2: Google OAuth & Token Management** - Implement Google OAuth linkage and secure token storage.
- [ ] **Phase 3: Core Task Management** - Build CRUD functionality for tasks with Supabase backend.       
- [ ] **Phase 4: Google Calendar Synchronization** - Implement sync logic between MindHub tasks and Google Calendar events.
- [ ] **Phase 5: Gantt Chart Visualization** - Develop the interactive Gantt chart interface for task visualization.
- [ ] **Phase 6: Refinement & Polishing** - Final UI/UX improvements and error handling.

## Phase Details

### Phase 1: Foundation & Supabase Setup
**Goal**: Establish the database schema and authentication baseline.
**Depends on**: Nothing
**Requirements**: [AUTH-01, AUTH-04]
**Success Criteria**:
  1. Supabase project is configured.
  2. `tasks` table exists with RLS enabled.
  3. User can sign in using email/password (baseline auth).
**Plans**: 2 plans

Plans:
- [ ] 01-01-PLAN.md — Initialize Next.js project, configure Supabase SSR clients, and define the 'tasks' table schema.
- [ ] 01-02-PLAN.md — Implement Auth Server Actions, Middleware session management, and Login/Signup UI with shadcn/ui.

### Phase 2: Google OAuth & Token Management
**Goal**: Allow users to link their Google accounts for calendar access.
**Depends on**: Phase 1
**Requirements**: [AUTH-02, AUTH-03]
**Success Criteria**:
  1. User can link Google account via OAuth.
  2. OAuth tokens (access & refresh) are securely stored in Supabase.
  3. App can successfully refresh expired tokens.
**Plans**: 2 plans

Plans:
- [ ] 02-01: Google OAuth integration with Supabase.
- [ ] 02-02: Secure token storage and refresh mechanism.

### Phase 3: Core Task Management
**Goal**: Implement basic task CRUD operations.
**Depends on**: Phase 1
**Requirements**: [TASK-01, TASK-02, TASK-03, TASK-04]
**Success Criteria**:
  1. User can create, read, update, and delete tasks.
  2. Task list is displayed to the user.
  3. RLS correctly filters tasks by user.
**Plans**: 2 plans

Plans:
- [ ] 03-01: Backend Server Actions for Task CRUD.
- [ ] 03-02: Frontend Task Management UI (List/Form).

### Phase 4: Google Calendar Synchronization
**Goal**: Sync MindHub tasks to Google Calendar.
**Depends on**: Phase 2, Phase 3
**Requirements**: [SYNC-01, SYNC-02, SYNC-03, SYNC-04]
**Success Criteria**:
  1. Creating a task in MindHub creates an event in Google Calendar.
  2. Updating/Deleting tasks reflects in Google Calendar.
  3. Errors from Google API are handled without crashing the app.
**Plans**: 2 plans

Plans:
- [ ] 04-01: Push sync logic (MindHub -> Google).
- [ ] 04-02: Error handling and background sync considerations.

### Phase 5: Gantt Chart Visualization
**Goal**: Provide a visual roadmap of tasks.
**Depends on**: Phase 3
**Requirements**: [VIZ-01, VIZ-02, VIZ-03]
**Success Criteria**:
  1. Tasks are rendered on a Gantt chart.
  2. User can click on tasks to see details.
  3. Visualization updates as task statuses change.
**Plans**: 2 plans

Plans:
- [ ] 05-01: Integration of `gantt-task-react` or similar.
- [ ] 05-02: Connecting Gantt chart to Supabase data.

### Phase 6: Refinement & Polishing
**Goal**: Final touches and robustness.
**Depends on**: Phase 4, Phase 5
**Requirements**: All v1 requirements
**Success Criteria**:
  1. Application is stable and responsive.
  2. UI matches design standards (Shadcn/UI).
  3. Edge cases (e.g., sync conflicts) are addressed.
**Plans**: 1 plan

Plans:
- [ ] 06-01: Final UI polishing and E2E testing.

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 0/2 | Not started | - |
| 2. Google OAuth | 0/2 | Not started | - |
| 3. Task Management | 0/2 | Not started | - |
| 4. Sync | 0/2 | Not started | - |
| 5. Visualization | 0/2 | Not started | - |
| 6. Refinement | 0/1 | Not started | - |
