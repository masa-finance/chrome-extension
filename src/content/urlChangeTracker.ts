// /src/content/urlChangeTracker.ts

export function trackUrlChanges(): void {
  let lastUrl: string = location.href; 

  const getMetadata = () => {
    const pageTitle = document.title;
    const descriptionTag = document.querySelector("meta[name='description']");
    const keywordsTag = document.querySelector("meta[name='keywords']");

    return {
      page_title: pageTitle,
      description: descriptionTag ? descriptionTag.getAttribute('content') : null,
      keywords: keywordsTag ? keywordsTag.getAttribute('content').split(' ') : null
    };
  };

  const sendMessage = () => {
    console.log("SENDING MESSAGE TO EXTENSION");
    const url: string = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      const metadata = getMetadata();
      chrome.runtime.sendMessage({ 
        type: 'urlChange', 
        url: url,
        ...metadata
      });
    }
  };

  new MutationObserver(() => {
    sendMessage();
  }).observe(document.body, { subtree: true, childList: true });
  
  window.addEventListener('popstate', sendMessage);
  window.addEventListener('hashchange', sendMessage);
}
