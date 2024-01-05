// src/popup/metamask.ts

import { createExternalExtensionProvider } from '@metamask/providers';

// Function to update UI with account address
export const updateUI = (address: string, connectButton: HTMLButtonElement | null, accountAddress: HTMLElement | null) => {
    if (accountAddress) {
        accountAddress.textContent = `Connected account: ${address}`;
        // Update the button text and style
        if (connectButton) {
            connectButton.textContent = 'MetaMask Connected';
            connectButton.classList.add('connected'); // Add a class for styling
            connectButton.disabled = true; // Disable the button after successful connection
        }
        // Store the connected account address in chrome.storage.local
        chrome.storage.local.set({ userAddress: address }, () => {
            console.log('User address saved to storage.');
        });
    } else {
        console.error('accountAddress element not found');
    }
};

// Function to initiate connection to MetaMask
export const initiateConnection = async (connectButton: HTMLButtonElement | null, accountAddress: HTMLElement | null) => {
    try {
        const provider = createExternalExtensionProvider();
        const accounts = await provider.request({ method: 'eth_requestAccounts' }) as string[];
        if (accounts && accounts.length > 0) {
            updateUI(accounts[0], connectButton, accountAddress);
        } else {
            console.error('No accounts returned from MetaMask.');
        }
    } catch (error) {
        console.error('Error connecting to MetaMask:', error);
    }
};

// Function to check for a connected account
export const checkForConnectedAccount = async (connectButton: HTMLButtonElement | null, accountAddress: HTMLElement | null) => {
    try {
        const provider = createExternalExtensionProvider();
        const accounts = await provider.request({ method: 'eth_accounts' }) as string[];
        if (accounts && accounts.length > 0) {
            updateUI(accounts[0], connectButton, accountAddress);
        } else {
            console.log('No accounts found. User needs to connect.');
            if (connectButton) {
                connectButton.disabled = false; // Ensure button is enabled if not connected
            }
        }
    } catch (error) {
        console.error('Error checking for connected account:', error);
    }
};

// Main function to connect to MetaMask
export function connectToMetaMask() {
    console.log('Attempting to connect to MetaMask');
    const connectButton = document.getElementById('connectButton') as HTMLButtonElement | null;
    const accountAddress = document.getElementById('accountAddress');

    // Add click event listener to the connect button
    if (connectButton) {
        connectButton.addEventListener('click', () => initiateConnection(connectButton, accountAddress));
    } else {
        console.error('connectButton element not found');
    }

    // Check for a connected account when the popup is opened
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => checkForConnectedAccount(connectButton, accountAddress));
    } else {
        checkForConnectedAccount(connectButton, accountAddress);
    }
}

// Call connectToMetaMask when the script loads
connectToMetaMask();