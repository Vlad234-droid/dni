// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('../../jest.config');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = {
  ...config,
  testEnvironment: 'node',
  roots: [path.join(__dirname, "src")],
  projects: [],
  moduleDirectories: ['node_modules', path.join(__dirname, "src")],
  coverageDirectory: path.join(__dirname, "coverage"),
  collectCoverageFrom: [
    "**/*.{js,ts}"
  ],
};
