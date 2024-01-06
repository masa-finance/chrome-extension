// src/referrals.ts
import { setupWalletButton, setupNavigationLinks } from './header/header';

document.addEventListener('DOMContentLoaded', async () => {
    console.log('Referrals page loaded');
    await setupWalletButton('walletButton');
    setupNavigationLinks();
    console.log('Referrals page loaded');

    // Your referrals page logic goes here
});