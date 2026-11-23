# Practical 10: Cloud Deployment & GitHub Integration

## Aim
Deploy full-stack web applications to cloud hosting platforms (Netlify for front-end, Heroku/Render for back-end) and link projects with GitHub for CI/CD continuous deployment.

## Contents
1. [DEPLOYMENT_GUIDE.md](file:///d:/Programs/fullstack%20pratical/10-deployment-guide/DEPLOYMENT_GUIDE.md):
   - Netlify continuous deployment via GitHub & Netlify Drop.
   - Render Web Service configuration & environment variable management.
   - Heroku deployment CLI instructions with `Procfile`.
   - Production CORS & API URL bridging.
2. [GIT_CHEAT_SHEET.md](file:///d:/Programs/fullstack%20pratical/10-deployment-guide/GIT_CHEAT_SHEET.md):
   - `git init`, `.gitignore`, commits, branching, linking remote GitHub repository, and pushing updates.
3. [config-templates/](file:///d:/Programs/fullstack%20pratical/10-deployment-guide/config-templates/):
   - `netlify.toml`: SPA redirect rules & security headers.
   - `_redirects`: Fallback redirects for client-side routing.
   - `Procfile`: Process declaration for Heroku / Railway.
   - `render.yaml`: Infrastructure-as-code blueprint for Render.
   - `vercel.json`: Serverless function configuration for Vercel.
