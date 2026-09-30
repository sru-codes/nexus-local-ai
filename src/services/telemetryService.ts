import { TelemetryData } from '../types';
import { detectBrowserHardware } from './hardwareDetectionService';
import { visionModelAdapter } from './visionModelAdapter';

class TelemetryService {
  private measuredRequests: number = 0;
  private executionTimes: number[] = [];

  recordExecution(durationMs: number): void {
    this.measuredRequests++;
    this.executionTimes.push(durationMs);
    if (this.executionTimes.length > 50) {
      this.executionTimes.shift();
    }
  }

  getTelemetry(isDemoMode: boolean): TelemetryData {
    const hardwareStatus = detectBrowserHardware(isDemoMode);
    const nav = typeof navigator !== 'undefined' ? navigator : ({} as any);

    const realLastExecutionMs = this.executionTimes.length > 0 
      ? this.executionTimes[this.executionTimes.length - 1] 
      : null;

    const realAverageExecutionMs = this.executionTimes.length > 0
      ? Math.round(this.executionTimes.reduce((a, b) => a + b, 0) / this.executionTimes.length)
      : null;

    const visionModelStats = visionModelAdapter.getModelStats(isDemoMode);

    return {
      isHardwareTelemetryAvailable: isDemoMode,
      isDemoMode,
      hardwareStatus,
      
      // Real measured values in live browser
      realMeasuredRequests: this.measuredRequests,
      realLastExecutionMs,
      realAverageExecutionMs,
      
      // Model-specific stats
      visionModelStats,

      // Simulated metrics in Demo Mode (strictly labeled as DEMO DATA)
      simulatedCpuUsagePercent: 18.5,
      simulatedGpuUsagePercent: 24.0,
      simulatedNpuTopsUtilization: 34.2,
      simulatedMemoryBandwidthGbps: 94.6,
      simulatedTokensPerSec: 32.4,
      simulatedLatencyMs: 14.8,

      detectedPlatform: {
        browserEngine: nav.userAgent?.includes('Chrome') ? 'Chromium / Blink' : 'Webkit / Gecko',
        hardwareConcurrency: nav.hardwareConcurrency || 4,
        deviceMemoryGb: (nav as any).deviceMemory || null,
        webGpuSupported: typeof navigator !== 'undefined' && 'gpu' in navigator,
        webNnSupported: typeof navigator !== 'undefined' && 'ml' in navigator,
        userAgent: nav.userAgent || 'Browser Sandbox'
      }
    };
  }
}

export const telemetryService = new TelemetryService();
