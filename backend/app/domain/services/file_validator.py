# [Feature: Image Conversion Core] [Story: ICC-USER-005] [Ticket: ICC-USER-005-BE-T01]

from typing import List, Optional
from pathlib import Path
from app.domain.services.security_utils import get_mime_type

class FileValidator:
    """
    Domain service for validating file properties (content type, size).
    """

    # Allowed mime types mapped to allowed extensions
    ALLOWED_MIME_TYPES = {
        "image/jpeg": ["jpg", "jpeg"],
        "image/png": ["png"],
        "image/webp": ["webp"],
        "image/bmp": ["bmp"],
        "image/gif": ["gif"],
    }
    
    MAX_SIZE_BYTES = 20 * 1024 * 1024  # 20MB

    def validate(self, file_content: bytes, filename: str) -> str:
        """
        Validates file size, magic numbers, and extension consistency.
        Raises ValueError if invalid.
        Returns the detected mime type.
        """
        # 1. Size Check
        if not file_content:
            raise ValueError("File is empty.")
            
        if len(file_content) > self.MAX_SIZE_BYTES:
            raise ValueError(f"File too large. Max size is {self.MAX_SIZE_BYTES // (1024*1024)}MB.")

        # 2. Magic Number Check (Verify real content)
        mime_type = get_mime_type(file_content)
        if mime_type not in self.ALLOWED_MIME_TYPES:
            raise ValueError(f"Invalid file type: {mime_type}. Content is not a supported image format.")
            
        # 3. Extension Consistency Check (Harden against renamed files)
        # [Feature: Image Conversion Core] [Story: ICC-USER-005] [Ticket: ICC-USER-005-BE-T01]
        ext = Path(filename).suffix.lower().lstrip('.')
        if ext not in self.ALLOWED_MIME_TYPES[mime_type]:
            raise ValueError(f"Extension mismatch: file claims to be .{ext} but content is {mime_type}.")
            
        return mime_type
