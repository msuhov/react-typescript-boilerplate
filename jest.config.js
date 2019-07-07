module.exports = {
  collectCoverageFrom: [
    'app/**/*.{ts,tsx}',
    '!app/**/*.spec.{ts,tsx}',
    '!app/app.tsx',
    '!app/*/*/Loadable.{ts,tsx}',
  ],
  coverageThreshold: {
    global: {
      statements: 98,
      branches: 91,
      functions: 98,
      lines: 98,
    },
  },
  moduleDirectories: ['node_modules', 'app'],
  moduleNameMapper: {
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/internals/__mocks__/file.js',
  },
  setupFilesAfterEnv: ['react-testing-library/cleanup-after-each'],
  testRegex: '__tests__/.*\\.spec\\.(ts|tsx)$',
  snapshotSerializers: [],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
