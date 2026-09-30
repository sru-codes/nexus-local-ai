import { ChatMessage, DocumentItem } from '../types';
import { llamaModelAdapter } from './llamaModelAdapter';

export interface LLMRequestOptions {
  prompt: string;
  documents: DocumentItem[];
  selectedModelName: string;
  useCloudFallback: boolean;
  isDemoMode: boolean;
  onStreamChunk?: (chunk: string) => void;
}

export async function executeInference(options: LLMRequestOptions): Promise<ChatMessage> {
  const { prompt, documents, useCloudFallback, isDemoMode, onStreamChunk } = options;

  return llamaModelAdapter.generate({
    prompt,
    documents,
    isDemoMode,
    useCloudFallback,
    onStreamChunk
  });
}

