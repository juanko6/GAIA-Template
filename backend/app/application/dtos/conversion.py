# [Feature: Image Conversion Core] [Story: ICC-USER-003] [Ticket: ICC-USER-003-BE-T02]

from pydantic import BaseModel
from app.domain.constants import ImageFormat

class ConvertRequest(BaseModel):
    file_id: str
    target_format: ImageFormat
    
    class Config:
        extra = "forbid"

class ConvertResponse(BaseModel):
    download_url: str
    file_id: str
    format: str
