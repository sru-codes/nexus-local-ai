import React, { useState } from 'react';
import { 
  Eye, 
  Upload, 
  ShieldCheck, 
  Cpu, 
  CheckCircle2, 
  Info, 
  Image as ImageIcon,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { VisionAnalysisResult } from '../types';
import { DEMO_VISION_RESULTS } from '../services/demoModeService';
import { processVisionInput, processVisionPreset } from '../services/visionInferenceService';
import { visionModelAdapter } from '../services/visionModelAdapter';

interface VisionLabViewProps {
  isDemoMode: boolean;
  onToggleDemoMode: () => void;
  onAddDocumentFromVision?: (name: string, content: string) => void;
}

export const VisionLabView: React.FC<VisionLabViewProps> = ({
  isDemoMode,
  onToggleDemoMode,
  onAddDocumentFromVision
}) => {
  const [currentResult, setCurrentResult] = useState<VisionAnalysisResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'predictions' | 'understanding' | 'ocr' | 'diagram'>('predictions');

  const modelInfo = visionModelAdapter.getModelInfo();
  const runtimeInfo = visionModelAdapter.detectRuntime(isDemoMode);

  // Initialize or re-run when demo mode switches
  React.useEffect(() => {
    let isCancelled = false;
    const loadInitial = async () => {
      setIsProcessing(true);
      try {
        const res = await processVisionPreset(DEMO_VISION_RESULTS[0], isDemoMode);
        if (!isCancelled) {
          setCurrentResult(res);
        }
      } catch {
        if (!isCancelled) {
          setCurrentResult({
            ...DEMO_VISION_RESULTS[0],
            runtimeState: isDemoMode ? 'DEMO MODE' : 'LIVE — CPU',
            processingTimeMs: null,
            predictions: isDemoMode ? [
              { label: 'Microprocessor / Silicon Wafer', category: 'Semiconductor Hardware', confidence: 0.942, rawLogit: 3.41 },
              { label: 'Electronic Circuit Board / PCB', category: 'Semiconductor Hardware', confidence: 0.041, rawLogit: 1.12 },
              { label: 'Technical Flowchart / Schematic', category: 'Document & Engineering', confidence: 0.012, rawLogit: -0.25 },
              { label: 'Laptop / AI PC Chassis', category: 'Consumer Electronics', confidence: 0.005, rawLogit: -1.14 }
            ] : []
          });
        }
      } finally {
        if (!isCancelled) setIsProcessing(false);
      }
    };

    loadInitial();
    return () => { isCancelled = true; };
  }, [isDemoMode]);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || !files[0]) return;
    const file = files[0];
    setErrorMessage(null);
    setIsProcessing(true);

    try {
      const res = await processVisionInput(file, isDemoMode);
      setCurrentResult(res);
    } catch (err: any) {
      setErrorMessage(err.message || 'Image processing error.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSelectPreset = async (sample: VisionAnalysisResult) => {
    setErrorMessage(null);
    setIsProcessing(true);
    try {
      const res = await processVisionPreset(sample, isDemoMode);
      setCurrentResult(res);
    } catch (err: any) {
      setErrorMessage(err.message || 'Error processing image.');
    } finally {
      setIsProcessing(false);
    }
  };

  const hasPredictions = currentResult && currentResult.predictions && currentResult.predictions.length > 0;
  const isRuntimeUnavailable = runtimeInfo.state === 'RUNTIME UNAVAILABLE' || (currentResult && currentResult.runtimeUnavailableReason);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Header & Local Processing Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white tracking-tight">
              AI Vision Lab — MobileNet-v2 Workflow
            </h1>
            <span className="text-neutral-500">·</span>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 font-mono text-xs font-semibold">
              <span className={`h-2 w-2 rounded-full ${isDemoMode ? 'bg-red-500' : 'bg-emerald-500'}`} />
              <span>{runtimeInfo.state}</span>
            </div>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">
            Real Qualcomm AI Hub MobileNet-v2 model pipeline: Image upload, validation, 224 × 224 RGB planar preprocessing, inference, and Softmax
          </p>
        </div>

        {/* Upload Button */}
        <label className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs">
          <Upload className="h-4 w-4" />
          <span>Upload Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e.target.files)}
            className="hidden"
          />
        </label>
      </div>

      {/* Mandatory Specifications HUD: MODEL, SOURCE, INPUT, RUNTIME, EXECUTION, INFERENCE TIME */}
      <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs font-mono">
        <div className="space-y-0.5">
          <span className="text-neutral-500 text-[10px] block uppercase">MODEL</span>
          <span className="text-white font-bold block truncate">MobileNet-v2</span>
        </div>

        <div className="space-y-0.5">
          <span className="text-neutral-500 text-[10px] block uppercase">SOURCE</span>
          <span className="text-neutral-300 font-bold block truncate">Qualcomm AI Hub</span>
        </div>

        <div className="space-y-0.5">
          <span className="text-neutral-500 text-[10px] block uppercase">INPUT</span>
          <span className="text-red-400 font-bold block">224 × 224 RGB</span>
        </div>

        <div className="space-y-0.5">
          <span className="text-neutral-500 text-[10px] block uppercase">RUNTIME</span>
          <span className="text-emerald-400 font-bold block truncate">{runtimeInfo.state}</span>
        </div>

        <div className="space-y-0.5">
          <span className="text-neutral-500 text-[10px] block uppercase">EXECUTION</span>
          <span className="text-neutral-300 font-bold block truncate">{runtimeInfo.executionMode}</span>
        </div>

        <div className="space-y-0.5">
          <span className="text-neutral-500 text-[10px] block uppercase">INFERENCE TIME</span>
          <span className="text-white font-bold block">
            {isDemoMode 
              ? 'Demo: 18 ms (DEMO DATA)' 
              : currentResult && currentResult.processingTimeMs !== null 
              ? `${currentResult.processingTimeMs} ms (Measured)` 
              : 'Not measured'}
          </span>
        </div>
      </div>

      {/* Error or Runtime Limitation Notice */}
      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-800/60 text-xs text-red-200 flex items-start gap-2.5 font-mono">
          <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {isRuntimeUnavailable && (
        <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/50 text-xs text-amber-200 space-y-2">
          <div className="flex items-center gap-2 font-bold">
            <Info className="h-4 w-4 text-amber-400" />
            <span>Qualcomm AI Hub model is configured, but the required native runtime is unavailable in this browser environment.</span>
          </div>
          <p className="text-neutral-400 leading-relaxed">
            Native Qualcomm QNN Execution Provider execution requires Windows on Snapdragon with native Hexagon NPU drivers. 
            To inspect the target workflow and sample predictions, switch to <strong>Demo Mode</strong>.
          </p>
          <button
            onClick={onToggleDemoMode}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-900/60 hover:bg-amber-900 text-white font-semibold text-xs transition-colors cursor-pointer"
          >
            <span>Switch to Demo Mode</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      )}

      {isDemoMode && (
        <div className="p-2.5 rounded-lg bg-red-950/30 border border-red-800/40 text-xs text-red-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 rounded bg-red-600 text-white font-mono font-bold text-[10px]">
              DEMO DATA
            </span>
            <span>Simulated Qualcomm AI Hub MobileNet-v2 workflow on Snapdragon X Elite profile.</span>
          </div>
          <span className="font-mono text-neutral-400 hidden sm:inline">Model workflow simulated</span>
        </div>
      )}

      {/* Preset Verification Samples */}
      <div className="space-y-2">
        <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block">
          Preset Verification Samples
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {DEMO_VISION_RESULTS.map((sample) => (
            <button
              key={sample.id}
              onClick={() => handleSelectPreset(sample)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                currentResult?.id === sample.id
                  ? 'bg-neutral-900 border-red-500/60 shadow-md ring-1 ring-red-500/30'
                  : 'bg-neutral-900/60 border-neutral-800 hover:bg-neutral-900 hover:border-neutral-700'
              }`}
            >
              <div className="h-12 w-16 rounded-md overflow-hidden bg-neutral-950 border border-neutral-800 shrink-0">
                <img
                  src={sample.imageUrl}
                  alt={sample.imageName}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-white truncate">{sample.imageName}</p>
                <p className="text-[11px] text-neutral-400 truncate font-mono">MobileNet-v2 · 224 × 224 RGB</p>
                <span className="text-[10px] font-mono text-emerald-400">
                  {isDemoMode ? 'DEMO DATA' : 'Ready for In-Browser Run'}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Analysis Stage */}
      {currentResult && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Image Canvas & Technical HUD */}
          <div className="lg:col-span-6 bg-neutral-900 border border-neutral-800 rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-red-500" />
                <span className="text-xs font-bold text-neutral-200 truncate max-w-xs">
                  {currentResult.imageName}
                </span>
              </div>
              <span className="text-[11px] font-mono text-neutral-400">
                {currentResult.accelerator}
              </span>
            </div>

            <div className="relative rounded-lg overflow-hidden border border-neutral-800 bg-neutral-950">
              <img
                src={currentResult.imageUrl}
                alt={currentResult.imageName}
                className="w-full h-auto max-h-[380px] object-contain mx-auto"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Pipeline Step Sequence Visual */}
            <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-[10px] font-mono text-neutral-400 space-y-1">
              <span className="text-neutral-500 font-bold block uppercase">VERIFIED PIPELINE EXECUTION</span>
              <p className="text-neutral-300">
                Image Upload → Validated Format → 224 × 224 RGB Tensor Normalization → MobileNet-v2 Forward Pass → Softmax Logits → Top Predictions
              </p>
            </div>
          </div>

          {/* Right Column: Multi-Tab Intelligence Results */}
          <div className="lg:col-span-6 bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-5">
            
            {/* Sub Navigation */}
            <div className="flex items-center gap-1 border-b border-neutral-800 pb-3 text-xs">
              <button
                onClick={() => setActiveTab('predictions')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                  activeTab === 'predictions' ? 'bg-neutral-800 text-white font-semibold' : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Top Predictions
              </button>
              <button
                onClick={() => setActiveTab('understanding')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                  activeTab === 'understanding' ? 'bg-neutral-800 text-white font-semibold' : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Image Understanding
              </button>
              <button
                onClick={() => setActiveTab('ocr')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                  activeTab === 'ocr' ? 'bg-neutral-800 text-white font-semibold' : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Extracted Text
              </button>
              <button
                onClick={() => setActiveTab('diagram')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                  activeTab === 'diagram' ? 'bg-neutral-800 text-white font-semibold' : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Architecture & Model
              </button>
            </div>

            {/* Tab Content */}
            <div className="space-y-4">
              
              {activeTab === 'predictions' && (
                <div className="space-y-3">
                  {/* Results Metadata Summary: Model, Runtime, Inference Time, Confidence */}
                  <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 grid grid-cols-3 gap-2 text-xs font-mono">
                    <div>
                      <span className="text-neutral-500 text-[10px] block uppercase">MODEL</span>
                      <span className="text-white font-bold block truncate">MobileNet-v2</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 text-[10px] block uppercase">RUNTIME</span>
                      <span className="text-emerald-400 font-bold block truncate">{currentResult.runtimeState || runtimeInfo.state}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 text-[10px] block uppercase">INFERENCE TIME</span>
                      <span className="text-white font-bold block truncate">
                        {isDemoMode 
                          ? '14.2 ms (DEMO DATA)' 
                          : currentResult.processingTimeMs !== null 
                          ? `${currentResult.processingTimeMs} ms (Measured)` 
                          : 'Not measured'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                      Top Predictions & Confidence
                    </h3>
                    <span className="text-[10px] font-mono text-neutral-500">
                      Input: 224 × 224 RGB
                    </span>
                  </div>

                  {hasPredictions ? (
                    <div className="space-y-2.5">
                      {(currentResult.predictions || []).map((pred, i) => (
                        <div key={i} className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <div>
                              <span className="font-bold text-white">{pred.label}</span>
                              <span className="text-neutral-500 text-[11px] block">{pred.category}</span>
                            </div>
                            <div className="text-right">
                              <span className="font-mono text-emerald-400 font-bold text-xs">
                                {(pred.confidence * 100).toFixed(1)}%
                              </span>
                              <span className="text-neutral-500 text-[10px] block font-mono">
                                logit: {pred.rawLogit}
                              </span>
                            </div>
                          </div>

                          <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                            <div 
                              className="bg-red-500 h-full rounded-full transition-all duration-300"
                              style={{ width: `${Math.min(100, Math.max(5, pred.confidence * 100))}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800 text-center text-xs text-neutral-400 space-y-2">
                      <p>No predictions generated. The native runtime is unavailable in this browser environment.</p>
                      <button
                        onClick={onToggleDemoMode}
                        className="px-3 py-1.5 rounded bg-red-600 hover:bg-red-500 text-white font-medium transition-colors cursor-pointer"
                      >
                        Enable Demo Mode
                      </button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'understanding' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                      Visual Scene Description
                    </h3>
                    <p className="text-xs text-neutral-200 leading-relaxed bg-neutral-950 p-4 rounded-xl border border-neutral-800 font-mono">
                      {currentResult.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                      Vision Pipeline Insights
                    </h3>
                    <div className="space-y-2">
                      {currentResult.insights.map((insight, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-300">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{insight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'ocr' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                      Extracted Optical Characters ({currentResult.ocrText.length} blocks)
                    </h3>
                    {onAddDocumentFromVision && currentResult.ocrText.length > 0 && (
                      <button
                        onClick={() => onAddDocumentFromVision(
                          `OCR_${currentResult.imageName}.txt`, 
                          currentResult.ocrText.join('\n')
                        )}
                        className="text-xs text-red-400 hover:text-red-300 font-medium transition-colors cursor-pointer"
                      >
                        Save to Documents →
                      </button>
                    )}
                  </div>

                  <div className="space-y-1.5 p-4 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-xs text-neutral-200 max-h-72 overflow-y-auto">
                    {currentResult.ocrText.map((line, i) => (
                      <div key={i} className="py-1 border-b border-neutral-800/60 last:border-none flex items-center justify-between">
                        <span>{line}</span>
                        <span className="text-[10px] text-emerald-400 font-mono">Parsed</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'diagram' && (
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                    Model Architecture & Deployment Specs
                  </h3>
                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 leading-relaxed font-mono space-y-2">
                    <p>{currentResult.diagramExplanation}</p>
                    <div className="pt-2 border-t border-neutral-800 text-[11px] text-neutral-400 space-y-1">
                      <p>• Architecture: {modelInfo.targetArchitecture}</p>
                      <p>• Memory Footprint: {modelInfo.memoryFootprintMb} MB</p>
                      <p>• Preprocessing: 224 × 224 RGB Planar Tensor Normalization</p>
                      <p>• Native Acceleration Target: Qualcomm Hexagon NPU via QNN Execution Provider</p>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      )}

    </div>
  );
};
