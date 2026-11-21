# 💇‍♀️ SalonBook — Salon Booking Platform

SalonBook is a full-stack salon booking application that helps customers discover salon services, request appointments, manage bookings, update their profiles, and complete payments. Administrators can manage services, appointment requests, customer accounts, and payment transactions.

## 🌐 Live Site

**URL:** [https://salon-book-nine.vercel.app](https://salon-book-nine.vercel.app)

## 📦 Repositories

| Repository | Link |
| --- | --- |
| 🖥️ Client Repository | [https://github.com/HridoyAhmedRafi/salon-book](https://github.com/HridoyAhmedRafi/salon-book) |
| ⚙️ Server Repository | [https://github.com/HridoyAhmedRafi/salon-book-server](https://github.com/HridoyAhmedRafi/salon-book-server) |

## ✨ Features

### 👤 Customer Features

- **🔐 Account authentication** — email/password sign-in and Google OAuth through Better Auth.
- **💈 Browse salon services** — featured services, category cards, search, category filtering, and price sorting.
- **🖼️ Service details** — view descriptions, prices, durations, images, and availability.
- **📅 Appointment requests** — select a date, fixed time slot, and optional message.
- **🧾 Booking management** — view appointment status and cancel pending appointments.
- **💳 Stripe payments** — create a secure checkout session for confirmed, unpaid appointments.
- **✅ Payment verification** — verify Stripe sessions and receive confirmation or processing states.
- **👤 Profile management** — update name and profile image while keeping email and account status read-only.
- **📊 Customer dashboard** — view appointment summaries and personal booking history.

### 🛡️ Admin Features

- **📊 Dashboard overview** — customer, service, appointment, and payment metrics.
- **🛠️ Service management** — create, edit, activate, deactivate, and delete services.
- **🖼️ Service images** — upload JPG, PNG, WebP, or GIF images through ImgBB.
- **📋 Appointment management** — review requests, confirm pending bookings, and cancel appointments.
- **👥 Customer management** — view customer details and block or unblock accounts.
- **💰 Transaction management** — view successful Stripe payment records.

### 🎨 Experience

- Responsive desktop and mobile interface
- Light, dark, and system themes
- Loading, empty, error, and confirmation states
- Role-based customer and admin dashboards
- Bangladeshi Taka price formatting
- UTC-safe date-only formatting
- Branded toast notifications and accessible dialogs

## 🛠️ Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React 19.3, TypeScript 5 |
| Framework | Next.js 16.4.6 App Router |
| Styling | Tailwind CSS 4, shadcn-style Base UI components |
| Icons | Lucide React, React Icons |
| Feedback | Sonner |
| Authentication | Better Auth with email/password and Google OAuth |
| Database | MongoDB |
| Backend | Node.js, Express.js 5 REST API |
| Backend Packages | MongoDB Node.js driver, CORS, dotenv |
| Payments | Stripe Checkout, Stripe SDK, Stripe webhooks |
| Image Upload | ImgBB |
| Tooling | ESLint 9, Turbopack, React Compiler |
| Deployment | Vercel |

## 🔐 Authentication and Authorization

- Better Auth stores users, sessions, and account data in MongoDB database `salon-book-db`.
- New accounts receive the `customer` role and `isBlocked: false`.
- Customer dashboard routes require the `customer` role.
- Admin dashboard routes require the `admin` role.
- Admin roles must be assigned by editing the Better Auth user document in MongoDB.
- Protected API requests use the Better Auth session token.
- The server validates customer and admin roles before protected operations.

## 🚀 Local Setup

### 1. Prerequisites

- Node.js 20 or later
- npm
- MongoDB
- A running SalonBook server API
- Google OAuth credentials
- Stripe credentials
- ImgBB API key

### 2. Clone the Repositories

```bash
git clone https://github.com/HridoyAhmedRafi/salon-book.git
git clone https://github.com/HridoyAhmedRafi/salon-book-server.git
```

### 3. Install Client Dependencies

```bash
cd salon-book
npm install
```

### 4. Start the Server

```bash
cd ../salon-book-server
npm install
node index.js
```

The server uses port `5000` by default.

### 5. Configure the Client

Create a `.env` file in the client project root:

```env
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
MONGODB_URI=
NEXT_PUBLIC_BASE_URL=
NEXT_PUBLIC_IMGBB_API_KEY=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

| Variable | Description |
| --- | --- |
| `BETTER_AUTH_SECRET` | Secret used by Better Auth |
| `BETTER_AUTH_URL` | Public base URL of the Next.js application |
| `MONGODB_URI` | MongoDB connection string used by Better Auth |
| `NEXT_PUBLIC_BASE_URL` | Base URL of the SalonBook server API |
| `NEXT_PUBLIC_IMGBB_API_KEY` | ImgBB API key for image uploads |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |

### 6. Configure the Server

Create a `.env` file in the server project root:

```env
PORT=
MONGODB_URI=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
CLIENT_URL=
```

| Variable | Description |
| --- | --- |
| `PORT` | Optional server port; defaults to `5000` |
| `MONGODB_URI` | MongoDB connection string used by the REST API |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `CLIENT_URL` | Next.js client URL used for Stripe success and cancel redirects |

> [!IMPORTANT]
> Never commit real credentials, database URLs, API keys, or secret values.

### 7. Run the Client

```bash
cd salon-book
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Set `NEXT_PUBLIC_BASE_URL=http://localhost:5000` when the server is running locally.

## 📜 Available Scripts

### Client

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server on port 3000 |
| `npm run build` | Create an optimized production build |
| `npm run start` | Run the production build |
| `npm run lint` | Run ESLint |

### Server

| Command | Description |
| --- | --- |
| `node index.js` | Start the Express server |

The server package currently does not define a separate development or test script.

## 📁 Project Structure

### Client

```text
src/
├── app/
│   ├── (auth)/                 # Sign-in and sign-up pages
│   ├── api/auth/[...all]/      # Better Auth catch-all route
│   ├── dashboard/
│   │   ├── admin/              # Admin overview and management pages
│   │   └── customer/           # Customer overview, appointments, and profile
│   ├── payment/                # Stripe success and cancellation pages
│   ├── services/               # Service marketplace and detail routes
│   ├── blocked/                # Blocked-account page
│   ├── unauthorized/           # Unauthorized-access page
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Homepage
│   └── globals.css             # Global and Tailwind styles
├── components/
│   ├── Appointment/            # Appointment booking form
│   ├── browse-services/        # Service listing and filtering
│   ├── dashboard/              # Role-specific dashboard components
│   ├── home/                   # Homepage sections
│   ├── shared/                 # Navbar, footer, theme, and feedback components
│   └── ui/                     # Reusable UI primitives
├── hooks/                      # Reusable React hooks
├── lib/
│   ├── apis/                   # External API reads and mutations
│   ├── auth.ts                 # Better Auth server configuration
│   ├── auth-client.ts          # Better Auth client configuration
│   ├── format.ts               # Price and date formatters
│   └── validation/             # Form validation helpers
└── types/                      # Shared TypeScript interfaces
```

### Server

```text
salon-book-server/
├── config/
│   └── stripe.js               # Stripe SDK configuration
├── routes/
│   └── payment.routes.js       # Express payment route placeholder
├── index.js                    # API routes, MongoDB, auth checks, and Stripe logic
└── vercel.json                 # Vercel Node.js deployment configuration
```
