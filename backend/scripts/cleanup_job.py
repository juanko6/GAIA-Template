# [Feature: Image Conversion Core] [Story: ICC-USER-005] [Ticket: ICC-USER-005-OTH-T02]

import os
import time
from pathlib import Path

def cleanup_storage(directories: list[str], max_age_minutes: int = 15):
    """
    Deletes files older than max_age_minutes in the specified directories.
    """
    now = time.time()
    max_age_seconds = max_age_minutes * 60
    
    count = 0
    for directory in directories:
        dir_path = Path(directory)
        if not dir_path.exists():
            print(f"Directory {directory} does not exist. Skipping.")
            continue
            
        print(f"Scanning {directory}...")
        for file_path in dir_path.iterdir():
            if file_path.is_file():
                file_age = now - file_path.stat().st_mtime
                if file_age > max_age_seconds:
                    try:
                        file_path.unlink()
                        print(f"Deleted: {file_path.name} (age: {int(file_age/60)} mins)")
                        count += 1
                    except Exception as e:
                        print(f"Error deleting {file_path}: {e}")
                        
    print(f"Cleanup finished. Total files deleted: {count}")
    return count

if __name__ == "__main__":
    # Directories relative to the root of the project (if run from backend/)
    # For Docker environment, these are in /app/
    STORAGE_DIRS = ["temp_storage", "converted"]
    cleanup_storage(STORAGE_DIRS)
