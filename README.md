# Pexels Clone 📸

A modern, high-performance image discovery application built with **Next.js 15** and **Pexels API**. This project demonstrates advanced routing patterns, server-side data fetching, and seamless integration with **Supabase** for persistent data storage.

## ✨ Key Features

- **Dynamic Image Search:** Real-time photo discovery powered by the Pexels API.
- **Advanced Routing (Intercepting & Parallel Routes):** Utilizes Next.js slots and **intercepting routes** to display photo details in a modal without losing the background page context—perfect for a seamless user experience.
- **Persistent Likes System:** Users can save their favorite photos to a **Supabase (PostgreSQL)** database.
- **Next.js 15 Implementation:** Leverages the latest framework features
- **Responsive & Elegant UI:** A clean, mobile-first design built with **Tailwind CSS**.

## 🚀 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Database & Auth:** Supabase (PostgreSQL)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **API:** Pexels API
- **Deployment:** Vercel

## 🔒 Security & Database (RLS)

The project utilizes Supabase **Row Level Security (RLS)**. For demonstration purposes, the `likes` table currently has an open policy `(FOR ALL)`, allowing anonymous interaction without full authentication. In a production environment, this would be restricted to authenticated users using auth.uid() checks to prevent unauthorized data manipulation.
