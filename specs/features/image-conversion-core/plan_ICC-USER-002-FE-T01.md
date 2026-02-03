# ICC-USER-002-FE-T01 — Implementation Plan

**Source ticket**: `specs/features/image-conversion-core/tickets.md` → **ICC-USER-002-FE-T01**  
**Related user story**: **ICC-USER-002** (Select Output Format)  
**Plan version**: v1.0  
**Traceability**: `ICC-USER-002`

---

## 1) Context & Objective
- **Ticket summary**: Implementation of the format selector dropdown.
- **Impacted entities**: UI State (`targetFormat`).
- **Impacted services**: `FormatSelector` component.
- **Impacted tests**: `Scenario 1: View Available Formats`.

## 2) Scope
- **In scope**: Dropdown (Select) with [JPG, PNG, WEBP, BMP, GIF].
- **Out of scope**: Backend validation.
- **Assumptions**: Using shadcn/ui `Select`.

## 3) Detailed Work Plan
> **Container Check**: FE container must be up.

### 3.1 Test-first sequencing
1. **Tests**: Render check, selection change event.
2. **Imp**: Wrap shadcn Select.
3. **Refactor**: Use constants for format list.

### 3.2 NFR hooks
- **Accessibility**: Label properly linked. Keyboard support (Arrows to pick format).

## 4) Atomic Task Breakdown

### Task 1: Format Selector Component
- **Purpose**: selection UI.
- **Artifacts impacted**: `frontend/src/features/image-conversion/components/FormatSelector.tsx`.
- **Test types**: Component.
- **BDD Acceptance**:
  - **When** I open the selector
  - **Then** I see "PNG", "JPG", "WEBP".
