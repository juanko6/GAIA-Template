# [Feature: Image Conversion Core] [Story: ICC-USER-001] [Ticket: ICC-USER-001-BE-T01]

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.presentation.routers import upload, convert, download

app = FastAPI(
    title="Image Conversion API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

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
