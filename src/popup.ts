// src/popup.ts

import { createExternalExtensionProvider } from '@metamask/providers';

document.addEventListener('DOMContentLoaded', () => {
    const connectButton = document.getElementById('connectButton');
    const accountAddress = document.getElementById('accountAddress');

    if (connectButton && accountAddress) {
        connectButton.addEventListener('click', async () => {
            try {
                const provider = createExternalExtensionProvider();
                // Define the expected type for accounts, e.g., string[]
                const accounts = await provider.request({ method: 'eth_requestAccounts' }) as string[];
                if (accounts && accounts.length > 0) {
                    accountAddress.textContent = `Connected account: ${accounts[0]}`;
                } else {
                    console.error('No accounts returned from MetaMask.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    } else {
        console.error('Could not find the connect button or account address element.');
    }
});