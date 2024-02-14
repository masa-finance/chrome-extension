import React, { useMemo } from 'react';
import { useMetamask } from '../../hooks/useMetamask'
import { Button } from '../../components/Button';
import { Row } from '../../components/Row';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { LittleMetamaskIcon } from '../../icons/LittleMetamaskIcon';
import { Column } from '../../components/Column';
import { useSoulnames } from '../../hooks/useSoulnames';
import { MetamaskAvatar } from '../../components/MetamaskAvatar';

export const MetamaskConnectButton = () => {
    const { initiateConnection, account } = useMetamask();

    const [buttonText, buttonColor] = useMemo(() => {
        if (account) return ["Connected to MetaMask", "#28A745"]

        return ["Connect to MetaMask", "#161616"]
    }, [account])



    if (account) {
        return <MetamaskAvatar />

    }

    return <Button onClick={initiateConnection} style={{ backgroundColor: buttonColor }}><img src="/icons/metamask.png" alt="metamask" className="icon" />{buttonText}</Button>
}
