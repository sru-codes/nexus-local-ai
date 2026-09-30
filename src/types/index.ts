export type FileType = 'pdf' | 'docx' | 'txt' | 'md' | 'csv' | 'image';

export type HardwareDetectionState = 'DETECTED' | 'NOT DETECTED' | 'UNAVAILABLE' | 'DEMO MODE';
export type ProcessingMode = 'Local AI (In-Browser)' | 'Demo Mode (Snapdragon Profile)' | 'Cloud Fallback (Optional)';

export type VisionRuntimeState = 
  | 'LIVE — QNN'
  | 'LIVE — DirectML'
  | 'LIVE — CPU'
  | 'RUNTIME UNAVAILABLE'
  | 'DEMO MODE';

export type LLMRuntimeState = 
  | 'LIVE — QNN'
  | 'LIVE — DirectML'
  | 'LIVE — CPU'
  | 'RUNTIME UNAVAILABLE'
  | 'DEMO MODE';

export type ModelStatusLabel = 
  | 'CONFIGURED' 
  | 'AVAILABLE' 
  | 'RUNNING' 
  | 'UNAVAILABLE' 
  | 'DEMO';

export interface LlamaModelInfo {
  name: string;
  source: string;
  task: string;
  quantization: string;
  architecture: string;
  sizeMb: number;
  inputFormat: string;
}

export interface LlamaRuntimeInfo {
  state: LLMRuntimeState;
  executionMode: string;
  accelerationStatus: string;
  details: string;
  isNpuActive: boolean;
  canExecuteNative: boolean;
}

export interface VisionPrediction {
  label: string;
  category: string;
  confidence: number; // 0 to 1
  rawLogit: number;
}

export interface VisionModelInfo {
  name: string;
  source: string;
  task: string;
  inputFormat: string;
  quantization: string;
  targetArchitecture: string;
  memoryFootprintMb: number;
}

export interface VisionRuntimeInfo {
  state: VisionRuntimeState;
  executionMode: string;
  accelerationStatus: string;
  details: string;
  isNpuActive: boolean;
  canExecute: boolean;
}

export interface ModelRuntimeStats {
  modelName: string;
  task: string;
  executionMode: string;
  inferenceCount: number;
  lastMeasuredMs: number | null;
  averageMeasuredMs: number | null;
  runtime: string;
  accelerationStatus: string;
}

export interface DocumentItem {
  id: string;
  name: string;
  size: number;
  type: FileType;
  uploadedAt: string;
  content: string;
  summary?: string;
  executiveSummary?: string;
  keyPoints?: string[];
  actionItems?: string[];
  entities?: {
    people?: string[];
    organizations?: string[];
    technologies?: string[];
    dates?: string[];
  };
  embedding?: number[];
  processingMode: ProcessingMode;
  processingTimeMs: number;
  measuredInBrowser: boolean;
  tags: string[];
}

export interface Citation {
  documentId: string;
  documentName: string;
  section: string;
  snippet: string;
  relevanceScore: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  content: string;
  citations?: Citation[];
  modelUsed?: string;
  sourceProvenance?: string;
  executionMode?: string;
  runtimeState?: string;
  isRuntimeUnavailable?: boolean;
  runtimeUnavailableReason?: string;
  processingMode?: ProcessingMode;
  executionTarget?: string;
  sourceDocument?: string;
  latencyMs?: number | null;
  isMeasured?: boolean;
  tokensPerSec?: number | 'Not measured';
  tokensGenerated?: number | 'Not measured';
  modelLoadTimeMs?: number | 'Not measured';
  isStreaming?: boolean;
}

export interface AIModel {
  id: string;
  name: string;
  task: 'Text Generation / LLM' | 'Vision / Multimodal' | 'Text Embeddings' | 'OCR & Document' | 'Audio / Speech';
  source: 'Qualcomm AI Hub' | 'In-Browser Local Engine' | 'Hugging Face ONNX Target';
  format: 'ONNX / QNN Execution Provider' | 'WebAssembly / Client-side' | 'WebNN / DirectML Target';
  quantization: 'W4A16' | 'INT8' | 'W8A8' | 'FP16' | 'Uncompressed';
  runtime: 'DirectML / QNN (Native Snapdragon)' | 'WebAssembly Runtime' | 'Browser Canvas / WebGL';
  isLocal: boolean;
  accelerationStatus: 'Snapdragon NPU Optimized' | 'CPU / WebAssembly Fallback' | 'Demo Profile';
  status: ModelStatusLabel;
  sizeMb: number;
  latencyMs: number | null; // Real live measured latency
  benchmarkDemoLatencyMs?: number | null; // Demo data only, clearly separated
  memoryUsageMb: number;
  description: string;
  architecture: string;
  inputFormat?: string;
}

export interface VisionAnalysisResult {
  id: string;
  imageName: string;
  imageUrl: string;
  description: string;
  ocrText: string[];
  detectedObjects: {
    label: string;
    confidence: number;
    box?: [number, number, number, number];
  }[];
  predictions?: VisionPrediction[];
  diagramExplanation?: string;
  insights: string[];
  modelUsed: string;
  processingMode: ProcessingMode;
  processingTimeMs: number | null; // null if not measured / unavailable
  accelerator: string;
  isSimulatedDemo: boolean;
  runtimeState?: VisionRuntimeState;
  runtimeUnavailableReason?: string;
}

export interface HardwareStatus {
  cpuState: HardwareDetectionState;
  cpuDetails: string;
  gpuState: HardwareDetectionState;
  gpuDetails: string;
  npuState: HardwareDetectionState;
  npuDetails: string;
  memoryState: HardwareDetectionState;
  memoryDetails: string;
  aiRuntimeState: HardwareDetectionState;
  aiRuntimeDetails: string;
  accelerationStatus: string;
  telemetryNotice: string;
}

export interface TelemetryData {
  isHardwareTelemetryAvailable: boolean;
  isDemoMode: boolean;
  hardwareStatus: HardwareStatus;
  
  // Real measured values in live browser
  realMeasuredRequests: number;
  realLastExecutionMs: number | null;
  realAverageExecutionMs: number | null;
  
  // Model-specific real runtime stats
  visionModelStats: ModelRuntimeStats;

  // Demo Mode simulated values (strictly labeled as DEMO DATA)
  simulatedCpuUsagePercent: number;
  simulatedGpuUsagePercent: number;
  simulatedNpuTopsUtilization: number;
  simulatedMemoryBandwidthGbps: number;
  simulatedTokensPerSec: number;
  simulatedLatencyMs: number;
  
  detectedPlatform: {
    browserEngine: string;
    hardwareConcurrency: number;
    deviceMemoryGb: number | null;
    webGpuSupported: boolean;
    webNnSupported: boolean;
    userAgent: string;
  };
}

export interface QuickToolOption {
  id: string;
  label: string;
  description: string;
  iconName: string;
  promptTemplate: string;
}
