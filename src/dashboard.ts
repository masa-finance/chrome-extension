// src/dashboard.ts
import { setupWalletButton, setupNavigationLinks } from './header/header';
import { ethers } from 'ethers'; // Make sure ethers is imported

// Define the base URL for the endpoint
const eventsCountBaseEndpoint = "https://api.cookiemonster.masa.finance/address/events-count/";

// Define the event types
type EventTypes =
  | 'pageView'
  | 'login'
  | 'mint'
  | 'connectWallet'
  | 'swap'
  | 'bridge'
  | 'addLiquidity'
  | 'removeLiquidity'
  | 'farm'
  | 'trade'
  | 'claim';

// Define an interface for the event data
interface EventData {
  type: EventTypes;
  count: string;
}

// Function to initialize all event counts to "-"
function initializeEventCounts() {
    const eventTypes: EventTypes[] = [
        'pageView', 'login', 'mint', 'connectWallet', 'swap', 'bridge',
        'addLiquidity', 'removeLiquidity', 'farm', 'trade', 'claim'
    ];

    eventTypes.forEach(eventType => {
        updateEventCount(eventType, "-");
    });
}

// Function to fetch and display event counts
async function fetchAndDisplayEventCounts(userAddress: string) {
    const eventsCountEndpoint = `${eventsCountBaseEndpoint}${userAddress}`;
    console.log('Fetching event counts from:', eventsCountEndpoint);
    try {
        const response = await fetch(eventsCountEndpoint);
        console.log('Received response:', response);
        const data = await response.json();
        console.log('Parsed response data:', data);
        if (data.success && Array.isArray(data.data)) {
            // Initialize all counts to "-" before updating with fetched data
            initializeEventCounts();
            data.data.forEach((event: EventData) => {
                const eventType = event.type;
                const count = event.count;
                updateEventCount(eventType, count);
            });
        } else {
            // If the fetch is not successful, initialize all counts to "-"
            initializeEventCounts();
        }
    } catch (error) {
        console.error('Failed to fetch event counts:', error);
        // If there is an error during fetch, initialize all counts to "-"
        initializeEventCounts();
    }
}

// Function to update the event count in the HTML
function updateEventCount(eventType: EventTypes, count: string) {
    const dataPointElement = document.querySelector(`.data-point img[alt="${eventType}"]`);
    if (dataPointElement) {
        const parentElement = dataPointElement.parentElement;
        if (parentElement) {
            const countElement = parentElement.querySelector('span');
            if (countElement) {
                // Set text to "-" if count is not provided or is an empty string
                countElement.textContent = count || "-";
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await setupWalletButton('walletButton');
    setupNavigationLinks();

    // Retrieve the user address from storage in checksum format
    chrome.storage.local.get('userAddress', async (result) => {
        if (result.userAddress) {
            const checksumAddress = ethers.utils.getAddress(result.userAddress);
            // Initialize all event counts to "-"
            initializeEventCounts();
            // Fetch and display event counts immediately using the checksum address
            await fetchAndDisplayEventCounts(checksumAddress);
            // Set up an interval to refresh the event counts every 5 minutes (300000 milliseconds)
            setInterval(async () => {
                await fetchAndDisplayEventCounts(checksumAddress);
            }, 300000);
        } else {
            console.error('User address not found in storage.');
        }
    });

    const stakeDataButton = document.getElementById('stakeDataButton') as HTMLButtonElement;
    if (stakeDataButton) {
        // Add event listener for the staking button to handle staking data
        stakeDataButton.addEventListener('click', () => {
            console.log('Staking data to smart contract...');
            stakeDataToSmartContract();
        });
    }

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