import React from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Zap, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  BatteryCharging, 
  FileText, 
  Eye, 
  Search,
  Sparkles,
  Info
} from 'lucide-react';

interface LandingPageProps {
  onLaunchWorkspace: () => void;
  onExploreArchitecture: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onLaunchWorkspace,
  onExploreArchitecture
}) => {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex flex-col justify-between">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 pt-10 pb-14 lg:pt-16 lg:pb-20 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Value Prop */}
          <div className="lg:col-span-7 space-y-5 text-left">
            {/* Competition Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-300">
              <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <span className="font-semibold text-white">Snapdragon AI Lab Build & Present Challenge</span>
              <span className="text-neutral-600">·</span>
              <span className="text-neutral-400">Optimized for Snapdragon-powered HP PCs</span>
            </div>

            <div className="space-y-2.5">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08] text-balance">
                NEXUS <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-300">
                  Local AI Intelligence
                </span>
                <br />
                Workspace
              </h1>
              
              <p className="text-base sm:text-lg font-medium text-neutral-300">
                “Private. Fast. Intelligent. Powered by AI on your device.”
              </p>
            </div>

            <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
              A local-first AI workspace architected for Qualcomm Snapdragon PCs. Ingest, summarize, 
              search, and reason across your confidential documents and visual diagrams without mandatory 
              cloud API roundtrips.
            </p>

            {/* Core Value Proposition Quote Box */}
            <div className="p-4 rounded-xl bg-neutral-900/90 border border-neutral-800 flex items-start gap-3 text-xs text-neutral-300">
              <div className="p-1 rounded bg-red-950/60 border border-red-800/60 text-red-400 shrink-0 mt-0.5">
                <Lock className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-white text-sm">
                  “Your data stays on your device while AI works directly on your Snapdragon PC.”
                </p>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  Local-first AI architecture: Ingestion, embeddings, and extractive analysis execute in memory. 
                  Cloud fallback remains strictly optional and user-controlled.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onLaunchWorkspace}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold text-xs transition-all shadow-md shadow-red-950/40 cursor-pointer"
              >
                <span>Launch Workspace</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={onExploreArchitecture}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 hover:border-neutral-700 font-medium text-xs transition-colors cursor-pointer"
              >
                <span>Explore AI Architecture</span>
              </button>
            </div>

            {/* Truthful Dynamic Telemetry Strip */}
            <div className="flex flex-wrap items-center gap-5 pt-2 text-xs text-neutral-400 font-mono">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="h-4 w-4" />
                <span>Privacy: Local-first architecture</span>
              </div>
              <div className="flex items-center gap-1.5 text-neutral-300">
                <Cpu className="h-4 w-4 text-red-400" />
                <span>Processing mode: Local / Demo</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900 group">
              <img
                src="/src/assets/images/nexus_snapdragon_pc_1790776618149.jpg"
                alt="HP laptop powered by Qualcomm Snapdragon X Elite running NEXUS Local AI"
                className="w-full h-auto object-cover transform group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent pointer-events-none" />
              
              {/* Overlay card */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-neutral-950/90 border border-neutral-800/80 backdrop-blur-md text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-mono text-emerald-400 font-bold text-[11px]">LOCAL AI ACTIVE</span>
                  </div>
                  <span className="font-mono text-neutral-400 text-[10px]">HP OmniBook Target</span>
                </div>
                <div className="flex items-center justify-between text-neutral-300 font-mono text-[10px] pt-1 border-t border-neutral-800">
                  <span>Hardware acceleration: <strong className="text-white">Detected / Demo</strong></span>
                  <span>Model router: <strong className="text-emerald-400">Active</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="border-t border-neutral-900 bg-neutral-950/60 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-1.5">
            <span className="text-xs font-semibold text-red-500 uppercase tracking-wider">
              Qualcomm Snapdragon & HP PC Architecture
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Why On-Device AI on Snapdragon?
            </h2>
            <p className="text-xs text-neutral-400">
              Understand the technical advantages of edge intelligence vs cloud APIs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-800 border border-neutral-700 text-red-400">
                <Lock className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-white">Local-First Data Privacy</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Files can remain on your device during supported local workflows. Internal documents are analyzed in local memory without mandatory cloud egress.
              </p>
              <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 pt-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Zero Cloud Egress in Local Mode</span>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-800 border border-neutral-700 text-amber-400">
                <Cpu className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-white">Heterogeneous Silicon Design</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Snapdragon X Elite integrates Oryon CPU, Adreno GPU, and Hexagon NPU. Matrix multiplications can be offloaded from CPU to specialized tensor cores.
              </p>
              <div className="text-[11px] font-mono text-amber-400 flex items-center gap-1.5 pt-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Dedicated Neural Accelerator Target</span>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-800 border border-neutral-700 text-sky-400">
                <Zap className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-white">Edge Efficiency & Offline Operation</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Maintains document intelligence and search during flights or network disconnects, without recurring per-query cloud subscription charges.
              </p>
              <div className="text-[11px] font-mono text-sky-400 flex items-center gap-1.5 pt-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>$0 Per-Query Inference Cost</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer minimal info */}
      <footer className="border-t border-neutral-900 py-4 px-4 text-center text-xs text-neutral-500">
        <p>NEXUS Local AI Intelligence Workspace · Snapdragon AI Lab Build & Present Challenge</p>
      </footer>
    </div>
  );
};
