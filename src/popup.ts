// src/popup.ts

// Function to set a permission flag in localStorage and chrome.storage.local
function setPermission(): void {
    localStorage.setItem('extension_permission', 'granted');
    chrome.storage.local.set({ trackingEnabled: true });
    console.log('Permission has been granted and tracking is enabled');
  }
  
  // Function to revoke the permission flag from localStorage and chrome.storage.local
  function revokePermission(): void {
    localStorage.removeItem('extension_permission');
    chrome.storage.local.set({ trackingEnabled: false });
    console.log('Permission has been revoked and tracking is disabled');
  }
  
  // Event listeners for DOM content loaded
  document.addEventListener('DOMContentLoaded', () => {
    const grantPermissionButton = document.getElementById('grant-permission');
    const revokePermissionButton = document.getElementById('revoke-permission');
  
    // Event listener for granting permission
    grantPermissionButton?.addEventListener('click', () => {
      setPermission();
    });
  
    // Event listener for revoking permission
    revokePermissionButton?.addEventListener('click', () => {
      revokePermission();
    });
  });