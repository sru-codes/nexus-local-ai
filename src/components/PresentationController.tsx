import React, { useState } from 'react';
import { 
  X, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Cpu, 
  FileText, 
  MessageSquare, 
  Eye, 
  ShieldCheck, 
  Layers, 
  Activity, 
  BarChart2, 
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';

export interface StepDefinition {
  number: number;
  total: number;
  title: string;
  oneLineExplanation: string;
  technicalDetail: string;
  targetTab: string;
  icon: React.ReactNode;
  actionLabel: string;
  onExecute: () => void;
}

interface PresentationControllerProps {
  isActive: boolean;
  onClose: () => void;
  onNavigateTab: (tabId: string) => void;
  onTriggerDocumentUpload: () => void;
  onTriggerAssistantQuestion: (prompt: string) => void;
  onTriggerVisionSample: () => void;
}

export const PresentationController: React.FC<PresentationControllerProps> = ({
  isActive,
  onClose,
  onNavigateTab,
  onTriggerDocumentUpload,
  onTriggerAssistantQuestion,
  onTriggerVisionSample
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  if (!isActive) return null;

  const steps: StepDefinition[] = [
    {
      number: 1,
      total: 10,
      title: 'Problem: Cloud AI Operational Risks',
      oneLineExplanation: 'Cloud LLMs introduce data leakage hazards, recurring API subscription costs, and flight/offline downtime.',
      technicalDetail: 'When sensitive business intelligence is routed through public cloud REST endpoints, proprietary files leave the company boundary. NEXUS shifts computation onto local PC hardware.',
      targetTab: 'landing',
      icon: <Lock className="h-4 w-4 text-red-500" />,
      actionLabel: 'Inspect Welcome & Overview',
      onExecute: () => onNavigateTab('landing')
    },
    {
      number: 2,
      total: 10,
      title: 'Upload Document: Local Ingestion',
      oneLineExplanation: 'Ingest enterprise PDFs, Word documents, text, and CSV files directly into device memory.',
      technicalDetail: 'Text stream extraction, tokenization, and sentence chunking run completely in local client RAM with zero network upload.',
      targetTab: 'documents',
      icon: <FileText className="h-4 w-4 text-emerald-400" />,
      actionLabel: 'Index Sample Confidential Brief',
      onExecute: () => {
        onNavigateTab('documents');
        onTriggerDocumentUpload();
      }
    },
    {
      number: 3,
      total: 10,
      title: 'Local Document Intelligence',
      oneLineExplanation: 'Generate executive summaries, extract key points, action items, and recognized entities on-device.',
      technicalDetail: 'Uses on-device extractive summarization and local semantic term-frequency clustering. Labeled truthfully with actual processing mode.',
      targetTab: 'documents',
      icon: <Sparkles className="h-4 w-4 text-sky-400" />,
      actionLabel: 'Review Summary & Action Items',
      onExecute: () => onNavigateTab('documents')
    },
    {
      number: 4,
      total: 10,
      title: 'Llama 3.2 3B AI Assistant & Document RAG',
      oneLineExplanation: 'Ask document-related questions with Llama 3.2 3B Instruct, showing retrieval, execution state, and source citations.',
      technicalDetail: 'Pipeline: 1. Open AI Assistant → 2. Ask document question → 3. Vector chunk retrieval → 4. Llama 3.2 3B model → 5. Execution state → 6. Answer → 7. Source citations. When native runtime is unavailable, explicitly demonstrates: "Snapdragon deployment target configured", "Native runtime unavailable in current browser environment".',
      targetTab: 'assistant',
      icon: <MessageSquare className="h-4 w-4 text-amber-400" />,
      actionLabel: 'Execute Llama Document Query',
      onExecute: () => {
        onNavigateTab('assistant');
        onTriggerAssistantQuestion('Summarize all my project documents and identify key deployment risks.');
      }
    },
    {
      number: 5,
      total: 10,
      title: 'Show Source Citation',
      oneLineExplanation: 'Verify grounded answers by clicking any source citation to inspect the underlying file snippet.',
      technicalDetail: 'Provides full provenance and relevance scoring for enterprise auditing. Click citations to view exact text excerpts in local memory.',
      targetTab: 'assistant',
      icon: <FileText className="h-4 w-4 text-purple-400" />,
      actionLabel: 'Inspect Source Document Citations',
      onExecute: () => onNavigateTab('assistant')
    },
    {
      number: 6,
      total: 10,
      title: 'Vision Analysis & OCR',
      oneLineExplanation: 'Process hardware diagrams, schematics, and images locally via the integrated MobileNet-v2 vision pipeline.',
      technicalDetail: 'Real Qualcomm AI Hub MobileNet-v2 integration. Preprocesses 224 × 224 RGB planar tensors with ImageNet normalization, computes class logits, and produces Softmax predictions on-device.',
      targetTab: 'vision',
      icon: <Eye className="h-4 w-4 text-rose-400" />,
      actionLabel: 'Inspect Snapdragon Silicon Wafer Diagram',
      onExecute: () => {
        onNavigateTab('vision');
        onTriggerVisionSample();
      }
    },
    {
      number: 7,
      total: 10,
      title: 'AI Model Architecture & Qualcomm AI Hub',
      oneLineExplanation: 'Inspect model catalog, quantization formats (W4A16, INT8), and native Snapdragon execution providers.',
      technicalDetail: 'Truthful display: Native Qualcomm AI Hub QNN models show "Model runtime unavailable in this environment" unless native Snapdragon driver is present.',
      targetTab: 'models',
      icon: <Layers className="h-4 w-4 text-red-400" />,
      actionLabel: 'Open Model Center',
      onExecute: () => onNavigateTab('models')
    },
    {
      number: 8,
      total: 10,
      title: 'Snapdragon & Runtime Status',
      oneLineExplanation: 'Real hardware detection probe inspecting CPU concurrency, GPU, WebNN, and browser sandbox capabilities.',
      technicalDetail: 'Strict honesty: Shows "Hardware telemetry unavailable in browser environment" in live mode; simulated Snapdragon X Elite profile in Demo Mode.',
      targetTab: 'performance',
      icon: <Cpu className="h-4 w-4 text-amber-400" />,
      actionLabel: 'Open Hardware Diagnostics',
      onExecute: () => onNavigateTab('performance')
    },
    {
      number: 9,
      total: 10,
      title: 'Performance Measurements',
      oneLineExplanation: 'Evidence-driven telemetry separating live measured browser execution times from target Snapdragon benchmarks.',
      technicalDetail: 'Real requests measured with performance.now(). Demo Mode benchmark data transparently tagged as DEMO DATA.',
      targetTab: 'performance',
      icon: <BarChart2 className="h-4 w-4 text-emerald-400" />,
      actionLabel: 'Review Performance Measurements',
      onExecute: () => onNavigateTab('performance')
    },
    {
      number: 10,
      total: 10,
      title: 'Privacy & Enterprise Deployment',
      oneLineExplanation: 'Local-first architecture designed for zero cloud egress, offline capability, and Snapdragon HP PC efficiency.',
      technicalDetail: 'Summary of the 4 judging criteria: Technical Implementation, Application Use Case, Deployment, and Documentation.',
      targetTab: 'architecture',
      icon: <ShieldCheck className="h-4 w-4 text-sky-400" />,
      actionLabel: 'Complete Judging Walkthrough',
      onExecute: () => {
        onNavigateTab('architecture');
        try {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 }
          });
        } catch {
          // ignore
        }
      }
    }
  ];

  const currentStep = steps[currentStepIndex];

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      onNavigateTab(steps[nextIndex].targetTab);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      const prevIndex = currentStepIndex - 1;
      setCurrentStepIndex(prevIndex);
      onNavigateTab(steps[prevIndex].targetTab);
    }
  };

  const handleRestart = () => {
    setCurrentStepIndex(0);
    onNavigateTab(steps[0].targetTab);
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-3xl bg-neutral-900/95 border border-neutral-700/90 rounded-2xl shadow-2xl backdrop-blur-md p-4 text-xs animate-in fade-in slide-in-from-bottom-3 duration-200">
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-red-950/80 border border-red-800/60 text-red-300 font-mono text-[11px] font-bold">
            <span>STEP {currentStep.number}/{currentStep.total}</span>
          </div>
          <div className="flex items-center gap-1.5 font-bold text-white text-sm">
            {currentStep.icon}
            <span>{currentStep.title}</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleRestart}
            className="flex items-center gap-1 px-2 py-1 rounded text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer text-[11px]"
            title="Restart Judging Demo"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Restart</span>
          </button>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            title="Close Demo"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Narrative & Technical Detail */}
      <div className="py-3 space-y-2.5">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-red-400 block mb-0.5">
            One-Line Summary
          </span>
          <p className="text-neutral-200 font-medium text-xs leading-relaxed">
            {currentStep.oneLineExplanation}
          </p>
        </div>

        <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800/80 space-y-1">
          <span className="text-[10px] font-mono uppercase text-neutral-400 font-bold block">
            Technical Detail & Implementation
          </span>
          <p className="text-[11px] text-neutral-300 leading-relaxed font-mono">
            {currentStep.technicalDetail}
          </p>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-neutral-800/60">
        {/* Progress Pills */}
        <div className="flex items-center gap-1 w-full sm:w-auto">
          {steps.map((s, idx) => (
            <button
              key={s.number}
              onClick={() => {
                setCurrentStepIndex(idx);
                onNavigateTab(s.targetTab);
              }}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                idx === currentStepIndex
                  ? 'w-6 bg-red-500'
                  : idx < currentStepIndex
                  ? 'w-2.5 bg-neutral-600'
                  : 'w-2 bg-neutral-800'
              }`}
              title={`Jump to Step ${s.number}`}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={currentStep.onExecute}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold text-xs transition-colors cursor-pointer shadow-xs"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>{currentStep.actionLabel}</span>
          </button>

          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 text-neutral-200 text-xs transition-colors cursor-pointer"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              <span>Back</span>
            </button>
            <button
              onClick={handleNext}
              disabled={currentStepIndex === steps.length - 1}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 text-neutral-200 text-xs transition-colors cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
