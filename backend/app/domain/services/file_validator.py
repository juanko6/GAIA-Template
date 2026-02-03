# [Feature: Image Conversion Core] [Story: ICC-USER-001] [Ticket: ICC-USER-001-BE-T01]

import magic
from typing import List

class FileValidator:
    """
    Domain service for validating file properties (content type, size).
    """

    # Allowed mime types mapped to extensions (for verifying consistency if needed)
    ALLOWED_MIME_TYPES = {
        "image/jpeg": ["jpg", "jpeg"],
        "image/png": ["png"],
        "image/webp": ["webp"],
        "image/bmp": ["bmp"],
        "image/gif": ["gif"],
    }
    
    MAX_SIZE_BYTES = 20 * 1024 * 1024  # 20MB

    def validate(self, file_content: bytes, filename: str) -> None:
        """
        Validates file size and magic numbers.
        Raises ValueError if invalid.
        """
        # 1. Size Check
        if len(file_content) > self.MAX_SIZE_BYTES:
            raise ValueError(f"File too large. Max size is {self.MAX_SIZE_BYTES // (1024*1024)}MB.")

        # 2. Magic Number Check
        mime_type = magic.from_buffer(file_content, mime=True)
        if mime_type not in self.ALLOWED_MIME_TYPES:
            raise ValueError(f"Invalid file type: {mime_type}. Allowed: {list(self.ALLOWED_MIME_TYPES.keys())}")
            
        return mime_type
