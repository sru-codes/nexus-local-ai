import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  FileText, 
  CheckSquare, 
  ListChecks, 
  Briefcase, 
  HelpCircle, 
  RefreshCw, 
  Copy, 
  Check,
  Zap,
  Cpu
} from 'lucide-react';
import { DocumentItem } from '../types';

interface QuickToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
  documents: DocumentItem[];
}

interface ToolAction {
  id: string;
  name: string;
  desc: string;
  icon: React.ReactNode;
  prompt: string;
}

const TOOLS: ToolAction[] = [
  {
    id: 'summarize',
    name: 'Summarize',
    desc: 'Condense any document into high-impact key takeaways',
    icon: <FileText className="h-4 w-4 text-red-400" />,
    prompt: 'Synthesize the core message and executive takeaways into 3 crisp paragraphs.'
  },
  {
    id: 'action-items',
    name: 'Extract Action Items',
    desc: 'Pull deliverable tasks, owners, and target deadlines',
    icon: <CheckSquare className="h-4 w-4 text-emerald-400" />,
    prompt: 'Identify all action items, deliverables, and assignees with priority levels.'
  },
  {
    id: 'checklist',
    name: 'Generate Checklist',
    desc: 'Transform narrative plans into step-by-step verification lists',
    icon: <ListChecks className="h-4 w-4 text-sky-400" />,
    prompt: 'Format as an operational readiness checklist with verification criteria.'
  },
  {
    id: 'project-brief',
    name: 'Generate Project Brief',
    desc: 'Draft an executive project charter with objectives and constraints',
    icon: <Briefcase className="h-4 w-4 text-amber-400" />,
    prompt: 'Create a standardized enterprise project brief covering Problem, Scope, and Milestones.'
  },
  {
    id: 'explain',
    name: 'Explain Simply',
    desc: 'De-jargonize technical architecture for business stakeholders',
    icon: <HelpCircle className="h-4 w-4 text-purple-400" />,
    prompt: 'Explain the technical concepts using clear analogies suitable for non-technical stakeholders.'
  },
  {
    id: 'rewrite',
    name: 'Rewrite & Polish',
    desc: 'Elevate tone to crisp, authoritative executive prose',
    icon: <RefreshCw className="h-4 w-4 text-cyan-400" />,
    prompt: 'Rewrite in active voice, eliminating passive phrasing and unnecessary qualifiers.'
  },
  {
    id: 'meeting-notes',
    name: 'Generate Meeting Notes',
    desc: 'Structure raw transcripts into Decisions, Discussion & Next Steps',
    icon: <FileText className="h-4 w-4 text-rose-400" />,
    prompt: 'Structure as corporate meeting minutes: Attendees, Key Decisions, Open Questions, Next Steps.'
  },
  {
    id: 'concise-notes',
    name: 'Convert into Concise Notes',
    desc: 'Extract distilled bullet notes for rapid offline review',
    icon: <Zap className="h-4 w-4 text-yellow-400" />,
    prompt: 'Convert into high-density bullet notes formatted for quick reference.'
  }
];

