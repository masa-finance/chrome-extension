// /src/content.ts

// Click Tracking Functionality
function sendClickData(event: MouseEvent): void {
  const target = event.target as HTMLElement;
  const button = target.closest('.css-1rynq56');
  if (button && button.className.includes('r-bcqeeo r-qvutc0')) {
    const clickData = {
      tagName: button.tagName,
      id: button.id,
      classNames: button.className,
      textContent: button.textContent?.trim().substring(0, 100),
      url: window.location.href,
      timestamp: new Date().toISOString(),
    };
    chrome.runtime.sendMessage({ type: 'onClick', clickData: clickData });
  }
}

function initializeClickTracking(): void {
  document.addEventListener('click', sendClickData);
}

// URL Change Tracking Functionality
let lastUrl: string = location.href;

function trackUrlChanges(): void {
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

// MetaMask Interaction Functionality
function handleMetaMaskRequests(): void {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'getEthereumAddress') {
      if (window.ethereum) {
        window.ethereum.request({ method: 'eth_requestAccounts' })
          .then(accounts => sendResponse({ accounts: accounts }))
          .catch(error => {
            console.error('Error in eth_requestAccounts:', error);
            sendResponse({ error: 'Failed to get accounts. Please check MetaMask.' });
          });
      } else {
        console.error('MetaMask is not installed or not found.');
        sendResponse({ error: 'MetaMask is not installed or not found.' });
      }
    }
    return true; // Keep the messaging channel open for the response
  });
}

function injectMetaMaskScript(): void {
  const container = document.head || document.documentElement;
  const scriptTag = document.createElement('script');
  scriptTag.setAttribute('async', 'false');
  scriptTag.textContent = `
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(accounts => {
          window.postMessage({ type: 'ETHEREUM_ACCOUNTS', accounts }, '*');
        })
        .catch(error => {
          console.error('Error requesting Ethereum accounts:', error);
        });
    } else {
      console.error('MetaMask injection script could not find window.ethereum.');
    }
  `;
  container.insertBefore(scriptTag, container.children[0]);
  container.removeChild(scriptTag);
}

function checkMetaMaskInstallation(): void {
  if (window.ethereum) {
    console.log('MetaMask is installed:', window.ethereum);
    injectMetaMaskScript();
  } else {
    console.error('MetaMask is not installed or not found.');
    setTimeout(checkMetaMaskInstallation, 1000); // Retry after 1 second
  }
}

function initializeMetaMaskInteraction(): void {
  document.addEventListener('DOMContentLoaded', checkMetaMaskInstallation);
  window.addEventListener('message', (event) => {
    if (event.source === window && event.data.type === 'ETHEREUM_ACCOUNTS') {
      console.log('Received Ethereum accounts from injected script:', event.data.accounts);
    }
  });
}

// Initialize all functionalities
initializeClickTracking();
trackUrlChanges();
initializeMetaMaskInteraction();