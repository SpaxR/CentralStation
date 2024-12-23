import type { Config } from 'jest';
import { TestEnvironmentOptions } from '@angular/core/testing';

export default <Config>{
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: [`${__dirname}/tests/setup.ts`],
  testEnvironment: '@happy-dom/jest-environment',
  testEnvironmentOptions: <TestEnvironmentOptions>{
    width: 1920,
    height: 1080,
  },
};
