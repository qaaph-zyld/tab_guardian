import { TabAnalytics } from '../src/analytics/TabAnalytics';

describe('TabAnalytics', () => {
  let analytics;

  beforeEach(() => {
    analytics = new TabAnalytics();
    // Mock chrome.storage.local
    global.chrome = {
      storage: {
        local: {
          set: jest.fn(),
          get: jest.fn(),
        },
      },
    };
  });

  test('should initialize with correct default values', () => {
    expect(analytics.metrics.tabCount).toBe(0);
    expect(analytics.metrics.tabHistory).toEqual([]);
    expect(analytics.metrics.sessionStart).toBeDefined();
  });

  test('should track tab creation correctly', async () => {
    const tab = { id: 1, url: 'https://example.com' };
    await analytics.trackTabCreation(tab);
    expect(analytics.metrics.tabCount).toBe(1);
    expect(analytics.metrics.tabHistory.length).toBe(1);
    expect(analytics.metrics.tabHistory[0].action).toBe('created');
  });
});
