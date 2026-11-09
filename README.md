# Salama Legacy Centre

> **Advancing Research, Innovation & Academic Excellence**  
> *"Service with Dignity is Our Hallmark"*  
> **Official Website:** [www.salamalegacy.co.ke](https://www.salamalegacy.co.ke)  
> **Director & Lead Investigator:** Dr. Muthoka J.K, PhD  
> **Location:** Salama Town, Makueni County, Kenya  
> **Official Email:** [salamalegacy@gmail.com](mailto:salamalegacy@gmail.com)  
> **Direct WhatsApp:** [+254 724 158 187](https://wa.me/254724158187)

---

## 🏛️ About the Centre

Salama Legacy Centre is a premier multidisciplinary research, professional training, and institutional consultancy institute located in Salama Town, Makueni County, Kenya. The Centre provides ethical, community-centered research, field data integrity frameworks (CAPI), devolved governance policy advisory, and scholarly publications across Eastern Africa.

---

## 🚀 Quick Start & Local Development

### Prerequisites
- **Node.js**: v20.0 or higher
- **npm**: v10.0 or higher

### Installation & Run
```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Type-check with TypeScript
npm run lint

# 4. Build for production
npm run build

# 5. Preview the production build locally
npm run preview
```

---

## 📦 Deployment & Publishing

### GitHub Pages (Automated via GitHub Actions)
This repository includes an automated workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

When you push to the `main` (or `master`) branch:
1. GitHub Actions automatically installs dependencies (`npm ci || npm install`).
2. Runs TypeScript verification (`npm run lint`).
3. Compiles the production bundle (`npm run build`).
4. Deploys the `./dist` folder to the `gh-pages` branch with the custom domain `www.salamalegacy.co.ke` preserved.

#### Enabling GitHub Pages in Repository Settings:
1. On GitHub, navigate to your repository's **Settings** tab.
2. In the left sidebar, click **Pages**.
3. Under **Build and deployment**:
   - **Source**: Select **Deploy from a branch**.
   - **Branch**: Select `gh-pages` and folder `/ (root)`.
   - Click **Save**.
4. Under **Custom domain**: Ensure `www.salamalegacy.co.ke` is entered, and check **Enforce HTTPS**.

### Vercel / Netlify / Cloudflare Pages
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node Version**: `20.x`

---

## 🌐 Custom Domain DNS Setup

To point your custom domain `www.salamalegacy.co.ke` to GitHub Pages:
- **CNAME Record**:
  - Host: `www`
  - Value: `<your-github-username>.github.io`
- **Apex A Records** (for `salamalegacy.co.ke`):
  - `185.199.108.153`
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`

---

## 🛡️ License & Copyright

Copyright © 2026 Salama Legacy Centre. All Rights Reserved.  
*Service with Dignity is Our Hallmark.*
