# AAHC Study App

A flashcard and quiz study app for the **100 Black Men African American History Challenge (AAHC)**. I built it to prepare for the St. Louis Regional competition, where I took **1st place** in March 2026, and expanded it to prepare for the **National competition on June 17, 2026**.

The deck covers African American history from the Great Migration through the Civil Rights Era, with a heavy focus on the historic figures, organizations, events, and strategies that the competition tests.

## The story

This isn't a demo project. It's the actual tool I studied from. The regional version of this deck was a main reason I placed first at Regionals. For Nationals, I added a dedicated gap-drill section covering the additional figures, events, and strategy comparisons in the official study guide, so the app now matches the fuller national syllabus.

## What's in the deck

- **172 question cards** across **11 themed sections**
- **23 vocabulary terms** in a separate tap-to-reveal bank

| Section | Cards |
| --- | --- |
| Great Migration | 10 |
| Housing & Economics | 5 |
| Power, Politics & Ideas | 10 |
| White Supremacy | 5 |
| War & Global Impact | 5 |
| Garvey, Trotter & Resistance | 5 |
| Harlem Renaissance | 5 |
| Black Churches | 5 |
| Civil Rights Era | 50 |
| Women of Civil Rights | 16 |
| Nationals Gap Drill | 56 |

## Features

- **Study by section** with per-section mastery tracking
- **All Cards** shuffle mode across the whole deck
- **Rapid Quiz** mode for fast recall practice
- **Drill Missed Only** mode that pulls just the cards marked wrong
- **Streak tracking** (current and best)
- **Mastery progress** bar with percent complete
- Flip-card interface with got-it / missed marking
- Vocabulary bank with tap-to-reveal definitions

## Tech

React + Vite. No backend; all state is in-memory during a session.

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

## License

MIT © Michael Kamau
