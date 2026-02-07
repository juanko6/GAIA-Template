# [Feature: Image Conversion Core] [Story: ICC-USER-001] [Ticket: ICC-USER-001-BE-T01]

import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app
import os
from pathlib import Path

# Fixture for async client
@pytest.fixture
async def async_client():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        yield client

@pytest.mark.asyncio
async def test_upload_valid_image(async_client):
    # Simulate a small valid PNG (Signature: 89 50 4E 47 0D 0A 1A 0A)
    # create a tiny valid PNG file in memory
    content = b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x02\x00\x00\x00\x90wS\xde\x00\x00\x00\x0cIDAT\x08\xd7c\xf8\xff\xff?\x00\x05\xfe\x02\xfe\xdc\xccY\xe7\x00\x00\x00\x00IEND\xaeB`\x82'
    
    files = {'file': ('test.png', content, 'image/png')}
    
    response = await async_client.post("/api/v1/upload", files=files)
    
    assert response.status_code == 201
    data = response.json()
    assert "file_id" in data
    assert data["message"] == "File uploaded successfully"
    
    # Cleanup (check temp folder if integration really wrote disk)
    # Not strictly unit test, but good integration check. 
    # In a real setup we'd patch the temp dir.

@pytest.mark.asyncio
async def test_upload_invalid_type(async_client):
    # Text file masquerading as JPG
    content = b"This is not a generic image."
    files = {'file': ('fake.jpg', content, 'image/jpeg')}
    
    response = await async_client.post("/api/v1/upload", files=files)
    
    assert response.status_code == 400
    assert "Invalid file type" in response.json()["detail"]


