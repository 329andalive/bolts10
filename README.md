# Bolts11 — Marketing & Compliance Website

Static marketing site for bolts11.com — automated SMS job notifications for trade service businesses.

## Pages

| Page | URL | File |
|---|---|---|
| Home | `/` | `index.html` |
| Privacy Policy | `/privacy-policy/` | `privacy-policy/index.html` |
| Terms & Conditions | `/terms-and-conditions/` | `terms-and-conditions/index.html` |
| Contact / Support | `/contact/` | `contact/index.html` |

---

## File Structure

```
bolts10-site/
├── index.html                    # Home page
├── privacy-policy/
│   └── index.html                # /privacy-policy/
├── terms-and-conditions/
│   └── index.html                # /terms-and-conditions/
├── contact/
│   └── index.html                # /contact/
├── css/
│   └── styles.css                # Shared stylesheet — no external dependencies
├── js/
│   └── main.js                   # Mobile nav toggle + contact form
├── vercel.json                   # Vercel: clean URLs, headers, redirect aliases
├── netlify.toml                  # Netlify: publish dir, headers, redirect aliases
├── _redirects                    # Cloudflare Pages: redirect aliases
├── _headers                      # Cloudflare Pages: security headers
└── README.md                     # This file
```

---

## Deployment

No build step. No dependencies. Deploy the `bolts10-site/` folder as the site root.

---

### Cloudflare Pages (Recommended)

Cloudflare Pages is the best choice here — it's fast globally, free, and your domain is
almost certainly already on Cloudflare DNS, which makes the custom domain step trivial.

#### Step 1 — Push to GitHub

Your repo must be on GitHub (or GitLab) for Cloudflare Pages to connect to it.

```bash
# From the agent_work_flow repo root:
git add bolts10-site/
git commit -m "Add Bolts11 marketing site"
git push origin main
```

#### Step 2 — Create the Pages project

