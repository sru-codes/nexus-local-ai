import React from 'react';
import { 
  Cpu, 
  ShieldCheck, 
  ArrowDown, 
  Layers, 
  Zap, 
  Lock, 
  Cloud, 
  CheckCircle2, 
  HardDrive,
  Award,
  BookOpen,
  Terminal,
  Monitor,
  Laptop
} from 'lucide-react';

export const ArchitectureView: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-10">
      
      {/* Page Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-semibold text-red-500 uppercase tracking-wider">
          System Engineering & Heterogeneous Compute
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          NEXUS Technical Architecture
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          Comparing the live browser execution runtime with the native Snapdragon Windows deployment target
        </p>
      </div>

      {/* Visually Obvious Comparison: Currently Executing vs Target Snapdragon Deployment */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Layers className="h-4 w-4 text-red-500" />
          <span>Execution Environments: Live Browser vs Snapdragon Deployment</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Box 1: Currently Executing (Browser Runtime) */}
          <div className="p-5 rounded-2xl bg-neutral-900 border-2 border-neutral-700 space-y-4 relative">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <Monitor className="h-5 w-5 text-sky-400" />
                <div>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase font-bold block">ENVIRONMENT 1</span>
                  <h3 className="text-sm font-bold text-white">CURRENTLY EXECUTING</h3>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono text-[10px] font-bold">
                BROWSER SANDBOX
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1 font-mono">
                <span className="text-neutral-500 text-[10px] block">RUNTIME LAYER</span>
                <span className="text-neutral-200 font-bold block">In-Browser WebAssembly / CPU Engine</span>
                <p className="text-[11px] text-neutral-400 leading-relaxed font-sans">
                  Runs pure client-side JavaScript, WebAssembly, and Canvas tensor pipelines in local RAM.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1 font-mono">
                <span className="text-neutral-500 text-[10px] block">HARDWARE ACCELERATION PROBE</span>
                <span className="text-amber-400 font-bold block">CPU / WebAssembly Fallback</span>
                <p className="text-[11px] text-neutral-400 leading-relaxed font-sans">
                  NPU registers cannot be accessed directly across standard browser security boundaries.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1 font-mono">
                <span className="text-neutral-500 text-[10px] block">INTEGRATED VISION PIPELINE</span>
                <span className="text-emerald-400 font-bold block">MobileNet-v2 (Adapter Pipeline)</span>
                <p className="text-[11px] text-neutral-400 leading-relaxed font-sans">
                  Pre-processes 224x224 RGB tensors, normalizes by ImageNet mean/std, and computes Softmax probabilities.
                </p>
              </div>
            </div>

            <div className="text-[11px] text-neutral-500 font-mono pt-1">
              Active in this sandbox preview · Zero data egress
            </div>
          </div>

          {/* Box 2: Target Snapdragon Windows Deployment */}
          <div className="p-5 rounded-2xl bg-neutral-900 border-2 border-red-500/60 shadow-lg shadow-red-950/30 space-y-4 relative">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <Laptop className="h-5 w-5 text-red-500" />
                <div>
                  <span className="text-[10px] font-mono text-red-400 uppercase font-bold block">ENVIRONMENT 2</span>
                  <h3 className="text-sm font-bold text-white">TARGET SNAPDRAGON DEPLOYMENT</h3>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-red-950 border border-red-800/80 text-red-300 font-mono text-[10px] font-bold">
                QUALCOMM NPU READY
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1 font-mono">
                <span className="text-neutral-500 text-[10px] block">RUNTIME LAYER</span>
                <span className="text-white font-bold block">ONNX Runtime / QNN Execution Provider</span>
                <p className="text-[11px] text-neutral-400 leading-relaxed font-sans">
                  Compiled Qualcomm AI Hub packages (.onnx / QNN binaries) executed via native Windows on Snapdragon APIs.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1 font-mono">
                <span className="text-neutral-500 text-[10px] block">HARDWARE ACCELERATION</span>
                <span className="text-red-400 font-bold block">Hexagon NPU 45 TOPS Tensor Core Acceleration</span>
                <p className="text-[11px] text-neutral-400 leading-relaxed font-sans">
                  Offloads W4A16 and INT8 matrix operations to dedicated neural silicon on HP OmniBook X.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1 font-mono">
                <span className="text-neutral-500 text-[10px] block">ENERGY PROFILE</span>
                <span className="text-emerald-400 font-bold block">3.9W – 4.8W Low TDP Endurance</span>
                <p className="text-[11px] text-neutral-400 leading-relaxed font-sans">
                  Enables up to 26 hours of continuous battery life with silent acoustic profiles.
                </p>
              </div>
            </div>

            <div className="text-[11px] text-red-400 font-mono pt-1">
              Target for HP Snapdragon PC hardware deployment
            </div>
          </div>

        </div>
      </div>

      {/* Visual Pipeline Flowchart: Exact 9-Step On-Device Sequence */}
      <div className="relative p-6 sm:p-8 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
        <div className="text-center space-y-1 mb-6">
          <span className="text-[10px] font-mono text-red-400 uppercase font-bold tracking-wider">
            END-TO-END QUALCOMM AI HUB PIPELINE
          </span>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            On-Device Inference Architecture
          </h3>
        </div>
        
        {/* Step 1: User */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-md p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-center space-y-1">
            <span className="text-[10px] font-mono text-neutral-500 uppercase font-bold">STAGE 1</span>
            <h4 className="text-sm font-bold text-white">USER</h4>
            <p className="text-xs text-neutral-400">
              Enters conversational query or uploads workspace document
            </p>
          </div>
          <ArrowDown className="h-5 w-5 text-red-500 my-1" />
        </div>

        {/* Step 2: AI Assistant */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-md p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-center space-y-1">
            <span className="text-[10px] font-mono text-sky-400 uppercase font-bold">STAGE 2</span>
            <h4 className="text-sm font-bold text-white">AI ASSISTANT</h4>
            <p className="text-xs text-neutral-400">
              Conversational reasoning interface with streaming output and citation management
            </p>
          </div>
          <ArrowDown className="h-5 w-5 text-red-500 my-1" />
        </div>

        {/* Step 3: Document Retrieval */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-md p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-center space-y-1">
            <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">STAGE 3</span>
            <h4 className="text-sm font-bold text-white flex items-center justify-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>DOCUMENT RETRIEVAL</span>
            </h4>
            <p className="text-xs text-neutral-400">
              In-memory vector similarity retrieves top relevant text chunks without cloud transmission
            </p>
          </div>
          <ArrowDown className="h-5 w-5 text-red-500 my-1" />
        </div>

        {/* Step 4: Model Router */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-md p-3.5 rounded-xl bg-neutral-950 border border-red-500/40 text-center space-y-1 ring-1 ring-red-500/20">
            <span className="text-[10px] font-mono text-red-400 uppercase font-bold">STAGE 4</span>
            <h4 className="text-sm font-bold text-white">MODEL ROUTER</h4>
            <p className="text-xs text-neutral-300">
              Inspects task parameters and routes query to the configured target model
            </p>
          </div>
          <ArrowDown className="h-5 w-5 text-red-500 my-1" />
        </div>

        {/* Step 5: Llama 3.2 3B */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-md p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-center space-y-1">
            <span className="text-[10px] font-mono text-purple-400 uppercase font-bold">STAGE 5</span>
            <h4 className="text-sm font-bold text-white">LLAMA 3.2 3B</h4>
            <p className="text-xs text-neutral-400">
              3.2B parameter instruction-tuned model / W4A16 weights / Grounded prompt synthesis
            </p>
          </div>
          <ArrowDown className="h-5 w-5 text-red-500 my-1" />
        </div>

        {/* Step 6: Qualcomm AI Hub Model */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-md p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-center space-y-1">
            <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">STAGE 6</span>
            <h4 className="text-sm font-bold text-white">QUALCOMM AI HUB MODEL</h4>
            <p className="text-xs text-neutral-400">
              Hardware-compiled model package optimized specifically for Snapdragon compute engines
            </p>
          </div>
          <ArrowDown className="h-5 w-5 text-red-500 my-1" />
        </div>

        {/* Step 7: QNN / DirectML / Available Runtime */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-md p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-center space-y-1">
            <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold">STAGE 7</span>
            <h4 className="text-sm font-bold text-white">QNN / DIRECTML / AVAILABLE RUNTIME</h4>
            <p className="text-xs text-neutral-400">
              Qualcomm QNN provider (Native Windows) · DirectML driver · CPU WebAssembly (Browser Fallback)
            </p>
          </div>
          <ArrowDown className="h-5 w-5 text-red-500 my-1" />
        </div>

        {/* Step 8: Snapdragon Acceleration When Available */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-md p-3.5 rounded-xl bg-red-950/40 border border-red-800/80 text-center space-y-2">
            <span className="text-[10px] font-mono text-red-400 uppercase font-bold">STAGE 8</span>
            <h4 className="text-sm font-bold text-white flex items-center justify-center gap-1.5">
              <Cpu className="h-4 w-4 text-red-500" />
              <span>SNAPDRAGON ACCELERATION WHEN AVAILABLE</span>
            </h4>
            <div className="grid grid-cols-3 gap-1.5 text-[10px] font-mono text-neutral-300">
              <div className="p-1 rounded bg-neutral-900 border border-neutral-800">
                <span className="text-red-400 font-bold block">Hexagon NPU</span>
                <span>45 TOPS GEMM</span>
              </div>
              <div className="p-1 rounded bg-neutral-900 border border-neutral-800">
                <span className="text-amber-400 font-bold block">Adreno GPU</span>
                <span>FP16 Acceleration</span>
              </div>
              <div className="p-1 rounded bg-neutral-900 border border-neutral-800">
                <span className="text-sky-400 font-bold block">Oryon CPU</span>
                <span>Context Orchestration</span>
              </div>
            </div>
          </div>
          <ArrowDown className="h-5 w-5 text-emerald-400 my-1" />
        </div>

        {/* Step 9: Response */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-md p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-center space-y-1">
            <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">STAGE 9</span>
            <h4 className="text-sm font-bold text-emerald-300">RESPONSE</h4>
            <p className="text-xs text-neutral-300">
              Context-grounded answer with source citations, latency telemetry, and zero network transmission
            </p>
          </div>
        </div>

        {/* Cloud Fallback Branch: Visually separated & marked OPTIONAL */}
        <div className="mt-8 pt-6 border-t border-neutral-800/80 flex flex-col items-center">
          <div className="w-full max-w-md p-4 rounded-xl bg-amber-950/20 border-2 border-dashed border-amber-800/60 text-xs text-amber-200/90 space-y-1.5 text-center">
            <div className="flex items-center justify-center gap-1.5 font-bold text-amber-300">
              <Cloud className="h-4 w-4" />
              <span>OPTIONAL CLOUD FALLBACK (VISUALLY SEPARATED)</span>
            </div>
            <p className="text-[11px] text-neutral-400 leading-relaxed">
              Disabled by default. Requires explicit manual opt-in. When enabled, prompt is routed to an external 
              cloud endpoint and data egress occurs. Never used silently for local document queries.
            </p>
          </div>
        </div>

      </div>

      {/* Competition Story & 4 Judging Criteria */}
      <div className="space-y-6 pt-4">
        <div className="text-center max-w-2xl mx-auto space-y-1.5">
          <span className="text-xs font-semibold text-red-500 uppercase tracking-wider">
            Snapdragon AI Lab Challenge Evaluation
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Competition Submission Pillars
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Terminal className="h-4 w-4 text-red-500" />
              <span>1. Technical Implementation</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Real VisionModelAdapter implementation with 224x224 RGB planar tensor preprocessing, 
              Softmax probability calculations, and evidence-driven latency measurements via performance.now().
            </p>
          </div>

          <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Zap className="h-4 w-4 text-amber-400" />
              <span>2. Application Use Case & Innovation</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Provides practical on-device intelligence for HP PC users: document summarization, 
              vector search, clickable source citations, and local vision classification without cloud fees.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <HardDrive className="h-4 w-4 text-sky-400" />
              <span>3. Deployment & Accessibility</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Architected for zero prerequisites. Runs immediately in client memory while providing 
              the exact interface contract needed for Windows on Snapdragon QNN deployment.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <BookOpen className="h-4 w-4 text-emerald-400" />
              <span>4. Presentation & Documentation</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Features an interactive 10-step judging demo, clear distinction between live execution 
              and target Snapdragon deployment, and comprehensive technical documentation.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};
