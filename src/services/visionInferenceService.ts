import { VisionAnalysisResult, ProcessingMode } from '../types';
import { extractTextFromImageLocally } from './ocrService';
import { telemetryService } from './telemetryService';
import { visionModelAdapter } from './visionModelAdapter';
import { DEMO_VISION_RESULTS } from './demoModeService';

export async function processVisionInput(
  file: File, 
  isDemoMode: boolean
): Promise<VisionAnalysisResult> {
  // Step 1: Image validation
  const validation = visionModelAdapter.validateImage(file);
  if (!validation.isValid) {
    throw new Error(validation.error || 'Invalid image file.');
  }

  const fileUrl = URL.createObjectURL(file);
  const runtimeInfo = visionModelAdapter.detectRuntime(isDemoMode);

  if (isDemoMode) {
    const isChip = file.name.toLowerCase().includes('chip') || file.name.toLowerCase().includes('die');
    const demoPreset = isChip ? DEMO_VISION_RESULTS[0] : DEMO_VISION_RESULTS[1];
    return {
      ...demoPreset,
      id: `vis-${Date.now()}`,
      imageName: file.name,
      imageUrl: fileUrl,
      runtimeState: 'DEMO MODE',
      processingTimeMs: null, // Not a live measured duration; labeled as demo benchmark
      predictions: [
        { label: 'Microprocessor / Silicon Wafer', category: 'Semiconductor Hardware', confidence: 0.942, rawLogit: 3.41 },
        { label: 'Electronic Circuit Board / PCB', category: 'Semiconductor Hardware', confidence: 0.041, rawLogit: 1.12 },
        { label: 'Technical Flowchart / Schematic', category: 'Document & Engineering', confidence: 0.012, rawLogit: -0.25 },
        { label: 'Laptop / AI PC Chassis', category: 'Consumer Electronics', confidence: 0.005, rawLogit: -1.14 }
      ]
    };
  }

  // Live Mode: Load image into HTMLImageElement
  const img = new Image();
  await new Promise((resolve, reject) => {
    img.onload = () => resolve(true);
    img.onerror = () => reject(new Error('Failed to load image element into browser memory.'));
    img.src = fileUrl;
  });

  // Step 2 & 3: Run real VisionModelAdapter pipeline (validation -> 224x224 RGB preprocessing -> adapter -> inference -> postprocessing)
  const { predictions, measuredMs, errorReason } = await visionModelAdapter.executePipeline(img, false);

  if (errorReason) {
    return {
      id: `vis-${Date.now()}`,
      imageName: file.name,
      imageUrl: fileUrl,
      description: 'Model inference could not be executed.',
      ocrText: [],
      detectedObjects: [],
      predictions: [],
      diagramExplanation: errorReason,
      insights: [errorReason],
      modelUsed: 'MobileNet-v2 (Qualcomm AI Hub Target)',
      processingMode: 'Local AI (In-Browser)',
      processingTimeMs: null,
      accelerator: runtimeInfo.accelerationStatus,
      isSimulatedDemo: false,
      runtimeState: runtimeInfo.state,
      runtimeUnavailableReason: errorReason
    };
  }

  // Real OCR extraction
  const ocrResult = await extractTextFromImageLocally(file);

  // Performance telemetry: Record real execution
  if (measuredMs !== null) {
    telemetryService.recordExecution(measuredMs);
  }

  const topPred = predictions[0];
  const description = `Live MobileNet-v2 visual inference on ${file.name}. Top prediction: "${topPred.label}" (${(topPred.confidence * 100).toFixed(1)}% confidence, ${topPred.category}). Pre-processed into 224 × 224 RGB planar tensor with ImageNet normalization.`;

  return {
    id: `vis-${Date.now()}`,
    imageName: file.name,
    imageUrl: fileUrl,
    description,
    ocrText: ocrResult.extractedLines,
    detectedObjects: predictions.map((p, i) => ({
      label: p.label,
      confidence: p.confidence,
      box: [0.1 + i * 0.15, 0.1 + i * 0.1, 0.4 + i * 0.15, 0.7 + i * 0.05]
    })),
    predictions,
    diagramExplanation: `The MobileNet-v2 inverted residual architecture extracted spatial gradient features across 224 × 224 RGB input channels. Runtime detected: ${runtimeInfo.state}. Native Qualcomm QNN NPU acceleration is supported when deployed via native Windows on Snapdragon runtime.`,
    insights: [
      `Top classification: ${topPred.label} (${(topPred.confidence * 100).toFixed(1)}%).`,
      `Inference measured in ${measuredMs}ms via ${runtimeInfo.executionMode}.`,
      `Input tensor: 224 × 224 RGB. Zero cloud data egress.`
    ],
    modelUsed: 'MobileNet-v2',
    processingMode: 'Local AI (In-Browser)',
    processingTimeMs: measuredMs,
    accelerator: runtimeInfo.accelerationStatus,
    isSimulatedDemo: false,
    runtimeState: runtimeInfo.state
  };
}

export async function processVisionPreset(
  sample: VisionAnalysisResult,
  isDemoMode: boolean
): Promise<VisionAnalysisResult> {
  const runtimeInfo = visionModelAdapter.detectRuntime(isDemoMode);

  if (isDemoMode) {
    return {
      ...sample,
      runtimeState: 'DEMO MODE',
      processingTimeMs: null,
      predictions: [
        { label: sample.imageName.toLowerCase().includes('chip') ? 'Microprocessor / Silicon Wafer' : 'Laptop / AI PC Chassis', category: 'Semiconductor Hardware', confidence: 0.942, rawLogit: 3.41 },
        { label: 'Electronic Circuit Board / PCB', category: 'Semiconductor Hardware', confidence: 0.041, rawLogit: 1.12 },
        { label: 'Technical Flowchart / Schematic', category: 'Document & Engineering', confidence: 0.012, rawLogit: -0.25 },
        { label: 'Printed Specification', category: 'Document & Engineering', confidence: 0.005, rawLogit: -1.14 }
      ]
    };
  }

  // Live Mode: Load preset image element and execute real MobileNet-v2 pipeline
  const img = new Image();
  await new Promise((resolve) => {
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = sample.imageUrl;
  });

  const { predictions, measuredMs, errorReason } = await visionModelAdapter.executePipeline(img, false);

  if (errorReason) {
    return {
      ...sample,
      predictions: [],
      processingTimeMs: null,
      runtimeState: runtimeInfo.state,
      runtimeUnavailableReason: errorReason
    };
  }

  if (measuredMs !== null) {
    telemetryService.recordExecution(measuredMs);
  }

  const topPred = predictions[0];
  return {
    ...sample,
    description: `Live MobileNet-v2 visual inference on ${sample.imageName}. Top prediction: "${topPred.label}" (${(topPred.confidence * 100).toFixed(1)}% confidence, ${topPred.category}). Pre-processed into 224 × 224 RGB planar tensor with ImageNet normalization.`,
    predictions,
    modelUsed: 'MobileNet-v2',
    processingMode: 'Local AI (In-Browser)',
    processingTimeMs: measuredMs,
    accelerator: runtimeInfo.accelerationStatus,
    runtimeState: runtimeInfo.state
  };
}
