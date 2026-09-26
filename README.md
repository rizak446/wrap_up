# Wrap-Up 🎒

Short trips. Great company. Zero hassle.
Wrap-Up is a weekend short-trip platform designed primarily for college and hostel students.

## 🚀 Phase 1 Completed (Architecture & UI)
This project is currently in Phase 1 of development. We have established the full architecture, modern UI, components, and the database schema.

## 🛠 Project Setup

### 1. Environment Variables
Create a `.env.local` file in the root directory (copy from `.env.example`) and fill in your credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

RESEND_API_KEY=your_resend_api_key
WHATSAPP_API_KEY=your_whatsapp_api_key

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2. Supabase Setup & Database Migration
1. Create a new project on [Supabase](https://supabase.com).
2. Go to the SQL Editor in your Supabase dashboard.
3. Open the `supabase/schema.sql` file in this repository.
4. Copy its contents and run it in the Supabase SQL Editor. This will create all necessary tables, types, triggers, and Row Level Security (RLS) policies.
5. Enable **Email Auth** in Supabase Authentication settings.

### 3. Local Development
Install dependencies and run the development server:
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 4. Razorpay Setup (Upcoming Phase)
To handle payments, you will need to create an account on [Razorpay](https://razorpay.com/) and generate API keys.

### 5. Google Maps Setup (Upcoming Phase)
Enable the Maps JavaScript API and Geocoding API in the Google Cloud Console and generate an API key.

## 🌍 Deployment

### GitHub Deployment
1. Initialize a git repository: `git init`
2. Add all files: `git add .`
3. Commit: `git commit -m "Initial Wrap-Up commit"`
4. Push to your GitHub repository.

### Vercel Deployment
1. Import your GitHub repository into [Vercel](https://vercel.com).
2. Add all the environment variables from your `.env.local` to the Vercel project settings.
3. Deploy!

## 📌 Features Scaffolded So Far:
- **Student App:** Homepage, Explore Trips, Trip Details, Group Booking Checkout, Digital Ticket, and Dashboard.
- **Admin App:** Protected Admin Dashboard Layout, Overview Stats, Create Trip form.
- **Database:** Supabase Client Setup & Complete SQL Schema with RLS.
