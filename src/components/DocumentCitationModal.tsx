import React from 'react';
import { X, FileText, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Citation, DocumentItem } from '../types';

interface DocumentCitationModalProps {
  citation: Citation | null;
  document?: DocumentItem;
  onClose: () => void;
  onOpenDocument?: (docId: string) => void;
}

export const DocumentCitationModal: React.FC<DocumentCitationModalProps> = ({
  citation,
  document,
  onClose,
  onOpenDocument
}) => {
  if (!citation) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/60">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-800 border border-neutral-700/60 text-red-400">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white truncate max-w-md">
                {citation.documentName}
              </h3>
              <p className="text-xs text-neutral-400 font-mono">
                {citation.section} · Relevance: {Math.round(citation.relevanceScore * 100)}%
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

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-sm">
          {/* Privacy callout */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-950/20 border border-emerald-800/40 text-xs text-emerald-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <span>Processed locally on your device — Zero data transmitted externally</span>
            </div>
            <span className="font-mono text-emerald-500">Hexagon NPU Cache</span>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
              Verified Source Excerpt
            </h4>
            <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800 font-serif text-neutral-200 leading-relaxed text-sm">
              "{citation.snippet}"
            </div>
          </div>

          {document && (
            <div>
              <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                Executive Document Context
              </h4>
              <p className="text-xs text-neutral-300 leading-relaxed bg-neutral-950/50 p-3 rounded-lg border border-neutral-800/50">
                {document.executiveSummary || document.summary}
              </p>

              {document.keyPoints && document.keyPoints.length > 0 && (
                <div className="mt-3">
                  <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                    Extracted Local Key Points
                  </h4>
                  <ul className="space-y-1.5 text-xs text-neutral-300">
                    {document.keyPoints.slice(0, 3).map((kp, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-red-400 shrink-0 mt-0.5" />
                        <span>{kp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-neutral-800 bg-neutral-950/80">
          <span className="text-xs text-neutral-500 font-mono">
            Direct token cross-reference
          </span>
          <div className="flex items-center gap-2">
            {onOpenDocument && (
              <button
                onClick={() => {
                  onOpenDocument(citation.documentId);
                  onClose();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-neutral-800 hover:bg-neutral-700 text-white transition-colors cursor-pointer"
              >
                <span>View Full Document</span>
                <ExternalLink className="h-3 w-3" />
              </button>
            )}
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-medium rounded-md bg-neutral-700/50 hover:bg-neutral-700 text-neutral-200 transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
