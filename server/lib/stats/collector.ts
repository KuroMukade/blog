import {
  ChunkNameType, CssAssetsExtractorType, CssImportedChunkType, ImportedStatsType,
} from './types';

type ChunkLoadingCollectorType = {
    /**
     * shouldBeLoadedStyles contains "webpackChunkName" keys
     */
    statsMap: Map<ChunkNameType, CssImportedChunkType>;
    /**
     * generated stats
     */
    stats: ImportedStatsType;
    collect: (chunkName: string) => void;
    cssAssetsExtractor: CssAssetsExtractorType;
    initStats: (stats: ImportedStatsType) => ChunkLoadingCollectorType;
};

export class Collector implements ChunkLoadingCollectorType {
  cssAssetsExtractor: CssAssetsExtractorType;

  processedStats: Set<ChunkNameType> = new Set();

  statsMap = new Map<ChunkNameType, CssImportedChunkType>();

  stats!: ImportedStatsType;

  collect(...chunkNames: ChunkNameType[]) {
    try {
      if (!chunkNames) return;
      const statsOfchunks = chunkNames.map((name) => ({
        name,
        stats: this.extractStatsFromChunk(name),
      }));

      if (statsOfchunks.length === 0) return;

      const filtered = statsOfchunks.filter((chunk) => chunk && !this.statsMap.get(chunk.name));

      if (filtered.length === 0) return;

      filtered.forEach(({ name, stats }) => {
        this.statsMap.set(name, stats);
      });
    } catch (e) {
      console.error(e, 'Error in extractor');
    }
  }

  getStatsToProcess(): Record<ChunkNameType, CssImportedChunkType> {
    const chunksToProcess: Record<string, CssImportedChunkType> = {};

    const entried = Object.entries(this.statsMap);

    if (entried.length === 0) return chunksToProcess;

    entried.forEach(([key, value]) => {
      if (!this.processedStats.has(key)) {
        this.processedStats.add(key);
        chunksToProcess[key] = value;
      }
    });

    return chunksToProcess;
  }

  constructor(cssExtractor: CssAssetsExtractorType) {
    this.cssAssetsExtractor = cssExtractor;
    this.collect = this.collect.bind(this);
    this.extractStatsFromChunk = this.extractStatsFromChunk.bind(this);
    this.initStats = this.initStats.bind(this);
  }

  private extractStatsFromChunk(chunkName: string) {
    return this.cssAssetsExtractor(this.stats, chunkName).styles;
  }

  initStats(stats: ImportedStatsType) {
    this.stats = stats;
    return this;
  }
}
