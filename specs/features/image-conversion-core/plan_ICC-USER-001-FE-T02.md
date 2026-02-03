# ICC-USER-001-FE-T02 — Implementation Plan

**Source ticket**: `specs/features/image-conversion-core/tickets.md` → **ICC-USER-001-FE-T02**  
**Related user story**: **ICC-USER-001** (from `specs/features/image-conversion-core/user-stories.md`)  
**Plan version**: v1.0 — (Antigravity, 2026-02-03)  
**Traceability**: All tasks must include inline references to `ICC-USER-001-FE-T02` and `ICC-USER-001` scenario names/tags.

---

## 1) Context & Objective
- **Ticket summary**: Implement the `UploadZone` component with Drag & Drop support and immediate client-side validation (Size/Type).
- **Impacted entities**: UI state (file object).
- **Impacted services**: `UploadZone` component.
- **Impacted tests**: `Scenario 2: Successful Upload via Drag & Drop`.

## 2) Scope
- **In scope**: React component using `react-dropzone` (or HTML5 DnD), Visual feedback (active drag state), "Browse" button, Validation (Size < 20MB, accepted formats).
- **Out of scope**: API integration (uploading to backend is T03/Integration), Preview (T03).
- **Assumptions**: Brand colors available in `design-tokens.json` / Tailwind config.
- **Open questions**: Exact styling for "Drag active" state (assume dashed border + brand color).

## 3) Detailed Work Plan (TDD + BDD)
> **Container Check**: Ensure `docker-compose.yml` exists and frontend container is healthy.

### 3.1 Test-first sequencing
1. **Define tests**: Component tests (Vitest/RTL) for:
   - Rendering "Drop here" text.
   - Calling `onFileSelect` prop when file dropped.
   - Showing error if invalid file dropped.
2. **Implementation**: Build component with shadcn/ui primitives if applicable.
3. **Refactor**: Extract validation constants.

### 3.2 NFR hooks
- **Accessibility**: Support keyboard (Enter/Space to open file dialog). Aria-label "Upload image".
- **Brand**: Use `border-primary` for active state, `text-muted-foreground` for instructions.
- **Localisation**: All text in Spanish per `brand-guidelines.md`.

## 4) Atomic Task Breakdown

### Task 1: Component Scaffold & Styling
- **Purpose**: Create visual structure matching brand guidelines.
- **Prerequisites**: Frontend Docker up.
- **Artifacts impacted**: `frontend/src/features/image-conversion/components/UploadZone.tsx`.
- **Test types**: Component (Visual).
- **BDD Acceptance**:
  - **Given** the component is mounted
  - **Then** I see the text "Arrastra tu imagen aquí o haz clic".

### Task 2: Drag & Drop Logic (react-dropzone)
- **Purpose**: specific file handling.
- **Prerequisites**: Task 1.
- **Artifacts impacted**: `UploadZone.tsx`.
- **Test types**: Component (Interaction).
- **BDD Acceptance**:
  - **Given** I drag a PNG file
  - **When** I drop it
  - **Then** the `onFileSelected` callback is fired with the file.

### Task 3: Client-side Validation (Zod/Manual)
- **Purpose**: fast feedback.
- **Prerequisites**: Task 2.
- **Artifacts impacted**: `UploadZone.tsx`.
- **Test types**: Unit.
- **BDD Acceptance**:
  - **Given** I drop a 50MB file
  - **Then** I see error "El archivo es demasiado grande (Máx 20MB)".
