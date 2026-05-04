# Kineura — Static Marketing Site

A static, GitHub Pages–ready marketing site for **Kineura**, a wearable EMG + IMU platform for runners and athletes.

> *Insights at every stride.*

## Stack

Pure static site, no build step:

- `index.html` — single-page site with all sections
- `styles.css` — design system, layout, and responsive rules
- `script.js` — header, mobile nav, scroll reveal, metric modal, sleeve diagram connector lines, early-access form (progressive-enhancement AJAX over FormSubmit.co)
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
- `assets/img/kineura-sleeve.jpg` — product render of the Kineura lower-leg biosensor sleeve. Used in the Problem / Product explainer module, with native HTML/CSS callouts overlaid for the four key components (EMG dry electrodes, IMU sensor, multi-layer compression sleeve, wireless sync).

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

The form is wired to [FormSubmit.co](https://formsubmit.co), a free form-relay
service that lets a static site receive submissions without a backend.
Submissions are delivered to **`pjlim21@gmail.com`** via email.

Captured fields: **name, email, role, message** (plus a hidden honeypot for
spam) and FormSubmit's standard reCAPTCHA challenge.

### First-time activation (one-time, manual)

FormSubmit requires the recipient to confirm the address before it will
relay submissions. Until that's done, FormSubmit responds to any submit by
sending an activation email instead of forwarding the form data.

1. Deploy the site (or run it locally) and submit the form once with any
   real email address.
2. Open the inbox at **`pjlim21@gmail.com`** — there will be an email from
   FormSubmit titled something like *"Confirm your email"*. Click the
   activation link inside.
3. From that point on, every form submission is forwarded to
   `pjlim21@gmail.com` formatted as a table (name / email / role / message).

> Until activation, real visitors who try to submit will see FormSubmit's
> activation prompt instead of the success message. Activate before
> launching publicly.

### Hiding the email address (optional, post-activation)

The plain endpoint embeds the email in the page HTML, which scrapers can
read. After activation, FormSubmit emails a random alias URL (e.g.
`https://formsubmit.co/<random-hash>`). Swap the `action=` attribute on the
`<form>` in `index.html` to that alias to keep the address out of the page.

### Switching providers later

To move to Formspree, Netlify Forms, Wix Forms (via a Wix backend HTTP
function), or a custom endpoint, replace the `<form action="…">` URL and
the matching AJAX URL transform in `script.js`. The form's field names
(`name`, `email`, `role`, `message`) are conventional and map cleanly to
most providers.

### Privacy / messaging note

The form's small print states: *Submissions are sent to Kineura for early
access follow-up. We'll never share your address.* No automated CRM or
analytics tracking is implemented — submissions arrive as plain email.

## Accessibility & SEO

- Semantic landmarks (`header`, `nav`, `main`, `footer`, `section`).
- Skip-to-content link, visible focus states, `prefers-reduced-motion` support.
- Open Graph and Twitter card meta tags.
- `robots.txt` + `sitemap.xml` included.

## License

Copyright © Kineura. All rights reserved.
