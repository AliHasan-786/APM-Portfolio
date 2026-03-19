# Design Brief: TrustScore-RAG (Trust & Safety APM Portfolio)

## User Flow

```text
[Landing Page (Hero & What This Is)] 
          ↓
[How It Works / Core Concepts] 
          ↓
[Triage Simulator (Test Cases & Custom Input)] 
          ↓
          ├── (If Auto-Takedown/Auto-Approve) ──→ [Automated Action View (Metrics & Saved Cost)]
          │
          └── (If Epistemic/Aleatoric Uncertainty) ──→ [Human Moderator Dashboard]
                                                                  ↓
                                                 [Explainability Matrix & RAG Sources]
                                                                  ↓
                                                 [Manual Adjudication Console]
          ↓
[Senior-PM Level PRD (Product Strategy, KPIs, Latency vs Quality, GTM)]
```

## Screen Inventory
1. **1-landing-and-concept.html**: Hero section explaining the value prop "Agentic Escalation Engine mitigating automation bias via cost-aware selective classification" with a visual breakdown of the multi-agent pipeline.
2. **2-triage-simulator.html**: The core interactive simulator interface where the recruiter can select JD-aligned test cases (e.g., civic integrity, medical misinformation) and watch the RAG pipeline run.
3. **3-human-moderator-dashboard.html**: The XAI (Explainable AI) dashboard shown to operators during high-uncertainty escalations, detailing policy ambiguity vs. evidence deficits.
4. **4-prd.html**: An embedded, highly detailed PM requirements document demonstrating mastery of platform scale, latency trade-offs (TTFT), false-positive mitigation, and cross-functional rollout strategies.

## Shared Visual Direction
- **Theme**: Dark Mode (Glassmorphism & Neon accents) using a dark glassmorphic aesthetic.
- **Color Palette**:
  - Backgrounds: `#000000`, Deep Zinc (`#18181b`)
  - Accents: Brand Cyan (`#25f4ee`), Brand Red (`#fe2c55`)
  - Alerts: Cyber Orange (`#fb923c`) for uncertainty flags.
  - Text: White (`#ffffff`), Zinc (`#a1a1aa`, `#d4d4d8`)
- **Typography**: Inter / sans-serif. Clean, highly legible UI typography.
- **Spacing Scale**: Tailwind default, prioritizing padding and structural whitespace to prevent cognitive fatigue for moderators.

## Component Patterns
- **Test Case Badges**: Pill-shaped interactive tags that populate the simulator.
- **Explainability Cards**: Dark glass-style cards with thin borders (`border-white/10`) to separate distinct data clusters (e.g., RAG evidence vs. Claim text).
- **Process Status**: Stepper component / progress bar representing the pipeline sequence (Ingest → RAG → LPP → Route).
- **Adjudication Buttons**: Large, clear actionable buttons at the bottom of the operator screen (Remove, Approve, Ineligible for FYF).

## Accessibility
- **Contrast Requirements**: All text maintains at least 4.5:1 contrast against dark backgrounds.
- **Screen Reader Flow**: Logical DOM hierarchy (H1 -> H2 -> H3), use of `aria-label` on inputs and actionable components.
- **Keyboard Navigation**: Fully tab-accessible test cases and adjudication buttons with distinct focus rings in Cyan.
