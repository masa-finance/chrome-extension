// src/popup.ts

import { createExternalExtensionProvider } from '@metamask/providers';

document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOMContentLoaded event fired');
    const connectButton = document.getElementById('connectButton');
    const accountAddress = document.getElementById('accountAddress');

    const provider = createExternalExtensionProvider();

    // Get the currently connected accounts
    const accounts = await provider.request({ method: 'eth_accounts' }) as string[];
    if (accounts.length > 0 && accountAddress) {
        accountAddress.textContent = `Connected account: ${accounts[0]}`;
    }

    // Listen for account changes
    provider.on('accountsChanged', (accounts: string[]) => {
        console.log('accounts changed', accounts);
        if (accounts.length > 0 && accountAddress) {
            accountAddress.textContent = `Connected account: ${accounts[0]}`;
        } else {
            console.error('No accounts available or accountAddress is null.');
        }
    });

    if (connectButton && accountAddress) {
        console.log('connectButton and accountAddress found');
        connectButton.addEventListener('click', async () => {
            console.log('connectButton clicked');
            try {
                console.log('provider created', provider);
                // Define the expected type for accounts, e.g., string[]
                const accounts = await provider.request({ method: 'eth_requestAccounts' }) as string[];
                console.log('accounts received', accounts);
                if (accounts && accounts.length > 0) {
                    console.log('account connected', accounts[0]);
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