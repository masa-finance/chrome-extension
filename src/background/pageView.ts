// /src/background/pageView.ts

import { postDataToServer } from './postData';

type pageViewEventType = {
  url: string,
  page_title: string,
  description: string,
  keywords: string
}

export function sendPageView(data: pageViewEventType): void {
  chrome.storage.local.get(['trackingEnabled', 'userAddress'], (result) => {
    // Log the entire result object for debugging
    console.log('Storage result:', result); 

    // Explicitly log the trackingEnabled and userAddress values
    console.log('Tracking enabled:', result.trackingEnabled);
    console.log('User address from storage:', result.userAddress);

    if (result.trackingEnabled) {
      const pageView = data;
      console.log('Sending page view for URL:', data.url);

      // Check if userAddress is not undefined before sending
      if (result.userAddress) {
        console.log('User address is available:', result.userAddress);
        postDataToServer(pageView, 'pageView', result.userAddress);
      } else {
        console.log('User address is not available, not sending user address.');
        postDataToServer(pageView, 'pageView');
      }
    } else {
      console.log('Tracking is disabled, not sending page view.');
    }
  });
}
