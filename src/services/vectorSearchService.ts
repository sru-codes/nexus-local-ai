import { DocumentItem } from '../types';
import { computeDenseLocalEmbedding } from './embeddingService';

export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) return 0;
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  if (denominator === 0) return 0;
  return Math.max(0, Math.min(1, dotProduct / denominator));
}

export interface SearchResult {
  document: DocumentItem;
  score: number;
  matchingSnippets: string[];
}

export function performLocalVectorSearch(query: string, documents: DocumentItem[]): SearchResult[] {
  if (!query.trim()) return [];

  const queryVector = computeDenseLocalEmbedding(query);
  const queryLower = query.toLowerCase();
  const queryWords = queryLower.split(/\W+/).filter(w => w.length > 2);

  const scoredDocs = documents.map(doc => {
    const docVector = doc.embedding || computeDenseLocalEmbedding(doc.content);
    let score = cosineSimilarity(queryVector, docVector);

    // Exact word frequency boost
    let exactMatches = 0;
    queryWords.forEach(word => {
      if (doc.content.toLowerCase().includes(word) || doc.name.toLowerCase().includes(word)) {
        exactMatches++;
      }
    });

    if (queryWords.length > 0) {
      const keywordBoost = (exactMatches / queryWords.length) * 0.35;
      score = Math.min(1.0, score * 0.65 + keywordBoost);
    }

    // Extract best matching snippet
    const sentences = doc.content.split(/[.\n]+/).map(s => s.trim()).filter(s => s.length > 20);
    const scoredSentences = sentences.map(sentence => {
      const sVec = computeDenseLocalEmbedding(sentence);
      return { sentence, sScore: cosineSimilarity(queryVector, sVec) };
    });

    scoredSentences.sort((a, b) => b.sScore - a.sScore);
    const matchingSnippets = scoredSentences.slice(0, 2).map(s => s.sentence);

    return {
      document: doc,
      score: Number(score.toFixed(3)),
      matchingSnippets: matchingSnippets.length > 0 ? matchingSnippets : [doc.summary || doc.content.slice(0, 160)]
    };
  });

  return scoredDocs.filter(r => r.score > 0.12).sort((a, b) => b.score - a.score);
}
