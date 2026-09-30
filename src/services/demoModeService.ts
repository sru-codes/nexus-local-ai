import { DocumentItem, VisionAnalysisResult } from '../types';

export const DEMO_DOCUMENTS: DocumentItem[] = [
  {
    id: 'demo-doc-snapdragon-brief',
    name: 'HP_OmniBook_Snapdragon_X_Elite_Product_Brief.docx',
    size: 245760,
    type: 'docx',
    uploadedAt: 'Pre-loaded Sample',
    content: `HP OmniBook X & EliteBook Ultra AI PC Integration Brief
Platform: Qualcomm Snapdragon X Elite Architecture (12-core Oryon CPU, Adreno GPU, Hexagon NPU target).
System Memory Target: 32GB LPDDR5x dual-channel @ 8448 MT/s.

Executive Summary:
The HP Next-Gen AI PC portfolio leverages Snapdragon X Elite to deliver extended battery life while running local generative AI workloads. The dedicated Neural Processing Unit (NPU) is designed to handle document intelligence, real-time embeddings, and local vision tasks directly on-device.

Key Architectural Considerations:
1. Local-First Architecture: Confidential enterprise documents (legal, medical, intellectual property) can remain within the local device memory.
2. Low Latency: Local processing eliminates network round-trips and dependency on remote API availability.
3. Thermal & Power Efficiency: Designed for low TDP (12-28W), maintaining cool and quiet acoustics during batch processing.
4. Heterogeneous Compute: Oryon handles file I/O & text tokenization; Hexagon NPU processes tensor operations; Adreno GPU manages interactive rendering.

Next Actions:
- Validate Qualcomm AI Hub ONNX runtime compilation on local legal and financial corpora.
- Measure battery performance comparing on-device NPU inference vs cloud REST calls.`,
    summary: 'Executive brief on the HP OmniBook X powered by Qualcomm Snapdragon X Elite, highlighting local-first processing, low latency, and energy efficiency.',
    executiveSummary: 'This document describes HP\'s integration of the Qualcomm Snapdragon X Elite platform in next-generation enterprise laptops, focusing on on-device privacy, local intelligence, and extended battery runtime.',
    keyPoints: [
      'Snapdragon X Elite integrates Oryon CPU, Adreno GPU, and Hexagon NPU.',
      'Designed for low thermal TDP (12-28W) enabling long battery endurance.',
      'Supports a local-first architecture to keep sensitive files on-device.',
      'Qualcomm AI Hub targets provide pre-compiled ONNX models for Snapdragon hardware.'
    ],
    actionItems: [
      'Validate Qualcomm AI Hub ONNX models on local enterprise corpus.',
      'Conduct battery drain measurements comparing on-device vs cloud inference.'
    ],
    entities: {
      people: ['Engineering Lead Alex Chen', 'Product Director Sarah Jenkins'],
      organizations: ['HP Inc.', 'Qualcomm Technologies'],
      technologies: ['Snapdragon X Elite', 'Hexagon NPU', 'Oryon CPU', 'Qualcomm AI Hub'],
      dates: ['Q3 Evaluation', 'Q4 Deployment']
    },
    processingMode: 'Demo Mode (Snapdragon Profile)',
    processingTimeMs: 142,
    measuredInBrowser: false,
    tags: ['DEMO DATA', 'Snapdragon', 'HP Hardware', 'Architecture']
  },
  {
    id: 'demo-doc-security-risk',
    name: 'Q3_Enterprise_Security_Risk_Assessment.pdf',
    size: 512000,
    type: 'pdf',
    uploadedAt: 'Pre-loaded Sample',
    content: `Enterprise Security & Cloud AI Risk Assessment
Classification: Internal Governance Review

1. Background & Threat Landscape
An internal review of public cloud AI usage highlighted operational risks:
- Risk of unauthorized paste operations involving internal intellectual property into public web services.
- Data residency and sovereign control challenges when corporate data is processed on remote servers.
- Unplanned API outages or connectivity interruptions during travel or in secure facilities.

2. Local-First AI Mitigation
Adopting local on-device AI workspaces:
- Local Ingestion: Documents and embeddings remain stored in local memory.
- Offline Availability: Users retain access to document summarization and search without internet.
- Cost Predictability: Avoids recurring per-token cloud API billing.

3. Implementation Plan:
- Phase 1: Deploy local AI workspace to initial test group on Snapdragon-powered laptops.
- Phase 2: Audit local model cryptographic signatures and offline execution boundaries.`,
    summary: 'Internal assessment detailing operational risks of cloud AI tools and recommending on-device AI workspaces to preserve data control and offline availability.',
    executiveSummary: 'A corporate risk review identifying exposure from unmanaged cloud LLMs and proposing local-first AI workspaces on Snapdragon laptops to keep enterprise data on-device.',
    keyPoints: [
      'Cloud AI usage poses data governance challenges if files are sent off-premise.',
      'Local-first AI maintains full capabilities during offline and flight scenarios.',
      'Eliminates ongoing per-token API charges for routine document summarization.'
    ],
    actionItems: [
      'Deploy local workspace to pilot group on Snapdragon HP hardware.',
      'Audit cryptographic signatures of local models prior to wide distribution.'
    ],
    entities: {
      people: ['CISO Elena Rostova', 'Compliance Officer Marcus Vance'],
      organizations: ['Data Governance Committee'],
      technologies: ['Local Vector Cache', 'NEXUS Workspace'],
      dates: ['Q3 Review', 'Phase 1 Launch']
    },
    processingMode: 'Demo Mode (Snapdragon Profile)',
    processingTimeMs: 185,
    measuredInBrowser: false,
    tags: ['DEMO DATA', 'Security', 'Risk Review', 'Local-First']
  }
];

