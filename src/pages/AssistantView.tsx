import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Trash2, 
  Cpu, 
  ShieldCheck, 
  AlertTriangle, 
  Sparkles, 
  FileText, 
  CloudOff,
  Cloud,
  ArrowRight,
  Info
} from 'lucide-react';
import { ChatMessage, Citation, DocumentItem, AIModel } from '../types';
import { ModelRouterIndicator } from '../components/ModelRouterIndicator';
import { RouteDecision } from '../services/modelRouter';

interface AssistantViewProps {
  messages: ChatMessage[];
  onSendMessage: (query: string) => void;
  onClearHistory: () => void;
  isGenerating: boolean;
  activeRouteDecision: RouteDecision | null;
  onSelectCitation: (citation: Citation) => void;
  models: AIModel[];
  selectedModelId: string;
  onSelectModel: (modelId: string) => void;
  useCloudFallback: boolean;
  onToggleCloudFallback: () => void;
  documents: DocumentItem[];
  isDemoMode: boolean;
}

export const AssistantView: React.FC<AssistantViewProps> = ({
  messages,
  onSendMessage,
  onClearHistory,
  isGenerating,
  activeRouteDecision,
  onSelectCitation,
  models,
  selectedModelId,
  onSelectModel,
  useCloudFallback,
  onToggleCloudFallback,
  documents,
  isDemoMode
}) => {
  const [inputPrompt, setInputPrompt] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedModel = models.find(m => m.id === selectedModelId) || models[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isGenerating]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPrompt.trim() || isGenerating) return;
    onSendMessage(inputPrompt);
    setInputPrompt('');
  };

  const handleSuggestedPrompt = (prompt: string) => {
    if (isGenerating) return;
    onSendMessage(prompt);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 h-[calc(100vh-4rem)] flex flex-col justify-between">
      
      {/* Top Controller Bar: Model Selector & Truthful Mode */}
      <div className="pb-3 border-b border-neutral-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <span>Local AI Assistant</span>
              <span className="text-neutral-500">·</span>
              <span className="text-xs text-neutral-400 font-mono">
                {isDemoMode ? 'Snapdragon Hexagon NPU Profile' : 'Local In-Browser Engine'}
              </span>
            </h1>
            <p className="text-xs text-neutral-400">
              Conversational reasoning grounded exclusively in your {documents.length} local document(s)
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Model Selector Dropdown */}
            <div className="relative">
              <select
                value={selectedModelId}
                onChange={(e) => onSelectModel(e.target.value)}
                disabled={useCloudFallback}
                className="bg-neutral-900 border border-neutral-800 text-neutral-200 text-xs rounded-lg px-3 py-1.5 pr-8 focus:outline-hidden focus:border-red-500/70 disabled:opacity-50 cursor-pointer"
              >
                {models.filter(m => m.task.includes('LLM')).map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name} {model.status === 'UNAVAILABLE' ? '(Unavailable in browser)' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear history */}
            <button
              onClick={onClearHistory}
              className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              title="Clear conversation history"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Small Status Line: Processing locally vs Cloud fallback */}
        <div className="flex items-center justify-between">
          {useCloudFallback ? (
            <div className="flex items-center gap-2 text-xs text-amber-400 font-mono">
              <Cloud className="h-3.5 w-3.5 text-amber-400" />
              <span>Status: Cloud fallback</span>
              <span className="text-neutral-500 text-[11px]">(Data egress active)</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>Status: Processing locally</span>
              <span className="text-neutral-500 text-[11px]">(Zero cloud egress)</span>
            </div>
          )}

          {selectedModel.status === 'UNAVAILABLE' && !isDemoMode && (
            <span className="text-[11px] font-mono text-amber-400">
              Notice: Native AI Hub model requires Snapdragon QNN driver. Running local browser fallback.
            </span>
          )}
        </div>
      </div>

      {/* Model Router Status Display */}
      <ModelRouterIndicator
        decision={activeRouteDecision}
        isProcessing={isGenerating}
      />

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
            <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 text-red-500">
              <Cpu className="h-8 w-8" />
            </div>
            <div className="space-y-1 max-w-md">
              <h3 className="text-base font-bold text-white">
                NEXUS Local Assistant Ready
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Ask questions about your uploaded documents. Responses cite source files and indicate 
                the exact model and execution target used.
              </p>
            </div>

            <div className="w-full max-w-md space-y-2 pt-2 text-left">
              <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block text-center">
                Suggested Inquiries
              </span>
              <button
                onClick={() => handleSuggestedPrompt('Summarize all my uploaded project documents.')}
                className="w-full p-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-xs text-neutral-200 transition-colors cursor-pointer text-left flex items-center justify-between group"
              >
                <span>“Summarize all my uploaded project documents.”</span>
                <ArrowRight className="h-3 w-3 text-neutral-500 group-hover:text-red-400 transition-colors" />
              </button>
              <button
                onClick={() => handleSuggestedPrompt('What are the project risks related to deployment?')}
                className="w-full p-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-xs text-neutral-200 transition-colors cursor-pointer text-left flex items-center justify-between group"
              >
                <span>“What are the project risks related to deployment?”</span>
                <ArrowRight className="h-3 w-3 text-neutral-500 group-hover:text-red-400 transition-colors" />
              </button>
              <button
                onClick={() => handleSuggestedPrompt('Explain how Snapdragon heterogeneous compute partitions AI tasks.')}
                className="w-full p-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-xs text-neutral-200 transition-colors cursor-pointer text-left flex items-center justify-between group"
              >
                <span>“Explain how Snapdragon heterogeneous compute partitions AI tasks.”</span>
                <ArrowRight className="h-3 w-3 text-neutral-500 group-hover:text-red-400 transition-colors" />
              </button>
            </div>
          </div>
        ) : (
          messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1.5`}
              >
                {/* Sender badge & execution target */}
                <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-[11px] font-mono text-neutral-500 px-1">
                  <span className="font-semibold text-neutral-300">
                    {isUser ? 'You' : msg.modelUsed || 'NEXUS Engine'}
                  </span>
                  <span>·</span>
                  <span>{msg.timestamp}</span>
                  {!isUser && msg.processingMode && (
                    <>
                      <span>·</span>
                      <span className={msg.processingMode.includes('Cloud') ? 'text-amber-400' : 'text-emerald-400'}>
                        {msg.processingMode}
                      </span>
                    </>
                  )}
                  {!isUser && msg.latencyMs && (
                    <>
                      <span>·</span>
                      <span className="text-neutral-400">
                        {msg.isMeasured ? `Measured: ${msg.latencyMs}ms` : `Demo: ${msg.latencyMs}ms`}
                      </span>
                    </>
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={`p-4 rounded-xl text-xs leading-relaxed max-w-3xl whitespace-pre-wrap ${
                    isUser
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'bg-neutral-900 border border-neutral-800 text-neutral-200 font-sans'
                  }`}
                >
                  {/* Streaming State Header for Assistant */}
                  {!isUser && (
                    <div className="mb-2 pb-1.5 border-b border-neutral-800 flex items-center justify-between text-[10px] font-mono">
                      <div className="flex items-center gap-1.5">
                        {msg.isStreaming ? (
                          !msg.content ? (
                            <span className="text-amber-400 animate-pulse font-semibold flex items-center gap-1">
                              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
                              Thinking / Generating...
                            </span>
                          ) : (
                            <span className="text-sky-400 animate-pulse font-semibold flex items-center gap-1">
                              <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-ping" />
                              Streaming response...
                            </span>
                          )
                        ) : (
                          <span className="text-emerald-400 font-semibold flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            Complete
                          </span>
                        )}
                      </div>

                      <span className="text-neutral-500">
                        {msg.sourceDocument ? `Context: ${msg.sourceDocument}` : 'Workspace Grounded'}
                      </span>
                    </div>
                  )}

                  <div>
                    {msg.content}
                    {msg.isStreaming && <span className="inline-block animate-pulse text-red-500 ml-0.5">▍</span>}
                  </div>

                  {/* Mandatory Technical Footer */}
                  {!isUser && !msg.isStreaming && (
                    <>
                      <div className="mt-3 pt-2.5 border-t border-neutral-800 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-mono">
                        <div>
                          <span className="text-neutral-500 uppercase block text-[9px]">MODEL</span>
                          <span className="text-white font-bold truncate block">{msg.modelUsed || 'Llama 3.2 3B Instruct'}</span>
                        </div>
                        <div>
                          <span className="text-neutral-500 uppercase block text-[9px]">SOURCE</span>
                          <span className="text-neutral-300 font-bold truncate block">{msg.sourceProvenance || 'Qualcomm AI Hub'}</span>
                        </div>
                        <div>
                          <span className="text-neutral-500 uppercase block text-[9px]">EXECUTION</span>
                          <span className="text-emerald-400 font-bold truncate block">
                            {msg.isRuntimeUnavailable || isDemoMode
                              ? 'Demo Mode'
                              : msg.executionMode || 'Live — CPU Execution'}
                          </span>
                        </div>
                        <div>
                          <span className="text-neutral-500 uppercase block text-[9px]">RUNTIME</span>
                          <span className="text-neutral-300 font-bold truncate block">
                            {msg.runtimeState || (isDemoMode ? 'DEMO MODE' : 'LIVE — CPU')}
                          </span>
                        </div>
                      </div>

                      {/* Fallback Notice if Native Qualcomm Runtime is Unavailable */}
                      {(msg.isRuntimeUnavailable || (!isDemoMode && !msg.processingMode?.includes('Cloud'))) && (
                        <div className="mt-2 p-2 rounded bg-neutral-950/80 border border-neutral-800 text-[10px] font-mono text-neutral-400 flex items-center gap-1.5">
                          <Info className="h-3 w-3 text-amber-400 shrink-0" />
                          <span>Native Qualcomm runtime is unavailable in this browser environment.</span>
                        </div>
                      )}

                      {/* Clear DEMO DATA Badge in Demo Mode */}
                      {(isDemoMode || msg.processingMode?.includes('Demo')) && (
                        <div className="mt-1.5 flex items-center gap-1.5">
                          <span className="px-1.5 py-0.5 rounded bg-red-600 text-white font-mono font-bold text-[9px]">
                            DEMO DATA
                          </span>
                          <span className="text-[10px] text-neutral-400 font-mono">
                            Simulated target profile. Not a measured on-device benchmark.
                          </span>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Citations Box */}
                {!isUser && msg.citations && msg.citations.length > 0 && !msg.isStreaming && (
                  <div className="w-full max-w-3xl pt-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider block">
                        Sources ({msg.citations.length})
                      </span>
                      <span className="text-[10px] font-mono text-neutral-500">
                        Document-Aware Grounding
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {msg.citations.map((cit, idx) => (
                        <button
                          key={idx}
                          onClick={() => onSelectCitation(cit)}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-950 hover:bg-neutral-850 border border-neutral-800 text-xs text-neutral-300 hover:text-white transition-colors cursor-pointer group"
                        >
                          <FileText className="h-3 w-3 text-red-400" />
                          <span className="font-medium truncate max-w-[200px]">{cit.documentName}</span>
                          <span className="text-[10px] font-mono text-neutral-400">({cit.section})</span>
                          <span className="text-[10px] font-mono text-emerald-400">
                            {(cit.relevanceScore * 100).toFixed(0)}%
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}

        {isGenerating && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-400 animate-pulse">
            <Cpu className="h-4 w-4 text-red-500 animate-spin" />
            <span>Processing query locally in client memory...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="pt-3 border-t border-neutral-800">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            disabled={isGenerating}
            placeholder="Ask about your documents or Snapdragon architecture..."
            className="flex-1 px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-100 placeholder:text-neutral-500 focus:outline-hidden focus:border-red-500/70"
          />
          <button
            type="submit"
            disabled={!inputPrompt.trim() || isGenerating}
            className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 disabled:bg-neutral-800 text-white font-medium text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span>Send</span>
            <Send className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>

    </div>
  );
};
