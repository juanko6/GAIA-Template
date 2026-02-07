# ICC-USER-003-BE-T02 — Implementation Plan

**Source ticket**: `specs/features/image-conversion-core/tickets.md` → **ICC-USER-003-BE-T02**  
**Related user story**: **ICC-USER-003**  
**Plan version**: v1.0  
**Traceability**: `ICC-USER-003`

---

## 1) Context & Objective
- **Ticket summary**: `POST /convert` endpoint.
- **Impacted entities**: N/A.
- **Impacted services**: `ImageConverterService`.

## 2) Scope
- **In scope**: Route, Request DTO (file_id, target_format), Response DTO (download_url).

## 3) Detailed Work Plan
> **Container Check**: Backend container up.

### 3.1 Test-first sequencing
1. **Tests**: Valid request returns success. Invalid file_id returns 404.

## 4) Atomic Task Breakdown

### Task 1: Convert Route
- **Purpose**: Expose conversion.
- **Artifacts impacted**: `backend/app/presentation/routers/convert.py`.
- **Test types**: Integration.
- **BDD Acceptance**:
  - **Given** existing file_id
  - **When** POST /convert config
  - **Then** receive download link.
