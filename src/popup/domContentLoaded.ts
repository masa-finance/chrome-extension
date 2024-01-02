// /src/popup/domContentLoaded.ts

import { updatePermission } from './permissionUpdate';
import { connectToMetaMask } from './metamask';

export function handleDOMContentLoaded(): void {
    const togglePermission = document.getElementById('toggle-permission') as HTMLInputElement;
  
    // Initialize the toggle state based on stored permission
    chrome.storage.local.get(['trackingEnabled'], (result) => {
      togglePermission.checked = result.trackingEnabled || false;
    });
  
    // Event listener for the toggle switch
    togglePermission.addEventListener('change', () => {
      updatePermission(togglePermission.checked);
    });

    // Call the MetaMask connection function
    connectToMetaMask();
}