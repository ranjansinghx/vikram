# Vikram — Nepali Calendar

A Nepali Patro (Bikram Sambat calendar) web app, built as an installable, offline-capable Progressive Web App — with real account sync, partner-shared cycle tracking, family sharing, and two-way Google Calendar integration on top of the calendar itself.

---

## ✨ Features

### 📅 Core Calendar & Date Conversion
- Full Nepali BS calendar (2055–2086 supported), with **day, week, month, month-tab, quarterly (multi-month), and Google-Calendar-style schedule/agenda** views
- Collapsible calendar (swipe to shrink to a week strip)
- Bi-directional **BS ↔ AD date converter**
- **BS age calculator**
- 25+ official Nepal public holidays highlighted, plus observances, with holiday helper lookups
- Approximate **Tithi** (lunar day) shown on date tap
- **Panchang**: approximate sunrise/sunset and Rahu Kaal for Kathmandu (27.7°N, 85.3°E, NPT UTC+5:45)
- English ↔ नेपाली instant language toggle (Nunito + Noto Sans Devanagari typography)
- Dark / Light theme, with an **automatic sunrise/sunset-based theme** option, persisted across sessions
- **Accent color** customization
- **Focus Mode** and **Simple Mode** (a stripped-down, larger-text layout)
- **Quick Add**: type things like "Dinner tomorrow at 7pm" or "call mom next Friday" and it parses the date/time automatically
- **Event templates** — save a recurring event setup and re-apply it later
- Custom events: add, edit, color-tag, and persist locally even when signed out
- **Export calendar/events to PDF**

### 🩸 My Cycle — Period, TTC & Pregnancy Tracker (with Partner Pairing)
- Three modes in one tracker: **Period tracking**, **Trying to Conceive (TTC)**, and **Pregnancy** (shows current week from LMP date)
- Full phase tracking — Menstrual, Follicular, Ovulation (fertile window), and Luteal phases, with phase-aware predictions
- **Birth control / contraception tracking** with its own reminders
- **Medication / supplement log**
- **Weight & water intake log**
- **Clinic visit summary** — a read-only in-app overview to show a doctor
- **Export cycle data as a CSV backup**
- **Phase-aware custom reminders**
- **Partner pairing**: generate a shareable pairing code and sync cycle logs live between two paired accounts over Firebase Realtime Database, including a shared "moments" message thread between partners, plus a partner-facing month-review/hero card view

### 🔥 Tracker Tab (Streak Hub)
- Build habits, break bad ones, or run simple counters, each with **streak tracking** (current streak, best streak) and a visual progress ring
- **Countdown items** for counting down to specific future dates
- Configurable reminder times per habit, with local notification checks
- Swipe gestures for quick actions on list items

### 👤 Profile Tab
A surprising amount lives in the Profile tab:
- Editable name, "about" status, and profile photo
- Birthday with automatic age display and a countdown to the next birthday
- **Birthday Tracker** — track other people's birthdays (friends & family), with day-count-until and yearly recurrence, synced into the calendar as events
- **Work Hours tracker** — log hours worked per day with a weekly bar chart and running weekly total
- **📊 Your Stats** — habit streaks, notes/tasks counts, and other personal stats at a glance
- **Achievements**
- **Year in Review** — a yearly summary/wrap-up view
- **Memory Lane** — a photo carousel
- **🌤️ Weather** — current conditions and forecast
- **💱 Gold & Forex** — live gold price and currency exchange rates
- **🕉️ Muhurat** — auspicious time windows
- **🔮 Rashifal** — horoscope by zodiac sign (auto-detected from birthday, or choose manually)
- **💰 Kharcha** — expense & income tracker with monthly totals and history
- **👨‍👩‍👧 Family Share** — a shared space with a family/partner via pairing code: shared shopping list, shared events, and conflict resolution when both sides edit at once
- **🗓 Date Converter** and **🍅 Pomodoro Focus Timer** shortcuts
- Shareable **profile link** and **QR code**, plus upcoming events and notes shown to whoever opens your shared profile
- **Shareable digital birthday card** — generates a downloadable canvas image with your name, photo, and details
- Data summary, sync status chips, and a **full backup / restore** sheet (export/import everything as JSON)
- **Home-screen widget feed** — enable a live data feed (with a REST URL and an auto-generated Scriptable script) so an iOS/Android home-screen widget can show your calendar data

