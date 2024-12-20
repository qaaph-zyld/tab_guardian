import { TabAnalytics } from '../analytics/TabAnalytics';
import { TabOptimizer } from '../utils/TabOptimizer';

class PopupManager {
  constructor() {
    this.analytics = new TabAnalytics();
    this.optimizer = new TabOptimizer();
    this.initializeUI();
  }

  async initializeUI() {
    const metrics = await chrome.storage.local.get('metrics');
    this.updateDisplay(metrics);
    this.setupEventListeners();
    await this.showOptimizationSuggestions();
  }

  updateDisplay(metrics) {
    if (!metrics) return;
    
    const tabCount = document.getElementById('tabCount');
    const sessionTime = document.getElementById('sessionTime');
    
    if (tabCount) tabCount.textContent = metrics.tabCount;
    if (sessionTime) {
      const duration = Math.floor((Date.now() - metrics.sessionStart) / 1000 / 60);
      sessionTime.textContent = `${duration} minutes`;
    }
  }

  async showOptimizationSuggestions() {
    const optimization = await this.optimizer.optimizeTabs();
    const suggestions = document.getElementById('suggestions');
    
    if (suggestions && optimization.recommendations.length > 0) {
      const html = optimization.recommendations
        .map(rec => `
          <div class="suggestion">
            <div class="suggestion-text">${rec.suggestion}</div>
            <div class="suggestion-priority">${rec.priority}</div>
          </div>
        `)
        .join('');
      
      suggestions.innerHTML = html;
    }
  }

  setupEventListeners() {
    document.getElementById('optimize')?.addEventListener('click', async () => {
      const optimization = await this.optimizer.optimizeTabs();
      // Implement optimization actions based on recommendations
      this.showOptimizationSuggestions();
    });
  }
}

// Initialize popup
document.addEventListener('DOMContentLoaded', () => {
  new PopupManager();
});
