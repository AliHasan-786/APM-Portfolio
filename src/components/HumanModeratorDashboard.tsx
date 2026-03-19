"use client";

import { ModerationResult } from "@/lib/simulator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { BookOpen, BrainCircuit, Lock, EyeOff, Check, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function HumanModeratorDashboard({ data, onReset }: { data: ModerationResult, onReset: () => void }) {
    return (
        <div className="max-w-6xl mx-auto p-4 space-y-6 pt-8 animate-in fade-in duration-500">

            <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                    <h2 className="text-2xl font-bold flex items-center">
                        <Lock className="w-6 h-6 mr-2 text-brand-red" />
                        High-Stakes Escalation Queue
                    </h2>
                    <p className="text-zinc-400 text-sm mt-1">Reviewing ticket: #TCK-88192A</p>
                </div>
                <div className="flex gap-2">
                    <Badge variant="destructive" className="bg-brand-red/20 text-brand-red hover:bg-brand-red/30 py-1">
                        LPP Confidence: {(data.assessment.confidenceScore * 100).toFixed(1)}%
                    </Badge>
                    <Badge variant="outline" className="border-orange-500/50 text-orange-400 py-1">
                        {data.assessment.uncertaintyType} Uncertainty
                    </Badge>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Context and Tools */}
                <div className="col-span-1 space-y-6">
                    <Card className="bg-zinc-900/50 border-white/10">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-semibold uppercase text-zinc-500">XAI Explainability Matrix</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20 mb-4">
                                <div className="flex items-start">
                                    <BrainCircuit className="w-5 h-5 text-orange-400 mr-2 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h4 className="text-orange-400 font-semibold mb-1">AI Confusion Attribution</h4>
                                        <p className="text-sm text-zinc-300 leading-relaxed">
                                            {data.assessment.uncertaintyReason}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <p className="text-xs text-zinc-500 italic">
                                * To combat automation bias, no preliminary AI recommendation is provided. Please evaluate the evidence manually.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-zinc-900/50 border-white/10">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-semibold uppercase text-zinc-500 flex items-center">
                                <BookOpen className="w-4 h-4 mr-2" />
                                Retrieved RAG Sources
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[300px] pr-4">
                                <div className="space-y-4">
                                    {data.retrievedEvidence.map((doc, idx) => (
                                        <div key={idx} className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-mono text-brand-cyan">{doc.source}</span>
                                                <span className="text-xs text-zinc-500">Rel: {doc.relevanceScore}</span>
                                            </div>
                                            <p className="text-sm text-zinc-300 bg-black/40 p-3 rounded border border-white/5">{doc.content}</p>
                                            {idx < data.retrievedEvidence.length - 1 && <Separator className="bg-white/5 my-4" />}
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Claim and Action */}
                <div className="col-span-1 lg:col-span-2 space-y-6">
                    <Card className="bg-black border-white/10 shadow-2xl">
                        <CardHeader className="bg-zinc-900/50 border-b border-white/10 pb-4">
                            <div className="flex justify-between items-center">
                                <CardTitle className="text-lg">Flagged Content Transcript</CardTitle>
                                <Badge variant="secondary" className="bg-zinc-800">Video ID: 991823901</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <p className="text-lg leading-relaxed font-medium text-white/90">
                                "{data.originalText}"
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-zinc-900/50 border-white/10">
                        <CardHeader>
                            <CardTitle className="text-lg">Manual Adjudication Actions</CardTitle>
                            <CardDescription>Select the appropriate policy enforcement.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Button
                                variant="destructive"
                                className="h-24 flex flex-col items-center justify-center gap-2 bg-zinc-950 border border-brand-red hover:bg-brand-red hover:text-white group transition-all"
                                onClick={onReset}
                            >
                                <XCircle className="w-8 h-8 text-brand-red group-hover:text-white" />
                                <span>Remove Content</span>
                            </Button>

                            <Button
                                variant="outline"
                                className="h-24 flex flex-col items-center justify-center gap-2 bg-zinc-950 border-orange-500/50 hover:bg-orange-500/20 hover:text-orange-400 group transition-all"
                                onClick={onReset}
                            >
                                <EyeOff className="w-8 h-8 text-orange-400 group-hover:text-orange-400" />
                                <span>Ineligible for FYF</span>
                            </Button>

                            <Button
                                variant="outline"
                                className="h-24 flex flex-col items-center justify-center gap-2 bg-zinc-950 border-brand-cyan hover:bg-brand-cyan/20 hover:text-brand-cyan text-zinc-300 group transition-all"
                                onClick={onReset}
                            >
                                <Check className="w-8 h-8 text-brand-cyan group-hover:text-brand-cyan" />
                                <span>Approve / No Violation</span>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
