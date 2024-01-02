// /src/content/urlChangeTracker.ts

export function trackUrlChanges(): void {
    let lastUrl: string = location.href; 
    new MutationObserver(() => {
      const url: string = location.href;
      if (url !== lastUrl) {
        lastUrl = url;
        chrome.runtime.sendMessage({ type: 'urlChange', url: url });
      }
    }).observe(document.body, { subtree: true, childList: true });
  
    window.addEventListener('popstate', () => {
      chrome.runtime.sendMessage({ type: 'urlChange', url: location.href });
    });
    window.addEventListener('hashchange', () => {
      chrome.runtime.sendMessage({ type: 'urlChange', url: location.href });
    });
  }