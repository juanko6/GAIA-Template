from fastapi.testclient import TestClient
from app.main import app
import os

client = TestClient(app)
os.makedirs("temp_storage", exist_ok=True)
dummy_id = "debug.png"
with open(f"temp_storage/{dummy_id}", "wb") as f:
    # 1x1 valid PNG
    f.write(b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x06\x00\x00\x00\x1f\x15\xc4\x89\x00\x00\x00\rIDATx\x9cc\xf8\xcf\xc0\x00\x00\x03\x01\x01\x00\x18\xdd\x8d\xb0\x00\x00\x00\x00IEND\xaeB`\x82')

print("Sending request to /api/v1/convert...")
response = client.post(
    "/api/v1/convert",
    json={"file_id": dummy_id, "target_format": "jpeg"}
)
print(f"Status: {response.status_code}")
print(f"Data: {response.json()}")
