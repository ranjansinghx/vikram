# Vikram 🇳🇵 — Nepali Calendar

A beautiful, offline-capable Nepali Patro (Bikram Sambat calendar) web app built as a Progressive Web App (PWA).

---

## ✨ Features

- 📅 Full Nepali BS calendar (2055–2086 supported)
- 🌙 Dark / Light mode (persisted across sessions)
- 🌐 English ↔ नेपाली instant language toggle
- 🇳🇵 25+ official Nepal public holidays highlighted in red
- 🌙 Approximate Tithi (lunar day) shown on date tap
- 📌 Add & persist custom events (pink-highlighted dates)
- ⏳ Next 29 days & Previous 29 days panels (holidays + events combined)
- 📆 Month picker — tap month name to jump to any month/year
- 📲 Installable as a PWA — works fully offline
- 💾 Dark mode, language & events all saved in `localStorage`


### 📅 Core Calendar & Converter
* **Localized Calendar Matrix**: A fluid calendar UI built dynamically with robust styling tailored for multi-language display (English and Devanagari script fonts)[cite: 1].
* **Bi-directional Date Conversion**: Includes a built-in converter module (`.cvcard`) to convert dates between Bikram Sambat (BS) and Gregorian (AD) formats seamlessly[cite: 1].
* **Google Calendar Integration**: A native UI block designed to allow data synchronization directly with Google Calendar API endpoints, complete with status notifications[cite: 1].
* **Upcoming Events Feed**: An elegant, Google Calendar-inspired schedule layout that groups system holidays, user events, and specific indicators chronologically[cite: 1].

### 🩸 Comprehensive Cycle Tracker
* **Phase Analysis**: A full-fledged menstrual health tracking system that maps out different physiological cycles including Menstrual, Follicular, Ovulation, and Luteal phases[cite: 1].
* **Partner Pairing**: Includes a secure configuration module that generates verification pairing codes (`.partner-code`) to securely synchronize calendar logs with a partner[cite: 1].

### 🧘 Mood, Focus, & Reflection Utilities
* **Emoji Mood Logs**: An integrated sliding horizontal matrix grid mapping daily emotional trends with cross-profile sharing integrations[cite: 1].
* **Pomodoro Focus Engine**: An immersive circular timer module with an active progress layer, session count tracking, and independent operational controls[cite: 1].
* **"Echo" Reflection Canvas**: A high-fidelity, minimalist workspace featuring thematic typography and blur layers intended for private meditative journaling[cite: 1].
* **Color Matcher Design Sandbox**: An elegant gamified design interface with custom target circles, interactive grid swatches, and high-score multipliers[cite: 1].

### 📱 PWA & Adaptive Design
* **Standalone PWA Readiness**: Comes packed with apple-mobile properties, web manifest linkages, and a custom inline step-by-step app installer banner configuration[cite: 1].
* **Dynamic Theme Mechanism**: A flicker-free theme initialization script processing local system preferences (`localStorage`) to switch seamlessly between premium Light and dark modes[cite: 1].

---

## 🛠️ Architecture & Tech Stack

This application is built cleanly as an ultra-fast client-side single-page utility, utilizing semantic markup alongside advanced layouts[cite: 1]:

* **Markup & Structure**: Clean HTML5 layout engineered perfectly for mobile viewports[cite: 1].
* **Styling Infrastructure**: Tailored CSS3 custom design tokens leveraging CSS variables to control animations, gradients, and custom themes dynamically[cite: 1].
* **Typography**: Integrated with Google Fonts displaying optimized typography pairings using **Nunito** and **Noto Sans Devanagari**[cite: 1].
* **Authentication Capability**: Pre-configured configuration hooks tracking external identity networks via Google Identity Services (`gsi/client`)[cite: 1].

---
---



## 📁 File Structure

```
vikram-calendar/
├── index.html              # Main app (HTML + CSS + JS, single file)
├── manifest.json           # PWA web app manifest
├── sw.js                   # Service worker (offline / cache-first)
├── icons/
│   ├── icon-192.png        # Home screen icon (Android)
│   ├── icon-512.png        # Splash screen icon (Android)
│   ├── apple-touch-icon.png # Home screen icon (iOS)
│   ├── favicon-32.png      # Browser tab favicon
│   └── favicon-16.png      # Browser tab favicon (small)
├── .nojekyll               # Disables Jekyll on GitHub Pages
└── README.md               # This file
```

---

## 📲 Installing as a PWA

### Android (Chrome)
- Open the site in Chrome → tap **"Add to Home Screen"** banner or ⋮ menu → **"Install app"**

### iPhone / iPad (Safari)
- Open the site in Safari → tap **Share ⎙** → **"Add to Home Screen"**

---

## 🛠 Local Development

Just open `index.html` in any modern browser. For PWA features (service worker, install prompt) you need HTTPS or `localhost`:

```bash
# Python built-in server
python3 -m http.server 8080
# Then open http://localhost:8080
```

---

## 📜 License

MIT — free to use, modify and distribute.