1. Log into [dash.cloudflare.com](https://dash.cloudflare.com)
2. In the left sidebar: **Workers & Pages** → **Create application** → **Pages** tab
3. Click **Connect to Git** → authorize GitHub → select your repo
4. Configure the build settings:

   | Setting | Value |
   |---|---|
   | Project name | `bolts10` |
   | Production branch | `main` |
   | Framework preset | None |
   | Build command | *(leave blank)* |
   | Build output directory | `bolts10-site` |

5. Click **Save and Deploy**

Cloudflare will assign a preview URL like `bolts10.pages.dev` within about 30 seconds.

#### Step 3 — Verify _redirects and _headers are active

After deploy, open the Pages project → **Deployments** → click the latest deployment →
scroll down to **Functions** (or check the deployment log). You should see:

```
✓ _redirects parsed — 2 rules
✓ _headers parsed — 1 rule
```

To manually verify headers are live, run this from Terminal:

```bash
curl -I https://bolts10.pages.dev/
```

You should see in the response:
```
x-frame-options: DENY
x-content-type-options: nosniff
referrer-policy: strict-origin-when-cross-origin
```

#### Step 4 — Add custom domain (bolts11.com)

Because bolts11.com's DNS is already on Cloudflare, this is a one-click operation:

1. In your Pages project → **Custom domains** tab → **Set up a custom domain**
2. Enter `bolts11.com` → **Continue**
3. Cloudflare detects the domain is on your account and automatically creates the DNS record.
   Click **Activate domain**. No manual DNS editing needed.
4. To also cover `www.bolts11.com`, repeat: enter `www.bolts11.com` → **Continue** →
   **Activate domain**. Cloudflare creates a CNAME for www → bolts11.com.

SSL is provisioned automatically. The domain is live within 1–2 minutes.

#### Step 5 — Enable Full SSL/TLS + HSTS (Cloudflare Dashboard)

These are account-level settings, not Pages-specific. Go to:

**Cloudflare Dashboard → bolts11.com → SSL/TLS**

1. **Encryption mode** → set to **Full (strict)**
   - This encrypts traffic between Cloudflare and your origin. Pages is the origin here,
     so Full strict is correct and already supported.

2. **Edge Certificates** tab → scroll to **HTTP Strict Transport Security (HSTS)**
   - Click **Enable HSTS**
   - Recommended settings for a new domain:
     - Max Age: **6 months (15552000)** to start (upgrade to 1 year after you confirm everything works)
     - Include subdomains: **On** (only if you're sure all subdomains will be HTTPS)
     - Preload: **Off** for now (preloading is permanent and hard to undo — enable only when stable)
   - Click **Save**

> **Note:** HSTS means browsers will refuse to load your site over HTTP — forever (for the
> max-age duration). Don't enable it until you're confident the site is fully on HTTPS and
> working correctly.

---

### Vercel (Alternative)

#### Step 1 — Import the repo

1. Go to [vercel.com/new](https://vercel.com/new) and log in with GitHub
2. Click **Import** next to your repo
3. Configure:

   | Setting | Value |
   |---|---|
   | Root Directory | `bolts10-site` |
   | Framework Preset | **Other** |
   | Build Command | *(leave blank)* |
   | Output Directory | *(leave blank — defaults to root)* |

4. Click **Deploy**

`vercel.json` is automatically detected and applied — clean URLs, security headers,
and redirect aliases (`/privacy` → `/privacy-policy`, `/terms` → `/terms-and-conditions`)
are all active immediately.

#### Step 2 — Verify vercel.json was applied

After deploy, in the Vercel dashboard:
- **Settings** → **General** → confirm "Root Directory" is `bolts10-site`
- Test a redirect: visit `https://your-preview-url.vercel.app/privacy` — it should 301 to `/privacy-policy`
- Test headers with curl: `curl -I https://your-preview-url.vercel.app/` — look for `x-frame-options`

#### Step 3 — Add custom domain

1. Vercel project → **Settings** → **Domains**
2. Enter `bolts11.com` → **Add**
3. Vercel shows you two DNS options:
   - **Recommended (Nameservers):** point bolts11.com nameservers to Vercel's NS. This hands DNS control to Vercel.
   - **CNAME/A record:** keep DNS on Cloudflare, add these records:

     | Type | Name | Value |
     |---|---|---|
     | A | `@` | `76.76.21.21` |
     | CNAME | `www` | `cname.vercel-dns.com` |

4. Also add `www.bolts11.com` as a second domain in Vercel and set it to redirect to `bolts11.com`.

SSL is provisioned automatically via Let's Encrypt within a few minutes.

---

### Netlify (Alternative)

#### Step 1 — Import the repo

1. Go to [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import an existing project**
2. Connect GitHub → select your repo
3. Configure:

   | Setting | Value |
   |---|---|
   | Base directory | `bolts10-site` |
   | Build command | *(leave blank)* |
   | Publish directory | `.` (dot — the base directory itself) |

4. Click **Deploy site**

`netlify.toml` is automatically detected. It sets the publish directory, security headers,
and redirect aliases.

#### Step 2 — Verify netlify.toml was applied

1. Netlify dashboard → **Deploys** → click the latest deploy → **Deploy log**
2. Look for a line like: `Parsing of Netlify's configuration file netlify.toml`
3. Test a redirect: visit `https://your-preview-url.netlify.app/privacy` — should 301 to `/privacy-policy`

#### Step 3 — Add custom domain

1. Netlify project → **Domain management** → **Add a domain**
2. Enter `bolts11.com` → **Verify** → **Add domain**
3. Netlify shows required DNS records. If DNS is on Cloudflare, add:

   | Type | Name | Value |
   |---|---|---|
   | A | `@` | `75.2.60.5` |
   | CNAME | `www` | `[your-site-name].netlify.app` |

4. Also add `www.bolts11.com` in Netlify and configure it to redirect to `bolts11.com` (Netlify does this automatically).

SSL is provisioned automatically. Can take up to 24 hours for DNS to propagate.

---

## DNS Reference — bolts11.com on Cloudflare

If you use **Cloudflare Pages** (recommended), you will not need to manually add DNS records —
Cloudflare does it automatically when you activate the custom domain. The records it creates:

| Type | Name | Value | Proxy |
|---|---|---|---|
| CNAME | `@` (root) | `bolts10.pages.dev` | Proxied (orange cloud) |
| CNAME | `www` | `bolts11.com` | Proxied (orange cloud) |

If you use **Vercel or Netlify** and your DNS is on Cloudflare, add these manually in
**Cloudflare Dashboard → bolts11.com → DNS → Records**:

**For Vercel:**
| Type | Name | Value | Proxy |
|---|---|---|---|
| A | `@` | `76.76.21.21` | Proxied |
| CNAME | `www` | `cname.vercel-dns.com` | Proxied |

**For Netlify:**
| Type | Name | Value | Proxy |
|---|---|---|---|
| A | `@` | `75.2.60.5` | Proxied |
| CNAME | `www` | `[your-site].netlify.app` | DNS only (gray cloud) |

> **Cloudflare proxy note:** Keep the orange cloud (proxied) on Cloudflare. This routes
> traffic through Cloudflare's CDN and applies your SSL/TLS mode, HSTS, firewall rules,
> and DDoS protection. DNS-only (gray cloud) bypasses all of that.

---

## Pre-Launch Checklist

- [ ] Confirm `support@bolts11.com` is a live email alias
- [ ] Confirm `demo@bolts11.com` is a live email alias
- [ ] Replace `#booking-widget` placeholder in `index.html` with actual embed code
- [ ] Verify Privacy Policy URL resolves at `bolts11.com/privacy-policy`
- [ ] Verify Terms URL resolves at `bolts11.com/terms-and-conditions`
- [ ] Test STOP and HELP keyword auto-responses are wired in Flask app
- [ ] Confirm Telnyx webhook URL is live at Railway before going live
- [ ] Update copyright year in footer if needed
- [ ] Run all pages through [Google PageSpeed Insights](https://pagespeed.web.dev/) after deploy
- [ ] Submit bolts11.com to [Google Search Console](https://search.google.com/search-console) after go-live
- [ ] Verify security headers are active: `curl -I https://bolts11.com/`
- [ ] Verify `/privacy` → `/privacy-policy` redirect works
- [ ] Verify `/terms` → `/terms-and-conditions` redirect works
- [ ] Confirm HSTS is enabled in Cloudflare SSL/TLS settings (after confirming HTTPS works)
- [ ] Test Privacy Policy and Terms links in footer on all four pages
- [ ] Test contact form on mobile (375px viewport)
- [ ] Have legal counsel review and sign off on Privacy Policy and Terms effective dates

---

## Compliance Coverage

**Privacy Policy** includes required language for:
- CTIA Messaging Principles and Best Practices
- A2P 10DLC carrier requirements
- TCPA transactional message classification (not promotional)
- STOP keyword opt-out — honored immediately and recorded
- Mobile number collection at time of service booking
- No sale or sharing of numbers for marketing purposes
- Multi-tenant data isolation disclosure

**Terms & Conditions** cover:
- Client responsibilities for end-customer consent collection
- Minimum consent disclosure language (copy-ready for intake forms)
- Acceptable use policy — no spam, no marketing SMS
- TCPA indemnification by the Client business
- Limitation of Bolts11's liability
- Governing law (Delaware) and arbitration clause
