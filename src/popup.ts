// src/popup.ts

// Function to update the permission flag in localStorage and chrome.storage.local
function updatePermission(granted: boolean): void {
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
  
  // Event listeners for DOM content loaded
  document.addEventListener('DOMContentLoaded', () => {
    const togglePermission = document.getElementById('toggle-permission') as HTMLInputElement;
  
    // Initialize the toggle state based on stored permission
    chrome.storage.local.get(['trackingEnabled'], (result) => {
      togglePermission.checked = result.trackingEnabled || false;
    });
  
    // Event listener for the toggle switch
    togglePermission.addEventListener('change', () => {
      updatePermission(togglePermission.checked);
    });
  });