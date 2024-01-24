import React from 'react';
import { StatCard } from './StatCard';
import { Column } from '../../components/Column';
import { Button } from '../../components/Button';
import { useDashboardContext } from '../../contexts/DashboardContextProvider';

const IntroPage = () => {

    const { initiateConnection } = useDashboardContext();

    // Example data, replace with actual data
    const browsingStats = [
        { label: 'Page views', value: '1500' },
        // ... other stats
    ];

    const masaStats = [
        { label: 'Logins', value: '320' },
        {
            label: (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "var(--spacing-xsmall)",
                    }}
                >
                    7 day 10x
                    <div className="help-icon">
                        <img
                            src="icons/question-mark-in-circle.svg"
                            width="19"
                            height="19"
                        />
                        <div className="tooltip">
                            <h5 className="tooltip-title">Weekly 10X login</h5>
                            <p className="tooltip-body">
                                Login everyday of the week to Masa and 10X all your points
                                for that week.
                            </p>
                        </div>
                    </div>
                </div>
            ), value: '85'
        },
        // ... other stats
    ];

    const walletActivityStats = [
        { label: 'Swap', value: '24' },
        { label: 'Bridge', value: '12' },
        { label: "wallet", value: '21' }
        // ... other stats
    ];

    return (
        <div className="intro-page">
            <Column className="header">
                <h1>Track Your Rewards</h1>
                <p>Connect Wallet & View Your Earnings</p>
                <Button className='btn-connect' onClick={initiateConnection}>Connect wallet</Button>
            </Column>
            <Column className="metrics">
                <p className="metrics-subtitle">Each action below earns you points – start collecting!</p>
                <div className="metric-groups">
                    <StatCard
                        title="Browsing"
                        subTitle="vs last week"
                        columnWidth={1}
                        percentChange={40}
                        stats={browsingStats}
                        isLoading={true}
                    />
                    <StatCard
                        title="Masa"
                        subTitle="All time"
                        columnWidth={1}
                        percentChange={12}
                        stats={masaStats}
                        isLoading={true}
                    />
                    <StatCard
                        title="Wallet activity"
                        subTitle="vs last week"
                        columnWidth={2}
                        percentChange={200}
                        stats={walletActivityStats}
                        isLoading={true}
                    />
                </div>
            </Column>
            <Column className='coming-soon'>
                <div className='coming-soon-badge'>
                    Coming soon
                </div>
                <p>Claim Rewards</p>
            </Column>
        </div>
    );
};

export default IntroPage;