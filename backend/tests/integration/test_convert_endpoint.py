# [Feature: Image Conversion Core] [Story: ICC-USER-003] [Ticket: ICC-USER-003-BE-T02]

from fastapi.testclient import TestClient
from app.main import app
from app.domain.constants import ImageFormat
import os
import shutil

client = TestClient(app)

def test_convert_endpoint_success():
    # 1. Setup: Place a dummy file in uploads/
    os.makedirs("uploads", exist_ok=True)
    dummy_id = "test_convert.png"
    with open(f"uploads/{dummy_id}", "wb") as f:
        # Create valid min png
        # 1x1 red pixel png
        f.write(b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x06\x00\x00\x00\x1f\x15\xc4\x89\x00\x00\x00\rIDATx\x9cc\xf8\xcf\xc0\x00\x00\x03\x01\x01\x00\x18\xdd\x8d\xb0\x00\x00\x00\x00IEND\xaeB`\x82')

    # 2. Call Convert
    response = client.post(
        "/api/v1/convert",
        json={
            "file_id": dummy_id,
            "target_format": "jpeg"
        }
    )

    # 3. Assert
    assert response.status_code == 200
    data = response.json()
    assert "download_url" in data
    assert data["format"] == "jpeg"
    assert data["download_url"].endswith(".jpeg")

    # Cleanup
    if os.path.exists(f"uploads/{dummy_id}"):
        os.remove(f"uploads/{dummy_id}")
    if os.path.exists("converted"):
        shutil.rmtree("converted")

def test_convert_not_found():
    response = client.post(
        "/api/v1/convert",
        json={
            "file_id": "non_existent_ghost.png",
            "target_format": "webp"
        }
    )
    assert response.status_code == 404
