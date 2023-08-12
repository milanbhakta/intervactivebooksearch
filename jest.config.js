module.exports = {
    testMatch: ["<rootDir>/tests/**/*.test.js"],
    setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
    moduleNameMapper: {
      "\\.(css|scss)$": "identity-obj-proxy",
    },
  };
  