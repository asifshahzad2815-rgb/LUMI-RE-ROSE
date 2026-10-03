# LUMIÈRE ROSE
### Haute Skincare & Luxury Cosmetics

A modern, high-conversion luxury skincare and cosmetic web application built with React, Vite, and Tailwind CSS. Featuring interactive botanical product catalogs, fluid cart drawer, order modal, smooth animations, and interactive gaze tracking.

---

## 🌐 Opening the Website on GitHub

If you are hosting or viewing this repository on GitHub, you can publish and open the live website using any of the following methods:

### Method 1: Automatic Deployment via GitHub Actions (Recommended)
This repository includes an automated GitHub Actions deployment workflow (`.github/workflows/deploy.yml`):
1. In your GitHub repository, click on **Settings** (top navigation bar).
2. On the left sidebar, click **Pages**.
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. That's it! Every time you push code, GitHub will automatically build and publish your website to:
   `https://<your-username>.github.io/<your-repo-name>/`

### Method 2: Instant Branch Deployment (No Setup)
If you prefer not to use GitHub Actions:
1. In your GitHub repository, navigate to **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
3. Under **Branch**, select `main` and set the folder to **`/docs`**.
4. Click **Save**. The website will be live in 1–2 minutes!

### Method 3: Deploy from Repository Root
This repository is configured so that even if you choose branch `main` and folder **`/ (root)`**, the application automatically detects static hosting and loads the pre-bundled assets in `assets/`.

---

## 💻 Local Development

To run the application locally on your computer:

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Building for Production

To create a production build:

```bash
npm run build
```

This compiles optimized bundles to `dist/`, syncs them to `docs/` for GitHub Pages, and creates stable fallback bundles in `assets/`.

---

## ✨ Features
- **Haute Skincare & Cosmetics Catalog**: Interactive category filters, product details, stock indicators, and customer reviews.
- **Interactive Face & Gaze Tracking**: Interactive model portrait where gaze tracks cursor/touch movement with 3D orientation.
- **Luxury Sweeping Button Transitions**: Left-to-right color wash effect on hover that smoothly retracts on mouse leave.
- **Cart & Order Card Modal**: Real-time bag calculation, promo discounts, sample selections, and checkout.
- **Zero-Config GitHub Pages**: Full compatibility with GitHub Actions, `/docs` directory, and root deployments.
