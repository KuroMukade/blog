import type { Config } from 'jest';

const config: Config = {
  coveragePathIgnorePatterns: [
    '\\\\node_modules\\\\',
  ],

  clearMocks: true,
  testEnvironment: 'jsdom',

  moduleDirectories: [
    'node_modules',
  ],

  moduleFileExtensions: [
    'js',
    'mjs',
    'cjs',
    'jsx',
    'ts',
    'tsx',
    'json',
    'node',
  ],

  roots: [
    '../../',
  ],

  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },

  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
};

export default config;
