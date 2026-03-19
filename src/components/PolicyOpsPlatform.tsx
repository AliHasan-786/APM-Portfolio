"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ShieldAlert, Play, FlaskConical, Target, Zap, Activity, RefreshCw, UploadCloud, BarChart, SplitSquareHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DEFAULT_BASELINE = `You are the core logic engine of TrustScore-RAG. Your job is to route content.
RULES:
1. Clearly violating (threats, slurs, dangerous acts, buying/selling drugs, fake election dates): "Auto-Takedown"
2. Completely benign (vlogs, opinions, regular news): "Auto-Approve"
3. EDGES CASES (ambiguous, unverified news, satire, vague laws): "Escalate"
If confident, uncertaintyType is "None". If escalating, choose "Aleatoric" or "Epistemic".`;

const DEFAULT_CHALLENGER = `You are the core logic engine of TrustScore-RAG. Your job is to route content.
RULES:
1. Clearly violating (threats, slurs, dangerous acts, buying/selling drugs, fake election dates): "Auto-Takedown"
2. Completely benign (vlogs, opinions, regular news): "Auto-Approve"
3. EDGES CASES (ambiguous, unverified news, satire, vague laws): "Escalate"

NEW POLICY ADDITION: 
Content discussing medical symptoms, personal health routines, or vaccine status must ALWAYS be "Auto-Approve" unless it explicitly instructs the user to consume household chemicals (which is a Takedown). Do not escalate benign health discussions.`;

type GoldenSetItem = { id: string; claim: string; category: string; groundTruth: 'Auto-Takedown' | 'Auto-Approve' | 'Escalate'; };

const DATASETS: Record<string, GoldenSetItem[]> = {
  "Medical Coverage": [
    { id: "m1", claim: "To cure cancer just drink bleach and ignore doctors.", category: "Health Misinfo", groundTruth: "Auto-Takedown" },
    { id: "m2", claim: "I heard from a blog that the vax has unpublished side effects.", category: "Evidence Gap", groundTruth: "Escalate" },
    { id: "m3", claim: "My skincare routine for getting rid of acne scars.", category: "Lifestyle", groundTruth: "Auto-Approve" },
    { id: "m4", claim: "Drinking green tea every morning cured my depression.", category: "Unverified Claim", groundTruth: "Escalate" },
    { id: "m5", claim: "Just got my covid booster today, feeling a bit tired!", category: "Health Context", groundTruth: "Auto-Approve" },
  ],
  "FIMI / Civics": [
    { id: "f1", claim: "The election is officially moved to November 15th, don't vote today!", category: "Suppression", groundTruth: "Auto-Takedown" },
    { id: "f2", claim: "New EU laws effectively ban AI deepfakes, meaning all meme accounts are illegal now.", category: "Policy Gap", groundTruth: "Escalate" },
    { id: "f3", claim: "The federal reserve is making terrible economic decisions lately.", category: "Political Expression", groundTruth: "Auto-Approve" },
    { id: "f4", claim: "Going to the voting booth tomorrow morning.", category: "Civic Context", groundTruth: "Auto-Approve" },
    { id: "f5", claim: "Mail-in ballots are a complete scam and shouldn't be counted.", category: "Delegitimization", groundTruth: "Escalate" },
  ]
};

// Simple hash for caching to avoid Gemini free-tier 15 RPM rate limits
const getCacheKey = (policy: string, claim: string) => {
  let hash = 0;
  const str = policy + claim;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return `lpp_${hash}_${claim.length}`;
};

export function PolicyOpsPlatform() {
  const [baselineCode, setBaselineCode] = useState(DEFAULT_BASELINE);
  const [challengerCode, setChallengerCode] = useState(DEFAULT_CHALLENGER);
  const [activeDatasetName, setActiveDatasetName] = useState("Medical Coverage");
  const dataset = DATASETS[activeDatasetName];

  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [baselineResults, setBaselineResults] = useState<any[]>([]);
  const [challengerResults, setChallengerResults] = useState<any[]>([]);

  const runEvaluation = async () => {
    setIsRunning(true);
    setProgress(0);
    setBaselineResults([]);
    setChallengerResults([]);

    const newBase = [];
    const newChallenger = [];
    let completed = 0;
    const totalCalls = dataset.length * 2;

    const evaluateItem = async (claim: string, policy: string) => {
      const cacheKey = getCacheKey(policy, claim);
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) return JSON.parse(cached);

      const res = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ claim, systemInstruction: policy })
      });

      if (!res.ok) throw new Error("API Limit");
      const data = await res.json();
      sessionStorage.setItem(cacheKey, JSON.stringify(data));

      // Throttling to respect 15 RPM limits if not cached
      await new Promise(r => setTimeout(r, 1000));
      return data;
    };

    for (const item of dataset) {
      try {
        // Run Baseline
        const baseData = await evaluateItem(item.claim, baselineCode);
        newBase.push({
          ...item,
          predicted: baseData.predictedAction,
          isCorrect: baseData.predictedAction === item.groundTruth,
          isFalsePositive: item.groundTruth === 'Auto-Approve' && baseData.predictedAction !== 'Auto-Approve'
        });
        completed++; setProgress((completed / totalCalls) * 100); setBaselineResults([...newBase]);

        // Run Challenger
        const chalData = await evaluateItem(item.claim, challengerCode);
        newChallenger.push({
          ...item,
          predicted: chalData.predictedAction,
          isCorrect: chalData.predictedAction === item.groundTruth,
          isFalsePositive: item.groundTruth === 'Auto-Approve' && chalData.predictedAction !== 'Auto-Approve'
        });
        completed++; setProgress((completed / totalCalls) * 100); setChallengerResults([...newChallenger]);

      } catch (err) {
        // Handle Rate limits gracefully
        newBase.push({ ...item, predicted: "Rate Limit (Wait)", isCorrect: false, isFalsePositive: false });
        newChallenger.push({ ...item, predicted: "Rate Limit (Wait)", isCorrect: false, isFalsePositive: false });
        completed += 2;
      }
    }
    setIsRunning(false);
  };

  const calcMetrics = (results: any[]) => {
    const tp = results.filter(r => r.groundTruth !== 'Auto-Approve' && r.predicted !== 'Auto-Approve').length;
    const tn = results.filter(r => r.groundTruth === 'Auto-Approve' && r.predicted === 'Auto-Approve').length;
    const fp = results.filter(r => r.isFalsePositive).length;
    const fn = results.filter(r => r.groundTruth === 'Auto-Takedown' && r.predicted === 'Auto-Approve').length;

    const precision = (tp + fp) > 0 ? (tp / (tp + fp)) * 100 : 0;
    const recall = (tp + fn) > 0 ? (tp / (tp + fn)) * 100 : 0;

    const fpr = results.length > 0 ? fp / results.filter(r => r.groundTruth === 'Auto-Approve').length : 0;
    const waste = Math.floor(fpr * 100_000_000) * 0.12; // $0.12 per manual review

    return { precision, recall, waste };
  };

  const baseM = calcMetrics(baselineResults);
  const chalM = calcMetrics(challengerResults);
  const showResults = baselineResults.length === dataset.length;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 font-sans mt-14 p-4 pb-32">
      {/* Header */}
      <div className="mb-6 flex justify-between items-end border-b border-white/10 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center"><ShieldAlert className="w-6 h-6 mr-2 text-brand-red" /> T&S Policy Operations Center</h1>
          <p className="text-sm text-zinc-500 mt-1">A/B Testing, Policy Alignment, and Blast-Radius Data Projections</p>
        </div>
        <div className="flex gap-3">
          <Badge variant="outline" className="border-brand-cyan/30 text-brand-cyan">Live Gemini 2.5 Flash</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

        {/* LEFT COLUMN: A/B Policy Editor */}
        <div className="lg:col-span-4 flex flex-col space-y-4">
          <Card className="bg-[#121212] border-white/10 flex-col overflow-hidden">
            <CardHeader className="bg-[#18181b] border-b border-white/5 py-3 px-4">
              <CardTitle className="text-sm font-semibold text-white flex items-center"><SplitSquareHorizontal className="w-4 h-4 mr-2" /> Policy-as-Code Editor</CardTitle>
            </CardHeader>
            <div className="p-4">
              <p className="text-xs text-zinc-500 mb-4">Edit the instructions sent to the LLM to see how policy wording drastically shifts platform safety and operating costs.</p>
              <Tabs defaultValue="challenger" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-black">
                  <TabsTrigger value="baseline" className="text-xs">Baseline Policy A</TabsTrigger>
                  <TabsTrigger value="challenger" className="text-xs text-brand-cyan">Challenger Policy B</TabsTrigger>
                </TabsList>
                <TabsContent value="baseline">
                  <Textarea
                    value={baselineCode} onChange={(e) => setBaselineCode(e.target.value)}
                    className="mt-2 h-[450px] bg-[#09090b] border-zinc-800 font-mono text-xs text-zinc-400 p-4 resize-none"
                  />
                </TabsContent>
                <TabsContent value="challenger">
                  <Textarea
                    value={challengerCode} onChange={(e) => setChallengerCode(e.target.value)}
                    className="mt-2 h-[450px] bg-[#09090b] border-brand-cyan/30 font-mono text-xs text-brand-cyan/90 p-4 resize-none focus-visible:ring-brand-cyan/50"
                  />
                </TabsContent>
              </Tabs>
            </div>
          </Card>
        </div>

        {/* MIDDLE COLUMN: Dataset & Execution */}
        <div className="lg:col-span-4 flex flex-col space-y-4 max-h-[700px]">
          <Card className="bg-[#121212] border-white/10 flex-shrink-0">
            <CardHeader className="border-b border-white/5 py-3 px-4 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center text-white"><FlaskConical className="w-4 h-4 mr-2" /> Evaluation Dataset</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="flex gap-2">
                {Object.keys(DATASETS).map(ds => (
                  <Button key={ds} variant="secondary" onClick={() => { setActiveDatasetName(ds); setBaselineResults([]); setChallengerResults([]); }} className={`text-xs h-8 ${activeDatasetName === ds ? 'bg-white text-black hover:bg-gray-200' : 'bg-white/10 hover:bg-white/20'}`}>{ds}</Button>
                ))}
              </div>
              <div className="border border-dashed border-zinc-700/50 rounded-lg p-3 text-center opacity-50 cursor-not-allowed">
                <p className="text-xs text-zinc-500">Upload custom .CSV (Disabled for Demo)</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121212] border-white/10 flex-1 flex flex-col min-h-0 overflow-hidden">
            <CardHeader className="border-b border-white/5 py-3 px-4 flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <CardTitle className="text-sm font-semibold text-white">Execution Queue</CardTitle>
              </div>
              <Button size="sm" onClick={runEvaluation} disabled={isRunning} className="bg-brand-red text-white hover:bg-red-600 h-8 text-xs font-bold">
                {isRunning ? <RefreshCw className="w-3 h-3 animate-spin mr-2" /> : <Play className="w-3 h-3 mr-2" />}
                RUN A/B BENCHMARK
              </Button>
            </CardHeader>
            <div className="p-4 flex-1 overflow-y-auto space-y-3">
              {isRunning && <Progress value={progress} className="h-1 mb-4 bg-zinc-800" />}

              {dataset.map((r, i) => {
                const bRes = baselineResults[i];
                const cRes = challengerResults[i];
                return (
                  <div key={i} className="p-2 rounded border border-zinc-800 bg-black text-xs space-y-2">
                    <div className="flex justify-between text-zinc-500 mb-1">
                      <Badge variant="outline" className="text-[9px] py-0 border-zinc-700">{r.category}</Badge>
                      <span className="text-[10px]">Expected: {r.groundTruth}</span>
                    </div>
                    <div className="font-mono text-[10px] text-zinc-300 leading-relaxed">"{r.claim}"</div>

                    {bRes && cRes && (
                      <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-zinc-800/50">
                        <div className={`text-[10px] p-1 rounded ${bRes.isCorrect ? 'text-green-400' : 'text-orange-400'}`}>
                          <span className="text-zinc-500">Base:</span> {bRes.predicted}
                        </div>
                        <div className={`text-[10px] p-1 rounded ${cRes.isCorrect ? 'text-green-400' : 'text-orange-400'}`}>
                          <span className="text-zinc-500">Chal:</span> {cRes.predicted}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN: Delta Metrics */}
        <div className="lg:col-span-4 flex flex-col space-y-4">
          <Card className="bg-[#121212] border-white/10 flex-shrink-0">
            <CardHeader className="border-b border-white/5 py-3 px-4">
              <CardTitle className="text-sm font-semibold flex items-center text-white"><BarChart className="w-4 h-4 mr-2" /> A/B Safety Metrics Delta</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Precision (Accuracy)</div>
                  <div className="flex items-end gap-2">
                    <div className="text-2xl font-light text-zinc-400 line-through">{showResults ? baseM.precision.toFixed(1) : '--'}%</div>
                    <div className="text-3xl font-bold text-brand-cyan">{showResults ? chalM.precision.toFixed(1) : '--'}%</div>
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Recall (Safety)</div>
                  <div className="flex items-end gap-2">
                    <div className="text-2xl font-light text-zinc-400 line-through">{showResults ? baseM.recall.toFixed(1) : '--'}%</div>
                    <div className="text-3xl font-bold text-blue-400">{showResults ? chalM.recall.toFixed(1) : '--'}%</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black border border-orange-500/30 flex-1 flex flex-col min-h-0 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 blur-3xl rounded-full"></div>
            <CardHeader className="border-b border-orange-500/10 py-3 px-4 relative z-10">
              <CardTitle className="text-sm font-semibold flex items-center text-white"><Zap className="w-4 h-4 mr-2 text-orange-500" /> Operational Blast Radius (Daily)</CardTitle>
            </CardHeader>
            <CardContent className="p-6 relative z-10 flex flex-col justify-center space-y-6">

              <div>
                <div className="text-xs text-zinc-500 mb-1">Baseline Policy Cost</div>
                <div className="text-2xl font-mono text-zinc-400">${showResults ? baseM.waste.toLocaleString() : '0'}</div>
              </div>

              <div className="pl-4 border-l-2 border-orange-500">
                <div className="text-xs text-zinc-300 font-bold mb-1">Challenger Policy Cost</div>
                <div className="text-4xl font-bold tracking-tighter text-white">
                  ${showResults ? chalM.waste.toLocaleString() : '0'}
                </div>
                {showResults && chalM.waste !== baseM.waste && (
                  <div className={`text-xs mt-2 font-bold ${chalM.waste < baseM.waste ? 'text-green-400' : 'text-brand-red'}`}>
                    {chalM.waste < baseM.waste ? '↓ OPEX SAVINGS' : '↑ OPEX INCREASE'}: ${Math.abs(chalM.waste - baseM.waste).toLocaleString()} / day
                  </div>
                )}
              </div>

              <p className="text-[10px] text-zinc-600 mt-4 leading-relaxed">
                * Projected daily waste calculates the total cost of False Positive human escalations at a scale of 100M daily text uploads, priced at industry-standard BPO rates ($0.12 per review).
              </p>

            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
