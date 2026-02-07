# ICC-USER-001-FE-T03 — Implementation Plan

**Source ticket**: `specs/features/image-conversion-core/tickets.md` → **ICC-USER-001-FE-T03**  
**Related user story**: **ICC-USER-001** (from `specs/features/image-conversion-core/user-stories.md`)  
**Plan version**: v1.0 — (Antigravity, 2026-02-03)  
**Traceability**: All tasks must include inline references to `ICC-USER-001` scenarios.

---

## 1) Context & Objective
- **Ticket summary**: Show a preview thumbnail of the selected image using `FileReader` API immediately after selection.
- **Impacted entities**: UI State (`previewUrl`).
- **Impacted services**: `ImagePreview` component.
- **Impacted tests**: `Scenario 1: Successful Upload via Selection`.

## 2) Scope
- **In scope**: Reading `File` object content, Displaying `img` tag, Remove button to clear selection.
- **Out of scope**: Editing.
- **Assumptions**: N/A.

## 3) Detailed Work Plan (TDD + BDD)
> **Container Check**: Ensure frontend container is healthy.

### 3.1 Test-first sequencing
1. **Define tests**: Verify `img` src is set when file passed. Verify remove callback.
2. **Implementation**: Use `useEffect` implementation of `FileReader` or `URL.createObjectURL`.
3. **Refactor**: Ensure memory cleanup (`URL.revokeObjectURL`).

### 3.2 NFR hooks
- **Performance**: Use `URL.createObjectURL` (faster than base64 FileReader). Revoke on unmount.
- **Accessibility**: `alt` text defaults to "Vista previa de imagen".

## 4) Atomic Task Breakdown

### Task 1: Preview Logic (Hook)
- **Purpose**: Encapsulate `URL.createObjectURL` logic.
- **Prerequisites**: N/A.
- **Artifacts impacted**: `frontend/src/features/image-conversion/hooks/useImagePreview.ts`.
- **Test types**: Unit.
- **BDD Acceptance**:
  - **Given** a file object
  - **When** hooked
  - **Then** a valid blob URL is returned.

### Task 2: ImagePreview Component
- **Purpose**: specific UI for the image + remove button.
- **Prerequisites**: Task 1.
- **Artifacts impacted**: `frontend/src/features/image-conversion/components/ImagePreview.tsx`.
- **Test types**: Component.
- **BDD Acceptance**:
  - **Given** a preview URL
  - **Then** the image is displayed with correct aspect ratio.
  - **When** I click "Eliminar" (icon X)
  - **Then** the `onClear` callback is triggered.
