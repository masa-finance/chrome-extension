import React, { useEffect, useState } from 'react';
import { Column } from "../../components/Column"
import { Row } from '../../components/Row';

import { AlternativeButton } from '../../components/AlternativeButton';
import { EnableTracking } from '../../components/EnableTracking';

import './styles.scss';
import { MetamaskConnectButton } from './MetamaskConnectButton';

export const Popup = () => {
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
                    <Row style={{ gap: spacingSmall }}>
                        <img src="/icons/wallet.png" alt="wallet-icon" style={{ width: 20, height: 20 }} />

                        <Column style={{ gap: spacingSmall }}>
                            <h2 className='small-text'>Wallet activity insights</h2>
                            <p className='smaller-text'>Connect your wallet to track your activity and accumulate points</p>
                        </Column>

                    </Row>
                    <MetamaskConnectButton />
                </Column>
                <div className="hr" />
                <Column>
                    <Row style={{ gap: spacingSmall, alignItems: 'center' }}>
                        <Row style={{ gap: spacingSmall, alignItems: 'flex-start' }}>
                            <img src="/icons/earn.png" alt="earn-icon" style={{ width: 20, height: 20 }} />
                            <Column style={{ gap: spacingSmall }}>
                                <h2 className='small-text'>Earn while you surf</h2>
                                <p className='small-text'>Enable browsing data tracking and earn points</p>
                                <p className='note-text'>Your data will remain private and never be shared without your consent</p>
                            </Column>
                        </Row>

                        <EnableTracking />
                    </Row>
                </Column>
            </Column>


            <Row style={{ justifyContent: 'space-between' }}>
                <Column style={{ alignItems: 'flex-end' }} className="rewards">
                    <p>View current rewards</p>
                    <p className='reward-points'>3,230 points</p>
                </Column>

                <a href="dashboard.html" target="_blank"><AlternativeButton>Go to dashboard</AlternativeButton></a>
            </Row>
        </Column>
    );
}
