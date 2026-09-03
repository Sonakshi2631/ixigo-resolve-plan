# ixigo Resolve & Go

Act as a Senior Product Designer and Web Engineer specializing in high-converting travel tech. Build a consumer-centric web application prototype for "ixigo Trains" designed specifically to help users resolve travel uncertainty when their preferred train is waitlisted or unavailable.

---

### 1. BRAND & UI DESIGN SYSTEM (ixigo Aesthetic)

- Primary Accent Color: Vibrant ixigo Orange (#FF6000 / #E65100).

- Background Colors: Soft warm light gray (#F4F5F7) for canvas, pure crisp white (#FFFFFF) for main cards and containers.

- Typography: Clean modern sans-serif (Inter or System UI), clear visual weight hierarchy.

- Badges & Pills: 

  - High Probability / Confirmed: Soft Green pill background with dark green text (#E8F5E9 / #2E7D32).

  - Alternative Mode / Multi-modal: Soft Blue/Purple pill background (#E3F2FD / #1565C0).

  - High Waitlist / Caution: Light Amber pill (#FFF3E0 / #E65100).

- Components: Rounded border-radius (12px to 16px), subtle soft drop-shadows, clean divider lines, clear call-to-action (CTA) buttons in solid ixigo orange.

---

### 2. CORE USER SCENARIO & APPLICATION FLOW

User Intent: The user wants to travel from "New Delhi (NDLS)" to "Mumbai Central (MMCT)" on a peak date, but their preferred train (e.g., King Rajdhani Express) has NO confirmed seats (Waitlist WL-45). 

Target Goal: Guide the user seamlessly to a "Resolved Travel Plan" (increasing conversion confidence) without aggressive pushy sales tactics.

---

### 3. REQUIRED SCREENS & INTERACTIVE FEATURES

#### SCREEN 1: Search & Waitlisted Result State (The Problem State)

- Top Bar: ixigo header branding with route summary (New Delhi ➔ Mumbai Central | Date | 1 Traveller | Tatkal/General).

- Preferred Train Card (King Rajdhani Express):

  - Departure: 16:55 (NDLS) ➔ Arrival: 08:35 (MMCT) [15h 40m]

  - Class: 3A (3rd AC) - Status: "GNWL 45 / WL 32" in orange warning alert box.

  - Show ixigo Prediction Badge: "42% Confirmation Chance (Low)".

- Primary Friction Resolver Callout (The Hero Feature):

  - Place a prominent card immediately below the waitlisted result:

  - Header: "⚡ Instant Travel Plan B — Don't risk your trip!"

  - Brief Explanation: "Compare realistic alternatives with guaranteed seats or multi-modal options."

  - Action Button: "View Smart Alternatives (3 Ready Options)" in bold ixigo orange.

#### SCREEN 2: The "Smart Alternate Travel Plan" Modal / View (The Core Innovation)

When the user clicks "View Smart Alternatives", present an interactive comparison view offering 3 clear, consumer-centric alternatives:

1. Option A: "Nearby Station Switch" (Same Mode, Higher Certainty)

   - Route: Hazrat Nizamuddin (NZM) to Bandra Terminus (BDTS) via August Kranti Rajdhani.

   - Status: AVAILABLE - 14 Seats.

   - Trade-off Pill: "+15 mins extra travel to station | 100% Guaranteed Seat".

   - Price: ₹2,150.

   - CTA Button: "Book Confirmed Train".

2. Option B: "Smart Split Journey (Train + Bus)" (Multi-modal Alternative)

   - Segment 1: Train from NDLS to Kota (Confirmed 3A) + Segment 2: AbhiBus AC Sleeper from Kota to Mumbai.

   - Trade-off Pill: "Arrives 1.5 hrs later | 100% Guaranteed Journey | Seamless Single Booking".

   - Price: ₹2,450.

   - CTA Button: "Book Smart Combo".

3. Option C: "Protected Waitlist + Flight Fallback" (ixigo Assured Guarantee)

   - Book the waitlisted train (WL 45) NOW with 1-click Auto-Flight Backup reserve (via ixigo Flights).

   - Value Proposition: "If train isn't confirmed 24h before departure, get an instant flat 80% flight voucher discount automatically."

   - Price: Train Fare (₹2,100) + ₹149 Protection Fee.

   - CTA Button: "Book Waitlist with Seat Protection".

---

### 4. INTERACTIVE & COMPARISON TOOLS (CONSUMER-CENTRIC TOOLKIT)

- "Side-by-Side Trade-off Slider/Filter": Allow users to sort alternatives by:

  - ⚡ Speed (Earliest Arrival)

  - 💰 Best Value (Lowest Price)

  - 🛡️ Highest Certainty (100% Guaranteed vs Waitlisted)

- Transparent Honesty Callouts:

  - Add honest tooltips explaining predictions: "Predictions are based on historical IRCTC trends and seasonal demand. They are not absolute guarantees."

#### SCREEN 3: Checkout / Confirmation Screen

- Selected Plan Summary Card showing broken down leg/protection details.

- Transparent price breakdown (Fare + Taxes + Zero Cancellation Add-on).

- Prominent "Proceed to Pay" button in ixigo orange.

- Success Toast / Overlay: "Travel Plan Resolved! You're 100% set to travel."

---

### 5. TECHNICAL & UX EXPECTATIONS

- Fully responsive mobile-first UI with desktop preview flexibility.

- Smooth CSS animations when opening the "Smart Alternate Travel Plan" modal or switching tabs.

- High visual fidelity mirroring ixigo's native app interface (rounded tabs, clear icons for train/bus/plane).

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://ixigo-resolve-plan.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/bb26859d-558e-4353-b005-2914c1e098b0).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
