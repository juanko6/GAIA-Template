# Data Model

## Overview
Current data model for Image Conversion Core.

## Entities

### Ephemeral File (No DB Persistence yet)
- **file_id**: UUID (Unique identifier)
- **path**: `temp_storage/{file_id}.{ext}`
- **lifecycle**: Created on Upload, Deleted after Download or via cleanup job.
