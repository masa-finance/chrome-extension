import React, { useMemo } from 'react';
import { useMetamask } from '../../hooks/useMetamask'
import { Button } from '../../components/Button';
import { Row } from '../../components/Row';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { LittleMetamaskIcon } from '../../icons/LittleMetamaskIcon';
import { Column } from '../../components/Column';
import { useSoulnames } from '../../hooks/useSoulnames';

export const MetamaskConnectButton = () => {
    const { initiateConnection, account } = useMetamask();
    const { soulnames, isLoading: isLoadingSoulname } = useSoulnames(account)


    const [buttonText, buttonColor] = useMemo(() => {
        if (account) return ["Connected to MetaMask", "#28A745"]

        return ["Connect to MetaMask", "#161616"]
    }, [account])


    let shortAccount = account ? `${account.slice(0, 18)}...${account.slice(-4)}` : null;


    if (account) {
        return <Row className="metamask-account">
            <Row style={{
                position: 'relative',
                width: 40,
            }}>
                <Jazzicon diameter={30} seed={jsNumberForAddress(account ?? '')} />
                <LittleMetamaskIcon width={24} height={24} style={{
                    position: 'absolute',
                    top: 0,
                    left: -8,
                }} />
            </Row>

            <Column style={{ justifyContent: 'center' }}>
                {!isLoadingSoulname && <p>{soulnames?.[0]?.name ?? ""}</p>}
                <p style={{ fontWeight: 400 }}>{shortAccount}</p>
            </Column>
        </Row>

    }

    return <Button onClick={initiateConnection} style={{ backgroundColor: buttonColor }}><img src="/icons/metamask.png" alt="metamask" className="icon" />{buttonText}</Button>
}
