# Masa Chrome Extension 🌐✨

Welcome to the repository for the Masa Chrome Extension! This extension is specifically designed to interact with Twitter web pages, enabling campaign managers to track when a user follows another user directly from the Twitter interface. Additionally, it empowers users to monetize their browsing data and participate in quests and campaigns on the Masa zk-Data Network.

## Features

### Twitter Follow Button Tracking 🐦🖱️
Our extension is fine-tuned to listen for click events specifically on Twitter's "Follow" button. This allows campaign managers to gather valuable data on user engagement.

- Targets and tracks clicks on Twitter's "Follow" button, identified by the class `.css-1rynq56` and additional classes `r-bcqeeo r-qvutc0`.
- Collects details such as the button's tag name, ID, class names, and the text content (trimmed to the first 100 characters) to ensure we capture the essence of the interaction without compromising user privacy.
- Records the current URL and the exact timestamp of the interaction, providing a comprehensive dataset for campaign tracking.

### URL Change Detection 🔗
The extension keeps an eye on URL changes to detect when a user navigates to a new Twitter profile or refreshes their feed, ensuring that every follow action is accounted for.

- Employs `MutationObserver` to watch for DOM changes that signal page navigation.
- Captures `popstate` and `hashchange` events to maintain accurate tracking across different types of URL updates.

### Seamless Background Communication 📡
Utilizes Chrome's `runtime.sendMessage` to relay captured data to the background script, ensuring that every follow action is logged for campaign analysis.

### Permission Configuration 🛠️🔒
Before the extension can start tracking, it requires the user to grant permission. This is a one-time setup that needs to be done by setting a flag in the `localStorage` of the browser.

- The user must set a specific permission flag in `localStorage` to activate tracking features.
- This permission ensures that the user is aware of and consents to the tracking behavior of the extension.

## Permissions and Manifest Configuration 🛠️

- Requires permissions for `activeTab`, `scripting`, `webNavigation`, and `storage`.
- Needs host permissions for all URLs (`<all_urls>`) to track follow actions across the entire Twitter domain.
- Sets up a background service worker (`background.js`) to handle asynchronous data processing.
- Injects `content.js` into Twitter web pages post-load to start tracking without delay.

## Upcoming Features 🚧

- **User Interface for Permission Granting**: We are planning to build a user-friendly interface where users can easily grant permissions to the extension. This will streamline the process and enhance the user experience.
- **Monetization and Participation in Quests**: Users will be able to monetize their browsing data and engage in various quests and campaigns through the Masa zk-Data Network, leveraging zero-knowledge proofs to maintain privacy.

## Installation

To get started with the extension, clone this repository and load it as an unpacked extension in Chrome. Remember to set the permission in `localStorage` as mentioned above to enable the tracking features.

## Contributing

We welcome contributions! If you have suggestions or find a bug, please feel free to submit pull requests or open issues.

Thank you for exploring the Masa Chrome Extension, your go-to tool for Twitter campaign tracking and participating in the Masa zk-Data Network! 🚀🎯