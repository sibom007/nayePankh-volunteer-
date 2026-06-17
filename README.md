# NayePankh Volunteer Management

A full-stack volunteer management platform built for **NayePankh Foundation**. It combines a public-facing charity website with a secure dashboard where volunteers can apply, track applications, and admins can review submissions and manage user roles.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure & Pages](#project-structure--pages)
- [Authentication & Demo Accounts](#authentication--demo-accounts)
- [Environment Variables](#environment-variables)
- [Local Development](#local-development)
- [Available Scripts](#available-scripts)
- [User Roles](#user-roles)

---

## Overview

**NayePankh Volunteer Management** helps NGOs manage volunteer onboarding from first visit to final approval. Visitors explore the foundation’s mission on the landing site, sign up as volunteers through a guided form, and follow their application inside the dashboard. Administrators review pending applications, approve or reject them with notes, and assign platform roles to users.

---

## Features

### Public Landing Website

| Feature | Description |
|--------|-------------|
| **Hero Section** | Full-screen banner with foundation messaging, impact statistics (lives impacted, volunteers, cities), and calls to action for donation and volunteering. |
| **About Section** | Animated section highlighting the foundation’s mission, programs, and community impact with scroll-triggered motion effects. |
| **Join Team** | Showcases ways to get involved — volunteer, donate, and partner — with parallax-style visuals. |
| **Testimonials** | Social proof section featuring community stories and feedback. |
| **Responsive Header** | Sticky navigation with smooth scroll links, mobile menu, theme toggle, and auth-aware actions (Sign In / Dashboard / Logout). |
| **Footer** | Site footer with foundation branding and contact links. |
| **Dark / Light Mode** | System-aware theme switching powered by `next-themes`. |

---

### Authentication & User Sync

| Feature | Description |
|--------|-------------|
| **Clerk Authentication** | Secure sign-in and sign-up flows with email and password. |
| **Post-Login Sync** | After authentication, users are redirected to `/sync-user`, which creates their record in MongoDB if it does not already exist. |
| **Protected Routes** | Dashboard and API routes require an authenticated Clerk session. |
| **Role-Based Access** | Sidebar navigation and admin APIs are restricted by user role (`ADMIN`, `VOLUNTEER`, `USER`). |

---

### Volunteer Application System

| Feature | Description |
|--------|-------------|
| **Multi-Step Registration Form** | Two-step wizard: **Personal** (phone, city) → **Experience** (skills, motivation). |
| **Form Validation** | Client and server validation using Zod and React Hook Form. |
| **Skills Multi-Select** | Add multiple skills with a custom multi-select input. |
| **One Application Per User** | Each user can submit only one volunteer application. |
| **Application Status** | Status lifecycle: `PENDING` → `APPROVED` or `REJECTED`. |
| **Own Application Dashboard** | Volunteers and users can view their submitted details, skills, motivation, and current status. |
| **Admin Review Panel** | Admins see all pending applications in a card grid with applicant details. |
| **Approve / Reject Actions** | Admins can approve instantly or reject with a required admin note explaining the decision. |

---

### Admin Dashboard

| Feature | Description |
|--------|-------------|
| **Application Management** | Review pending volunteer applications with phone, city, skills, and motivation displayed on each card. |
| **Reject Modal** | Structured rejection flow with a note that is saved to the database. |
| **Role Management** | View all registered users (except the current admin) and assign roles via a table interface. |
| **Real-Time Updates** | tRPC mutations invalidate queries so lists refresh after approve, reject, or role changes. |

---

### User Profile

| Feature | Description |
|--------|-------------|
| **Profile View** | Displays name, email, role, Clerk ID, and account creation/update timestamps. |
| **Avatar** | Auto-generated user avatar based on profile data. |
| **Loading & Error States** | Skeleton loaders and graceful error handling for a polished UX. |

---

### Developer Experience

| Feature | Description |
|--------|-------------|
| **Type-Safe API** | End-to-end type safety with tRPC and Zod schemas. |
| **Feature-Based Architecture** | UI and logic organized under `src/feature/` by domain (landing, dashboard, volunteer, profile). |
| **UI Component Library** | Consistent design using shadcn/ui and Tailwind CSS. |
| **Toast Notifications** | User feedback on form submission and API actions via Sonner. |

---

## Tech Stack

### Core Framework

| Package | Purpose |
|---------|---------|
| [Next.js 16](https://nextjs.org/) | React framework with App Router |
| [React 19](https://react.dev/) | UI library |
| [TypeScript](https://www.typescriptlang.org/) | Static typing |

### Authentication & Database

| Package | Purpose |
|---------|---------|
| [@clerk/nextjs](https://clerk.com/) | Authentication and session management |
| [Prisma](https://www.prisma.io/) | ORM for MongoDB |
| [MongoDB](https://www.mongodb.com/) | Primary database |

### API & Data Fetching

| Package | Purpose |
|---------|---------|
| [tRPC](https://trpc.io/) | Type-safe API layer |
| [@tanstack/react-query](https://tanstack.com/query) | Server state management |
| [SuperJSON](https://github.com/blitz-js/superjson) | Serialization for tRPC |
| [Zod](https://zod.dev/) | Schema validation |

### UI & Styling

| Package | Purpose |
|---------|---------|
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first CSS |
| [shadcn/ui](https://ui.shadcn.com/) | Accessible UI components |
| [Radix UI](https://www.radix-ui.com/) | Headless component primitives |
| [Lucide React](https://lucide.dev/) | Icons |
| [Motion](https://motion.dev/) | Animations (Framer Motion) |
| [next-themes](https://github.com/pacocoursey/next-themes) | Dark / light theme |
| [Sonner](https://sonner.emilkowal.ski/) | Toast notifications |

### Forms

| Package | Purpose |
|---------|---------|
| [React Hook Form](https://react-hook-form.com/) | Form state management |
| [@hookform/resolvers](https://github.com/react-hook-form/resolvers) | Zod integration for forms |

---

## Project Structure & Pages

### Route Map

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Landing page (Hero, About, Join Team, Testimonials) |
| `/volunteer` | Public (submit requires auth) | Volunteer registration form |
| `/sign-in` | Public | Clerk sign-in page with demo credentials |
| `/sign-up` | Public | Clerk sign-up page with demo credentials |
| `/sync-user` | Authenticated | Syncs Clerk user to MongoDB, then redirects home |
| `/dashboard` | Authenticated | Redirects to `/dashboard/profile` |
| `/dashboard/profile` | Authenticated | User profile view |
| `/dashboard/volunteer/own-applies` | Volunteer / User | View own volunteer application |
| `/dashboard/admin/applies` | Admin | Review and manage pending applications |
| `/dashboard/admin/roles` | Admin | Assign user roles |
| `/dashboard/admin` | Admin | Redirects to `/dashboard/admin/roles` |

### Folder Layout

```
src/
├── app/                    # Next.js App Router pages & layouts
│   ├── (landing)/          # Public site (header + footer)
│   ├── (auth)/             # Sign-in, sign-up, sync-user
│   ├── dashboard/          # Protected dashboard pages
│   └── api/trpc/           # tRPC API handler
├── feature/                # Feature modules (landing, dashboard, volunteer, profile)
├── components/             # Shared UI components (shadcn/ui)
├── trpc/                   # tRPC routers, client, and server setup
├── lib/                    # Utilities (Prisma client, helpers)
├── types/                  # Zod schemas and shared types
└── generated/prisma/       # Prisma generated client
prisma/
└── schema.prisma           # Database models (User, Volunteer)
```

---

## Authentication & Demo Accounts

Authentication is handled by **Clerk**. After signing in, users are sent to `/sync-user` to register their account in the database before accessing the app.

Use the demo accounts below to explore each role. These credentials are also shown on the **Sign In** and **Sign Up** pages.

| Role | Email | Password |
|------|-------|----------|
| **ADMIN** | `vaispark400@gmail.com` | `sibom@1234` |
| **VOLUNTEER** | `sibomsaha77@gmail.com` | `sibom@1234` |
| **USER** | `sibomsaha787@gmail.com` | `sibom@1234` |

### What each role can do

| Role | Capabilities |
|------|--------------|
| **ADMIN** | Review volunteer applications, approve/reject with notes, manage user roles |
| **VOLUNTEER** | Submit a volunteer application, view own application status |
| **USER** | View own application (if submitted), access profile |

> **Note:** Demo accounts must exist in your Clerk dashboard. Create them there if they are not already configured.

---

## Environment Variables

Create a `.env` file in the project root (same level as `package.json`).

```env
# MongoDB connection string (required)
DATABASE_URL="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority"

# Clerk authentication (required)
CLERK_SECRET_KEY=<your-clerk-secret-key-from-dashboard>
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>

# Optional Clerk route overrides (defaults work for most setups)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

### Where to get these values

| Variable | Source |
|----------|--------|
| `DATABASE_URL` | [MongoDB Atlas](https://www.mongodb.com/atlas) → Connect → copy connection string |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | [Clerk Dashboard](https://dashboard.clerk.com/) → API Keys |
| `CLERK_SECRET_KEY` | [Clerk Dashboard](https://dashboard.clerk.com/) → API Keys |

> **Important:** Never commit `.env` to Git. Add `.env` to `.gitignore` if it is not already listed.

---

## Local Development

### Prerequisites

- **Node.js** 18+ (or [Bun](https://bun.sh/))
- **MongoDB** database (local or MongoDB Atlas)
- **Clerk** application with publishable and secret keys

### Setup Steps

**1. Clone the repository**

```bash
git clone <your-repo-url>
cd nayepankh-volunteer-management
```

**2. Install dependencies**

```bash
# Using npm
npm install

# Or using Bun
bun install
```

**3. Configure environment variables**

Create `.env` in the project root and add the variables from the [Environment Variables](#environment-variables) section.

**4. Generate Prisma client**

```bash
npx prisma generate
```

**5. Start the development server**

```bash
# Using npm
npm run dev

# Or using Bun
bun dev
```

**6. Open the app**

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### First-time login flow

1. Go to `/sign-in` and log in with a demo account (or create a new account via `/sign-up`).
2. You will be redirected to `/sync-user` to create your database record.
3. After sync completes, you are redirected to the home page.
4. Open **Dashboard** from the header to access role-specific features.

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Create production build |
| `npm run start` | Run production server |
| `npm run lint` | Run ESLint |
| `npx prisma generate` | Generate Prisma client after schema changes |
| `npx prisma studio` | Open Prisma Studio to inspect the database |

---

## User Roles

The platform uses three roles defined in the Prisma schema:

| Role | Default | Description |
|------|---------|-------------|
| `ADMIN` | No | Full access to application review and role management |
| `VOLUNTEER` | Yes (new users) | Can submit and track volunteer applications |
| `USER` | No | Basic access; can view profile and own application |

Application statuses:

| Status | Meaning |
|--------|---------|
| `PENDING` | Submitted and awaiting admin review |
| `APPROVED` | Accepted by an admin |
| `REJECTED` | Declined by an admin (includes admin note) |

---

## License

This project is private and maintained for **NayePankh Foundation**.
