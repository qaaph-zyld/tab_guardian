// Tab Guardian Background Service
import { TabAnalytics } from '../analytics/TabAnalytics';
import { StorageManager } from '../utils/StorageManager';

class TabGuardian {
  constructor() {
    this.analytics = new TabAnalytics();
    this.storage = new StorageManager();
    this.initializeListeners();
  }

  initializeListeners() {
    chrome.tabs.onCreated.addListener(this.handleTabCreated.bind(this));
    chrome.tabs.onRemoved.addListener(this.handleTabRemoved.bind(this));
    chrome.tabs.onUpdated.addListener(this.handleTabUpdated.bind(this));
  }

  async handleTabCreated(tab) {
    await this.analytics.trackTabCreation(tab);
  }

  async handleTabRemoved(tabId, removeInfo) {
    await this.analytics.trackTabClosure(tabId, removeInfo);
  }

  async handleTabUpdated(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
      await this.analytics.trackTabUpdate(tab);
    }
  }
}

// Initialize the extension
const guardian = new TabGuardian();
