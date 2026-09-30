import React from 'react';
import { 
  Cpu, 
  Zap, 
  Activity, 
  HardDrive, 
  Clock, 
  ShieldCheck, 
  Info,
  CheckCircle2,
  AlertCircle,
  Eye
} from 'lucide-react';
import { TelemetryData } from '../types';
import { HardwareStatusCard } from '../components/HardwareStatusCard';

interface PerformanceViewProps {
  telemetry: TelemetryData;
  onToggleDemoMode: () => void;
}

export const PerformanceView: React.FC<PerformanceViewProps> = ({
  telemetry,
  onToggleDemoMode
}) => {
  const visionStats = telemetry.visionModelStats;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Title & Description */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white tracking-tight">
              Snapdragon AI Performance
            </h1>
            <span className="text-neutral-500">·</span>
            <span className="text-xs font-mono text-neutral-400">Evidence-Driven Diagnostics</span>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">
            Observability across local browser environment and target Qualcomm Snapdragon X Elite architecture
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-neutral-500">Benchmark State:</span>
          <span className={telemetry.isDemoMode ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}>
            {telemetry.isDemoMode ? 'DEMO DATA (Target Profile)' : 'LIVE BROWSER MEASUREMENTS'}
          </span>
        </div>
      </div>

      {/* Hardware Status Probe Component */}
      <HardwareStatusCard
        status={telemetry.hardwareStatus}
        isDemoMode={telemetry.isDemoMode}
        onToggleDemoMode={onToggleDemoMode}
      />

      {/* Requirement: Model-Specific Performance Card */}
      <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-red-950/80 border border-red-800/60 text-red-400">
              <Eye className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                Model Telemetry: {visionStats.modelName}
              </h3>
              <p className="text-xs text-neutral-400">
                {visionStats.task} · Source: Qualcomm AI Hub
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-neutral-300 text-[11px] font-mono">
              Runtime: {visionStats.runtime}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1">
            <span className="text-neutral-500 text-[10px] block">EXECUTION MODE</span>
            <span className="text-neutral-200 font-bold block truncate">
              {visionStats.executionMode}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1">
            <span className="text-neutral-500 text-[10px] block">INFERENCE COUNT</span>
            <span className="text-emerald-400 font-bold text-base block">
              {visionStats.inferenceCount} run{visionStats.inferenceCount === 1 ? '' : 's'}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1">
            <span className="text-neutral-500 text-[10px] block">LAST MEASURED INFERENCE</span>
            <span className="text-white font-bold block">
              {visionStats.lastMeasuredMs !== null ? `${visionStats.lastMeasuredMs} ms` : 'Not measured'}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1">
            <span className="text-neutral-500 text-[10px] block">AVERAGE INFERENCE</span>
            <span className="text-white font-bold block">
              {visionStats.averageMeasuredMs !== null ? `${visionStats.averageMeasuredMs} ms` : 'Not measured'}
            </span>
          </div>
        </div>

        <div className="text-[11px] text-neutral-400 flex items-center gap-2 pt-1 border-t border-neutral-800/60 font-mono">
          <Info className="h-3.5 w-3.5 text-sky-400 shrink-0" />
          <span>
            {visionStats.inferenceCount > 0 
              ? `Real client timings measured via performance.now(). Acceleration status: ${visionStats.accelerationStatus}.` 
              : 'Execute an image classification in the Vision Lab to populate live measurement latency.'}
          </span>
        </div>
      </div>

      {/* Real Measured Browser Performance Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider flex items-center gap-2">
            <Activity className="h-4 w-4 text-emerald-400" />
            Session Workspace Telemetry (Current Browser Execution)
          </h2>
          <span className="text-[11px] font-mono text-neutral-500">
            Measured via performance.now() API
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Real Requests Processed */}
          <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1.5">
            <span className="text-xs text-neutral-400 font-medium block">
              Requests Processed Locally
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-emerald-400 font-mono">
                {telemetry.realMeasuredRequests}
              </span>
              <span className="text-xs text-neutral-500 font-mono">queries in RAM</span>
            </div>
            <p className="text-[11px] text-neutral-500">
              Live counter of local document and assistant tasks run this session.
            </p>
          </div>

          {/* Real Last Execution Latency */}
          <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1.5">
            <span className="text-xs text-neutral-400 font-medium block">
              Last Task Processing Time
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white font-mono">
                {telemetry.realLastExecutionMs !== null ? `${telemetry.realLastExecutionMs} ms` : 'Not measured'}
              </span>
            </div>
            <p className="text-[11px] text-neutral-500">
              {telemetry.realLastExecutionMs !== null 
                ? 'Measured client execution time for most recent task.'
                : 'Execute a document search or prompt to measure.'}
            </p>
          </div>

          {/* Average Execution Latency */}
          <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1.5">
            <span className="text-xs text-neutral-400 font-medium block">
              Average Measured Latency
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white font-mono">
                {telemetry.realAverageExecutionMs !== null ? `${telemetry.realAverageExecutionMs} ms` : 'Not measured'}
              </span>
            </div>
            <p className="text-[11px] text-neutral-500">
              Mean client latency over completed tasks.
            </p>
          </div>

          {/* Client Memory State */}
          <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1.5">
            <span className="text-xs text-neutral-400 font-medium block">
              Client Heap / Memory
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white font-mono">
                {telemetry.detectedPlatform.deviceMemoryGb ? `~${telemetry.detectedPlatform.deviceMemoryGb} GB` : 'Unavailable'}
              </span>
            </div>
            <p className="text-[11px] text-neutral-500">
              Browser-reported memory allowance boundary.
            </p>
          </div>

        </div>
      </div>

      {/* Demo Mode Target Snapdragon Benchmarks Section (Explicitly Segregated) */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between pb-1 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4 text-red-500" />
            <h2 className="text-xs font-semibold text-neutral-200 uppercase tracking-wider">
              Snapdragon X Elite Target Architecture Benchmarks
            </h2>
            <span className="px-2 py-0.5 rounded bg-red-950 border border-red-800/60 text-red-300 font-mono text-[10px] font-bold">
              DEMO DATA
            </span>
          </div>
          <span className="text-xs text-neutral-400 font-mono hidden sm:inline">
            Target HP OmniBook X Profile
          </span>
        </div>

        <p className="text-xs text-neutral-400 leading-relaxed">
          The metrics below represent target hardware benchmarks for native deployment on Snapdragon-powered HP PCs 
          utilizing Qualcomm AI Hub compiled models (such as Llama 3.2 3B and Gemma 2 2B with W4A16 quantization). 
          These values are simulated for presentation purposes and clearly marked as <strong>DEMO DATA</strong>.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1.5">
            <span className="text-xs text-neutral-400 font-medium block">Hexagon NPU Target</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white font-mono">
                {telemetry.isDemoMode ? `${telemetry.simulatedNpuTopsUtilization} TOPS` : 'Unavailable'}
              </span>
              <span className="text-xs text-neutral-500 font-mono">/ 45 TOPS Peak</span>
            </div>
            <p className="text-[11px] text-neutral-500 font-mono">
              Dedicated INT4/INT8 tensor matrix units
            </p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1.5">
            <span className="text-xs text-neutral-400 font-medium block">Target Generation Speed</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white font-mono">
                {telemetry.isDemoMode ? `${telemetry.simulatedTokensPerSec} tok/s` : 'Not measured'}
              </span>
              <span className="text-xs text-neutral-500 font-mono">
                {telemetry.isDemoMode ? `~${telemetry.simulatedLatencyMs} ms/tok` : ''}
              </span>
            </div>
            <p className="text-[11px] text-neutral-500 font-mono">
              Llama 3.2 3B W4A16 on Hexagon NPU
            </p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1.5">
            <span className="text-xs text-neutral-400 font-medium block">Target Memory Bus</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white font-mono">
                {telemetry.isDemoMode ? `${telemetry.simulatedMemoryBandwidthGbps} GB/s` : 'Unavailable'}
              </span>
              <span className="text-xs text-neutral-500 font-mono">/ 136 GB/s LPDDR5x</span>
            </div>
            <p className="text-[11px] text-neutral-500 font-mono">
              Unified Memory zero-copy tensor transit
            </p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1.5">
            <span className="text-xs text-neutral-400 font-medium block">Target Thermal TDP</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-emerald-400 font-mono">
                {telemetry.isDemoMode ? '3.9W – 4.8W' : 'N/A'}
              </span>
            </div>
            <p className="text-[11px] text-neutral-500 font-mono">
              HP ultra-thin chassis fanless acoustics
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};
