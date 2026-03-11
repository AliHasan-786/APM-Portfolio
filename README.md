# TikTok Trust & Safety APM Portfolio
**An Interactive Product Management, AI/ML, and Platform Integrity Showcase**

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://tiktok-apm-portfolio.vercel.app/) 

## 🎯 Executive Summary
I built this comprehensive, full-stack application as a direct demonstration of my qualifications for the **Associate Product Manager - Safety Product** role at TikTok (San Jose). 

This portfolio proves my ability to translate complex policy challenges into scalable, user-centric product solutions. It specifically demonstrates practical experience with the exact technologies and frameworks mentioned in the job description: **Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), Human-in-the-Loop (HITL) workflows, platform integrity logic, and data-driven product metrics.**

The application is split into two distinct product pillars, mirroring the dual nature of an APM role: external user empowerment and internal operational efficiency.

---

## 🛡️ Product Pillar 1: Creator Aegis (Consumer-Facing)
**Goal:** Empower creators by giving them granular, natural-language control over their comment sections, moving beyond simplistic keyword blocks to combat semantic evasions and targeted harassment.

### Core Feature & Problem Solved
Creators frequently face harassment that evades rigid keyword filters (e.g., trolls using words like "whale" or "bakery" to fat-shame instead of using explicitly banned words). Expecting creators to anticipate and block every possible evasion tactic is poor UX and shifts the safety burden onto the victim.

**Creator Aegis** acts as a personalized zero-shot AI boundary system. Creators simply type their boundaries in plain English (e.g., "Block passive-aggressive comments about my parenting style"). A simulated edge-device LLM dynamically parses incoming comments against these specific rules, catching semantic evasions, leetspeak, and contextual bullying.

### Alignment with TikTok APM Responsibilities:
*   **Identifying User Pain Points & Emerging Risks:** Recognizes the trend of bad actors bypassing traditional keyword filters and solves for the creator's emotional fatigue.
*   **AI-Powered Moderation:** Deploys a live LLM (Gemini 2.5 Flash with `BLOCK_NONE` safety overrides for authentic testing) acting as a personalized inference engine.
*   **Product Discovery & Iteration:** Features a "Try the Demo" sandbox proving the concept natively in the browser.

---

## ⚖️ Product Pillar 2: TrustScore Engine (Internal Operations)
**Goal:** Optimize content safety systems and enhance review efficiency by integrating RAG and granular confidence scoring to triage ambiguous policy violations.

### Core Feature & Problem Solved
TikTok reviews millions of items daily. Binary AI classifiers often fail in highly contextual or legally ambiguous domains (e.g., EU DSA compliance regarding synthetic media, medical misinformation, or counterfactual fairness). Routing everything to humans breaks operational budgets (Labor vs. Compute costs), while letting AI auto-action everything leads to high-profile PR disasters due to hallucinations and model biases.

**TrustScore-RAG** acts as an intelligent triage layer. It ingests claims and uses a simulated Retrieval-Augmented Generation pipeline to cross-reference established policies. Most importantly, it calculates an **LLM Performance Predictor (LPP) Score**. 
- **Auto-Takedown / Auto-Approve:** High confidence (>90%) -> Bypasses human review, reducing operational expenditure.
- **Strategic Escalation (HITL):** Low confidence -> Routes to a human moderator. 

### Resolving Automation Bias (Appropriate Reliance)
When human moderators engage with highly accurate AI, they often suffer from *Automation Bias* (blindly agreeing with the machine). This dashboard forces **Appropriate Reliance** by explicitly providing *Explainable AI (XAI)*. It tells the moderator exactly *why* it is confused—differentiating between **Aleatoric Uncertainty** (missing factual data) and **Epistemic Uncertainty** (vague company policy)—and displays the raw RAG sources used to make the assumption.

### Alignment with TikTok APM Responsibilities:
*   **Enhancing Review Efficiency & Risk Control:** Directly tackles the scaling problem of moderation operations while guarding against LLM hallucinations.
*   **RAG & Human-in-the-loop Workflows:** Actively demonstrates a sophisticated dashboard specifically designed to augment, not replace, human policy ops teams while avoiding cognitive fatigue.
*   **Tracking Success Metrics:** Defines precise KPIs including *Escalation Precision Rate*, *Moderation Cost per 1k Actions*, and *Human Override Rate* to ensure the product fundamentally impacts business goals.

---

## 🛠️ Technical Architecture & Execution
I architected and coded this entire platform to prove that my product sense is backed by tangible execution capabilities. I operate seamlessly with engineering teams because I understand the stack.

*   **Frontend / UI:** Next.js 14 (App Router), React, Tailwind CSS, Framer Motion (for crisp, premium micro-animations reflecting TikTok's design standards), Lucide React.
*   **Backend / AI Integration:** Next.js Route Handlers strictly integrating the `gemini-2.5-flash` model via the `@google/genai` SDK.
*   **Prompt Engineering:** Deployed constitutional AI prompts specifically tuned to override default safeguard thresholds, allowing recruiters to test genuinely harmful/toxic strings to see the moderation logic work accurately.

## 📈 What I Bring
The TikTok Safety Product APM role requires a rare blend of **empathy** (understanding user and creator harm), **systems thinking** (calculating the cascading effects of a policy execution), and **technical literacy** (knowing the limitations and boundaries of modern LLMs). 

1.  **I don't just write PRDs; I build prototypes.** I can rapidly validate technical feasibility and user experience before taxing engineering resources.
2.  **I understand the Moderation Trilemma.** I grasp the intricate balance between False Positives (over-enforcement hurting brand/creators), False Negatives (under-enforcement hurting platform integrity), and Operational Cost (scalable human logic).
3.  **I am fluent in the academic state-of-the-art.** From *Counterfactual Fairness (BBQ)* to *Indirect Prompt Injection (BIPIA)*, I approach trust & safety through a rigorous, research-backed framework.

This portfolio is my minimum viable product. I look forward to bringing this level of intensity, strategic clarity, and technical execution to the APM cohort at TikTok.
