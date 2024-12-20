export class TabOptimizer {
  constructor() {
    this.thresholds = {
      maxTabs: 20,
      inactiveTime: 30 * 60 * 1000, // 30 minutes
    };
  }

  async optimizeTabs() {
    const tabs = await chrome.tabs.query({});
    const tabGroups = this.groupTabsByDomain(tabs);
    const recommendations = this.generateRecommendations(tabGroups);
    
    return {
      groups: tabGroups,
      recommendations,
      potentialSavings: this.calculatePotentialSavings(tabs.length, recommendations)
    };
  }

  groupTabsByDomain(tabs) {
    const groups = {};
    
    tabs.forEach(tab => {
      try {
        const url = new URL(tab.url);
        const domain = url.hostname;
        
        if (!groups[domain]) {
          groups[domain] = [];
        }
        
        groups[domain].push(tab);
      } catch (e) {
        // Handle invalid URLs
        console.warn('Invalid URL:', tab.url);
      }
    });
    
    return groups;
  }

  generateRecommendations(tabGroups) {
    const recommendations = [];
    
    Object.entries(tabGroups).forEach(([domain, tabs]) => {
      if (tabs.length > 3) {
        recommendations.push({
          type: 'group',
          domain,
          tabCount: tabs.length,
          suggestion: `Group ${tabs.length} tabs from ${domain}`,
          priority: 'high'
        });
      }
    });
    
    return recommendations;
  }

  calculatePotentialSavings(currentCount, recommendations) {
    const estimatedReduction = recommendations.reduce((sum, rec) => {
      return sum + (rec.tabCount > 3 ? rec.tabCount - 2 : 0);
    }, 0);
    
    return {
      tabReduction: estimatedReduction,
      memoryEstimate: estimatedReduction * 50, // Rough estimate: 50MB per tab
      timeEstimate: estimatedReduction * 2 // Rough estimate: 2 minutes saved per reduced tab
    };
  }
}
