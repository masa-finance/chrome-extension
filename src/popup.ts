// src/popup.ts

// Extend the Window interface to include the ethereum property
interface Window {
    ethereum?: {
      request: ({ method }: { method: string }) => Promise<any>;
      on?: (event: string, callback: (...args: any[]) => void) => void;
    };
  }
  
  // Page Tracking Functionality
  function updatePermission(granted: boolean): void {
    const permissionKey = 'extension_permission';
    const storageValue = { trackingEnabled: granted };
    const logMessage = granted
      ? 'Permission has been granted and tracking is enabled'
      : 'Permission has been revoked and tracking is disabled';
  
    if (granted) {
      localStorage.setItem(permissionKey, 'granted');
    } else {
      localStorage.removeItem(permissionKey);
    }
    chrome.storage.local.set(storageValue);
    console.log(logMessage);
  }
  
  function initializePageTracking(): void {
    const togglePermission = document.getElementById('toggle-permission') as HTMLInputElement;
  
    // Initialize the toggle state based on stored permission
    chrome.storage.local.get(['trackingEnabled'], (result) => {
      togglePermission.checked = result.trackingEnabled || false;
    });
  
    // Event listener for the toggle switch
    togglePermission.addEventListener('change', () => {
      updatePermission(togglePermission.checked);
    });
  }
  
  // MetaMask Functionality
  function handleMetaMaskConnection(response: any): void {
    const accountDisplay = document.getElementById('account-display');
    if (response?.accounts) {
      const account = response.accounts[0];
      console.log('Ethereum address:', account);
      if (accountDisplay) {
        accountDisplay.textContent = `Connected account: ${account}`;
      }
    } else {
      const errorMessage = response?.error || 'An error occurred. Please check the console for more details.';
      console.error('Error from content script:', errorMessage);
      alert(errorMessage);
    }
  }
  
  function initializeMetaMaskConnection(): void {
    const connectButton = document.getElementById('connect-metamask') as HTMLButtonElement;
  
    // Event listener for the Connect to MetaMask button
    connectButton.addEventListener('click', () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTabId = tabs[0]?.id;
        if (typeof currentTabId === 'number') {
          // Send a message to the content script
          chrome.tabs.sendMessage(currentTabId, { message: 'getEthereumAddress' }, handleMetaMaskConnection);
        }
      });
    });
  }
  
  // Event listener for DOM content loaded
  document.addEventListener('DOMContentLoaded', () => {
    initializePageTracking();
    initializeMetaMaskConnection();
  });