# Architectural Model

## System Context
The system is a simple file conversion utility.

```mermaid
C4Context
    title System Context diagram for Image Converter

    Person(user, "User", "A person who wants to convert an image.")
    System(backend, "Image Conversion API", "FastAPI Backend", "Handles validation and conversion.")
    System_Ext(filesystem, "Temp Storage", "Local Disk", "Stores uploaded and converted files temporarily.")

    Rel(user, backend, "Uploads Image", "HTTPS/Multipart")
    Rel(backend, filesystem, "Writes/Reads", "File I/O")
```

## Backend Structure (Hexagonal)

The backend follows a Clean/Hexagonal architecture:

- **Domain (`backend/app/domain`)**:
  - `FileValidator`: Pure logic for validating file constraints (magic numbers, size).
  - `ImageConverter`: Logic for format conversion using Pillow.
- **Application (`backend/app/application`)**:
  - `UploadService`: Orchestrates the flow (Validate -> Save to Disk -> Return ID).
- **Presentation (`backend/app/presentation`)**:
  - `routers/upload.py`: FastAPI endpoints for uploading.
  - `routers/convert.py`: FastAPI endpoints for starting conversion.
  - `routers/download.py`: FastAPI endpoints for file retrieval with auto-cleanup.
- **Infrastructure**:
  - Currently direct File I/O within the Application Service.

