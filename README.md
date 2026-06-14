# AirOpsManager — Airlines Management System

A full-stack airline operations platform built with React, Express.js, and MySQL. It provides an **Admin Panel** for managing flights, airplanes, airports, schedules, clients, and bookings — and a **Customer Panel** for browsing flights, booking tickets, and leaving reviews.

## Table of Contents

- [Prerequisites](#prerequisites)
- [1. Database Setup](#1-database-setup)
- [2. Server Setup](#2-server-setup)
- [3. Client Setup](#3-client-setup)
- [4. Running the App](#4-running-the-app)
- [5. Deployment (Free)](#5-deployment-free)
- [6. Manual Testing Guide](#6-manual-testing-guide)
- [Default Dev Credentials](#default-dev-credentials)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)

---

## Prerequisites

Make sure the following are installed on your machine before starting:

| Tool | Version | Check |
|---|---|---|
| Node.js | v16+ | `node --version` |
| npm | v8+ | `npm --version` |
| MySQL | v8+ | `mysql --version` |
| Git | any | `git --version` |

---

## 1. Database Setup

### Step 1 — Start MySQL and create the database

Open your MySQL shell (or MySQL Workbench) and run:

```sql
CREATE DATABASE airport_management;
USE airport_management;
```

### Step 2 — Run the schema file

This creates all the tables and views. Run this **first**, before the seeds.

```bash
mysql -u root -p airport_management < server/schema.sql
```

Or paste the contents of `server/schema.sql` directly into MySQL Workbench and execute.

### Step 3 — Run the seed file

This populates all tables with sample data including admin accounts and test users.

```bash
mysql -u root -p airport_management < server/seeds.sql
```

> **Note:** All passwords in the seed file are already bcrypt-hashed. See [Default Dev Credentials](#default-dev-credentials) for the plaintext values to use when logging in.

---

## 2. Server Setup

### Step 1 — Navigate to the server directory

```bash
cd server
```

### Step 2 — Install dependencies

```bash
npm install
```

### Step 3 — Configure your environment

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

Open `server/.env` and update it:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_NAME=airport_management
DB_SSL=false
JWT_SECRET=replace_this_with_a_long_random_string_at_least_32_chars
PORT=5000
ALLOWED_ORIGIN=http://localhost:3000
```

> **Important:** `JWT_SECRET` must be a long random string. You can generate one with:
> ```bash
> node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
> ```

---

## 3. Client Setup

### Step 1 — Navigate to the client directory

```bash
cd client
```

### Step 2 — Install dependencies

```bash
npm install
```

### Step 3 — Configure your environment

```bash
cp .env.example .env
```

The default `client/.env` should contain:

```env
REACT_APP_API_URL=http://localhost:5000
```

Change this if your backend runs on a different port or host.

---

## 4. Running the App

Open **two terminals** — one for the server, one for the client.

**Terminal 1 — Start the backend:**

```bash
cd server
npm run dev
```

You should see:
```
Server running on port 5000
```

**Terminal 2 — Start the frontend:**

```bash
cd client
npm start
```

The browser will open automatically at `http://localhost:3000`.

---

## 5. Deployment (Free)

This project is configured for a fully free demo deployment using:

| Layer | Platform | Notes |
|---|---|---|
| Frontend | [Vercel](https://vercel.com) | Free forever, global CDN |
| Backend | [Render](https://render.com) | Free 750 hrs/month, sleeps after 15 min idle |
| Database | [Aiven](https://aiven.io) | Free MySQL tier, always-on |

> **Cold start warning:** Render's free tier sleeps after 15 minutes of inactivity. The first request after idle takes ~30–50 seconds. This is acceptable for demo use. The `/health` endpoint can be used to pre-warm the server.

---

### Step 1 — Set up Aiven MySQL

1. Sign up at [aiven.io](https://aiven.io) → **Create service** → **MySQL** → **Free plan**
2. Once running, go to the service **Overview** tab and note:
   - Host → `DB_HOST`
   - Port → `DB_PORT` (typically a non-standard port like `13306`)
   - User → `DB_USER`
   - Password → `DB_PASSWORD`
   - Database name → `DB_NAME` (default: `defaultdb`)
3. Connect via MySQL Workbench using the credentials above — set SSL mode to **Required**
4. Run `server/schema.sql` then `server/seeds.sql` in order

---

### Step 2 — Deploy backend on Render

1. Sign up at [render.com](https://render.com) → **New Web Service** → connect your GitHub repo
2. Configure:
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `node index.js`
   - **Plan:** Free
3. Add environment variables:

| Key | Value |
|---|---|
| `DB_HOST` | *(from Aiven)* |
| `DB_PORT` | *(from Aiven)* |
| `DB_USER` | *(from Aiven)* |
| `DB_PASSWORD` | *(from Aiven)* |
| `DB_NAME` | `defaultdb` |
| `DB_SSL` | `true` |
| `JWT_SECRET` | *(generate with `openssl rand -hex 32`)* |
| `ALLOWED_ORIGIN` | *(set after Vercel deploy in Step 3)* |
| `PORT` | `5000` |

4. Deploy and copy your Render URL (e.g. `https://your-app.onrender.com`)

---

### Step 3 — Deploy frontend on Vercel

1. Sign up at [vercel.com](https://vercel.com) → **Add New Project** → import your GitHub repo
2. Configure:
   - **Root Directory:** `client`
   - **Framework Preset:** Create React App
3. Add environment variable:

| Key | Value |
|---|---|
| `REACT_APP_API_URL` | Your Render URL from Step 2 |

4. Deploy and copy your Vercel URL (e.g. `https://your-app.vercel.app`)

---

### Step 4 — Wire CORS

Go back to your Render service → **Environment** → set `ALLOWED_ORIGIN` to your Vercel URL. Render redeploys automatically.

---

### Step 5 — Verify

```bash
# Should return { "status": "ok", "timestamp": "..." }
curl https://your-app.onrender.com/health
```

Then open your Vercel URL and test login.

---

### Vercel Analytics

[Vercel Analytics](https://vercel.com/docs/analytics) is pre-configured in this project (`@vercel/analytics`). Once deployed to Vercel, visit your project dashboard → **Analytics** tab to see page views, visitors, and top routes. It is a no-op in local development.

---

## 6. Manual Testing Guide

### Verify the server is healthy

```bash
curl http://localhost:5000/health
```
Expected: `{"status":"ok","timestamp":"..."}`

---

### Test 1 — Admin Login

1. Go to `http://localhost:3000/signin`
2. Enter username: `Ahmad`, password: `fast123`
3. You should be redirected to the Admin Panel
4. Open DevTools → Application → Cookies — you should see an `admin_token` cookie

---

### Test 2 — Route Protection (no login)

1. While logged out, navigate directly to `http://localhost:3000/AdminPanel`
2. You should be **redirected to `/signin`** immediately
3. Same for `/Client`, `/Flight`, `/Booking`, etc.

---

### Test 3 — Admin CRUD Operations

Once logged in as admin:

- **Clients:** Sidebar → Clients → Add, Edit, View, Delete a client
- **Airplanes:** Sidebar → Airplanes → Add a new airplane with ID and max seats
- **Schedules:** Sidebar → Schedules → Add a schedule with departure/arrival times
- **Flights:** Sidebar → Flights → Add a flight (select schedule, status, airplane)
- **Tickets:** Sidebar → Tickets → Edit existing tickets
- **Bookings:** Sidebar → Bookings → View all bookings

---

### Test 4 — Customer Sign Up and Login

1. Go to `http://localhost:3000/sign-up`
2. Fill in all fields (use any email not already in the seed data)
3. Submit — you should see "Registered Successfully"
4. Go to `http://localhost:3000/customer-signin`
5. Log in with the email and password you just registered
6. You should land on your Customer Panel

---

### Test 5 — Book a Flight

1. Log in as a customer
2. Click **Book Flight** in the customer navbar
3. Select departure airport, arrival airport, departure date, return date, class, and price
4. Click **Find Flight** — you should see matching available flights
5. Select a flight → proceed to Invoice → confirm
6. You should receive a boarding pass

---

### Test 6 — Protected API Endpoints (no cookie)

Test that the API rejects unauthenticated requests:

```bash
# Should return 401
curl -X DELETE http://localhost:5000/removeSearch

# Should return 401
curl http://localhost:5000/api/get

# Should return 401
curl http://localhost:5000/booking/getstats
```

---

### Test 7 — Rate Limiting on Login

Hit the login endpoint 6 times quickly:

```bash
for i in {1..6}; do
  curl -s -o /dev/null -w "%{http_code}\n" \
    -X POST http://localhost:5000/auth/login \
    -H "Content-Type: application/json" \
    -d '{"username":"wrong","password":"wrong"}'
done
```

Expected: first 5 return `401`, the 6th returns `429 Too Many Requests`.

---

### Test 8 — Logout

1. While logged in as admin, click **Logout**
2. You should be redirected to `/signin`
3. Try navigating to `/AdminPanel` — you should be redirected back to `/signin`
4. Check DevTools → Cookies — `admin_token` should be gone

---

## Default Dev Credentials

> These are for local development only. Change all passwords before deploying.

### Admin Accounts

| Username | Password |
|---|---|
| Ahmad | `fast123` |
| Faheem | `notfast123` |
| Mohsin | `yesfast123` |

### Customer Accounts (seed data)

All seed customers share the password: `clientpass123`

| Email |
|---|
| `mohsinalimirza@gmail.com` |
| `ahmadaleem@hotmail.com` |
| `wahajjaved@gmail.com` |
| `asfeenhakani@gmail.com` |

Or register a new account at `/sign-up`.

---

## Project Structure

```
AirOpsManager/
├── client/                        # React frontend (CRA)
│   ├── .env                       # Frontend env (REACT_APP_API_URL)
│   ├── .env.example
│   └── src/
│       ├── api/
│       │   └── client.js          # Axios instance (baseURL from env)
│       ├── contexts/
│       │   └── AuthContext.js     # JWT auth state, login/logout
│       ├── components/
│       │   ├── ProtectedRoute.js  # Redirects unauthenticated admins
│       │   ├── CustomerRoute.js   # Redirects unauthenticated customers
│       │   ├── Navbar/
│       │   ├── CustomerNavbar/
│       │   └── Pages/             # All 40+ page components
│       └── App.js                 # Routes with lazy loading, auth guards, analytics
│
└── server/                        # Express.js backend
    ├── .env                       # DB credentials + JWT secret (never commit)
    ├── .env.example               # Safe template to commit
    ├── schema.sql                 # CREATE TABLE statements only
    ├── seeds.sql                  # INSERT statements with hashed passwords
    ├── index.js                   # App setup
    ├── db/
    │   └── pool.js                # MySQL connection pool (SSL-aware)
    ├── middleware/
    │   ├── auth.js                # JWT cookie verification
    │   ├── rateLimiter.js         # Brute-force protection
    │   └── validate.js            # Input validation chains
    └── routes/
        ├── auth.js                # POST /auth/login, /customerlogin, /signup, /logout, /me
        ├── clients.js             # GET/POST/PUT/DELETE /api/...
        ├── airplanes.js
        ├── schedules.js
        ├── flights.js
        ├── flightStatus.js
        ├── airports.js
        ├── gates.js
        ├── tickets.js
        ├── bookings.js
        ├── reviews.js
        └── search.js              # Flight search + booking flow
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router v5, Tailwind CSS |
| Analytics | Vercel Analytics (`@vercel/analytics`) |
| Forms | react-hook-form, express-validator |
| HTTP Client | Axios (via centralized `api/client.js`) |
| Auth | JWT (jsonwebtoken) in HttpOnly cookies |
| Backend | Express.js (Node.js) |
| Security | Helmet, CORS, express-rate-limit, bcryptjs |
| Database | MySQL 8 (raw SQL, mysql2 driver) |
| Dev Tools | nodemon, dotenv |
| Hosting | Vercel (frontend), Render (backend), Aiven (MySQL) |

---

## Common Issues

**"Cannot connect to database"**
- Make sure MySQL is running: `sudo service mysql start` (Linux) or start MySQL from System Preferences (Mac)
- Double-check `DB_PASSWORD` in `server/.env` matches your MySQL root password

**"Invalid credentials" on login**
- Make sure you ran `server/seeds.sql` — without it there are no admin accounts in the database
- Passwords are case-sensitive

**"CORS error" in browser console**
- Make sure `ALLOWED_ORIGIN` in `server/.env` matches exactly what's in your browser URL bar (including the port)
- On Render, confirm `ALLOWED_ORIGIN` is set to your exact Vercel URL with no trailing slash

**Frontend shows blank page**
- Make sure `REACT_APP_API_URL` in `client/.env` matches where your backend is running
- CRA requires you to restart `npm start` after changing `.env` files

**Port 5000 already in use**
- Change `PORT=5001` in `server/.env` and update `REACT_APP_API_URL=http://localhost:5001` in `client/.env`

**Render backend is slow to respond (first request)**
- This is expected on the free tier — Render spins down services after 15 minutes of inactivity. The first request after idle takes ~30–50 seconds to wake up.

**Aiven SSL connection error**
- Confirm `DB_SSL=true` is set in your Render environment variables
- Confirm `DB_PORT` matches the port shown in Aiven's Overview tab (not the default 3306)
