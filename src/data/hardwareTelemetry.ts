import { TelemetryData } from '../types';
import { telemetryService } from '../services/telemetryService';
import { detectBrowserHardware } from '../services/hardwareDetectionService';

export function getBrowserHardwareCapabilities() {
  const hardware = detectBrowserHardware(false);
  const nav = typeof navigator !== 'undefined' ? navigator : ({} as any);
  return {
    browserEngine: nav.userAgent?.includes('Chrome') ? 'Chromium / Blink' : 'Webkit / Gecko',
    hardwareConcurrency: nav.hardwareConcurrency || 4,
    deviceMemoryGb: (nav as any).deviceMemory || null,
    webGpuSupported: typeof navigator !== 'undefined' && 'gpu' in navigator,
    webNnSupported: typeof navigator !== 'undefined' && 'ml' in navigator,
    userAgent: nav.userAgent || 'Browser Sandbox'
  };
}

export function getInitialTelemetry(isDemoMode: boolean): TelemetryData {
  return telemetryService.getTelemetry(isDemoMode);
}
