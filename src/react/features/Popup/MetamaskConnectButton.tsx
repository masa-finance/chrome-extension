import React, { useMemo } from 'react';
import { useMetamask } from '../../hooks/useMetamask'
import { Button } from '../../components/Button';

export const MetamaskConnectButton = () => {
    const { initiateConnection, account } = useMetamask();


    const [buttonText, buttonColor] = useMemo(() => {
        if (account) return ["Connected to MetaMask", "#28A745"]

        return ["Connect to MetaMask", "#161616"]
    }, [account])
    
    return <Button onClick={initiateConnection} style={{ backgroundColor: buttonColor }}><img src="/icons/metamask.png" alt="metamask" className="icon" />{buttonText}</Button>
}