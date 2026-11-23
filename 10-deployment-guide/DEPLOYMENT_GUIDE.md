# Practical 10: Complete Deployment Guide (Netlify, Heroku & Render)

This practical details the industry workflows for deploying full-stack web applications into production, connecting them with GitHub CI/CD continuous deployment, and setting production environment variables.

---

## Part A: Deploying Front-End to Netlify

Netlify is the industry standard for deploying static websites, single-page applications (React, Vue), and frontend code with continuous deployment from GitHub.

### Method 1: Automatic Deployment via GitHub (Recommended)
1. Push your frontend project to GitHub (follow `GIT_CHEAT_SHEET.md`).
2. Log in to [Netlify](https://app.netlify.com).
3. Click **"Add new site"** > **"Import an existing project"**.
4. Select **GitHub** and authorize access.
5. Choose your repository.
6. Configure the build settings:
   - **Base directory**: `01-responsive-portfolio` (or `09-fullstack-ecommerce/frontend` or `03-react-todo-app`)
   - **Build command**: Leave blank for static HTML/JS, or `npm run build` for React/Vite.
   - **Publish directory**: `.` for vanilla projects, or `dist` for Vite/React.
7. Click **"Deploy Site"**.
8. Netlify provides an SSL-secured live URL (e.g. `https://my-portfolio-alex.netlify.app`).
   *Every future `git push` to your GitHub main branch will automatically trigger a new deployment!*

### Method 2: Manual Drag & Drop (Instant 10-second deploy)
1. Go to [Netlify Drop](https://app.netlify.com/drop).
2. Drag and drop any folder containing `index.html` (e.g. `01-responsive-portfolio`).
3. Your site goes live instantly with HTTPS!

### Method 3: Netlify CLI
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=.
```

---

## Part B: Deploying Back-End to Render (Free Modern Alternative to Heroku)

Render provides free cloud hosting for Node.js web services and databases.

### Step-by-Step Render Deployment:
1. Ensure your backend project folder contains:
   - `package.json` with a valid `"start": "node server.js"` script.
   - Using dynamic port: `const PORT = process.env.PORT || 5000;`.
2. Push your project to GitHub.
3. Go to [Render Dashboard](https://dashboard.render.com).
4. Click **"New +"** > **"Web Service"**.
5. Connect your GitHub repository.
6. Configure the Service:
   - **Name**: `ecommerce-backend-api`
   - **Root Directory**: `09-fullstack-ecommerce/backend` (or `04-express-basic-routing`, etc.)
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`
7. In the **Environment Variables** tab, add your secrets:
   - `NODE_ENV` = `production`
   - `JWT_SECRET` = `your_strong_production_secret`
   - `MONGODB_URI` = `your_mongodb_atlas_connection_string` (for MongoDB projects)
8. Click **"Create Web Service"**.
9. Render will deploy your service and assign a public HTTPS endpoint (e.g. `https://ecommerce-backend-api.onrender.com`).

---

## Part C: Deploying Back-End to Heroku

### Using Heroku CLI:
1. Install Heroku CLI: `npm install -g heroku`
2. Log in:
   ```bash
   heroku login
   ```
3. Create a Heroku App:
   ```bash
   heroku create my-fullstack-express-api
   ```
4. Verify your `Procfile` exists in the backend root:
   ```
   web: node server.js
   ```
5. Set environment variables on Heroku:
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set JWT_SECRET=super_secret_jwt_key
   ```
6. Deploy your code:
   ```bash
   git push heroku main
   ```
7. Open your live API:
   ```bash
   heroku open
   ```

---

## Part D: Connecting Deployed Frontend to Deployed Backend

In production, update your frontend API base URL:

```javascript
// frontend/app.js
const API_BASE = window.location.hostname === 'localhost' 
  ? 'http://localhost:5005/api' 
  : 'https://ecommerce-backend-api.onrender.com/api';
```

This guarantees seamless local testing while pointing to your cloud backend in production!
