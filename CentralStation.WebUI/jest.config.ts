import type { Config } from 'jest';


export default <Config>{
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: [`${__dirname}/tests/setup.ts`],
  testEnvironment: '@happy-dom/jest-environment',
};
