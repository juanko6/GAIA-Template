# User Stories — Image Conversion Core

## 1. Introduction
The **Image Conversion Core** feature enables users to convert images between formats (JPG, PNG, WEBP, etc.) efficiently. The primary goals are speed (<3s) and simplicity, with no permanent data retention.

---

## 2. User Stories

### Story: ICC-USER-001 — Upload Image
**As a** General User  
**I want to** upload an image file from my device  
**So that** I can prepare it for conversion.

**Acceptance Criteria**

**Scenario 1: Successful Upload via Selection**
- **Given** I am on the home page
- **When** I click the "Select File" button and choose a valid image (JPG, <20MB)
- **Then** the file is uploaded to the processing area
- **And** I see a preview thumbnail of the image.

**Scenario 2: Successful Upload via Drag & Drop**
- **Given** I am on the home page
- **When** I drag a valid image file (PNG) into the drop zone
- **Then** the file is accepted and uploaded
- **And** I see a preview thumbnail.

**Scenario 3: Invalid File Type**
- **Given** I am on the home page
- **When** I attempt to upload a `.pdf` file
- **Then** I see an error message "Format not supported"
- **And** the file is rejected.

**Scenario 4: File Too Large**
- **Given** I am on the home page
- **When** I attempt to upload an image larger than 20MB
- **Then** I see an error message "File too large (Max 20MB)"
- **And** the file is rejected.

---

### Story: ICC-USER-002 — Select Output Format
**As a** General User  
**I want to** select the desired output format  
**So that** I convert the image to the specific type I need.

**Acceptance Criteria**

**Scenario 1: View Available Formats**
- **Given** I have uploaded an image
- **When** I open the format selection dropdown
- **Then** I see the list: JPG, PNG, WEBP, BMP, GIF.

**Scenario 2: Distinct Format Restriction**
- **Given** I uploaded a JPG image
- **When** I view the format options
- **Then** I can select PNG or WEBP
- **And** if I select JPG (same as input), the system warns or disables the useless conversion (optional UI polish).

---

### Story: ICC-USER-003 — Execute Conversion
**As a** Content Creator  
**I want to** trigger the conversion process  
**So that** I can obtain the transformed file.

**Acceptance Criteria**

**Scenario 1: Successful Conversion**
- **Given** I have selected a target format (e.g., WEBP)
- **When** I click "Convert"
- **Then** the system processes the image
- **And** I see a "Converting..." loading state
- **And** the process completes within 3 seconds (for standard files).

**Scenario 2: Transparency Handling (JPG Output)**
- **Given** I uploaded a PNG with transparency
- **And** I selected JPG as output
- **When** I convert the image
- **Then** the transparent areas are filled with White background (default rule).

**Scenario 3: Conversion Failure**
- **Given** a server error occurs during processing
- **When** I click "Convert"
- **Then** I see a user-friendly error message "Conversion failed, please try again"
- **And** the system logs the error internally.

---

### Story: ICC-USER-004 — Download Result
**As a** General User  
**I want to** download the converted image  
**So that** I can use it on my device.

**Acceptance Criteria**

**Scenario 1: Manual Download**
- **Given** the conversion is complete
- **When** the success screen appears
- **Then** I see a "Download Image" button
- **And** clicking it saves the file with the original name + new extension (e.g., `photo.webp`).

**Scenario 2: Cleanup after Download**
- **Given** I have downloaded the file
- **When** I leave the page or after a short timeout
- **Then** the temporary file is deleted from the server (handled by retention policy).

---

### Story: ICC-USER-005 — Security & Validation (NFR)
**As a** Security Officer  
**I want to** ensure input files are sanitized  
**So that** malicious files do not compromise the server.

**Acceptance Criteria**

**Scenario 1: Magic Number Validation**
- **Given** a malicious user renames a `.exe` to `.png`
- **When** they attempt to upload it
- **Then** the server detects the invalid magic number/mime-type
- **And** rejects the file immediately.
