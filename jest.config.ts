import type {Config} from 'jest';

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: "v8",
  testMatch: [
    "**/__tests__/**"
  ],

  testTimeout: 500000,
  
};

export default config;  