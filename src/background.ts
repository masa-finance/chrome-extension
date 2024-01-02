// background.ts
console.log('Background script loaded.');

// Page Tracking Functionality
function sendPageData(url: string): void {
  chrome.storage.local.get(['trackingEnabled'], (result) => {
    if (result.trackingEnabled) {
      console.log('Sending page data:', { url });
      postDataToServer({ url }, 'pageView');
    } else {
      console.log('Tracking is disabled.');
    }
  });
}

function postDataToServer(data: any, type: string): void {
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
    .then(response => console.log('Data sent successfully:', response))
    .catch(error => console.error('Error sending data:', error));
  }
}

function initializePageTrackingListeners(): void {
  chrome.webNavigation.onCompleted.addListener((details) => {
    if (details.frameId === 0) {
      console.log('Main frame navigation completed:', details);
      sendPageData(details.url);
    } else {
      console.log('Subframe navigation completed, ignored.');
    }
  });

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'urlChange') {
      console.log('URL changed to:', message.url);
      sendPageData(message.url);
    }
  });
}

// Ethereum Account Handling
function handleEthereumAccounts(message: any): void {
  console.log('Received Ethereum accounts:', message.accounts);
  // Handle the Ethereum accounts here (e.g., log them, send to server)
}

function initializeEthereumAccountListeners(): void {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'ETHEREUM_ACCOUNTS') {
      handleEthereumAccounts(message);
    }
  });
}

// Initialize Listeners
initializePageTrackingListeners();
initializeEthereumAccountListeners();