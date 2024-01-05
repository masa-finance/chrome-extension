// src/dashboard.ts
import { checkForConnectedAccount, initiateConnection } from './popup/metamask';

document.addEventListener('DOMContentLoaded', async () => {
    // Reference the existing button from the HTML instead of creating a new one
    const walletButton = document.getElementById('walletButton') as HTMLButtonElement;

    // Function to update the button text based on wallet connection status
    async function updateWalletStatus(): Promise<void> {
        // Use a dummy accountAddress element for updateUI function
        const accountAddress: HTMLDivElement = document.createElement('div');
        // Check for a connected account and update the UI accordingly
        await checkForConnectedAccount(walletButton, accountAddress);
        // If accountAddress has content, it means we have a connected account
        if (accountAddress.textContent) {
            walletButton.textContent = accountAddress.textContent;
        }
    }

    // Call this function to update the wallet status on page load
    await updateWalletStatus();

    // Add event listener for the button to initiate wallet connection
    walletButton.addEventListener('click', async () => {
        // Use a dummy accountAddress element for initiateConnection function
        const accountAddress: HTMLDivElement = document.createElement('div');
        await initiateConnection(walletButton, accountAddress);
        // Update the button text after attempting to connect
        await updateWalletStatus();
    });

    console.log('Dashboard loaded');
});