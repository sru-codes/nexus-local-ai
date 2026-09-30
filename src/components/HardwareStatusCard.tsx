import React from 'react';
import { Cpu, HardDrive, Zap, Info, ShieldCheck, Activity } from 'lucide-react';
import { HardwareStatus, HardwareDetectionState } from '../types';

interface HardwareStatusCardProps {
  status: HardwareStatus;
  isDemoMode: boolean;
  onToggleDemoMode: () => void;
}

export const HardwareStatusCard: React.FC<HardwareStatusCardProps> = ({
  status,
  isDemoMode,
  onToggleDemoMode
}) => {
  const getBadgeStyle = (state: HardwareDetectionState) => {
    switch (state) {
      case 'DETECTED':
        return 'bg-emerald-950/60 border-emerald-800/80 text-emerald-400';
      case 'DEMO MODE':
        return 'bg-red-950/60 border-red-800/80 text-red-300';
      case 'NOT DETECTED':
        return 'bg-amber-950/60 border-amber-800/80 text-amber-400';
      case 'UNAVAILABLE':
      default:
        return 'bg-neutral-800 border-neutral-700 text-neutral-400';
    }
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4 text-red-500" />
            <h3 className="text-sm font-bold text-white tracking-tight">
              Hardware & AI Runtime Diagnostics
            </h3>
            {isDemoMode && (
              <span className="px-1.5 py-0.5 rounded bg-red-950 border border-red-800/60 text-red-300 font-mono text-[10px] font-bold">
                DEMO DATA
              </span>
            )}
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">
            Real-time probe of execution environment and acceleration boundaries
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-400 font-mono">Mode:</span>
          <button
            onClick={onToggleDemoMode}
            className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition-colors cursor-pointer border ${
              isDemoMode
                ? 'bg-red-950/80 text-red-200 border-red-800/70 hover:bg-red-900/60'
                : 'bg-neutral-800 text-neutral-200 border-neutral-700 hover:bg-neutral-750'
            }`}
          >
            {isDemoMode ? 'DEMO MODE (Snapdragon Profile)' : 'LIVE BROWSER PROBE'}
          </button>
        </div>
      </div>

      {/* Grid of Detected Hardware States */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        
        {/* CPU */}
        <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-800/80 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-400 font-medium">CPU</span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${getBadgeStyle(status.cpuState)}`}>
              {status.cpuState}
            </span>
          </div>
          <p className="text-xs text-neutral-200 font-mono line-clamp-2">
            {status.cpuDetails}
          </p>
        </div>

        {/* GPU */}
        <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-800/80 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-400 font-medium">GPU</span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${getBadgeStyle(status.gpuState)}`}>
              {status.gpuState}
            </span>
          </div>
          <p className="text-xs text-neutral-200 font-mono line-clamp-2">
            {status.gpuDetails}
          </p>
        </div>

        {/* NPU / AI Accelerator */}
        <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-800/80 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-400 font-medium">NPU / AI Accelerator</span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${getBadgeStyle(status.npuState)}`}>
              {status.npuState}
            </span>
          </div>
          <p className="text-xs text-neutral-200 font-mono line-clamp-2">
            {status.npuDetails}
          </p>
        </div>

        {/* Memory */}
        <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-800/80 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-400 font-medium">Memory Allocation</span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${getBadgeStyle(status.memoryState)}`}>
              {status.memoryState}
            </span>
          </div>
          <p className="text-xs text-neutral-200 font-mono line-clamp-2">
            {status.memoryDetails}
          </p>
        </div>

        {/* AI Runtime */}
        <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-800/80 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-400 font-medium">AI Runtime</span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${getBadgeStyle(status.aiRuntimeState)}`}>
              {status.aiRuntimeState}
            </span>
          </div>
          <p className="text-xs text-neutral-200 font-mono line-clamp-2">
            {status.aiRuntimeDetails}
          </p>
        </div>

        {/* Acceleration Status */}
        <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-800/80 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-400 font-medium">Acceleration Status</span>
            <span className="text-[10px] font-mono text-emerald-400 font-bold">
              {isDemoMode ? 'SNAPDRAGON' : 'LOCAL CPU'}
            </span>
          </div>
          <p className="text-xs text-neutral-200 font-mono line-clamp-2">
            {status.accelerationStatus}
          </p>
        </div>

      </div>

      {/* Truthful Telemetry Notice */}
      <div className="p-3 rounded-lg bg-neutral-950/70 border border-neutral-800 text-xs text-neutral-400 flex items-start gap-2.5">
        <Info className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
        <span className="leading-relaxed">
          {status.telemetryNotice}
        </span>
      </div>
    </div>
  );
};
