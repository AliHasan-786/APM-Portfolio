# TrustScore-RAG: Agentic Escalation Engine
**TikTok Trust & Safety APM Portfolio Project**

## 1. Executive Summary
The rapid accessibility of generative AI and coordination of FIMI (Foreign Information Manipulation and Interference) networks have dramatically escalated content safety threats, specifically in areas of civic integrity and medical misinformation. Traditional automated content moderation—relying on binary classifications—fundamentally struggles with deep context and policy ambiguity. This results in either unacceptable over-enforcement (brand damage/loss of user agency) or dangerous under-enforcement (harm scaling globally).

**TrustScore-RAG** is a cost-aware selective classification prototype designed to bridge the gap between blunt automation and high-cost manual review. By leveraging a Retrieval-Augmented Generation (RAG) architecture paired with an LLM Performance Predictor (LPP), the system calculates internal AI uncertainty (aleatoric vs. epistemic). It autonomously actions clear violations based on strict RAG evidence, while specifically escalating highly ambiguous, borderline cases to a custom Human-in-the-Loop (HITL) Explainable AI Dashboard, dramatically reducing manual review volumes and mitigating operator automation bias.

## 2. Problem Statement
*   **Scale and Cost**: TikTok routes millions of items daily to human reviewers. Reviewing every potentially borderline claim fundamentally breaks operational expenditure limits and introduces massive multi-second latency, allowing harmful content to achieve viral escape velocity.
*   **LLM Hallucinations in Policy**: Passing all complex moderation exclusively to unconstrained LLMs generates high-profile errors. In complex policy domains, LLM hallucination rates jump to 17-33%.
*   **Automation Bias**: When human operators use highly accurate AI tools, they become cognitively passive. A simple "True/False" confidence score causes moderators to blindly approve AI recommendations, negating the purpose of HITL redundancy.

## 3. Product Requirements & Features
### 3.1 Agentic Algorithm Triage Layer
*   **Input Ingestion**: Processes video transcripts or user claims.
*   **Targeted RAG Retrieval**: Simulates extracting context from verified internal policy databases and approved eternal knowledge graphs (e.g., DSA guidelines, WHO models).
*   **LPP Calculation**: The backend calculates a granular confidence score. Cases exceeding 90% confidence are Auto-Approved or Auto-Removed.
*   **Cost-Aware Actioning**: Drops immediate manual review requirements for obvious cases, drastically lowering the Time To First Token (TTFT)/operational latency.

### 3.2 Human-in-the-Loop (HITL) Moderator Dashboard
*   **XAI Explainability Matrix**: For escalated tickets, the UI explicitly highlights *why* the AI was confused (Epistemic/Policy Gap vs Aleatoric/Missing Evidence) rather than blindly suggesting an action.
*   **Raw Source Visibility**: Translates retrieved RAG documents alongside their relevance scores, forcing the operator to verify claims against root evidence.
*   **Adjudication Console**: Clear interfaces allowing the operator to declare the content *Ineligible for the For You Feed (FYF)*, completely removed, or approved.

## 4. Definition of Success (KPIs)
To validate the system's efficacy at achieving business objectives, we measure:
*   **Primary Metric - Escalation Precision Rate:** The percentage of cases flagged as "ambiguous" by the LPP that genuinely required human intervention, directly impacting review efficiency.
*   **Secondary Metric - Moderation Cost per 1k Actions:** The measurable financial savings (Compute vs. Labor overhead) by auto-routing obvious high-confidence cases.
*   **Critical Guardrail - Human Override Rate:** The frequency at which human moderators actively disagree with any partial AI assessments. If zero, it indicates severe Automation Bias; if near 100%, the AI classifier has degraded.

## 5. Latency vs. Quality Trade-Off Analysis
Deeper multi-hop Agentic searches inherently scale quality but drastically impact global TTFT (Time to First Token). In real-time enforcement formats (e.g., Livestream moderation), a 3-second orchestration delay exposes thousands of concurrent viewers to harmful content. TrustScore-RAG bypasses this by utilizing high-speed similarity checks for basic policy intersections (Auto-Routing) and only invoking complex multi-agent reasoning paths on identified edge cases.

## 6. Go-to-Market & Operations Rollout
*   **Phase 1 (Data Science & ML)**: Calibrate the LPP thresholds on shadow-data (historical resolved tickets) without active enforcement to measure theoretical precision/recall.
*   **Phase 2 (Trust & Safety Ops)**: Roll out the XAI HITL Dashboard to a specialized "Tiger Team" of senior moderators. Monitor for cognitive fatigue and UX friction.
*   **Phase 3 (Policy Alignment)**: Utilize the output of the Epistemic Uncertainty flags to build a feedback loop for the Policy team, actively showing them where community guidelines are too vague for machine comprehension, driving future policy clarity updates.

---
*Developed as a demonstration of Product Management, Trust & Safety Architecture, and LLM-system design proficiency.*
