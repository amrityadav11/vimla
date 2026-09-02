# विमला जाँच घर — Vimla Janch Ghar
## Professional Pathology Laboratory Website

A complete, production-ready, responsive website for Vimla Janch Ghar — a local diagnostic and pathology laboratory.

---

## Project Structure

```
VIMLA/
├── frontend/          # React + Vite + Tailwind CSS
└── backend/           # Node.js + Express + MongoDB
```

---

## Quick Start

### Prerequisites
- Node.js v18+
- MongoDB (local or MongoDB Atlas)
- npm

---

### 1. Backend Setup

```bash
cd backend
cp .env.example .env
# Edit .env with your actual values
npm install
npm run dev
```

**Default Admin Credentials (created on first run):**
- Email: `admin@vimlajanch.com`
- Password: `admin@123`

⚠️ **Change the admin password immediately after first login.**

---

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`
Backend API runs at: `http://localhost:5000`

The Vite dev server proxies `/api` requests to the backend automatically.

---

## Environment Variables

Copy `backend/.env.example` to `backend/.env` and fill in:

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT (use a long random string) |
| `SMTP_HOST` | SMTP server for email notifications |
| `SMTP_PORT` | SMTP port (587 for TLS) |
| `SMTP_USER` | SMTP username/email |
| `SMTP_PASS` | SMTP password or app password |
| `ADMIN_EMAIL` | Email to receive enquiry notifications |
| `WHATSAPP_NUMBER` | WhatsApp number with country code (e.g., 919876543210) |
| `FRONTEND_URL` | Frontend URL for CORS (e.g., https://yoursite.com) |

---

## Features

### Public Website
- **Homepage** — Hero, Trust Bar, Popular Tests, Categories, About, Packages, Why Us, How It Works, Testimonials, FAQs, Contact CTA, Map
- **Test Catalogue** (`/tests`) — Search, filter by category, all available tests
- **Test Detail Pages** (`/tests/:slug`) — Full test details, parameters, preparation, pricing
- **Health Packages** (`/packages`) — Grouped investigation panels
- **About Page** — About the laboratory
- **Contact Page** — Phone, WhatsApp, email, contact form, map
- **Request a Test** (`/request-test`) — Appointment/enquiry form
- **FAQs** — Frequently asked questions
- **Why Us** — Reasons to choose the lab

### Admin Panel (`/admin`)
- **Dashboard** — Stats, recent enquiries, quick links
- **Test Management** — Create, edit, delete, enable/disable tests
- **Category Management** — Manage test categories
- **Package Management** — Create/edit health check packages
- **Enquiry Management** — View, update status, contact patients
- **Message Management** — Contact form messages
- **Testimonial Management** — Approve/manage patient testimonials
- **FAQ Management** — Create/edit FAQs
- **Website Settings** — Configure all business information, features, content

### Integrations
- **WhatsApp** — Floating button + prefilled message links
- **Email Notifications** — Admin notified of new enquiries/messages via SMTP
- **Google Maps** — Configurable map link

---

## Deployment

### Frontend — Netlify/Vercel

```bash
cd frontend
npm run build
# Deploy the dist/ folder
```

Set environment variable in your hosting platform:
- None needed for frontend (API URL is configured via Vite proxy or the base URL)

For production, create `frontend/.env.production`:
```
VITE_API_BASE_URL=https://your-backend.railway.app
```

Then update `frontend/src/services/api.js` baseURL to use `import.meta.env.VITE_API_BASE_URL || '/api'`.

### Backend — Render/Railway

1. Deploy the `backend/` folder
2. Set all environment variables in the hosting platform
3. Set `NODE_ENV=production`
4. Set `FRONTEND_URL` to your frontend domain for CORS

### Database — MongoDB Atlas

1. Create a free cluster at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create a database user and whitelist IP addresses (or 0.0.0.0/0 for any)
3. Copy the connection string to `MONGODB_URI`
4. The seeder runs automatically on first startup

---

## Important Notes

### Healthcare Compliance
- The website does **not** make unsupported medical claims
- Test descriptions are informational only
- Medical disclaimer is displayed throughout
- No fake statistics, certifications, or patient counts

### First Login Checklist
1. Login at `/admin/login` with `admin@vimlajanch.com` / `admin@123`
2. **Change password immediately** in Settings
3. Update all business information (phone, address, email, WhatsApp) in Settings
4. Update the About text
5. Review and enable/disable tests as appropriate
6. Enable/disable Home Collection feature as applicable
7. Configure Google Maps URL
8. Set actual opening hours
9. Review and approve/edit sample testimonials

### Admin Default Credentials
- Email: `admin@vimlajanch.com`
- Password: `admin@123`

---

## Tech Stack

**Frontend:** React 19, Vite, Tailwind CSS v4, React Router v7, Framer Motion, Lucide React, Axios, React Hot Toast, React Helmet Async

**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs, Nodemailer, Helmet, Express Rate Limit, Slugify, Morgan

---

## Security Features
- JWT authentication for admin routes
- bcrypt password hashing
- Rate limiting on all API routes (stricter on auth routes)
- Helmet security headers
- CORS restricted to configured frontend URL
- Input validation
- MongoDB injection protection via Mongoose
- Secrets only in environment variables — never in code

---

## License
Built for Vimla Janch Ghar. All rights reserved.
