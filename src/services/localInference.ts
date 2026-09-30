import { ChatMessage, DocumentItem } from '../types';
import { executeInference } from './llmInferenceService';

export interface InferenceOptions {
  userQuery: string;
  documents: DocumentItem[];
  selectedModelName: string;
  useCloudFallback: boolean;
  onChunk?: (partialText: string) => void;
}

export async function generateLocalResponse(options: InferenceOptions): Promise<ChatMessage> {
  return executeInference({
    prompt: options.userQuery,
    documents: options.documents,
    selectedModelName: options.selectedModelName,
    useCloudFallback: options.useCloudFallback,
    isDemoMode: false,
    onStreamChunk: options.onChunk
  });
}
