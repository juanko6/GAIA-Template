import asyncio
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.presentation.routers import upload, convert, download
from scripts.cleanup_job import cleanup_storage

app = FastAPI(
    title="Image Conversion API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# [Feature: Image Conversion Core] [Story: ICC-USER-005] [Ticket: ICC-USER-005-OTH-T02]
@app.on_event("startup")
async def schedule_cleanup():
    async def cleanup_loop():
        while True:
            # Run cleanup every 15 minutes
            cleanup_storage(["temp_storage", "converted"], max_age_minutes=15)
            await asyncio.sleep(15 * 60)
            
    asyncio.create_task(cleanup_loop())

# CORS Middleware (Generic default)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(upload.router, prefix="/api/v1", tags=["upload"])
app.include_router(convert.router, prefix="/api/v1", tags=["convert"])
app.include_router(download.router, prefix="/api/v1", tags=["download"])

@app.get("/health")
async def health_check():
    return {"status": "ok"}
