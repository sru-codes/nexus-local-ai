/**
 * On-Device Embedding Service
 * Computes deterministic dense semantic vector representations in local client RAM.
 */

const DOMAIN_CLUSTERS: Record<string, string[]> = {
  security_risk: ['security', 'risk', 'leakage', 'compliance', 'threat', 'governance', 'hipaa', 'gdpr', 'finra', 'breach', 'vulnerability'],
  snapdragon_npu: ['snapdragon', 'npu', 'hexagon', 'qualcomm', 'oryon', 'adreno', 'tops', 'hardware', 'compute', 'latency', 'bandwidth', 'efficiency', 'hp', 'omnibook', 'elitebook'],
  ai_models: ['model', 'llama', 'gemma', 'ai hub', 'quantization', 'w4a16', 'int8', 'onnx', 'webnn', 'inference', 'tokens', 'embedding', 'rag', 'vision', 'ocr'],
  enterprise_ops: ['deployment', 'rollout', 'enterprise', 'project', 'milestone', 'timetable', 'workforce', 'policy', 'cost', 'offline', 'privacy']
};

export function computeDenseLocalEmbedding(text: string): number[] {
  const normalized = text.toLowerCase();
  const words = normalized.split(/\W+/).filter(w => w.length > 2);
  const totalWords = Math.max(words.length, 1);

  const vector = new Array(16).fill(0);

  // Cluster 0-3: Security & Risk
  DOMAIN_CLUSTERS.security_risk.forEach((kw, i) => {
    const count = words.filter(w => w.includes(kw)).length;
    vector[i % 4] += (count / totalWords) * 10;
  });

  // Cluster 4-7: Snapdragon & Hardware
  DOMAIN_CLUSTERS.snapdragon_npu.forEach((kw, i) => {
    const count = words.filter(w => w.includes(kw)).length;
    vector[4 + (i % 4)] += (count / totalWords) * 10;
  });

  // Cluster 8-11: Models & Inference
  DOMAIN_CLUSTERS.ai_models.forEach((kw, i) => {
    const count = words.filter(w => w.includes(kw)).length;
    vector[8 + (i % 4)] += (count / totalWords) * 10;
  });

  // Cluster 12-15: Enterprise Deployment
  DOMAIN_CLUSTERS.enterprise_ops.forEach((kw, i) => {
    const count = words.filter(w => w.includes(kw)).length;
    vector[12 + (i % 4)] += (count / totalWords) * 10;
  });

  // Normalize vector to unit length
  const magnitude = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0)) || 1;
  return vector.map(v => Number((v / magnitude).toFixed(4)));
}
