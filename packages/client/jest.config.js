// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('../../jest.config');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = {
  ...config,
  projects: [],
  setupFilesAfterEnv: [
    path.join(__dirname, "src", "setupTests.ts")
  ],
  moduleDirectories: ["node_modules", path.join(__dirname, "src")],
};
