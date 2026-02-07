# [Feature: Image Conversion Core] [Story: ICC-USER-001] [Ticket: ICC-USER-001-BE-T01]

from fastapi import APIRouter, UploadFile, File, HTTPException, status
from pydantic import BaseModel
from app.application.services.upload_service import UploadService

router = APIRouter(tags=["Upload"])
upload_service = UploadService()

class UploadResponse(BaseModel):
    file_id: str
    message: str

@router.post("/upload", response_model=UploadResponse, status_code=status.HTTP_201_CREATED)
async def upload_image(file: UploadFile = File(...)):
    """
    Uploads an image file.
    Validates size (<20MB) and type (JPG, PNG, WEBP, BMP, GIF).
    Returns a file_id for subsequent operations.
    """
    try:
        file_id = await upload_service.save_temp_file(file)
        return UploadResponse(file_id=file_id, message="File uploaded successfully")
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        # Log this in a real app
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error")
