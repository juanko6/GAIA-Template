# [Feature: Image Conversion Core] [Story: ICC-USER-003] [Ticket: ICC-USER-003-BE-T01]

import os
from PIL import Image
from app.domain.constants import ImageFormat

class ImageConverterService:
    def convert(self, source_path: str, target_format: ImageFormat, output_dir: str) -> str:
        """
        Converts image at source_path to target_format.
        Saves output to output_dir.
        Returns the path to the converted file.
        """
        if not os.path.exists(source_path):
            raise FileNotFoundError(f"Source file not found: {source_path}")

        try:
            with Image.open(source_path) as img:
                # Handle Transparency for JPEG/BMP (strip alpha)
                if target_format == ImageFormat.JPEG or target_format == ImageFormat.BMP:
                    if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
                        # Create white background
                        bg = Image.new('RGB', img.size, (255, 255, 255))
                        # Convert to ensure mask usage
                        img = img.convert("RGBA")
                        bg.paste(img, mask=img.split()[3])
                        img = bg
                    else:
                        img = img.convert("RGB")
                
                # Construct output path
                filename = os.path.basename(source_path)
                name, _ = os.path.splitext(filename)
                
                # Pillow format mapping
                pil_format = target_format.value.upper()
                if pil_format == 'JPG': pil_format = 'JPEG'
                
                new_filename = f"{name}.{target_format.value}"
                output_path = os.path.join(output_dir, new_filename)
                
                img.save(output_path, format=pil_format)
                return output_path

        except Exception as e:
            raise RuntimeError(f"Conversion failed: {str(e)}")
