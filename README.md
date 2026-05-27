# WAI Capital Region Chapter — Website

Website for the Women In Aviation International Capital Region Chapter (WAI-CRC), serving the Northern Virginia and greater Washington D.C. area.

---

## Pages

| File | Page | Description |
|---|---|---|
| `index.html` | Home | Hero, programs, upcoming events, Geneva CTA |
| `about.html` | About Us | Mission, values, leadership, chapter timeline |
| `get-involved.html` | Get Involved | Membership info, how to join, Geneva onboarding |
| `news.html` | News & Events | News feed, Google Calendar embed, events sidebar |
| `volunteer-form.html` | Contact & Volunteer | Contact form, volunteer sign-up, FAQ |
| `donate.html` | Girls in Aviation Day | GIAD info, donation form, fundraising progress |
| `wasp-map.html` | WASP Map | WASP gravesite interactive map and pilot database |

---

## Editing Content (No Code Required)

All news posts, events, and site settings are managed through the **admin panel** at `/admin`. You do not need to edit any HTML files to update content.

### What You Can Edit in the Admin Panel

- **News & Announcements** — add, edit, or delete news posts
- **Events** — add, edit, or delete upcoming events (shown on the News page sidebar and calendar)
- **Site Settings** — contact email, Google Calendar ID, social media links, fundraising goal, chapter dues

---

## Deploying to Netlify (One-Time Setup)

Netlify is required to use the `/admin` content editor. It is free.

### Step 1 — Merge the branch to main

1. Go to `https://github.com/brentbreeden79/wia`
2. Click **Pull requests** → **New pull request**
3. Set base: `main`, compare: `claude/ecstatic-brown-RGsuA`
4. Click **Create pull request** → **Merge pull request**

### Step 2 — Create a Netlify account

1. Go to [netlify.com](https://netlify.com) and sign up for a free account
2. Click **"Add new site"** → **"Import from Git"**
3. Click **"GitHub"** and authorize Netlify to access your repositories
4. Select the **`brentbreeden79/WIA`** repository
5. Set the following:
   - **Branch:** `main`
   - **Publish directory:** `.` (a single dot — means the root folder)
   - Leave the build command blank
6. Click **"Deploy site"**

Your site will be live in about 1 minute at a URL like `random-name.netlify.app`.

### Step 3 — Enable the admin panel (Netlify Identity)

1. In the Netlify dashboard, click **"Site configuration"** in the left sidebar
2. Click **"Identity"** → click **"Enable Identity"**
3. Under **"Registration preferences"** → select **"Invite only"**
4. Scroll down to **"Services"** → click **"Enable Git Gateway"**

### Step 4 — Invite yourself as an admin

1. Still in the Identity section, click **"Invite users"**
2. Enter your email address and click **"Send"**
3. Check your email for an invitation — click the link to set your password
4. You can invite other editors the same way

### Step 5 — Log in to the admin panel

1. Go to `yoursite.netlify.app/admin`
2. Log in with the email and password you just set
3. You will see the content editor with three sections: News, Events, and Site Settings

---

## Setting Up the Google Calendar

The News page shows an embedded Google Calendar. To connect it:

### Step 1 — Get your Google Calendar ID

1. Go to [calendar.google.com](https://calendar.google.com)
2. In the left sidebar, hover over your WAI-CRC calendar and click the **three dots (⋮)**
3. Click **"Settings and sharing"**
4. Scroll down to **"Integrate calendar"**
5. Copy the **Calendar ID** — it looks like `abc123@group.calendar.google.com`

### Step 2 — Make the calendar public

1. In the same settings page, scroll to **"Access permissions for events"**
2. Check **"Make available to public"**
3. Click **OK** on the warning

### Step 3 — Add the Calendar ID to the site

1. Go to `yoursite.netlify.app/admin`
2. Click **"Site Settings"** → **"General Settings"**
3. Paste the Calendar ID into the **"Google Calendar ID"** field
4. Click **"Save"** — the calendar will appear on the News page automatically

---

## Connecting a Custom Domain

If you own a custom domain (e.g. `wai-crc.com`):

### In Netlify

1. Go to **Domain management** in your Netlify dashboard
2. Click **"Add a domain"** → enter your domain name → **"Verify"**
3. Netlify will show you DNS records to add

### At your domain registrar (e.g. GoDaddy, Namecheap)

Add the following DNS records:

**For `www.yourdomain.com`:**
| Type | Host | Value |
|---|---|---|
| CNAME | www | `your-site-name.netlify.app` |

**For the root domain (`yourdomain.com`):**
| Type | Host | Value |
|---|---|---|
| A | @ | `75.2.60.5` |

DNS changes can take up to 24 hours to propagate. Once done, Netlify automatically provisions a free SSL certificate (HTTPS).

---

## Running Locally (For Testing)

No build step is required. Run a local web server from the project folder:

```bash
cd /path/to/WIA
python3 -m http.server 8080
```

Then open [http://localhost:8080](http://localhost:8080) in your browser. Press `Ctrl+C` to stop.

> **Note:** The `/admin` panel and dynamic content loading require a server (not just opening the HTML file directly). Always use the local server command above when testing.

---

## File Structure

```
WIA/
├── index.html            # Home page
├── about.html            # About Us
├── get-involved.html     # Get Involved / Membership
├── news.html             # News & Events (with Google Calendar)
├── volunteer-form.html   # Contact & Volunteer Form
├── donate.html           # Girls in Aviation Day / Donate
├── wasp-map.html         # WASP Gravesite Map
├── css/
│   └── styles.css        # Shared design system (colors, fonts, components)
├── js/
│   └── main.js           # Shared JavaScript (navbar, forms, animations)
├── data/
│   ├── news.json         # News posts — edited via /admin
│   ├── events.json       # Upcoming events — edited via /admin
│   └── settings.json     # Site settings — edited via /admin
├── admin/
│   ├── index.html        # Netlify CMS entry point
│   └── config.yml        # CMS configuration (collections, fields)
├── images/
│   └── uploads/          # Images uploaded via the admin panel
└── netlify.toml          # Netlify deployment configuration
```

---

## WAI National Links

- WAI International: [wai.org](https://www.wai.org)
- Join WAI: [wai.org/join](https://www.wai.org/join)
- Scholarships: [wai.org/scholarships](https://www.wai.org/scholarships)
- Annual Conference: [wai.org/conferences](https://www.wai.org/conferences)
