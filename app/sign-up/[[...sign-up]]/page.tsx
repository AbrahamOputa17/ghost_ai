import { SignUp } from "@clerk/nextjs";
import { Cpu, Share2, ScrollText } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex bg-zinc-950 text-zinc-100">
      {/* Left panel — hidden on small screens */}
      <div className="hidden lg:flex flex-1 flex-col justify-between p-12 border-r border-zinc-800/60 bg-zinc-900 select-none relative overflow-hidden">
        {/* Subtle cyan glow in top-left corner */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        {/* Logo Section */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400 text-zinc-950 font-extrabold text-base">
            G
          </div>
          <span className="text-lg font-bold tracking-tight text-zinc-100">Ghost AI</span>
        </div>

        {/* Hero Section */}
        <div className="my-auto space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-50 leading-tight">
              Design systems at the speed of thought.
            </h1>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
              Describe your architecture in plain English. Ghost AI maps it to a shared canvas your whole team can refine in real time.
            </p>
          </div>

          {/* Feature List */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800/80 text-cyan-400 shadow-inner">
                <Cpu className="h-5 w-5" />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-sm font-semibold text-zinc-200">AI Architecture Generation</h3>
                <p className="text-[12px] text-zinc-400 leading-normal">
                  Describe your system, AI maps it to nodes and edges on a live canvas.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800/80 text-cyan-400 shadow-inner">
                <Share2 className="h-5 w-5" />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-sm font-semibold text-zinc-200">Real-time Collaboration</h3>
                <p className="text-[12px] text-zinc-400 leading-normal">
                  Live cursors, presence indicators, and shared node editing across your team.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800/80 text-cyan-400 shadow-inner">
                <ScrollText className="h-5 w-5" />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-sm font-semibold text-zinc-200">Instant Spec Generation</h3>
                <p className="text-[12px] text-zinc-400 leading-normal">
                  Export a complete Markdown technical spec directly from the canvas graph.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-[11px] text-zinc-600">
          © 2026 Ghost AI. All rights reserved.
        </div>
      </div>

      {/* Right panel — Clerk form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-zinc-950/95">
        <SignUp />
      </div>
    </div>
  );
}
