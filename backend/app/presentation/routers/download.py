# [Feature: Image Conversion Core] [Story: ICC-USER-004] [Ticket: ICC-USER-004-BE-T01]

from fastapi import APIRouter, HTTPException, BackgroundTasks
from fastapi.responses import FileResponse
import os

router = APIRouter()

CONVERTED_DIR = "converted"

def remove_file(path: str):
    """
    Background task to remove file after download.
    """
    if os.path.exists(path):
        os.remove(path)

@router.get("/download/{file_id}")
async def download_file(file_id: str, background_tasks: BackgroundTasks):
    # [Feature: Image Conversion Core] [Story: ICC-USER-004] [Ticket: ICC-USER-004-BE-T01]
    file_path = os.path.join(CONVERTED_DIR, file_id)
    
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")
        
    # Schedule cleanup
    background_tasks.add_task(remove_file, file_path)
    
    return FileResponse(
        path=file_path,
        filename=file_id,
        media_type='application/octet-stream'
    )
