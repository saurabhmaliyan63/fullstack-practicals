# Git & GitHub Complete Linking Guide

This guide walks you through initializing a Git repository, linking your local code to a GitHub remote repository, and pushing your commits.

---

## 1. Initializing Git in Your Project

Open your terminal in the project directory:

```bash
# Initialize a local Git repository
git init

# Check the current status of tracked and untracked files
git status
```

---

## 2. Setting Up `.gitignore`

Always ignore sensitive files and heavy build directories (`node_modules/`, `.env`):

Create a file named `.gitignore`:
```gitignore
node_modules/
.env
.DS_Store
dist/
build/
*.log
```

---

## 3. Staging and Committing Changes

```bash
# Stage all files for commit
git add .

# Create your first commit with a descriptive message
git commit -m "feat: complete full stack practical projects"
```

---

## 4. Linking to GitHub

1. Open your browser and go to **[GitHub](https://github.com)**.
2. Click the **`+`** icon in the top right corner and select **"New repository"**.
3. Enter a repository name (e.g. `fullstack-practicals`), choose **Public**, and leave "Initialize with README" unchecked.
4. Copy the repository URL (e.g. `https://github.com/your-username/fullstack-practicals.git`).

Now link the remote repository in your terminal:

```bash
# Rename default branch to 'main'
git branch -M main

# Add the GitHub remote repository
git remote add origin https://github.com/your-username/fullstack-practicals.git

# Verify the remote URL
git remote -v

# Push your code to GitHub
git push -u origin main
```

---

## 5. Ongoing Daily Git Workflow

Whenever you make updates to your project:

```bash
# 1. View changes
git status

# 2. Stage changes
git add .

# 3. Commit changes
git commit -m "feat: add user authentication and styling improvements"

# 4. Push updates to GitHub
git push
```
