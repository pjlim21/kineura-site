# Kineura — Static Marketing Site

A static, GitHub Pages–ready marketing site for **Kineura**, a wearable EMG + IMU platform for runners and athletes.

> *Insights at every stride.*

## Stack

Pure static site, no build step:

- `index.html` — single-page site with all sections
- `styles.css` — design system, layout, and responsive rules
- `script.js` — header, mobile nav, scroll reveal, form handling
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

The interactive demo iframe loads `https://pjlim21.github.io/kineura_mockup/`. If that domain is unreachable, the page also renders a fallback "Open it in a new tab" link.

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
- Problem statement: *Most wearables track the workout. Kineura tracks how your body is handling it.*
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
