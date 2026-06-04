# Vikram 🇳🇵 — Nepali Calendar

A beautiful, offline-capable Nepali Patro (Bikram Sambat calendar) web app built as a Progressive Web App (PWA).

---

## ✨ Features

- 📅 Full Nepali BS calendar (2080–2086 supported)
- 🌙 Dark / Light mode (persisted across sessions)
- 🌐 English ↔ नेपाली instant language toggle
- 🇳🇵 25+ official Nepal public holidays highlighted in red
- 🌙 Approximate Tithi (lunar day) shown on date tap
- 📌 Add & persist custom events (pink-highlighted dates)
- ⏳ Next 29 days & Previous 29 days panels (holidays + events combined)
- 📆 Month picker — tap month name to jump to any month/year
- 📲 Installable as a PWA — works fully offline
- 💾 Dark mode, language & events all saved in `localStorage`

---

## 🚀 Deploy to GitHub Pages (5 minutes)

### Option A — Upload via GitHub web UI
1. Create a new repository at [github.com/new](https://github.com/new) (any name, e.g. `vikram-calendar`).
2. Click **"uploading an existing file"** on the empty repo page.
3. Drag-and-drop the entire contents of this ZIP (not the ZIP itself — the files inside):
   ```
   index.html
   manifest.json
   sw.js
   icons/
   README.md
   .nojekyll
   ```
4. Commit directly to `main`.
5. Go to **Settings → Pages → Source → Deploy from branch → main → / (root)**.
6. After ~60 seconds your site will be live at:
   ```
   https://<your-username>.github.io/<repo-name>/
   ```

### Option B — Git CLI
```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
# Copy all files from the ZIP into this folder, then:
git add .
git commit -m "🚀 Launch Vikram Calendar"
git push origin main
# Then enable GitHub Pages in repo Settings → Pages
```

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
