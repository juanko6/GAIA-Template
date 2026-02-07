# [Feature: Image Conversion Core] [Story: ICC-USER-005] [Ticket: ICC-USER-005-BE-T01]

import pytest
from app.domain.services.file_validator import FileValidator

def test_validate_valid_jpeg():
    validator = FileValidator()
    # JPEG magic number: FF D8 FF E0
    valid_jpeg = b'\xff\xd8\xff\xe0' + b'\x00' * 10
    # Note: python-magic might need more bytes to be sure, but let's try.
    # Actually, a better way is to use a small valid image buffer if this fails.
    try:
        validator.validate(valid_jpeg, "test.jpg")
    except ValueError as e:
        pytest.fail(f"Validator failed on valid JPEG: {e}")

def test_validate_too_large():
    validator = FileValidator()
    large_content = b'0' * (validator.MAX_SIZE_BYTES + 1)
    with pytest.raises(ValueError, match="File too large"):
        validator.validate(large_content, "large.jpg")

def test_validate_invalid_type_renamed_exe():
    validator = FileValidator()
    # Executable magic number (MZ): 4D 5A
    exe_content = b'MZ' + b'\x00' * 100
    with pytest.raises(ValueError, match="Content is not a supported image format"):
        validator.validate(exe_content, "real_image.jpg")

def test_validate_mismatched_extension():
    validator = FileValidator()
    # Real PNG, but called .jpg
    minimal_png = b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x06\x00\x00\x00\x1f\x15\xc4\x89\x00\x00\x00\nIDATx\x9cc\x00\x01\x00\x00\x05\x00\x01\r\n-\xb4\x00\x00\x00\x00IEND\xaeB`\x82'
    with pytest.raises(ValueError, match="Extension mismatch"):
        validator.validate(minimal_png, "image.jpg")

def test_validate_empty_file():
    validator = FileValidator()
    with pytest.raises(ValueError):
        validator.validate(b'', "empty.jpg")
