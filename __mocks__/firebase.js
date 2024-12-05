jest.mock('firebase/analytics', () => ({
    getAnalytics: jest.fn(),
    logEvent: jest.fn(),
    isSupported: jest.fn().mockReturnValue(false), // Mock that analytics is not supported in tests
  }));
  