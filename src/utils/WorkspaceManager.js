export class WorkspaceManager {
  constructor() {
    this.storage = chrome.storage.local;
  }

  async saveWorkspace(name) {
    try {
      const tabs = await chrome.tabs.query({ currentWindow: true });
      const workspace = {
        name,
        created: Date.now(),
        tabs: tabs.map(tab => ({
          url: tab.url,
          title: tab.title,
          pinned: tab.pinned,
          active: tab.active
        }))
      };

      const workspaces = await this.getWorkspaces();
      workspaces.push(workspace);
      await this.storage.set({ workspaces });

      return workspace;
    } catch (error) {
      console.error('Error saving workspace:', error);
      throw error;
    }
  }

  async loadWorkspace(workspaceName) {
    try {
      const workspaces = await this.getWorkspaces();
      const workspace = workspaces.find(w => w.name === workspaceName);
      
      if (!workspace) {
        throw new Error(`Workspace "${workspaceName}" not found`);
      }

      // Create new window with workspace tabs
      const window = await chrome.windows.create({ focused: true });
      
      for (const tab of workspace.tabs) {
        await chrome.tabs.create({
          windowId: window.id,
          url: tab.url,
          pinned: tab.pinned,
          active: tab.active
        });
      }

      // Remove the default new tab
      const tabs = await chrome.tabs.query({ windowId: window.id });
      if (tabs.length > workspace.tabs.length) {
        await chrome.tabs.remove(tabs[0].id);
      }

      return workspace;
    } catch (error) {
      console.error('Error loading workspace:', error);
      throw error;
    }
  }

  async getWorkspaces() {
    try {
      const result = await this.storage.get('workspaces');
      return result.workspaces || [];
    } catch (error) {
      console.error('Error getting workspaces:', error);
      return [];
    }
  }

  async deleteWorkspace(workspaceName) {
    try {
      const workspaces = await this.getWorkspaces();
      const filteredWorkspaces = workspaces.filter(w => w.name !== workspaceName);
      await this.storage.set({ workspaces: filteredWorkspaces });
      return true;
    } catch (error) {
      console.error('Error deleting workspace:', error);
      throw error;
    }
  }
}
