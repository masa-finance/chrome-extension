import React, { useEffect, useState } from 'react';
import { Column } from "../../components/Column"
import { Row } from '../../components/Row';

import { AlternativeButton } from '../../components/AlternativeButton';
import { EnableTracking } from '../../components/EnableTracking';

import './styles.scss';
import { MetamaskConnectButton } from './MetamaskConnectButton';
import { useMetrics } from '../../hooks/useMetrics';
import { useMetamask } from '../../hooks/useMetamask';


export const Popup = () => {

    const { account, isLoading: isMetamaskLoading } = useMetamask();
    const { metrics, isLoading, newPoints } = useMetrics(account);
    const loading = isLoading || isMetamaskLoading;

    const spacingSmall = getComputedStyle(document.documentElement)
        .getPropertyValue('--spacing-small');
    const spacingLarge = getComputedStyle(document.documentElement)
        .getPropertyValue('--spacing-large');




    return (
        <Column className="popup" style={{ gap: 18 }}>
            <img src="/masalogo.png" alt="logo" className="logo-invert" style={{ width: 120, marginBottom: "$spacing-large" }} />
            <Column>
                <h2 className={"medium-text"}>Earn rewards with Masa</h2>
                <p className="small-text">Earn points from browsing and wallet tracking</p>
            </Column>

            <Column className="light-card" style={{ gap: spacingLarge }}>
                <Column style={{ gap: spacingLarge }}>
                    <Row style={{ gap: spacingSmall, justifyContent: 'space-between' }}>
                        <Row style={{ gap: spacingSmall }}>
                            <img src="/icons/wallet.png" alt="wallet-icon" style={{ width: 20, height: 20 }} />

                            <Column style={{ gap: spacingSmall }}>
                                <h2 className='small-text'>Transaction rewards</h2>
                                <p className='smaller-text'>{!account ? "Connect your wallet to earn points by sharing your web3 activity" : "Sharing wallet activity"}</p>
                            </Column>
                        </Row>
                        {account && <p className='note-text' style={{ fontSize: 14 }}><span className={newPoints?.transactionPoints ? "positive-value-text" : ""}>{newPoints?.transactionPoints ? "+" : ""}{newPoints?.transactionPoints ?? 0}</span> new points</p>}


                    </Row>
                    <Column style={{ gap: spacingSmall }}>
                        <MetamaskConnectButton />
                        {!account && <p className='note-text' style={{ textAlign: 'center' }}>We only support MetaMask at this time</p>}
                    </Column>
                </Column>
                <div className="hr" />
                <Column>
                    <Row style={{ gap: spacingSmall, alignItems: 'flex-start', justifyContent: "flex-end" }}>
                        <Row style={{ gap: spacingSmall, alignItems: 'flex-start' }}>
                            <img src="/icons/earn.png" alt="earn-icon" style={{ width: 20, height: 20 }} />
                            <Column style={{ gap: spacingSmall }}>
                                <h2 className='small-text'>Earn while you surf</h2>
                                <p className='small-text'>Earn points when sharing your browsing data.</p>
                            </Column>

                        </Row>

                        <Column style={{ alignItems: 'flex-end', width: 190, gap: spacingSmall }}>
                            {account && <p className='note-text' style={{ fontSize: 14 }}><span className={newPoints?.surfPoints ? "positive-value-text" : ""}>{newPoints?.surfPoints ? "+" : ""}{newPoints?.surfPoints ?? 0}</span> new points</p>}
                            <Row style={{ width: '100%', justifyContent: 'flex-end' }}>
                                {account && <EnableTracking />}
                            </Row>
                        </Column>
                    </Row>
                    {!account && <p className='note-text' style={{ marginLeft: 28, marginTop: spacingLarge }}>Your data will remain private and never be shared without your consent</p>}
                </Column>
            </Column>


            <Row style={{ justifyContent: account ? 'space-between' : "flex-end" }}>
                {account && <Column style={{ alignItems: 'flex-end' }} className="rewards">
                    <p>View current rewards</p>
                    <p className={`reward-points ${loading ? "skeleton" : ""}`}>{metrics?.totalPoints ?? 0} points</p>
                </Column>}

                <a href="dashboard.html" target="_blank"><AlternativeButton>Go to dashboard</AlternativeButton></a>
            </Row>
        </Column>
    );
}
