// /src/background/messageListener.ts

import { sendPageView } from './pageView';
import { sendClickEventData } from './clickEventData';

export function messageListener(): void {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'urlChange') {
      console.log('URL changed to:', message.url);
      sendPageView(message.url);
    } else if (message.type === 'onClick') {
      console.log('Click event detected:', message.clickData);
      sendClickEventData(message.clickData);
    }
  });
}