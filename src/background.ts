// background.ts

import MetaMaskSDK from '@metamask/sdk';

console.log('Background script loaded.');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'connect_metamask') {
    const MMSDK = new MetaMaskSDK();
    const ethereum = MMSDK.getProvider();

    ethereum.request({ method: 'eth_requestAccounts' })
      .then((accounts: unknown) => { // Change the type to unknown
        // Assert that accounts is an array of strings or undefined
        if (Array.isArray(accounts) && accounts.length > 0) {
          sendResponse({ status: 'success', account: accounts[0] });
        } else {
          // Handle the case where accounts is null, undefined, or empty
          sendResponse({ status: 'error', error: 'No accounts returned from MetaMask.' });
        }
      })
      .catch((error: Error) => {
        sendResponse({ status: 'error', error: error.message });
      });
  }
  return true; // Indicates that you wish to send a response asynchronously
});

// Function to handle sending page data
function sendPageData(url: string): void {
  chrome.storage.local.get(['trackingEnabled'], (result) => {
    console.log('Storage result:', result);

    if (result.trackingEnabled) {
      const pageData = { url };
      console.log('Sending page data:', pageData);
      postDataToServer(pageData, 'pageView');
    } else {
      console.log('Tracking is disabled.');
    }
  });
}

// Renamed function to handle sending click event data
function sendClickEventData(clickData: object): void {
  chrome.storage.local.get(['trackingEnabled'], (result) => {
    if (result.trackingEnabled) {
      console.log('Sending click event data:', clickData);
      // postDataToServer(clickData); // Commented out as we don't want to track click events right now
    }
  });
}

// Function to post data to the server
function postDataToServer(data: any, type: string): void {
    // Only send data if the type is 'pageView'
    if (type === 'pageView') {
      const payload = {
        type: "pageView",
        client_id: "13db946a-060e-48df-9cbc-a7ee50e72081",
        event_data: {
          client_app: "Masa Chrome Extension",
          client_name: "Masa",
          page: data.url
        }
      };
  
      fetch('http://localhost:3008/tracking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify(payload),
      })
      .then(response => {
        console.log('Data sent successfully:', response);
      })
      .catch(error => {
        console.error('Error sending data:', error);
      });
    }
  }

// Listener for completed navigation events
chrome.webNavigation.onCompleted.addListener((details) => {
  if (details.frameId === 0) {
    console.log('Main frame navigation completed:', details);
    sendPageData(details.url);
  } else {
    console.log('Subframe navigation completed, ignored.');
  }
});

// Listener for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'urlChange') {
    console.log('URL changed to:', message.url);
    sendPageData(message.url);
  } else if (message.type === 'onClick') {
    console.log('Click event detected:', message.clickData);
    sendClickEventData(message.clickData); // Updated to use the renamed function
  }
});