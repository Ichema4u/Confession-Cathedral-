# The Lie Detector: Five Statements About Confession Cathedral

Below are five statements about how this application works. Four are completely true. One is a deliberate lie. Read them carefully, then scroll down for the reveal.

---

## The Five Statements

**Statement A**
> When a user submits a confession without entering a nickname, the app automatically assigns the display name *"Anonymous"*.

**Statement B**
> The character counter in the form turns red only *after* the user has typed more than 280 characters — meaning you get a warning the moment you exceed the limit.

**Statement C**
> Each confession is given a unique ID using the browser's built-in `crypto.randomUUID()` method at the moment it is submitted.

**Statement D**
> The "View more" button appears only on confessions that are longer than 150 characters. Confessions shorter than that are always shown in full.

**Statement E**
> New confessions are placed at the *top* of the feed. This is achieved by prepending the new item to the state array using the spread operator: `[newConfession, ...prev]`.

---
---
---

> *Think you've spotted it? Scroll down for the reveal...*

---
---
---

## 🔍 Spotting the Lie

**The lie is Statement B.**

Statement B says the counter turns red *"only after the user has typed more than 280 characters"*. The word "after" implies the threshold is `> 280` — meaning you would see red at character 281.

But the actual code in `src/components/ConfessionForm.jsx` on **line 9** says:

```js
const isOverLimit = charCount >= 280;
```

The operator is `>=`, not `>`. 

This means the counter turns red *at exactly* 280 characters — not after. The moment you type your 280th character, the warning triggers immediately. You are simultaneously at the limit *and* already seeing red. There is no 280-character "safe zone" — 280 is already the danger zone.

The word "after" in Statement B was the tell. It implied you were safe at exactly 280, which the code does not allow.

---

## ✅ The Verdict

| Statement | Verdict | Reason |
|-----------|---------|--------|
| A | ✅ **True** | `nickname.trim() \|\| 'Anonymous'` on `ConfessionForm.jsx` line 18 |
| B | ❌ **The Lie** | `charCount >= 280` triggers at 280, not after |
| C | ✅ **True** | `crypto.randomUUID()` on `App.jsx` line 11 |
| D | ✅ **True** | `const charLimit = 150` and `isLong` check on `ConfessionItem.jsx` lines 13-14 |
| E | ✅ **True** | `setConfessions((prev) => [newConfession, ...prev])` on `App.jsx` line 18 |

---

## 🤖 The AI's Answer

**The AI (me) spotted the lie immediately**, because I wrote the code and knew precisely which operator was used. The `>=` vs `>` distinction is a classic edge-case trap — a one-character difference that changes the behaviour at exactly the boundary value. This is the kind of off-by-one error that causes real bugs in production systems, and it is exactly the sort of thing good unit tests are designed to catch.

The lesson: always read boundary conditions carefully. `>`, `>=`, `<`, and `<=` are not interchangeable — the edge case is where bugs live.
