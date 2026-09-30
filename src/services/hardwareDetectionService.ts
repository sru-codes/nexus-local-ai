import { HardwareStatus, HardwareDetectionState } from '../types';

export function detectBrowserHardware(isDemoMode: boolean): HardwareStatus {
  const nav = typeof navigator !== 'undefined' ? navigator : ({} as any);
  
  if (isDemoMode) {
    return {
      cpuState: 'DEMO MODE',
      cpuDetails: 'Qualcomm Oryon™ 12-core CPU (Simulated Profile)',
      gpuState: 'DEMO MODE',
      gpuDetails: 'Qualcomm Adreno™ GPU (4.6 TFLOPS Profile)',
      npuState: 'DEMO MODE',
      npuDetails: 'Qualcomm Hexagon™ NPU (45 TOPS Target Profile)',
      memoryState: 'DEMO MODE',
      memoryDetails: '32GB LPDDR5x @ 8448 MT/s (136 GB/s Bandwidth)',
      aiRuntimeState: 'DEMO MODE',
      aiRuntimeDetails: 'Qualcomm AI Hub QNN / DirectML Execution Provider',
      accelerationStatus: 'Snapdragon AI Acceleration (Demo Mode Active)',
      telemetryNotice: 'DEMO DATA — Values represent target HP OmniBook X Snapdragon X Elite hardware profile.'
    };
  }

  // Live Browser Inspection
  const concurrency = nav.hardwareConcurrency || null;
  const memoryGb = (nav as any).deviceMemory || null;
  const hasWebGpu = typeof navigator !== 'undefined' && 'gpu' in navigator;
  const hasWebNn = typeof navigator !== 'undefined' && 'ml' in navigator;

  // CPU
  const cpuState: HardwareDetectionState = concurrency ? 'DETECTED' : 'UNAVAILABLE';
  const cpuDetails = concurrency 
    ? `${concurrency} Logical CPU Cores detected via browser navigator`
    : 'CPU core count unavailable via browser environment';

  // GPU
  let gpuState: HardwareDetectionState = 'NOT DETECTED';
  let gpuDetails = 'Standard WebGL canvas detected';
  if (hasWebGpu) {
    gpuState = 'DETECTED';
    gpuDetails = 'WebGPU API available in browser runtime';
  } else if (typeof document !== 'undefined') {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (gl) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'WebGL Accelerated';
        gpuState = 'DETECTED';
        gpuDetails = `${renderer}`;
      }
    } catch {
      gpuState = 'UNAVAILABLE';
      gpuDetails = 'WebGL probe blocked by browser sandbox';
    }
  }

  // NPU / AI Accelerator - Strict Honesty: Browser cannot access raw NPU registers
  const npuState: HardwareDetectionState = hasWebNn ? 'DETECTED' : 'UNAVAILABLE';
  const npuDetails = hasWebNn 
    ? 'Experimental WebNN interface detected'
    : 'NPU telemetry is unavailable from this browser environment.';

  // Memory
  const memoryState: HardwareDetectionState = memoryGb ? 'DETECTED' : 'UNAVAILABLE';
  const memoryDetails = memoryGb 
    ? `~${memoryGb} GB browser heap allocation limit`
    : 'Physical RAM size restricted by browser privacy sandbox';

  // AI Runtime
  const aiRuntimeState: HardwareDetectionState = 'DETECTED';
  const aiRuntimeDetails = 'In-Browser JavaScript & WebAssembly Local Runtime';

  const accelerationStatus = hasWebNn 
    ? 'WebNN Hardware Acceleration Probe Available' 
    : 'CPU / WebAssembly Fallback (Local In-Browser)';

  const telemetryNotice = 'Hardware telemetry: Unavailable in browser environment. Real execution timers are measured via performance.now().';

  return {
    cpuState,
    cpuDetails,
    gpuState,
    gpuDetails,
    npuState,
    npuDetails,
    memoryState,
    memoryDetails,
    aiRuntimeState,
    aiRuntimeDetails,
    accelerationStatus,
    telemetryNotice
  };
}
