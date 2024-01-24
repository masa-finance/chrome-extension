import { createExternalExtensionProvider } from "@metamask/providers";
import { ethers } from "ethers";
import { useEffect } from "react";
import { useAsyncFn } from "react-use";

const saveWallet = (wallet: string) => {
  const checksumAddress = ethers.utils.getAddress(wallet);

  chrome.storage.local.set({ userAddress: checksumAddress }, () => {
    console.log("User address saved to storage:", checksumAddress); // Log the checksum address as it's being stored
  });
};

// Function to initiate connection to MetaMask
export const initiateConnection = async () => {
  try {
    const provider = createExternalExtensionProvider();
    const accounts = (await provider.request({
      method: "eth_requestAccounts",
    })) as string[];
    if (accounts && accounts.length > 0) {
      console.log("accounts", accounts[0]);
      saveWallet(accounts[0]);
    } else {
      console.error("No accounts returned from MetaMask.");
    }
  } catch (error) {
    console.error("Error connecting to MetaMask:", error);
  }
};

// Function to check for a connected account
export const checkForConnectedAccount = async () => {
  try {
    const provider = createExternalExtensionProvider();
    const accounts = (await provider.request({
      method: "eth_accounts",
    })) as string[];
    if (accounts && accounts.length > 0) {
      console.log("Accounts hook", accounts[0]);
      saveWallet(accounts[0]);
      return accounts[0];
    } else {
      console.log("No accounts found. User needs to connect.");
    }
  } catch (error) {
    console.error("Error checking for connected account:", error);
  }
};

export const useMetamask = () => {
  const [{ value: account, loading: isLoading }, fetchAccount] =
    useAsyncFn(async () => {
      const connectedAccount = await checkForConnectedAccount();
      const checksumAddress = ethers.utils.getAddress(connectedAccount ?? "0x");
      return checksumAddress;
    }, []);

  useEffect(() => {
    fetchAccount();

    const provider = createExternalExtensionProvider();
    provider.on("accountsChanged", () => {
      fetchAccount();
    });
  }, [fetchAccount]);

  const handleInitiateConnection = async () => {
    await initiateConnection();
    fetchAccount();
  };

  return {
    initiateConnection: handleInitiateConnection,
    account,
    isLoading,
  };
};
