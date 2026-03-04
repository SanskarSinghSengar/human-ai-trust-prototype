# Humanlike AI Systems and Trust Calibration Prototype

## 1. Overview

This project implements a modular, web-based experimental platform for studying **behavioral trust and trust calibration in AI-assisted decision systems**.

The prototype enables controlled manipulation of humanlike interface cues (assistant name and tone) and captures structured, high-resolution behavioral decision data across repeated trials.

The system is designed as reusable research infrastructure for human–AI trust experiments rather than a one-off demo.

---

## 2. Research Motivation

As AI systems increasingly adopt:

- Human names
- Conversational tone
- Social cues
- Confidence framing

Users may infer competence or reliability based on *presentation* rather than actual system accuracy.

Most existing trust research relies heavily on self-report scales.

This prototype instead measures:

- Observable reliance behavior
- Override decisions
- Confidence ratings
- Response latency
- Accuracy-conditional trust

This enables study of:

- Overtrust (following incorrect AI)
- Undertrust (rejecting correct AI)
- Calibration gaps
- Confidence–behavior alignment
- Latency differences by cue condition

---

## 3. Experimental Design

### Task Structure

Participants complete **8 structured hiring decision trials**.

Each trial follows this sequence:

1. AI recommends Candidate A.
2. Participant chooses:
   - Accept AI Recommendation
   - Override & Select Candidate B
3. Participant reports confidence (0–100).
4. System logs structured behavioral data.

---

## 4. Cue Manipulation (Independent Variable)

Participants are randomly assigned (persistently) to one of two interface conditions.

### Condition A: Humanlike

- Assistant Name: *Alex*
- Conversational tone
- Informal endorsement

Example:

> “Hey! I’d go with Candidate A — they seem like a strong fit 😊”

---

### Condition B: Neutral / Authority-Signaling

- Assistant Name: *Decision Support System v3.2*
- Formal tone
- Quantitative probability framing

Example:

> “Based on performance modeling, Candidate A shows a predicted performance score of P = 0.72.”

---

Condition is assigned once per participant and stored in local storage to preserve experimental consistency across refreshes.

---

## 5. AI Accuracy Control

Each trial independently simulates AI correctness at **70% accuracy**.

This allows structured analysis of:

- Reliance conditional on correctness
- Overtrust
- Undertrust
- Trust calibration gap

---

## 6. Behavioral Logging Schema

Each trial generates one structured event.

| Field | Description |
|--------|------------|
| participant_id | Persistent unique participant identifier |
| condition | humanlike / neutral |
| trial_index | Trial number (1–8) |
| scenario_id | Scenario identifier |
| ai_correct | Whether AI recommendation was correct |
| decision | accept / override |
| participant_followed_ai | Derived boolean variable |
| confidence | Self-reported confidence (0–100) |
| latency_ms | Response time in milliseconds |
| timestamp | ISO timestamp |

Logs are stored chronologically in newline-separated JSON format (`logs.json`).

---

## 7. Data Export

The system supports:

- Raw JSON (logs.json)
- CSV export via `/api/export`

CSV output is analysis-ready for:

- Python
- R
- SPSS
- Excel

---

## 8. Architecture

```
app/
  page.tsx                  → Experimental interface
  api/log/route.ts          → Logging endpoint
  api/export/route.ts       → CSV export endpoint

lib/
  condition.ts              → Cue manipulation logic
  scenarios.ts              → Trial scenario dataset

logs.json                   → Chronological event storage
```

### Design Principles

- Modular cue manipulation
- Persistent condition assignment
- Controlled AI correctness
- Reproducible behavioral instrumentation
- Separation of UI and experimental logic

---

## 9. How to Run Locally

Clone the repository:

```
git clone <repo_url>
```

Install dependencies:

```
npm install
```

Start development server:

```
npm run dev
```

Open in browser:

```
http://localhost:3000
```

Download CSV:

```
http://localhost:3000/api/export
```

---

## 10. Example Research Questions

- Does humanlike presentation increase reliance rates?
- Are participants more likely to follow incorrect AI when tone is conversational?
- Does authority-style framing reduce overtrust?
- Does confidence differ by cue condition?
- Is response latency affected by interface style?

---

## 11. Extensibility

The system is built to support:

- Additional cue manipulations (visual identity, authority badges)
- Alternative decision domains
- Adjustable AI accuracy parameters
- Database-backed logging
- Multi-user deployment

---

## 12. Alignment with Project Goals

This prototype meets screening requirements by providing:

- Controlled cue manipulation
- Structured behavioral task
- Deterministic logging schema
- High-resolution behavioral instrumentation
- Exportable JSON and CSV datasets
- Clear modular architecture
- Reproducible experimental workflow

---

## Author

Sanskar Sengar  
Prototype developed for the *Humanlike AI Systems and Trust Attribution* project.
