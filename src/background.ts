// background.ts
console.log('Background script loaded.');

// Function to handle sending page data
function sendPageData(url: string): void {
  chrome.storage.local.get(['trackingEnabled'], (result) => {
    console.log('Storage result:', result);

    if (result.trackingEnabled) {
      const pageData = { url };
      console.log('Sending page data:', pageData);
      postDataToServer(pageData);
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
      postDataToServer(clickData);
    }
  });
}

// Function to post data to the server
function postDataToServer(data: object): void {
  fetch('http://localhost:3000/pageData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => {
    console.log('Data sent successfully:', response);
  })
  .catch(error => {
    console.error('Error sending data:', error);
  });
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