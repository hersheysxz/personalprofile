# Rachel Regacho Portfolio

Full-stack portfolio with a static frontend for Vercel and an Express API for Render.

## Structure

```text
.
|-- Frontend/              Static portfolio site for Vercel
|   |-- index.html
|   |-- style.css
|   |-- script.js
|   |-- config.js
|   |-- vercel.json
|   `-- assets/
|-- backend/               Express API for Render
|   |-- server.js
|   |-- package.json
|   |-- package-lock.json
|   |-- render.yaml
|   |-- .env.example
|   |-- config/email.js
|   |-- models/Contact.js
|   `-- routes/contact.js
`-- .gitignore
```

## Local Development

Start the backend:

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

Fill `backend/.env` with your MongoDB Atlas URI and email settings before submitting the contact form.

Serve the frontend from `Frontend/` with any static server. The default `Frontend/config.js` sends local contact requests to `http://localhost:5000/api/contact`.

You can also use the included Node static server:

```bash
cd Frontend
npm start
```

Then visit `http://localhost:3000`.

## Deploy Backend To Render

Use `backend/` as the Render root directory.

- Build command: `npm install`
- Start command: `npm start`
- Health check path: `/api/health`

Required Render environment variables:

```text
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
FRONTEND_URL=https://your-vercel-domain.vercel.app
ADMIN_KEY=your-long-random-admin-key
ADMIN_EMAIL=rachelregacho645@gmail.com
EMAIL_PROVIDER=gmail
EMAIL_USER=your-gmail-address@gmail.com
EMAIL_PASSWORD=your-google-app-password
EMAIL_FROM=Rachel Portfolio <your-gmail-address@gmail.com>
```

The included `backend/render.yaml` uses the service name `personalprofile-backend`, which matches the Vercel rewrite destination.

## Deploy Frontend To Vercel

Use `Frontend/` as the Vercel root directory.

- Framework preset: Other
- Build command: leave empty
- Output directory: leave empty

`Frontend/vercel.json` rewrites `/api/*` to the Render backend, so the contact form posts to `/api/contact` in production.

If you choose a different Render service URL, update `Frontend/vercel.json`.
