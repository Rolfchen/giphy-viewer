export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jest-environment-jsdom',
  // setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'], // Set up jest-dom
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        //the content you'd placed at "global"
        tsconfig: 'tsconfig.json',
      },
    ],
  },
  setupFiles: ['<rootDir>/jestGlobalSetup.ts'],
};
