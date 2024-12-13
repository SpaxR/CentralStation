/** @type {import('@jest/types').Config.InitialOptions} */
export default {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: [`${__dirname}/tests/setup.ts`],
  testEnvironment: '@happy-dom/jest-environment',
};
