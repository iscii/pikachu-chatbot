// jest.setup.js
jest.mock('firebase/analytics', () => ({
    getAnalytics: jest.fn(),
    logEvent: jest.fn(),
    isSupported: jest.fn().mockReturnValue(false), // Mock isSupported to return false
  }));
  