/** @type {import('@jest/types').Config.InitialOptions} */
export default {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: [`${__dirname}/tests/setup.ts`],
  moduleNameMapper: {
    // '\\.(jpg|jpeg|png)$': `${__dirname}/mock-module.js`,
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
  },
};