### 📝 Notes
- Multiple notes with a list + full editor view
- Rich formatting (bold/italic/headings), inline checklists, and tags with tag-based filtering
- Pin important notes; auto-save with a save-status indicator

### ✅ Tasks
- To-do list with due dates and repeat rules (e.g. daily/weekly)
- Swipe-to-delete with an **undo snackbar**, completion toggling, and an incomplete-count badge

### 🔔 Notifications & Reminders
- Browser notifications for events, habit reminders, and cycle-phase reminders
- Configurable default reminder lead time, with a background check loop

### ⚙️ Settings & Data
- Export / import all events as JSON; clear events, notes, or tasks individually
- Reset app option, storage-usage calculator, changelog, and privacy policy screens
- Haptic feedback toggle, pinned-note toggle, and home-badge-count toggle
- **App Lock** — protect the app with a PIN, with **biometric unlock** (WebAuthn / Face ID / fingerprint) where supported, and a configurable lock scope

### ☁️ Account, Sync & Google Calendar (Firebase-backed)
Vikram isn't purely local-only — it's backed by a live Firebase project:
- **Google Sign-In** (Firebase Auth) with anonymous-auth fallback for unsigned-in use
- **Two-way cloud sync**: all local data (events, cycle logs, mood logs, settings, etc.) is serialized and synced to Firebase Realtime Database per signed-in user, with last-write-wins merge on both push and pull — so your data follows you across devices
- **Direct Google Calendar integration**: authenticates via Google Identity Services (OAuth, `calendar.events` scope) and reads/writes events straight to the user's real Google Calendar — not just a UI mockup

### 🧘 Extra Tools
- **Echo** — a minimal, distraction-free journaling space
- A small color-matching mini-game
- QR code generation (used for profile sharing) via a bundled offline-capable QR library

### 📲 PWA & Platform Behavior
- Installable on Android, iOS, and desktop, with a custom install-prompt card (platform-aware: Android install banner vs. iOS "Add to Home Screen" instructions)
- Works fully offline for the core calendar; service worker pre-caches the app shell and updates it in the background (stale-while-revalidate)
- Swipe left/right anywhere to move between the bottom-nav tabs (Home ↔ My Cycle ↔ Tracker ↔ Profile)
- Splash screen that waits for web fonts to finish loading before revealing the app (avoids a flash of unstyled text), followed by a first-run onboarding walkthrough
- Casual right-click / view-source / DevTools-shortcut deterrent (not a real security measure — see the code comment for why)

---

## 🛠️ Architecture & Tech Stack

