# WAI-CRC Website — Netlify Deployment & User Guide

This guide walks you through putting the chapter website online with **Netlify** (free) and then using it day-to-day — adding events, posting news with photos, and updating site info — all from your web browser, with no coding.

**Who this is for:** the chapter's site owner and any board members who will manage content.

---

# Part 1 — Put the Site Online (One-Time Setup)

You only do this section once. Total time: about 15 minutes.

## How Netlify deployment actually works (read this first)

Three ideas explain everything else in this guide:

1. **The website's files live on GitHub** (the repository `brentbreeden79/WIA`). GitHub is the source of truth.
2. **Netlify watches ONE branch of that repository** — normally `main`. Whenever anything new lands on that branch, Netlify automatically copies the files and publishes them. This is called a *deploy*.
3. **You never upload files to Netlify by hand.** To change the live site you change what's on the watched branch — either by merging a pull request on GitHub, or by publishing content through the `/admin` panel (which saves to GitHub for you). Netlify notices within seconds and redeploys.

So the flow is always: **change lands on `main` → Netlify deploys → live site updates (~1 minute).**

Each deploy either succeeds (**Published**, green) or fails (**Failed**, red) — and if it fails, the previous good version stays live. You can watch every deploy under the **Deploys** tab of your Netlify dashboard, and click any deploy to read its log. That log is where the error message lives when something goes wrong.

> **Heads up on wording:** Netlify recently renamed "Sites" to "Projects" in parts of its dashboard. If a button says **Project** where this guide says **Site** (or vice versa), it's the same thing.

## Step 1 — Get the website code onto `main`

The finished website currently lives on the branch `claude/ecstatic-brown-RGsuA`. Netlify will publish `main`, so merge the branch into it:

1. Go to `https://github.com/brentbreeden79/WIA`
2. Click **Pull requests** → **New pull request**
3. Set **base:** `main` and **compare:** `claude/ecstatic-brown-RGsuA`
4. Click **Create pull request**, then **Merge pull request** → **Confirm merge**

> **Do this again whenever the branch gets new fixes.** If a fix is pushed to `claude/ecstatic-brown-RGsuA` after you've already merged once, the live site won't have it until you open and merge a new pull request. Merging automatically triggers a fresh deploy — there's no separate "redeploy" step to remember.

## Step 2 — Create the Netlify account and connect the repository

*(Skip to Step 3 if you already did this.)*

1. Go to [app.netlify.com/signup](https://app.netlify.com/signup) and choose **Sign up with GitHub** — this also handles the repository permissions in one step
2. From your dashboard, click **Add new project** (older UI: **Add new site**) → **Import an existing project**
3. Choose **GitHub** and follow the authorization prompts. If asked which repositories Netlify may access, grant access to **`brentbreeden79/WIA`** (or all repositories — either works)
4. Select the **`brentbreeden79/WIA`** repository from the list
5. You'll land on the build settings screen. This site is plain HTML — there is nothing to build — so the settings are minimal:

   | Setting | Value | Why |
   |---|---|---|
   | **Branch to deploy** | `main` | The branch Netlify watches |
   | **Build command** | *leave empty* | No build step — the files are served as-is |
   | **Publish directory** | `.` *(a single period)* | Publish the whole repository folder |

   The repo also contains a `netlify.toml` file that already sets the publish directory, so Netlify may pre-fill these correctly on its own. If a field is pre-filled as shown above, leave it.
6. Click **Deploy** (the button may read **Deploy site**, **Deploy project**, or **Publish**)

## Step 3 — Watch the first deploy and confirm it worked

1. You'll be taken to the site's overview. Click the **Deploys** tab
2. The top entry is your deploy, marked **Building** then **Published** (green). This takes under a minute for this site
3. Click the site address (something like `sparkly-biscuit-123abc.netlify.app`) and check the site loads

**If the deploy shows "Failed" (red):** click it and read the log — the last lines say exactly what went wrong. For example, the first deploy of this site once failed with:

```
Invalid filename 'data/#HonorTheWASP ... .csv'.
Deployed filenames cannot contain # or ? characters
```

— a file with a `#` in its name, which Netlify refuses. (That file has since been removed; if you see this error, make sure `main` has the latest code — see Step 1.) After fixing a problem on GitHub, the merge triggers a new deploy automatically. You can also force one anytime with **Deploys → Trigger deploy → Deploy site**.

> **Give the site a nicer address:** **Site configuration → Site details → Change site name** → pick something like `wai-crc`, making the address `wai-crc.netlify.app`.

## Step 4 — Turn on the admin panel (Identity + Git Gateway)

The `/admin` content editor needs two Netlify features switched on: **Identity** (who may log in) and **Git Gateway** (lets the editor save changes back to GitHub).

1. In your site's dashboard, open **Site configuration** (left sidebar)
2. Click **Identity** → **Enable Identity**
3. Under **Registration preferences**, choose **Invite only** — so strangers can't create accounts
4. Scroll to **Services** → click **Enable Git Gateway**. If prompted to authorize or install a GitHub app, approve it

> **A note on these features:** Netlify announced in early 2025 that Identity would be deprecated, then reversed that decision in February 2026 — Identity is staying and remains supported. If you ever find Identity or Git Gateway missing from your dashboard, the drop-in replacement is **[DecapBridge](https://decapbridge.com)** (free, built exactly for this admin panel): create an account there, connect the GitHub repository, and paste the backend settings it gives you into `admin/config.yml`. Only needed if the built-in option disappears.

## Step 5 — Invite yourself (and other editors)

1. Go to the **Identity** section of your site
2. Click **Invite users**
3. Enter your email (e.g. `info@wai-crc.org`) and click **Send**
4. Open the invitation email and click **Accept the invite** — it opens the site; set a password when prompted
5. Test it: go to `your-site.netlify.app/admin` and log in
6. Repeat the invitation for any board member who should be able to post news or events

> **Important:** invitation links expire after a few days. If someone's link stops working, just send them a fresh invite.

## Step 6 — Turn on form email notifications

The Contact/Volunteer form stores submissions in Netlify and can email them to you:

1. In your site's dashboard, click **Forms** in the left menu
2. Click **Enable form detection** if prompted, then trigger a redeploy (**Deploys → Trigger deploy**) so Netlify scans the site for forms
3. Go to **Forms → Form notifications** (under Site configuration) → **Add notification** → **Email notification**
4. Enter `info@wai-crc.org` and save — every submission is now emailed there, and also stored under the Forms tab

> The free plan includes 100 form submissions per month — plenty for a chapter site. Make sure `info@wai-crc.org` is a real, working mailbox, or the notifications will bounce.

## Step 7 — (Optional) Connect your custom domain

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

**A deploy shows "Failed" in the Deploys tab.**
Click the failed deploy and scroll to the end of the log — the actual error is in the last few lines (for example, a file with a `#` or `?` in its name, which Netlify doesn't allow). Fix the cause on GitHub and the next merge deploys automatically. The live site keeps showing the last successful deploy in the meantime, so a failed deploy never takes the site down.

**I merged a fix on GitHub but the live site didn't change.**
Check the **Deploys** tab: if no new deploy appeared, the change probably landed on a different branch than the one Netlify watches (see **Site configuration → Build & deploy → Continuous deployment → Branches**, normally `main`). Merge the fix into that branch and a deploy will start on its own.

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
