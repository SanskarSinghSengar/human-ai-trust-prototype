This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Humanlike AI Systems and Trust Calibration Prototype

## Overview

This project implements a modular web-based experimental platform for studying behavioral trust and trust calibration in AI-assisted decision systems.

The prototype enables controlled manipulation of humanlike interface cues (e.g., assistant name and tone) and captures structured, high-resolution behavioral trust data across repeated decision trials.

The system is designed as reusable infrastructure for human–AI trust research.

---

## Experimental Design

### Task Structure

Participants complete **8 structured hiring decision trials**.

For each trial:

1. AI provides a recommendation (Candidate A)
2. Participant chooses:
   - Accept AI Recommendation
   - Override & Choose Candidate B
3. Participant reports confidence (0–100 scale)

This produces observable behavioral trust outcomes.

---

## Independent Variable (Cue Manipulation)

Participants are randomly assigned (persistently) to one of two conditions:

### 1. Humanlike Condition
- Assistant name: *Alex*
- Conversational tone
- Informal phrasing

### 2. Neutral / Authority-Signaling Condition
- Assistant name: *Decision Support System v3.2*
- Technical tone
- Probability framing (e.g., P = 0.72)

Condition is assigned once per participant and stored in local storage to preserve experimental integrity.

---

## AI Accuracy Control

Each trial independently simulates AI correctness at 70% accuracy.

This enables:

- Overtrust detection (following incorrect AI)
- Undertrust detection (rejecting correct AI)
- Calibration gap analysis
- Reliance vs correctness analysis

---

## Behavioral Instrumentation

For each trial, the system logs:

| Field | Description |
|--------|------------|
| participant_id | Unique persistent participant identifier |
| condition | humanlike / neutral |
| trial_index | Trial number (1–8) |
| scenario_id | Scenario identifier |
| ai_correct | Whether AI recommendation was correct |
| decision | accept / override |
| participant_followed_ai | Boolean derived variable |
| confidence | Self-reported confidence (0–100) |
| latency_ms | Response time in milliseconds |
| timestamp | ISO timestamp |

Data is logged chronologically in newline-separated JSON format.

---

## Data Export

Two export formats are supported:

- JSON (raw logs.json)
- CSV (via `/api/export` endpoint)

CSV file includes all structured event fields and is analysis-ready for Python, R, SPSS, or Excel.

---

## Architecture
