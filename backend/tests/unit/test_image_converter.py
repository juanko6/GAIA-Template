# [Feature: Image Conversion Core] [Story: ICC-USER-003] [Ticket: ICC-USER-003-BE-T01]

import os
import shutil
import pytest
from PIL import Image
from app.domain.services.image_converter import ImageConverterService
from app.domain.constants import ImageFormat

@pytest.fixture
def temp_dirs(tmp_path):
    source_dir = tmp_path / "source"
    output_dir = tmp_path / "output"
    source_dir.mkdir()
    output_dir.mkdir()
    return source_dir, output_dir

def test_convert_png_to_jpg_transparency(temp_dirs):
    source_dir, output_dir = temp_dirs
    converter = ImageConverterService()

    # Create a 1x1 transparent PNG
    png_path = source_dir / "test.png"
    img = Image.new("RGBA", (100, 100), (255, 0, 0, 0)) # Fully transparent red
    img.save(str(png_path))

    # Convert to JPEG
    output_path = converter.convert(str(png_path), ImageFormat.JPEG, str(output_dir))

    # Assertions
    assert os.path.exists(output_path)
    assert output_path.endswith(".jpeg")
    
    # Check result visual (should be white due to bg compositing)
    with Image.open(output_path) as res:
        assert res.format == "JPEG"
        assert res.mode == "RGB"
        # Center pixel check
        pixel = res.getpixel((50, 50))
        assert pixel == (255, 255, 255) # White

def test_convert_fails_invalid_path(temp_dirs):
    _, output_dir = temp_dirs
    converter = ImageConverterService()
    
    with pytest.raises(FileNotFoundError):
        converter.convert("non_existent.png", ImageFormat.PNG, str(output_dir))
