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
  modulePaths: [
    '<rootDir>src',
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
  rootDir: '../../',
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
  setupFilesAfterEnv: ['<rootDir>config/jest/setupTests.ts'],
  moduleNameMapper: {
    '\\s?css$': 'identity-obj-proxy',
  },
};

export default config;
