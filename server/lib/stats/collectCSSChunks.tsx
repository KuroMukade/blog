import React, { ReactNode } from 'react';
import { importAssets } from 'webpack-imported';
import { Collector } from './collector';
import { ChunkLoadingProvider } from './context';
import { getImportedStats } from './stats';

const createCollector = async () => {
  const importedStats = await getImportedStats();

  if (!importedStats) return null;

  return new Collector(importAssets).initStats(
    // @ts-ignore
    importedStats,
  );
};

const noop = () => {};

export const createCSSChunkCollector = async () => {
  const collector = await createCollector();

  return {
    collectCSSChunks: (jsx: ReactNode) => (
        <ChunkLoadingProvider collector={collector || noop}>
            {jsx}
        </ChunkLoadingProvider>
    ),
    chunkCollector: collector,
  };
};
