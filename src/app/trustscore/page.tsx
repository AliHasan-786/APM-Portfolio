import { UnifiedPortfolio } from "@/components/UnifiedPortfolio";

export default function TrustScorePage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-brand-cyan selection:text-black">
      {/* Dynamic Background Gradients */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-cyan/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand-red/10 blur-[120px]" />
      </div>

      <UnifiedPortfolio />
    </main>
  );
}
