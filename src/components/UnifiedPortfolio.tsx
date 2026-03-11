"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { processClaim, ModerationResult, AgentStep, TEST_CASES, TestCase } from "@/lib/simulator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle, CheckCircle2, ShieldAlert, Sparkles, Server, Zap, Brain,
  Users, BarChart3, Gauge, Clock, DollarSign, ArrowDown, ChevronRight,
  Layers, FileText, Target, TrendingUp, Activity, Rocket, Eye, GitBranch, RefreshCw
} from "lucide-react";
import { HumanModeratorDashboard } from "./HumanModeratorDashboard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

function HeroSection() {
  return (
    <section className="relative pt-20 pb-16 px-4 text-center overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-6">
        <Badge variant="outline" className="border-tiktok-cyan/40 text-tiktok-cyan px-4 py-1.5 text-sm uppercase tracking-widest font-semibold">
          Trust & Safety Product Management Portfolio
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1]">
          <span className="text-white">TrustScore</span>
          <span className="text-tiktok-cyan">-RAG</span>
        </h1>
        <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
          An <strong className="text-white">Agentic Escalation Engine</strong> that intelligently routes content moderation decisions between AI auto-enforcement and human review — inducing <strong className="text-tiktok-red">Appropriate Reliance</strong> via cost-aware selective classification and enforcing <strong className="text-tiktok-cyan">Counterfactual Fairness</strong>.
        </p>
        <div className="pt-8 flex flex-col md:flex-row items-center justify-center gap-4">
          <a href="#prototype" className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-3 rounded-full font-bold text-base hover:bg-gray-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] w-full md:w-auto">
            Try the Live Prototype <ArrowDown className="w-4 h-4" />
          </a>
          <Link href="/creator-aegis" className="inline-flex items-center justify-center gap-2 bg-zinc-900 border border-white/10 text-white px-8 py-3 rounded-full font-bold text-base hover:bg-zinc-800 transition-all w-full md:w-auto">
            View Creator Aegis Feature <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">The Moderation Trilemma</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-sm">
            Evaluating content safety at billion-scale means balancing Cost, Latency, and Nuance. Legacy ML classifiers fail at context, forcing humans to step in.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-zinc-900/50 border-white/10 hover:border-tiktok-cyan/30 transition-colors">
            <CardContent className="pt-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-tiktok-red mb-4">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Scale & Cost</h3>
              <p className="text-sm text-zinc-400">
                Routing every borderline case to human reviewers breaks operational expenditure limits and introduces multi-second latency, allowing harmful content to achieve viral escape velocity.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-zinc-900/50 border-white/10 hover:border-tiktok-cyan/30 transition-colors">
            <CardContent className="pt-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Counterfactual Fairness</h3>
              <p className="text-sm text-zinc-400">
                Legacy classifiers struggle with counterfactual fairness (treating identical claims differently based on perturbed demographic markers). Bias Benchmarks (BBQ) prove we need smarter semantic anchoring.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-zinc-900/50 border-white/10 hover:border-tiktok-cyan/30 transition-colors">
            <CardContent className="pt-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400 mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Appropriate Reliance</h3>
              <p className="text-sm text-zinc-400">
                When human operators are paired with highly accurate AI tools, they become cognitively passive (Automation Bias). A simple "95% Toxicity" score causes blind approvals, negating HITL redundancy.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function VisionSection() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <Card className="bg-gradient-to-br from-tiktok-cyan/10 via-black to-blue-900/20 border-tiktok-cyan/30">
          <CardContent className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 space-y-4">
                <Badge variant="outline" className="border-tiktok-cyan text-tiktok-cyan bg-tiktok-cyan/10">Product Insight</Badge>
                <h2 className="text-3xl font-bold text-white">The Predictive Policy Loop</h2>
                <p className="text-zinc-300 leading-relaxed text-sm md:text-base">
                  Current Trust & Safety ops are fundamentally <strong>reactive</strong>. Bad actors invent new evasion slang ("unalive", "corn", using 🔌 for drugs). It goes viral. The PM notices. The policy is updated. The damage is done.
                </p>
                <p className="text-zinc-300 leading-relaxed text-sm md:text-base">
                  My vision for TikTok is shifting from reactive filtering to <strong>predictive policy generation</strong>. We can use isolated LLM "Red Teams" to aggressively mutate standard violations into Gen-Z slang, typos, and emoji-speak, constantly testing our classifiers during downtime. This effectively executes continuous <strong>Indirect Prompt Injection (BIPIA)</strong> testing to catch emerging threats before they hit production.
                </p>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <div className="relative w-48 h-48 rounded-full border border-dashed border-tiktok-cyan animate-[spin_20s_linear_infinite] flex items-center justify-center">
                  <div className="absolute top-0 w-4 h-4 bg-tiktok-cyan rounded-full shadow-[0_0_10px_#25f4ee]" />
                  <div className="absolute bottom-0 w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]" />
                  <RefreshCw className="w-12 h-12 text-tiktok-cyan absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_5s_linear_infinite_reverse]" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    { icon: <Layers className="w-6 h-6" />, title: "1. Content Ingested", desc: "A flagged video transcript or claim enters the pipeline." },
    { icon: <Brain className="w-6 h-6" />, title: "2. RAG Retrieval", desc: "Queries verified databases (DSA, CDC) to anchor the LLM." },
    { icon: <Gauge className="w-6 h-6" />, title: "3. Uncertainty Scored", desc: "Calculates Epistemic (policy) vs Aleatoric (evidence) uncertainty." },
    { icon: <Zap className="w-6 h-6" />, title: "4. Cost-Aware Routing", desc: "High confidence auto-act. Edge cases escalate to humans to mandate Appropriate Reliance." },
  ];

  return (
    <section className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-left mb-8 border-b border-white/10 pb-4">
          <h2 className="text-2xl font-bold">The Proposed Architecture</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={i} className="relative bg-zinc-900/50 border border-white/10 rounded-xl p-6 text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-zinc-800 text-white mb-2">
                {s.icon}
              </div>
              <h3 className="font-semibold text-white">{s.title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{s.desc}</p>
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

function LivePrototypeSection({ runSimulation, claim, setClaim, selectedCase, handleSelectCase, isProcessing, agentSteps, result, setResult, setAgentSteps }: any) {
  return (
    <section id="prototype" className="py-16 px-4 scroll-mt-20">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="mb-4">
          <Badge variant="outline" className="mb-2 border-green-500/30 text-green-400 bg-green-500/10">Live API Prototype</Badge>
          <h2 className="text-3xl font-bold mb-3">Triage Simulator</h2>
          <p className="text-zinc-400 max-w-2xl text-sm">
            Select a heavily nuanced test case. The system queries Gemini 2.5 Flash in real-time, executing the selective classification logic to decide if it's safe to auto-moderate or if it requires a human.
          </p>
        </div>

        {/* Test Case Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {TEST_CASES.map((tc: any) => (
            <button
              key={tc.id}
              onClick={() => handleSelectCase(tc)}
              className={`text-left p-4 rounded-xl border transition-all ${selectedCase?.id === tc.id
                ? "border-tiktok-cyan bg-tiktok-cyan/10 shadow-[0_0_15px_rgba(37,244,238,0.2)]"
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
        <Card className="border-white/10 bg-zinc-900/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Sparkles className="w-5 h-5 mr-2 text-tiktok-cyan" />
              Content Payload
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <textarea
              value={claim}
              onChange={(e) => { setClaim(e.target.value); handleSelectCase(null); }}
              placeholder="Paste a video transcript, caption, or claim to evaluate..."
              className="w-full min-h-[80px] p-4 rounded-xl bg-black border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-tiktok-cyan/50 resize-none font-mono text-sm leading-relaxed"
            />
            <Button
              onClick={runSimulation}
              disabled={isProcessing || !claim}
              className="w-full bg-white text-black hover:bg-gray-200 h-12 text-sm font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              {isProcessing ? "Processing via Multi-Agent Pipeline..." : "▶ Run Triage Engine"}
            </Button>
          </CardContent>
        </Card>

        {/* Agent Trace (live during processing) */}
        {agentSteps.length > 0 && (
          <Card className="border-white/10 bg-[#0a0a0a] animate-in fade-in duration-300">
            <CardHeader className="pb-3 border-b border-white/5">
              <CardTitle className="text-xs uppercase tracking-wider text-zinc-500 flex items-center gap-2">
                <Activity className="w-3 h-3" /> Agentic Pipeline Trace
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pt-4 p-4">
              {agentSteps.map((step: any, i: number) => (
                <div key={i} className="flex items-center gap-3 py-1 px-2 rounded-lg">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${step.status === 'done' ? 'bg-tiktok-cyan' : step.status === 'running' ? 'bg-yellow-400 animate-pulse' : 'bg-zinc-700'}`} />
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-medium text-white">{step.agent}</span>
                    <span className="text-[11px] text-zinc-500 ml-2">{step.action}</span>
                  </div>
                  {step.status === 'done' && (
                    <span className="text-[10px] text-zinc-500 font-mono">{step.durationMs}ms</span>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Result Display (Auto-Takedown / Auto-Approve) */}
        {result && result.assessment.predictedAction !== "Escalate" && (
          <Card className="border-white/10 bg-zinc-900/50 overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
            <div className={`h-1.5 w-full ${result.assessment.predictedAction === 'Auto-Takedown' ? 'bg-tiktok-red' : 'bg-tiktok-cyan'}`} />
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                {result.assessment.predictedAction === 'Auto-Takedown' ? (
                  <><AlertCircle className="w-6 h-6 mr-2 text-tiktok-red" /> Auto-Takedown Initiated</>
                ) : (
                  <><CheckCircle2 className="w-6 h-6 mr-2 text-tiktok-cyan" /> Auto-Approve — No Violation Detected</>
                )}
              </CardTitle>
              <CardDescription>
                The LPP confidence score exceeded the 90% threshold. Evaluated with zero human latency.
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
                  <div className="text-xs text-zinc-500 mb-1 uppercase tracking-wider">Policy Logic</div>
                  <div className="text-sm font-medium text-white">{result.policyViolation || "Benign"}</div>
                </div>
              </div>

              <Separator className="bg-white/5" />

              <div className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">RAG Evidence Retrieved</h3>
                {result.retrievedEvidence.map((doc: any, i: number) => (
                  <Alert key={i} className="bg-black/40 border-white/10">
                    <Server className="h-4 w-4 text-zinc-400" />
                    <AlertTitle className="text-tiktok-cyan font-mono text-xs">{doc.source} (Relevance: {doc.relevanceScore.toFixed(2)})</AlertTitle>
                    <AlertDescription className="text-zinc-300 mt-2 text-sm">{doc.content}</AlertDescription>
                  </Alert>
                ))}
              </div>

              <Button variant="outline" onClick={() => { setResult(null); setAgentSteps([]); }} className="w-full border-white/20">
                Run Another Evaluation
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Explainable AI Dashboard for Escalations */}
        {result && result.assessment.predictedAction === "Escalate" && (
          <div className="border border-orange-500/30 rounded-xl overflow-hidden shadow-[0_0_40px_rgba(249,115,22,0.1)]">
            <HumanModeratorDashboard data={result} onReset={() => { setResult(null); setAgentSteps([]); }} />
          </div>
        )}
      </div>
    </section>
  );
}

function PMDashboardsSection() {
  const metrics = [
    { icon: <Target className="w-5 h-5 text-tiktok-cyan" />, label: "Pre-Flight Precision", value: "87%", desc: "Ensures we aren't banning innocent creators" },
    { icon: <Eye className="w-5 h-5 text-blue-400" />, label: "Pre-Flight Recall", value: "94%", desc: "Ensures dangerous violations don't leak" },
    { icon: <DollarSign className="w-5 h-5 text-green-400" />, label: "OpEx Impact at Scale", value: "-$42k/day", desc: "Savings driven by false-positive reduction" },
    { icon: <TrendingUp className="w-5 h-5 text-orange-400" />, label: "Human Override Rate", value: "12%", desc: "Ideal balance of AI trust and manual oversight" },
  ];

  return (
    <section className="py-16 px-4 bg-zinc-900/30">
      <div className="max-w-5xl mx-auto space-y-12">

        {/* KPI Row */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Definition of Success (KPIs)</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((m, i) => (
              <div key={i} className="bg-black border border-white/5 rounded-xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">
                  {m.icon} {m.label}
                </div>
                <div className="text-3xl font-bold text-white">{m.value}</div>
                <div className="text-xs text-zinc-500 leading-snug">{m.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tradeoffs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2"><GitBranch className="w-5 h-5" /> Latency vs Quality Tradeoff</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Deeper multi-hop agentic searches intrinsically scale quality but ruin TTFT (Time to First Token). In real-time enforcement formats like Livestreams, a 3-second delay exposes thousands of concurrent viewers to harmful content.
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed">
              <strong>The Tradeoff Decision:</strong> We cap RAG retrieval at 2 hops and enforce a strict 800ms timeout. If the LLM cannot establish confidence in that window, it defaults to a shadow-mute, preserving user safety without permanent account strikes.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2"><Rocket className="w-5 h-5" /> GTM & Phased Rollout</h3>
            <div className="space-y-3">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold shrink-0">1</div>
                <div>
                  <div className="text-sm font-bold text-white">Data Science Shadow Mode</div>
                  <div className="text-xs text-zinc-500">Run the LPP alongside human labels for 14 days without active enforcement to establish benchmark precision/recall.</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold shrink-0">2</div>
                <div>
                  <div className="text-sm font-bold text-white">Tiger Team Operations</div>
                  <div className="text-xs text-zinc-500">Deploy XAI Dashboard to senior moderators. Track time-to-resolve and survey for cognitive fatigue.</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full border border-tiktok-cyan/50 text-tiktok-cyan flex items-center justify-center text-xs font-bold shrink-0">3</div>
                <div>
                  <div className="text-sm font-bold text-tiktok-cyan">The Predictive Loop</div>
                  <div className="text-xs text-zinc-500">Activate synthetic BIPIA adversarial testing. Establish EU DSA compliant feedback loops to pipe Epistemic Uncertainty flags to Policy Teams.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export function UnifiedPortfolio() {
  // Simulator State
  const [claim, setClaim] = useState("");
  const [selectedCase, setSelectedCase] = useState<TestCase | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [agentSteps, setAgentSteps] = useState<AgentStep[]>([]);
  const [result, setResult] = useState<ModerationResult | null>(null);

  const handleSelectCase = (tc: TestCase | null) => {
    if (tc) {
      setClaim(tc.text);
      setSelectedCase(tc);
    } else {
      setSelectedCase(null);
    }
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

  return (
    <div className="w-full flex flex-col">
      <HeroSection />
      <ProblemSection />
      <VisionSection />
      <HowItWorksSection />

      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-8" />

      <LivePrototypeSection
        runSimulation={runSimulation}
        claim={claim}
        setClaim={setClaim}
        selectedCase={selectedCase}
        handleSelectCase={handleSelectCase}
        isProcessing={isProcessing}
        agentSteps={agentSteps}
        result={result}
        setResult={setResult}
        setAgentSteps={setAgentSteps}
      />

      <PMDashboardsSection />

      {/* Footer */}
      <footer id="roadmap" className="border-t border-white/10 py-12 px-4 text-center mt-12 bg-black">
        <h2 className="text-lg font-bold mb-2">Designed & Built for TikTok APM</h2>
        <p className="text-zinc-500 text-sm max-w-xl mx-auto mb-6">
          This artifact demonstrates full-stack product management: isolating a billion-scale business problem, designing system architecture, addressing latency tradeoffs, and writing production integration code.
        </p>
        <div className="flex justify-center gap-4 text-xs font-semibold uppercase tracking-widest text-zinc-400">
          <a href="https://github.com/AliHasan-786/TrustScore" target="_blank" rel="noopener noreferrer" className="hover:text-tiktok-cyan transition-colors">GitHub Repository</a>
        </div>
      </footer>
    </div>
  );
}
