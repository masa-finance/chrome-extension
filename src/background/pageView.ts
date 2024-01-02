// /src/background/pageView.ts

import { postDataToServer } from './postData';

export function sendPageView(url: string): void {
  chrome.storage.local.get(['trackingEnabled'], (result) => {
    console.log('Storage result:', result);

    if (result.trackingEnabled) {
      const pageView = { url };
      console.log('Sending page view:', pageView);
      postDataToServer(pageView, 'pageView');
    } else {
      console.log('Tracking is disabled.');
    }
  });
}