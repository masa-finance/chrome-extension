// background.ts
chrome.action.onClicked.addListener((tab) => {
    chrome.storage.local.get(['active'], (result) => {
        let active = result.active || false;
        active = !active;
        chrome.storage.local.set({ 'active': active });

        const color = active ? 'orange' : 'white';
        chrome.scripting.executeScript({
            target: {tabId: tab.id ? tab.id : -1},
            func: makeOrange,
            args: [color]
        });
    });
});
