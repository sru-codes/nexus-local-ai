import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  MessageSquare, 
  ShieldCheck, 
  Cpu, 
  UploadCloud, 
  ArrowRight, 
  CheckSquare, 
  ListChecks, 
  Briefcase, 
  Activity,
  Info
} from 'lucide-react';
import { DocumentItem, ChatMessage, TelemetryData } from '../types';

interface WorkspaceDashboardProps {
  documents: DocumentItem[];
  recentMessages: ChatMessage[];
  telemetry: TelemetryData;
  onNavigateTab: (tabId: string) => void;
  onOpenQuickTools: () => void;
  onFileUpload: (files: FileList) => void;
  onSelectDocument: (docId: string) => void;
  isDemoMode: boolean;
}

export const WorkspaceDashboard: React.FC<WorkspaceDashboardProps> = ({
  documents,
  recentMessages,
  telemetry,
  onNavigateTab,
  onOpenQuickTools,
  onFileUpload,
  onSelectDocument,
  isDemoMode
}) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileUpload(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e.target.files);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Top Banner: Local AI Status & Privacy */}
      <div className="p-4 sm:p-5 rounded-xl bg-neutral-900/90 border border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 shrink-0">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white tracking-tight">
                LOCAL AI ACTIVE
              </h2>
              <span className="text-neutral-500">·</span>
              <span className="text-xs text-emerald-400 font-mono">Privacy: Local-first architecture</span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              “Your files can remain on your device during supported local workflows.” Ingestion and vector queries execute in client memory.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-neutral-400 font-mono">Snapdragon Acceleration</p>
            <p className="text-xs font-bold text-white font-mono flex items-center gap-1 justify-end">
              <Cpu className="h-3.5 w-3.5 text-red-500" />
              <span>{isDemoMode ? 'Target NPU Profile (Demo)' : 'CPU / WebAssembly Fallback'}</span>
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('performance')}
            className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 text-xs font-medium transition-colors cursor-pointer"
          >
            Diagnostics
          </button>
        </div>
      </div>

      {/* Main Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Quick Actions & Assistant Ingestion */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Quick AI Productivity Actions */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-red-500" />
                <h3 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                  Quick AI Actions (On-Device)
                </h3>
              </div>
              <button
                onClick={onOpenQuickTools}
                className="text-xs text-red-400 hover:text-red-300 font-medium transition-colors cursor-pointer"
              >
                Open Full Studio →
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                onClick={onOpenQuickTools}
                className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-850 text-left transition-all cursor-pointer group"
              >
                <FileText className="h-4 w-4 text-red-400 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-neutral-200 block">Summarize</span>
                <span className="text-[11px] text-neutral-500 block truncate">Executive brief</span>
              </button>

              <button
                onClick={onOpenQuickTools}
                className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-850 text-left transition-all cursor-pointer group"
              >
                <CheckSquare className="h-4 w-4 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-neutral-200 block">Action Items</span>
                <span className="text-[11px] text-neutral-500 block truncate">Extract tasks</span>
              </button>

              <button
                onClick={onOpenQuickTools}
                className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-850 text-left transition-all cursor-pointer group"
              >
                <ListChecks className="h-4 w-4 text-sky-400 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-neutral-200 block">Checklist</span>
                <span className="text-[11px] text-neutral-500 block truncate">Operational tasks</span>
              </button>

              <button
                onClick={onOpenQuickTools}
                className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-850 text-left transition-all cursor-pointer group"
              >
                <Briefcase className="h-4 w-4 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-neutral-200 block">Project Brief</span>
                <span className="text-[11px] text-neutral-500 block truncate">Charter draft</span>
              </button>
            </div>
          </div>

          {/* Drag & Drop Document Ingestion Box */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
              dragActive 
                ? 'border-red-500 bg-red-950/20' 
                : 'border-neutral-800 bg-neutral-900/40 hover:border-neutral-700'
            }`}
          >
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="p-3 rounded-full bg-neutral-800 text-neutral-400">
                <UploadCloud className="h-6 w-6 text-red-500" />
              </div>
              <p className="text-sm font-semibold text-neutral-200">
                Drop documents to process locally
              </p>
              <p className="text-xs text-neutral-500 max-w-sm">
                Supports PDF, DOCX, TXT, Markdown, CSV and images. Vectorized in local client RAM.
              </p>
              <label className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium transition-colors cursor-pointer">
                <span>Browse Local Files</span>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Quick AI Assistant Card */}
          <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-sky-400" />
                <h3 className="text-xs font-semibold text-neutral-200 uppercase tracking-wider">
                  Local AI Assistant
                </h3>
              </div>
              <button
                onClick={() => onNavigateTab('assistant')}
                className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Full Chat View</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            {/* Recent Message preview */}
            {recentMessages.length > 0 ? (
              <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800/80 text-xs space-y-2">
                <div className="flex items-center justify-between text-neutral-500 text-[11px] font-mono">
                  <span>Last response from {recentMessages[recentMessages.length - 1].modelUsed}</span>
                  <span className="text-emerald-400">{recentMessages[recentMessages.length - 1].processingMode}</span>
                </div>
                <p className="text-neutral-300 line-clamp-3 leading-relaxed">
                  {recentMessages[recentMessages.length - 1].content}
                </p>
              </div>
            ) : (
              <p className="text-xs text-neutral-400 leading-relaxed">
                Ask questions across all indexed files. The assistant provides grounded answers with source citations.
              </p>
            )}

            <div className="flex flex-wrap gap-2 text-xs">
              <button
                onClick={() => onNavigateTab('assistant')}
                className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-750 text-neutral-300 text-xs transition-colors cursor-pointer"
              >
                “Summarize all project documents”
              </button>
              <button
                onClick={() => onNavigateTab('assistant')}
                className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-750 text-neutral-300 text-xs transition-colors cursor-pointer"
              >
                “What are deployment risks in the security report?”
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Indexed Documents & Activity */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Document Intelligence Card */}
          <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
              <h3 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                Indexed Documents ({documents.length})
              </h3>
              <button
                onClick={() => onNavigateTab('documents')}
                className="text-xs text-red-400 hover:text-red-300 font-medium transition-colors cursor-pointer"
              >
                Manage →
              </button>
            </div>

            <div className="space-y-2">
              {documents.slice(0, 4).map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => {
                    onSelectDocument(doc.id);
                    onNavigateTab('documents');
                  }}
                  className="p-2.5 rounded-lg bg-neutral-950/70 hover:bg-neutral-850 border border-neutral-800/80 transition-colors cursor-pointer text-left space-y-1"
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-neutral-200">
                    <span className="truncate max-w-[190px]">{doc.name}</span>
                    <span className="text-[10px] font-mono uppercase text-red-400 bg-red-950/60 px-1.5 py-0.5 rounded">
                      {doc.type}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 line-clamp-1">
                    {doc.summary || 'Indexed in local RAM.'}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-neutral-500 font-mono pt-1">
                    <span>{(doc.size / 1024).toFixed(0)} KB</span>
                    <span className="text-emerald-400">{doc.processingMode.split(' ')[0]} ({doc.processingTimeMs}ms)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Local Activity Log */}
          <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-3">
            <h3 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider pb-2 border-b border-neutral-800">
              Runtime Diagnostics
            </h3>
            
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5 text-neutral-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <div>
                  <p className="text-neutral-200 font-medium">Local Vector Index Active</p>
                  <p className="text-[11px] text-neutral-500 font-mono">In-Memory Embeddings · Zero Egress</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-neutral-300">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                <div>
                  <p className="text-neutral-200 font-medium">Model Router Ready</p>
                  <p className="text-[11px] text-neutral-500 font-mono">
                    {isDemoMode ? 'Snapdragon X Elite Target' : 'Local In-Browser Runtime'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-neutral-300">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                <div>
                  <p className="text-neutral-200 font-medium">Privacy Architecture Verified</p>
                  <p className="text-[11px] text-neutral-500 font-mono">No mandatory cloud upload</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
