"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShieldCheck, Bot, XCircle, CheckCircle2, Lock, Send, Loader2 } from "lucide-react";

export function CreatorAegis() {
  const [rules, setRules] = useState("1. Block anyone criticizing my weight or body shape.\n2. Hide comments that mention my ex-boyfriend Alex.\n3. Remove spam asking me to check out their soundcloud.");
  const [testComment, setTestComment] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<any[]>([
    {
      user: "user12399",
      comment: "Honestly you look like u ate an entire bakery today.",
      action: "Block",
      matchedRule: "Rule 1",
      reasoning: "Evades the word 'fat' but clearly insults body shape via semantic cruelty."
    },
    {
      user: "hype_beast",
      comment: "bro slide to my profile and listen to my latest beat 🙏🔥",
      action: "Block",
      matchedRule: "Rule 3",
      reasoning: "Self-promotional spam attempting to divert traffic."
    }
  ]);

  const handleTest = async () => {
    if (!testComment.trim()) return;

    setIsProcessing(true);
    try {
      const res = await fetch('/api/aegis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rules, comment: testComment })
      });

      const data = await res.json();

      setResults([{
        user: "test_user_" + Math.floor(Math.random() * 1000),
        comment: testComment,
        action: data.action,
        matchedRule: data.matchedRule,
        reasoning: data.reasoning
      }, ...results]);

      setTestComment("");
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full flex flex-col pb-16">
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 px-4 text-center overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-6">
          <Badge variant="outline" className="border-purple-500/40 text-purple-400 bg-purple-500/10 px-4 py-1.5 text-sm uppercase tracking-widest font-semibold">
            Consumer-Facing Feature Concept
          </Badge>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
            <span className="text-white">Creator</span>
            <span className="text-purple-500">Aegis</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            Empowering TikTok creators with <strong className="text-white">Natural Language Comment Filtering</strong>. Move beyond maintaining lists of thousands of keywords to semantic, agentic self-moderation.
          </p>
          <div className="pt-4">
            <a href="/" className="inline-flex items-center justify-center gap-2 bg-zinc-900 border border-white/10 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-zinc-800 transition-all">
              ← Back to TrustScore Infrastructure
            </a>
          </div>
        </div>
      </section>

      {/* PRD Intro */}
      <section className="py-12 px-4 max-w-5xl mx-auto space-y-8 w-full">
        <div>
          <h2 className="text-2xl font-bold mb-4">The Problem: Keyword Filtering is Broken</h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Currently, creators facing targeted harassment must manually input hundreds of terms into the "Filter Keywords" tool. Bad actors evade this instantly using leetspeak (e.g., f@t, wh4le), emoji substitution, or semantic cruelty ("you look like you ate a house") that bypasses simple exact-match filters. The burden of safety is entirely on the victim.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-zinc-900/50 border-white/10">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-tiktok-cyan" /> User Value
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-zinc-400">
              Creators use plain English to describe their boundaries ("Block comments critiquing my parenting style"). An edge-deployed SLM evaluates incoming comments against these bespoke rulesets in milliseconds.
            </CardContent>
          </Card>
          <Card className="bg-zinc-900/50 border-white/10">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-purple-400" /> Platform Value
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-zinc-400">
              Reduces churn among top creators due to burnout. Shifts millions of minor, non-policy-violating interpersonal disputes (e.g., "your music sucks") off the centralized T&S queue and onto automated edge-blocks.
            </CardContent>
          </Card>
        </div>

        <div className="w-full h-px bg-white/10 my-12" />

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Interactive Mockup</h2>
          <p className="text-zinc-400">Edit the rules below and type a comment to see the zero-shot semantic filtering in action (Powered by Gemini API).</p>
        </div>

        {/* Mockup Container */}
        <div className="bg-black border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.05)] mx-auto max-w-4xl flex flex-col md:flex-row">

          {/* Left Sidebar (TikTok Settings style) */}
          <div className="w-full md:w-64 border-r border-white/10 bg-zinc-950 p-6 hidden md:block">
            <h3 className="font-bold text-lg mb-6">Settings</h3>
            <nav className="space-y-4 text-sm text-zinc-400">
              <div className="hover:text-white cursor-pointer">Account</div>
              <div className="hover:text-white cursor-pointer">Privacy</div>
              <div className="text-white font-bold flex items-center gap-2">
                <Lock className="w-4 h-4" /> Safety Center
              </div>
            </nav>
          </div>

          {/* Right Main Panel */}
          <div className="flex-1 p-6 bg-[#0a0a0a] min-h-[600px] flex flex-col">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-1">Comment Filtering</h2>
              <p className="text-xs text-zinc-500">Manage who can comment on your videos.</p>
            </div>

            <Card className="bg-zinc-900/40 border-purple-500/30 ring-1 ring-purple-500/10 mb-6 shrink-0">
              <CardHeader className="pb-4 border-b border-white/5">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Bot className="w-4 h-4 text-purple-400" />
                      Creator Aegis (AI Filter)
                    </CardTitle>
                    <CardDescription className="mt-1 text-xs">
                      Describe what you want to block in plain English. Our AI will catch evasions automatically.
                    </CardDescription>
                  </div>
                  <div className="w-10 h-5 bg-purple-500 rounded-full relative shadow-[0_0_10px_rgba(168,85,247,0.4)]">
                    <div className="absolute right-1 top-0.5 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex justify-between">
                    Your Natural Language Rules
                    <span className="text-[10px] text-purple-400/70 font-normal normal-case">Editable for testing</span>
                  </label>
                  <textarea
                    className="w-full bg-black border border-white/20 hover:border-purple-500/50 focus:border-purple-500 transition-colors rounded-lg p-3 text-sm text-white resize-none h-24 focus:outline-none"
                    value={rules}
                    onChange={(e) => setRules(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Interactive Comment Input */}
            <div className="flex gap-2 mb-6 shrink-0">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Type a test comment here..."
                  value={testComment}
                  onChange={(e) => setTestComment(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleTest()}
                  className="w-full bg-black border border-white/10 rounded-full pl-4 pr-10 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-purple-500"
                />
              </div>
              <Button
                onClick={handleTest}
                disabled={isProcessing || !testComment.trim()}
                className="rounded-full bg-purple-600 hover:bg-purple-700 w-10 h-10 p-0 flex items-center justify-center shrink-0"
              >
                {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
            </div>

            {/* Example of it in action */}
            <div className="space-y-3 overflow-y-auto flex-1 pr-2 custom-scrollbar">
              <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider sticky top-0 bg-[#0a0a0a] py-2 z-10">
                Intercepted Feed (Only visible to you)
              </h3>

              {results.map((res, i) => (
                <div key={i} className={`rounded-xl border p-4 flex gap-4 items-start ${res.action === 'Block' ? 'bg-black border-red-900/30' : 'bg-black border-green-900/30'}`}>
                  <div className="w-8 h-8 rounded-full bg-zinc-800 shrink-0 flex items-center justify-center text-xs">
                    {res.user.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-white mb-0.5">{res.user}</p>
                    <p className="text-sm text-zinc-300">{res.comment}</p>
                    <div className="mt-3 flex flex-col gap-2">
                      <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-mono w-fit ${res.action === 'Block' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'}`}>
                        {res.action === 'Block' ? <XCircle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                        {res.action === 'Block' ? `Caught by ${res.matchedRule || 'Rules'}` : 'Allowed'}
                      </div>
                      <p className="text-xs text-zinc-500 italic pl-1 border-l-2 border-zinc-800 ml-1">
                        " {res.reasoning} "
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
