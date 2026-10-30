# Yazhi Holidays — Premium Travel & Tourism Platform

A world-class, responsive, editorial travel and tourism web application crafted for **Yazhi Holidays**, combining luxury brand aesthetics, cinematic destination storytelling, unhurried South Indian hospitality, and complete travel consultancy functionality.

---

## 🌟 Brand Design System

Built strictly according to the official **Yazhi Holidays** brand identity:

- **Official Brand Logo:** The authentic uploaded Yazhi emblem—featuring the celestial gold Yazhi creature in a circular voyage orbit traversed by a golden airplane against deep midnight blue—is preserved without alteration and integrated into the sticky navigation, brand signature story, and footer.
- **Color System:**
  - **Primary Navy:** `#071D3A`
  - **Deep Midnight Blue:** `#041329`
  - **Royal Navy:** `#0B2A50`
  - **Secondary Blue:** `#123C69`
  - **Royal Gold:** `#F5B82E`
  - **Metallic Gold:** `#DDA52A`
  - **Light Champagne Gold:** `#F8DFA0`
  - **Warm Ivory:** `#FAF7F0`
  - **Pure White:** `#FFFFFF`
  - **Body Text:** `#243247`
  - **Muted Text:** `#778397`
  - **Border:** `#E7E3DA`
- **Typography:**
  - **Display Headings:** *Cormorant Garamond* (Serif)
  - **Body Text:** *Manrope* (Sans-serif)

---

## 🚀 Key Features & Pages

### 1. Flagship Homepage (`/`)
- **Sticky Refined Navigation:** Dynamic scroll transition from transparent to solid midnight navy, featuring the official Yazhi Holidays logo, destination dropdown, live search modal, phone contact, and primary "Plan My Trip" CTA.
- **Cinematic Destination Hero:** Editorial headline *"Your World. Your Story."*, supporting narrative, and quick destination inspiration ticker.
- **Signature Trip Finder:** Search by destination, departure city, travel date, traveller count, and trip type (Honeymoon, Family, Adventure, Cultural, Leisure).
- **Curated Destinations:** Asymmetrical editorial layout highlighting Bali, Switzerland, Kerala, Dubai, Maldives, Thailand, and Kashmir.
- **The Yazhi Signature:** Brand narrative detailing the royal guardian mythology of Tamil Nadu Dravidian architecture paired with modern global adventure.
- **Signature Holiday Collections:** Romantic Escapes, Family Time, Beyond Borders, Wild & Wonderful, Slow Travel, and Culture & Heritage.
- **Featured Holiday Packages:** Verified packages with durations, starting prices in INR, inclusions, and enquiry triggers.
- **6 Pillars of Travel:** Editorial values covering personalized pacing, boutique stays, transparent INR pricing, and 24/7 WhatsApp concierge care.
- **Travel Journal Highlights:** In-depth dispatches with read times and author credits.
- **Guest Testimonials & Newsletter:** Verified traveler reflections and active newsletter subscription.
- **Luxury Footer:** Full brand credentials, contact info in Chennai, WhatsApp chat button, and legal links.

### 2. Destination Discovery (`/destinations` & `/destinations/:slug`)
- Interactive search, region filters (Domestic vs International), trip type filters, and price sorting.
- Detail pages featuring overview, best season to visit, key highlights, sample day-by-day outline, photo gallery, planning tips, and sticky enquiry card.

### 3. Holiday Packages (`/packages` & `/packages/:slug`)
- Filterable catalog of domestic and international tour packages.
- Dynamic pricing estimator calculator (adjust adults, children, and room tier: Standard, Deluxe, Luxury Villa).
- Interactive day-by-day expandable itinerary accordion with meal plans and stays.
- Itemized inclusions, exclusions, and fair cancellation policies.

### 4. Interactive 7-Step Custom Trip Planner (`/plan-trip`)
1. **Destination:** International, Domestic, or Open to suggestions.
2. **Travel Details:** Departure city, dates, flexible date toggle, and duration.
3. **Travellers:** Adults, children, and special accessibility/anniversary notes.
4. **Estimated Budget:** Indicative ranges in INR.
5. **Experience Styles:** Relaxation, Adventure, Nature, Culture, Luxury, Food, etc.
6. **Contact Details:** Full name, phone (WhatsApp), email, and consultation method.
7. **Review & Confirm:** Blueprint summary and instant server-side reference generation (e.g., `YZH-2026-XXXX`).

### 5. Confirmation Receipt (`/confirmation?ref=...`)
- Official confirmation receipt with reference code, request summary, 3-step concierge timeline, and print/save summary action.

### 6. Travel Journal / Blog (`/travel-journal` & `/travel-journal/:slug`)
- Editorial magazine layouts with category filtering and complete article reader.

### 7. Direct Contact (`/contact`)
- Validated contact form, direct WhatsApp concierge link, and registered Chennai headquarters info.

### 8. FAQ & Legal Pages (`/faq`, `/privacy-policy`, `/terms`)
- Categorized question accordions and comprehensive booking/privacy guidelines.

### 9. Private Staff Administration Portal (`/admin` / `/admin/login`)
- Protected authentication with session management.
- **Overview Metrics:** Total enquiries, new leads, package counts, destination counts, and conversion activity feed.
- **Enquiry Manager:** Filter by status (New, Contacted, In Progress, Quoted, Completed, Cancelled), inspect details, add internal staff notes, and export to CSV.
- **Package Manager:** CRUD interface to add, edit, or remove holiday packages.
- **Destination Manager:** Catalog of published destinations.
- **Company Settings:** Manage phone, WhatsApp, email, and office address.

---

## 🔑 Administrative Access

- **Login URL:** `http://localhost:5173/admin/login`
- **Authorized Email:** `admin@yazhiholidays.com`
- **Password:** `Yazhi@Luxury2026`

---

## 🛠️ Technology Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, Lucide React, React Router 7.
- **Styling Architecture:** Custom luxury tokens, Cormorant Garamond & Manrope Google Fonts, responsive breakpoints (mobile to 4K).
- **Backend & Database:** Relational schema file provided (`database/schema.sql`) for MySQL / MariaDB / PostgreSQL with indexed tables, decimal currencies, and seed data.

---

## 💻 Local Development Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

3. **Build for Production:**
   ```bash
   npm run build
   ```
   Generates optimized assets in `dist/`.

4. **Database Setup (Optional Production DB):**
   Import `database/schema.sql` into your MySQL/MariaDB database:
   ```bash
   mysql -u root -p < database/schema.sql
   ```
