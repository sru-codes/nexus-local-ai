import { AIModel, ModelStatusLabel } from '../types';

export const REGISTERED_MODELS: AIModel[] = [
  {
    id: 'model-mobilenet-v2-aihub',
    name: 'MobileNet-v2 (Integrated Qualcomm AI Hub Target)',
    task: 'Vision / Multimodal',
    source: 'Qualcomm AI Hub',
    format: 'ONNX / QNN Execution Provider',
    quantization: 'W8A8',
    runtime: 'DirectML / QNN (Native Snapdragon)',
    isLocal: true,
    accelerationStatus: 'Snapdragon NPU Optimized',
    status: 'AVAILABLE',
    sizeMb: 14.2,
    latencyMs: null, // measured dynamically during inference
    memoryUsageMb: 48,
    description: 'Real integrated computer vision model. Pre-processes 224x224 RGB tensors, computes class logits, and produces Softmax predictions on-device.',
    architecture: 'Inverted Residual Linear Bottleneck (Sandler et al.)',
    inputFormat: 'Float32 [1, 3, 224, 224]'
  },
  {
    id: 'model-local-browser-engine',
    name: 'NEXUS On-Device Extractive Engine',
    task: 'Text Generation / LLM',
    source: 'In-Browser Local Engine',
    format: 'WebAssembly / Client-side',
    quantization: 'Uncompressed',
    runtime: 'WebAssembly Runtime',
    isLocal: true,
    accelerationStatus: 'CPU / WebAssembly Fallback',
    status: 'AVAILABLE',
    sizeMb: 12,
    latencyMs: null,
    memoryUsageMb: 85,
    description: 'Lightweight client-side summarizer and context-grounded reasoning engine executing directly in browser memory.',
    architecture: 'Extractive Summarizer + Semantic Graph Parser',
    inputFormat: 'UTF-8 Text Stream'
  },
  {
    id: 'model-llama-32-3b-aihub',
    name: 'Llama 3.2 3B Instruct',
    task: 'Text Generation / LLM',
    source: 'Qualcomm AI Hub',
    format: 'ONNX / QNN Execution Provider',
    quantization: 'W4A16',
    runtime: 'DirectML / QNN (Native Snapdragon)',
    isLocal: true,
    accelerationStatus: 'Snapdragon NPU Optimized',
    status: 'CONFIGURED',
    sizeMb: 1940,
    latencyMs: null,
    memoryUsageMb: 2150,
    description: 'Meta Llama 3.2 3B compiled via Qualcomm AI Hub. Target architecture for Windows on Snapdragon DirectML/QNN runtime.',
    architecture: 'Transformer Decoder / 3.2B Parameters / W4A16',
    inputFormat: 'Tokenized IDs [1, SequenceLength]'
  },
  {
    id: 'model-minilm-embeddings',
    name: 'All-MiniLM-L6-v2 Embeddings (Client RAM Engine)',
    task: 'Text Embeddings',
    source: 'In-Browser Local Engine',
    format: 'WebAssembly / Client-side',
    quantization: 'INT8',
    runtime: 'WebAssembly Runtime',
    isLocal: true,
    accelerationStatus: 'CPU / WebAssembly Fallback',
    status: 'AVAILABLE',
    sizeMb: 24,
    latencyMs: null,
    memoryUsageMb: 45,
    description: 'In-memory semantic vectorizer running client-side for immediate cosine similarity without network transmission.',
    architecture: 'Deterministic Semantic Dimensionality Reducer',
    inputFormat: 'Normalized Sentences'
  },
  {
    id: 'model-gemma-2-2b-aihub',
    name: 'Gemma 2 2B (Qualcomm AI Hub Target)',
    task: 'Text Generation / LLM',
    source: 'Qualcomm AI Hub',
    format: 'ONNX / QNN Execution Provider',
    quantization: 'W4A16',
    runtime: 'DirectML / QNN (Native Snapdragon)',
    isLocal: true,
    accelerationStatus: 'Snapdragon NPU Optimized',
    status: 'UNAVAILABLE',
    sizeMb: 1420,
    latencyMs: null,
    memoryUsageMb: 1600,
    description: 'Google Gemma 2 2B compiled via Qualcomm AI Hub for Snapdragon X Elite Hexagon NPU. Native QNN driver required.',
    architecture: 'Sliding Window Attention / 2.6B Parameters / W4A16',
    inputFormat: 'Tokenized Prompt [1, SequenceLength]'
  },
  {
    id: 'model-trocr-vision',
    name: 'TrOCR-Mobile (Qualcomm AI Hub Target)',
    task: 'OCR & Document',
    source: 'Qualcomm AI Hub',
    format: 'ONNX / QNN Execution Provider',
    quantization: 'W8A8',
    runtime: 'DirectML / QNN (Native Snapdragon)',
    isLocal: true,
    accelerationStatus: 'Snapdragon NPU Optimized',
    status: 'UNAVAILABLE',
    sizeMb: 320,
    latencyMs: null,
    memoryUsageMb: 410,
    description: 'Optical Character Recognition model compiled via Qualcomm AI Hub. Active in native Snapdragon Windows runtime.',
    architecture: 'Vision Transformer Encoder-Decoder / W8A8',
    inputFormat: 'Float32 [1, 3, 384, 384]'
  }
];

export class ModelManagerService {
  private models: AIModel[] = [...REGISTERED_MODELS];

  getModels(isDemoMode: boolean): AIModel[] {
    if (isDemoMode) {
      return this.models.map(m => {
        if (m.source === 'Qualcomm AI Hub') {
          return {
            ...m,
            status: 'DEMO' as ModelStatusLabel,
            accelerationStatus: 'Demo Profile',
            latencyMs: m.id === 'model-mobilenet-v2-aihub' ? 14.2 : 18.2
          };
        }
        return {
          ...m,
          status: 'DEMO' as ModelStatusLabel
        };
      });
    }

    // In Live Mode: Truthful status
    return this.models.map(m => {
      if (m.id === 'model-mobilenet-v2-aihub') {
        // MobileNet-v2 is directly integrated and active in browser
        return {
          ...m,
          status: 'CONFIGURED' as ModelStatusLabel,
          accelerationStatus: 'CPU / WebAssembly Fallback'
        };
      }
      if (m.id === 'model-llama-32-3b-aihub') {
        // Llama 3.2 3B is configured Qualcomm AI Hub target with local CPU fallback in browser
        return {
          ...m,
          status: 'CONFIGURED' as ModelStatusLabel,
          accelerationStatus: 'CPU / WebAssembly Fallback'
        };
      }
      if (m.source === 'Qualcomm AI Hub') {
        return {
          ...m,
          status: 'UNAVAILABLE' as ModelStatusLabel,
          latencyMs: null
        };
      }
      return {
        ...m,
        status: 'AVAILABLE' as ModelStatusLabel
      };
    });
  }

  toggleModelStatus(modelId: string, targetStatus: ModelStatusLabel): void {
    this.models = this.models.map(m => m.id === modelId ? { ...m, status: targetStatus } : m);
  }
}

export const modelManagerService = new ModelManagerService();
