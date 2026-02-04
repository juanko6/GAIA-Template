# [Feature: Image Conversion Core] [Story: ICC-USER-002] [Ticket: ICC-USER-002-BE-T02]

from app.domain.constants import ImageFormat

def test_image_format_values():
    assert ImageFormat.JPEG.value == "jpeg"
    assert ImageFormat.PNG.value == "png"
    assert "webp" in ImageFormat.list_values()
    assert len(ImageFormat) >= 5
