# [Feature: Image Conversion Core] [Story: ICC-USER-001] [Ticket: ICC-USER-001-BE-T01]

import os
import uuid
import shutil
from pathlib import Path
from fastapi import UploadFile
from app.domain.services.file_validator import FileValidator

class UploadService:
    """
    Application service to handle file upload orchestration.
    """
    
    TEMP_DIR = Path("temp_storage")

    def __init__(self):
        self.validator = FileValidator()
        self.TEMP_DIR.mkdir(exist_ok=True)

    async def save_temp_file(self, file: UploadFile) -> str:
        """
        Reads, validates, and saves the file to temporary storage.
        Returns the unique file_id.
        """
        # Read content for validation (Note: for very large files, this loads into memory. 
        # Optimized approach would use chunks, but validation requires header bytes at minimum.
        # Given 20MB limit, reading full content is acceptable for MVP.)
        content = await file.read()
        
        # Validate
        try:
            self.validator.validate(content, file.filename)
        except ValueError as e:
            raise e
        finally:
             await file.seek(0) # Reset cursor if needed later, though we have content now

        # Generate ID
        file_id = str(uuid.uuid4())
        
        # Save to disk
        # We preserve original extension for debugging, but ID is the key
        original_ext = Path(file.filename).suffix
        save_path = self.TEMP_DIR / f"{file_id}{original_ext}"
        
        with open(save_path, "wb") as f:
            f.write(content)
            
        return file_id
