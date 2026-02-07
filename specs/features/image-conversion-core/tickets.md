# Image Conversion Core — Implementation Tickets

Feature: Image Conversion Core (ICC)
Source: `specs/features/image-conversion-core/user-stories.md`

Global Dependencies:
- Backend: FastAPI setup with Image Processing Lib (Pillow).
- Frontend: React setup with Component Library.
- Infrastructure: Temporary file storage config.

---

### Story: ICC-USER-001 — Upload Image

#### Tickets for ICC-USER-001

1. - [x] **ICC-USER-001-BE-T01 — Validate & Upload Endpoint** (2026-02-03)
   - **Type**: BE
   - **Description**: Create an API endpoint `POST /upload` that accepts form-data. Implement validation: Max size (20MB), Mime-type check (Magic numbers for jpg, png, webp, bmp, gif). Save file to temp storage and return a `file_id`.
   - **Scope**: Included: Magic number check, Size check, Temp storage.
   - **Dependencies**: None.
   - **Deliverables**: FastAPI Endpoint, Pydantic Model (if metadata needed), Pytest for validation (valid/invalid files).

2. - [x] **ICC-USER-001-FE-T02 — File Upload Component** (2026-02-03)
   - **Type**: FE
   - **Description**: Implement a Drag & Drop zone and "Browse" button. Use a library like `react-dropzone`. Validate size/type client-side for immediate feedback. Show upload progress (simulated or real).
   - **Scope**: Included: UI Component, Drag state, file selection.
   - **Dependencies**: T01 (for integration, but can be mocked).
   - **Deliverables**: `UploadZone.tsx`, Unit tests.

3. - [x] **ICC-USER-001-FE-T03 — Image Preview State** (2026-02-04)
   - **Type**: FE
   - **Description**: Once file is selected, read it locally (FileReader API) to show a thumbnail preview before sending or after backend confirmation.
   - **Scope**: Included: Preview container, remove button.
   - **Dependencies**: T02.
   - **Deliverables**: `ImagePreview.tsx`.

---

### Story: ICC-USER-002 — Select Output Format

#### Tickets for ICC-USER-002

1. - [x] **ICC-USER-002-FE-T01 — Format Selection UI** (2026-02-04)
   - **Type**: FE
   - **Description**: Create a dropdown/select component listing supported formats (JPG, PNG, WEBP, BMP, GIF). Ensure styling matches brand.
   - **Scope**: Included: State management for selected format.
   - **Dependencies**: None.
   - **Deliverables**: `FormatSelector.tsx`.

2. - [x] **ICC-USER-002-BE-T02 — Supported Formats Config** (2026-02-04)
   - **Type**: BE
   - **Description**: Define a centralized Enum/Config for supported formats in the backend to ensure validation consistency.
   - **Scope**: Included: Enum definition, shared logic.
   - **Dependencies**: None.
   - **Deliverables**: `constants.py` or Enums.

---

### Story: ICC-USER-003 — Execute Conversion

#### Tickets for ICC-USER-003

1. - [x] **ICC-USER-003-BE-T01 — Image Conversion Logic** (2026-02-04)
   - **Type**: BE
   - **Description**: Implement the core service logic using Pillow. Function: `convert_image(source_path, target_format)`. Handle Transparency: If Target=JPG, composite over White background.
   - **Scope**: Included: Pillow integration, Error handling.
   - **Dependencies**: ICC-USER-001-BE-T01.
   - **Deliverables**: Domain Service `ImageConverter`, Unit Tests (checking tranparency handling).

2. - [x] **ICC-USER-003-BE-T02 — Conversion Endpoint** (2026-02-04)
   - **Type**: BE
   - **Description**: Create endpoint `POST /convert`. Input: `file_id`, `target_format`. Calls the conversion service. Returns: `download_url` or binary stream.
   - **Scope**: Included: API Controller, Exception mapping.
   - **Dependencies**: T01.
   - **Deliverables**: FastAPI Route, Integration Test.

3. - [x] **ICC-USER-003-FE-T03 — Conversion Flow Integration** (2026-02-04)
   - **Type**: FE
   - **Description**: Connect the "Convert" button to the API. specific "Loading" state handling (spinner/progress bar). Error toast if API fails.
   - **Scope**: Included: API Client integration, Loading UI.
   - **Dependencies**: T02.
   - **Deliverables**: `ConverterForm.tsx` (integration).

---

### Story: ICC-USER-004 — Download Result

#### Tickets for ICC-USER-004

1. - [x] **ICC-USER-004-BE-T01 — Download Endpoint & Cleanup** (2026-02-04)
   - **Type**: BE
   - **Description**: Endpoint `GET /download/{file_id}`. Stream the file content with correct Content-Disposition header (original_name.ext). Trigger async cleanup task to delete file after successful stream (or use a background scheduler).
   - **Scope**: Included: File streaming, Cleanup hook.
   - **Dependencies**: ICC-USER-003-BE-T02.
   - **Deliverables**: FastAPI Route, BackgroundTask for cleanup.

2. - [x] **ICC-USER-004-FE-T02 — Download Action UI** (2026-02-07)
   - **Type**: FE
   - **Description**: Display "Download" button after successful conversion. On click, trigger the browser download.
   - **Scope**: Included: Download button component, Link handling.
   - **Dependencies**: T01.
   - **Deliverables**: UI update in `ConverterForm`.

---

### Story: ICC-USER-005 — Security & Validation

#### Tickets for ICC-USER-005

1. - [x] **ICC-USER-005-BE-T01 — Security Hardening (File Types)** (2026-02-07)
   - **Type**: BE
   - **Description**: Ensure `python-magic` or similar is used to verify file content, not just extension. Reject known malware signatures if possible (scope limited to basic implementation).
   - **Scope**: Included: Enhanced validation logic.
   - **Dependencies**: ICC-USER-001-BE-T01.
   - **Deliverables**: Security Utility module, Test cases with renamed exe files.

2. - [x] **ICC-USER-005-OTH-T02 — Storage Lifecycle Policy** (2026-02-07)
   - **Type**: OTH
   - **Description**: Define and implement the cron job or logic to clean up `temp/` directory for any orphaned files older than X minutes (e.g., 15 mins).
   - **Scope**: Included: Cleanup Script/Scheduler.
   - **Deliverables**: `cleanup_job.py`.

---

### Story: ICC-BUG-001 — Fix Frontend Build Config

#### Tickets for ICC-BUG-001

1. - [x] **ICC-BUG-001-FE-T01 — Fix Config Encoding and Extension** (2026-02-04)
   - **Type**: FE
   - **Description**: Frontend build fails due to UTF-8 BOM in `tsconfig.json` and conflicting/invalid `vite.config.js` (when `ts` exists and type is module).
   - **Scope**: Delete `vite.config.js`. Recreate `tsconfig.json` and `tsconfig.app.json` with clean encoding. Verify `npm run dev`.
   - **Dependencies**: None.
   - **Deliverables**: Working build.
