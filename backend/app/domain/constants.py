# [Feature: Image Conversion Core] [Story: ICC-USER-002] [Ticket: ICC-USER-002-BE-T02]

from enum import Enum

class ImageFormat(str, Enum):
    """
    Supported image formats for conversion.
    Values correspond to Pillow-compatible format names (mostly).
    """
    JPEG = "jpeg"
    PNG = "png"
    WEBP = "webp"
    BMP = "bmp"
    GIF = "gif"

    @classmethod
    def list_values(cls):
        return [c.value for c in cls]
