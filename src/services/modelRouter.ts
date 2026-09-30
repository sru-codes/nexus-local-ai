import { AIModel, ProcessingMode } from '../types';
import { REGISTERED_MODELS } from './modelManagerService';

export type TaskType = 
  | 'document_summary' 
  | 'image_analysis' 
  | 'semantic_search' 
  | 'ocr_extraction' 
  | 'conversational_rag' 
  | 'productivity_tool';

export interface RouteDecision {
  task: TaskType;
  model: AIModel;
  runtimeTarget: string;
  accelerationStatus: string;
  routeLog: string[];
  processingMode: ProcessingMode;
}

export function routeAITask(
  task: TaskType, 
  useCloudFallback: boolean, 
  isDemoMode: boolean
): RouteDecision {
  if (useCloudFallback) {
    const cloudModel: AIModel = {
      id: 'model-cloud-fallback',
      name: 'Cloud Fallback Server Endpoint',
      task: 'Text Generation / LLM',
      source: 'In-Browser Local Engine',
      format: 'WebAssembly / Client-side',
      quantization: 'Uncompressed',
      runtime: 'Browser Canvas / WebGL',
      isLocal: false,
      accelerationStatus: 'CPU / WebAssembly Fallback',
      status: 'CONFIGURED',
      sizeMb: 0,
      latencyMs: null,
      memoryUsageMb: 0,
      description: 'External cloud model fallback.',
      architecture: 'Cloud REST API'
    };

    return {
      task,
      model: cloudModel,
      runtimeTarget: 'External Cloud Server',
      accelerationStatus: 'Cloud Fallback Active (Data Egress Occurs)',
      routeLog: [
        'Model Router: Cloud fallback explicitly selected',
        'Warning: Zero-data-egress guarantee bypassed for this request',
        'Routing prompt via outbound REST connection'
      ],
      processingMode: 'Cloud Fallback (Optional)'
    };
  }

  if (isDemoMode) {
    // In Demo Mode, route to simulated Qualcomm AI Hub Snapdragon profiles
    switch (task) {
      case 'semantic_search':
        return {
          task,
          model: REGISTERED_MODELS[3],
          runtimeTarget: 'Hexagon NPU (Simulated Profile)',
          accelerationStatus: 'Snapdragon NPU Optimized (Demo Profile)',
          routeLog: [
            'Model Router: Detected semantic search query',
            'Selected Model: All-MiniLM-L6-v2 Embeddings (INT8)',
            'Target Runtime: Qualcomm Hexagon NPU Tensor Cores',
            'Processing Mode: Demo Mode (Snapdragon Profile)'
          ],
          processingMode: 'Demo Mode (Snapdragon Profile)'
        };
      case 'image_analysis':
      case 'ocr_extraction':
        return {
          task,
          model: REGISTERED_MODELS[4],
          runtimeTarget: 'Adreno GPU + Hexagon NPU (Simulated Profile)',
          accelerationStatus: 'Snapdragon AI Acceleration (Demo Profile)',
          routeLog: [
            'Model Router: Visual document & OCR task detected',
            'Selected Model: TrOCR-Mobile / MobileNetV4 (Qualcomm AI Hub Target)',
            'Target Runtime: Snapdragon AI Engine',
            'Processing Mode: Demo Mode (Snapdragon Profile)'
          ],
          processingMode: 'Demo Mode (Snapdragon Profile)'
        };
      default:
        return {
          task,
          model: REGISTERED_MODELS[1],
          runtimeTarget: 'Hexagon NPU (Simulated Profile)',
          accelerationStatus: 'Snapdragon NPU Optimized (Demo Profile)',
          routeLog: [
            'Model Router: Ingested document query for reasoning',
            'Selected Model: Llama 3.2 3B Instruct (Qualcomm AI Hub Target)',
            'Target Runtime: DirectML / QNN on Hexagon NPU',
            'Processing Mode: Demo Mode (Snapdragon Profile)'
          ],
          processingMode: 'Demo Mode (Snapdragon Profile)'
        };
    }
  }

  // Live Mode: Truthful in-browser local engine routing
  switch (task) {
    case 'semantic_search':
      return {
        task,
        model: REGISTERED_MODELS[3],
        runtimeTarget: 'Browser JavaScript RAM',
        accelerationStatus: 'CPU / WebAssembly Fallback',
        routeLog: [
          'Model Router: Local vector embedding calculation',
          'Selected Model: In-Memory Sentence Embeddings Engine',
          'Target Runtime: Local Browser Memory',
          'Processing Mode: Local AI (In-Browser)'
        ],
        processingMode: 'Local AI (In-Browser)'
      };
    case 'image_analysis':
    case 'ocr_extraction':
      return {
        task,
        model: REGISTERED_MODELS[0],
        runtimeTarget: 'Browser Canvas Context',
        accelerationStatus: 'CPU / WebAssembly Fallback',
        routeLog: [
          'Model Router: Local canvas raster inspection',
          'Notice: Qualcomm AI Hub TrOCR model unavailable in browser sandbox',
          'Fallback: Client-side Canvas Heuristic OCR Engine',
          'Processing Mode: Local AI (In-Browser)'
        ],
        processingMode: 'Local AI (In-Browser)'
      };
    default:
      return {
        task,
        model: REGISTERED_MODELS[0],
        runtimeTarget: 'Local Browser Runtime (WebAssembly)',
        accelerationStatus: 'CPU / WebAssembly Fallback',
        routeLog: [
          'Model Router: Ingested text for extractive synthesis',
          'Selected Model: NEXUS On-Device Extractive Engine',
          'Target Runtime: Client-side RAM Sandbox',
          'Processing Mode: Local AI (In-Browser)'
        ],
        processingMode: 'Local AI (In-Browser)'
      };
  }
}
