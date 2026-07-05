# Awadh Aviation Academy — Backend

A tiny backend that receives the **Contact** and **Admission** form submissions
from your website, saves them, and (optionally) emails you when someone submits.

## What it does

- `POST /api/contact` — saves a contact form submission
- `POST /api/registration` — saves an admission inquiry
- `GET /api/contact?key=YOUR_ADMIN_KEY` — view all contact submissions
- `GET /api/registration?key=YOUR_ADMIN_KEY` — view all registration submissions
- Everything is saved to a file called `awadh.db` (created automatically, no setup needed)
- Sends you an email notification per submission, if you set up email (optional — see below)

## How to run it (step by step)

**1. Install Node.js** (if you don't have it)
Download from https://nodejs.org — get the LTS version (which is 22 or newer).

**2. Open a terminal in this `backend` folder** and install dependencies:

```
npm install
```

**3. (Optional) Set up email notifications**

Copy `.env.example` to a new file called `.env`:

```
cp .env.example .env
```

Then open `.env` in a text editor and fill in:
- `ADMIN_KEY` — make up any password, you'll use it to view submitted leads
- `SMTP_USER` / `SMTP_PASS` / `NOTIFY_EMAIL` — only needed if you want email alerts.
  For Gmail: turn on 2-Step Verification, then create an "App Password" at
  https://myaccount.google.com/apppasswords and use that as `SMTP_PASS`.

If you skip this step entirely, the server still works fine — submissions
are just saved to the database, no emails are sent.

**4. Start the server:**

```
npm start
```

You should see:
```
✅ Awadh backend running at http://localhost:3000
```

**5. Open your frontend**

Your `contact.html` and `admission.html` pages are already wired up to talk
to `http://localhost:3000`. Just open your website normally (e.g. double-click
`index.html`, or serve the `Awadh` folder with any static server) while the
backend is running in the terminal, and submit a form to test it.

**6. View submitted leads**

Visit in your browser (replace with your own admin key):
```
http://localhost:3000/api/contact?key=YOUR_ADMIN_KEY
http://localhost:3000/api/registration?key=YOUR_ADMIN_KEY
```

## Going live (deploying)

Right now this only runs on your own computer (`localhost`). To make it work
on your live website, you'll need to deploy it somewhere like
[Render](https://render.com) or [Railway](https://railway.app) (both have free tiers).
Once deployed, you'll get a public URL (e.g. `https://awadh-backend.onrender.com`) —
update the `API_BASE_URL` constant at the top of
`Assets/Script/forms.js` in your frontend to that URL. Happy to walk you
through the deployment step by step when you're ready.

## Project files

- `server.js` — the API server and routes
- `db.js` — database setup and queries (SQLite, stored in `awadh.db`)
- `mailer.js` — sends email notifications
- `.env.example` — copy this to `.env` and fill in your settings
