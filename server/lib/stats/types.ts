import { ImportedStat } from 'webpack-imported';

export type ImportedChunkStatsType = Record<'css' | 'js', string[]>;
export type ImportedStatsType = ImportedStat;

export type ChunkNameType = string;

export type CssImportedChunkType = {
    load: ChunkNameType[];
    preload: ChunkNameType[];
    prefetch: ChunkNameType[];
};

export type CssAssetsExtractorType = (
    stats: ImportedStatsType,
    chunkName: string | string[],
) => {styles: CssImportedChunkType};

export type CollectFunctionType = (chunkName: string) => void;

export type ChunkLoadingCollectorType = {
    collect: CollectFunctionType;
};
