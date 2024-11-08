import React, { PropsWithChildren, useRef } from 'react';

import { importAssets } from 'webpack-imported';
import { Collector } from './collector';
import { ChunkLoadingCollectorType } from './types';

export const ChunkLoadingContext = React.createContext<ChunkLoadingCollectorType>({
  collect: new Collector(importAssets).collect,
});

type PropsType = {
    collector: ChunkLoadingCollectorType;
};

/**
 * ChunkLoadingProvider react context provider for chunkCollector
 */
export const ChunkLoadingProvider: React.FC<PropsWithChildren<PropsType>> = ({
  collector,
  children,
}) => {
  const chunkCollectorRef = useRef<ChunkLoadingCollectorType>(collector);

  return (
      <ChunkLoadingContext.Provider value={chunkCollectorRef.current}>
          {children}
      </ChunkLoadingContext.Provider>
  );
};
