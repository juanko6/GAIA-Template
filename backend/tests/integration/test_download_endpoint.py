# [Feature: Image Conversion Core] [Story: ICC-USER-004] [Ticket: ICC-USER-004-BE-T01]

import pytest
from fastapi.testclient import TestClient
from app.main import app
import os
import time

client = TestClient(app)

def test_download_file_happy_path(tmp_path):
    # Setup: Create a fake converted file
    os.makedirs("converted", exist_ok=True)
    file_id = "test_download.png"
    file_path = os.path.join("converted", file_id)
    with open(file_path, "wb") as f:
        f.write(b"fake data")
        
    try:
        # Action
        response = client.get(f"/api/v1/download/{file_id}")
        
        # Assertions
        print(f"DEBUG HEADERS: {response.headers}")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}. Detail: {response.text}"
        assert response.content == b"fake data"
        assert "content-disposition" in response.headers

        assert file_id in response.headers["content-disposition"]
        
        # Check if file is gone - with a small delay for background task
        # Starlette's TestClient usually runs them before returning.
        assert not os.path.exists(file_path), "File should have been deleted by background task"


    finally:
        if os.path.exists(file_path):
            os.remove(file_path)

def test_download_file_not_found():
    response = client.get("/api/v1/download/non-existent.png")
    assert response.status_code == 404
