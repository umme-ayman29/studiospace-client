# StudioSpace

**Live site:** https://studiospace-client-lilac.vercel.app

StudioSpace is a peer-to-peer marketplace where creators discover and book photo studios, sound stages, podcast lounges, music suites and art workshops, and where hosts list their spaces and manage booking requests.

## Features

- **Studio marketplace:** browse, search, filter by category and sort studios by price or rating, with a featured section that loads the top six studios from MongoDB.
- **Authentication:** email and password registration with password rules (uppercase, lowercase and six or more characters), plus Google sign-in. Sessions use a JWT stored in an HTTP-only cookie, so reloading any private route keeps you signed in.
- **Studio management (CRUD):** add a studio with image upload through imgbb, update it, or delete it after a confirmation modal. Only the owner can edit or delete a listing.
- **Booking system:** reserve a time slot from the studio details page. New bookings start as Pending, the host can confirm or complete them, and the guest can cancel pending ones.
- **Double-booking prevention:** a new request is rejected with a clear message if it overlaps a Confirmed booking for the same studio and date.
- **Reviews and ratings:** studio ratings are calculated from submitted reviews.
- **Polished experience:** light and dark theme toggle, skeleton loaders, empty states, a custom 404 page, and Sonner toast notifications with custom modals instead of browser alerts.
- **Responsive design:** works on mobile, tablet and desktop.

## Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS, DaisyUI, Swiper, Sonner, React Icons
- **Backend:** Express.js, MongoDB (native driver), JWT, bcryptjs, Google Auth Library
- **Services:** imgbb for image hosting, Vercel for hosting
- **Server repository:** https://github.com/umme-ayman29/studiospace-server

## Examiner Test Credentials

| Role | Email | Password |
|---|---|---|
| Host (owns sample studios) | test@example.com | Test12 |
| Creator (can book studios) | guest@example.com | Guest12 |

Google sign-in is also available on the login and register pages. On the login page, the **Use demo account** button fills in the host credentials.

## Local Setup

1. Clone the server and client repositories.
2. Start the server:
   ```bash
   cd studiospace-server
   npm install
   npm run dev
   ```
   Create a `.env` file with `PORT`, `MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL` and `GOOGLE_CLIENT_ID`.
3. Start the client:
   ```bash
   cd studiospace-client
   npm install
   npm run dev
   ```
   Create a `.env.local` file with:
   ```
   API_URL=http://localhost:5000
   NEXT_PUBLIC_IMGBB_KEY=your_imgbb_key
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
   ```
4. Open http://localhost:3000.