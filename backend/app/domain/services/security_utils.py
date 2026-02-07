# [Feature: Image Conversion Core] [Story: ICC-USER-005] [Ticket: ICC-USER-005-BE-T01]

import magic
from typing import Optional

def get_mime_type(content: bytes) -> str:
    """
    Returns the mime type of the content using magic numbers.
    """
    if not content:
        return "application/x-empty"
    return magic.from_buffer(content, mime=True)