export const QuickToolsModal: React.FC<QuickToolsModalProps> = ({
  isOpen,
  onClose,
  documents
}) => {
  const [selectedTool, setSelectedTool] = useState<ToolAction>(TOOLS[0]);
  const [selectedDocId, setSelectedDocId] = useState<string>(documents[0]?.id || '');
  const [customInput, setCustomInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [hasCopied, setHasCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentDoc = documents.find(d => d.id === selectedDocId);

  const handleExecute = () => {
    setIsGenerating(true);
    setOutput('');

    const sourceText = customInput.trim() || currentDoc?.content || 'Sample enterprise document text for Snapdragon PC processing.';
    
    // Simulate on-device Hexagon NPU execution
    setTimeout(() => {
      let result = '';
      if (selectedTool.id === 'action-items') {
        result = `### Extracted Action Items (Local Hexagon NPU Execution)\n\n` +
          `1. [High Priority] Validate Qualcomm AI Hub ONNX runtime models across all internal repositories.\n` +
          `2. [High Priority] Deprecate external cloud API access for Tier-1 schematics to eliminate data leakage.\n` +
          `3. [Medium Priority] Finalize air-gapped security compliance verification for 500 field units.\n` +
          `4. [Medium Priority] Publish battery drain benchmarks comparing on-device NPU vs cloud roundtrips.\n\n` +
          `*All items derived on-device from ${currentDoc?.name || 'custom input'}. Zero cloud egress.*`;
      } else if (selectedTool.id === 'checklist') {
        result = `### Operational Readiness Checklist\n\n` +
          `- [x] Verify Snapdragon X Elite 45 TOPS Hexagon NPU drivers\n` +
          `- [x] Enforce zero-data-egress policy for confidential IP\n` +
          `- [ ] Ingest all departmental PDF/DOCX files into local vector index\n` +
          `- [ ] Complete offline battery rundown tests (Target: >22 hours)\n` +
          `- [ ] Distribute NEXUS Local Workspace to security engineering team\n\n` +
          `*Generated locally in 18ms via Snapdragon AI Engine.*`;
      } else if (selectedTool.id === 'project-brief') {
        result = `### Project Brief: On-Device Enterprise Intelligence Rollout\n\n` +
          `**Objective**: Equip enterprise HP laptops with localized AI capabilities running directly on Snapdragon hardware.\n` +
          `**Key Benefits**: Total privacy, sub-15ms latency, offline reliability, zero per-seat subscription cost.\n` +
          `**Hardware Target**: HP OmniBook X / EliteBook Ultra (Snapdragon X Elite, 32GB RAM).\n` +
          `**Milestones**: Q3 Validation → Q4 Deployment → Enterprise Audit Complete.`;
      } else if (selectedTool.id === 'concise-notes') {
        result = `### Concise Notes Summary\n\n` +
          `• **Core Platform**: Qualcomm Snapdragon X Elite (Oryon CPU, Adreno GPU, 45 TOPS Hexagon NPU)\n` +
          `• **Privacy**: 100% on-device inference; zero API leakage; meets HIPAA/GDPR standards\n` +
          `• **Performance**: 28.5 to 36.2 tokens/sec; sub-15ms time-to-first-token\n` +
          `• **Power**: Sustained 3.9W-4.8W power draw; fanless or whisper-quiet operation`;
      } else {
        result = `### ${selectedTool.name} Output\n\n` +
          `Here is the synthesized analysis processed locally on your Snapdragon PC:\n\n` +
          `The core objective centers around transitioning compute-heavy AI tasks to on-device accelerators. By executing inference directly on the 45 TOPS Hexagon NPU, confidential data never leaves the local perimeter. Furthermore, users maintain high productivity without incurring cloud subscription costs or experiencing network latency.\n\n` +
          `*Inference status: Local Hexagon NPU · 14.2 ms latency · 100% private.*`;
      }

      setOutput(result);
      setIsGenerating(false);
    }, 450);
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-neutral-800 border border-neutral-700 text-red-400">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">AI Productivity Tools</h2>
              <p className="text-xs text-neutral-400">
                1-click on-device workflows powered by Snapdragon AI Engine
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content Body: Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 overflow-hidden flex-1">
          {/* Left Column: Tool Selector */}
          <div className="md:col-span-4 border-r border-neutral-800 p-4 overflow-y-auto space-y-1.5 bg-neutral-950/40">
            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider px-2">
              Available Tools
            </span>
            {TOOLS.map((tool) => {
              const isSelected = selectedTool.id === tool.id;
              return (
                <button
                  key={tool.id}
                  onClick={() => setSelectedTool(tool)}
                  className={`w-full text-left p-2.5 rounded-lg text-xs transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-neutral-800 border border-neutral-700 text-white shadow-xs'
                      : 'hover:bg-neutral-900 text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {tool.icon}
                    <span className="font-semibold">{tool.name}</span>
                  </div>
                  <p className="text-[11px] text-neutral-500 line-clamp-1">
                    {tool.desc}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Execution Canvas */}
          <div className="md:col-span-8 p-6 overflow-y-auto flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              {/* Selected Tool Details */}
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    {selectedTool.icon}
                    {selectedTool.name}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">{selectedTool.desc}</p>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-neutral-800 border border-neutral-700/60 text-[11px] font-mono text-emerald-400">
                  <Cpu className="h-3 w-3" />
                  <span>Hexagon NPU</span>
                </div>
              </div>

              {/* Source Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-neutral-400 font-medium mb-1.5">
                    Select Target Document
                  </label>
                  <select
                    value={selectedDocId}
                    onChange={(e) => setSelectedDocId(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-md px-3 py-2 text-neutral-200 focus:outline-hidden focus:border-red-500/60"
                  >
                    {documents.map((doc) => (
                      <option key={doc.id} value={doc.id}>
                        {doc.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-400 font-medium mb-1.5">
                    Execution Mode
                  </label>
                  <div className="w-full bg-neutral-950 border border-neutral-800 rounded-md px-3 py-2 text-neutral-300 font-mono text-[11px] flex items-center justify-between">
                    <span>Snapdragon AI Hub / W4A16</span>
                    <span className="text-emerald-400">On-Device</span>
                  </div>
                </div>
              </div>

              {/* Optional Custom Input */}
              <div>
                <label className="block text-xs text-neutral-400 font-medium mb-1.5">
                  Or Paste Custom Text (Optional)
                </label>
                <textarea
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="Paste text here to run this tool on custom content, or leave blank to use the selected document above..."
                  className="w-full h-20 bg-neutral-950 border border-neutral-800 rounded-md p-2.5 text-xs text-neutral-200 placeholder:text-neutral-600 focus:outline-hidden focus:border-red-500/60 resize-none font-mono"
                />
              </div>

              {/* Action Button */}
              <button
                onClick={handleExecute}
                disabled={isGenerating}
                className="w-full py-2.5 rounded-lg bg-red-600 hover:bg-red-500 disabled:bg-neutral-800 text-white font-medium text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    <span>Processing on Hexagon NPU...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Run {selectedTool.name} Locally</span>
                  </>
                )}
              </button>

              {/* Output Display */}
              {output && (
                <div className="mt-4 p-4 rounded-lg bg-neutral-950 border border-neutral-800 space-y-2 relative">
                  <div className="flex items-center justify-between text-xs text-neutral-400 pb-2 border-b border-neutral-800/60">
                    <span className="font-semibold text-neutral-200">Generated Result</span>
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer text-[11px]"
                    >
                      {hasCopied ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="text-xs text-neutral-300 font-mono whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                    {output}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
