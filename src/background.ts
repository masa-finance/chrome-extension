// background.ts
console.log('Background script loaded.');

chrome.webNavigation.onCompleted.addListener((details) => {
  console.log('Navigation completed:', details);

  chrome.storage.local.get(['trackingEnabled'], (result) => {
    console.log('Storage result:', result);

    if (result.trackingEnabled && details.frameId === 0) {
      const pageData = {
        url: details.url,
      };

      console.log('Sending page data:', pageData);

      fetch('http://localhost:3000/pageData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pageData),
      })
      .then(response => {
        console.log('Data sent successfully:', response);
      })
      .catch(error => {
        console.error('Error sending data:', error);
      });
    } else {
      console.log('Tracking is disabled or not in the main frame.');
    }
  });
});