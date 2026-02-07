# Implementation Plan - ICC-BUG-001-FE-T01

## Ticket: Fix Config Encoding and Extension

### Context
The frontend build fails with `Unexpected "\xff" in JSON` (BOM issue) and `vite.config.js` CommonJS error (conflicting with ES Module type).

### Proposed Changes
1. **Remove Conflicting Config**: Delete `frontend/vite.config.js` (since we use `vite.config.ts`).
2. **Fix Encoding**: Re-write `frontend/tsconfig.json` and `frontend/tsconfig.app.json` ensuring no Byte Order Mark (BOM).
3. **Verify**: Run `npm run dev` to confirm startup.

### Verification Plan
- **Manual Verification**:
    - Run `npm run dev` in `frontend/`.
    - Expected: Vite server starts without error.
