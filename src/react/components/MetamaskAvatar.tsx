import React from 'react';
import Jazzicon from "react-jazzicon/dist/Jazzicon"
import { Row } from "./Row"
import { jsNumberForAddress } from "react-jazzicon"
import { LittleMetamaskIcon } from "../icons/LittleMetamaskIcon"
import { Column } from "./Column"
import { useSoulnames } from "../hooks/useSoulnames"
import { useMetamask } from "../hooks/useMetamask"

export const MetamaskAvatar = () => {
    const { account } = useMetamask();

    const { soulnames, isLoading: isLoadingSoulname } = useSoulnames(account)

    let shortAccount = account ? `${account.slice(0, 18)}...${account.slice(-4)}` : null;

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