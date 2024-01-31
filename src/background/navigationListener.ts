// /src/background/navigationListener.ts

import { sendPageView } from './pageView';

export function navigationListener(): void {
  chrome.webNavigation.onCompleted.addListener((details) => {
    if (details.frameId === 0) {
      console.log('Main frame navigation completed:', details);
      sendPageView();
    } else {
      console.log('Subframe navigation completed, ignored.');
    }
  });
}
