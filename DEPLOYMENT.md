# GitHub Pages Deployment Guide

This guide will help you deploy your portfolio to GitHub Pages.

## Prerequisites
- GitHub account
- Git installed on your computer
- Node.js and npm installed

## Deployment Steps

### 1. Create GitHub Repository
1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right → "New repository"
3. Repository name: `My-portfolio`
4. Make it **Public** (required for free GitHub Pages)
5. **Do NOT** initialize with README (you already have files)
6. Click "Create repository"

### 2. Push Your Code to GitHub

Open terminal in your project folder and run:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit your changes
git commit -m "Initial commit"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/My-portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under "Build and deployment":
   - Source: Select **GitHub Actions**
5. The workflow will automatically deploy your site

### 4. Wait for Deployment

1. Go to the **Actions** tab in your repository
2. You'll see the "Deploy to GitHub Pages" workflow running
3. Wait for it to complete (usually 1-2 minutes)
4. Once complete, your site will be live!

### 5. Access Your Website

Your portfolio will be available at:
```
https://YOUR_USERNAME.github.io/My-portfolio/
```

Replace `YOUR_USERNAME` with your GitHub username.

## Manual Deployment (Alternative)

If you prefer to deploy manually:

```bash
# Install dependencies (first time only)
npm install

# Deploy to GitHub Pages
npm run deploy
```

This will build and deploy to the `gh-pages` branch.

## Updating Your Website

After making changes:

```bash
git add .
git commit -m "Update portfolio"
git push
```

The GitHub Action will automatically rebuild and redeploy your site.

## Troubleshooting

### Site not loading / 404 errors
- Make sure the repository is **Public**
- Check that GitHub Pages is enabled in Settings → Pages
- Verify the workflow completed successfully in the Actions tab
- Clear your browser cache

### CSS/Images not loading
- The `vite.config.ts` file sets the correct base path
- Make sure you pushed all files including `vite.config.ts`

### Build fails
- Check the Actions tab for error messages
- Ensure `package.json` and `package-lock.json` are committed
- Try running `npm run build` locally to test

## Custom Domain (Optional)

To use a custom domain:
1. Add a `CNAME` file to the `public` folder with your domain
2. Configure DNS settings with your domain provider
3. Enable custom domain in GitHub Pages settings

## Need Help?

- Check the [GitHub Pages documentation](https://docs.github.com/en/pages)
- Review workflow logs in the Actions tab
- Ensure all files are committed and pushed
