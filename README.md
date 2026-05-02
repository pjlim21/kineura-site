# Kineura — Static Marketing Site

A static, GitHub Pages–ready marketing site for **Kineura**, a wearable EMG + IMU platform for runners and athletes.

> *Insights at every stride.*

## Stack

Pure static site, no build step:

- `index.html` — single-page site with all sections
- `styles.css` — design system, layout, and responsive rules
- `script.js` — header, mobile nav, scroll reveal, metric modal, native phone demo (tabs, EMG waveform, detail drawer), form handling
- `assets/img/` — photography for hero, metric cards, use cases, plus the Kineura wordmark
- `favicon.svg`, `og-image.svg` — assets
- `404.html` — friendly fallback for GitHub Pages
- `robots.txt`, `sitemap.xml` — basic SEO
- `.nojekyll` — disables Jekyll processing on GitHub Pages

## Local development

Any static file server works. From the repo root:

```bash
python3 -m http.server 8080
# or
npx serve .
```

Then visit http://localhost:8080/.

The interactive demo is now implemented natively in the page (no iframe). It mirrors the dashboard, EMG, and trends views from the original `kineura_mockup`, with tap-through metric detail (What is it / How is it measured / Why it matters / Research validation).

## Assets

- `assets/img/kineura-wordmark-cropped.png` — Kineura wordmark, cropped tightly from the source PNG so it scales without empty padding.
- `assets/img/hero-poster.jpg` — fallback poster for the hero video, taken from the Wix hero clip.
- The hero `<video>` streams directly from `https://video.wixstatic.com/video/bee5e3_57d041944a114fd59c90aa651ebfb15c/720p/mp4/file.mp4` so the same footage that appears on `kineura.com` plays here. If you'd rather self-host, download that file and any preferred resolution variant into `assets/video/` and update `index.html`.
- `assets/img/metric-*.jpg` and `athlete-*.jpg` — sport / training photography from Unsplash (license: free for commercial and editorial use). Replace with your own art when available.

## Enabling GitHub Pages (private repo)

GitHub Pages from a **private** repository requires either GitHub Pro / Team / Enterprise on the repo's account, or making the repo public. To enable Pages once eligible:

1. Go to **Settings → Pages** in the GitHub repo (`pjlim21/kineura-site`).
2. Under **Build and deployment**:
   - **Source**: *Deploy from a branch*
   - **Branch**: `main`
   - **Folder**: `/ (root)`
3. Click **Save**. GitHub will publish the site at:
   - `https://pjlim21.github.io/kineura-site/`
4. Wait ~1–2 minutes for the first build, then refresh.

If your account/plan does not support Pages on private repos, options are:

- Make the repository public (Settings → General → Danger Zone → *Change repository visibility*), then enable Pages as above.
- Upgrade the account to a plan that supports Pages on private repos.
- Deploy via **GitHub Actions** to a separate public Pages site, or to another static host (Netlify, Vercel, Cloudflare Pages).

### Custom domain (optional, **not configured here**)

A `CNAME` file has **not** been added. To attach a custom domain later:

1. In **Settings → Pages → Custom domain**, enter the domain (e.g. `www.kineura.com`) and save.
   GitHub will create a `CNAME` file in the repo automatically.
2. At your DNS provider, create the appropriate records:
   - **Apex domain** (`kineura.com`): four `A` records pointing to GitHub Pages IPs:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
     (and AAAA records for IPv6 if desired).
   - **Subdomain** (`www.kineura.com`): a single `CNAME` record pointing to `pjlim21.github.io`.
3. Back in **Settings → Pages**, enable **Enforce HTTPS** once the certificate provisions.

DNS changes are out of scope for this repo and have not been performed.

## Content notes

All copy on the site is approved messaging. Notable lines:

- Hero headline: *Insights at every stride.*
- Hero subhead: *Kineura combines wearable EMG and motion sensing to help runners and athletes understand fatigue, imbalance, biomechanics, and recovery in real time.*
- Problem statement: *Most wearables track the workout. Kineura tracks how your body handles it.*
- Responsible-claims block: *Kineura supports training insight and performance decision-making. It is not a substitute for medical diagnosis or treatment.*

## Early access form

The form on the page is **not** wired to a backend. Submitting it opens the user's email client with a pre-filled message to `hello@kineura.com`. The UI clearly states this. Replace `hello@kineura.com` in `index.html` and `script.js` if you want a different inbox, or wire it up to a service such as Formspree, Netlify Forms, or a custom endpoint when ready.

## Accessibility & SEO

- Semantic landmarks (`header`, `nav`, `main`, `footer`, `section`).
- Skip-to-content link, visible focus states, `prefers-reduced-motion` support.
- Open Graph and Twitter card meta tags.
- `robots.txt` + `sitemap.xml` included.

## License

Copyright © Kineura. All rights reserved.
