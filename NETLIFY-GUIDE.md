# WAI-CRC Website — Netlify Deployment & User Guide

This guide walks you through putting the chapter website online with **Netlify** (free) and then using it day-to-day — adding events, posting news with photos, and updating site info — all from your web browser, with no coding.

**Who this is for:** the chapter's site owner and any board members who will manage content.

---

# Part 1 — Put the Site Online (One-Time Setup)

You only do this section once. Total time: about 15 minutes.

## Step 1 — Merge the website code to `main`

The website code lives on GitHub. Netlify will publish whatever is on the `main` branch.

1. Go to `https://github.com/brentbreeden79/WIA`
2. Click **Pull requests** → **New pull request**
3. Set **base:** `main` and **compare:** `claude/ecstatic-brown-RGsuA`
4. Click **Create pull request**, then **Merge pull request**

## Step 2 — Create a Netlify account and connect the site

1. Go to [app.netlify.com/signup](https://app.netlify.com/signup) and choose **Sign up with GitHub** (easiest — one less password)
2. Once signed in, click **Add new site** → **Import an existing project**
3. Choose **GitHub** and authorize Netlify when asked
4. Select the **`brentbreeden79/WIA`** repository
5. On the settings screen:
   - **Branch to deploy:** `main`
   - **Build command:** leave blank
   - **Publish directory:** `.` (a single period — it means "the whole folder")
6. Click **Deploy site**

In about a minute, your site is live at a temporary address like `sparkly-biscuit-123abc.netlify.app`.

> **Rename the site:** Go to **Site configuration → Site details → Change site name** and pick something like `wai-crc` so the address becomes `wai-crc.netlify.app`.

## Step 3 — Turn on the admin panel (Identity + Git Gateway)

The admin panel at `/admin` is how you'll edit the site. It needs two switches flipped:

1. In your Netlify dashboard, open your site → **Site configuration**
2. Click **Identity** in the left menu → click **Enable Identity**
3. Under **Registration**, choose **Invite only** — this stops strangers from creating accounts
4. Scroll down to **Services** → click **Enable Git Gateway** — this is what lets the admin panel save your edits back to GitHub. If it asks to install a GitHub app, approve it.

## Step 4 — Invite yourself (and other editors)

1. Go to the **Identity** tab of your site
2. Click **Invite users**
3. Enter your email (e.g. `info@wai-crc.org`) and click **Send**
4. Open the invitation email and click **Accept the invite** — it opens the site; set a password when prompted
5. Repeat for any board member who should be able to post news or events

## Step 5 — Turn on form email notifications

The Contact/Volunteer form stores submissions in Netlify and can email them to you:

1. In your site's dashboard, click **Forms** in the left menu
2. Click **Enable form detection** if prompted, then redeploy the site (Deploys → Trigger deploy)
3. After the first submission arrives, click **Form notifications** → **Add notification** → **Email notification**
4. Enter `info@wai-crc.org` and save

> The free plan includes 100 form submissions per month — plenty for a chapter site.

## Step 6 — (Optional) Connect your custom domain

If the chapter owns a domain like `wai-crc.com`:

1. In Netlify: **Domain management** → **Add a domain** → type your domain → **Verify**
2. At your domain registrar (GoDaddy, Namecheap, etc.), add the DNS records Netlify shows you:

   | Type  | Host | Value                        |
   |-------|------|------------------------------|
   | CNAME | www  | `your-site-name.netlify.app` |
   | A     | @    | `75.2.60.5`                  |

3. Wait up to 24 hours for DNS to update. Netlify adds a free HTTPS certificate automatically.

**That's it — setup is done.** Everything below is day-to-day use.

---

# Part 2 — Using the Site (Day-to-Day)

All content editing happens at:

> **`https://YOUR-SITE.netlify.app/admin`**

Log in with the email and password from Part 1, Step 4. Bookmark this page.

When you click **Publish** on anything, the change is saved to GitHub and the live site updates automatically within about a minute.

## Add or edit an Event

Events appear in **two places automatically**: the home page "Upcoming Events" cards and the News page sidebar. Past events disappear from both on their own — you don't need to delete them.

1. Go to `/admin` and log in
2. Click **Events** → **General** (the events list opens)
3. Click **Add Events** to create a new one, or click an existing event to edit it
4. Fill in:
   - **ID** — a short label with no spaces, e.g. `holiday-party-2026`
   - **Event Title** — e.g. `Holiday Hangar Party`
   - **Date** — pick from the calendar
   - **Time** — e.g. `6:30 PM`
   - **Location** — e.g. `Manassas Regional Airport`
   - **Description** — one or two sentences
   - **Event Type** — Meeting, Special Event, Fly-In, etc.
5. Click **Publish** (top right)

## Post News (with a photo!)

1. Go to `/admin` → click **News & Announcements**
2. Click **Add Posts** for a new post, or click an existing one to edit
3. Fill in:
   - **ID** — short, no spaces, e.g. `giad-recap-2026`
   - **Title, Date, Category, Author**
   - **Short Excerpt** — one sentence shown in preview cards
   - **Featured Image** — click **Choose an image** → **Upload** → pick a photo from your computer. It appears at the top of the post on the News page. (Optional — posts work fine without one.)
   - **Full Article Body** — the post itself. You can use the toolbar for **bold**, lists, and headings.
4. Click **Publish**

> **Photo tips:** Use JPG or PNG. Photos around 1200px wide look best. Very large photos (over ~5 MB) slow the page down — most phone photos are fine as-is.

## Update the fundraising thermometer (Donate page)

When donations come in, update the progress bar:

1. Go to `/admin` → **Site Settings** → **General Settings**
2. Change **Amount Raised So Far ($)** (and the **Goal** if it changes)
3. Click **Publish** — the Donate page bar and percentage recalculate automatically

## Update contact info, social links, and meeting schedule

Same place: `/admin` → **Site Settings** → **General Settings**. You can change:

- Contact email
- Facebook / Instagram / YouTube / X links (the footer icons on every page use these)
- Chapter dues amount
- Meeting schedule text
- Google Calendar ID (see below)

## Connect the Google Calendar (News page)

The News page can embed the chapter's Google Calendar:

1. In [Google Calendar](https://calendar.google.com), hover over the chapter calendar → **⋮** → **Settings and sharing**
2. Under **Access permissions for events**, check **Make available to public**
3. Scroll to **Integrate calendar** and copy the **Calendar ID** (looks like `abc123@group.calendar.google.com`)
4. Paste it into `/admin` → **Site Settings** → **Google Calendar ID** → **Publish**

## Read form submissions

Contact/volunteer form submissions are emailed to you (Part 1, Step 5) and also stored at:

**Netlify dashboard → your site → Forms** — click a form to see every submission.

---

# Part 3 — Common Questions & Troubleshooting

**I published a change but don't see it on the site.**
Give it a minute — Netlify rebuilds after every publish. Then hard-refresh the page (`Ctrl+Shift+R`, or `Cmd+Shift+R` on Mac). You can watch the rebuild under **Deploys** in the Netlify dashboard.

**I can't log in to /admin.**
Make sure you accepted the invitation email and set a password. If the invite expired, have an existing admin send a new one from **Identity → Invite users**. Also confirm **Git Gateway** is still enabled under Identity → Services.

**The admin panel says "Error loading entries."**
Usually Git Gateway needs to be re-enabled or re-authorized: Netlify dashboard → **Site configuration → Identity → Services → Git Gateway**.

**How do I remove an old news post or event?**
Open it in `/admin`, and use the **Delete** option (in the list view, or via the "..." menu on the entry). Note: past events disappear from the site automatically, so you usually don't need to delete them.

**Who can edit the site?**
Only people invited under **Identity**. Editors can change content (news, events, settings) but not the site's design or code.

**Does any of this cost money?**
No. The free Netlify plan covers this site's traffic, the admin panel, and 100 form submissions/month. You'd only pay if you add a custom domain (bought from a registrar, ~$10–20/year).

**Where do donations go?**
Donations and dues go straight to the chapter's PayPal (`CapitalRegion@wai-crc.org`) — Netlify is not involved in payments.

---

*Site code: `github.com/brentbreeden79/WIA` · Technical details: see `README.md`*
