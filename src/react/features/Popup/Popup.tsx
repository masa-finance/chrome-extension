import React, { useState } from 'react';
import { Column } from "../../components/Column"
import { Row } from '../../components/Row';
import './styles.scss';

export const Popup = () => {
    const [checked, setChecked] = useState()

    const handleChange = (event) => {
        setChecked(event.target.checked)
    }

    const spacingMedium = getComputedStyle(document.documentElement)
        .getPropertyValue('--spacing-medium');
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
                    <Row style={{ gap: spacingMedium }}>
                        <img src="/icons/wallet.png" alt="wallet-icon" style={{ width: 20, height: 20 }} />

                        <Column style={{ gap: spacingSmall }}>
                            <h2 className='small-text'>Wallet activity insights</h2>
                            <p className='smaller-text'>Connect your wallet to track your activiry adn accumulate points</p>
                        </Column>

                    </Row>
                    <button><img src="/icons/metamask.png" alt="metamask" style={{ width: 20 }} />Connect to metamask</button>
                </Column>
                <Column>
                    <Row style={{ gap: spacingMedium }}>
                        <img src="/icons/earn.png" alt="earn-icon" style={{ width: 20, height: 20 }} />

                        <Column style={{ gap: spacingSmall }}>
                            <h2 className='small-text'>Earn while you surf</h2>
                            <p className='small-texter'>Enable tracking browsing data tracking and earn points</p>
                        </Column>
                        <label className="toggle-switch">
                            <input type="checkbox" checked={checked} onChange={handleChange} />
                            <span className="slider round"></span>
                        </label>
                    </Row>
                </Column>
            </Column>
        </Column>
    );
}
