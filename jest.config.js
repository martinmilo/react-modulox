module.exports = {
  verbose: true,
  collectCoverage: true,
  coverageDirectory: './coverage/',
	moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
	modulePathIgnorePatterns: ['<rootDir>/coverage/'],
  setupFiles: ['<rootDir>/enzyme.config.js'],
  testRegex: 'src/.*.test.js$',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  clearMocks: true,
};
