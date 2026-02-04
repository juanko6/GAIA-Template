# [Feature: Image Conversion Core] [Story: ICC-USER-003] [Ticket: ICC-USER-003-BE-T02]

from fastapi import APIRouter, HTTPException, Depends
from app.application.dtos.conversion import ConvertRequest, ConvertResponse
from app.domain.services.image_converter import ImageConverterService
from app.application.services.upload_service import output_path_store # Quick hack: In real app use Repository
import shutil
import os
import uuid

# In-memory storage for converted files (Mocking persistence/cloud storage)
# Key: file_id, Value: local_path
CONVERTED_FILES_STORE = {}
UPLOAD_DIR = "uploads" # Shared with valid uploads

router = APIRouter()

@router.post("/convert", response_model=ConvertResponse)
async def convert_image(
    request: ConvertRequest,
    converter: ImageConverterService = Depends(ImageConverterService)
):
    # 1. Locate source file (mocked lookup from previous upload step)
    # In a real app, we'd query DB to get path from file_id
    # For this MVP, we assume file_id is the filename in uploads/ 
    # (Since we didn't implement a full DB mapping in T01, we'll assume file_id == filename for simplicity or implement a lookup)
    
    # Check if file exists in the global store from upload_service or disk
    # To keep it simple and stateless for this tickek without DB:
    # We will assume client sends the filename as file_id? OR
    # We check if file_id exists in UPLOAD_DIR
    
    source_path = os.path.join(UPLOAD_DIR, request.file_id)
    
    if not os.path.exists(source_path):
        raise HTTPException(status_code=404, detail="File not found")
        
    # 2. Convert
    output_dir = "converted"
    os.makedirs(output_dir, exist_ok=True)
    
    try:
        result_path = converter.convert(source_path, request.target_format, output_dir)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
        
    # 3. Generate Download URL (Mock)
    # in real world: generate presigned URL or generic static path
    new_file_id = os.path.basename(result_path)
    # We return a mock URL
    download_url = f"/download/{new_file_id}"
    
    return ConvertResponse(
        download_url=download_url,
        file_id=new_file_id,
        format=request.target_format.value
    )
