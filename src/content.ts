// content.ts

// Function to send click data to the background script
function sendClickData(event: MouseEvent): void {
  const target = event.target as HTMLElement;
  const button = target.closest('.css-1rynq56'); // Use a stable class name to identify the button

  // Check if the clicked element or its parent has the class we want to track
  if (button && button.className.includes('r-bcqeeo r-qvutc0')) { // Check for additional classes
    const clickData = {
      tagName: button.tagName,
      id: button.id,
      classNames: button.className,
      textContent: button.textContent?.trim().substring(0, 100), // Be cautious with user data
      url: window.location.href,
      timestamp: new Date().toISOString(),
    };
    chrome.runtime.sendMessage({ type: 'onClick', clickData: clickData });
  }
}

// Listen for all clicks on the page
document.addEventListener('click', sendClickData);

// Existing code to track URL changes
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