- **Markup & styling**: semantic HTML5 + CSS custom properties (design tokens) for theming, animation, and responsive layout, hand-tuned for mobile viewports
- **Logic**: TypeScript, compiled to plain JavaScript (see [Project Structure](#-project-structure) below) — no framework, no bundler required
- **Typography**: Google Fonts — Nunito (Latin) and Noto Sans Devanagari (Nepali script)
- **Auth & data**: Firebase Authentication (Google Sign-In + anonymous) and Firebase Realtime Database for cross-device sync, partner-pairing, and family sharing
- **Calendar sync**: Google Identity Services + direct calls to the Google Calendar API (`googleapis.com/calendar/v3`) from the client, using the user's own OAuth token
- **Live data**: Open-Meteo (weather), Hamropatro (gold/forex rates)
- **Offline support**: a service worker caching the app shell for installable, offline-first use
- **PDF export**: jsPDF, loaded on demand
- **QR codes**: a small bundled offline-capable QR library (qrcodejs)

---

## 📁 Project Structure

The app was split out of a single `index.html` file into separate HTML/CSS/TypeScript sources for maintainability. `ts/` is the source of truth; `js/` is its compiled build output, which is what `index.html` actually loads in the browser.

```
vikram-calendar/
├── index.html                    # Markup only — references the CSS/JS files below, in load order
├── manifest.json                 # PWA web app manifest
├── sw.js                         # Service worker (app-shell caching for offline use)
├── tsconfig.json                 # TypeScript compiler config (outputs ts/ → js/)
├── css/
│   ├── 01-font-fallback.css      # System font fallback while Google Fonts load
│   ├── 02-main-styles.css        # Core design tokens, layout, and component styles
│   └── 03-new-features.css       # Styles for newer features (home tools grid, etc.)
├── ts/                           # TypeScript sources — edit these
│   ├── 00-global.d.ts            # Ambient type declarations (no runtime code)
│   ├── 01-theme-init.ts          # Early dark/light + auto (sunrise/sunset) theme
│   ├── 02-qrcode-lib.ts          # Vendored QR code library
│   ├── 03-devtools-deterrent.ts  # Right-click / view-source deterrent
│   ├── 04-service-worker-register.ts
│   ├── 05-onboarding.ts          # First-run walkthrough
│   ├── 06-splash-screen.ts       # Splash screen + font-load handling
│   ├── 07-core-app.ts            # Core app: calendar, cycle tracker, settings, etc. (largest file)
│   ├── 08-default-home-tab.ts
│   ├── 09-notes.ts               # Notes
│   ├── 10-tasks.ts               # Tasks
│   ├── 11-pwa-install-prompt.ts  # Custom install-prompt card
│   ├── 12-enhanced-features-v2.ts # Profile: search, sharing, birthdays, backup, etc.
│   ├── 13-google-signin-stub.ts  # Early Google sign-in stub (waits for Firebase)
│   ├── 14-firebase-loader.ts     # Loads Firebase SDK + initializes app + auth
│   ├── 15-google-ui-updater.ts
│   ├── 16-google-auth-note.ts
│   ├── 17-settings-extras.ts     # Export/import, reset, storage usage, changelog
│   ├── 18-cloud-sync.ts          # Cross-device Firebase sync engine
│   ├── 19-birthday-tracker.ts    # Birthday tracker, backup sheet, quick-add parsing, etc.
│   ├── 20-app-lock-pin-biometric.ts # PIN + biometric app lock
│   ├── 21-new-features-bundle.ts # Kharcha, Family Share, Insights (weather/gold/muhurat/rashifal), widgets, PDF export
│   └── 22-swipe-between-tabs.ts  # Swipe navigation between bottom-nav tabs
├── js/                            # Compiled output (generated — don't hand-edit)
├── icons/
│   ├── icon-192.png               # Home screen icon (Android)
│   ├── icon-512.png                # Splash screen icon (Android)
│   ├── apple-touch-icon.png       # Home screen icon (iOS)
│   ├── favicon-32.png             # Browser tab favicon
│   └── favicon-16.png             # Browser tab favicon (small)
├── .nojekyll                       # Disables Jekyll on GitHub Pages
└── README.md                       # This file
```

### Rebuilding after editing TypeScript

```bash
npx tsc -p tsconfig.json
```

This regenerates the files in `js/` from `ts/`. `index.html` only ever loads from `js/`, so changes to `ts/` won't show up in the browser until you recompile.

---

## 📲 Installing as a PWA

### Android (Chrome)
- Open the site in Chrome → tap **"Add to Home Screen"** banner or ⋮ menu → **"Install app"**

### iPhone / iPad (Safari)
- Open the site in Safari → tap **Share ⎙** → **"Add to Home Screen"**

---

## 🛠 Local Development

Serve the folder with any static server — for PWA features (service worker, install prompt) and for Google Sign-In / Calendar sync to work, you need HTTPS or `localhost`:

```bash
# Python built-in server
python3 -m http.server 8080
# Then open http://localhost:8080
```

Google Sign-In and Calendar sync also require your serving origin to be an authorized domain in the Firebase project and an authorized redirect URI in the associated Google Cloud OAuth client.

---

## 📜 License

MIT — free to use, modify and distribute.
