# ICC-USER-003-BE-T01 — Implementation Plan

**Source ticket**: `specs/features/image-conversion-core/tickets.md` → **ICC-USER-003-BE-T01**  
**Related user story**: **ICC-USER-003** (Execute Conversion)  
**Plan version**: v1.0  
**Traceability**: `ICC-USER-003`

---

## 1) Context & Objective
- **Ticket summary**: Core conversion service using Pillow. Handles RGBA -> RGB (transparency to white) for JPEG.
- **Impacted entities**: Files on disk.
- **Impacted services**: `ImageConverterService`.
- **Impacted tests**: `Scenario 2: Transparency Handling`.

## 2) Scope
- **In scope**: Pillow integration, Format conversion, Temp file output.
- **Out of scope**: API access.

## 3) Detailed Work Plan
> **Container Check**: Backend container up.

### 3.1 Test-first sequencing
1. **Tests**: Input PNG (transparent) -> Output JPG (White background).
2. **Imp**: `Image.open()`, `convert("RGB")` if needed, `save()`.

### 3.2 NFR hooks
- **Performance**: Ensure file handles are closed.

## 4) Atomic Task Breakdown

### Task 1: Converter Implementation
- **Purpose**: The logic.
- **Artifacts impacted**: `backend/app/domain/services/image_converter.py`.
- **Test types**: Unit.
- **BDD Acceptance**:
  - **Given** a transparent PNG
  - **When** converting to JPG
  - **Then** file saved is valid JPG with white background.
