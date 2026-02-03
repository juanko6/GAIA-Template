# ICC-USER-001-BE-T01 — Implementation Plan

**Source ticket**: `specs/features/image-conversion-core/tickets.md` → **ICC-USER-001-BE-T01**  
**Related user story**: **ICC-USER-001** (from `specs/features/image-conversion-core/user-stories.md`)  
**Plan version**: v1.0 — (Antigravity, 2026-02-03)  
**Traceability**: All tasks must include inline references to `ICC-USER-001-BE-T01` and `ICC-USER-001` scenario names/tags.

---

## 1) Context & Objective
- **Ticket summary**: Implement the `POST /upload` endpoint to handle image uploads. It must validate file size (max 20MB) and type (via magic numbers) before saving to temporary storage and returning a `file_id`.
- **Impacted entities**: `uploaded_files` (in-memory or temp storage reference, no DB table yet).
- **Impacted services**: `UploadService`, `FileValidator`.
- **Impacted tests**: Matches `Scenario 1: Successful Upload via Selection`, `Scenario 3: Invalid File Type`, `Scenario 4: File Too Large`.

## 2) Scope
- **In scope**: FastAPI endpoint, Pydantic validation, python-magic/mime-type check, saving file to local `temp/` folder, returning UUID.
- **Out of scope**: Permanent DB persistence, User auth, Frontend integration.
- **Assumptions**: `temp/` directory is ephemeral and shared with the worker/cleanup process.
- **Open questions**: N/A.

## 3) Detailed Work Plan (TDD + BDD)
> **Container Check**: Ensure `docker-compose.yml` exists and backend container is running.

### 3.1 Test-first sequencing
1. **Define tests**: Create `tests/integration/test_upload_endpoint.py`. define cases for:
   - Valid JPG/PNG.
   - File > 20MB (mocked file size).
   - Invalid extension/mime (e.g., .pdf renamed to .jpg).
2. **Minimal implementation**: 
   - Create `FileValidator` domain service.
   - Create `UploadService` application service.
   - Wire into `POST /upload`.
3. **Refactor**: extracting magic number logic to a reusable constant/config.

### 3.2 NFR hooks
- **Security**: Validate *content* (magic numbers), not just extension. Strip metadata if possible (deferred).
- **Performance**: Use `UploadFile` (spooled) to avoid memory spikes.
- **Observability**: Log file size and detected mime-type (no PII).

## 4) Atomic Task Breakdown

### Task 1: Setup Validator & Domain Logic
- **Purpose**: Implement core validation rules (Size < 20MB, Valid Magic Numbers).
- **Prerequisites**: Docker backend running.
- **Artifacts impacted**: `backend/app/domain/services/file_validator.py`.
- **Test types**: Unit.
- **BDD Acceptance**:
  - **Given** a file with magic number `%PDF` and name `image.jpg`
  - **When** validated
  - **Then** it raises `InvalidFileTypeError`.

### Task 2: Implement Upload Application Service
- **Purpose**: Orchestrate validation and file saving to `temp/`.
- **Prerequisites**: Task 1.
- **Artifacts impacted**: `backend/app/application/services/upload_service.py`.
- **Test types**: Unit.
- **BDD Acceptance**:
  - **Given** a valid byte stream
  - **When** `save_temp_file` is called
  - **Then** file is written to disk and a UUID is returned.

### Task 3: Create POST /upload Endpoint
- **Purpose**: Expose logic via HTTP.
- **Prerequisites**: Task 2.
- **Artifacts impacted**: `backend/app/presentation/routers/upload.py`.
- **Test types**: Integration.
- **BDD Acceptance**:
  - **Given** the service is up
  - **When** `POST /upload` with valid image
  - **Then** 201 Created and JSON `{ "file_id": "..." }`.
