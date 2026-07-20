# Vikram — Security Notes

This file documents a security review done on the codebase, what was fixed
directly in code, and — most importantly — **one critical fix you must apply
yourself in the Firebase Console**, because it lives in project config that
isn't part of this repo and can't be changed from the code.

## 🔴 Critical — fix this before (or right after) going live

**Where:** Firebase Console → your `vikram-6e99b` project → Realtime Database → Rules.

**The problem:** Partner-pairing (`cycles/`, `moments/`), and Family Share
(which reuses `cycles/` with a `FAM-` prefix) are protected only by a
6-character pairing code (or a 4-character `FAM-XXXX` code) plus a Firebase
rule of `"auth != null"`. That condition is satisfied by an **anonymous**
Firebase sign-in, which is one unauthenticated network call and free for
anyone to do — including someone who is not using this app at all.

Concretely, if your current rules look like this (which is what the app's
own in-UI error banner used to suggest):

```json
{
  "rules": {
    "cycles":  { ".read": "auth != null", ".write": "auth != null" },
    "moments": { ".read": "auth != null", ".write": "auth != null" }
  }
}
```

...then **anyone** can, after one anonymous sign-in:

- Fetch `https://vikram-6e99b-default-rtdb.asia-southeast1.firebasedatabase.app/cycles.json`
  and get back **every single paired user's** period/ovulation dates,
  symptom logs, intercourse logs, BBT logs, and pregnancy data in one
  request — no code-guessing needed, since a rule on the parent node grants
  access to the whole subtree.
- Same for `moments.json` — every couple's private message thread.
- Brute-force individual `cycles/<code>` or `moments/<room>` entries even if
  you lock down the parent — a 6-char code from a 32-symbol alphabet is
  ~2^30 combinations, and a 4-char `FAM-XXXX` code is only ~2^20 — both are
  well within reach of an unthrottled script.

This is real personal health data (cycle, symptoms, pregnancy) and private
messages, so this is worth treating as urgent.

### What to do

1. **Scope every rule to the specific child key, never the parent node.**
   This alone stops the "one request dumps everyone's data" problem:

   ```json
   {
     "rules": {
       "users": {
         "$uid": {
           ".read":  "auth != null && auth.uid === $uid",
           ".write": "auth != null && auth.uid === $uid"
         }
       },
       "cycles": {
         "$code": {
           ".read":  "auth != null",
           ".write": "auth != null"
         }
       },
       "moments": {
         "$room": {
           ".read":  "auth != null",
           ".write": "auth != null"
         }
       },
       ".read": false,
       ".write": false
     }
   }
   ```

   The top-level `".read": false, ".write": false` is important — it's what
   actually blocks someone from reading the `cycles` or `moments` parent
   node directly and getting everything at once. Without it, a rule granted
   on a child still lets some SDKs/requests walk the parent depending on
   how you query, so keep the explicit deny at the root.

   Note `users/$uid` above already matches what `18-cloud-sync.ts` needs —
   that part of the app was already doing the right thing (scoping to the
   signed-in Google user's own uid). It's `cycles/` and `moments/` that need
   the same treatment.

2. **This does not fully close the door — only a real backend can.** Even
   with per-child rules, anyone who is willing to script anonymous sign-ins
   can still brute-force an individual 6-char (or 4-char `FAM-`) code and
   read/write that one couple's or family's data. Per-child rules stop
   *mass* exposure; they don't stop a *targeted* guess. If this app is going
   to be used by people you don't personally know, or if the data matters
   a lot, the durable fix is to move pairing/sync behind a Cloud Function
   (or similar) that verifies a real handshake between two accounts instead
   of trusting a bare shared secret typed into a text box. That's a bigger
   change than this review covers — happy to help design it if you want it.

3. **Turn on Firebase App Check** (Console → App Check) and enable it for
   Realtime Database. This blocks traffic that isn't coming from your actual
   deployed app (e.g. a script hitting the REST API directly), which
   meaningfully raises the cost of both the brute-force and the
   read-everything attack above.

4. **Set a Realtime Database usage/budget alert** (Console → Usage and
   billing) so an abuse script running against your DB shows up as an alert
   instead of a surprise bill.

## What was fixed directly in the code

- **Reverse tabnabbing**: the scratch-card link opened with
  `window.open(url, '_blank')` without `noopener,noreferrer`, which lets the
  opened page reach back via `window.opener` and redirect your original tab
  to a look-alike phishing page. Fixed in `ts/07-core-app.ts` and
  `js/07-core-app.js`.
- **In-app "fix your Firebase rules" banner** was itself telling you to set
  the insecure blanket rule shown above. Updated to point at per-child rules
  and this file.

## Reviewed and found OK

- **XSS**: user-supplied text rendered via `innerHTML` (partner messages,
  note titles/snippets/tags, family shopping/event items) is consistently
  passed through `escapeHtml()`/`esc()` before insertion. No injection path
  found there.
- **PIN / App Lock** (`20-app-lock-pin-biometric.ts`): PIN is stored as a
  salted SHA-256 hash, not plaintext, using `crypto.subtle`. This is a
  *device-access* gate only, not encryption — the underlying calendar/cycle
  data in `localStorage` is plain JSON regardless of whether the lock is
  set. That's an inherent limit of client-only storage, not a bug, but
  worth knowing: someone with access to the device's browser storage (or
  the device before a lock is ever set) can read the data directly. True
  at-rest encryption would need a real key-management design, not just a
  PIN gate.
- **DevTools/right-click deterrent** (`03-devtools-deterrent.ts`): already
  honestly commented in the code as cosmetic — it blocks the *casual*
  right-click/Ctrl+U/F12 path only, and cannot and does not claim to stop
  anyone using real browser devtools. No client-side HTML/JS can ever be
  truly hidden from the browser rendering it, so this is expected and fine
  as-is; just don't rely on it for anything that matters.
- **Firebase config values** (`apiKey`, `appId`, etc. in
  `14-firebase-loader.ts`): these are meant to be public — they identify
  your project, they're not secrets — Firebase's real security boundary is
  the Rules covered above, not hiding these values.

## Lower-priority / informational

- **`X-Frame-Options` meta tag** in `index.html`: browsers only honor
  `X-Frame-Options` when it's sent as a real HTTP response header, not as an
  `<meta http-equiv>` tag — so as currently deployed (GitHub Pages, per
  `.nojekyll`) this tag is a no-op and the site has no real clickjacking
  protection. GitHub Pages can't send custom headers at all. If clickjacking
  protection matters to you, the fix is hosting somewhere that supports
  custom headers (Cloudflare Pages, Netlify, Vercel, etc.) and setting
  `Content-Security-Policy: frame-ancestors 'none'` as a real header there —
  not something fixable from inside this repo alone.
- **CSP allows `'unsafe-inline'` and `'unsafe-eval'`** for scripts. This is
  weaker than a strict CSP, but the app is built entirely on inline
  `onclick="..."` handlers throughout (thousands of them), so removing this
  would mean rewriting event wiring app-wide to use `addEventListener`. Not
  attempted here since it's a large, high-risk refactor rather than a
  security bug per se — flagging it as a "if you ever have time" hardening
  item, not an urgent one.
