// src/popup/metamask.ts

import { createExternalExtensionProvider } from '@metamask/providers';

export function connectToMetaMask() {
    console.log('Attempting to connect to MetaMask');
    const connectButton = document.getElementById('connectButton') as HTMLButtonElement | null;
    const accountAddress = document.getElementById('accountAddress');

    // Function to update UI with account address
    const updateUI = (address: string) => {
        if (accountAddress) {
            accountAddress.textContent = `Connected account: ${address}`;
            // Update the button text and style
            if (connectButton) {
                connectButton.textContent = 'MetaMask Connected';
                connectButton.classList.add('connected'); // Add a class for styling
                connectButton.disabled = true; // Disable the button after successful connection
            }
        } else {
            console.error('accountAddress element not found');
        }
    };

    // Function to initiate connection to MetaMask
    const initiateConnection = async () => {
        try {
            const provider = createExternalExtensionProvider();
            const accounts = await provider.request({ method: 'eth_requestAccounts' }) as string[];
            if (accounts && accounts.length > 0) {
                updateUI(accounts[0]);
                if (connectButton) {
                    connectButton.disabled = true; // Disable the button after successful connection
                }
            } else {
                console.error('No accounts returned from MetaMask.');
            }
        } catch (error) {
            console.error('Error connecting to MetaMask:', error);
        }
    };

    // Add click event listener to the connect button
    if (connectButton) {
        connectButton.addEventListener('click', initiateConnection);
    } else {
        console.error('connectButton element not found');
    }

    // Function to check for a connected account
    const checkForConnectedAccount = async () => {
        try {
            const provider = createExternalExtensionProvider();
            const accounts = await provider.request({ method: 'eth_accounts' }) as string[];
            if (accounts && accounts.length > 0) {
                updateUI(accounts[0]);
                if (connectButton) {
                    connectButton.disabled = true; // Disable the button if already connected
                }
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

    // Check for a connected account when the popup is opened
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkForConnectedAccount);
    } else {
        checkForConnectedAccount();
    }
}

// Call connectToMetaMask when the script loads
connectToMetaMask();