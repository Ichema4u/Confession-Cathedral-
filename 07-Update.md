# Update Log — Confession Cathedral

This file documents the recent feature updates and refactors made to the Confession Cathedral application.

---

## v1.1.0 — 13 May 2026

### ✨ New Features

#### Gender Dropdown
- A new **"I am a…"** dropdown field has been added to the submission form, positioned between the Nickname and Confession textarea fields.
- Posters can now identify themselves as:
  - **He** (Male)
  - **She** (Female)
  - **Prefer not to say** *(default — no selection required)*
- This is a fully **controlled input**: its value is tracked in React state and resets to empty after every successful submission.
- The selected gender is stored alongside the confession in memory as part of the confession object.

#### Gender Badge on Feed Cards
- When a poster selects **He** or **She**, a small styled **pill badge** now appears inline next to their nickname on their confession card in the feed.
- Posters who selected "Prefer not to say" will see **no badge** — their privacy is respected and the UI remains clean.

#### Full Date Display
- Each confession card now shows the **full posting date and time** in addition to the existing relative timestamp (e.g., "5 minutes ago").
- The full date is formatted as: `DD MMM YYYY, H:MM AM/PM` — for example, `13 May 2026, 8:48 PM`.
- The relative time and full date are separated by a mid-dot (`·`) for clean visual separation.

---

### 🔧 Files Modified

| File | Change |
|------|--------|
| `src/components/ConfessionForm.jsx` | Added `gender` state, dropdown `<select>` UI, reset on submit, passed `gender` to `onSubmit` |
| `src/components/ConfessionItem.jsx` | Added gender badge render, imported `format` from `date-fns`, added full date to timestamp display |

---

### 🏗️ No Breaking Changes
All existing confessions and features (character counter, empty filter, edit mode, "View more", Framer Motion animations) continue to work exactly as before. The gender field is fully optional and backward-compatible with the in-memory data shape.
