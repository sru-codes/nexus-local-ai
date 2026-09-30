import React from 'react';
import { Cpu, Zap, ArrowRight, ShieldCheck } from 'lucide-react';
import { RouteDecision } from '../services/modelRouter';

interface ModelRouterIndicatorProps {
  decision: RouteDecision | null;
  isProcessing: boolean;
  statusText?: string;
}

export const ModelRouterIndicator: React.FC<ModelRouterIndicatorProps> = ({
  decision,
  isProcessing,
  statusText
}) => {
  if (!decision && !isProcessing) return null;

  return (
    <div className="w-full bg-neutral-900/90 border border-neutral-800 rounded-lg p-3 my-2 text-xs transition-all">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-neutral-800/60">
        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded bg-red-950/80 border border-red-800/60">
            <Zap className="h-3 w-3 text-red-400" />
          </div>
          <span className="font-semibold text-neutral-200 uppercase tracking-wider text-[11px]">
            Model Router Engine
          </span>
          <span className="text-neutral-500">·</span>
          <span className="text-neutral-400 font-mono">
            {decision?.task.replace('_', ' ').toUpperCase() || 'LOCAL AI WORKLOAD'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-neutral-800/80 border border-neutral-700/50 text-neutral-300">
            <Cpu className="h-3 w-3 text-red-400" />
            <span className="font-mono text-[11px] font-medium">
              {decision?.accelerationStatus || 'Local Runtime'}
            </span>
          </div>

          <div className="flex items-center gap-1 text-emerald-400 font-medium">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span className="text-[11px]">Zero Egress</span>
          </div>
        </div>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-neutral-300 font-mono text-[11px]">
          {isProcessing ? (
            <span className="flex items-center gap-2 text-red-400">
              <span className="inline-block h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              {statusText || 'Selecting local model & dispatching tensors...'}
            </span>
          ) : (
            <div className="flex items-center gap-2 text-neutral-400">
              <span className="text-neutral-200 font-medium">{decision?.model.name}</span>
              <ArrowRight className="h-3 w-3 text-neutral-600" />
              <span className="text-emerald-400">Target: {decision?.runtimeTarget}</span>
            </div>
          )}
        </div>

        {decision && (
          <div className="text-[11px] text-neutral-500 font-mono flex items-center gap-3">
            <span>Quant: <strong className="text-neutral-300">{decision.model.quantization}</strong></span>
            <span>RAM: <strong className="text-neutral-300">{decision.model.memoryUsageMb} MB</strong></span>
          </div>
        )}
      </div>
    </div>
  );
};
