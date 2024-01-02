// /src/popup/permissionUpdate.ts

export function updatePermission(granted: boolean): void {
    if (granted) {
      localStorage.setItem('extension_permission', 'granted');
      chrome.storage.local.set({ trackingEnabled: true });
      console.log('Permission has been granted and tracking is enabled');
    } else {
      localStorage.removeItem('extension_permission');
      chrome.storage.local.set({ trackingEnabled: false });
      console.log('Permission has been revoked and tracking is disabled');
    }
}