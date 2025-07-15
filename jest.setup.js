// Jest setup file
// This file is executed before each test file runs
// It sets up any global configurations needed for testing

// Mock Bootstrap components
global.bootstrap = {
  Tooltip: class {
    constructor() {}
  },
};

// Add any other global mocks needed for testing