export const DEMO_VISION_RESULTS: VisionAnalysisResult[] = [
  {
    id: 'demo-vis-chip',
    imageName: 'Qualcomm_Snapdragon_X_Elite_Die_Architecture.png',
    imageUrl: '/src/assets/images/qualcomm_npu_chip_1790776632081.jpg',
    description: 'Visual diagram representing Qualcomm Snapdragon X Elite SoC architecture: Hexagon NPU, 12-core Oryon CPU, Adreno GPU, and high-speed memory controller.',
    ocrText: [
      'QUALCOMM SNAPDRAGON X ELITE ARCHITECTURE',
      'HEXAGON NPU — TENSOR MATRIX CORES',
      'QUALCOMM ORYON CPU — 12 CORES',
      'QUALCOMM ADRENO GPU',
      'LPDDR5X UNIFIED MEMORY SUBSYSTEM',
      'HETEROGENEOUS COMPUTE BUS'
    ],
    detectedObjects: [
      { label: 'Neural Processing Unit Core', confidence: 0.98, box: [0.35, 0.42, 0.65, 0.72] },
      { label: 'Oryon CPU Subsystem', confidence: 0.96, box: [0.12, 0.15, 0.45, 0.45] },
      { label: 'Adreno GPU Compute Block', confidence: 0.94, box: [0.55, 0.15, 0.88, 0.48] }
    ],
    diagramExplanation: 'Illustrates heterogeneous compute partitioning. Vector embeddings can be routed to the Hexagon NPU, image parsing to the Adreno GPU, and token streaming to the Oryon CPU.',
    insights: [
      'Heterogeneous architecture distributes specialized workloads across CPU, GPU, and NPU.',
      'Unified memory avoids extra copy overhead between computational blocks.',
      'Designed for sustained energy-efficient on-device inference.'
    ],
    modelUsed: 'MobileNetV4-Large (Qualcomm AI Hub Target Profile)',
    processingMode: 'Demo Mode (Snapdragon Profile)',
    processingTimeMs: 84,
    accelerator: 'Hexagon NPU (Simulated Profile)',
    isSimulatedDemo: true
  },
  {
    id: 'demo-vis-pc',
    imageName: 'HP_OmniBook_Snapdragon_Engineering_Chassis.png',
    imageUrl: '/src/assets/images/nexus_snapdragon_pc_1790776618149.jpg',
    description: 'Product chassis inspection of HP Snapdragon PC running the NEXUS local workspace.',
    ocrText: [
      'HP OMNIBOOK X NEXT-GEN AI PC',
      'QUALCOMM SNAPDRAGON X ELITE PLATFORM',
      'PROCESSING MODE: LOCAL-FIRST ARCHITECTURE',
      'THERMAL SPECIFICATION: LOW TDP FANLESS/QUIET'
    ],
    detectedObjects: [
      { label: 'Display Panel', confidence: 0.99, box: [0.1, 0.18, 0.62, 0.82] },
      { label: 'NEXUS Workspace UI', confidence: 0.97, box: [0.15, 0.22, 0.58, 0.78] },
      { label: 'Chassis & Keyboard', confidence: 0.95, box: [0.65, 0.12, 0.92, 0.88] }
    ],
    diagramExplanation: 'Demonstrates physical deployment on an HP thin-and-light laptop powered by Snapdragon X Elite.',
    insights: [
      'Designed for battery-conscious edge computing on ultra-portable hardware.',
      'Supports local document analysis during flight or without internet connectivity.'
    ],
    modelUsed: 'TrOCR-Mobile (Qualcomm AI Hub Target Profile)',
    processingMode: 'Demo Mode (Snapdragon Profile)',
    processingTimeMs: 76,
    accelerator: 'Adreno GPU + Hexagon NPU (Simulated Profile)',
    isSimulatedDemo: true
  }
];
