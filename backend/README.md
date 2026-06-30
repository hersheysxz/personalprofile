# Rachel Portfolio Backend

Express API for the portfolio contact form. It stores submissions in MongoDB Atlas and sends email through Nodemailer.

## Run Locally

```bash
npm install
copy .env.example .env
npm run dev
```

The API runs on `http://localhost:5000`.

## Environment Variables

See `.env.example` for the full template.

Required for production:

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

For Gmail, enable 2-step verification and create an App Password. Do not use your regular Google password.

## Endpoints

- `GET /api/health` checks service and MongoDB connection state.
- `POST /api/contact` saves a message and sends admin/user emails.
- `GET /api/contact` lists recent messages when `x-admin-key` matches `ADMIN_KEY`.
- `GET /api/contact/:id` gets one message when authorized.
- `PUT /api/contact/:id/read` marks a message read when authorized.
- `DELETE /api/contact/:id` deletes a message when authorized.

## Deploy To Render

Use this folder as the Render root directory.

- Build command: `npm install`
- Start command: `npm start`
- Health check path: `/api/health`

Set all production environment variables in Render. The `render.yaml` blueprint is included if you prefer Render Blueprint deploys.
