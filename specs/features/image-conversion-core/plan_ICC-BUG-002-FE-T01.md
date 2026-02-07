# ICC-BUG-002-FE-T01 — Fix PostCSS Syntax Error & Encoding

**Source ticket**: `specs/features/image-conversion-core/tickets.md` → **ICC-BUG-002-FE-T01**  
**Related user story**: **ICC-BUG-002**  

---

## 1) Problem Analysis
- **Symptom**: `SyntaxError: Invalid or unexpected token` when Vite loads `postcss.config.js` or `tailwind.config.js`.
- **Root Cause**: 
  1. Files created via PowerShell redirection often have `UTF-16 LE BOM` encoding which Node.js (in Linux Container) cannot parse.
  2. Node version in `Dockerfile` (18-alpine) might be too old for latest Vite/Rollup in some contexts (though error implies syntax).
  3. `tailwindcss` v4 requires specific PostCSS setup if used via `@tailwindcss/postcss`.

## 2) Scope of Fix
- **Target Files**: 
  - `frontend/postcss.config.js`
  - `frontend/tailwind.config.js`
  - `frontend/Dockerfile` (Upgrade to Node 22 for stability).
- **Actions**:
  1. Delete and re-create config files with explicit `UTF-8` encoding.
  2. Ensure `Dockerfile` uses `node:22-alpine`.
  3. Verify `package.json` dependencies if needed.

## 3) Verification Plan
- **Test**: `docker-compose up --build`
- **Success**: Frontend container starts without `Pre-transform error`.
- **Check**: Access `http://localhost:5188` successfully.
