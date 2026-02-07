# [Feature: Image Conversion Core] [Story: ICC-USER-005] [Ticket: ICC-USER-005-OTH-T02]

import os
import time
from pathlib import Path
from scripts.cleanup_job import cleanup_storage

def test_cleanup_storage(tmp_path):
    # Setup: Create a temp directory and some files
    test_dir = tmp_path / "test_storage"
    test_dir.mkdir()
    
    old_file = test_dir / "old.txt"
    new_file = test_dir / "new.txt"
    
    old_file.write_text("old content")
    new_file.write_text("new content")
    
    # Mock mod time for old file (20 minutes ago)
    past_time = time.time() - (20 * 60)
    os.utime(old_file, (past_time, past_time))
    
    # Run cleanup (15 mins threshold)
    deleted_count = cleanup_storage([str(test_dir)], max_age_minutes=15)
    
    # Assert
    assert deleted_count == 1
    assert not old_file.exists()
    assert new_file.exists()

def test_cleanup_non_existent_dir():
    deleted_count = cleanup_storage(["non_existent_dir_gaia"], max_age_minutes=15)
    assert deleted_count == 0
