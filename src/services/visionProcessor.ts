import { VisionAnalysisResult } from '../types';
import { processVisionInput } from './visionInferenceService';
import { DEMO_VISION_RESULTS } from './demoModeService';

export async function analyzeImageLocally(file: File): Promise<VisionAnalysisResult> {
  return processVisionInput(file, false);
}

export function getSampleVisionPreset(index: number): VisionAnalysisResult {
  return DEMO_VISION_RESULTS[index % DEMO_VISION_RESULTS.length];
}
