"use client";

import { useState, useRef, useCallback } from "react";
import { processClaim, ModerationResult, AgentStep, TEST_CASES, TestCase } from "@/lib/simulator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, ShieldAlert, Sparkles, Server, Zap, Brain, Users, BarChart3, Gauge, Clock, DollarSign, ArrowDown, ChevronRight, Layers, FileText, Target, TrendingUp, Activity } from "lucide-react";
import { HumanModeratorDashboard } from "./HumanModeratorDashboard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

/* ─── Hero Section ─── */
function HeroSection() {
  return (
    <section className="relative pt-20 pb-16 px-4 text-center overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-6">
        <Badge variant="outline" className="border-brand-cyan/40 text-brand-cyan px-4 py-1.5 text-sm">
          APM Portfolio Project
        </Badge>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
          <span className="text-white">TrustScore</span>
          <span className="text-brand-cyan">-RAG</span>
        </h1>
        <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
          An <strong className="text-white">Agentic Escalation Engine</strong> that intelligently routes content moderation decisions between AI auto-enforcement and human review — mitigating <strong className="text-brand-red">automation bias</strong> via cost-aware selective classification.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Badge className="bg-zinc-800 text-zinc-300 border-zinc-700">LLMs</Badge>
          <Badge className="bg-zinc-800 text-zinc-300 border-zinc-700">RAG Architecture</Badge>
          <Badge className="bg-zinc-800 text-zinc-300 border-zinc-700">Human-in-the-Loop</Badge>
          <Badge className="bg-zinc-800 text-zinc-300 border-zinc-700">Content Safety</Badge>
          <Badge className="bg-zinc-800 text-zinc-300 border-zinc-700">Platform Integrity</Badge>
          <Badge className="bg-zinc-800 text-zinc-300 border-zinc-700">Review Efficiency</Badge>
        </div>
        <div className="pt-8">
          <a href="#simulator" className="inline-flex items-center gap-2 bg-white text-black px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)]">
            Try the Live Prototype <ArrowDown className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── How It Works ─── */
function HowItWorksSection() {
  const steps = [
    { icon: <Layers className="w-6 h-6" />, title: "1. Content Ingested", desc: "A flagged video transcript or claim enters the multi-agent pipeline for policy assessment." },
    { icon: <Brain className="w-6 h-6" />, title: "2. RAG Evidence Retrieved", desc: "Retrieval-Augmented Generation queries verified databases (DSA guidelines, CDC, WHO) to anchor the LLM in factual evidence." },
    { icon: <Gauge className="w-6 h-6" />, title: "3. LPP Uncertainty Scored", desc: "An LLM Performance Predictor calculates internal confidence and classifies uncertainty as Epistemic (policy gap) or Aleatoric (evidence gap)." },
    { icon: <Zap className="w-6 h-6" />, title: "4. Cost-Aware Routing", desc: "High-confidence cases are auto-actioned. Low-confidence edge cases are escalated to human moderators with full explainability context." },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">How It Works</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            This prototype simulates the backend content moderation triage pipeline. Select a test case below, and watch the multi-agent pipeline process it in real time.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={i} className="relative bg-zinc-900/50 border border-white/10 rounded-xl p-6 text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-cyan/10 text-brand-cyan mb-2">
                {s.icon}
              </div>
              <h3 className="font-semibold text-white">{s.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{s.desc}</p>
              {i < steps.length - 1 && (
                <ChevronRight className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 text-zinc-600 w-6 h-6 z-10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── KPI Metrics Bar ─── */
function MetricsBar() {
  const metrics = [
    { icon: <Target className="w-5 h-5 text-brand-cyan" />, label: "Escalation Precision Rate", value: "87%", desc: "Ambiguous cases correctly routed to humans" },
    { icon: <DollarSign className="w-5 h-5 text-green-400" />, label: "Cost per 1k Actions", value: "$14.20", desc: "vs. $42.00 fully manual baseline" },
    { icon: <TrendingUp className="w-5 h-5 text-orange-400" />, label: "Human Override Rate", value: "12%", desc: "Active disagreements (anti-automation-bias gauge)" },
    { icon: <Clock className="w-5 h-5 text-purple-400" />, label: "Avg. TTFT Latency", value: "2.1s", desc: "Time to first routing decision" },
  ];

  return (
    <section className="py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((m, i) => (
            <div key={i} className="bg-zinc-900/50 border border-white/10 rounded-xl p-4 space-y-1">
              <div className="flex items-center gap-2 text-xs text-zinc-500 uppercase tracking-wider font-semibold">
                {m.icon} {m.label}
              </div>
              <div className="text-2xl font-bold text-white">{m.value}</div>
              <div className="text-xs text-zinc-500">{m.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PRD Section ─── */
function PRDSection() {
  return (
    <section id="prd" className="py-16 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center mb-8">
          <Badge variant="outline" className="border-brand-red/40 text-brand-red mb-4">
            <FileText className="w-3 h-3 mr-1" /> Product Requirements Document
          </Badge>
          <h2 className="text-3xl font-bold">Product Strategy & PM Artifacts</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-zinc-900/50 border-white/10">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2"><ShieldAlert className="w-5 h-5 text-brand-red" /> Problem Statement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-zinc-300 leading-relaxed">
              <p><strong className="text-white">Scale & Cost:</strong> Large platforms process hundreds of millions of moderation actions daily. Routing every borderline case to human reviewers breaks operational budgets and introduces multi-second latency.</p>
              <p><strong className="text-white">LLM Hallucinations:</strong> Unconstrained LLMs hallucinate at 17–33% on complex policy reasoning tasks, generating high-profile enforcement errors.</p>
              <p><strong className="text-white">Automation Bias:</strong> When AI accuracy exceeds 93%, human operators become cognitively passive — blindly approving AI recommendations and negating HITL oversight.</p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/50 border-white/10">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2"><Activity className="w-5 h-5 text-brand-cyan" /> Definition of Success (KPIs)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-zinc-300 leading-relaxed">
              <p><strong className="text-brand-cyan">Primary — Escalation Precision Rate:</strong> % of genuinely ambiguous cases correctly routed to humans, directly impacting review efficiency.</p>
              <p><strong className="text-green-400">Secondary — Cost per 1k Actions:</strong> Measurable financial savings from auto-routing obvious high-confidence cases.</p>
              <p><strong className="text-orange-400">Guardrail — Human Override Rate:</strong> How often moderators disagree with AI partial assessments. Zero = severe automation bias; 100% = degraded classifier.</p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/50 border-white/10">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2"><BarChart3 className="w-5 h-5 text-purple-400" /> Latency vs. Quality Trade-off</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-zinc-300 leading-relaxed">
              <p>Deeper multi-hop agentic searches scale quality but increase TTFT (Time to First Token). In livestream moderation, a 3-second delay exposes thousands of viewers to harmful content.</p>
              <p>TrustScore-RAG uses <strong className="text-white">tiered routing</strong>: high-speed similarity checks for basic policy intersections (Auto-Routing) and complex multi-agent reasoning only for identified edge cases.</p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/50 border-white/10">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2"><Users className="w-5 h-5 text-yellow-400" /> Cross-Functional GTM Rollout</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-zinc-300 leading-relaxed">
              <p><strong className="text-white">Phase 1 — Data Science:</strong> Shadow-mode calibration of LPP thresholds on historical resolved tickets.</p>
              <p><strong className="text-white">Phase 2 — T&S Operations:</strong> Deploy XAI dashboard to senior moderator tiger team. Monitor cognitive fatigue and UX friction.</p>
              <p><strong className="text-white">Phase 3 — Policy:</strong> Feed epistemic uncertainty flags back to Policy team to drive guideline clarity updates.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

/* ─── Main Simulator ─── */
export function TriageSimulator() {
  const [claim, setClaim] = useState("");
  const [selectedCase, setSelectedCase] = useState<TestCase | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [agentSteps, setAgentSteps] = useState<AgentStep[]>([]);
  const [result, setResult] = useState<ModerationResult | null>(null);
  const simulatorRef = useRef<HTMLDivElement>(null);

  const handleSelectCase = (tc: TestCase) => {
    setClaim(tc.text);
    setSelectedCase(tc);
    setResult(null);
  };

  const runSimulation = useCallback(async () => {
    if (!claim) return;
    setIsProcessing(true);
    setResult(null);
    setAgentSteps([]);

    const res = await processClaim(claim, (steps) => {
      setAgentSteps(steps);
    });

    setResult(res);
    setIsProcessing(false);
  }, [claim]);

  if (result && result.assessment.predictedAction === "Escalate") {
    return (
      <>
        <div className="pt-16">
          <HumanModeratorDashboard data={result} onReset={() => { setResult(null); setAgentSteps([]); }} />
        </div>
      </>
    );
  }

  return (
    <>
      <HeroSection />
      <HowItWorksSection />

      {/* ─── Interactive Simulator ─── */}
      <section id="simulator" ref={simulatorRef} className="py-16 px-4 scroll-mt-20">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center mb-4">
            <h2 className="text-3xl font-bold mb-3">Interactive Triage Simulator</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Select a pre-built test case below, or type your own claim. The engine will process it through the full multi-agent RAG pipeline and show you the routing outcome.
            </p>
            <p className="text-xs text-zinc-600 mt-2">
              * Note: To ensure zero latency and $0 operational cost for this portfolio demo, this leverages an advanced client-side semantic heuristic engine to mock the behavior of backend agentic orchestration.
            </p>
          </div>

          {/* Test Case Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {TEST_CASES.map((tc) => (
              <button
                key={tc.id}
                onClick={() => handleSelectCase(tc)}
                className={`text-left p-4 rounded-xl border transition-all ${selectedCase?.id === tc.id
                  ? "border-brand-cyan bg-brand-cyan/10 shadow-[0_0_15px_rgba(37,244,238,0.2)]"
                  : "border-white/10 bg-zinc-900/50 hover:border-white/20 hover:bg-zinc-800/50"
                  }`}
              >
                <Badge variant="outline" className="text-[10px] mb-2">{tc.category}</Badge>
                <p className="text-sm font-medium text-white leading-snug">{tc.label}</p>
                <p className="text-[11px] text-zinc-500 mt-1">{tc.expectedOutcome}</p>
              </button>
            ))}
          </div>

          {/* Input Area */}
          <Card className="border-white/10 bg-black/60 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Sparkles className="w-5 h-5 mr-2 text-brand-cyan" />
                Input Pipeline
              </CardTitle>
              <CardDescription>
                The text below will be evaluated against platform Community Guidelines via the agentic RAG pipeline.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <textarea
                value={claim}
                onChange={(e) => { setClaim(e.target.value); setSelectedCase(null); }}
                placeholder="Paste a video transcript, caption, or claim to evaluate..."
                aria-label="Video transcript or claim input"
                className="w-full min-h-[100px] p-4 rounded-xl bg-zinc-900 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 resize-none font-mono text-sm leading-relaxed"
              />
              <Button
                onClick={runSimulation}
                disabled={isProcessing || !claim}
                className="w-full bg-white text-black hover:bg-gray-200 h-12 text-lg font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                {isProcessing ? "Processing via Multi-Agent Pipeline..." : "▶ Run Triage Engine"}
              </Button>
            </CardContent>
          </Card>

          {/* Agent Trace (live during processing) */}
          {agentSteps.length > 0 && (
            <Card className="border-white/10 bg-zinc-900/50 animate-in fade-in duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm uppercase tracking-wider text-zinc-500 flex items-center gap-2">
                  <Activity className="w-4 h-4" /> Agentic Pipeline Trace
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {agentSteps.map((step, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 px-3 rounded-lg bg-black/30">
                    <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${step.status === 'done' ? 'bg-brand-cyan' : step.status === 'running' ? 'bg-yellow-400 animate-pulse' : 'bg-zinc-700'}`} />
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-medium text-white">{step.agent}</span>
                      <span className="text-xs text-zinc-500 ml-2">{step.action}</span>
                    </div>
                    {step.status === 'done' && (
                      <span className="text-xs text-zinc-500 font-mono">{step.durationMs}ms</span>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Result Display (Auto-Takedown / Auto-Approve) */}
          {result && result.assessment.predictedAction !== "Escalate" && (
            <Card className="border-white/10 bg-zinc-900/50 overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
              <div className={`h-1.5 w-full ${result.assessment.predictedAction === 'Auto-Takedown' ? 'bg-brand-red' : 'bg-brand-cyan'}`} />
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  {result.assessment.predictedAction === 'Auto-Takedown' ? (
                    <><AlertCircle className="w-6 h-6 mr-2 text-brand-red" /> Auto-Takedown Initiated</>
                  ) : (
                    <><CheckCircle2 className="w-6 h-6 mr-2 text-brand-cyan" /> Auto-Approve — No Violation Detected</>
                  )}
                </CardTitle>
                <CardDescription>
                  The LPP confidence score exceeded the 90% threshold. This action was executed without human intervention via cost-aware selective classification.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-black/50 p-4 rounded-lg border border-white/5">
                    <div className="text-xs text-zinc-500 mb-1 uppercase tracking-wider">Confidence</div>
                    <div className="text-3xl font-bold">{(result.assessment.confidenceScore * 100).toFixed(1)}%</div>
                  </div>
                  <div className="bg-black/50 p-4 rounded-lg border border-white/5">
                    <div className="text-xs text-zinc-500 mb-1 uppercase tracking-wider">Latency</div>
                    <div className="text-3xl font-bold">{(result.latencyMs / 1000).toFixed(1)}s</div>
                  </div>
                  <div className="bg-black/50 p-4 rounded-lg border border-white/5">
                    <div className="text-xs text-zinc-500 mb-1 uppercase tracking-wider">Cost Saved</div>
                    <div className="text-lg font-bold text-green-400">{result.estimatedCostSaved || "—"}</div>
                  </div>
                  <div className="bg-black/50 p-4 rounded-lg border border-white/5">
                    <div className="text-xs text-zinc-500 mb-1 uppercase tracking-wider">Policy Match</div>
                    <div className="text-sm font-medium text-white">{result.policyViolation || "None"}</div>
                  </div>
                </div>

                <Separator className="bg-white/5" />

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">RAG Evidence Retrieved</h3>
                  {result.retrievedEvidence.map((doc, i) => (
                    <Alert key={i} className="bg-black/40 border-white/10">
                      <Server className="h-4 w-4 text-zinc-400" />
                      <AlertTitle className="text-brand-cyan font-mono text-xs">{doc.source} (Relevance: {doc.relevanceScore.toFixed(2)})</AlertTitle>
                      <AlertDescription className="text-zinc-300 mt-2 text-sm">{doc.content}</AlertDescription>
                    </Alert>
                  ))}
                </div>

                <Button variant="outline" onClick={() => { setResult(null); setAgentSteps([]); }} className="w-full border-white/20">
                  Reset Simulator
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <MetricsBar />
      <PRDSection />

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4 text-center">
        <p className="text-zinc-500 text-sm">
          TrustScore-RAG — Built as a portfolio demonstration of Product Management, Trust & Safety Architecture, and LLM-system design proficiency.
        </p>
        <p className="text-zinc-600 text-xs mt-2">
          Data is simulated for demonstration purposes.
        </p>
      </footer>
    </>
  );
}
