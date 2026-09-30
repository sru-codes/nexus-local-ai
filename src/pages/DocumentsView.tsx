import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  Search, 
  Trash2, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Users, 
  Building, 
  Cpu, 
  Calendar, 
  MessageSquare,
  Clock,
  Layers,
  Info
} from 'lucide-react';
import { DocumentItem } from '../types';
import { performLocalVectorSearch } from '../services/vectorSearchService';

interface DocumentsViewProps {
  documents: DocumentItem[];
  selectedDocumentId: string;
  onSelectDocument: (id: string) => void;
  onDeleteDocument: (id: string) => void;
  onFileUpload: (files: FileList) => void;
  onAskAboutDocument: (docName: string, prompt: string) => void;
  isDemoMode: boolean;
}

export const DocumentsView: React.FC<DocumentsViewProps> = ({
  documents,
  selectedDocumentId,
  onSelectDocument,
  onDeleteDocument,
  onFileUpload,
  onAskAboutDocument,
  isDemoMode
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [questionInput, setQuestionInput] = useState('');
  const [activeTab, setActiveTab] = useState<'summary' | 'keypoints' | 'actions' | 'entities' | 'content'>('summary');

  const selectedDoc = documents.find(d => d.id === selectedDocumentId) || documents[0];

  // Vector search
  const searchResults = searchQuery.trim() 
    ? performLocalVectorSearch(searchQuery, documents) 
    : [];

  const handleAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionInput.trim() || !selectedDoc) return;
    onAskAboutDocument(selectedDoc.name, questionInput);
    setQuestionInput('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Top Header & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white tracking-tight">
              AI Document Intelligence
            </h1>
            <span className="text-neutral-500">·</span>
            <span className="text-xs font-mono text-emerald-400">Local-First Architecture</span>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">
            Local vector indexing, executive summaries, entity extraction, and semantic search
          </p>
        </div>

        {/* Upload Button */}
        <label className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs">
          <Upload className="h-4 w-4" />
          <span>Upload Document</span>
          <input
            type="file"
            multiple
            accept=".pdf,.docx,.txt,.md,.csv,image/*"
            onChange={(e) => e.target.files && onFileUpload(e.target.files)}
            className="hidden"
          />
        </label>
      </div>

      {/* Semantic Search Box */}
      <div className="relative">
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 h-4 w-4 text-neutral-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Semantic search across workspace (e.g. 'project risks related to deployment')..."
            className="w-full pl-10 pr-32 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-100 placeholder:text-neutral-500 text-xs focus:outline-hidden focus:border-red-500/70"
          />
          <div className="absolute right-3 flex items-center gap-1.5 px-2 py-0.5 rounded bg-neutral-800 border border-neutral-700/50 text-[10px] font-mono text-neutral-300">
            <Cpu className="h-3 w-3 text-red-500" />
            <span>Local Vector Match</span>
          </div>
        </div>

        {/* Search Results Preview */}
        {searchQuery.trim() && (
          <div className="mt-2 p-3 rounded-lg bg-neutral-900 border border-neutral-800 space-y-2 text-xs">
            <div className="flex items-center justify-between text-neutral-400 font-mono text-[11px]">
              <span>Found {searchResults.length} semantically relevant document{searchResults.length === 1 ? '' : 's'}</span>
              <span className="text-emerald-400">Cosine similarity in RAM</span>
            </div>
            {searchResults.map((res) => (
              <div
                key={res.document.id}
                onClick={() => {
                  onSelectDocument(res.document.id);
                  setSearchQuery('');
                }}
                className="p-2.5 rounded bg-neutral-950 hover:bg-neutral-850 border border-neutral-800/60 cursor-pointer flex items-center justify-between transition-colors"
              >
                <div>
                  <p className="font-semibold text-neutral-200">{res.document.name}</p>
                  <p className="text-[11px] text-neutral-400 line-clamp-1 italic">
                    "{res.matchingSnippets[0]}"
                  </p>
                </div>
                <span className="font-mono text-xs text-emerald-400 font-semibold shrink-0 ml-3">
                  Match: {(res.score * 100).toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Two-Column Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Documents List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between text-xs text-neutral-400 font-mono px-1">
            <span>DOCUMENTS ({documents.length})</span>
            <span>MEMORY CACHE</span>
          </div>

          <div className="space-y-2 max-h-[640px] overflow-y-auto pr-1">
            {documents.map((doc) => {
              const isSelected = selectedDoc?.id === doc.id;
              return (
                <div
                  key={doc.id}
                  onClick={() => onSelectDocument(doc.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? 'bg-neutral-900 border-red-500/50 shadow-md ring-1 ring-red-500/30'
                      : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-red-400 shrink-0" />
                      <span className="text-xs font-bold text-neutral-200 truncate max-w-[190px]">
                        {doc.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[10px] font-mono uppercase text-neutral-400 bg-neutral-800 px-1.5 py-0.5 rounded">
                        {doc.type}
                      </span>
                      {documents.length > 1 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteDocument(doc.id);
                          }}
                          className="text-neutral-500 hover:text-red-400 p-0.5 transition-colors cursor-pointer"
                          title="Delete from local cache"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed">
                    {doc.summary || doc.content.slice(0, 100)}
                  </p>

                  <div className="flex items-center justify-between text-[10px] font-mono pt-1 border-t border-neutral-800/60">
                    <span className="text-neutral-500">{(doc.size / 1024).toFixed(0)} KB</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3" />
                      <span>{doc.processingMode.split(' ')[0]} ({doc.processingTimeMs}ms)</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: In-Depth Document Intelligence Viewer */}
        {selectedDoc && (
          <div className="lg:col-span-8 bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-5">
            
            {/* Document Header & Execution Tag Requirement */}
            <div className="space-y-3 pb-4 border-b border-neutral-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-neutral-800 border border-neutral-700 text-red-400">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white tracking-tight">
                      {selectedDoc.name}
                    </h2>
                    <p className="text-xs text-neutral-500 font-mono">
                      Uploaded {selectedDoc.uploadedAt} · {(selectedDoc.size / 1024).toFixed(1)} KB · {selectedDoc.type.toUpperCase()}
                    </p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-emerald-400 text-xs font-semibold self-start sm:self-auto">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Processed locally on your device</span>
                </div>
              </div>

              {/* Requirement: Every AI response should show: MODEL, PROCESSING MODE, SOURCE DOCUMENT */}
              <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] font-mono">
                <div>
                  <span className="text-neutral-500 block text-[10px]">MODEL</span>
                  <span className="text-neutral-200 font-bold truncate block">
                    {isDemoMode ? 'Llama 3.2 3B (Target Profile)' : 'NEXUS Extractive Engine'}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[10px]">PROCESSING MODE</span>
                  <span className="text-emerald-400 font-bold truncate block">
                    {selectedDoc.processingMode}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[10px]">SOURCE DOCUMENT</span>
                  <span className="text-neutral-200 font-bold truncate block">
                    {selectedDoc.name}
                  </span>
                </div>
              </div>

              {/* Sub-tabs for intelligence components */}
              <div className="flex items-center gap-1 overflow-x-auto pt-1 text-xs">
                <button
                  onClick={() => setActiveTab('summary')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                    activeTab === 'summary' ? 'bg-neutral-800 text-white font-semibold' : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  Executive Summary
                </button>
                <button
                  onClick={() => setActiveTab('keypoints')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                    activeTab === 'keypoints' ? 'bg-neutral-800 text-white font-semibold' : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  Key Points
                </button>
                <button
                  onClick={() => setActiveTab('actions')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                    activeTab === 'actions' ? 'bg-neutral-800 text-white font-semibold' : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  Action Items
                </button>
                <button
                  onClick={() => setActiveTab('entities')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                    activeTab === 'entities' ? 'bg-neutral-800 text-white font-semibold' : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  Identified Entities
                </button>
                <button
                  onClick={() => setActiveTab('content')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                    activeTab === 'content' ? 'bg-neutral-800 text-white font-semibold' : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  Raw Ingested Text
                </button>
              </div>
            </div>

            {/* Tab Views */}
            <div className="space-y-4">
              {activeTab === 'summary' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                      Concise Executive Summary
                    </h3>
                    <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-200 text-xs sm:text-sm leading-relaxed">
                      {selectedDoc.executiveSummary || selectedDoc.summary}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                      Extractive Text Synthesis
                    </h3>
                    <p className="text-xs text-neutral-300 bg-neutral-950/60 p-3.5 rounded-lg border border-neutral-800/80 leading-relaxed font-mono">
                      {selectedDoc.summary}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'keypoints' && (
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                    Extracted Key Points
                  </h3>
                  <div className="space-y-2">
                    {(selectedDoc.keyPoints || []).map((point, index) => (
                      <div key={index} className="flex items-start gap-2.5 p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-200">
                        <CheckCircle2 className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'actions' && (
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                    Deliverable Action Items
                  </h3>
                  <div className="space-y-2">
                    {(selectedDoc.actionItems || []).map((action, index) => (
                      <div key={index} className="flex items-start gap-2.5 p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-200">
                        <span className="flex h-5 w-5 items-center justify-center rounded bg-red-950/80 border border-red-800/60 text-red-400 font-mono text-[10px] shrink-0 font-bold">
                          {index + 1}
                        </span>
                        <span className="leading-relaxed">{action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'entities' && (
                <div className="space-y-4">
                  <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                    Identified Topics & Entities
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-800 space-y-2">
                      <div className="flex items-center gap-2 text-neutral-400 font-semibold text-[11px] uppercase">
                        <Users className="h-3.5 w-3.5 text-sky-400" />
                        <span>People & Assignees</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {(selectedDoc.entities?.people || ['Local Ingested Author']).map((p, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 text-[11px]">
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-800 space-y-2">
                      <div className="flex items-center gap-2 text-neutral-400 font-semibold text-[11px] uppercase">
                        <Building className="h-3.5 w-3.5 text-amber-400" />
                        <span>Organizations</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {(selectedDoc.entities?.organizations || ['Enterprise Group']).map((o, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 text-[11px]">
                            {o}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-800 space-y-2">
                      <div className="flex items-center gap-2 text-neutral-400 font-semibold text-[11px] uppercase">
                        <Cpu className="h-3.5 w-3.5 text-red-400" />
                        <span>Technologies & Hardware</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {(selectedDoc.entities?.technologies || ['Local Memory Store']).map((t, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 text-[11px]">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-800 space-y-2">
                      <div className="flex items-center gap-2 text-neutral-400 font-semibold text-[11px] uppercase">
                        <Calendar className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Timeline & Dates</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {(selectedDoc.entities?.dates || ['Today']).map((d, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 text-[11px]">
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'content' && (
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                    Raw Ingested Text
                  </h3>
                  <pre className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-300 font-mono text-xs whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
                    {selectedDoc.content}
                  </pre>
                </div>
              )}
            </div>

            {/* Ask Questions About This Document Box */}
            <div className="pt-3 border-t border-neutral-800">
              <form onSubmit={handleAsk} className="flex gap-2">
                <input
                  type="text"
                  value={questionInput}
                  onChange={(e) => setQuestionInput(e.target.value)}
                  placeholder={`Ask a question about ${selectedDoc.name}...`}
                  className="flex-1 px-3.5 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-100 placeholder:text-neutral-500 focus:outline-hidden focus:border-red-500/70"
                />
                <button
                  type="submit"
                  disabled={!questionInput.trim()}
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 disabled:bg-neutral-800 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>Ask Local AI</span>
                </button>
              </form>
            </div>

          </div>
        )}
      </div>

    </div>
  );
};
