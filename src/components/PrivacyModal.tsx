import React from 'react';
import { X, ShieldCheck, Lock, HardDrive, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-800/60 text-emerald-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Local-First Architecture & Data Privacy</h2>
              <p className="text-xs text-neutral-400">
                Transparent disclosure of local vs optional cloud data flows
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

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-neutral-300">
          
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Lock className="h-3.5 w-3.5 text-red-500" />
              Core Principle: Local-First AI
            </h3>
            <p className="leading-relaxed text-neutral-400">
              “Your files can remain on your device during supported local workflows.”
            </p>
            <p className="leading-relaxed text-neutral-400">
              When using NEXUS in Local AI mode, uploaded documents (PDF, DOCX, TXT, CSV) are parsed, 
              chunked, and vectorized strictly within your device's memory. No background telemetry or 
              document snippets are transmitted to external servers.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              What Happens to Your Data
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1.5">
                <span className="font-bold text-neutral-200 block flex items-center gap-1.5">
                  <HardDrive className="h-3.5 w-3.5 text-emerald-400" />
                  Local Ingestion
                </span>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  Documents are stored temporarily in browser memory / client IndexedDB. You can purge them at any time by deleting them in the Documents tab.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1.5">
                <span className="font-bold text-neutral-200 block flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  On-Device Embeddings
                </span>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  Vector coordinates for semantic search are computed mathematically in local RAM. They never touch a remote vector database.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 space-y-2 text-neutral-300">
            <h4 className="font-bold text-amber-300 flex items-center gap-1.5 text-xs">
              <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
              Cloud Services Are Optional Where Configured
            </h4>
            <p className="text-[11px] text-neutral-400 leading-relaxed">
              If you explicitly activate the optional Cloud Fallback toggle, your prompt will be sent over HTTPS 
              to an external API endpoint. When active, NEXUS displays an unambiguous amber banner: 
              <strong> CLOUD FALLBACK ACTIVE</strong>.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-[11px] text-neutral-500 font-mono">
            Compliance Note: NEXUS is architected for local data isolation. Formal HIPAA, FINRA, or GDPR certification requires an organizational deployment assessment on provisioned hardware.
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-3 border-t border-neutral-800 bg-neutral-950">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium transition-colors cursor-pointer"
          >
            Close Privacy Guide
          </button>
        </div>
      </div>
    </div>
  );
};
