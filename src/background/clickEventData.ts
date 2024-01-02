// /src/background/clickEventData.ts

export function sendClickEventData(clickData: object): void {
    chrome.storage.local.get(['trackingEnabled'], (result) => {
      if (result.trackingEnabled) {
        console.log('Sending click event data:', clickData);
        // postDataToServer(clickData); // Commented out as we don't want to track click events right now
      }
    });
  }