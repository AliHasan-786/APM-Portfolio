"use client";

import { useState } from "react";
import { TriageSimulator } from "@/components/TriageSimulator";
import { PolicyOpsPlatform } from "@/components/PolicyOpsPlatform";
import { ShieldAlert, FlaskConical, Activity } from "lucide-react";

export default function Home() {
  const [activeView, setActiveView] = useState<'simulator' | 'lab'>('lab');

  return (
    <main className="min-h-screen bg-black text-white selection:bg-tiktok-cyan selection:text-black">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-tiktok-red" />
            <span className="font-bold text-sm">TrustScore-RAG</span>
          </div>
          <div className="flex items-center gap-2 md:gap-4 text-sm font-medium">
            <button
              onClick={() => setActiveView('simulator')}
              className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-2 ${activeView === 'simulator' ? 'bg-white/10 text-white' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
            >
              <Activity className="w-4 h-4" /> AI Evaluation Demo
            </button>
            <button
              onClick={() => setActiveView('lab')}
              className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-2 ${activeView === 'lab' ? 'bg-white/10 text-tiktok-cyan' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
            >
              <FlaskConical className="w-4 h-4" /> PM Ops Console
            </button>
            <div className="w-px h-4 bg-white/20 mx-2 hidden md:block"></div>
            <a href="https://github.com/AliHasan-786/TrustScore" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors hidden md:block">GitHub</a>
          </div>
        </div>
      </nav>

      {/* Dynamic Background Gradients */}
      <div className="fixed inset-0 z-[-1] overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-tiktok-cyan/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-tiktok-red/10 blur-[120px]" />
      </div>

      {/* Content */}
      <div className="pt-14">
        {activeView === 'simulator' ? <TriageSimulator /> : <PolicyOpsPlatform />}
      </div>
    </main>
  );
}
