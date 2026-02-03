# ICC-USER-005-BE-T01 — Implementation Plan

**Source ticket**: `specs/features/image-conversion-core/tickets.md` → **ICC-USER-005-BE-T01**  
**Related user story**: **ICC-USER-005** (Security & Validation)  
**Plan version**: v1.0  
**Traceability**: `ICC-USER-005`

---

## 1) Context & Objective
- **Ticket summary**: Hardening file validation with `python-magic`.
- **Impacted services**: `FileValidator`.

## 2) Scope
- **In scope**: Reading file header bytes. Map to mime types. Reject mismatch.

## 3) Detailed Work Plan
> **Container Check**: Backend container up.

### 3.1 Test-first sequencing
1. **Tests**: Rename `.exe` to `.jpg` and try upload. Must fail.

## 4) Atomic Task Breakdown

### Task 1: Magic Number Implementation
- **Purpose**: Security.
- **Artifacts impacted**: `backend/app/domain/services/file_validator.py`.
- **Test types**: Unit.
- **BDD Acceptance**:
  - **Given** fake JPG
  - **When** detecting mime
  - **Then** return application/octet-stream or x-msdos-program and Fail validation.
