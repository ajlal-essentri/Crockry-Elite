# Crockery Elite 

A full-stack e-commerce web application for a premium crockery and tableware store — built with React, Vite, and Supabase.

## Features

**Customer-facing**
- Browse products by category with sorting (price low-high, high-low, newest)
- Product detail pages with multi-image gallery
- Shopping cart with persistent storage
- Wishlist
- Guest checkout or optional account login/signup
- Cash on Delivery order placement
- Contact form and newsletter subscription

**Admin dashboard**
- Secure, role-based admin authentication (separate from customer accounts)
- Product management (add/edit/delete with multi-image upload)
- Order management with status tracking (Pending → Confirmed → Dispatched → Delivered)
- Customer messages and newsletter subscriber views

## Tech Stack

- **Frontend:** React 19, React Router, Vite
- **Backend:** Supabase (PostgreSQL, Auth, Storage, Row Level Security)
- **Styling:** Custom CSS, fully responsive (mobile/tablet/desktop)
- **Icons:** Lucide React

## Architecture Highlights

- Row Level Security (RLS) policies enforce that only authenticated admins (verified against a dedicated `admins` table) can manage products/orders, while customers get guest-safe read/insert access.
- Multi-image product galleries stored via Supabase Storage.
- Environment-based configuration (`.env`) for Supabase credentials — no secrets committed to source control.

## Setup

1. Clone the repo
2. `npm install`
3. Copy `.env.example` to `.env` and fill in your own Supabase project URL and anon key
4. `npm run dev`

## Screenshots

*(Add screenshots here once deployed)*

---

Built as a client project — a complete online storefront replacing a purely in-person crockery retail business.
