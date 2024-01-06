// src/dashboard.ts
import { checkForConnectedAccount, initiateConnection } from './popup/metamask';

document.addEventListener('DOMContentLoaded', async () => {
    const walletButton = document.getElementById('walletButton') as HTMLButtonElement;
    const stakeDataButton = document.getElementById('stakeDataButton') as HTMLButtonElement;

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

    // Add event listener for the staking button to handle staking data
    stakeDataButton.addEventListener('click', () => {
        console.log('Staking data to smart contract...');
        stakeDataToSmartContract();
    });

    console.log('Dashboard loaded');
});

function stakeDataToSmartContract() {
    console.log('This function should stake data to the smart contract');
    // Implement the staking functionality here using a library like ethers.js or web3.js
    // Example (pseudo-code):
    // const contract = new ethers.Contract(contractAddress, contractABI, signer);
    // contract.stakeData(...).then((transaction) => {
    //     console.log('Data staked with transaction:', transaction);
    // }).catch((error) => {
    //     console.error('Staking failed:', error);
    // });
}