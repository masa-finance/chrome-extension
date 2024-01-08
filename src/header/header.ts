// src/header/header.ts
import { checkForConnectedAccount, initiateConnection } from '../popup/metamask';
import { createExternalExtensionProvider } from '@metamask/providers';

export async function setupWalletButton(walletButtonId: string): Promise<void> {
    const walletButton = document.getElementById(walletButtonId) as HTMLButtonElement;
    const provider = createExternalExtensionProvider();

    async function updateWalletStatus(): Promise<void> {
        const accountAddress: HTMLDivElement = document.createElement('div');
        await checkForConnectedAccount(walletButton, accountAddress);
        if (accountAddress.textContent) {
            walletButton.textContent = accountAddress.textContent;
        }
    }

    await updateWalletStatus();

    walletButton.addEventListener('click', async () => {
        const accountAddress: HTMLDivElement = document.createElement('div');
        await initiateConnection(walletButton, accountAddress);
        await updateWalletStatus();
    });

    // Listen for account changes
    provider.on('accountsChanged', async (accounts: string[]) => {
        if (accounts.length > 0) {
            const accountAddress: HTMLDivElement = document.createElement('div');
            accountAddress.textContent = accounts[0];
            await updateWalletStatus();
        }
    });
}

export function setupNavigationLinks(): void {
    // Handle navigation link active state
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(lnk => lnk.classList.remove('active'));
            link.classList.add('active');
        });
    });
}